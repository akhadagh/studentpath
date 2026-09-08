import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiGlobe, FiMail, FiPhone, FiMapPin, FiBookOpen, FiExternalLink, FiArrowLeft, FiSave } from 'react-icons/fi';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function UniversityProfile() {
  const { id } = useParams();
  const { user } = useAuth();
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/explore/universities" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 mb-6">
          <FiArrowLeft /> Back to Universities
        </Link>

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
            <div className="flex gap-3">
              {user && (
                <button onClick={handleSave} className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-2 transition">
                  <FiSave /> Save
                </button>
              )}
              {university.official_website && (
                <a href={university.official_website} target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 flex items-center gap-2 transition">
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
          {['overview', 'programmes', 'requirements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab ? 'bg-primary-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">About</h2>
              <p className="text-slate-600 leading-relaxed">{university.description || 'No description available.'}</p>
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
                      <Link
                        key={p.id}
                        to={`/explore/programmes/${p.id}`}
                        className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-primary-200 transition group"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-slate-900 group-hover:text-primary-600 transition">{p.name}</h4>
                            <p className="text-sm text-slate-500 mt-1">{p.degree_type} &middot; {p.duration_years} years</p>
                          </div>
                        </div>
                      </Link>
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
              <p className="mb-4">Admission requirements vary by programme. Please check individual programme pages for specific requirements.</p>
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
      </div>
    </div>
  );
}
