from sqlalchemy import Column, Integer, String, Float, JSON, DateTime
from app.core.database import Base


class Programme(Base):
    __tablename__ = "programmes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    field = Column(String(100), nullable=False)
    career_alignments = Column(JSON, default=list)
    universities = Column(JSON, default=list)
    duration_years = Column(Integer, default=4)
    description = Column(String(500), nullable=True)
    entry_requirements = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CareerPath(Base):
    __tablename__ = "career_paths"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)
    required_skills = Column(JSON, default=list)
    salary_range = Column(String(100), nullable=True)
    growth_outlook = Column(String(50), nullable=True)
    related_programmes = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
