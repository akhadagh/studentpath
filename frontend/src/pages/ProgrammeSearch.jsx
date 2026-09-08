import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiX, FiMapPin, FiClock, FiChevronRight } from 'react-icons/fi';
import api from '../services/api';

const FIELDS = [
  { value: '', label: 'All Fields' },
  { value: 'technology', label: 'Technology & Computing' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'healthcare', label: 'Healthcare & Medicine' },
  { value: 'business', label: 'Business & Finance' },
  { value: 'education', label: 'Education' },
  { value: 'law', label: 'Law & Public Policy' },
  { value: 'science', label: 'Science & Research' },
  { value: 'environment', label: 'Environment & Agriculture' },
  { value: 'creative', label: 'Creative & Media' },
  { value: 'social', label: 'Social & Community Services' },
];

export default function ProgrammeSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [fieldFilter, setFieldFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [regions, setRegions] = useState([]);

  useEffect(() => { fetchRegions(); fetchProgrammes(); }, [typeFilter, regionFilter, fieldFilter]);

  const fetchRegions = async () => {
    try {
      const res = await api.get('/api/v1/universities/regions');
      setRegions(res.data.regions);
    } catch (err) { console.error(err); }
  };

  const fetchProgrammes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('q', search);
      if (typeFilter) params.append('institution_type', typeFilter);
      if (regionFilter) params.append('region', regionFilter);
      if (fieldFilter) params.append('field', fieldFilter);

      const res = await api.get(`/api/v1/programmes/search?${params.toString()}`);
      setResults(res.data.results || []);
    } catch (err) {
      console.error('Failed to load programmes', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => { e.preventDefault(); fetchProgrammes(); };

  const clearFilters = () => { setSearch(''); setTypeFilter(''); setRegionFilter(''); setFieldFilter(''); };
  const hasFilters = search || typeFilter || regionFilter || fieldFilter;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Search Programmes</h1>
          <p className="mt-2 text-slate-600">Find verified programmes across Ghanaian universities</p>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search programmes (e.g. Computer Science, Law, Nursing)..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition" />
            </div>
            <button type="button" onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border transition flex items-center gap-2 ${showFilters ? 'bg-primary-500 text-white border-primary-500' : 'border-slate-200 hover:bg-slate-100'}`}>
              <FiFilter /><span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none">
                <option value="">All Institution Types</option>
                <option value="public">Public University</option>
                <option value="private">Private University</option>
                <option value="technical">Technical University</option>
              </select>
              <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none">
                <option value="">All Regions</option>
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <select value={fieldFilter} onChange={(e) => setFieldFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none">
                {FIELDS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
              {hasFilters && (
                <button type="button" onClick={clearFilters} className="sm:col-span-3 text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1 justify-start">
                  <FiX /> Clear all filters
                </button>
              )}
            </div>
          )}
        </form>

        <p className="text-sm text-slate-500 mb-4">{results.length} programme{results.length !== 1 ? 's' : ''} found</p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white rounded-xl animate-pulse"></div>)}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <FiSearch className="mx-auto text-4xl text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">No programmes found</p>
            <button onClick={clearFilters} className="mt-4 text-primary-600 hover:text-primary-700">Clear filters</button>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map(p => (
              <Link key={p.id} to={`/explore/programmes/${p.id}`}
                className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-primary-200 transition group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition">{p.name}</h3>
                    <p className="text-sm text-primary-600 font-medium mt-1">{p.university_name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.institution_type === 'public' ? 'bg-blue-50 text-blue-700' :
                        p.institution_type === 'private' ? 'bg-purple-50 text-purple-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>{p.institution_type}</span>
                      {p.region && <span className="flex items-center gap-1"><FiMapPin className="text-xs" />{p.region}</span>}
                      <span className="flex items-center gap-1"><FiClock className="text-xs" />{p.duration_years} years</span>
                      {p.degree_type && <span>{p.degree_type}</span>}
                    </div>
                  </div>
                  <FiChevronRight className="text-slate-300 group-hover:text-primary-500 transition hidden md:block" />
                </div>
                {p.description && <p className="mt-3 text-sm text-slate-500 line-clamp-2">{p.description}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
