from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base


class SavedUniversity(Base):
    __tablename__ = "saved_universities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    university_id = Column(Integer, ForeignKey("universities.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class SavedProgramme(Base):
    __tablename__ = "saved_programmes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    programme_id = Column(Integer, ForeignKey("programmes_v2.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
