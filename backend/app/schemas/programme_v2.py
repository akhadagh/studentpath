from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ProgrammeRequirementBase(BaseModel):
    requirement_type: str
    qualification_type: str = "WASSCE"
    subject: str
    minimum_grade: Optional[str] = None
    grade_points: Optional[int] = None
    requirement_description: Optional[str] = None
    academic_year: Optional[str] = None


class ProgrammeRequirementCreate(ProgrammeRequirementBase):
    programme_id: int


class ProgrammeRequirementResponse(ProgrammeRequirementBase):
    id: int
    programme_id: int
    source_id: Optional[int]

    class Config:
        from_attributes = True


class CutOffResponse(BaseModel):
    id: int
    programme_id: int
    academic_year: str
    cut_off_type: Optional[str]
    aggregate: Optional[float]
    first_choice: Optional[float]
    second_choice: Optional[float]
    full_fee_cut_off: Optional[float]
    notes: Optional[str]
    verified_date: Optional[datetime]

    class Config:
        from_attributes = True


class ProgrammeBase(BaseModel):
    name: str
    normalised_name: Optional[str] = None
    programme_code: Optional[str] = None
    degree_type: Optional[str] = None
    faculty: Optional[str] = None
    department: Optional[str] = None
    programme_level: str = "undergraduate"
    description: Optional[str] = None
    duration_years: int = 4
    active_status: bool = True
    career_cluster_keys: Optional[str] = None


class ProgrammeCreate(ProgrammeBase):
    university_id: int
    campus_id: Optional[int] = None


class ProgrammeUpdate(BaseModel):
    name: Optional[str] = None
    normalised_name: Optional[str] = None
    degree_type: Optional[str] = None
    faculty: Optional[str] = None
    department: Optional[str] = None
    programme_level: Optional[str] = None
    description: Optional[str] = None
    duration_years: Optional[int] = None
    active_status: Optional[bool] = None
    career_cluster_keys: Optional[str] = None


class ProgrammeResponse(ProgrammeBase):
    id: int
    university_id: int
    campus_id: Optional[int]
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


class ProgrammeDetailResponse(ProgrammeResponse):
    requirements: List[ProgrammeRequirementResponse] = []
    cut_offs: List[CutOffResponse] = []


class ProgrammeWithUniversity(ProgrammeResponse):
    university_name: Optional[str] = None
    university_short_name: Optional[str] = None
    institution_type: Optional[str] = None
    region: Optional[str] = None
    city: Optional[str] = None
    verification_status: Optional[str] = None


class ProgrammeSearchResult(BaseModel):
    id: int
    name: str
    university_name: str
    university_short_name: Optional[str]
    institution_type: Optional[str]
    region: Optional[str]
    city: Optional[str]
    degree_type: Optional[str]
    duration_years: int
    description: Optional[str]
    verification_status: Optional[str]
    match_relevance: Optional[float] = None

    class Config:
        from_attributes = True
