import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiGlobe, FiMapPin, FiBook, FiSearch, FiExternalLink, FiFilter } from 'react-icons/fi';
import api from '../services/api';

const FLAGS = {
  'Ghana': '\u{1F1EC}\u{1F1ED}',
  'South Africa': '\u{1F1FF}\u{1F1E6}',
  'Nigeria': '\u{1F1F3}\u{1F1EC}',
  'Kenya': '\u{1F1F0}\u{1F1EA}',
  'Uganda': '\u{1F1FA}\u{1F1EC}',
  'Ethiopia': '\u{1F1EA}\u{1F1F9}',
  'Tanzania': '\u{1F1F9}\u{1F1FF}',
  'United Kingdom': '\u{1F1EC}\u{1F1E7}',
  'Germany': '\u{1F1E9}\u{1F1EA}',
  'Netherlands': '\u{1F1F3}\u{1F1F1}',
  'France': '\u{1F1EB}\u{1F1F7}',
  'Morocco': '\u{1F1F2}\u{1F1E6}',
  'Egypt': '\u{1F1EA}\u{1F1EC}',
  'Rwanda': '\u{1F1F7}\u{1F1FC}',
};

export default function InternationalSchools() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  useEffect(() => { fetchUniversities(); }, []);

  const fetchUniversities = async () => {
    try {
      const res = await api.get('/api/v1/universities/');
      const intl = res.data.filter(u => u.country !== 'Ghana');
      setUniversities(intl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const countries = ['All', ...new Set(universities.map(u => u.country).filter(Boolean))];
  const regionMap = {
    'Africa': ['South Africa', 'Nigeria', 'Kenya', 'Uganda', 'Ethiopia', 'Tanzania', 'Morocco', 'Egypt', 'Rwanda'],
    'Europe': ['United Kingdom', 'Germany', 'Netherlands', 'France'],
  };
  const regions = ['All', ...Object.keys(regionMap)];

  const filtered = universities.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || (u.city && u.city.toLowerCase().includes(search.toLowerCase()));
    const matchCountry = selectedCountry === 'All' || u.country === selectedCountry;
    let matchRegion = true;
    if (selectedRegion !== 'All') {
      matchRegion = regionMap[selectedRegion]?.includes(u.country);
    }
    return matchSearch && matchCountry && matchRegion;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link to="/explore" className="hover:text-primary-600">Explore</Link>
            <span>/</span>
            <span>International Schools</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <FiGlobe className="text-purple-600" />
            International Universities
          </h1>
          <p className="mt-2 text-slate-600">Explore universities across Africa and Europe</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search universities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          <select
            value={selectedRegion}
            onChange={e => { setSelectedRegion(e.target.value); setSelectedCountry('All'); }}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
          >
            {regions.map(r => <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>)}
          </select>
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
          >
            {countries.map(c => <option key={c} value={c}>{c === 'All' ? 'All Countries' : `${FLAGS[c] || ''} ${c}`}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-white rounded-2xl animate-pulse border border-slate-100"></div>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FiGlobe className="mx-auto text-5xl text-slate-300 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No universities found</h2>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(uni => (
              <Link
                key={uni.id}
                to={`/explore/universities/${uni.id}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-primary-200 transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition">{uni.name}</h3>
                    <p className="text-sm text-slate-500">{uni.short_name}</p>
                  </div>
                  <span className="text-2xl">{FLAGS[uni.country] || '\u{1F30D}'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <FiMapPin className="w-4 h-4" />
                  {uni.city}, {uni.country}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <FiBook className="w-4 h-4" />
                  {uni.programme_count || 0} programmes
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${
                    uni.institution_type === 'public' ? 'bg-blue-100 text-blue-700' :
                    uni.institution_type === 'private' ? 'bg-purple-100 text-purple-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {uni.institution_type}
                  </span>
                  {uni.verification_status === 'verified' && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700">Verified</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
