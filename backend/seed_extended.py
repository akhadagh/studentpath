"""
Extended seed script for Ghana Technical Universities, additional Ghana universities,
African international universities, and European universities.
Run: DATABASE_URL="postgresql://..." python seed_extended.py
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.database import engine, async_session
from app.models.university import University
from app.models.programme_v2 import Programme, ProgrammeRequirement


UNIVERSITIES = [
    # --- Missing Ghana Technical Universities ---
    {
        "name": "Cape Coast Technical University",
        "short_name": "CCTU",
        "institution_type": "technical",
        "ownership_type": "government",
        "region": "Central",
        "city": "Cape Coast",
        "official_website": "https://www.cctu.edu.gh",
        "admissions_website": "https://admissions.cctu.edu.gh",
        "description": "Cape Coast Technical University is a public technical university offering applied technology and engineering programmes.",
        "accreditation": "Ghana Tertiary Education Commission (GTEC)",
        "verification_status": "verified",
    },
    {
        "name": "Ho Technical University",
        "short_name": "HTU",
        "institution_type": "technical",
        "ownership_type": "government",
        "region": "Volta",
        "city": "Ho",
        "official_website": "https://www.htu.edu.gh",
        "admissions_website": "https://admissions.htu.edu.gh",
        "description": "Ho Technical University is a public technical university offering technology and applied science programmes.",
        "accreditation": "Ghana Tertiary Education Commission (GTEC)",
        "verification_status": "verified",
    },
    {
        "name": "Sunyani Technical University",
        "short_name": "STU",
        "institution_type": "technical",
        "ownership_type": "government",
        "region": "Bono",
        "city": "Sunyani",
        "official_website": "https://www.stu.edu.gh",
        "admissions_website": "https://admissions.stu.edu.gh",
        "description": "Sunyani Technical University is a public technical university offering applied technology programmes.",
        "accreditation": "Ghana Tertiary Education Commission (GTEC)",
        "verification_status": "verified",
    },
    {
        "name": "Tamale Technical University",
        "short_name": "TATU",
        "institution_type": "technical",
        "ownership_type": "government",
        "region": "Northern",
        "city": "Tamale",
        "official_website": "https://www.tatu.edu.gh",
        "admissions_website": "https://admissions.tatu.edu.gh",
        "description": "Tamale Technical University is a public technical university offering technology and engineering programmes.",
        "accreditation": "Ghana Tertiary Education Commission (GTEC)",
        "verification_status": "verified",
    },
    {
        "name": "Bolgatanga Technical University",
        "short_name": "BTU",
        "institution_type": "technical",
        "ownership_type": "government",
        "region": "Upper East",
        "city": "Bolgatanga",
        "official_website": "https://www.btu.edu.gh",
        "admissions_website": "https://admissions.btu.edu.gh",
        "description": "Bolgatanga Technical University is a public technical university offering applied science and technology programmes.",
        "accreditation": "Ghana Tertiary Education Commission (GTEC)",
        "verification_status": "verified",
    },
    {
        "name": "Dr. Hilla Limann Technical University",
        "short_name": "DHLTU",
        "institution_type": "technical",
        "ownership_type": "government",
        "region": "Upper West",
        "city": "Wa",
        "official_website": "https://www.dhltu.edu.gh",
        "admissions_website": "https://admissions.dhltu.edu.gh",
        "description": "Dr. Hilla Limann Technical University (formerly Wa Technical University) is a public technical university in the Upper West Region.",
        "accreditation": "Ghana Tertiary Education Commission (GTEC)",
        "verification_status": "verified",
    },
    # --- Additional Ghana Universities ---
    {
        "name": "Central University",
        "short_name": "CU",
        "institution_type": "private",
        "ownership_type": "religious",
        "region": "Greater Accra",
        "city": "Accra",
        "official_website": "https://www.central.edu.gh",
        "admissions_website": "https://admissions.central.edu.gh",
        "description": "Central University is a private religious university offering programmes in business, humanities, and sciences.",
        "accreditation": "Ghana Tertiary Education Commission (GTEC)",
        "verification_status": "verified",
    },
    {
        "name": "Valley View University",
        "short_name": "VVU",
        "institution_type": "private",
        "ownership_type": "religious",
        "region": "Greater Accra",
        "city": "Accra",
        "official_website": "https://www.vvu.edu.gh",
        "admissions_website": "https://admissions.vvu.edu.gh",
        "description": "Valley View University is a private religious university offering diverse academic programmes.",
        "accreditation": "Ghana Tertiary Education Commission (GTEC)",
        "verification_status": "verified",
    },
    {
        "name": "Accra Institute of Technology",
        "short_name": "AIT",
        "institution_type": "private",
        "ownership_type": "private",
        "region": "Greater Accra",
        "city": "Accra",
        "official_website": "https://www.ait.edu.gh",
        "admissions_website": "https://admissions.ait.edu.gh",
        "description": "Accra Institute of Technology is a private university offering technology and business programmes.",
        "accreditation": "Ghana Tertiary Education Commission (GTEC)",
        "verification_status": "verified",
    },
    {
        "name": "BlueCrest College",
        "short_name": "BC",
        "institution_type": "private",
        "ownership_type": "private",
        "region": "Greater Accra",
        "city": "Accra",
        "official_website": "https://www.bluecrest.edu.gh",
        "admissions_website": "https://admissions.bluecrest.edu.gh",
        "description": "BlueCrest College is a private institution offering programmes in technology, business, and creative arts.",
        "accreditation": "Ghana Tertiary Education Commission (GTEC)",
        "verification_status": "verified",
    },
    # --- African International Universities ---
    {
        "name": "University of Cape Town",
        "short_name": "UCT",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Western Cape",
        "city": "Cape Coast",
        "official_website": "https://www.uct.ac.za",
        "admissions_website": "https://www.uct.ac.za/main/admissions",
        "description": "The University of Cape Town is a public research university in Cape Town, South Africa. It is the oldest university in South Africa and the oldest in Sub-Saharan Africa.",
        "accreditation": "Council on Higher Education (South Africa)",
        "verification_status": "verified",
    },
    {
        "name": "University of the Witwatersrand",
        "short_name": "Wits",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Gauteng",
        "city": "Johannesburg",
        "official_website": "https://www.wits.ac.za",
        "admissions_website": "https://www.wits.ac.za/admissions",
        "description": "The University of the Witwatersrand is a public research university in Johannesburg, South Africa. It is one of the leading universities in Africa.",
        "accreditation": "Council on Higher Education (South Africa)",
        "verification_status": "verified",
    },
    {
        "name": "Stellenbosch University",
        "short_name": "SU",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Western Cape",
        "city": "Stellenbosch",
        "official_website": "https://www.sun.ac.za",
        "admissions_website": "https://www.sun.ac.za/english/admissions",
        "description": "Stellenbosch University is a public research university in Stellenbosch, South Africa. It is one of the top-rated universities in Africa.",
        "accreditation": "Council on Higher Education (South Africa)",
        "verification_status": "verified",
    },
    {
        "name": "University of Nairobi",
        "short_name": "UoN",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Nairobi",
        "city": "Nairobi",
        "official_website": "https://www.uonbi.ac.ke",
        "admissions_website": "https://www.uonbi.ac.ke/admissions",
        "description": "The University of Nairobi is a public research university in Nairobi, Kenya. It is the largest university in Kenya.",
        "accreditation": "Commission for University Education (Kenya)",
        "verification_status": "verified",
    },
    {
        "name": "Makerere University",
        "short_name": "MU",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Central",
        "city": "Kampala",
        "official_website": "https://www.mak.ac.ug",
        "admissions_website": "https://www.mak.ac.ug/admissions",
        "description": "Makerere University is a public research university in Kampala, Uganda. It is the oldest and largest university in Uganda.",
        "accreditation": "National Council for Higher Education (Uganda)",
        "verification_status": "verified",
    },
    {
        "name": "University of Ibadan",
        "short_name": "UI",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Oyo",
        "city": "Ibadan",
        "official_website": "https://www.ui.edu.ng",
        "admissions_website": "https://www.ui.edu.ng/admissions",
        "description": "The University of Ibadan is a public research university in Ibadan, Nigeria. It is the oldest university in Nigeria.",
        "accreditation": "National Universities Commission (Nigeria)",
        "verification_status": "verified",
    },
    {
        "name": "University of Lagos",
        "short_name": "UNILAG",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Lagos",
        "city": "Lagos",
        "official_website": "https://www.unilag.edu.ng",
        "admissions_website": "https://www.unilag.edu.ng/admissions",
        "description": "The University of Lagos is a public research university in Lagos, Nigeria. It is one of the most competitive universities in Nigeria.",
        "accreditation": "National Universities Commission (Nigeria)",
        "verification_status": "verified",
    },
    {
        "name": "Covenant University",
        "short_name": "CU",
        "institution_type": "private",
        "ownership_type": "religious",
        "region": "Ogun",
        "city": "Ota",
        "official_website": "https://www.covenantuniversity.edu.ng",
        "admissions_website": "https://www.covenantuniversity.edu.ng/admissions",
        "description": "Covenant University is a private Christian university in Ota, Nigeria. It is one of the top-ranked universities in Nigeria.",
        "accreditation": "National Universities Commission (Nigeria)",
        "verification_status": "verified",
    },
    {
        "name": "Addis Ababa University",
        "short_name": "AAU",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Addis Ababa",
        "city": "Addis Ababa",
        "official_website": "https://www.aau.edu.et",
        "admissions_website": "https://www.aau.edu.et/admissions",
        "description": "Addis Ababa University is a public research university in Addis Ababa, Ethiopia. It is the oldest and largest university in Ethiopia.",
        "accreditation": "Ministry of Education (Ethiopia)",
        "verification_status": "verified",
    },
    {
        "name": "University of Dar es Salaam",
        "short_name": "UDSM",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Dar es Salaam",
        "city": "Dar es Salaam",
        "official_website": "https://www.udsm.ac.tz",
        "admissions_website": "https://www.udsm.ac.tz/admissions",
        "description": "The University of Dar es Salaam is a public university in Dar es Salaam, Tanzania. It is the oldest and largest university in Tanzania.",
        "accreditation": "Commission for Universities (Tanzania)",
        "verification_status": "verified",
    },
    # --- European Universities ---
    {
        "name": "University of Oxford",
        "short_name": "Oxford",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Oxfordshire",
        "city": "Oxford",
        "official_website": "https://www.ox.ac.uk",
        "admissions_website": "https://www.ox.ac.uk/admissions",
        "description": "The University of Oxford is a collegiate research university in Oxford, England. It is the oldest university in the English-speaking world.",
        "accreditation": "Office for Students (UK)",
        "verification_status": "verified",
    },
    {
        "name": "University of Cambridge",
        "short_name": "Cambridge",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Cambridgeshire",
        "city": "Cambridge",
        "official_website": "https://www.cam.ac.uk",
        "admissions_website": "https://www.cam.ac.uk/admissions",
        "description": "The University of Cambridge is a collegiate research university in Cambridge, England. It is one of the world's most prestigious universities.",
        "accreditation": "Office for Students (UK)",
        "verification_status": "verified",
    },
    {
        "name": "University of Edinburgh",
        "short_name": "Edinburgh",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Scotland",
        "city": "Edinburgh",
        "official_website": "https://www.ed.ac.uk",
        "admissions_website": "https://www.ed.ac.uk/admissions",
        "description": "The University of Edinburgh is a public research university in Edinburgh, Scotland. It is one of the ancient universities of Scotland.",
        "accreditation": "Quality Assurance Agency (UK)",
        "verification_status": "verified",
    },
    {
        "name": "University of Manchester",
        "short_name": "Manchester",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Greater Manchester",
        "city": "Manchester",
        "official_website": "https://www.manchester.ac.uk",
        "admissions_website": "https://www.manchester.ac.uk/study",
        "description": "The University of Manchester is a public research university in Manchester, England. It is one of the largest universities in the UK.",
        "accreditation": "Office for Students (UK)",
        "verification_status": "verified",
    },
    {
        "name": "Technical University of Munich",
        "short_name": "TUM",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Bavaria",
        "city": "Munich",
        "official_website": "https://www.tum.de",
        "admissions_website": "https://www.tum.de/en/studies",
        "description": "The Technical University of Munich is a public research university in Munich, Germany. It is one of Europe's top universities for science and technology.",
        "accreditation": "German Accreditation Council",
        "verification_status": "verified",
    },
    {
        "name": "University of Amsterdam",
        "short_name": "UvA",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "North Holland",
        "city": "Amsterdam",
        "official_website": "https://www.uva.nl",
        "admissions_website": "https://www.uva.nl/en/education",
        "description": "The University of Amsterdam is a public research university in Amsterdam, Netherlands. It is one of the largest research universities in Europe.",
        "accreditation": "Netherlands Accreditation Organisation (NVAO)",
        "verification_status": "verified",
    },
    {
        "name": "Sorbonne University",
        "short_name": "Sorbonne",
        "institution_type": "public",
        "ownership_type": "government",
        "region": "Ile-de-France",
        "city": "Paris",
        "official_website": "https://www.sorbonne-universite.fr",
        "admissions_website": "https://www.sorbonne-universite.fr/en/admissions",
        "description": "Sorbonne University is a public research university in Paris, France. It is one of the most prestigious universities in Europe.",
        "accreditation": "Ministry of Higher Education (France)",
        "verification_status": "verified",
    },
]


# --- Standard WASSCE requirements for Ghana Technical Universities ---
TECH_UNI_WASSCE_REQUIREMENTS = [
    {"requirement_type": "core", "subject": "Core Mathematics", "minimum_grade": "B2", "qualification_type": "WASSCE"},
    {"requirement_type": "core", "subject": "English Language", "minimum_grade": "C6", "qualification_type": "WASSCE"},
    {"requirement_type": "core", "subject": "Integrated Science", "minimum_grade": "C6", "qualification_type": "WASSCE"},
    {"requirement_type": "elective", "subject": "Elective Mathematics", "minimum_grade": "B3", "qualification_type": "WASSCE"},
    {"requirement_type": "elective", "subject": "Physics", "minimum_grade": "C6", "qualification_type": "WASSCE"},
]


# --- Programme templates for Ghana Technical Universities ---
def make_tech_uni_programmes():
    return [
        {
            "name": "HND in Civil Engineering",
            "normalised_name": "Civil Engineering",
            "degree_type": "Higher National Diploma",
            "faculty": "Faculty of Engineering",
            "department": "Department of Civil Engineering",
            "programme_level": "undergraduate",
            "duration_years": 3,
            "description": "Higher National Diploma programme in civil engineering covering construction, structural analysis, and infrastructure development.",
            "career_cluster_keys": "engineering",
            "requirements": TECH_UNI_WASSCE_REQUIREMENTS,
        },
        {
            "name": "HND in Electrical and Electronic Engineering",
            "normalised_name": "Electrical and Electronic Engineering",
            "degree_type": "Higher National Diploma",
            "faculty": "Faculty of Engineering",
            "department": "Department of Electrical and Electronic Engineering",
            "programme_level": "undergraduate",
            "duration_years": 3,
            "description": "Higher National Diploma programme in electrical and electronic engineering covering circuits, electronics, and power systems.",
            "career_cluster_keys": "engineering",
            "requirements": TECH_UNI_WASSCE_REQUIREMENTS,
        },
        {
            "name": "HND in Mechanical Engineering",
            "normalised_name": "Mechanical Engineering",
            "degree_type": "Higher National Diploma",
            "faculty": "Faculty of Engineering",
            "department": "Department of Mechanical Engineering",
            "programme_level": "undergraduate",
            "duration_years": 3,
            "description": "Higher National Diploma programme in mechanical engineering covering design, manufacturing, and thermodynamics.",
            "career_cluster_keys": "engineering",
            "requirements": TECH_UNI_WASSCE_REQUIREMENTS,
        },
        {
            "name": "HND in Computer Science",
            "normalised_name": "Computer Science",
            "degree_type": "Higher National Diploma",
            "faculty": "Faculty of Applied Sciences",
            "department": "Department of Computer Science",
            "programme_level": "undergraduate",
            "duration_years": 3,
            "description": "Higher National Diploma programme in computer science covering programming, algorithms, and software development.",
            "career_cluster_keys": "technology",
            "requirements": TECH_UNI_WASSCE_REQUIREMENTS,
        },
        {
            "name": "HND in Business Administration",
            "normalised_name": "Business Administration",
            "degree_type": "Higher National Diploma",
            "faculty": "Faculty of Business and Management Studies",
            "department": "Department of Business Administration",
            "programme_level": "undergraduate",
            "duration_years": 3,
            "description": "Higher National Diploma programme in business administration covering management, marketing, and finance.",
            "career_cluster_keys": "business",
            "requirements": [
                {"requirement_type": "core", "subject": "Core Mathematics", "minimum_grade": "C6", "qualification_type": "WASSCE"},
                {"requirement_type": "core", "subject": "English Language", "minimum_grade": "C6", "qualification_type": "WASSCE"},
                {"requirement_type": "elective", "subject": "Business Management", "minimum_grade": "C6", "qualification_type": "WASSCE"},
                {"requirement_type": "elective", "subject": "Economics", "minimum_grade": "C6", "qualification_type": "WASSCE"},
            ],
        },
        {
            "name": "Bachelor of Technology in Construction Technology",
            "normalised_name": "Construction Technology",
            "degree_type": "Bachelor of Technology",
            "faculty": "Faculty of Engineering",
            "department": "Department of Civil Engineering",
            "programme_level": "undergraduate",
            "duration_years": 4,
            "description": "Bachelor of Technology programme in construction technology covering building construction, project management, and quantity surveying.",
            "career_cluster_keys": "engineering",
            "requirements": TECH_UNI_WASSCE_REQUIREMENTS,
        },
        {
            "name": "Bachelor of Technology in Information Technology",
            "normalised_name": "Information Technology",
            "degree_type": "Bachelor of Technology",
            "faculty": "Faculty of Applied Sciences",
            "department": "Department of Computer Science",
            "programme_level": "undergraduate",
            "duration_years": 4,
            "description": "Bachelor of Technology programme in information technology covering networking, database systems, and web technologies.",
            "career_cluster_keys": "technology",
            "requirements": TECH_UNI_WASSCE_REQUIREMENTS,
        },
    ]


# --- Ghana Private University programmes ---
GHANA_PRIVATE_UNI_PROGRAMMES = [
    {
        "name": "Bachelor of Science in Computer Science",
        "normalised_name": "Computer Science",
        "degree_type": "Bachelor of Science",
        "faculty": "Faculty of Science",
        "department": "Department of Computer Science",
        "programme_level": "undergraduate",
        "duration_years": 4,
        "description": "Comprehensive programme in computing theory, software development, and systems design.",
        "career_cluster_keys": "technology",
        "requirements": [
            {"requirement_type": "core", "subject": "Core Mathematics", "minimum_grade": "B2", "qualification_type": "WASSCE"},
            {"requirement_type": "core", "subject": "English Language", "minimum_grade": "C6", "qualification_type": "WASSCE"},
            {"requirement_type": "core", "subject": "Integrated Science", "minimum_grade": "C6", "qualification_type": "WASSCE"},
            {"requirement_type": "elective", "subject": "Elective Mathematics", "minimum_grade": "B3", "qualification_type": "WASSCE"},
            {"requirement_type": "elective", "subject": "Physics", "minimum_grade": "C6", "qualification_type": "WASSCE"},
        ],
    },
    {
        "name": "Bachelor of Science in Business Administration",
        "normalised_name": "Business Administration",
        "degree_type": "Bachelor of Science",
        "faculty": "Faculty of Business",
        "department": "Department of Business Administration",
        "programme_level": "undergraduate",
        "duration_years": 4,
        "description": "Programme covering management principles, marketing, finance, and organisational behaviour.",
        "career_cluster_keys": "business",
        "requirements": [
            {"requirement_type": "core", "subject": "Core Mathematics", "minimum_grade": "C6", "qualification_type": "WASSCE"},
            {"requirement_type": "core", "subject": "English Language", "minimum_grade": "C6", "qualification_type": "WASSCE"},
            {"requirement_type": "elective", "subject": "Business Management", "minimum_grade": "C6", "qualification_type": "WASSCE"},
            {"requirement_type": "elective", "subject": "Economics", "minimum_grade": "C6", "qualification_type": "WASSCE"},
        ],
    },
    {
        "name": "Bachelor of Science in Nursing",
        "normalised_name": "Nursing",
        "degree_type": "Bachelor of Science",
        "faculty": "Faculty of Health Sciences",
        "department": "School of Nursing",
        "programme_level": "undergraduate",
        "duration_years": 4,
        "description": "Professional nursing education preparing students for healthcare practice.",
        "career_cluster_keys": "healthcare",
        "requirements": [
            {"requirement_type": "core", "subject": "Core Mathematics", "minimum_grade": "C6", "qualification_type": "WASSCE"},
            {"requirement_type": "core", "subject": "English Language", "minimum_grade": "C6", "qualification_type": "WASSCE"},
            {"requirement_type": "core", "subject": "Integrated Science", "minimum_grade": "C6", "qualification_type": "WASSCE"},
            {"requirement_type": "elective", "subject": "Biology", "minimum_grade": "C6", "qualification_type": "WASSCE"},
        ],
    },
]


# --- International university programme templates ---
INTERNATIONAL_CS_PROGRAMME = {
    "name": "Bachelor of Science in Computer Science",
    "normalised_name": "Computer Science",
    "degree_type": "Bachelor of Science",
    "faculty": "Faculty of Science",
    "department": "Department of Computer Science",
    "programme_level": "undergraduate",
    "duration_years": 3,
    "description": "Comprehensive computer science programme covering algorithms, data structures, software engineering, and artificial intelligence.",
    "career_cluster_keys": "technology",
    "requirements": [],
}

INTERNATIONAL_BUSINESS_PROGRAMME = {
    "name": "Bachelor of Science in Business Administration",
    "normalised_name": "Business Administration",
    "degree_type": "Bachelor of Science",
    "faculty": "Faculty of Commerce",
    "department": "Department of Business Administration",
    "programme_level": "undergraduate",
    "duration_years": 3,
    "description": "Business administration programme covering management, marketing, finance, and strategic planning.",
    "career_cluster_keys": "business",
    "requirements": [],
}

INTERNATIONAL_MEDICINE_PROGRAMME = {
    "name": "Bachelor of Medicine and Surgery",
    "normalised_name": "Medicine",
    "degree_type": "Bachelor of Medicine and Surgery",
    "faculty": "Faculty of Health Sciences",
    "department": "School of Medicine",
    "programme_level": "undergraduate",
    "duration_years": 6,
    "description": "Comprehensive medical education leading to qualification as a medical doctor.",
    "career_cluster_keys": "healthcare",
    "requirements": [],
}

INTERNATIONAL_MECHANICAL_ENG_PROGRAMME = {
    "name": "Bachelor of Science in Mechanical Engineering",
    "normalised_name": "Mechanical Engineering",
    "degree_type": "Bachelor of Science",
    "faculty": "Faculty of Engineering",
    "department": "Department of Mechanical Engineering",
    "programme_level": "undergraduate",
    "duration_years": 3,
    "description": "Engineering programme covering thermodynamics, fluid mechanics, materials science, and design.",
    "career_cluster_keys": "engineering",
    "requirements": [],
}

INTERNATIONAL_ELECTRICAL_ENG_PROGRAMME = {
    "name": "Bachelor of Science in Electrical and Electronic Engineering",
    "normalised_name": "Electrical and Electronic Engineering",
    "degree_type": "Bachelor of Science",
    "faculty": "Faculty of Engineering",
    "department": "Department of Electrical Engineering",
    "programme_level": "undergraduate",
    "duration_years": 3,
    "description": "Engineering programme covering circuits, electronics, control systems, and telecommunications.",
    "career_cluster_keys": "engineering",
    "requirements": [],
}


# Map each international university to its programmes
INTERNATIONAL_PROGRAMMES = {
    "University of Cape Town": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_MECHANICAL_ENG_PROGRAMME,
    ],
    "University of the Witwatersrand": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_ELECTRICAL_ENG_PROGRAMME,
    ],
    "Stellenbosch University": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_MECHANICAL_ENG_PROGRAMME,
    ],
    "University of Nairobi": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_ELECTRICAL_ENG_PROGRAMME,
    ],
    "Makerere University": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_MECHANICAL_ENG_PROGRAMME,
    ],
    "University of Ibadan": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_ELECTRICAL_ENG_PROGRAMME,
    ],
    "University of Lagos": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_MECHANICAL_ENG_PROGRAMME,
    ],
    "Covenant University": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MECHANICAL_ENG_PROGRAMME,
        INTERNATIONAL_ELECTRICAL_ENG_PROGRAMME,
    ],
    "Addis Ababa University": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_MECHANICAL_ENG_PROGRAMME,
    ],
    "University of Dar es Salaam": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_ELECTRICAL_ENG_PROGRAMME,
    ],
    "University of Oxford": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_MECHANICAL_ENG_PROGRAMME,
    ],
    "University of Cambridge": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_ELECTRICAL_ENG_PROGRAMME,
    ],
    "University of Edinburgh": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_MECHANICAL_ENG_PROGRAMME,
    ],
    "University of Manchester": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
        INTERNATIONAL_ELECTRICAL_ENG_PROGRAMME,
    ],
    "Technical University of Munich": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_MECHANICAL_ENG_PROGRAMME,
        INTERNATIONAL_ELECTRICAL_ENG_PROGRAMME,
    ],
    "University of Amsterdam": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MECHANICAL_ENG_PROGRAMME,
    ],
    "Sorbonne University": [
        INTERNATIONAL_CS_PROGRAMME,
        INTERNATIONAL_BUSINESS_PROGRAMME,
        INTERNATIONAL_MEDICINE_PROGRAMME,
    ],
}


async def seed_universities():
    """Insert universities that don't already exist (by name)."""
    print("Seeding extended universities...")
    async with async_session() as session:
        inserted = 0
        skipped = 0

        for uni_data in UNIVERSITIES:
            result = await session.execute(
                University.__table__.select().where(University.name == uni_data["name"])
            )
            if result.first():
                print(f"  [SKIP] University '{uni_data['name']}' already exists.")
                skipped += 1
                continue

            university = University(**uni_data)
            session.add(university)
            await session.flush()
            inserted += 1
            print(f"  [INSERT] University '{uni_data['short_name']}' ({uni_data['name']}).")

        await session.commit()
        print(f"\nUniversities: {inserted} inserted, {skipped} skipped.\n")
        return inserted


async def seed_programmes():
    """Insert programmes for all extended universities."""
    print("Seeding extended programmes...")
    async with async_session() as session:
        # Build a map of university name -> id
        uni_result = await session.execute(University.__table__.select())
        universities = {row.name: row.id for row in uni_result.fetchall()}

        total_programmes = 0
        total_requirements = 0

        # --- Ghana Technical Universities (5-7 programmes each) ---
        tech_uni_names = [
            "Cape Coast Technical University",
            "Ho Technical University",
            "Sunyani Technical University",
            "Tamale Technical University",
            "Bolgatanga Technical University",
            "Dr. Hilla Limann Technical University",
        ]

        for uni_name in tech_uni_names:
            uni_id = universities.get(uni_name)
            if not uni_id:
                print(f"  [WARN] University '{uni_name}' not found, skipping programmes.")
                continue

            programmes = make_tech_uni_programmes()
            for prog_data in programmes:
                requirements_data = prog_data.pop("requirements", [])

                # Check duplicate
                dup = await session.execute(
                    Programme.__table__.select().where(
                        Programme.name == prog_data["name"],
                        Programme.university_id == uni_id,
                    )
                )
                if dup.first():
                    continue

                programme = Programme(university_id=uni_id, **prog_data)
                session.add(programme)
                await session.flush()
                total_programmes += 1

                for req_data in requirements_data:
                    req = ProgrammeRequirement(programme_id=programme.id, **req_data)
                    session.add(req)
                    total_requirements += 1

            print(f"  Programmes for '{uni_name}' processed.")

        # --- Ghana Private Universities ---
        private_uni_names = [
            "Central University",
            "Valley View University",
            "Accra Institute of Technology",
            "BlueCrest College",
        ]

        for uni_name in private_uni_names:
            uni_id = universities.get(uni_name)
            if not uni_id:
                print(f"  [WARN] University '{uni_name}' not found, skipping programmes.")
                continue

            for prog_data in GHANA_PRIVATE_UNI_PROGRAMMES:
                requirements_data = prog_data.pop("requirements", [])

                dup = await session.execute(
                    Programme.__table__.select().where(
                        Programme.name == prog_data["name"],
                        Programme.university_id == uni_id,
                    )
                )
                if dup.first():
                    continue

                programme = Programme(university_id=uni_id, **prog_data)
                session.add(programme)
                await session.flush()
                total_programmes += 1

                for req_data in requirements_data:
                    req = ProgrammeRequirement(programme_id=programme.id, **req_data)
                    session.add(req)
                    total_requirements += 1

            print(f"  Programmes for '{uni_name}' processed.")

        # --- International Universities ---
        for uni_name, programmes in INTERNATIONAL_PROGRAMMES.items():
            uni_id = universities.get(uni_name)
            if not uni_id:
                print(f"  [WARN] University '{uni_name}' not found, skipping programmes.")
                continue

            for prog_data in programmes:
                requirements_data = prog_data.pop("requirements", [])

                dup = await session.execute(
                    Programme.__table__.select().where(
                        Programme.name == prog_data["name"],
                        Programme.university_id == uni_id,
                    )
                )
                if dup.first():
                    continue

                programme = Programme(university_id=uni_id, **prog_data)
                session.add(programme)
                await session.flush()
                total_programmes += 1

                for req_data in requirements_data:
                    req = ProgrammeRequirement(programme_id=programme.id, **req_data)
                    session.add(req)
                    total_requirements += 1

            print(f"  Programmes for '{uni_name}' processed.")

        await session.commit()
        print(f"\nProgrammes: {total_programmes} inserted, Requirements: {total_requirements} inserted.\n")


async def main():
    print("=" * 60)
    print("StudentPath Extended Seed Script")
    print("=" * 60)
    print()
    print("Adding:")
    print("  - 6 missing Ghana Technical Universities")
    print("  - 4 additional Ghana private universities")
    print("  - 10 African international universities")
    print("  - 7 European universities")
    print("  - Programmes for each")
    print()
    await seed_universities()
    await seed_programmes()
    print("=" * 60)
    print("Extended seed complete!")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
