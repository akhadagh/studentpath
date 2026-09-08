"""
StudentPath Assessment Scoring Engine v2.
Uses career clusters from the database and connects to real programmes.
"""
from typing import Dict, List, Tuple, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.career import CareerCluster, Career
from app.models.programme_v2 import Programme


# Assessment question structure with weights
ASSESSMENT_QUESTIONS = {
    "interests": {
        "question": "Which activities do you enjoy most?",
        "weight": 0.35,
        "options": {
            1: {"label": "Solving technical problems and working with technology", "clusters": ["technology"]},
            2: {"label": "Helping and caring for other people", "clusters": ["healthcare", "social"]},
            3: {"label": "Managing projects and leading teams", "clusters": ["business"]},
            4: {"label": "Designing and building things", "clusters": ["engineering", "creative"]},
            5: {"label": "Research and analyzing information", "clusters": ["science"]},
            6: {"label": "Teaching and sharing knowledge", "clusters": ["education"]},
            7: {"label": "Working with nature and the environment", "clusters": ["environment"]},
            8: {"label": "Creative expression and communication", "clusters": ["creative", "social"]},
        },
    },
    "strengths": {
        "question": "What are you best at in school?",
        "weight": 0.25,
        "options": {
            1: {"label": "Mathematics and Computer Science", "clusters": ["technology", "science"]},
            2: {"label": "Science (Biology, Chemistry, Physics)", "clusters": ["science", "healthcare"]},
            3: {"label": "Business Studies and Economics", "clusters": ["business"]},
            4: {"label": "Technical and Vocational subjects", "clusters": ["engineering"]},
            5: {"label": "Social Sciences and Humanities", "clusters": ["law", "social"]},
            6: {"label": "Languages and Communication", "clusters": ["education", "creative"]},
            7: {"label": "Agriculture and Environmental Studies", "clusters": ["environment"]},
            8: {"label": "Arts and Creative subjects", "clusters": ["creative"]},
        },
    },
    "work_style": {
        "question": "How do you prefer to work?",
        "weight": 0.15,
        "options": {
            1: {"label": "Independently with computers and technology", "clusters": ["technology"]},
            2: {"label": "In teams, directly helping others", "clusters": ["healthcare", "social"]},
            3: {"label": "In leadership roles, making decisions", "clusters": ["business", "law"]},
            4: {"label": "Hands-on, building or fixing things", "clusters": ["engineering"]},
            5: {"label": "Analyzing data and finding patterns", "clusters": ["science", "technology"]},
            6: {"label": "In educational settings, sharing knowledge", "clusters": ["education"]},
            7: {"label": "Outdoors, working with nature", "clusters": ["environment"]},
            8: {"label": "In creative, flexible environments", "clusters": ["creative"]},
        },
    },
    "values": {
        "question": "What matters most to you in a career?",
        "weight": 0.10,
        "options": {
            1: {"label": "High income and financial security", "clusters": ["technology", "business"]},
            2: {"label": "Making a difference in people's lives", "clusters": ["healthcare", "social"]},
            3: {"label": "Status and professional recognition", "clusters": ["law", "healthcare"]},
            4: {"label": "Job stability and benefits", "clusters": ["education", "engineering"]},
            5: {"label": "Intellectual challenge and growth", "clusters": ["science", "technology"]},
            6: {"label": "Work-life balance", "clusters": ["education", "social"]},
            7: {"label": "Working in a growing industry", "clusters": ["technology", "engineering"]},
            8: {"label": "Creative freedom and independence", "clusters": ["creative"]},
        },
    },
    "challenges": {
        "question": "What type of challenges energize you?",
        "weight": 0.05,
        "options": {
            1: {"label": "Debugging complex code or systems", "clusters": ["technology"]},
            2: {"label": "Diagnosing and treating health conditions", "clusters": ["healthcare"]},
            3: {"label": "Negotiating deals or solving business problems", "clusters": ["business"]},
            4: {"label": "Engineering solutions to infrastructure problems", "clusters": ["engineering"]},
            5: {"label": "Legal research and argumentation", "clusters": ["law"]},
            6: {"label": "Designing curricula and educating others", "clusters": ["education"]},
            7: {"label": "Addressing environmental or food security issues", "clusters": ["environment"]},
            8: {"label": "Creating compelling content or designs", "clusters": ["creative"]},
        },
    },
    "future": {
        "question": "Where do you see yourself in 10 years?",
        "weight": 0.10,
        "options": {
            1: {"label": "Leading a tech company or startup", "clusters": ["technology"]},
            2: {"label": "Working in a hospital or health organization", "clusters": ["healthcare"]},
            3: {"label": "Running my own business", "clusters": ["business"]},
            4: {"label": "Managing major construction or engineering projects", "clusters": ["engineering"]},
            5: {"label": "Practicing law or working in policy", "clusters": ["law"]},
            6: {"label": "Teaching at a university or leading an educational institution", "clusters": ["education"]},
            7: {"label": "Working on sustainable development projects", "clusters": ["environment"]},
            8: {"label": "Working in media, arts, or cultural organizations", "clusters": ["creative"]},
        },
    },
}

# Grade to points mapping for WASSCE
GRADE_POINTS = {
    "A1": 1,
    "B2": 2,
    "B3": 3,
    "C4": 4,
    "C5": 5,
    "C6": 6,
    "D7": 7,
    "E8": 8,
    "F9": 9,
}


def calculate_scores(answers: Dict[str, int]) -> Tuple[Dict[str, float], Dict[str, str]]:
    """
    Calculate career cluster scores from assessment answers.
    Returns (scores_dict, explanations_dict).
    """
    cluster_scores: Dict[str, float] = {}
    cluster_evidence: Dict[str, List[str]] = {}

    for question_key, answer_value in answers.items():
        if question_key not in ASSESSMENT_QUESTIONS:
            continue

        question = ASSESSMENT_QUESTIONS[question_key]
        weight = question["weight"]
        option = question["options"].get(answer_value)

        if not option:
            continue

        for cluster_key in option["clusters"]:
            if cluster_key not in cluster_scores:
                cluster_scores[cluster_key] = 0.0
                cluster_evidence[cluster_key] = []

            cluster_scores[cluster_key] += weight * 20
            cluster_evidence[cluster_key].append(f"{question['question']}: {option['label']}")

    # Normalise to 0-100
    if cluster_scores:
        max_score = max(cluster_scores.values())
        if max_score > 0:
            for key in cluster_scores:
                cluster_scores[key] = min(round((cluster_scores[key] / max_score) * 100, 1), 100)

    # Generate explanations
    explanations = {}
    for cluster_key, evidence in cluster_evidence.items():
        top_evidence = evidence[:3]
        explanations[cluster_key] = (
            f"Your answers strongly indicated interest and aptitude in this area. "
            f"Key indicators: {'; '.join(top_evidence)}."
        )

    return cluster_scores, explanations


async def get_top_matches(
    scores: Dict[str, float],
    explanations: Dict[str, str],
    db: AsyncSession,
    top_n: int = 3,
) -> List[dict]:
    """Get top career cluster matches with careers from database."""
    sorted_clusters = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:top_n]
    matches = []

    for cluster_key, score in sorted_clusters:
        result = await db.execute(
            select(CareerCluster).where(CareerCluster.key == cluster_key)
        )
        cluster = result.scalar_one_or_none()
        if not cluster:
            continue

        careers_result = await db.execute(
            select(Career).where(Career.cluster_id == cluster.id).limit(3)
        )
        careers = careers_result.scalars().all()

        matches.append({
            "cluster_key": cluster.key,
            "cluster_name": cluster.name,
            "match_percentage": score,
            "explanation": explanations.get(cluster_key, ""),
            "careers": [
                {
                    "name": c.name,
                    "description": c.description,
                    "skills": c.skills,
                    "salary_range": c.salary_range,
                    "growth_outlook": c.growth_outlook,
                }
                for c in careers
            ],
        })

    return matches


async def get_programme_recommendations(
    scores: Dict[str, float],
    db: AsyncSession,
    top_n: int = 6,
) -> List[dict]:
    """Get programme recommendations based on cluster scores, querying real DB data."""
    sorted_clusters = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:5]
    all_programmes = []

    for cluster_key, score in sorted_clusters:
        if score < 15:
            continue

        result = await db.execute(
            select(CareerCluster).where(CareerCluster.key == cluster_key)
        )
        cluster = result.scalar_one_or_none()
        if not cluster:
            continue

        # Find programmes related to this cluster
        progs_result = await db.execute(
            select(Programme).where(
                Programme.career_cluster_keys.ilike(f"%{cluster_key}%"),
                Programme.active_status == True,
            ).limit(4)
        )
        programmes = progs_result.scalars().all()

        for prog in programmes:
            all_programmes.append({
                "programme_id": prog.id,
                "programme_name": prog.name,
                "field": cluster.name,
                "relevance_score": round(score * 0.9, 1),
                "university_id": prog.university_id,
                "duration_years": prog.duration_years,
                "degree_type": prog.degree_type,
            })

    # Sort by relevance and deduplicate
    seen = set()
    unique_programmes = []
    for p in sorted(all_programmes, key=lambda x: x["relevance_score"], reverse=True):
        key = (p["programme_name"], p["university_id"])
        if key not in seen:
            seen.add(key)
            unique_programmes.append(p)

    return unique_programmes[:top_n]
