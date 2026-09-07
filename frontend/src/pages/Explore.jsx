import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { FiSearch, FiBookOpen, FiBriefcase } from 'react-icons/fi'

const CAREER_CATEGORIES = [
  { key: 'technology', name: 'Technology & Computing', color: 'bg-blue-100 text-blue-700' },
  { key: 'healthcare', name: 'Healthcare & Medicine', color: 'bg-red-100 text-red-700' },
  { key: 'business', name: 'Business & Finance', color: 'bg-amber-100 text-amber-700' },
  { key: 'engineering', name: 'Engineering & Built Environment', color: 'bg-purple-100 text-purple-700' },
  { key: 'law', name: 'Law & Social Sciences', color: 'bg-indigo-100 text-indigo-700' },
  { key: 'education', name: 'Education & Humanities', color: 'bg-pink-100 text-pink-700' },
  { key: 'agriculture', name: 'Agriculture & Natural Resources', color: 'bg-green-100 text-green-700' },
]

const CAREERS_DATA = {
  technology: [
    { name: 'Software Engineering', description: 'Design, build, and maintain software systems', skills: ['Problem-solving', 'Programming', 'Logic', 'Creativity'], salary: 'GHS 5,000 - 25,000/mo', growth: 'High demand globally' },
    { name: 'Data Science & Analytics', description: 'Extract insights from data to drive decisions', skills: ['Statistics', 'Programming', 'Critical thinking'], salary: 'GHS 6,000 - 30,000/mo', growth: 'Rapidly growing' },
    { name: 'Cybersecurity', description: 'Protect systems and data from digital threats', skills: ['Analytical thinking', 'Networking', 'Attention to detail'], salary: 'GHS 7,000 - 35,000/mo', growth: 'Critical shortage globally' },
  ],
  healthcare: [
    { name: 'Medicine & Surgery', description: 'Diagnose and treat illnesses and injuries', skills: ['Empathy', 'Science', 'Communication'], salary: 'GHS 8,000 - 40,000/mo', growth: 'Always in demand' },
    { name: 'Pharmacy', description: 'Prepare and dispense medications safely', skills: ['Chemistry', 'Attention to detail', 'Ethics'], salary: 'GHS 4,000 - 15,000/mo', growth: 'Steady demand' },
    { name: 'Nursing & Midwifery', description: 'Provide direct patient care and health education', skills: ['Compassion', 'Communication', 'Teamwork'], salary: 'GHS 3,500 - 12,000/mo', growth: 'High demand in Ghana' },
  ],
  business: [
    { name: 'Business Management', description: 'Plan, direct, and coordinate business operations', skills: ['Leadership', 'Communication', 'Strategic thinking'], salary: 'GHS 4,000 - 20,000/mo', growth: 'Strong local demand' },
    { name: 'Finance & Accounting', description: 'Manage financial records and advise on financial health', skills: ['Numeracy', 'Analytical thinking', 'Ethics'], salary: 'GHS 4,500 - 22,000/mo', growth: 'Consistent demand' },
    { name: 'Marketing & Digital Media', description: 'Promote products and build brand awareness', skills: ['Creativity', 'Communication', 'Data analysis'], salary: 'GHS 3,000 - 18,000/mo', growth: 'Growing with digital economy' },
  ],
  engineering: [
    { name: 'Civil Engineering', description: 'Design and oversee construction of infrastructure projects', skills: ['Mathematics', 'Problem-solving', 'Project management'], salary: 'GHS 5,000 - 25,000/mo', growth: 'High infrastructure investment' },
    { name: 'Electrical Engineering', description: 'Design and maintain electrical systems and equipment', skills: ['Physics', 'Technical skills', 'Problem-solving'], salary: 'GHS 5,000 - 22,000/mo', growth: 'Growing with energy sector' },
    { name: 'Mechanical Engineering', description: 'Design and manufacture mechanical systems', skills: ['Physics', 'Mathematics', 'Design thinking'], salary: 'GHS 4,500 - 20,000/mo', growth: 'Steady demand' },
  ],
  law: [
    { name: 'Law (LLB)', description: 'Advise clients and represent them in legal matters', skills: ['Analytical thinking', 'Communication', 'Research'], salary: 'GHS 5,000 - 30,000/mo', growth: 'Strong demand' },
    { name: 'Political Science & International Relations', description: 'Analyze political systems and global affairs', skills: ['Research', 'Critical thinking', 'Writing'], salary: 'GHS 3,000 - 15,000/mo', growth: 'Government and NGO demand' },
    { name: 'Social Work & Community Development', description: 'Support communities and vulnerable populations', skills: ['Empathy', 'Communication', 'Problem-solving'], salary: 'GHS 2,500 - 10,000/mo', growth: 'Growing NGO sector' },
  ],
  education: [
    { name: 'Teaching & Education', description: 'Educate and inspire the next generation', skills: ['Communication', 'Patience', 'Creativity'], salary: 'GHS 2,500 - 10,000/mo', growth: 'Consistent national need' },
    { name: 'Languages & Translation', description: 'Facilitate cross-cultural communication', skills: ['Language fluency', 'Cultural awareness'], salary: 'GHS 3,000 - 12,000/mo', growth: 'Growing with global business' },
    { name: 'Journalism & Media', description: 'Inform the public through various media channels', skills: ['Writing', 'Communication', 'Research'], salary: 'GHS 2,500 - 12,000/mo', growth: 'Digital media expansion' },
  ],
  agriculture: [
    { name: 'Agricultural Science', description: 'Improve crop production and farming methods', skills: ['Science', 'Practical skills', 'Problem-solving'], salary: 'GHS 3,000 - 15,000/mo', growth: 'Key sector for Ghana' },
    { name: 'Environmental Science', description: 'Protect and manage natural resources', skills: ['Science', 'Research', 'Data analysis'], salary: 'GHS 3,500 - 14,000/mo', growth: 'Growing environmental focus' },
  ],
}

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('technology')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCareers = CAREERS_DATA[activeCategory]?.filter(
    c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         c.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  return (
    <div className="min-h-[80vh] bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Explore Career Paths</h1>
          <p className="text-slate-500 mt-2">Discover careers across different fields</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CAREER_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                activeCategory === cat.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 card-hover">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                  <FiBriefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{career.name}</h3>
                  <p className="text-sm text-slate-500">{career.description}</p>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Skills needed</p>
                <div className="flex flex-wrap gap-1">
                  {career.skills.map((skill, j) => (
                    <span key={j} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm border-t pt-3">
                <span className="text-slate-500">{career.salary}</span>
                <span className="text-accent-600 font-medium text-xs">{career.growth}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
          >
            Take the Assessment to Find Your Match
          </Link>
        </div>
      </div>
    </div>
  )
}
