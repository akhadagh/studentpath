from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timezone

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.assessment import Assessment, Result
from app.schemas.assessment import AssessmentSubmit, AssessmentResponse, ResultResponse
from app.services.scoring_engine import (
    calculate_scores,
    get_top_matches,
    get_programme_recommendations,
    ASSESSMENT_QUESTIONS,
)

router = APIRouter()


@router.get("/questions")
async def get_assessment_questions():
    questions = {}
    for key, q in ASSESSMENT_QUESTIONS.items():
        questions[key] = {
            "question": q["question"],
            "options": {k: v["label"] for k, v in q["options"].items()},
        }
    return {"questions": questions, "total_steps": len(ASSESSMENT_QUESTIONS)}


@router.post("/start", response_model=AssessmentResponse)
async def start_assessment(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Assessment)
        .where(Assessment.user_id == current_user.id)
        .where(Assessment.status == "in_progress")
        .order_by(Assessment.created_at.desc())
    )
    existing = result.scalar_one_or_none()

    if existing:
        return AssessmentResponse.model_validate(existing)

    assessment = Assessment(user_id=current_user.id, total_steps=len(ASSESSMENT_QUESTIONS))
    db.add(assessment)
    await db.commit()
    await db.refresh(assessment)
    return AssessmentResponse.model_validate(assessment)


@router.post("/{assessment_id}/submit", response_model=ResultResponse)
async def submit_assessment(
    assessment_id: int,
    submission: AssessmentSubmit,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Assessment).where(
            Assessment.id == assessment_id,
            Assessment.user_id == current_user.id,
        )
    )
    assessment = result.scalar_one_or_none()

    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    if assessment.status == "completed":
        raise HTTPException(status_code=400, detail="Assessment already completed")

    assessment.answers = submission.answers
    assessment.status = "completed"
    assessment.completed_at = datetime.now(timezone.utc)

    scores, explanations = calculate_scores(submission.answers)
    top_matches = await get_top_matches(scores, explanations, db)
    programme_recs = await get_programme_recommendations(scores, db)

    new_result = Result(
        user_id=current_user.id,
        assessment_id=assessment.id,
        top_matches=top_matches,
        programme_recommendations=programme_recs,
        career_paths=scores,
        cluster_scores=scores,
        explanations=explanations,
    )
    db.add(new_result)
    await db.commit()
    await db.refresh(new_result)

    return ResultResponse.model_validate(new_result)
