import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import type { RootState } from '../store';

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBBP3sONapLqJJ3AQ7d-u8EL1ydLDv84_4OQGtvrpIEqOZgAH6BDjQrA8KLVPMR2nbpAYlv98kNMUfSex8EYxkO6k4EWRHQGrIs6fEodvMfswiQ9TecxJgEiAN0p48EWlEfucwajxym_DkZWS0B8XEU9Lx4yvv9l3eBlQXJz_vTeDOdYCkjih8Esh60Z8u0zE07bENSZ5mQgDFQ0waG1qOsezJ389HWG09xgjRM2nR1oDrPaAbAtQX3Ig";

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/customer/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/customer/dashboard', icon: 'dashboard' },
    { name: 'Apply Now', path: '/customer/apply', icon: 'add_circle' },
    { name: 'Support', path: '/customer/support', icon: 'help' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background font-body-md antialiased">
      {/* SideNavBar */}
      <aside className="w-64 h-screen fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant z-20 flex flex-col py-6">
        {/* Brand / Header */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <img alt="Instacapital Logo" className="w-10 h-10 rounded-full" src={LOGO_URL} />
          <div>
            <h1 className="text-xl font-bold text-primary tracking-tight" style={{ fontFamily: 'Montserrat' }}>Instacapital</h1>
            <p className="text-xs text-on-surface-variant">Customer Portal</p>
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 mb-6">
          <button 
            onClick={() => navigate('/customer/apply')}
            className="w-full bg-primary text-on-primary py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Application
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
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
                    <span className="text-sm font-medium">{item.name}</span>
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
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-xl scale-95 hover:scale-[0.98] duration-150">
                <span className="material-symbols-outlined">logout</span>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col h-screen">
        {/* TopNavBar */}
        <header className="h-16 fixed top-0 right-0 left-64 z-10 bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center px-6">
          <div className="flex items-center flex-1 max-w-md">
            {/* Topbar left area if needed */}
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-all duration-200">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-8 w-px bg-outline-variant mx-2"></div>
            <button className="flex items-center gap-3 hover:bg-surface-container-high p-1 pr-3 rounded-full transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold">
                {user?.first_name ? user.first_name[0] : 'C'}
              </div>
              <span className="text-sm font-semibold text-primary">{user?.username || 'Customer'}</span>
            </button>
          </div>
        </header>

        {/* Page Content Canvas */}
        <main className="flex-1 mt-16 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
