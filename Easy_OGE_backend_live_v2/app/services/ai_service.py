from __future__ import annotations

import json
import logging
import re
from datetime import date
from math import sqrt
from threading import Lock
from typing import Any, Literal

import httpx
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import get_settings
from app.models import AIMessage, AIUsage, PlanType, StudentProfile, Task
from app.services.algorithm_template_service import (
    get_algorithm_template,
    get_mobile_short_card,
    list_algorithm_templates,
)

logger = logging.getLogger("easy_oge.ai")

PLAN_LIMITS = {
    PlanType.free: 3,
    PlanType.basic: 15,
    PlanType.pro: 10_000,
}

settings = get_settings()

_embedding_cache_lock = Lock()
_embedding_cache: dict[str, Any] = {
    "template_keys": None,
    "vectors": {},
}

IntentType = Literal[
    "exam_task",
    "product_support_easy_oge",
    "open_answer_review",
    "personal_plan",
    "casual_chat",
    "off_topic",
]

QWEN_ENABLED_INTENTS: set[IntentType] = {"exam_task"}

PRODUCT_BOOK = """
Ты — Easy OGE Assistant, встроенный ИИ-помощник внутри продукта Easy OGE.

Что такое Easy OGE:
- Easy OGE — это PWA и edtech-продукт для подготовки к ОГЭ по обществознанию.
- Это не универсальный чат и не общий интернет-помощник.
- Главная ценность продукта — не длинная теория, а короткие маршруты решения.

Что есть внутри Easy OGE:
- задания 1–24;
- короткие карточки Easy OGE;
- кнопка «Полный алгоритм»;
- AI-наставник;
- прогресс;
- отправка развёрнутых ответов;
- поддержка Easy OGE;
- личный план подготовки.

Как устроены алгоритмы Easy OGE:
- что это за задание;
- узнай тип;
- первый ход;
- маршрут ответа;
- антиошибка;
- шаблон ответа;
- запоминалка;
- пример сборки ответа.

Как надо себя вести:
- если вопрос про задание или тему обществознания — помогай как наставник;
- если вопрос про кнопку, экран, вход, ошибку, подписку, алгоритм, отправку ответа, поддержку — считай, что это вопрос про Easy OGE;
- если вопрос совсем не по теме Easy OGE и ОГЭ по обществознанию — мягко удерживай рамку продукта;
- не отвечай как абстрактный помощник про банки, магазины, сайты и внешний мир, если пользователь явно не указал другой сервис.

Если пользователь спрашивает про поддержку, по умолчанию считай, что он спрашивает про поддержку Easy OGE.
Если пользователь спрашивает про кнопку «Полный алгоритм», считай, что он спрашивает про интерфейс Easy OGE.
Если пользователь пишет изнутри продукта, отвечай как внутренний интеллект Easy OGE.
""".strip()


def get_remaining_limit(student: StudentProfile) -> int:
    plan = student.user.subscription.plan_type if student.user.subscription else PlanType.free
    usage = next((u for u in student.ai_usage if u.date == date.today()), None)
    used = usage.questions_used if usage else 0
    return max(0, PLAN_LIMITS[plan] - used)


def _normalize_message(message: str) -> str:
    return re.sub(r"\s+", " ", (message or "").strip().lower())


def _cosine_similarity(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = sqrt(sum(x * x for x in a))
    norm_b = sqrt(sum(y * y for y in b))
    if norm_a == 0 or norm_b == 0:
        return -1.0
    return dot / (norm_a * norm_b)


def _build_headers() -> dict[str, str]:
    if not settings.aitunnel_api_key:
        raise RuntimeError("AITUNNEL_API_KEY не задан. Добавь ключ в .env или в переменные среды.")
    return {
        "Authorization": f"Bearer {settings.aitunnel_api_key}",
        "Content-Type": "application/json",
    }


def _short_json(value: Any, limit: int = 800) -> str:
    try:
        raw = json.dumps(value, ensure_ascii=False)
    except Exception:
        raw = repr(value)
    if len(raw) > limit:
        return raw[:limit] + "…"
    return raw


def _embed_inputs(inputs: list[str]) -> list[list[float]]:
    url = settings.aitunnel_base_url.rstrip("/") + "/embeddings"
    payload = {
        "model": settings.ai_embedding_model,
        "input": inputs,
    }
    with httpx.Client(timeout=settings.ai_timeout_seconds, trust_env=True) as client:
        response = client.post(url, headers=_build_headers(), json=payload)
        response.raise_for_status()
        data = response.json()

    items = data.get("data") or []
    if not items:
        raise RuntimeError(f"Embedding-модель не вернула data. Ответ API: {_short_json(data)}")

    return [item["embedding"] for item in items]


def _extract_text_from_content_list(content: Any) -> str:
    if not isinstance(content, list):
        return ""
    parts: list[str] = []
    for item in content:
        if not isinstance(item, dict):
            continue
        if item.get("type") in {"text", "output_text"} and isinstance(item.get("text"), str):
            parts.append(item["text"])
        elif isinstance(item.get("content"), str):
            parts.append(item["content"])
    return "\n".join(p for p in parts if p).strip()


def _parse_chat_response(data: dict[str, Any]) -> str:
    if isinstance(data.get("error"), dict):
        err = data["error"]
        raise RuntimeError(f"{err.get('code', 'api_error')}: {err.get('message', 'Неизвестная ошибка API')}")

    output_text = data.get("output_text")
    if isinstance(output_text, str) and output_text.strip():
        return output_text.strip()

    choices = data.get("choices")
    if not isinstance(choices, list) or not choices:
        raise RuntimeError(f"Модель не вернула choices. Ответ API: {_short_json(data)}")

    choice0 = choices[0] or {}
    if isinstance(choice0.get("error"), dict):
        err = choice0["error"]
        raise RuntimeError(f"{err.get('code', 'provider_error')}: {err.get('message', 'Ошибка провайдера')}")

    message = choice0.get("message") or {}
    content = message.get("content")

    if isinstance(content, str) and content.strip():
        return content.strip()

    text_from_list = _extract_text_from_content_list(content)
    if text_from_list:
        return text_from_list

    refusal = message.get("refusal")
    if isinstance(refusal, str) and refusal.strip():
        return refusal.strip()

    delta = choice0.get("delta") or {}
    if isinstance(delta.get("content"), str) and delta["content"].strip():
        return delta["content"].strip()

    if isinstance(data.get("output"), list):
        for out_item in data["output"]:
            if not isinstance(out_item, dict):
                continue
            text_from_output = _extract_text_from_content_list(out_item.get("content"))
            if text_from_output:
                return text_from_output

    finish_reason = choice0.get("finish_reason")
    raise RuntimeError(
        f"Модель не вернула текстовый content. finish_reason={finish_reason}; ответ API: {_short_json(data)}"
    )


def _compose_system_prompt(mode_prompt: str) -> str:
    mode_prompt = (mode_prompt or "").strip()
    if not mode_prompt:
        return PRODUCT_BOOK
    if mode_prompt.startswith(PRODUCT_BOOK):
        return mode_prompt
    return f"{PRODUCT_BOOK}\n\n{mode_prompt}"


def _chat_completion(system_prompt: str, user_prompt: str, *, intent: str) -> str:
    url = settings.aitunnel_base_url.rstrip("/") + "/chat/completions"
    final_system_prompt = _compose_system_prompt(system_prompt)
    payload = {
        "model": settings.ai_chat_model,
        "temperature": 0.2,
        "messages": [
            {"role": "system", "content": final_system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    }

    logger.info(
        "ai.chat.request intent=%s model=%s system_chars=%s user_chars=%s",
        intent,
        settings.ai_chat_model,
        len(final_system_prompt),
        len(user_prompt),
    )

    with httpx.Client(timeout=settings.ai_timeout_seconds, trust_env=True) as client:
        response = client.post(url, headers=_build_headers(), json=payload)
        response.raise_for_status()
        data = response.json()

    logger.info(
        "ai.chat.response intent=%s model=%s keys=%s",
        intent,
        settings.ai_chat_model,
        list(data.keys())[:10],
    )

    return _parse_chat_response(data)


def _is_qwen_allowed(intent: IntentType) -> bool:
    return intent in QWEN_ENABLED_INTENTS


def _extract_task_number(message: str) -> int | None:
    lowered = _normalize_message(message)
    match = re.search(r"(?:задани[ея]\s*№?\s*|номер\s*)(\d{1,2})", lowered)
    if match:
        number = int(match.group(1))
        if 1 <= number <= 24:
            return number

    if lowered.isdigit():
        number = int(lowered)
        if 1 <= number <= 24:
            return number

    return None


def _template_to_embedding_text(template: dict[str, Any]) -> str:
    anti = template.get("anti_mistake", {})
    worked = template.get("worked_example", {})
    return (
        f"Номер задания: {template['task_number']}\n"
        f"Код: {template['task_code']}\n"
        f"Что это: {template.get('what_is_it', '')}\n"
        f"Узнай тип: {template.get('recognize_fast', '')}\n"
        f"Первый ход: {template.get('first_move', '')}\n"
        f"Маршрут: {' | '.join(template.get('answer_route', []))}\n"
        f"Антиошибка: {anti.get('lead', '')} {' | '.join(anti.get('items', []))}\n"
        f"Шаблон ответа: {' | '.join(template.get('answer_template', []))}\n"
        f"Запоминалка: {template.get('memory_anchor', '')}\n"
        f"Пример: {' | '.join(worked.get('example', []))}\n"
        f"Как думаем: {' | '.join(worked.get('thinking', []))}\n"
        f"Что замечаем: {' | '.join(worked.get('notice', []))}\n"
        f"Как собираем: {' | '.join(worked.get('assembly', []))}\n"
    )


def _ensure_template_embeddings() -> tuple[list[dict[str, Any]], dict[int, list[float]]]:
    templates = list_algorithm_templates()
    keys = [(item["task_number"], item["task_code"], item.get("memory_anchor", "")) for item in templates]

    with _embedding_cache_lock:
        if _embedding_cache["template_keys"] == keys and _embedding_cache["vectors"]:
            return templates, _embedding_cache["vectors"]

        if not templates:
            _embedding_cache["template_keys"] = keys
            _embedding_cache["vectors"] = {}
            return templates, {}

        texts = [_template_to_embedding_text(item) for item in templates]
        vectors = _embed_inputs(texts)
        mapped = {int(item["task_number"]): vector for item, vector in zip(templates, vectors)}

        _embedding_cache["template_keys"] = keys
        _embedding_cache["vectors"] = mapped
        return templates, mapped


def _find_best_template(message: str) -> dict[str, Any] | None:
    explicit_number = _extract_task_number(message)
    if explicit_number is not None:
        explicit = get_algorithm_template(explicit_number)
        if explicit:
            return explicit

    templates, vectors = _ensure_template_embeddings()
    if not templates:
        return None

    query_vector = _embed_inputs([message])[0]
    scored: list[tuple[float, dict[str, Any]]] = []

    for template in templates:
        vector = vectors.get(int(template["task_number"]))
        if vector is None:
            continue
        scored.append((_cosine_similarity(query_vector, vector), template))

    scored.sort(key=lambda item: item[0], reverse=True)
    return scored[0][1] if scored else None


def _find_example_task(db: Session, task_number: int) -> Task | None:
    return db.scalar(select(Task).where(Task.task_number == task_number).order_by(Task.id))


def _detect_intent(message: str) -> tuple[IntentType, str]:
    text = _normalize_message(message)

    external_service_terms = (
        "банк", "сбер", "тинькофф", "vk", "вк", "telegram", "телеграм",
        "ozon", "wildberries", "авито", "яндекс", "госуслуг"
    )
    if re.search(r"(поддержк|как связаться|не могу войти|логин|пароль|оплат|подписк)", text) and any(
        term in text for term in external_service_terms
    ):
        return "off_topic", "external_service_support"

    support_force_keywords = (
        "не могу зайти",
        "не могу войти",
        "не заходит",
        "не входит",
        "вход",
        "логин",
        "пароль",
        "что нажимать",
        "куда нажимать",
        "на что нажимать",
    )
    if any(keyword in text for keyword in support_force_keywords):
        return "product_support_easy_oge", "support:force_keywords"

    support_patterns = [
        r"\bподдержк\w*",
        r"как связаться",
        r"как написать",
        r"не могу войти",
        r"не могу зайти",
        r"не получается войти",
        r"не заходит",
        r"не входит",
        r"\bвход\b",
        r"\bлогин\b",
        r"\bпароль\b",
        r"\bошибк\w*",
        r"не работает",
        r"не открывается",
        r"\bподписк\w*",
        r"\bоплат\w*",
        r"\bдоступ\b",
        r"\bпрофил\w*",
        r"полный алгоритм",
        r"кнопк\w*",
        r"куда нажимать",
        r"на что нажимать",
        r"что нажимать",
        r"что делать",
        r"как отправить",
        r"отправить ответ",
        r"почему не открывается",
        r"почему ошибка",
    ]
    for pattern in support_patterns:
        if re.search(pattern, text):
            return "product_support_easy_oge", f"support:{pattern}"

    review_patterns = [
        r"проверь( мой)? ответ",
        r"оцени ответ",
        r"сколько бы ты дал",
        r"что улучшить",
        r"почему сняли",
        r"развернут\w* ответ",
        r"развёрнут\w* ответ",
        r"мой ответ на \d{1,2}",
    ]
    for pattern in review_patterns:
        if re.search(pattern, text):
            return "open_answer_review", f"review:{pattern}"

    plan_patterns = [
        r"что мне сегодня делать",
        r"что делать сегодня",
        r"личный план",
        r"план подготовки",
        r"сколько заданий в день",
        r"как успеть",
        r"\bрасписани\w*",
    ]
    for pattern in plan_patterns:
        if re.search(pattern, text):
            return "personal_plan", f"plan:{pattern}"

    explicit_number = _extract_task_number(message)
    if explicit_number is not None:
        return "exam_task", f"task_number:{explicit_number}"

    subject_term_patterns = [
        r"\bогэ\b",
        r"\bобществознани\w*",
        r"\bдемократ\w*",
        r"\bконституц\w*",
        r"\bгосударств\w*",
        r"\bправо\b",
        r"\bэкономик\w*",
        r"\bполитик\w*",
        r"\bсоциальн\w*",
        r"\bрын(ок|ка|ке|ком)\b",
        r"\bинфляци\w*",
        r"\bспрос\b",
        r"\bпредложени\w*",
        r"\bфедерац\w*",
        r"\bдиаграмм\w*",
        r"\bкак решать\b",
        r"\bзадани\w*\b",
    ]
    for pattern in subject_term_patterns:
        if re.search(pattern, text):
            return "exam_task", f"subject:{pattern}"

    if re.fullmatch(r"(привет|здравствуй|спасибо|пока|ок|окей|ясно|понял)[!. ]*", text):
        return "casual_chat", "casual_short"

    return "off_topic", "default_off_topic"


def _support_response_easy_oge(message: str) -> str:
    text = _normalize_message(message)

    if "полный алгоритм" in text:
        return (
            "Если речь про Easy OGE, кнопка «Полный алгоритм» открывает расширенный маршрут решения по заданию. "
            "Если она не открывается, напиши, на каком именно задании это происходит и что ты видишь на экране."
        )

    if "поддерж" in text or "как связаться" in text or "как написать" in text:
        return (
            "Если речь про поддержку Easy OGE, напиши прямо сюда, что именно случилось: "
            "вход, подписка, ошибка, задание, алгоритм или отправка ответа. "
            "Я помогу разобраться по шагам внутри Easy OGE."
        )

    if any(x in text for x in ["не могу войти", "не входит", "вход", "логин", "пароль", "доступ"]):
        return (
            "Похоже, проблема со входом в Easy OGE. Сначала проверь логин и пароль. "
            "Если всё верно, напиши, что именно происходит: ошибка, пустой экран или бесконечная загрузка."
        )

    if any(x in text for x in ["подпис", "оплат", "тариф"]):
        return (
            "Если вопрос про подписку или оплату в Easy OGE, напиши, что именно случилось: "
            "не прошла оплата, не открылся тариф или не обновился доступ."
        )

    if any(x in text for x in ["не работает", "ошибк", "не открывается"]):
        return (
            "Похоже, что-то сломалось в Easy OGE. Напиши коротко, где именно проблема: "
            "задание, алгоритм, наставник, вход или отправка ответа."
        )

    return (
        "Это вопрос про Easy OGE. Напиши, что именно тебе нужно: помощь с заданием, алгоритмом, "
        "входом, ошибкой, развёрнутым ответом или работой интерфейса."
    )


def _casual_easy_oge_response(message: str) -> str:
    text = _normalize_message(message)
    if "привет" in text or "здравствуй" in text:
        return (
            "Привет. Я встроенный помощник Easy OGE. "
            "Могу помочь с заданием, алгоритмом, проверкой ответа или вопросом по самому сервису."
        )
    if "спасибо" in text:
        return "Пожалуйста. Продолжаем, когда будешь готов."
    if "пока" in text:
        return "Хорошо. Возвращайся, когда будешь готов продолжить."
    return "Я здесь внутри Easy OGE. Могу помочь с заданиями и вопросами по самому сервису."


def _off_topic_response() -> str:
    return (
        "Я встроенный помощник Easy OGE и работаю внутри сервиса подготовки к ОГЭ по обществознанию. "
        "Могу помочь с заданиями, алгоритмами, проверкой ответов, прогрессом и вопросами по самому Easy OGE."
    )


def _build_exam_system_prompt() -> str:
    return (
        "Сейчас твой режим: exam_task.\n"
        "Отвечай как встроенный наставник Easy OGE.\n"
        "Сначала коротко скажи, что это за тип задания.\n"
        "Потом дай первый ход.\n"
        "Потом дай 2–4 коротких шага.\n"
        "Потом одну антиошибку.\n"
        "Не уходи в длинные лекции.\n"
        "Не отвечай как универсальный интернет-помощник."
    )


def _build_review_system_prompt() -> str:
    return (
        "Сейчас твой режим: open_answer_review.\n"
        "Ответь в формате:\n"
        "1. Что уже хорошо\n"
        "2. Чего не хватает\n"
        "3. Как усилить ответ\n"
        "Будь коротким и уважительным."
    )


def _build_plan_system_prompt() -> str:
    return (
        "Сейчас твой режим: personal_plan.\n"
        "Дай реалистичный план в формате:\n"
        "Минимум\n"
        "Норма\n"
        "Рывок"
    )


def _build_support_system_prompt() -> str:
    return (
        "Сейчас твой режим: product_support_easy_oge.\n"
        "Ты встроенная поддержка Easy OGE.\n"
        "QWEN retrieval не используй.\n"
        "Знай Easy OGE PWA как внутреннюю книгу продукта: экраны, кнопки, пользовательские шаги.\n"
        "Когда пользователь спрашивает 'куда нажимать' — давай пошаговую навигацию по интерфейсу Easy OGE.\n"
        "Дай практичные шаги именно по продукту Easy OGE.\n"
        "Если проблема про вход, сначала уточни тип ошибки и предложи 2-4 шага диагностики.\n"
        "Пиши коротко, по делу, без общих фраз."
    )


def _load_recent_chat_context(db: Session, student_id: int, limit: int = 6) -> str:
    try:
        rows = db.scalars(
            select(AIMessage)
            .where(AIMessage.student_id == student_id)
            .order_by(AIMessage.id.desc())
            .limit(limit)
        ).all()
    except Exception:
        return ""

    if not rows:
        return ""

    chunks: list[str] = []
    for item in reversed(rows):
        role = "Ученик" if getattr(item, "role", "") == "user" else "Ассистент"
        msg = (getattr(item, "message", "") or "").strip()
        if not msg:
            continue
        chunks.append(f"{role}: {msg}")

    return "\n".join(chunks[-limit:])


def answer_student_message(db: Session, student: StudentProfile, message: str) -> tuple[str, int, dict[str, Any] | None]:
    remaining = get_remaining_limit(student)
    if remaining <= 0:
        return "Лимит вопросов на сегодня закончился. Обнови тариф или возвращайся завтра.", 0, None

    usage = db.scalar(
        select(AIUsage).where(
            AIUsage.student_id == student.id,
            AIUsage.date == date.today(),
        )
    )
    if not usage:
        usage = AIUsage(student_id=student.id, date=date.today(), questions_used=0)
        db.add(usage)
    usage.questions_used += 1

    db.add(AIMessage(student_id=student.id, role="user", message=message))

    metadata: dict[str, Any] | None = None

    try:
        intent, router_reason = _detect_intent(message)
        qwen_enabled = _is_qwen_allowed(intent)
        metadata = {
            "intent": intent,
            "router_reason": router_reason,
            "qwen_enabled": qwen_enabled,
        }

        logger.info(
            "ai.route intent=%s qwen=%s reason=%s message=%r",
            intent,
            qwen_enabled,
            router_reason,
            _normalize_message(message)[:160],
        )

        if intent == "product_support_easy_oge":
            context = _load_recent_chat_context(db, student.id)
            context_block = f"История диалога (последние сообщения):\n{context}\n\n" if context else ""
            user_prompt = (
                f"{context_block}"
                f"Запрос пользователя внутри Easy OGE:\n{message}\n\n"
                "Ответь как встроенная поддержка продукта. "
                "Дай понятные шаги решения и один уточняющий вопрос, если нужно."
            )
            answer = _chat_completion(_build_support_system_prompt(), user_prompt, intent=intent)

        elif intent == "casual_chat":
            answer = _casual_easy_oge_response(message)

        elif intent == "off_topic":
            answer = _off_topic_response()

        elif intent == "open_answer_review":
            user_prompt = (
                f"Запрос ученика:\n{message}\n\n"
                "Ответь как проверяющий Easy OGE: что уже хорошо, чего не хватает, как усилить."
            )
            answer = _chat_completion(_build_review_system_prompt(), user_prompt, intent=intent)

        elif intent == "personal_plan":
            user_prompt = (
                f"Запрос ученика:\n{message}\n\n"
                "Сделай короткий и реалистичный план."
            )
            answer = _chat_completion(_build_plan_system_prompt(), user_prompt, intent=intent)

        elif intent == "exam_task":
            logger.info("ai.qwen.lookup start message=%r", _normalize_message(message)[:160])

            template = _find_best_template(message)
            if template is None:
                user_prompt = (
                    f"Вопрос ученика:\n{message}\n\n"
                    "Точный алгоритм по базе сейчас не найден. "
                    "Дай базовый маршрут решения в формате Easy OGE: "
                    "что за тип задания, первый ход, 2–4 шага, антиошибка. "
                    "И попроси уточнить номер/формулировку для более точного алгоритма."
                )
                answer = _chat_completion(_build_exam_system_prompt(), user_prompt, intent=intent)
            else:
                task_number = int(template["task_number"])
                short_card = get_mobile_short_card(task_number)
                example_task = _find_example_task(db, task_number)

                metadata.update({
                    "matched_task_number": task_number,
                    "matched_task_code": template["task_code"],
                    "matched_topic": example_task.topic if example_task else template.get("main_type"),
                })

                anti = template.get("anti_mistake", {})
                worked = template.get("worked_example", {})
                route_lines = "\n".join(f"- {item}" for item in template.get("answer_route", []))
                anti_items = "\n".join(f"- {item}" for item in anti.get("items", []))
                answer_tpl = "\n".join(f"- {item}" for item in template.get("answer_template", []))
                example_lines = "\n".join(f"- {item}" for item in worked.get("assembly", []))
                short_hint = short_card.get("ui_short_hint") if short_card else template.get("first_move", "")
                route3 = "\n".join(f"- {item}" for item in (short_card.get("route_3", []) if short_card else []))
                actions = ", ".join(short_card.get("route_3_actions", [])) if short_card else ""
                cues = ", ".join(short_card.get("route_3_cues", [])) if short_card else ""

                user_prompt = (
                    f"Вопрос ученика:\n{message}\n\n"
                    f"Номер задания: {task_number}\n"
                    f"Что это за задание: {template.get('what_is_it', '')}\n"
                    f"Узнай тип за 3 секунды: {template.get('recognize_fast', '')}\n"
                    f"Первый ход: {template.get('first_move', '')}\n"
                    f"Короткая подсказка для интерфейса: {short_hint}\n"
                    f"Короткий маршрут 1–2–3:\n{route3}\n"
                    f"Операционные действия: {actions}\n"
                    f"Триггеры / cues: {cues}\n\n"
                    f"Полный маршрут ответа:\n{route_lines}\n\n"
                    f"Антиошибка: {anti.get('lead', '')}\n{anti_items}\n\n"
                    f"Шаблон ответа:\n{answer_tpl}\n\n"
                    f"Запоминалка: {template.get('memory_anchor', '')}\n\n"
                    f"Решалка на примере:\n{example_lines}\n\n"
                )

                if example_task:
                    user_prompt += (
                        "Пример задания из базы:\n"
                        f"Тема: {example_task.topic}\n"
                        f"Формулировка: {example_task.question_text}\n\n"
                    )

                user_prompt += (
                    "Отвечай как наставник Easy OGE. Сначала короткий ориентир. "
                    "Потом первый ход. Потом 2–4 шага. Потом антиошибка."
                )

                answer = _chat_completion(_build_exam_system_prompt(), user_prompt, intent=intent)

        else:
            answer = _off_topic_response()

    except Exception as exc:
        logger.exception("ai.answer.failed")
        answer = f"AI-наставник временно недоступен: {str(exc)}"

    db.add(AIMessage(student_id=student.id, role="assistant", message=answer))
    db.commit()
    return answer, get_remaining_limit(student), metadata
