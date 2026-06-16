import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../store/authSlice';
import api from '../services/api';

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBtF7nUe17Qy2GuUPxPnlVwv0FQ4Tbm_7IzJtBpg6yHotkZpkZMSTnlwo_esabPMs6dgQ5GjrsY8vfwGEx-Cer8Q5KT8pYsT6gDYjgvbiDcF9IelJdKHGWZsRv1WIJ-nXyQsk1lueiFDTg1LWCObEPrPmAkvEkkcbju0GgZTa4rXMk7Uf67zYBA7Vf0erNpZupBEUVdyI_zSZDnhla8xNQzaenq6bS8QhTLeHi9II19fPTdKoQUuY1QKQ";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return setError('Please enter both username and password.');

    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login/', { username, password });
      const token = res.data.access;
      localStorage.setItem('token', token);
      
      const meRes = await api.get('/auth/me/');
      dispatch(setCredentials({ token, user: meRes.data }));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
      localStorage.removeItem('token');
    }
    setLoading(false);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md text-body-md relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-container opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-secondary opacity-5 rounded-full blur-3xl"></div>
      </div>

      <main className="flex-grow flex items-center justify-center p-6 z-10">
        <div className="bg-surface-container-lowest border border-outline-variant shadow-sm rounded-xl w-full max-w-md overflow-hidden relative">
          {/* Top Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-primary to-secondary w-full"></div>
          <div className="p-8 sm:p-10">
            {/* Brand Header */}
            <div className="flex flex-col items-center mb-8">
              <img alt="Instacapital Logo" className="w-16 h-16 object-contain mb-4 rounded-full" src={LOGO_URL} />
              <h1 className="font-headline-md text-2xl font-bold text-primary text-center">Admin Portal</h1>
              <p className="font-body-md text-sm text-on-surface-variant text-center mt-2">Sign in to manage CRM operations.</p>
            </div>

            {error && (
              <div className="bg-error-container text-on-error-container text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block font-label-sm text-sm font-medium text-on-surface mb-2" htmlFor="username">Username</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">person</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors h-[48px]"
                    id="username" name="username" placeholder="admin" type="text"
                    value={username} onChange={(e) => setUsername(e.target.value)} required
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-label-sm text-sm font-medium text-on-surface" htmlFor="password">Password</label>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors h-[48px]"
                    id="password" name="password" placeholder="••••••••" type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} required
                  />
                </div>
              </div>
              <button
                className="w-full bg-primary text-on-primary font-label-sm font-medium py-3 rounded-lg hover:bg-primary-container transition-colors duration-200 h-[48px] flex justify-center items-center gap-2 shadow-[0_4px_12px_rgba(0,50,125,0.15)]"
                type="submit" disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
                {!loading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center space-x-4">
              <div className="h-px bg-outline-variant flex-grow"></div>
              <span className="font-label-xs text-xs text-on-surface-variant uppercase tracking-wider">or</span>
              <div className="h-px bg-outline-variant flex-grow"></div>
            </div>
            <div className="mt-8 text-center space-y-3">
              <button 
                onClick={() => navigate('/forgot-password')}
                className="font-label-sm text-sm text-primary hover:text-primary-container font-semibold transition-colors bg-transparent border-none cursor-pointer"
              >
                Forgot Password?
              </button>
              <p className="font-body-md text-sm text-on-surface-variant">
                Customer login?{' '}
                <a className="font-label-sm text-primary hover:text-primary-container font-semibold transition-colors" href="/customer/login">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
