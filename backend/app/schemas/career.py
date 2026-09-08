from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class CareerBase(BaseModel):
    name: str
    description: Optional[str] = None
    skills: List[str] = []
    salary_range: Optional[str] = None
    growth_outlook: Optional[str] = None
    related_programme_names: List[str] = []


class CareerCreate(CareerBase):
    cluster_id: int


class CareerResponse(CareerBase):
    id: int
    cluster_id: int

    class Config:
        from_attributes = True


class CareerClusterBase(BaseModel):
    key: str
    name: str
    description: Optional[str] = None
    keywords: List[str] = []
    icon: Optional[str] = None
    colour: Optional[str] = None
    assessment_weight: int = 1


class CareerClusterCreate(CareerClusterBase):
    pass


class CareerClusterResponse(CareerClusterBase):
    id: int
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


class CareerClusterDetailResponse(CareerClusterResponse):
    careers: List[CareerResponse] = []
