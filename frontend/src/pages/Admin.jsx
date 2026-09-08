import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { FiDatabase, FiBook, FiCheckCircle, FiLink, FiPlus, FiShield } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Admin() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    if (user?.role === 'admin') fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const res = await api.get('/api/v1/admin/stats');
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <FiShield className="mx-auto text-5xl text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Admin Access Required</h2>
          <p className="text-slate-500">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="mt-2 text-slate-600">Manage university data and verification</p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FiDatabase className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Universities</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.universities}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <FiBook className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Programmes</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.programmes}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <FiCheckCircle className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Requirements</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.requirements}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FiLink className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Sources</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.sources}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Data Management</h2>
          <p className="text-slate-600 mb-4">
            The admin system allows managing university data, programmes, requirements, and sources.
            Data is managed through the API and can also be updated via seed scripts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-medium text-slate-900 mb-2">Quick Actions</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>Run seed script to populate university data</li>
                <li>Use API endpoints to add/modify records</li>
                <li>Mark sources as verified after review</li>
                <li>Add new programmes with requirements</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-medium text-slate-900 mb-2">API Endpoints</h3>
              <ul className="text-sm text-slate-600 space-y-1 font-mono">
                <li>GET /api/v1/admin/stats</li>
                <li>GET /api/v1/admin/universities</li>
                <li>POST /api/v1/admin/universities</li>
                <li>POST /api/v1/admin/programmes</li>
                <li>POST /api/v1/admin/requirements</li>
                <li>POST /api/v1/admin/sources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
