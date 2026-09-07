from typing import Dict, List, Tuple


CAREER_CATEGORIES = {
    "technology": {
        "name": "Technology & Computing",
        "keywords": ["technology", "computing", "software", "data", "cyber", "ai", "automation", "digital"],
        "careers": [
            {
                "name": "Software Engineering",
                "description": "Design, build, and maintain software systems",
                "skills": ["Problem-solving", "Programming", "Logic", "Creativity"],
                "salary": "GHS 5,000 - 25,000/month",
                "growth": "High demand globally",
            },
            {
                "name": "Data Science & Analytics",
                "description": "Extract insights from data to drive decisions",
                "skills": ["Statistics", "Programming", "Critical thinking", "Visualization"],
                "salary": "GHS 6,000 - 30,000/month",
                "growth": "Rapidly growing",
            },
            {
                "name": "Cybersecurity",
                "description": "Protect systems and data from digital threats",
                "skills": ["Analytical thinking", "Networking", "Attention to detail", "Problem-solving"],
                "salary": "GHS 7,000 - 35,000/month",
                "growth": "Critical shortage globally",
            },
        ],
    },
    "healthcare": {
        "name": "Healthcare & Medicine",
        "keywords": ["health", "medicine", "care", "biological", "medical", "wellness", "anatomy"],
        "careers": [
            {
                "name": "Medicine & Surgery",
                "description": "Diagnose and treat illnesses and injuries",
                "skills": ["Empathy", "Science", "Communication", "Resilience"],
                "salary": "GHS 8,000 - 40,000/month",
                "growth": "Always in demand",
            },
            {
                "name": "Pharmacy",
                "description": "Prepare and dispense medications safely",
                "skills": ["Chemistry", "Attention to detail", "Communication", "Ethics"],
                "salary": "GHS 4,000 - 15,000/month",
                "growth": "Steady demand",
            },
            {
                "name": "Nursing & Midwifery",
                "description": "Provide direct patient care and health education",
                "skills": ["Compassion", "Communication", "Physical stamina", "Teamwork"],
                "salary": "GHS 3,500 - 12,000/month",
                "growth": "High demand in Ghana",
            },
        ],
    },
    "business": {
        "name": "Business & Finance",
        "keywords": ["business", "finance", "management", "entrepreneur", "marketing", "accounting", "trade"],
        "careers": [
            {
                "name": "Business Management",
                "description": "Plan, direct, and coordinate business operations",
                "skills": ["Leadership", "Communication", "Strategic thinking", "Numeracy"],
                "salary": "GHS 4,000 - 20,000/month",
                "growth": "Strong local demand",
            },
            {
                "name": "Finance & Accounting",
                "description": "Manage financial records and advise on financial health",
                "skills": ["Numeracy", "Analytical thinking", "Ethics", "Attention to detail"],
                "salary": "GHS 4,500 - 22,000/month",
                "growth": "Consistent demand",
            },
            {
                "name": "Marketing & Digital Media",
                "description": "Promote products and build brand awareness",
                "skills": ["Creativity", "Communication", "Data analysis", "Persuasion"],
                "salary": "GHS 3,000 - 18,000/month",
                "growth": "Growing with digital economy",
            },
        ],
    },
    "engineering": {
        "name": "Engineering & Built Environment",
        "keywords": ["engineering", "construction", "build", "design", "infrastructure", "mechanical", "electrical"],
        "careers": [
            {
                "name": "Civil Engineering",
                "description": "Design and oversee construction of infrastructure projects",
                "skills": ["Mathematics", "Problem-solving", "Project management", "Spatial awareness"],
                "salary": "GHS 5,000 - 25,000/month",
                "growth": "High infrastructure investment in Ghana",
            },
            {
                "name": "Electrical Engineering",
                "description": "Design and maintain electrical systems and equipment",
                "skills": ["Physics", "Technical skills", "Problem-solving", "Attention to detail"],
                "salary": "GHS 5,000 - 22,000/month",
                "growth": "Growing with energy sector",
            },
            {
                "name": "Mechanical Engineering",
                "description": "Design and manufacture mechanical systems",
                "skills": ["Physics", "Mathematics", "Design thinking", "Hands-on skills"],
                "salary": "GHS 4,500 - 20,000/month",
                "growth": "Steady demand",
            },
        ],
    },
    "law": {
        "name": "Law & Social Sciences",
        "keywords": ["law", "legal", "social", "policy", "governance", "justice", "rights", "politics"],
        "careers": [
            {
                "name": "Law (LLB)",
                "description": "Advise clients and represent them in legal matters",
                "skills": ["Analytical thinking", "Communication", "Research", "Ethics"],
                "salary": "GHS 5,000 - 30,000/month",
                "growth": "Strong demand",
            },
            {
                "name": "Political Science & International Relations",
                "description": "Analyze political systems and global affairs",
                "skills": ["Research", "Critical thinking", "Communication", "Writing"],
                "salary": "GHS 3,000 - 15,000/month",
                "growth": "Government and NGO demand",
            },
            {
                "name": "Social Work & Community Development",
                "description": "Support communities and vulnerable populations",
                "skills": ["Empathy", "Communication", "Problem-solving", "Cultural awareness"],
                "salary": "GHS 2,500 - 10,000/month",
                "growth": "Growing NGO sector",
            },
        ],
    },
    "education": {
        "name": "Education & Humanities",
        "keywords": ["education", "teaching", "language", "history", "literature", "culture", "humanities"],
        "careers": [
            {
                "name": "Teaching & Education",
                "description": "Educate and inspire the next generation",
                "skills": ["Communication", "Patience", "Creativity", "Organization"],
                "salary": "GHS 2,500 - 10,000/month",
                "growth": "Consistent national need",
            },
            {
                "name": "Languages & Translation",
                "description": "Facilitate cross-cultural communication",
                "skills": ["Language fluency", "Cultural awareness", "Attention to detail"],
                "salary": "GHS 3,000 - 12,000/month",
                "growth": "Growing with global business",
            },
            {
                "name": "Journalism & Media",
                "description": "Inform the public through various media channels",
                "skills": ["Writing", "Communication", "Research", "Creativity"],
                "salary": "GHS 2,500 - 12,000/month",
                "growth": "Digital media expansion",
            },
        ],
    },
    "agriculture": {
        "name": "Agriculture & Natural Resources",
        "keywords": ["agriculture", "farming", "environment", "nature", "food", "sustainability", "agricultural"],
        "careers": [
            {
                "name": "Agricultural Science",
                "description": "Improve crop production and farming methods",
                "skills": ["Science", "Practical skills", "Problem-solving", "Environmental awareness"],
                "salary": "GHS 3,000 - 15,000/month",
                "growth": "Key sector for Ghana's economy",
            },
            {
                "name": "Environmental Science",
                "description": "Protect and manage natural resources",
                "skills": ["Science", "Research", "Data analysis", "Communication"],
                "salary": "GHS 3,500 - 14,000/month",
                "growth": "Growing environmental focus",
            },
        ],
    },
}


ASSESSMENT_QUESTIONS = {
    "interests": {
        "question": "Which activities do you enjoy most?",
        "options": {
            1: "Solving technical problems and working with technology",
            2: "Helping and caring for other people",
            3: "Managing projects and leading teams",
            4: "Designing and building things",
            5: "Research and analyzing information",
            6: "Teaching and sharing knowledge",
            7: "Working with nature and the environment",
            8: "Creative expression and communication",
        },
    },
    "strengths": {
        "question": "What are you best at in school?",
        "options": {
            1: "Mathematics and Computer Science",
            2: "Science (Biology, Chemistry, Physics)",
            3: "Business Studies and Economics",
            4: "Technical and Vocational subjects",
            5: "Social Sciences and Humanities",
            6: "Languages and Communication",
            7: "Agriculture and Environmental Studies",
            8: "Arts and Creative subjects",
        },
    },
    "work_style": {
        "question": "How do you prefer to work?",
        "options": {
            1: "Independently with computers and technology",
            2: "In teams, directly helping others",
            3: "In leadership roles, making decisions",
            4: "Hands-on, building or fixing things",
            5: "Analyzing data and finding patterns",
            6: "In educational settings, sharing knowledge",
            7: "Outdoors, working with nature",
            8: "In creative, flexible environments",
        },
    },
    "values": {
        "question": "What matters most to you in a career?",
        "options": {
            1: "High income and financial security",
            2: "Making a difference in people's lives",
            3: "Status and professional recognition",
            4: "Job stability and benefits",
            5: "Intellectual challenge and growth",
            6: "Work-life balance",
            7: "Working in a growing industry",
            8: "Creative freedom and independence",
        },
    },
    "challenges": {
        "question": "What type of challenges energize you?",
        "options": {
            1: "Debugging complex code or systems",
            2: "Diagnosing and treating health conditions",
            3: "Negotiating deals or solving business problems",
            4: "Engineering solutions to infrastructure problems",
            5: "Legal research and argumentation",
            6: "Designing curricula and educating others",
            7: "Addressing environmental or food security issues",
            8: "Creating compelling content or designs",
        },
    },
    "future": {
        "question": "Where do you see yourself in 10 years?",
        "options": {
            1: "Leading a tech company or startup",
            2: "Working in a hospital or health organization",
            3: "Running my own business",
            4: "Managing major construction or engineering projects",
            5: "Practicing law or working in policy",
            6: "Teaching at a university or leading an educational institution",
            7: "Working on sustainable development projects",
            8: "Working in media, arts, or cultural organizations",
        },
    },
}


CATEGORY_QUESTION_MAP = {
    1: "technology",
    2: "healthcare",
    3: "business",
    4: "engineering",
    5: "law",
    6: "education",
    7: "agriculture",
    8: "business",
}


def calculate_scores(answers: Dict[str, int]) -> Dict[str, float]:
    category_scores: Dict[str, float] = {cat: 0.0 for cat in CAREER_CATEGORIES}
    question_weights = {
        "interests": 1.5,
        "strengths": 1.3,
        "work_style": 1.2,
        "values": 1.0,
        "challenges": 1.1,
        "future": 1.4,
    }

    for question_key, answer_value in answers.items():
        if question_key in CATEGORY_QUESTION_MAP:
            primary_category = CATEGORY_QUESTION_MAP[answer_value]
            weight = question_weights.get(question_key, 1.0)
            category_scores[primary_category] += weight * 20

            for cat, cat_data in CAREER_CATEGORIES.items():
                if cat != primary_category:
                    if any(
                        kw in CAREER_CATEGORIES[primary_category]["name"].lower()
                        for kw in cat_data["keywords"]
                    ):
                        category_scores[cat] += weight * 5

    max_score = max(category_scores.values()) if category_scores.values() else 1
    if max_score > 0:
        for cat in category_scores:
            category_scores[cat] = min(round((category_scores[cat] / max_score) * 100, 1), 100)

    return category_scores


def get_top_matches(
    scores: Dict[str, float], top_n: int = 3
) -> List[dict]:
    sorted_categories = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:top_n]
    matches = []

    for category, score in sorted_categories:
        cat_data = CAREER_CATEGORIES[category]
        top_career = cat_data["careers"][0]
        matches.append(
            {
                "career": top_career["name"],
                "category": cat_data["name"],
                "match_percentage": score,
                "description": top_career["description"],
                "required_skills": top_career["skills"],
                "salary_range": top_career["salary"],
                "growth_outlook": top_career["growth"],
                "related_programmes": cat_data["careers"],
            }
        )

    return matches


def get_programme_recommendations(
    scores: Dict[str, float], top_n: int = 6
) -> List[dict]:
    all_programmes = []
    for category, score in scores.items():
        if score < 20:
            continue
        cat_data = CAREER_CATEGORIES[category]
        for career in cat_data["careers"]:
            all_programmes.append(
                {
                    "programme": f"{career['name']}",
                    "field": cat_data["name"],
                    "relevance_score": round(score * 0.9, 1),
                    "duration_years": 4,
                    "universities": ["University of Ghana", "KNUST", "UG", "GIMPA"],
                    "description": career["description"],
                }
            )

    all_programmes.sort(key=lambda x: x["relevance_score"], reverse=True)
    return all_programmes[:top_n]
