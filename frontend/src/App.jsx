import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackButton from './components/layout/BackButton';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import Explore from './pages/Explore';
import UniversityList from './pages/UniversityList';
import UniversityProfile from './pages/UniversityProfile';
import ProgrammeSearch from './pages/ProgrammeSearch';
import ProgrammeDetail from './pages/ProgrammeDetail';
import EligibilityChecker from './pages/EligibilityChecker';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import InternationalSchools from './pages/InternationalSchools';
import Guide from './pages/Guide';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <BackButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/universities" element={<UniversityList />} />
          <Route path="/explore/universities/:id" element={<UniversityProfile />} />
          <Route path="/explore/programmes" element={<ProgrammeSearch />} />
          <Route path="/explore/programmes/:id" element={<ProgrammeDetail />} />
          <Route path="/explore/international" element={<InternationalSchools />} />
          <Route path="/eligibility" element={<ProtectedRoute><EligibilityChecker /></ProtectedRoute>} />
          <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
