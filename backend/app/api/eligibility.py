from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from pydantic import BaseModel

from app.core.database import get_db
from app.models.programme_v2 import Programme, ProgrammeRequirement

router = APIRouter()

GRADE_POINTS = {
    "A1": 1, "B2": 2, "B3": 3, "C4": 4, "C5": 5, "C6": 6,
    "D7": 7, "E8": 8, "F9": 9,
}


class StudentSubject(BaseModel):
    subject: str
    grade: str


class EligibilityCheck(BaseModel):
    programme_id: int
    subjects: List[StudentSubject]
    aggregate: Optional[float] = None


class EligibilityResult(BaseModel):
    programme_id: int
    programme_name: str
    status: str
    meets_requirements: bool
    message: str
    details: dict


@router.post("/check", response_model=List[EligibilityResult])
async def check_eligibility(
    checks: List[EligibilityCheck],
    db: AsyncSession = Depends(get_db),
):
    results = []

    for check in checks:
        prog_result = await db.execute(
            select(Programme).where(Programme.id == check.programme_id)
        )
        programme = prog_result.scalar_one_or_none()

        if not programme:
            results.append(EligibilityResult(
                programme_id=check.programme_id,
                programme_name="Unknown Programme",
                status="error",
                meets_requirements=False,
                message="Programme not found.",
                details={},
            ))
            continue

        reqs_result = await db.execute(
            select(ProgrammeRequirement).where(
                ProgrammeRequirement.programme_id == check.programme_id
            )
        )
        requirements = reqs_result.scalars().all()

        if not requirements:
            results.append(EligibilityResult(
                programme_id=check.programme_id,
                programme_name=programme.name,
                status="insufficient_data",
                meets_requirements=False,
                message="No verified requirements currently available for this programme.",
                details={"requirements_count": 0},
            ))
            continue

        student_grades = {s.subject.lower(): s.grade.upper() for s in check.subjects}
        met = []
        not_met = []
        missing_subjects = []

        for req in requirements:
            req_subject = req.subject.lower()
            student_grade = student_grades.get(req_subject)

            if not student_grade:
                missing_subjects.append(req.subject)
                not_met.append({
                    "subject": req.subject,
                    "required": req.minimum_grade,
                    "status": "missing",
                })
                continue

            student_points = GRADE_POINTS.get(student_grade, 9)
            required_points = GRADE_POINTS.get(req.minimum_grade, 9)

            if student_points <= required_points:
                met.append({
                    "subject": req.subject,
                    "required": req.minimum_grade,
                    "student_grade": student_grade,
                    "status": "met",
                })
            else:
                not_met.append({
                    "subject": req.subject,
                    "required": req.minimum_grade,
                    "student_grade": student_grade,
                    "status": "not_met",
                })

        total_requirements = len(requirements)
        met_count = len(met)

        if met_count == total_requirements:
            status = "meets_requirements"
            meets = True
            message = (
                "You meet the published minimum subject requirements for this programme. "
                "However, admission is competitive and meeting minimum requirements "
                "does not guarantee admission."
            )
        elif met_count > 0 and len(not_met) <= 2:
            status = "partial_match"
            meets = False
            details_str = "; ".join(
                [f"{d['subject']}: required {d['required']}, you have {d.get('student_grade', 'N/A')}"
                 for d in not_met if d.get('student_grade')]
            )
            message = (
                f"Your grades partially match the requirements. "
                f"Issues: {details_str if details_str else 'Missing subjects: ' + ', '.join(missing_subjects)}. "
                f"Please verify the latest requirements with the university."
            )
        else:
            status = "does_not_meet"
            meets = False
            if missing_subjects:
                message = (
                    f"You are missing required subjects: {', '.join(missing_subjects)}. "
                    f"Please check if alternative subject combinations are accepted."
                )
            else:
                issues = "; ".join(
                    [f"{d['subject']}: required {d['required']}, you have {d.get('student_grade', 'N/A')}"
                     for d in not_met]
                )
                message = f"You do not currently meet the published requirements: {issues}"

        results.append(EligibilityResult(
            programme_id=check.programme_id,
            programme_name=programme.name,
            status=status,
            meets_requirements=met,
            message=message,
            details={
                "met": met,
                "not_met": not_met,
                "missing_subjects": missing_subjects,
                "total_requirements": total_requirements,
                "met_count": met_count,
            },
        ))

    return results
