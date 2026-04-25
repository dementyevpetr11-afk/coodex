from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from sqlalchemy.orm import Session

from app.models import OpenAnswerSubmission, OpenAnswerStatus, StudentProfile, Task
from app.services.ai_service import _chat_completion


def load_rubrics() -> dict:
    path = Path(__file__).resolve().parent.parent / 'data' / 'open_answer_rubrics.json'
    return json.loads(path.read_text(encoding='utf-8'))


def _build_review_prompt(task: Task, answer_text: str, rubric: dict) -> tuple[str, str]:
    system = (
        'Ты — AI-ассистент менеджера Easy OGE. '
        'Твоя задача: сделать черновую проверку развёрнутого ответа ученика. '
        'Строго следуй критериям. Не выдумывай лишнего. '
        'Верни ТОЛЬКО JSON без markdown. '
        'Поля: score, strengths, missing, manager_comment, student_comment.'
    )
    user = (
        f"Номер задания: {task.task_number}\n"
        f"Тема: {task.topic}\n"
        f"Формулировка: {task.question_text}\n"
        f"Критерии: {json.dumps(rubric.get('criteria', []), ensure_ascii=False)}\n"
        f"Максимальный балл: {rubric.get('max_score', 0)}\n"
        f"Пример сильного ответа: {rubric.get('good', '')}\n"
        f"Пример слабого ответа: {rubric.get('weak', '')}\n\n"
        f"Ответ ученика:\n{answer_text}\n\n"
        'Оцени ответ и верни JSON вида '
        '{"score": 0, "strengths": ["..."], "missing": ["..."], "manager_comment": "...", "student_comment": "..."}'
    )
    return system, user


def generate_ai_draft(task: Task, answer_text: str) -> tuple[int | None, str | None, str | None]:
    rubrics = load_rubrics()
    rubric = rubrics.get(str(task.task_number))
    if not rubric:
        return None, 'Черновая AI-проверка пока не настроена для этого номера.', None
    try:
        system, user = _build_review_prompt(task, answer_text, rubric)
        raw = _chat_completion(system, user, intent="open_answer_review")
        data = json.loads(raw)
        score = int(data.get('score', 0))
        manager_comment = str(data.get('manager_comment', '')).strip()
        return score, manager_comment or 'AI подготовил черновой комментарий.', raw
    except Exception as e:
        return None, f'AI-черновик не удалось построить: {e}', None


def submit_open_answer(db: Session, student: StudentProfile, task: Task, answer_text: str) -> OpenAnswerSubmission:
    submission = OpenAnswerSubmission(
        student_id=student.id,
        task_id=task.id,
        answer_text=answer_text,
        status=OpenAnswerStatus.pending,
    )
    db.add(submission)
    db.flush()
    ai_score, ai_comment, ai_payload = generate_ai_draft(task, answer_text)
    if ai_score is not None or ai_comment:
        submission.ai_score = ai_score
        submission.ai_comment = ai_comment
        submission.ai_payload_json = ai_payload
        submission.status = OpenAnswerStatus.ai_drafted
    db.commit()
    db.refresh(submission)
    return submission


def rerun_ai_draft(db: Session, submission: OpenAnswerSubmission) -> OpenAnswerSubmission:
    ai_score, ai_comment, ai_payload = generate_ai_draft(submission.task, submission.answer_text)
    submission.ai_score = ai_score
    submission.ai_comment = ai_comment
    submission.ai_payload_json = ai_payload
    submission.status = OpenAnswerStatus.ai_drafted if (ai_score is not None or ai_comment) else OpenAnswerStatus.pending
    db.commit()
    db.refresh(submission)
    return submission


def manager_review_submission(db: Session, submission: OpenAnswerSubmission, score: int, comment: str) -> OpenAnswerSubmission:
    submission.manager_score = score
    submission.manager_comment = comment
    submission.status = OpenAnswerStatus.reviewed
    submission.reviewed_at = datetime.utcnow()
    db.commit()
    db.refresh(submission)
    return submission
