import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiBookOpen, FiFilter, FiX, FiChevronRight } from 'react-icons/fi';
import api from '../services/api';

const INSTITUTION_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'public', label: 'Public University' },
  { value: 'private', label: 'Private University' },
  { value: 'technical', label: 'Technical University' },
];

export default function UniversityList() {
  const [universities, setUniversities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchUniversities();
    fetchRegions();
  }, [typeFilter, regionFilter]);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (typeFilter) params.append('institution_type', typeFilter);
      if (regionFilter) params.append('region', regionFilter);

      const res = await api.get(`/api/v1/universities/?${params.toString()}`);
      setUniversities(res.data);
    } catch (err) {
      console.error('Failed to load universities', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegions = async () => {
    try {
      const res = await api.get('/api/v1/universities/regions');
      setRegions(res.data.regions);
    } catch (err) {
      console.error('Failed to load regions', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUniversities();
  };

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('');
    setRegionFilter('');
  };

  const hasFilters = search || typeFilter || regionFilter;

  const typeColors = {
    public: 'bg-blue-100 text-blue-800',
    private: 'bg-purple-100 text-purple-800',
    technical: 'bg-amber-100 text-amber-800',
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Explore Ghana Universities</h1>
          <p className="mt-2 text-slate-600">Discover verified information about universities and programmes in Ghana</p>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search universities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border transition flex items-center gap-2 ${
                showFilters ? 'bg-primary-500 text-white border-primary-500' : 'border-slate-200 hover:bg-slate-100'
              }`}
            >
              <FiFilter />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 flex flex-wrap gap-4">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none"
              >
                {INSTITUTION_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>

              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 outline-none"
              >
                <option value="">All Regions</option>
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
                >
                  <FiX /> Clear filters
                </button>
              )}
            </div>
          )}
        </form>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-16">
            <FiBookOpen className="mx-auto text-4xl text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">No universities found matching your criteria</p>
            <button onClick={clearFilters} className="mt-4 text-primary-600 hover:text-primary-700">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <Link
                key={uni.id}
                to={`/explore/universities/${uni.id}`}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-primary-200 transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition">
                      {uni.name}
                    </h3>
                    {uni.short_name && (
                      <p className="text-sm text-slate-500">{uni.short_name}</p>
                    )}
                  </div>
                  <FiChevronRight className="text-slate-300 group-hover:text-primary-500 transition mt-1" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[uni.institution_type] || 'bg-slate-100 text-slate-700'}`}>
                    {uni.institution_type}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  {uni.region && (
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-slate-400" />
                      <span>{uni.region}{uni.city ? `, ${uni.city}` : ''}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <FiBookOpen className="text-slate-400" />
                    <span>{uni.programme_count} programme{uni.programme_count !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {uni.verification_status && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className={`inline-flex items-center gap-1 text-xs ${
                      uni.verification_status === 'verified' ? 'text-green-600' :
                      uni.verification_status === 'needs_review' ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        uni.verification_status === 'verified' ? 'bg-green-500' :
                        uni.verification_status === 'needs_review' ? 'bg-amber-500' : 'bg-slate-400'
                      }`}></span>
                      {uni.verification_status === 'verified' ? 'Verified Source' :
                       uni.verification_status === 'needs_review' ? 'Needs Review' : 'Pending'}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
