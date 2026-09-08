from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(Integer, nullable=True)
    title = Column(String(500), nullable=False)
    url = Column(String(1000), nullable=False)
    source_type = Column(String(50), nullable=False)
    publication_date = Column(String(20), nullable=True)
    academic_year = Column(String(20), nullable=True)
    date_accessed = Column(DateTime(timezone=True), nullable=True)
    verification_status = Column(String(50), default="pending")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    university = relationship("University", back_populates="sources")


class VerificationLog(Base):
    __tablename__ = "verification_logs"

    id = Column(Integer, primary_key=True, index=True)
    record_type = Column(String(50), nullable=False)
    record_id = Column(Integer, nullable=False)
    verification_status = Column(String(50), nullable=False)
    verified_by = Column(String(255), nullable=True)
    verified_date = Column(DateTime(timezone=True), server_default=func.now())
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
