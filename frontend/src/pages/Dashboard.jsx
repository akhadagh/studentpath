import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FiAward, FiBookOpen, FiTarget, FiClock, FiArrowRight } from 'react-icons/fi';

export default function Dashboard() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await api.get('/api/v1/results/my-results');
      setResults(res.data);
    } catch (err) {
      console.error('Failed to load results', err);
    } finally {
      setLoading(false);
    }
  };

  const latestResult = results[0];
  const topMatch = latestResult?.top_matches?.[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.full_name?.split(' ')[0]}</h1>
          <p className="mt-2 text-slate-600">Your personalised education dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <FiTarget className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Assessments</p>
                <p className="text-2xl font-bold text-slate-900">{results.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <FiAward className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Top Match</p>
                <p className="text-lg font-bold text-slate-900">{topMatch?.cluster_name || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <FiBookOpen className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Programmes</p>
                <p className="text-2xl font-bold text-slate-900">{latestResult?.programme_recommendations?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => <div key={i} className="h-32 bg-white rounded-xl animate-pulse"></div>)}
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <FiTarget className="mx-auto text-5xl text-slate-300 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Ready to discover your path?</h2>
            <p className="text-slate-500 mb-6">Take the assessment to find your top career matches and recommended programmes</p>
            <Link to="/assessment" className="px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 inline-flex items-center gap-2 transition">
              Start Assessment <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {topMatch && (
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
                <h3 className="text-sm font-semibold text-primary-200 mb-2">YOUR TOP MATCH</h3>
                <h2 className="text-2xl font-bold mb-1">{topMatch.cluster_name || topMatch.cluster_key}</h2>
                <p className="text-3xl font-bold text-white mb-2">{topMatch.match_percentage}%</p>
                {topMatch.explanation && <p className="text-primary-100 text-sm">{topMatch.explanation}</p>}
              </div>
            )}

            {latestResult?.top_matches && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Career Matches</h3>
                <div className="space-y-3">
                  {latestResult.top_matches.slice(0, 3).map((match, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-primary-600">#{i + 1}</span>
                        <div>
                          <h4 className="font-medium text-slate-900">{match.cluster_name || match.cluster_key}</h4>
                          <span className="text-sm text-slate-500">{match.match_percentage}% match</span>
                        </div>
                      </div>
                      {match.careers && match.careers[0] && (
                        <span className="text-sm text-slate-500 hidden sm:block">{match.careers[0].name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {latestResult?.programme_recommendations && latestResult.programme_recommendations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Recommended Programmes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {latestResult.programme_recommendations.slice(0, 4).map((rec, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
                      <h4 className="font-medium text-slate-900">{rec.programme_name}</h4>
                      <p className="text-sm text-primary-600">{rec.field}</p>
                      {rec.duration_years && <p className="text-xs text-slate-500 mt-1">{rec.duration_years} years</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Link to="/results" className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                View Full Results
              </Link>
              <Link to="/assessment" className="px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition">
                Retake Assessment
              </Link>
              <Link to="/explore/universities" className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                Explore Universities
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
