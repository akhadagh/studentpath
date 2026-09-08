from sqlalchemy import Column, Integer, String, Text, DateTime, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Programme(Base):
    __tablename__ = "programmes_v2"

    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(Integer, nullable=False)
    campus_id = Column(Integer, nullable=True)
    name = Column(String(255), nullable=False)
    normalised_name = Column(String(255), nullable=True, index=True)
    programme_code = Column(String(50), nullable=True)
    degree_type = Column(String(100), nullable=True)
    faculty = Column(String(255), nullable=True)
    department = Column(String(255), nullable=True)
    programme_level = Column(String(50), default="undergraduate")
    description = Column(Text, nullable=True)
    duration_years = Column(Integer, default=4)
    active_status = Column(Boolean, default=True)
    career_cluster_keys = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    university = relationship("University", back_populates="programmes")
    requirements = relationship("ProgrammeRequirement", back_populates="programme", cascade="all, delete-orphan")
    cut_offs = relationship("ProgrammeCutOff", back_populates="programme", cascade="all, delete-orphan")


class ProgrammeRequirement(Base):
    __tablename__ = "programme_requirements"

    id = Column(Integer, primary_key=True, index=True)
    programme_id = Column(Integer, nullable=False)
    requirement_type = Column(String(50), nullable=False)
    qualification_type = Column(String(50), nullable=False, default="WASSCE")
    subject = Column(String(255), nullable=False)
    minimum_grade = Column(String(10), nullable=True)
    grade_points = Column(Integer, nullable=True)
    requirement_description = Column(Text, nullable=True)
    academic_year = Column(String(20), nullable=True)
    source_id = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    programme = relationship("Programme", back_populates="requirements")


class ProgrammeCutOff(Base):
    __tablename__ = "programme_cut_offs"

    id = Column(Integer, primary_key=True, index=True)
    programme_id = Column(Integer, nullable=False)
    academic_year = Column(String(20), nullable=False)
    cut_off_type = Column(String(50), nullable=True)
    aggregate = Column(Float, nullable=True)
    first_choice = Column(Float, nullable=True)
    second_choice = Column(Float, nullable=True)
    full_fee_cut_off = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    source_id = Column(Integer, nullable=True)
    verified_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    programme = relationship("Programme", back_populates="cut_offs")
