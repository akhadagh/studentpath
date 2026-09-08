import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiChevronDown, FiBook, FiSearch, FiCheck } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-slate-900 text-lg hidden sm:block">StudentPath</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <div className="relative"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}>
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition">
                Explore <FiChevronDown className={`text-xs transition ${exploreOpen ? 'rotate-180' : ''}`} />
              </button>
              {exploreOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-xl border border-slate-200 shadow-lg py-2 mt-0.5">
                  <Link to="/explore/universities" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                    onClick={() => setExploreOpen(false)}>
                    <FiBook className="text-primary-500" /> Universities
                  </Link>
                  <Link to="/explore/programmes" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                    onClick={() => setExploreOpen(false)}>
                    <FiSearch className="text-primary-500" /> Programmes
                  </Link>
                  <Link to="/eligibility" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                    onClick={() => setExploreOpen(false)}>
                    <FiCheck className="text-primary-500" /> Eligibility Check
                  </Link>
                </div>
              )}
            </div>

            {user ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition">Dashboard</Link>
                <Link to="/assessment" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition">Assessment</Link>
                <div className="ml-2 flex items-center gap-3 pl-3 border-l border-slate-200">
                  <span className="text-sm text-slate-500">Hi, {user.full_name?.split(' ')[0]}</span>
                  <button onClick={handleLogout} className="px-3 py-1.5 text-sm text-slate-500 hover:text-red-600 transition">Logout</button>
                </div>
              </>
            ) : (
              <div className="ml-2 flex items-center gap-2 pl-3 border-l border-slate-200">
                <Link to="/login" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition">Get Started</Link>
              </div>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-600">
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-1">
            <Link to="/explore/universities" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Universities</Link>
            <Link to="/explore/programmes" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Programmes</Link>
            <Link to="/eligibility" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Eligibility Check</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Dashboard</Link>
                <Link to="/assessment" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Assessment</Link>
                <div className="border-t border-slate-200 mt-2 pt-2 px-4">
                  <span className="text-sm text-slate-500 block mb-2">Hi, {user.full_name?.split(' ')[0]}</span>
                  <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600">Logout</button>
                </div>
              </>
            ) : (
              <div className="border-t border-slate-200 mt-2 pt-2 px-4 flex gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:text-primary-600">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600">Get Started</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
