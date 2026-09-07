import { Link } from 'react-router-dom'
import { FiArrowRight, FiTarget, FiBookOpen, FiAward, FiUsers, FiBarChart2 } from 'react-icons/fi'

export default function Home() {
  const steps = [
    { icon: <FiTarget className="w-6 h-6" />, title: 'Take Assessment', desc: 'Answer questions about your interests, strengths, and goals' },
    { icon: <FiBarChart2 className="w-6 h-6" />, title: 'Get Matched', desc: 'Our engine scores and matches you with career directions' },
    { icon: <FiBookOpen className="w-6 h-6" />, title: 'Explore Programmes', desc: 'See what to study and where to achieve your career goals' },
    { icon: <FiAward className="w-6 h-6" />, title: 'Find Your Path', desc: 'Get a personalised report with your top career matches' },
  ]

  const stats = [
    { value: '7', label: 'Career Categories' },
    { value: '20+', label: 'Career Paths' },
    { value: '18', label: 'University Programmes' },
    { value: '3', label: 'Top Matches' },
  ]

  return (
    <div>
      <section className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Find Your Future Path
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              StudentPath helps you discover the right career, programme, and university
              — personalised to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link
                to="/register"
                className="bg-white text-primary-700 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                Start Your Journey <FiArrowRight />
              </Link>
              <Link
                to="/explore"
                className="border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-white/10 transition"
              >
                Explore Careers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-slate-50">
                <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative card-hover bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-primary-600 mb-1">Step {i + 1}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Who Is StudentPath For?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { emoji: '🎓', title: 'SHS Students', desc: 'Choosing your programme and university' },
              { emoji: '📚', title: 'University Students', desc: 'Finding your career direction' },
              { emoji: '🌍', title: 'International Students', desc: 'Navigating study abroad options' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-10 bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-primary-700 transition"
          >
            Get Started Free <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}
