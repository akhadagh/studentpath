import { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiX, FiHelpCircle, FiInfo, FiSearch } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

const WASSCE_SUBJECTS = [
  'Core Mathematics', 'English Language', 'Integrated Science', 'Social Studies',
  'Biology', 'Chemistry', 'Physics', 'Elective Mathematics',
  'Business Management', 'Economics', 'Literature in English',
  'Government', 'Geography', 'History', 'French', 'Twi',
  'Food and Nutrition', 'General Knowledge in Art', 'Technical Drawing',
  'Woodwork', 'Metalwork', 'Building Construction',
];

const WASSCE_GRADES = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'];

const STATUS_STYLES = {
  meets_requirements: 'bg-green-50 border-green-200 text-green-800',
  partial_match: 'bg-amber-50 border-amber-200 text-amber-800',
  does_not_meet: 'bg-red-50 border-red-200 text-red-800',
  insufficient_data: 'bg-slate-50 border-slate-200 text-slate-600',
  error: 'bg-red-50 border-red-200 text-red-800',
};

const STATUS_LABELS = {
  meets_requirements: { text: 'MEETS REQUIREMENTS', icon: FiCheck, color: 'text-green-600' },
  partial_match: { text: 'PARTIAL MATCH', icon: FiHelpCircle, color: 'text-amber-600' },
  does_not_meet: { text: 'DOES NOT MEET', icon: FiX, color: 'text-red-600' },
  insufficient_data: { text: 'INSUFFICIENT DATA', icon: FiInfo, color: 'text-slate-600' },
  error: { text: 'ERROR', icon: FiX, color: 'text-red-600' },
};

export default function EligibilityChecker() {
  const [subjects, setSubjects] = useState([
    { subject: 'Core Mathematics', grade: '' },
    { subject: 'English Language', grade: '' },
  ]);
  const [programmeSearch, setProgrammeSearch] = useState('');
  const [programmes, setProgrammes] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedProgrammes, setSelectedProgrammes] = useState([]);
  const [results, setResults] = useState(null);
  const [checking, setChecking] = useState(false);

  const addSubject = () => {
    setSubjects([...subjects, { subject: '', grade: '' }]);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const searchProgrammes = async () => {
    if (!programmeSearch.trim()) return;
    setSearching(true);
    try {
      const res = await api.get(`/api/v1/programmes/search?q=${encodeURIComponent(programmeSearch)}`);
      setProgrammes(res.data.results || []);
    } catch (err) {
      toast.error('Failed to search programmes');
    } finally {
      setSearching(false);
    }
  };

  const toggleProgramme = (prog) => {
    const exists = selectedProgrammes.find(p => p.id === prog.id);
    if (exists) {
      setSelectedProgrammes(selectedProgrammes.filter(p => p.id !== prog.id));
    } else {
      setSelectedProgrammes([...selectedProgrammes, prog]);
    }
  };

  const checkEligibility = async () => {
    if (selectedProgrammes.length === 0) {
      toast.error('Please select at least one programme');
      return;
    }

    const validSubjects = subjects.filter(s => s.subject && s.grade);
    if (validSubjects.length === 0) {
      toast.error('Please add at least one subject with a grade');
      return;
    }

    setChecking(true);
    try {
      const checks = selectedProgrammes.map(p => ({
        programme_id: p.id,
        subjects: validSubjects.map(s => ({ subject: s.subject, grade: s.grade })),
      }));

      const res = await api.post('/api/v1/eligibility/check', checks);
      setResults(res.data);
    } catch (err) {
      toast.error('Failed to check eligibility');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Eligibility Checker</h1>
          <p className="mt-2 text-slate-600">Check if your grades meet the published requirements for Ghanaian university programmes</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">1. Your WASSCE Subjects & Grades</h2>
            <div className="space-y-3">
              {subjects.map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <select value={s.subject} onChange={(e) => updateSubject(i, 'subject', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm">
                    <option value="">Select subject</option>
                    {WASSCE_SUBJECTS.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                  <select value={s.grade} onChange={(e) => updateSubject(i, 'grade', e.target.value)}
                    className="w-24 px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm">
                    <option value="">Grade</option>
                    {WASSCE_GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {subjects.length > 1 && (
                    <button onClick={() => removeSubject(i)} className="p-2 text-slate-400 hover:text-red-500 transition">
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addSubject} className="mt-3 flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700">
              <FiPlus /> Add subject
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">2. Select Programmes to Check</h2>
            <div className="flex gap-3 mb-4">
              <input type="text" placeholder="Search programmes..." value={programmeSearch}
                onChange={(e) => setProgrammeSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchProgrammes()}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none" />
              <button onClick={searchProgrammes} disabled={searching}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center gap-2">
                <FiSearch /> {searching ? 'Searching...' : 'Search'}
              </button>
            </div>

            {selectedProgrammes.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-2">Selected ({selectedProgrammes.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProgrammes.map(p => (
                    <span key={p.id} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center gap-2">
                      {p.name} @ {p.university_short_name || p.university_name}
                      <button onClick={() => toggleProgramme(p)} className="hover:text-primary-900"><FiX className="text-xs" /></button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {programmes.length > 0 && (
              <div className="max-h-64 overflow-y-auto space-y-2 border border-slate-100 rounded-lg">
                {programmes.map(p => (
                  <button key={p.id} onClick={() => toggleProgramme(p)}
                    className={`w-full text-left p-3 rounded-lg transition text-sm ${
                      selectedProgrammes.find(sp => sp.id === p.id)
                        ? 'bg-primary-50 border border-primary-200' : 'hover:bg-slate-50 border border-transparent'
                    }`}>
                    <span className="font-medium">{p.name}</span>
                    <span className="text-slate-500 ml-2">@ {p.university_short_name || p.university_name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={checkEligibility} disabled={checking || selectedProgrammes.length === 0}
            className="w-full py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 disabled:opacity-50 transition">
            {checking ? 'Checking...' : 'Check Eligibility'}
          </button>

          {results && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Results</h2>
              {results.map(r => {
                const statusConfig = STATUS_STYLES[r.status] || STATUS_STYLES.insufficient_data;
                const statusLabel = STATUS_LABELS[r.status] || STATUS_LABELS.insufficient_data;
                const StatusIcon = statusLabel.icon;
                return (
                  <div key={r.programme_id} className={`rounded-xl border p-5 ${statusConfig}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{r.programme_name}</h3>
                        <div className={`flex items-center gap-2 mt-1 text-sm font-medium ${statusLabel.color}`}>
                          <StatusIcon /> {statusLabel.text}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{r.message}</p>
                    {r.details?.met?.length > 0 && (
                      <div className="mt-3 text-sm">
                        <span className="font-medium">Met:</span> {r.details.met.map(m => `${m.subject} (${m.required})`).join(', ')}
                      </div>
                    )}
                    {r.details?.not_met?.length > 0 && (
                      <div className="mt-1 text-sm">
                        <span className="font-medium">Not met:</span> {r.details.not_met.map(m =>
                          m.status === 'missing' ? `${m.subject} (missing)` : `${m.subject} (required ${m.required}, you have ${m.student_grade})`
                        ).join(', ')}
                      </div>
                    )}
                  </div>
                );
              })}
              <p className="text-sm text-amber-700 bg-amber-50 p-4 rounded-xl">
                StudentPath provides education guidance based on available information and does not guarantee admission. Meeting minimum requirements does not ensure admission.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
