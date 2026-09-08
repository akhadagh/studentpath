from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.university import University
from app.models.programme_v2 import Programme, ProgrammeRequirement, ProgrammeCutOff
from app.models.source import Source, VerificationLog

router = APIRouter()


class AdminUniversityCreate(BaseModel):
    name: str
    short_name: Optional[str] = None
    institution_type: str = "public"
    ownership_type: Optional[str] = None
    region: Optional[str] = None
    city: Optional[str] = None
    official_website: Optional[str] = None
    admissions_website: Optional[str] = None
    description: Optional[str] = None
    accreditation: Optional[str] = None


class AdminProgrammeCreate(BaseModel):
    university_id: int
    name: str
    normalised_name: Optional[str] = None
    degree_type: Optional[str] = None
    faculty: Optional[str] = None
    department: Optional[str] = None
    programme_level: str = "undergraduate"
    description: Optional[str] = None
    duration_years: int = 4
    career_cluster_keys: Optional[str] = None


class AdminRequirementCreate(BaseModel):
    programme_id: int
    requirement_type: str
    qualification_type: str = "WASSCE"
    subject: str
    minimum_grade: Optional[str] = None
    grade_points: Optional[int] = None
    requirement_description: Optional[str] = None
    academic_year: Optional[str] = None


class AdminCutOffCreate(BaseModel):
    programme_id: int
    academic_year: str
    cut_off_type: Optional[str] = None
    aggregate: Optional[float] = None
    notes: Optional[str] = None


class AdminSourceCreate(BaseModel):
    university_id: Optional[int] = None
    title: str
    url: str
    source_type: str
    academic_year: Optional[str] = None


async def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user


@router.get("/stats")
async def admin_stats(
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    uni_count = (await db.execute(select(University.__table__).select_from(University))).rowcount
    prog_count = (await db.execute(select(Programme.__table__).select_from(Programme))).rowcount
    req_count = (await db.execute(select(ProgrammeRequirement.__table__).select_from(ProgrammeRequirement))).rowcount
    source_count = (await db.execute(select(Source.__table__).select_from(Source))).rowcount

    return {
        "universities": uni_count,
        "programmes": prog_count,
        "requirements": req_count,
        "sources": source_count,
    }


@router.get("/universities")
async def list_universities_admin(
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    result = await db.execute(select(University).order_by(University.name))
    return result.scalars().all()


@router.post("/universities")
async def create_university(
    data: AdminUniversityCreate,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    uni = University(**data.model_dump())
    db.add(uni)
    await db.commit()
    await db.refresh(uni)
    return uni


@router.put("/universities/{uni_id}")
async def update_university(
    uni_id: int,
    data: AdminUniversityCreate,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    result = await db.execute(select(University).where(University.id == uni_id))
    uni = result.scalar_one_or_none()
    if not uni:
        raise HTTPException(status_code=404, detail="University not found")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(uni, key, value)

    await db.commit()
    await db.refresh(uni)
    return uni


@router.post("/programmes")
async def create_programme(
    data: AdminProgrammeCreate,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    prog = Programme(**data.model_dump())
    db.add(prog)
    await db.commit()
    await db.refresh(prog)
    return prog


@router.post("/requirements")
async def create_requirement(
    data: AdminRequirementCreate,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    req = ProgrammeRequirement(**data.model_dump())
    db.add(req)
    await db.commit()
    return {"message": "Requirement added"}


@router.post("/cut-offs")
async def create_cut_off(
    data: AdminCutOffCreate,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    co = ProgrammeCutOff(**data.model_dump())
    db.add(co)
    await db.commit()
    return {"message": "Cut-off added"}


@router.post("/sources")
async def create_source(
    data: AdminSourceCreate,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    source = Source(**data.model_dump())
    db.add(source)
    await db.commit()
    return {"message": "Source added"}


@router.post("/verify/{record_type}/{record_id}")
async def verify_record(
    record_type: str,
    record_id: int,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    log = VerificationLog(
        record_type=record_type,
        record_id=record_id,
        verification_status="verified",
        verified_by=admin.email,
    )
    db.add(log)
    await db.commit()
    return {"message": f"{record_type} {record_id} verified"}
