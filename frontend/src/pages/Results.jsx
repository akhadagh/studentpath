import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiBookOpen, FiArrowRight, FiDownload, FiMapPin, FiClock, FiExternalLink } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#10b981', '#6366f1', '#f97316'];

export default function Results() {
  const { user } = useAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestResult();
  }, []);

  const fetchLatestResult = async () => {
    try {
      const res = await api.get('/api/v1/results/my-results');
      if (res.data && res.data.length > 0) {
        setResult(res.data[0]);
      }
    } catch (err) {
      console.error('Failed to load results', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <FiAward className="mx-auto text-5xl text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">No Results Yet</h2>
          <p className="text-slate-500 mb-6">Take the assessment to see your personalised career and education path</p>
          <Link to="/assessment" className="px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition">
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  const clusterScores = result.cluster_scores || result.career_paths || {};
  const chartData = Object.entries(clusterScores)
    .map(([key, value]) => ({ name: key.replace(/_/g, ' '), score: value }))
    .sort((a, b) => b.score - a.score);

  const topMatch = result.top_matches?.[0];
  const pieData = result.top_matches?.slice(0, 3).map((m, i) => ({
    name: m.cluster_name || m.cluster_key,
    value: m.match_percentage,
    fill: COLORS[i],
  })) || [];

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <h1 className="text-3xl font-bold text-slate-900">My StudentPath Results</h1>
          <button onClick={handlePrint} className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-2 transition">
            <FiDownload /> Download Report
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8 print:border-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <FiAward className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Assessment Complete</h2>
              <p className="text-sm text-slate-500">
                Completed {result.completed_at ? new Date(result.completed_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
          <p className="text-slate-600">Based on your answers, here are your personalised career matches and education recommendations.</p>
        </div>

        {topMatch && (
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-white mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">TOP MATCH</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{topMatch.cluster_name || topMatch.cluster_key}</h3>
            <div className="text-4xl font-bold mb-3">{topMatch.match_percentage}%</div>
            {topMatch.explanation && <p className="text-primary-100 leading-relaxed">{topMatch.explanation}</p>}

            {topMatch.careers && topMatch.careers.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-primary-200 mb-3">Related Careers</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {topMatch.careers.map((c, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4">
                      <h5 className="font-medium">{c.name}</h5>
                      {c.salary_range && <p className="text-sm text-primary-200 mt-1">{c.salary_range}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Career Cluster Scores</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {pieData.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Matches Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {pieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.fill }}></span>
                    <span className="text-slate-600">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {result.top_matches && result.top_matches.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Career Matches</h3>
            <div className="space-y-4">
              {result.top_matches.map((match, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary-600">#{i + 1}</span>
                      <div>
                        <h4 className="font-semibold text-slate-900">{match.cluster_name || match.cluster_key}</h4>
                        <span className="text-sm text-primary-600 font-medium">{match.match_percentage}% match</span>
                      </div>
                    </div>
                  </div>
                  {match.explanation && <p className="text-sm text-slate-600 mb-3">{match.explanation}</p>}
                  {match.careers && match.careers.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                      {match.careers.map((c, j) => (
                        <div key={j} className="p-3 bg-slate-50 rounded-lg">
                          <h5 className="font-medium text-sm text-slate-800">{c.name}</h5>
                          {c.salary_range && <p className="text-xs text-slate-500 mt-1">{c.salary_range}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {result.programme_recommendations && result.programme_recommendations.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recommended Programmes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.programme_recommendations.map((rec, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                  <h4 className="font-semibold text-slate-900">{rec.programme_name}</h4>
                  <p className="text-sm text-primary-600 mt-1">{rec.field}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                    {rec.duration_years && <span className="flex items-center gap-1"><FiClock className="text-xs" />{rec.duration_years} years</span>}
                    {rec.degree_type && <span>{rec.degree_type}</span>}
                  </div>
                  {rec.relevance_score && (
                    <div className="mt-3">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${rec.relevance_score}%` }}></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{rec.relevance_score}% relevance</p>
                    </div>
                  )}
                  {rec.university_id && (
                    <Link to={`/explore/programmes/${rec.programme_id || ''}`}
                      className="mt-3 inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
                      View details <FiArrowRight className="text-xs" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> StudentPath provides education guidance based on available information and does not guarantee admission. Career matches and programme recommendations are based on your assessment responses and available data. Always verify information with official university sources.
          </p>
        </div>

        <div className="flex gap-4 print:hidden">
          <Link to="/dashboard" className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition">
            View Dashboard
          </Link>
          <Link to="/explore/universities" className="px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition flex items-center gap-2">
            Explore Universities <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
