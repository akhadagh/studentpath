from pydantic import BaseModel
from typing import Dict, List, Optional, Any
from datetime import datetime


class AssessmentSubmit(BaseModel):
    answers: Dict[str, int]


class AssessmentResponse(BaseModel):
    id: int
    status: str
    current_step: int
    total_steps: int
    answers: Dict[str, int]

    class Config:
        from_attributes = True


class CareerMatch(BaseModel):
    cluster_key: str
    cluster_name: str
    match_percentage: float
    explanation: str
    careers: List[dict]


class ProgrammeRecommendation(BaseModel):
    programme_id: Optional[int] = None
    programme_name: str
    field: str
    relevance_score: float
    university_id: Optional[int] = None
    duration_years: Optional[int] = None
    degree_type: Optional[str] = None


class ResultResponse(BaseModel):
    id: int
    assessment_id: int
    top_matches: List[CareerMatch]
    programme_recommendations: List[ProgrammeRecommendation]
    career_paths: Dict[str, float]
    cluster_scores: Optional[Dict[str, float]] = None
    explanations: Optional[Dict[str, str]] = None
    completed_at: datetime

    class Config:
        from_attributes = True
