from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.saved import SavedUniversity, SavedProgramme
from app.models.university import University
from app.models.programme_v2 import Programme

router = APIRouter()


class SaveUniversityRequest(BaseModel):
    university_id: int


class SaveProgrammeRequest(BaseModel):
    programme_id: int


@router.get("")
async def get_saved_items(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    unis_result = await db.execute(
        select(SavedUniversity).where(SavedUniversity.user_id == current_user.id)
    )
    saved_unis = unis_result.scalars().all()

    progs_result = await db.execute(
        select(SavedProgramme).where(SavedProgramme.user_id == current_user.id)
    )
    saved_progs = progs_result.scalars().all()

    universities = []
    for su in saved_unis:
        uni_result = await db.execute(
            select(University).where(University.id == su.university_id)
        )
        uni = uni_result.scalar_one_or_none()
        if uni:
            universities.append({
                "id": su.id,
                "university_id": uni.id,
                "name": uni.name,
                "short_name": uni.short_name,
                "region": uni.region,
                "institution_type": uni.institution_type,
                "saved_at": su.created_at,
            })

    programmes = []
    for sp in saved_progs:
        prog_result = await db.execute(
            select(Programme).where(Programme.id == sp.programme_id)
        )
        prog = prog_result.scalar_one_or_none()
        if prog:
            programmes.append({
                "id": sp.id,
                "programme_id": prog.id,
                "name": prog.name,
                "degree_type": prog.degree_type,
                "university_id": prog.university_id,
                "saved_at": sp.created_at,
            })

    return {"universities": universities, "programmes": programmes}


@router.post("/universities")
async def save_university(
    req: SaveUniversityRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing = await db.execute(
        select(SavedUniversity).where(
            SavedUniversity.user_id == current_user.id,
            SavedUniversity.university_id == req.university_id,
        )
    )
    if existing.scalar_one_or_none():
        return {"message": "Already saved"}

    saved = SavedUniversity(user_id=current_user.id, university_id=req.university_id)
    db.add(saved)
    await db.commit()
    return {"message": "University saved"}


@router.post("/programmes")
async def save_programme(
    req: SaveProgrammeRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing = await db.execute(
        select(SavedProgramme).where(
            SavedProgramme.user_id == current_user.id,
            SavedProgramme.programme_id == req.programme_id,
        )
    )
    if existing.scalar_one_or_none():
        return {"message": "Already saved"}

    saved = SavedProgramme(user_id=current_user.id, programme_id=req.programme_id)
    db.add(saved)
    await db.commit()
    return {"message": "Programme saved"}


@router.delete("/universities/{saved_id}")
async def unsave_university(
    saved_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(SavedUniversity).where(
            SavedUniversity.id == saved_id,
            SavedUniversity.user_id == current_user.id,
        )
    )
    saved = result.scalar_one_or_none()
    if not saved:
        raise HTTPException(status_code=404, detail="Not found")

    await db.delete(saved)
    await db.commit()
    return {"message": "Removed"}


@router.delete("/programmes/{saved_id}")
async def unsave_programme(
    saved_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(SavedProgramme).where(
            SavedProgramme.id == saved_id,
            SavedProgramme.user_id == current_user.id,
        )
    )
    saved = result.scalar_one_or_none()
    if not saved:
        raise HTTPException(status_code=404, detail="Not found")

    await db.delete(saved)
    await db.commit()
    return {"message": "Removed"}
