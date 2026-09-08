import { Link } from 'react-router-dom';
import { FiBook, FiSearch, FiCheck, FiGrid } from 'react-icons/fi';

export default function Explore() {
  const sections = [
    {
      icon: FiBook,
      title: 'Explore Universities',
      description: 'Browse verified information about universities across Ghana',
      link: '/explore/universities',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FiSearch,
      title: 'Search Programmes',
      description: 'Find programmes offered at Ghanaian universities',
      link: '/explore/programmes',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: FiCheck,
      title: 'Eligibility Checker',
      description: 'Check if your grades meet programme requirements',
      link: '/eligibility',
      color: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Explore Ghana Education</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover verified information about universities, programmes, and admission requirements across Ghana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sections.map((s) => (
            <Link
              key={s.link}
              to={s.link}
              className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg hover:border-primary-200 transition group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5`}>
                <s.icon className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 group-hover:text-primary-600 transition mb-2">{s.title}</h2>
              <p className="text-slate-600">{s.description}</p>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-4">
            <FiGrid className="text-primary-500 text-xl" />
            <h2 className="text-xl font-semibold text-slate-900">About StudentPath Explorer</h2>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600">
            <p>
              StudentPath provides verified education information to help Ghanaian students make informed decisions about their academic future. All university and programme data is sourced from official admissions information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 not-prose">
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Verified Sources
                </div>
                <p className="text-sm text-slate-500">Data sourced from official university websites and admissions portals</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Regular Updates
                </div>
                <p className="text-sm text-slate-500">Information reviewed and updated as new admission cycles begin</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Student-First
                </div>
                <p className="text-sm text-slate-500">Built to help Ghanaian students make confident education decisions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
