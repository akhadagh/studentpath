"""
Seed script for Ghana University data.
Run: python -m seed_universities
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.database import engine, async_session
from app.models.university import University, UniversityCampus
from app.models.programme_v2 import Programme, ProgrammeRequirement
from app.models.career import CareerCluster, Career
from app.models.source import Source
from seed_universities import UNIVERSITIES, PROGRAMMES_BY_UNIVERSITY, CAREER_CLUSTERS


async def seed_careers():
    print("Seeding career clusters...")
    async with async_session() as session:
        for cluster_data in CAREER_CLUSTERS:
            existing = await session.execute(
                CareerCluster.__table__.select().where(CareerCluster.key == cluster_data["key"])
            )
            if existing.first():
                print(f"  Cluster '{cluster_data['name']}' already exists, skipping.")
                continue

            cluster = CareerCluster(
                key=cluster_data["key"],
                name=cluster_data["name"],
                description=cluster_data["description"],
                keywords=cluster_data["keywords"],
                icon=cluster_data["icon"],
                colour=cluster_data["colour"],
                assessment_weight=cluster_data["assessment_weight"],
            )
            session.add(cluster)
            await session.flush()

            for career_data in cluster_data["careers"]:
                career = Career(
                    cluster_id=cluster.id,
                    name=career_data["name"],
                    description=career_data["description"],
                    skills=career_data["skills"],
                    salary_range=career_data["salary_range"],
                    growth_outlook=career_data["growth_outlook"],
                    related_programme_names=career_data["related_programme_names"],
                )
                session.add(career)

        await session.commit()
        print(f"  Seeded {len(CAREER_CLUSTERS)} career clusters.")


async def seed_universities():
    print("Seeding universities...")
    async with async_session() as session:
        for uni_data in UNIVERSITIES:
            existing = await session.execute(
                University.__table__.select().where(University.name == uni_data["name"])
            )
            if existing.first():
                print(f"  University '{uni_data['short_name']}' already exists, skipping.")
                continue

            campuses_data = uni_data.pop("campuses", [])
            sources_data = uni_data.pop("sources", [])

            university = University(**uni_data)
            session.add(university)
            await session.flush()

            for campus_data in campuses_data:
                campus = UniversityCampus(university_id=university.id, **campus_data)
                session.add(campus)

            for source_data in sources_data:
                source = Source(university_id=university.id, **source_data)
                session.add(source)

        await session.commit()
        print(f"  Seeded {len(UNIVERSITIES)} universities.")


async def seed_programmes():
    print("Seeding programmes...")
    async with async_session() as session:
        uni_result = await session.execute(University.__table__.select())
        universities = {row.name: row.id for row in uni_result.fetchall()}

        total_programmes = 0
        total_requirements = 0

        for uni_name, programmes in PROGRAMMES_BY_UNIVERSITY.items():
            uni_id = universities.get(uni_name)
            if not uni_id:
                print(f"  University '{uni_name}' not found, skipping programmes.")
                continue

            for prog_data in programmes:
                requirements_data = prog_data.pop("requirements", [])

                existing = await session.execute(
                    Programme.__table__.select().where(
                        Programme.name == prog_data["name"],
                        Programme.university_id == uni_id,
                    )
                )
                if existing.first():
                    continue

                programme = Programme(university_id=uni_id, **prog_data)
                session.add(programme)
                await session.flush()
                total_programmes += 1

                for req_data in requirements_data:
                    req = ProgrammeRequirement(programme_id=programme.id, **req_data)
                    session.add(req)
                    total_requirements += 1

        await session.commit()
        print(f"  Seeded {total_programmes} programmes with {total_requirements} requirements.")


async def main():
    print("=" * 50)
    print("StudentPath Ghana University Seed Script")
    print("=" * 50)
    await seed_careers()
    await seed_universities()
    await seed_programmes()
    print("=" * 50)
    print("Seed complete!")
    print("=" * 50)


if __name__ == "__main__":
    asyncio.run(main())
