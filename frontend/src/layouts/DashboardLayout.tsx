import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCredentials } from '../store/authSlice';
import type { RootState } from '../store';
import api from '../services/api';

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBtF7nUe17Qy2GuUPxPnlVwv0FQ4Tbm_7IzJtBpg6yHotkZpkZMSTnlwo_esabPMs6dgQ5GjrsY8vfwGEx-Cer8Q5KT8pYsT6gDYjgvbiDcF9IelJdKHGWZsRv1WIJ-nXyQsk1lueiFDTg1LWCObEPrPmAkvEkkcbju0GgZTa4rXMk7Uf67zYBA7Vf0erNpZupBEUVdyI_zSZDnhla8xNQzaenq6bS8QhTLeHi9II19fPTdKoQUuY1QKQ";
const AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDDpcUJr1aeqtcEQEpT8vWeKzT_OKA1Brz3W-vfkqJ2o3Fku9GhvnqEowkHND_6BBk9kpRxvhV8cgz_2GsH6tcJOgn_hKs_vjanYTTv2BJ2Q6vtl6RaDjIBjozriWwoRMcwlPRNEnNokDm6KrcTfLkVCP2GPDino6hbNUm378Ctbxah31_pjTLTlKhJLxtSbe4j24DJpqjPxW5zXwnmT7vZj0PEHKFGesNwmivNThsLJmgY7s_E1CK7LQ";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!user && token) {
      api.get('/auth/me/')
        .then((res) => dispatch(setCredentials({ token, user: res.data })))
        .catch(() => dispatch(logout()));
    }
  }, [user, token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isSupportOrAdmin = user?.role === 'SUPPORT' || user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN' || user?.is_superuser;
  const isSuperAdmin = user?.role === 'SUPER_ADMIN' || user?.is_superuser;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Leads', path: '/dashboard/leads', icon: 'person_search' },
    { name: 'Applications', path: '/dashboard/applications', icon: 'assignment' },
    { name: 'Documents', path: '/dashboard/documents', icon: 'folder_open' },
    { name: 'Agents', path: '/dashboard/agents', icon: 'groups' },
    ...(isSupportOrAdmin ? [{ name: 'Support', path: '/dashboard/support-tickets', icon: 'support_agent' }] : []),
    ...(isSuperAdmin ? [{ name: 'Team Management', path: '/dashboard/team', icon: 'manage_accounts' }] : []),
    { name: 'Settings', path: '/dashboard/settings', icon: 'settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background font-body-md antialiased">
      {/* SideNavBar */}
      <aside className="w-64 h-screen fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant z-20 flex flex-col py-6">
        {/* Brand / Header */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <img alt="Instacapital Logo" className="w-10 h-10 rounded-full" src={LOGO_URL} />
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-primary tracking-tight">Instacapital</h1>
            <p className="font-label-xs text-label-xs text-on-surface-variant">CRM Admin Portal</p>
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 mb-6">
          <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
            New Application
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl scale-95 transition-all duration-150 ${
                      isActive
                        ? 'bg-secondary-container text-on-secondary-container font-bold'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:scale-[0.98]'
                    }`}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="font-label-sm text-label-sm">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Links */}
        <div className="mt-auto pt-4 border-t border-outline-variant mx-4 px-2">
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-xl scale-95 hover:scale-[0.98] duration-150">
                <span className="material-symbols-outlined">help</span>
                <span className="font-label-sm text-label-sm">Help Center</span>
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-xl scale-95 hover:scale-[0.98] duration-150">
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-sm text-label-sm">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col h-screen">
        {/* TopNavBar */}
        <header className="h-16 fixed top-0 right-0 left-64 z-10 bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center px-6">
          {/* Left: Search */}
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: '20px' }}>search</span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-label-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-on-surface"
                placeholder="Search leads, applications..."
                type="text"
              />
            </div>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-all duration-200 relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-all duration-200">
                <span className="material-symbols-outlined">history</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-all duration-200">
                <span className="material-symbols-outlined">help</span>
              </button>
            </div>
            <div className="h-8 w-px bg-outline-variant mx-2"></div>
            <button className="flex items-center gap-3 hover:bg-surface-container-high p-1 pr-3 rounded-full transition-colors">
              <img alt="Administrator Avatar" className="w-8 h-8 rounded-full border border-outline-variant object-cover" src={AVATAR_URL} />
              <span className="font-label-sm text-label-sm font-semibold text-primary">Admin Profile</span>
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '18px' }}>expand_more</span>
            </button>
          </div>
        </header>

        {/* Page Content Canvas */}
        <main className="flex-1 mt-16 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
