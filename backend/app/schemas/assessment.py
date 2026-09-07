from pydantic import BaseModel
from typing import Dict, List, Optional


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
    career: str
    category: str
    match_percentage: float
    description: str
    required_skills: List[str]
    salary_range: str
    growth_outlook: str
    related_programmes: List[str]


class ProgrammeRecommendation(BaseModel):
    programme: str
    field: str
    relevance_score: float
    duration_years: int
    universities: List[str]
    description: str


class ResultResponse(BaseModel):
    id: int
    assessment_id: int
    top_matches: List[CareerMatch]
    programme_recommendations: List[ProgrammeRecommendation]
    career_paths: List[dict]
    completed_at: datetime

    class Config:
        from_attributes = True
