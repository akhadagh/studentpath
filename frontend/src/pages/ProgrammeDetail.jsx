import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiMapPin, FiBookOpen, FiCheck, FiX, FiHelpCircle, FiInfo } from 'react-icons/fi';
import api from '../services/api';

const STATUS_CONFIG = {
  meets_requirements: { color: 'text-green-700 bg-green-50 border-green-200', icon: FiCheck, label: 'MEETS PUBLISHED REQUIREMENTS' },
  partial_match: { color: 'text-amber-700 bg-amber-50 border-amber-200', icon: FiHelpCircle, label: 'PARTIALLY MATCHES' },
  does_not_meet: { color: 'text-red-700 bg-red-50 border-red-200', icon: FiX, label: 'DOES NOT MEET REQUIREMENTS' },
  insufficient_data: { color: 'text-slate-600 bg-slate-50 border-slate-200', icon: FiInfo, label: 'INSUFFICIENT DATA' },
};

export default function ProgrammeDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchProgramme();
  }, [id]);

  const fetchProgramme = async () => {
    try {
      const res = await api.get(`/api/v1/programmes/${id}`);
      setData(res.data);
    } catch (err) {
      console.error('Failed to load programme', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading programme...</div>
      </div>
    );
  }

  if (!data || !data.programme) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 text-lg mb-4">Programme not found</p>
          <Link to="/explore/programmes" className="text-primary-600 hover:text-primary-700">Back to Search</Link>
        </div>
      </div>
    );
  }

  const { programme: prog, university: uni, requirements, cut_offs } = data;

  const coreReqs = requirements.filter(r => r.requirement_type === 'core');
  const electiveReqs = requirements.filter(r => r.requirement_type === 'elective');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/explore/programmes" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 mb-6">
          <FiArrowLeft /> Back to Programme Search
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{prog.name}</h1>
          {uni && (
            <Link to={`/explore/universities/${uni.id}`} className="text-primary-600 hover:text-primary-700 font-medium">
              {uni.name}
            </Link>
          )}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-600">
            {prog.degree_type && <span>{prog.degree_type}</span>}
            <span className="flex items-center gap-1"><FiClock /> {prog.duration_years} years</span>
            {uni && uni.region && <span className="flex items-center gap-1"><FiMapPin /> {uni.region}</span>}
          </div>
          {prog.description && <p className="mt-4 text-slate-600 leading-relaxed">{prog.description}</p>}
        </div>

        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 overflow-x-auto">
          {['overview', 'requirements', 'cut-offs'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab ? 'bg-primary-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Programme Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="text-sm text-slate-500">Faculty</span><p className="font-medium">{prog.faculty || 'N/A'}</p></div>
                <div><span className="text-sm text-slate-500">Department</span><p className="font-medium">{prog.department || 'N/A'}</p></div>
                <div><span className="text-sm text-slate-500">Degree Type</span><p className="font-medium">{prog.degree_type || 'N/A'}</p></div>
                <div><span className="text-sm text-slate-500">Duration</span><p className="font-medium">{prog.duration_years} years</p></div>
              </div>
            </div>
            {uni && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">University</h2>
                <Link to={`/explore/universities/${uni.id}`} className="text-primary-600 hover:text-primary-700 font-medium">{uni.name}</Link>
                <p className="text-sm text-slate-500 mt-1">{uni.institution_type} &middot; {uni.region}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="space-y-6">
            {requirements.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <FiInfo className="mx-auto text-3xl text-slate-300 mb-3" />
                <p className="text-slate-500">No verified requirements currently available for this programme.</p>
                <p className="text-sm text-slate-400 mt-2">Please check the official university admissions website.</p>
              </div>
            ) : (
              <>
                {coreReqs.length > 0 && (
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Core Subject Requirements</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-100">
                          <th className="text-left py-2 text-slate-500 font-medium">Subject</th>
                          <th className="text-left py-2 text-slate-500 font-medium">Min Grade</th>
                          <th className="text-left py-2 text-slate-500 font-medium">Qualification</th>
                        </tr></thead>
                        <tbody>{coreReqs.map(r => (
                          <tr key={r.id} className="border-b border-slate-50">
                            <td className="py-2.5 font-medium text-slate-800">{r.subject}</td>
                            <td className="py-2.5"><span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-semibold">{r.minimum_grade}</span></td>
                            <td className="py-2.5 text-slate-600">{r.qualification_type}</td>
                          </tr>
                        ))}</tbody>
                      </table>
                    </div>
                  </div>
                )}
                {electiveReqs.length > 0 && (
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Elective Subject Requirements</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-100">
                          <th className="text-left py-2 text-slate-500 font-medium">Subject</th>
                          <th className="text-left py-2 text-slate-500 font-medium">Min Grade</th>
                          <th className="text-left py-2 text-slate-500 font-medium">Qualification</th>
                        </tr></thead>
                        <tbody>{electiveReqs.map(r => (
                          <tr key={r.id} className="border-b border-slate-50">
                            <td className="py-2.5 font-medium text-slate-800">{r.subject}</td>
                            <td className="py-2.5"><span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-semibold">{r.minimum_grade}</span></td>
                            <td className="py-2.5 text-slate-600">{r.qualification_type}</td>
                          </tr>
                        ))}</tbody>
                      </table>
                    </div>
                  </div>
                )}
                <p className="text-sm text-amber-700 bg-amber-50 p-4 rounded-xl">
                  Historical admission requirements are provided as a guide. Requirements may change by academic year. Always verify with the official university admissions website.
                </p>
              </>
            )}
          </div>
        )}

        {activeTab === 'cut-offs' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Historical Cut-Off Information</h2>
            {cut_offs.length === 0 ? (
              <div className="text-center py-8">
                <FiHelpCircle className="mx-auto text-3xl text-slate-300 mb-3" />
                <p className="text-slate-500">No verified historical cut-off data currently available for this programme.</p>
                <p className="text-sm text-slate-400 mt-2">Cut-off information is published by universities after each admission cycle.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cut_offs.map(co => (
                  <div key={co.id} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-semibold text-slate-900">Academic Year: {co.academic_year}</span>
                        {co.cut_off_type && <span className="ml-3 text-sm text-slate-500">({co.cut_off_type})</span>}
                      </div>
                      {co.aggregate && <span className="text-lg font-bold text-primary-600">{co.aggregate}</span>}
                    </div>
                    {co.notes && <p className="text-sm text-slate-600 mt-2">{co.notes}</p>}
                  </div>
                ))}
                <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
                  Historical cut-off information is provided as a guide. Admission competitiveness and cut-offs may change by academic year.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
