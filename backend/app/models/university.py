from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Enum as SAEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum


class InstitutionType(str, enum.Enum):
    PUBLIC = "public"
    PRIVATE = "private"
    TECHNICAL = "technical"
    SPECIALIZED = "specialized"


class OwnershipType(str, enum.Enum):
    GOVERNMENT = "government"
    PRIVATE = "private"
    RELIGIOUS = "religious"
    INTERNATIONAL = "international"


class VerificationStatus(str, enum.Enum):
    VERIFIED = "verified"
    NEEDS_REVIEW = "needs_review"
    PENDING = "pending"
    OUTDATED = "outdated"


class University(Base):
    __tablename__ = "universities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    short_name = Column(String(50), nullable=True)
    institution_type = Column(String(50), nullable=False, default="public")
    ownership_type = Column(String(50), nullable=True)
    region = Column(String(100), nullable=True)
    city = Column(String(100), nullable=True)
    official_website = Column(String(500), nullable=True)
    admissions_website = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    accreditation = Column(Text, nullable=True)
    logo_url = Column(String(500), nullable=True)
    contact_email = Column(String(255), nullable=True)
    contact_phone = Column(String(100), nullable=True)
    verification_status = Column(String(50), default="pending")
    last_verified = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    campuses = relationship("UniversityCampus", back_populates="university", cascade="all, delete-orphan")
    programmes = relationship("ProgrammeV2", back_populates="university", cascade="all, delete-orphan")
    sources = relationship("Source", back_populates="university")


class UniversityCampus(Base):
    __tablename__ = "university_campuses"

    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(Integer, nullable=False)
    campus_name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    region = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    university = relationship("University", back_populates="campuses")
