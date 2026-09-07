import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import engine, async_session, Base
from app.models.programme import Programme, CareerPath
from app.services.scoring_engine import CAREER_CATEGORIES


SEED_PROGRAMMES = [
    {"name": "Computer Science", "field": "Technology & Computing", "duration": 4, "universities": ["University of Ghana", "KNUST", "Ashesi University", "GIMPA"], "description": "Study algorithms, software development, and computational theory"},
    {"name": "Cybersecurity", "field": "Technology & Computing", "duration": 4, "universities": ["KNUST", "University of Ghana", "Ashesi University"], "description": "Protect digital systems and networks from cyber threats"},
    {"name": "Data Science", "field": "Technology & Computing", "duration": 4, "universities": ["University of Ghana", "KNUST"], "description": "Extract insights from data using statistics and machine learning"},
    {"name": "Medicine", "field": "Healthcare & Medicine", "duration": 6, "universities": ["University of Ghana", "KNUST", "University for Development Studies"], "description": "Diagnose and treat human diseases and conditions"},
    {"name": "Pharmacy", "field": "Healthcare & Medicine", "duration": 4, "universities": ["University of Ghana", "KNUST"], "description": "Prepare and dispense medications safely"},
    {"name": "Nursing", "field": "Healthcare & Medicine", "duration": 4, "universities": ["University of Ghana", "KNUST", "UDS"], "description": "Provide direct patient care and health education"},
    {"name": "Business Administration", "field": "Business & Finance", "duration": 4, "universities": ["University of Ghana", "KNUST", "GIMPA", "Ashesi"], "description": "Learn to manage and lead organizations effectively"},
    {"name": "Accounting", "field": "Business & Finance", "duration": 4, "universities": ["University of Ghana", "KNUST", "GIMPA"], "description": "Manage financial records and advise on financial health"},
    {"name": "Marketing", "field": "Business & Finance", "duration": 4, "universities": ["University of Ghana", "KNUST"], "description": "Promote products and build brand awareness"},
    {"name": "Civil Engineering", "field": "Engineering & Built Environment", "duration": 4, "universities": ["KNUST", "University of Ghana", "GTUC"], "description": "Design and oversee construction of infrastructure projects"},
    {"name": "Electrical Engineering", "field": "Engineering & Built Environment", "duration": 4, "universities": ["KNUST", "University of Ghana"], "description": "Design and maintain electrical systems and equipment"},
    {"name": "Mechanical Engineering", "field": "Engineering & Built Environment", "duration": 4, "universities": ["KNUST", "University of Ghana"], "description": "Design and manufacture mechanical systems"},
    {"name": "Law (LLB)", "field": "Law & Social Sciences", "duration": 4, "universities": ["University of Ghana", "KNUST", "GIMPA"], "description": "Study legal principles and practice law"},
    {"name": "Political Science", "field": "Law & Social Sciences", "duration": 4, "universities": ["University of Ghana", "KNUST"], "description": "Analyze political systems and governance"},
    {"name": "Education", "field": "Education & Humanities", "duration": 4, "universities": ["University of Education Winneba", "University of Ghana"], "description": "Train to become an effective educator"},
    {"name": "Journalism & Media Studies", "field": "Education & Humanities", "duration": 4, "universities": ["University of Ghana", "GIMPA"], "description": "Learn to inform the public through various media"},
    {"name": "Agricultural Science", "field": "Agriculture & Natural Resources", "duration": 4, "universities": ["University for Development Studies", "KNUST"], "description": "Improve crop production and farming methods"},
    {"name": "Environmental Science", "field": "Agriculture & Natural Resources", "duration": 4, "universities": ["University of Ghana", "UDS"], "description": "Protect and manage natural resources"},
]


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as session:
        for prog in SEED_PROGRAMMES:
            p = Programme(
                name=prog["name"],
                field=prog["field"],
                career_alignments=prog["universities"],
                universities=prog["universities"],
                duration_years=prog["duration"],
                description=prog["description"],
            )
            session.add(p)

        for cat_key, cat_data in CAREER_CATEGORIES.items():
            for career in cat_data["careers"]:
                c = CareerPath(
                    name=career["name"],
                    category=cat_data["name"],
                    description=career["description"],
                    required_skills=career["skills"],
                    salary_range=career["salary"],
                    growth_outlook=career["growth"],
                    related_programmes=[p["name"] for p in SEED_PROGRAMMES if p["field"] == cat_data["name"]],
                )
                session.add(c)

        await session.commit()
        print("Database seeded successfully!")


if __name__ == "__main__":
    asyncio.run(seed())
