from __future__ import annotations

import importlib.util
import sys
import types
from enum import Enum
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
AI_SERVICE_PATH = ROOT / "Easy_OGE_backend_live_v2" / "app" / "services" / "ai_service.py"


def _install_stub_modules() -> None:
    app_mod = types.ModuleType("app")
    app_mod.__path__ = []  # type: ignore[attr-defined]
    sys.modules["app"] = app_mod

    config_mod = types.ModuleType("app.config")

    class _Settings:
        ai_timeout_seconds = 1
        aitunnel_base_url = "https://example.com/v1"
        aitunnel_api_key = "test-key"
        ai_chat_model = "gpt-4.1-mini"
        ai_embedding_model = "qwen3-embedding-4b"

    config_mod.get_settings = lambda: _Settings()
    sys.modules["app.config"] = config_mod

    models_mod = types.ModuleType("app.models")

    class PlanType(str, Enum):
        free = "free"
        basic = "basic"
        pro = "pro"

    class AIMessage:
        def __init__(self, *args, **kwargs):
            pass

    class AIUsage:
        def __init__(self, *args, **kwargs):
            self.questions_used = 0

    class StudentProfile:
        pass

    class Task:
        pass

    models_mod.AIMessage = AIMessage
    models_mod.AIUsage = AIUsage
    models_mod.PlanType = PlanType
    models_mod.StudentProfile = StudentProfile
    models_mod.Task = Task
    sys.modules["app.models"] = models_mod

    algo_mod = types.ModuleType("app.services.algorithm_template_service")
    algo_mod.get_algorithm_template = lambda *_args, **_kwargs: None
    algo_mod.get_mobile_short_card = lambda *_args, **_kwargs: None
    algo_mod.list_algorithm_templates = lambda: []
    sys.modules["app.services.algorithm_template_service"] = algo_mod

    sqlalchemy_mod = types.ModuleType("sqlalchemy")
    sqlalchemy_mod.select = lambda *args, **kwargs: ("select", args, kwargs)
    sys.modules["sqlalchemy"] = sqlalchemy_mod

    orm_mod = types.ModuleType("sqlalchemy.orm")
    orm_mod.Session = object
    sys.modules["sqlalchemy.orm"] = orm_mod

    httpx_mod = types.ModuleType("httpx")

    class _Client:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc_val, exc_tb):
            return False

        def post(self, *args, **kwargs):  # pragma: no cover
            raise RuntimeError("Network should not be called in routing tests")

    httpx_mod.Client = _Client
    sys.modules["httpx"] = httpx_mod


def _load_ai_service_module():
    _install_stub_modules()
    spec = importlib.util.spec_from_file_location("test_ai_service_module", AI_SERVICE_PATH)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_intent_routing_for_different_ai_modes() -> None:
    ai = _load_ai_service_module()

    assert ai._detect_intent("как решать 12")[0] == "exam_task"
    assert ai._detect_intent("привет. как связаться с поддержкой")[0] == "product_support_easy_oge"
    assert ai._detect_intent("проверь мой ответ на 21")[0] == "open_answer_review"
    assert ai._detect_intent("сделай мне личный план подготовки")[0] == "personal_plan"
    assert ai._detect_intent("привет")[0] == "casual_chat"
    assert ai._detect_intent("какой айфон купить")[0] == "off_topic"
    assert ai._detect_intent("на что нажимать чтобы войти")[0] == "product_support_easy_oge"
    assert ai._detect_intent("Не могу зайти, что нажимать?")[0] == "product_support_easy_oge"


def test_qwen_enabled_only_for_exam_task_mode() -> None:
    ai = _load_ai_service_module()

    assert ai._is_qwen_allowed("exam_task") is True
    assert ai._is_qwen_allowed("product_support_easy_oge") is False
    assert ai._is_qwen_allowed("open_answer_review") is False
    assert ai._is_qwen_allowed("personal_plan") is False
    assert ai._is_qwen_allowed("casual_chat") is False
    assert ai._is_qwen_allowed("off_topic") is False


def test_product_support_mode_uses_gpt_chat_completion() -> None:
    source = AI_SERVICE_PATH.read_text(encoding="utf-8")
    assert 'if intent == "product_support_easy_oge":' in source
    assert "answer = _chat_completion(_build_support_system_prompt(), user_prompt, intent=intent)" in source


def test_exam_mode_uses_gpt_even_when_template_not_found() -> None:
    ai = _load_ai_service_module()

    class _Query:
        def where(self, *_args, **_kwargs):
            return self

    ai.select = lambda *_args, **_kwargs: _Query()
    ai.AIUsage.student_id = "student_id"
    ai.AIUsage.date = "date"
    ai._detect_intent = lambda _message: ("exam_task", "test")
    ai._find_best_template = lambda _message: None

    captured: dict[str, str] = {}

    def _fake_chat_completion(system_prompt: str, user_prompt: str, *, intent: str) -> str:
        captured["intent"] = intent
        captured["system_prompt"] = system_prompt
        captured["user_prompt"] = user_prompt
        return "ok"

    ai._chat_completion = _fake_chat_completion

    class _DB:
        def scalar(self, _query):
            return None

        def add(self, _obj):
            return None

        def commit(self):
            return None

    class _User:
        subscription = None

    class _Student:
        id = 1
        user = _User()
        ai_usage = []

    answer, _remaining, metadata = ai.answer_student_message(_DB(), _Student(), "как решать 3")
    assert answer == "ok"
    assert metadata["intent"] == "exam_task"
    assert metadata["qwen_enabled"] is True
    assert captured["intent"] == "exam_task"


def test_support_mode_calls_gpt_chat_completion_at_runtime() -> None:
    ai = _load_ai_service_module()

    class _Query:
        def where(self, *_args, **_kwargs):
            return self

    ai.select = lambda *_args, **_kwargs: _Query()
    ai.AIUsage.student_id = "student_id"
    ai.AIUsage.date = "date"
    ai._detect_intent = lambda _message: ("product_support_easy_oge", "test")
    ai._load_recent_chat_context = lambda _db, _student_id: "Ученик: привет\nАссистент: привет!"

    captured: dict[str, str] = {}

    def _fake_chat_completion(system_prompt: str, user_prompt: str, *, intent: str) -> str:
        captured["intent"] = intent
        captured["system_prompt"] = system_prompt
        captured["user_prompt"] = user_prompt
        return "support-ok"

    ai._chat_completion = _fake_chat_completion

    class _DB:
        def scalar(self, _query):
            return None

        def add(self, _obj):
            return None

        def commit(self):
            return None

    class _User:
        subscription = None

    class _Student:
        id = 1
        user = _User()
        ai_usage = []

    answer, _remaining, metadata = ai.answer_student_message(_DB(), _Student(), "не могу зайти, что нажимать?")
    assert answer == "support-ok"
    assert metadata["intent"] == "product_support_easy_oge"
    assert metadata["qwen_enabled"] is False
    assert captured["intent"] == "product_support_easy_oge"
    assert "История диалога" in captured["user_prompt"]


def test_support_system_prompt_contains_pwa_book_instruction() -> None:
    ai = _load_ai_service_module()
    prompt = ai._build_support_system_prompt()
    assert "PWA" in prompt
    assert "внутреннюю книгу продукта" in prompt
    assert "куда нажимать" in prompt
