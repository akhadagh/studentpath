from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, func

from app.core.database import get_db
from app.models.university import University
from app.models.programme_v2 import Programme, ProgrammeRequirement, ProgrammeCutOff

router = APIRouter()


@router.get("/search")
async def search_programmes(
    search: str = Query(None, description="Search query"),
    university_id: int = Query(None),
    institution_type: str = Query(None),
    region: str = Query(None),
    field: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = (
        select(
            Programme,
            University.name.label("university_name"),
            University.short_name.label("university_short_name"),
            University.institution_type.label("institution_type"),
            University.region.label("region"),
            University.city.label("city"),
            University.verification_status.label("verification_status"),
        )
        .join(University, Programme.university_id == University.id)
        .where(Programme.active_status == True)
    )

    if search:
        query = query.where(
            or_(
                Programme.name.ilike(f"%{search}%"),
                Programme.normalised_name.ilike(f"%{search}%"),
                Programme.faculty.ilike(f"%{search}%"),
                Programme.department.ilike(f"%{search}%"),
            )
        )
    if university_id:
        query = query.where(Programme.university_id == university_id)
    if institution_type:
        query = query.where(University.institution_type == institution_type)
    if region:
        query = query.where(University.region == region)
    if field:
        query = query.where(Programme.career_cluster_keys.ilike(f"%{field}%"))

    query = query.order_by(Programme.name).limit(50)
    result = await db.execute(query)
    rows = result.fetchall()

    programmes = []
    for row in rows:
        prog = row[0]
        programmes.append({
            "id": prog.id,
            "name": prog.name,
            "normalised_name": prog.normalised_name,
            "degree_type": prog.degree_type,
            "faculty": prog.faculty,
            "department": prog.department,
            "duration_years": prog.duration_years,
            "description": prog.description,
            "university_id": prog.university_id,
            "university_name": row.university_name,
            "university_short_name": row.university_short_name,
            "institution_type": row.institution_type,
            "region": row.region,
            "city": row.city,
            "verification_status": row.verification_status,
        })

    return {"results": programmes, "total": len(programmes)}


@router.get("/faculties")
async def list_faculties(university_id: int = Query(None), db: AsyncSession = Depends(get_db)):
    query = select(Programme.faculty).where(
        Programme.faculty.isnot(None),
        Programme.active_status == True,
    ).distinct()

    if university_id:
        query = query.where(Programme.university_id == university_id)

    result = await db.execute(query)
    faculties = sorted([row[0] for row in result.fetchall()])
    return {"faculties": faculties}
