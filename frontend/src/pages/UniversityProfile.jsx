import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiGlobe, FiMail, FiPhone, FiMapPin, FiBookOpen, FiExternalLink, FiArrowLeft, FiSave, FiCheckCircle, FiFileText } from 'react-icons/fi';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const UNIVERSITY_GUIDES = {
  default: {
    overview: 'This institution is committed to providing quality tertiary education and contributing to national development through teaching, research and community service.',
    accreditation: 'Accredited by the Ghana Tertiary Education Commission (GTEC). All programmes are approved and recognised for professional practice in Ghana.',
    admissions: 'Admissions are conducted annually. Applicants should have WASSCE with minimum grade C6 in Core and Elective subjects relevant to their chosen programme.',
    facilities: 'The university provides modern lecture halls, libraries, laboratories, ICT centres, sports facilities and student accommodation.',
    student_life: 'Students enjoy a vibrant campus life with various clubs, societies, religious organisations and cultural activities.',
  },
};

const countryGuides = {
  Ghana: {
    overview: 'This Ghanaian university is part of the country\'s tertiary education system, regulated by the Ghana Tertiary Education Commission (GTEC). It offers undergraduate and postgraduate programmes across multiple faculties.',
    accreditation: 'Fully accredited by GTEC. Programmes are approved by relevant professional bodies where applicable (e.g., Ghana Medical and Dental Council, Ghana Institute of Engineers).',
    admissions: 'Admissions are based on WASSCE/SSSCE results or equivalent qualifications. Applicants apply through the university\'s admissions office or the centralized university admissions system.',
    facilities: 'Campus facilities include lecture theatres, well-stocked libraries, computer laboratories, research centres, sports complexes and residential halls.',
    student_life: 'Ghanaian universities offer a rich campus experience with student unions, cultural festivals, religious societies, sports competitions and community engagement programmes.',
  },
  'South Africa': {
    overview: 'This South African institution is one of Africa\'s leading research universities, recognised globally for academic excellence and innovation.',
    accreditation: 'Accredited by the Council on Higher Education (CHE) and registered with the Department of Higher Education and Training.',
    admissions: 'Admissions are based on the National Senior Certificate (NSC) or equivalent qualifications. International students must have their qualifications evaluated by SAQA.',
    facilities: 'World-class facilities including advanced research laboratories, digital libraries, innovation hubs and modern student residences.',
    student_life: 'Diverse and vibrant campus life with students from across Africa and the world. Multiple cultural organisations, sports clubs and academic societies.',
  },
  Nigeria: {
    overview: 'This Nigerian university is committed to advancing knowledge through quality teaching, research and community engagement.',
    accreditation: 'Accredited by the National Universities Commission (NUC). Professional programmes are also accredited by relevant regulatory bodies.',
    admissions: 'Admissions are through JAMB (Joint Admissions and Matriculation Board) for UTME candidates or direct entry for holders of higher qualifications.',
    facilities: 'The campus includes modern lecture halls, extensive libraries, well-equipped laboratories, ICT centres and residential accommodation.',
    student_life: 'Active student unions, departmental associations, religious groups, cultural organisations and sporting activities.',
  },
  Kenya: {
    overview: 'This Kenyan university is a leading institution in East Africa, known for its academic rigour and contribution to regional development.',
    accreditation: 'Accredited by the Commission for University Education (CUE). All programmes meet national and international standards.',
    admissions: 'Admissions are based on KCSE results or equivalent qualifications. The university also admits students through mature entry and credit transfer schemes.',
    facilities: 'Modern campus infrastructure with lecture halls, libraries, laboratories, ICT facilities and student accommodation.',
    student_life: 'A multicultural campus environment with various student organisations, sports facilities and community outreach programmes.',
  },
  Uganda: {
    overview: 'This Ugandan university is a leading institution in the region, known for its academic excellence and research output.',
    accreditation: 'Accredited by the National Council for Higher Education (NCHE). Programmes are regularly reviewed for quality and relevance.',
    admissions: 'Admissions are based on UACE results or equivalent qualifications. The university also offers mature entry and diploma-to-degree pathways.',
    facilities: 'Comprehensive campus facilities including libraries, laboratories, ICT centres, sports facilities and residential halls.',
    student_life: 'Rich campus life with student guild activities, religious organisations, cultural events and sports competitions.',
  },
  Ethiopia: {
    overview: 'This Ethiopian institution is a major public university contributing to the country\'s development through education and research.',
    accreditation: 'Recognised by the Ethiopian Ministry of Education and relevant professional bodies.',
    admissions: 'Admissions are based on the Ethiopian Higher Education Entrance Examination (EHEEE) results or equivalent qualifications.',
    facilities: 'The campus features lecture halls, libraries, laboratories, ICT centres and student housing.',
    student_life: 'Active student communities with various clubs, societies and cultural activities.',
  },
  Tanzania: {
    overview: 'This Tanzanian university is committed to providing quality education and producing graduates who can contribute to national and global development.',
    accreditation: 'Accredited by the Tanzania Commission for Universities (TCU). All programmes meet national quality standards.',
    admissions: 'Admissions are based on ACSEE results or equivalent qualifications. Direct entry applicants must meet specific programme requirements.',
    facilities: 'Modern campus with lecture theatres, libraries, laboratories, ICT facilities and student accommodation.',
    student_life: 'Vibrant student life with various organisations, cultural activities, sports and community engagement.',
  },
  'United Kingdom': {
    overview: 'This UK university is a world-renowned institution with a long tradition of academic excellence and research leadership.',
    accreditation: 'Recognised by the Office for Students (OfS) and listed in the HESA institution table. Degrees are internationally recognised.',
    admissions: 'Admissions are through UCAS for undergraduate programmes. International students need IELTS/TOEFL English language qualifications.',
    facilities: 'State-of-the-art facilities including world-class libraries, research centres, laboratories and student support services.',
    student_life: 'Diverse international student community with over 200 student societies, sports clubs and cultural organisations.',
  },
  Germany: {
    overview: 'This German university is a leading technical institution known for its engineering and technology programmes.',
    accreditation: 'Recognised by the German Accreditation Council. Programmes meet German and EU quality standards.',
    admissions: 'Admissions requirements vary by programme. International students may need to complete a Studienkolleg (foundation year) and pass the Feststellungsprüfung.',
    facilities: 'Excellent facilities with advanced laboratories, libraries, computing centres and research institutes.',
    student_life: 'International student community with affordable living, excellent public transport and vibrant cultural scene.',
  },
  Netherlands: {
    overview: 'This Dutch university is known for its innovative approach to education and strong international focus.',
    accreditation: 'Accredited by the Accreditation Organisation of the Netherlands and Flanders (NVAO).',
    admissions: 'Admissions are based on prior academic qualifications. International students may need to meet specific entry requirements and English language proficiency.',
    facilities: 'Modern campus facilities with digital libraries, research labs, study spaces and career services.',
    student_life: 'Highly international environment with students from over 100 countries. Active student associations and cultural organisations.',
  },
  France: {
    overview: 'This French university is a prestigious institution with a rich history and strong academic reputation.',
    accreditation: 'Recognised by the French Ministry of Higher Education. Programmes follow the European LMD framework.',
    admissions: 'Admissions are based on baccalaureate results or equivalent. International students apply through Campus France or directly to the institution.',
    facilities: 'Historic and modern campus facilities including libraries, laboratories, research centres and cultural venues.',
    student_life: 'Dynamic student life with the French university system, student associations and cultural activities in Paris.',
  },
};

export default function UniversityProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [university, setUniversity] = useState(null);
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [facultyFilter, setFacultyFilter] = useState('');
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchUniversity();
    fetchProgrammes();
  }, [id]);

  const fetchUniversity = async () => {
    try {
      const res = await api.get(`/api/v1/universities/${id}`);
      setUniversity(res.data);
    } catch (err) {
      console.error('Failed to load university', err);
    }
  };

  const fetchProgrammes = async () => {
    setLoading(true);
    try {
      let url = `/api/v1/universities/${id}/programmes`;
      if (facultyFilter) url += `?faculty=${encodeURIComponent(facultyFilter)}`;
      const res = await api.get(url);
      setProgrammes(res.data.programmes || []);

      const uniqueFaculties = [...new Set((res.data.programmes || []).map(p => p.faculty).filter(Boolean))];
      setFaculties(uniqueFaculties);
    } catch (err) {
      console.error('Failed to load programmes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgrammes();
  }, [facultyFilter]);

  const handleSave = async () => {
    if (!user) { toast.error('Please login to save'); return; }
    try {
      await api.post('/api/v1/saved/universities', { university_id: parseInt(id) });
      toast.success('University saved!');
    } catch (err) {
      toast.error('Failed to save');
    }
  };

  const getGuide = () => {
    const country = university?.country || 'Ghana';
    return countryGuides[country] || countryGuides['Ghana'] || UNIVERSITY_GUIDES.default;
  };

  if (!university) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading university...</div>
      </div>
    );
  }

  const groupedProgrammes = {};
  programmes.forEach(p => {
    const key = p.faculty || 'Other';
    if (!groupedProgrammes[key]) groupedProgrammes[key] = [];
    groupedProgrammes[key].push(p);
  });

  const guide = getGuide();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{university.name}</h1>
                {university.short_name && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                    {university.short_name}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  university.institution_type === 'public' ? 'bg-blue-100 text-blue-800' :
                  university.institution_type === 'private' ? 'bg-purple-100 text-purple-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {university.institution_type}
                </span>
                {university.region && (
                  <span className="flex items-center gap-1"><FiMapPin /> {university.region}{university.city ? `, ${university.city}` : ''}</span>
                )}
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              {user && (
                <button onClick={handleSave} className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-2 transition">
                  <FiSave /> Save
                </button>
              )}
              <button
                onClick={() => {
                  if (!user) {
                    toast.error('Please login to check eligibility');
                    navigate('/eligibility', { state: { from: `/explore/universities/${id}` } });
                  } else {
                    navigate('/eligibility');
                  }
                }}
                className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 flex items-center gap-2 transition"
              >
                <FiCheckCircle /> Check Eligibility
              </button>
              {university.official_website && (
                <a href={university.official_website} target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 flex items-center gap-2 transition">
                  <FiGlobe /> Visit Website <FiExternalLink />
                </a>
              )}
            </div>
          </div>

          {university.verification_status && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className={`inline-flex items-center gap-2 text-sm ${
                university.verification_status === 'verified' ? 'text-green-600' : 'text-amber-600'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  university.verification_status === 'verified' ? 'bg-green-500' : 'bg-amber-500'
                }`}></span>
                Verified Official Source
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 overflow-x-auto">
          {['overview', 'programmes', 'requirements', 'guide'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab ? 'bg-primary-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab === 'guide' && <FiFileText className="w-4 h-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">About</h2>
              <p className="text-slate-600 leading-relaxed">{university.description || guide.overview}</p>
              {university.accreditation && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800"><strong>Accreditation:</strong> {university.accreditation}</p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact</h2>
              <div className="space-y-3 text-sm">
                {university.official_website && (
                  <div className="flex items-center gap-2">
                    <FiGlobe className="text-slate-400" />
                    <a href={university.official_website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline truncate">
                      {university.official_website}
                    </a>
                  </div>
                )}
                {university.admissions_website && (
                  <div className="flex items-center gap-2">
                    <FiBookOpen className="text-slate-400" />
                    <a href={university.admissions_website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline truncate">
                      Admissions Portal
                    </a>
                  </div>
                )}
                {university.contact_email && (
                  <div className="flex items-center gap-2">
                    <FiMail className="text-slate-400" />
                    <span className="text-slate-600">{university.contact_email}</span>
                  </div>
                )}
              </div>
              {university.campuses && university.campuses.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-slate-900 mb-2">Campuses</h3>
                  {university.campuses.map((c) => (
                    <div key={c.id} className="text-sm text-slate-600 py-1">
                      {c.campus_name}{c.location ? ` - ${c.location}` : ''}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'programmes' && (
          <div>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button
                onClick={() => setFacultyFilter('')}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                  !facultyFilter ? 'bg-primary-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Faculties ({programmes.length})
              </button>
              {faculties.map(f => (
                <button
                  key={f}
                  onClick={() => setFacultyFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                    facultyFilter === f ? 'bg-primary-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white rounded-xl animate-pulse"></div>)}
              </div>
            ) : programmes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <FiBookOpen className="mx-auto text-3xl text-slate-300 mb-3" />
                <p className="text-slate-500">No programmes found</p>
              </div>
            ) : (
              Object.entries(groupedProgrammes).map(([faculty, progs]) => (
                <div key={faculty} className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{faculty}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {progs.map(p => (
                      <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-primary-200 transition group">
                        <div className="flex justify-between items-start">
                          <Link to={`/explore/programmes/${p.id}`} className="flex-1">
                            <h4 className="font-medium text-slate-900 group-hover:text-primary-600 transition">{p.name}</h4>
                            <p className="text-sm text-slate-500 mt-1">{p.degree_type} &middot; {p.duration_years} years</p>
                          </Link>
                          <button
                            onClick={() => {
                              if (!user) {
                                toast.error('Please login to check eligibility');
                                navigate('/eligibility', { state: { from: `/explore/universities/${id}` } });
                              } else {
                                navigate('/eligibility');
                              }
                            }}
                            className="px-3 py-1 text-xs bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition flex items-center gap-1 whitespace-nowrap"
                          >
                            <FiCheckCircle className="w-3 h-3" /> Check
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">General Admission Requirements</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p className="mb-4">{guide.admissions}</p>
              <h3 className="text-base font-semibold text-slate-800">General WASSCE Requirements</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Core English Language</li>
                <li>Core Mathematics</li>
                <li>Integrated Science or Social Studies (depending on programme)</li>
                <li>Relevant elective subjects (varies by programme)</li>
              </ul>
              <p className="mt-4 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
                Note: Admission requirements are subject to change. Always verify with the official university admissions website.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                <FiFileText />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">About {university.name}</h2>
                <p className="text-sm text-slate-500">Verified information about this institution</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">Overview</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{university.description || guide.overview}</p>
              </div>

              <div className="p-5 bg-green-50 rounded-xl border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">Accreditation & Recognition</h3>
                <p className="text-green-700 leading-relaxed text-sm">{university.accreditation || guide.accreditation}</p>
              </div>

              <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">Admissions</h3>
                <p className="text-blue-700 leading-relaxed text-sm">{guide.admissions}</p>
              </div>

              <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
                <h3 className="font-semibold text-purple-800 mb-2">Facilities</h3>
                <p className="text-purple-700 leading-relaxed text-sm">{guide.facilities}</p>
              </div>

              <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
                <h3 className="font-semibold text-amber-800 mb-2">Student Life</h3>
                <p className="text-amber-700 leading-relaxed text-sm">{guide.student_life}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
              <p className="text-sm text-primary-700 leading-relaxed">
                <strong>Disclaimer:</strong> This information is provided for guidance purposes. Always verify details with the official university website or admissions office for the most current information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
