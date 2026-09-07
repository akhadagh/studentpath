import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white">StudentPath</span>
            </div>
            <p className="text-sm text-slate-400">
              Your personalised guide from career to programme to university to future.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/explore" className="hover:text-white transition">Explore Careers</Link></li>
              <li><Link to="/assessment" className="hover:text-white transition">Take Assessment</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>support@studentpath.app</li>
              <li>Accra, Ghana</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} StudentPath. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
