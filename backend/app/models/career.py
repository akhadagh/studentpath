from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class CareerCluster(Base):
    __tablename__ = "career_clusters"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(50), nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    keywords = Column(JSON, default=list)
    icon = Column(String(50), nullable=True)
    colour = Column(String(20), nullable=True)
    assessment_weight = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    careers = relationship("Career", back_populates="cluster", cascade="all, delete-orphan")


class Career(Base):
    __tablename__ = "careers"

    id = Column(Integer, primary_key=True, index=True)
    cluster_id = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    skills = Column(JSON, default=list)
    salary_range = Column(String(100), nullable=True)
    growth_outlook = Column(String(100), nullable=True)
    related_programme_names = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    cluster = relationship("CareerCluster", back_populates="careers")
