from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from typing import List

from app.core.database import get_db
from app.models.programme import Programme, CareerPath
from app.schemas.programme import ProgrammeResponse, CareerPathResponse

router = APIRouter()


@router.get("/", response_model=List[ProgrammeResponse])
async def get_programmes(
    field: str = Query(None, description="Filter by field"),
    search: str = Query(None, description="Search by name"),
    db: AsyncSession = Depends(get_db),
):
    query = select(Programme)
    if field:
        query = query.where(Programme.field == field)
    if search:
        query = query.where(Programme.name.ilike(f"%{search}%"))

    result = await db.execute(query.limit(50))
    programmes = result.scalars().all()
    return [ProgrammeResponse.model_validate(p) for p in programmes]


@router.get("/careers", response_model=List[CareerPathResponse])
async def get_career_paths(
    category: str = Query(None, description="Filter by category"),
    search: str = Query(None, description="Search by name"),
    db: AsyncSession = Depends(get_db),
):
    query = select(CareerPath)
    if category:
        query = query.where(CareerPath.category == category)
    if search:
        query = query.where(CareerPath.name.ilike(f"%{search}%"))

    result = await db.execute(query.limit(50))
    careers = result.scalars().all()
    return [CareerPathResponse.model_validate(c) for c in careers]


@router.get("/fields")
async def get_fields():
    from app.services.scoring_engine import CAREER_CATEGORIES

    return {
        "fields": [
            {"key": k, "name": v["name"]}
            for k, v in CAREER_CATEGORIES.items()
        ]
    }
