from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


class ProgrammeResponse(BaseModel):
    id: int
    name: str
    field: str
    career_alignments: List[str]
    universities: List[str]
    duration_years: int
    description: Optional[str]

    class Config:
        from_attributes = True


class CareerPathResponse(BaseModel):
    id: int
    name: str
    category: str
    description: Optional[str]
    required_skills: List[str]
    salary_range: Optional[str]
    growth_outlook: Optional[str]
    related_programmes: List[str]

    class Config:
        from_attributes = True
