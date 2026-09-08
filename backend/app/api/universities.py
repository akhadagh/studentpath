from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.university import University, UniversityCampus
from app.models.programme_v2 import Programme
from app.models.saved import SavedUniversity
from app.schemas.university import (
    UniversityResponse,
    UniversityDetailResponse,
    UniversityListResponse,
    CampusResponse,
)

router = APIRouter()


@router.get("/", response_model=list[UniversityListResponse])
async def list_universities(
    institution_type: str = Query(None, description="Filter by type: public, private, technical"),
    region: str = Query(None, description="Filter by region"),
    search: str = Query(None, description="Search by name"),
    db: AsyncSession = Depends(get_db),
):
    query = select(University)

    if institution_type:
        query = query.where(University.institution_type == institution_type)
    if region:
        query = query.where(University.region == region)
    if search:
        query = query.where(
            or_(
                University.name.ilike(f"%{search}%"),
                University.short_name.ilike(f"%{search}%"),
            )
        )

    query = query.order_by(University.name)
    result = await db.execute(query.limit(50))
    universities = result.scalars().all()

    response = []
    for uni in universities:
        prog_count_result = await db.execute(
            select(func.count(Programme.id)).where(Programme.university_id == uni.id)
        )
        prog_count = prog_count_result.scalar() or 0

        response.append(UniversityListResponse(
            id=uni.id,
            name=uni.name,
            short_name=uni.short_name,
            institution_type=uni.institution_type,
            region=uni.region,
            city=uni.city,
            verification_status=uni.verification_status,
            programme_count=prog_count,
        ))

    return response


@router.get("/regions")
async def list_regions(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(University.region).where(University.region.isnot(None)).distinct()
    )
    regions = [row[0] for row in result.fetchall()]
    return {"regions": sorted(regions)}


@router.get("/{university_id}")
async def get_university(
    university_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(University).where(University.id == university_id)
    )
    university = result.scalar_one_or_none()

    if not university:
        raise HTTPException(status_code=404, detail="University not found")

    campuses_result = await db.execute(
        select(UniversityCampus).where(UniversityCampus.university_id == university.id)
    )
    campuses = campuses_result.scalars().all()

    prog_count_result = await db.execute(
        select(func.count(Programme.id)).where(Programme.university_id == university.id)
    )
    prog_count = prog_count_result.scalar() or 0

    return {
        "id": university.id,
        "name": university.name,
        "short_name": university.short_name,
        "institution_type": university.institution_type,
        "ownership_type": university.ownership_type,
        "region": university.region,
        "city": university.city,
        "official_website": university.official_website,
        "admissions_website": university.admissions_website,
        "description": university.description,
        "accreditation": university.accreditation,
        "logo_url": university.logo_url,
        "contact_email": university.contact_email,
        "contact_phone": university.contact_phone,
        "verification_status": university.verification_status,
        "programme_count": prog_count,
        "campuses": [
            {"id": c.id, "campus_name": c.campus_name, "location": c.location, "city": c.city, "region": c.region}
            for c in campuses
        ],
    }


@router.get("/{university_id}/programmes")
async def get_university_programmes(
    university_id: int,
    faculty: str = Query(None),
    search: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(University).where(University.id == university_id)
    )
    university = result.scalar_one_or_none()

    if not university:
        raise HTTPException(status_code=404, detail="University not found")

    query = select(Programme).where(
        Programme.university_id == university_id,
        Programme.active_status == True,
    )

    if faculty:
        query = query.where(Programme.faculty.ilike(f"%{faculty}%"))
    if search:
        query = query.where(Programme.name.ilike(f"%{search}%"))

    query = query.order_by(Programme.faculty, Programme.name)
    result = await db.execute(query.limit(100))
    programmes = result.scalars().all()

    return {
        "university": {"id": university.id, "name": university.name, "short_name": university.short_name},
        "programmes": programmes,
    }
