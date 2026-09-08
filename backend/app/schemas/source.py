from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SourceBase(BaseModel):
    title: str
    url: str
    source_type: str
    publication_date: Optional[str] = None
    academic_year: Optional[str] = None
    notes: Optional[str] = None


class SourceCreate(SourceBase):
    university_id: Optional[int] = None


class SourceUpdate(BaseModel):
    title: Optional[str] = None
    url: Optional[str] = None
    source_type: Optional[str] = None
    verification_status: Optional[str] = None
    notes: Optional[str] = None


class SourceResponse(SourceBase):
    id: int
    university_id: Optional[int]
    date_accessed: Optional[datetime]
    verification_status: str
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


class VerificationLogResponse(BaseModel):
    id: int
    record_type: str
    record_id: int
    verification_status: str
    verified_by: Optional[str]
    verified_date: Optional[datetime]
    notes: Optional[str]

    class Config:
        from_attributes = True
