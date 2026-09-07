import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { FiAward, FiBookOpen, FiArrowRight, FiDownload } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function Results() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get('/api/v1/results/my-results')
        if (res.data.length > 0) {
          setResults(res.data[0])
        }
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

  if (!results) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">No Results Yet</h2>
        <p className="text-slate-500">Complete the assessment to see your results</p>
        <button
          onClick={() => navigate('/assessment')}
          className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition"
        >
          Take Assessment
        </button>
      </div>
    )
  }

  const careerPaths = Object.entries(results.career_paths || {}).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
  })).sort((a, b) => b.score - a.score)

  const pieData = results.top_matches.map(m => ({
    name: m.category,
    value: m.match_percentage,
  }))

  return (
    <div className="min-h-[80vh] bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mx-auto mb-4">
            <FiAward className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Your Career Matches</h1>
          <p className="text-slate-500 mt-2">Based on your assessment, here are your top career directions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {results.top_matches.map((match, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-6 border-2 card-hover ${
                i === 0 ? 'border-primary-500 shadow-lg' : 'border-slate-100'
              }`}
            >
              {i === 0 && (
                <div className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full inline-block mb-3">
                  TOP MATCH
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900">{match.category}</h3>
                <span className={`text-2xl font-bold ${
                  i === 0 ? 'text-primary-600' : i === 1 ? 'text-accent-600' : 'text-amber-600'
                }`}>
                  {match.match_percentage}%
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-4">{match.description}</p>
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Top Career: {match.career}</p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-1">
                  {match.required_skills.map((skill, j) => (
                    <span key={j} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm border-t pt-3">
                <span className="text-slate-500">{match.salary_range}</span>
                <span className="text-accent-600 font-medium">{match.growth_outlook}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Career Category Scores</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={careerPaths}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Match Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {pieData.map((entry, i) => (
                <div key={i} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }}></div>
                  <span className="text-slate-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {results.programme_recommendations.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-slate-100 mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FiBookOpen className="text-primary-600" />
              Recommended Programmes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.programme_recommendations.map((prog, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900">{prog.programme}</h4>
                  <p className="text-sm text-primary-600">{prog.field}</p>
                  <p className="text-xs text-slate-500 mt-1">{prog.description}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{prog.duration_years} years</span>
                    <span className="font-semibold text-primary-600">{prog.relevance_score}% match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition"
          >
            View Dashboard <FiArrowRight />
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition"
          >
            <FiDownload /> Download Report
          </button>
        </div>
      </div>
    </div>
  )
}
