import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBBP3sONapLqJJ3AQ7d-u8EL1ydLDv84_4OQGtvrpIEqOZgAH6BDjQrA8KLVPMR2nbpAYlv98kNMUfSex8EYxkO6k4EWRHQGrIs6fEodvMfswiQ9TecxJgEiAN0p48EWlEfucwajxym_DkZWS0B8XEU9Lx4yvv9l3eBlQXJz_vTeDOdYCkjih8Esh60Z8u0zE07bENSZ5mQgDFQ0waG1qOsezJ389HWG09xgjRM2nR1oDrPaAbAtQX3Ig";

export default function CustomerSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    mobile: '',
    full_name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 1. Register Customer
      await api.post('/auth/customer-register/', formData);
      
      // 2. Auto-login after successful registration
      const res = await api.post('/auth/login/', { username: formData.username, password: formData.password });
      const token = res.data.access;
      localStorage.setItem('token', token);
      
      // 3. Get User Profile
      const meRes = await api.get('/auth/me/');
      dispatch(setCredentials({ token, user: meRes.data }));
      
      navigate('/customer/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to sign up. Please try again.');
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
          <div className="h-2 bg-gradient-to-r from-primary to-secondary w-full"></div>
          <div className="p-8 sm:p-10">
            {/* Brand Header */}
            <div className="flex flex-col items-center mb-8">
              <img alt="Instacapital Logo" className="w-16 h-16 object-contain mb-4 rounded-full" src={LOGO_URL} />
              <h1 className="font-headline-md text-2xl font-bold text-primary text-center">Create an Account</h1>
              <p className="font-body-md text-sm text-on-surface-variant text-center mt-2">Join Instacapital and explore our financial services.</p>
            </div>

            {error && (
              <div className="bg-error-container text-on-error-container text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Full Name</label>
                <input
                  className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors h-[48px]"
                  name="full_name" placeholder="John Doe" type="text"
                  value={formData.full_name} onChange={handleChange} required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Mobile</label>
                  <input
                    className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors h-[48px]"
                    name="mobile" placeholder="1234567890" type="text"
                    value={formData.mobile} onChange={handleChange} required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Email</label>
                  <input
                    className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors h-[48px]"
                    name="email" placeholder="john@example.com" type="email"
                    value={formData.email} onChange={handleChange} required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Username</label>
                <input
                  className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors h-[48px]"
                  name="username" placeholder="johndoe123" type="text"
                  value={formData.username} onChange={handleChange} required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Password</label>
                <input
                  className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors h-[48px]"
                  name="password" placeholder="••••••••" type="password"
                  value={formData.password} onChange={handleChange} required
                />
              </div>
              <button
                className="w-full bg-primary text-on-primary font-medium py-3 mt-4 rounded-lg hover:bg-primary-container transition-colors duration-200 h-[48px] flex justify-center items-center gap-2 shadow-sm"
                type="submit" disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-body-md text-sm text-on-surface-variant">
                Already have an account?{' '}
                <a className="font-medium text-primary hover:text-primary-container transition-colors" href="/customer/login">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
