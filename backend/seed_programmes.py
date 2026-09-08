"""Add programmes for all universities missing them."""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DATABASE_URL', '')

from app.core.database import async_session
from app.models.university import University
from app.models.programme_v2 import Programme, ProgrammeRequirement
from sqlalchemy import select

TECH_PROGS = [
    ("HND in Civil Engineering", "Faculty of Engineering", "Civil Engineering", "HND", 3, "engineering", [
        ("Core Mathematics", "B3", "core"), ("English Language", "C6", "core"),
        ("Integrated Science", "C6", "core"), ("Elective Mathematics", "B3", "elective"),
        ("Physics", "C6", "elective"),
    ]),
    ("HND in Electrical and Electronic Engineering", "Faculty of Engineering", "Electrical Engineering", "HND", 3, "engineering", [
        ("Core Mathematics", "B3", "core"), ("English Language", "C6", "core"),
        ("Integrated Science", "C6", "core"), ("Elective Mathematics", "B3", "elective"),
        ("Physics", "C6", "elective"),
    ]),
    ("HND in Mechanical Engineering", "Faculty of Engineering", "Mechanical Engineering", "HND", 3, "engineering", [
        ("Core Mathematics", "B3", "core"), ("English Language", "C6", "core"),
        ("Integrated Science", "C6", "core"), ("Elective Mathematics", "B3", "elective"),
        ("Physics", "C6", "elective"),
    ]),
    ("HND in Computer Science", "Faculty of Computing", "Computer Science", "HND", 3, "technology", [
        ("Core Mathematics", "B2", "core"), ("English Language", "C6", "core"),
        ("Integrated Science", "C6", "core"), ("Elective Mathematics", "B2", "elective"),
        ("Physics", "C6", "elective"),
    ]),
    ("HND in Business Administration", "Faculty of Business", "Business Administration", "HND", 3, "business", [
        ("Core Mathematics", "C6", "core"), ("English Language", "C6", "core"),
        ("Social Studies", "C6", "core"),
    ]),
    ("HND in Hotel Catering and Institutional Management", "Faculty of Applied Sciences", "Hospitality Management", "HND", 3, "business", [
        ("Core Mathematics", "C6", "core"), ("English Language", "C6", "core"),
    ]),
    ("HND in Fashion Design and Textiles", "Faculty of Creative Arts", "Fashion Design", "HND", 3, "creative", [
        ("Core Mathematics", "E8", "core"), ("English Language", "C6", "core"),
    ]),
]

PRIVATE_PROGS = [
    ("Bachelor of Business Administration", "Faculty of Business", "Business Administration", "Bachelor of Science", 4, "business", [
        ("Core Mathematics", "C6", "core"), ("English Language", "C6", "core"),
    ]),
    ("Bachelor of Computer Science", "Faculty of Computing", "Computer Science", "Bachelor of Science", 4, "technology", [
        ("Core Mathematics", "B2", "core"), ("English Language", "C6", "core"),
        ("Elective Mathematics", "B3", "elective"),
    ]),
    ("Bachelor of Theology", "Faculty of Theology", "Theology", "Bachelor of Arts", 4, "education", [
        ("English Language", "C6", "core"),
    ]),
]

INTL_PROGS = [
    ("Bachelor of Science in Computer Science", "Faculty of Science", "Computer Science", "Bachelor of Science", 3, "technology", []),
    ("Bachelor of Business Science", "School of Business", "Business Administration", "Bachelor of Business Science", 3, "business", []),
    ("Bachelor of Medicine and Surgery", "School of Medicine", "Medicine", "Bachelor of Medicine", 6, "healthcare", []),
    ("Bachelor of Engineering in Mechanical Engineering", "Faculty of Engineering", "Mechanical Engineering", "Bachelor of Engineering", 4, "engineering", []),
]

EURO_PROGS = [
    ("Master of Science in Computer Science", "Department of Computer Science", "Computer Science", "Master of Science", 1, "technology", []),
    ("Bachelor of Arts in Business Administration", "Said Business School", "Business Administration", "Bachelor of Arts", 3, "business", []),
    ("Bachelor of Science in Engineering", "Department of Engineering", "Engineering", "Bachelor of Science", 3, "engineering", []),
    ("Master of Business Administration", "Business School", "Business Administration", "MBA", 1, "business", []),
]


async def seed():
    async with async_session() as s:
        r = await s.execute(select(University))
        unis = {u.name: u.id for u in r.scalars().all()}

        existing_r = await s.execute(
            select(Programme.university_id, Programme.name)
        )
        existing = {(row[0], row[1]) for row in existing_r.fetchall()}

        total_p = 0
        total_r = 0

        tech_unis = ["Cape Coast Technical University", "Ho Technical University",
                      "Sunyani Technical University", "Tamale Technical University",
                      "Bolgatanga Technical University", "Dr. Hilla Limann Technical University",
                      "Accra Technical University", "Kumasi Technical University",
                      "Takoradi Technical University", "Koforidua Technical University",
                      "Ghana Communication Technology University"]

        for uni_name in tech_unis:
            uid = unis.get(uni_name)
            if not uid:
                continue
            for name, fac, dept, deg, dur, cluster, reqs in TECH_PROGS:
                if (uid, name) in existing:
                    continue
                p = Programme(university_id=uid, name=name, faculty=fac, department=dept,
                              degree_type=deg, duration_years=dur, career_cluster_keys=cluster,
                              programme_level="undergraduate")
                s.add(p)
                await s.flush()
                total_p += 1
                for subj, grade, rtype in reqs:
                    s.add(ProgrammeRequirement(programme_id=p.id, subject=subj,
                                               minimum_grade=grade, requirement_type=rtype,
                                               qualification_type="WASSCE"))
                    total_r += 1
            print(f"  {uni_name}: programmes added")

        private_unis = ["Central University", "Valley View University",
                         "Accra Institute of Technology", "BlueCrest College"]
        for uni_name in private_unis:
            uid = unis.get(uni_name)
            if not uid:
                continue
            for name, fac, dept, deg, dur, cluster, reqs in PRIVATE_PROGS:
                if (uid, name) in existing:
                    continue
                p = Programme(university_id=uid, name=name, faculty=fac, department=dept,
                              degree_type=deg, duration_years=dur, career_cluster_keys=cluster,
                              programme_level="undergraduate")
                s.add(p)
                await s.flush()
                total_p += 1
                for subj, grade, rtype in reqs:
                    s.add(ProgrammeRequirement(programme_id=p.id, subject=subj,
                                               minimum_grade=grade, requirement_type=rtype,
                                               qualification_type="WASSCE"))
                    total_r += 1
            print(f"  {uni_name}: programmes added")

        intl_unis = ["University of Cape Town", "University of the Witwatersrand",
                      "Stellenbosch University", "University of Nairobi",
                      "Makerere University", "University of Ibadan",
                      "University of Lagos", "Covenant University",
                      "Addis Ababa University", "University of Dar es Salaam"]
        for uni_name in intl_unis:
            uid = unis.get(uni_name)
            if not uid:
                continue
            for name, fac, dept, deg, dur, cluster, reqs in INTL_PROGS:
                if (uid, name) in existing:
                    continue
                p = Programme(university_id=uid, name=name, faculty=fac, department=dept,
                              degree_type=deg, duration_years=dur, career_cluster_keys=cluster,
                              programme_level="undergraduate")
                s.add(p)
                await s.flush()
                total_p += 1
                for subj, grade, rtype in reqs:
                    s.add(ProgrammeRequirement(programme_id=p.id, subject=subj,
                                               minimum_grade=grade, requirement_type=rtype,
                                               qualification_type="other"))
                    total_r += 1
            print(f"  {uni_name}: programmes added")

        euro_unis = ["University of Oxford", "University of Cambridge",
                      "University of Edinburgh", "University of Manchester",
                      "Technical University of Munich", "University of Amsterdam",
                      "Sorbonne University"]
        for uni_name in euro_unis:
            uid = unis.get(uni_name)
            if not uid:
                continue
            for name, fac, dept, deg, dur, cluster, reqs in EURO_PROGS:
                if (uid, name) in existing:
                    continue
                p = Programme(university_id=uid, name=name, faculty=fac, department=dept,
                              degree_type=deg, duration_years=dur, career_cluster_keys=cluster,
                              programme_level="postgraduate" if "Master" in deg else "undergraduate")
                s.add(p)
                await s.flush()
                total_p += 1
                for subj, grade, rtype in reqs:
                    s.add(ProgrammeRequirement(programme_id=p.id, subject=subj,
                                               minimum_grade=grade, requirement_type=rtype,
                                               qualification_type="other"))
                    total_r += 1
            print(f"  {uni_name}: programmes added")

        await s.commit()
        print(f"\nDone: {total_p} programmes, {total_r} requirements added")


if __name__ == "__main__":
    asyncio.run(seed())
