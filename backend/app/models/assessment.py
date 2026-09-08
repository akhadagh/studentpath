from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String(20), default="in_progress")
    current_step = Column(Integer, default=1)
    total_steps = Column(Integer, default=6)
    answers = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="assessments")
    result = relationship("Result", back_populates="assessment", uselist=False)


class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), unique=True)
    top_matches = Column(JSON, default=list)
    programme_recommendations = Column(JSON, default=list)
    career_paths = Column(JSON, default=list)
    cluster_scores = Column(JSON, default=dict)
    explanations = Column(JSON, default=dict)
    completed_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="results")
    assessment = relationship("Assessment", back_populates="result")
