from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class UniversityBase(BaseModel):
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
    logo_url: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None


class UniversityCreate(UniversityBase):
    pass


class UniversityUpdate(BaseModel):
    name: Optional[str] = None
    short_name: Optional[str] = None
    institution_type: Optional[str] = None
    ownership_type: Optional[str] = None
    region: Optional[str] = None
    city: Optional[str] = None
    official_website: Optional[str] = None
    admissions_website: Optional[str] = None
    description: Optional[str] = None
    accreditation: Optional[str] = None
    logo_url: Optional[str] = None
    verification_status: Optional[str] = None


class CampusResponse(BaseModel):
    id: int
    campus_name: str
    location: Optional[str]
    city: Optional[str]
    region: Optional[str]

    class Config:
        from_attributes = True


class UniversityResponse(UniversityBase):
    id: int
    verification_status: Optional[str]
    last_verified: Optional[datetime]
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


class UniversityDetailResponse(UniversityResponse):
    campuses: List[CampusResponse] = []


class UniversityListResponse(BaseModel):
    id: int
    name: str
    short_name: Optional[str]
    institution_type: str
    region: Optional[str]
    city: Optional[str]
    verification_status: Optional[str]
    programme_count: int = 0

    class Config:
        from_attributes = True
