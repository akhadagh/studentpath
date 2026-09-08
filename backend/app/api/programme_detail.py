from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.programme_v2 import Programme, ProgrammeRequirement, ProgrammeCutOff
from app.models.university import University

router = APIRouter()


@router.get("/{programme_id}")
async def get_programme_detail(
    programme_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Programme).where(Programme.id == programme_id)
    )
    programme = result.scalar_one_or_none()

    if not programme:
        raise HTTPException(status_code=404, detail="Programme not found")

    uni_result = await db.execute(
        select(University).where(University.id == programme.university_id)
    )
    university = uni_result.scalar_one_or_none()

    reqs_result = await db.execute(
        select(ProgrammeRequirement).where(ProgrammeRequirement.programme_id == programme.id)
    )
    requirements = reqs_result.scalars().all()

    cutoffs_result = await db.execute(
        select(ProgrammeCutOff)
        .where(ProgrammeCutOff.programme_id == programme.id)
        .order_by(ProgrammeCutOff.academic_year.desc())
        .limit(10)
    )
    cut_offs = cutoffs_result.scalars().all()

    return {
        "programme": programme,
        "university": {
            "id": university.id if university else None,
            "name": university.name if university else None,
            "short_name": university.short_name if university else None,
            "institution_type": university.institution_type if university else None,
            "region": university.region if university else None,
            "city": university.city if university else None,
            "verification_status": university.verification_status if university else None,
        } if university else None,
        "requirements": requirements,
        "cut_offs": cut_offs,
    }


@router.get("/{programme_id}/requirements")
async def get_programme_requirements(
    programme_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ProgrammeRequirement).where(ProgrammeRequirement.programme_id == programme_id)
    )
    requirements = result.scalars().all()
    return {"requirements": requirements}


@router.get("/{programme_id}/cut-offs")
async def get_programme_cut_offs(
    programme_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ProgrammeCutOff)
        .where(ProgrammeCutOff.programme_id == programme_id)
        .order_by(ProgrammeCutOff.academic_year.desc())
    )
    cut_offs = result.scalars().all()
    return {"cut_offs": cut_offs}
