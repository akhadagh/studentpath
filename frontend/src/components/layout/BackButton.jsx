import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const HIDE_BACK_ON = ['/', '/login', '/register', '/guide', '/about', '/contact'];

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (HIDE_BACK_ON.includes(location.pathname)) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition group"
      >
        <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back
      </button>
    </div>
  );
}
