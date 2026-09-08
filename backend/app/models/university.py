from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class University(Base):
    __tablename__ = "universities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    short_name = Column(String(50), nullable=True)
    institution_type = Column(String(50), nullable=False, default="public")
    ownership_type = Column(String(50), nullable=True)
    region = Column(String(100), nullable=True)
    city = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True, default="Ghana")
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
    programmes = relationship("Programme", back_populates="university", cascade="all, delete-orphan")
    sources = relationship("Source", back_populates="university")


class UniversityCampus(Base):
    __tablename__ = "university_campuses"

    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(Integer, ForeignKey("universities.id"), nullable=False)
    campus_name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    region = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    university = relationship("University", back_populates="campuses")
    programmes = relationship("Programme", back_populates="campus")
