import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { FiAward, FiBookOpen, FiTarget, FiClock } from 'react-icons/fi'

export default function Dashboard() {
  const { user } = useAuth()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get('/api/v1/results/my-results')
        setResults(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const latestResult = results[0] || null

  return (
    <div className="min-h-[80vh] bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {user?.full_name?.split(' ')[0]}!
          </h1>
          <p className="text-slate-500 mt-1">Your career guidance dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                <FiTarget className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-500">Assessments Taken</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">{results.length}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center">
                <FiAward className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-500">Top Match</span>
            </div>
            <div className="text-lg font-bold text-slate-900">
              {latestResult?.top_matches?.[0]?.category || 'N/A'}
            </div>
            {latestResult?.top_matches?.[0] && (
              <span className="text-sm text-primary-600 font-semibold">
                {latestResult.top_matches[0].match_percentage}% match
              </span>
            )}
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <FiBookOpen className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-500">Programme Matches</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {latestResult?.programme_recommendations?.length || 0}
            </div>
          </div>
        </div>

        {!latestResult ? (
          <div className="bg-white rounded-2xl p-12 border border-slate-100 text-center">
            <FiTarget className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">No Assessment Yet</h2>
            <p className="text-slate-500 mb-6">Take the career assessment to discover your personalised path</p>
            <button
              onClick={() => navigate('/assessment')}
              className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
            >
              Start Assessment
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Your Top Career Matches</h2>
              <div className="space-y-4">
                {latestResult.top_matches.map((match, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                      i === 0 ? 'bg-primary-100 text-primary-600' :
                      i === 1 ? 'bg-accent-100 text-accent-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900">{match.category}</h3>
                      <p className="text-sm text-slate-500">{match.career}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-primary-600">{match.match_percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Recommended Programmes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {latestResult.programme_recommendations.slice(0, 4).map((prog, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-slate-900">{prog.programme}</h4>
                    <p className="text-sm text-primary-600">{prog.field}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{prog.duration_years} years</span>
                      <span className="font-semibold text-primary-600">{prog.relevance_score}% match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/assessment')}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition"
              >
                Retake Assessment
              </button>
              <Link
                to="/explore"
                className="border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition"
              >
                Explore Careers
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
