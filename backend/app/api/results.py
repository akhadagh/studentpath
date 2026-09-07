from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.assessment import Result
from app.schemas.assessment import ResultResponse

router = APIRouter()


@router.get("/my-results", response_model=List[ResultResponse])
async def get_my_results(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Result)
        .where(Result.user_id == current_user.id)
        .order_by(Result.completed_at.desc())
    )
    results = result.scalars().all()
    return [ResultResponse.model_validate(r) for r in results]


@router.get("/{result_id}", response_model=ResultResponse)
async def get_result(
    result_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Result).where(
            Result.id == result_id,
            Result.user_id == current_user.id,
        )
    )
    res = result.scalar_one_or_none()

    if not res:
        raise HTTPException(status_code=404, detail="Result not found")

    return ResultResponse.model_validate(res)
