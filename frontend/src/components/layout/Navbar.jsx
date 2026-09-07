import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-slate-900">StudentPath</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/explore" className="text-slate-600 hover:text-primary-600 font-medium transition">
              Explore
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-primary-600 font-medium transition">
                  Dashboard
                </Link>
                <Link to="/assessment" className="text-slate-600 hover:text-primary-600 font-medium transition">
                  Assessment
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-500">Hi, {user.full_name.split(' ')[0]}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-slate-500 hover:text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-primary-600 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-600">
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link to="/explore" className="block py-2 text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>
              Explore
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block py-2 text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/assessment" className="block py-2 text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>
                  Assessment
                </Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false) }} className="block py-2 text-red-600 font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-slate-600 font-medium" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block py-2 bg-primary-600 text-white text-center rounded-lg font-medium" onClick={() => setMobileOpen(false)}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
