from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.core.database import get_db
from app.models.career import CareerCluster, Career

router = APIRouter()


@router.get("/careers")
async def get_career_clusters(
    category: str = Query(None, description="Filter by key"),
    search: str = Query(None, description="Search by name"),
    db: AsyncSession = Depends(get_db),
):
    query = select(CareerCluster)
    if category:
        query = query.where(CareerCluster.key == category)
    if search:
        query = query.where(CareerCluster.name.ilike(f"%{search}%"))

    result = await db.execute(query.order_by(CareerCluster.name).limit(50))
    clusters = result.scalars().all()
    return clusters


@router.get("/careers/{cluster_key}")
async def get_career_cluster_detail(
    cluster_key: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(CareerCluster).where(CareerCluster.key == cluster_key)
    )
    cluster = result.scalar_one_or_none()
    if not cluster:
        return {"error": "Cluster not found"}

    careers_result = await db.execute(
        select(Career).where(Career.cluster_id == cluster.id)
    )
    careers = careers_result.scalars().all()

    return {"cluster": cluster, "careers": careers}


@router.get("/fields")
async def get_fields(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CareerCluster).order_by(CareerCluster.name)
    )
    clusters = result.scalars().all()
    return {
        "fields": [
            {"key": c.key, "name": c.name}
            for c in clusters
        ]
    }
