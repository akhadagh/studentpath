import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

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
            <p className="text-sm text-slate-400 leading-relaxed">
              Your personalised guide from career to programme to university to future. Free for every Ghanaian student.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/explore/universities" className="hover:text-white transition">Universities</Link></li>
              <li><Link to="/explore/programmes" className="hover:text-white transition">Programmes</Link></li>
              <li><Link to="/assessment" className="hover:text-white transition">Take Assessment</Link></li>
              <li><Link to="/eligibility" className="hover:text-white transition">Eligibility Checker</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/guide" className="hover:text-white transition">StudentPath Guide</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FiMail className="w-4 h-4 mt-0.5 text-primary-400" />
                <span>boamahjoshua60@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <FiPhone className="w-4 h-4 mt-0.5 text-primary-400" />
                <span>+233 558 727 542</span>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="w-4 h-4 mt-0.5 text-primary-400" />
                <span>Ghana, West Africa</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} StudentPath. All rights reserved.</p>
          <p>Built with ❤ for Ghanaian students</p>
        </div>
      </div>
    </footer>
  )
}
