import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get('/applications/');
      setApplications(res.data.results || res.data);
    } catch (err) {
      console.error('Failed to fetch applications', err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto font-body-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'Montserrat' }}>My Dashboard</h1>
        <p className="text-on-surface-variant text-lg">Welcome back! Track your loan applications and active services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Quick Actions / Stats */}
        <div className="bg-surface-container-low border border-surface-container-high rounded-xl p-6 shadow-sm">
          <span className="material-symbols-outlined text-primary text-3xl mb-3">account_balance_wallet</span>
          <h3 className="text-lg font-bold text-on-surface mb-1">Active Loans</h3>
          <p className="text-3xl font-bold text-primary mt-2">0</p>
          <p className="text-sm text-on-surface-variant mt-2">No active loans requiring EMI.</p>
        </div>
        
        <div className="bg-surface-container-low border border-surface-container-high rounded-xl p-6 shadow-sm">
          <span className="material-symbols-outlined text-secondary text-3xl mb-3">assignment</span>
          <h3 className="text-lg font-bold text-on-surface mb-1">Pending Applications</h3>
          <p className="text-3xl font-bold text-secondary mt-2">{applications.filter(a => ['PROCESSING', 'VERIFICATION'].includes(a.status)).length}</p>
          <p className="text-sm text-on-surface-variant mt-2">Currently under review.</p>
        </div>

        <div className="bg-primary border border-primary rounded-xl p-6 shadow-sm flex flex-col justify-center items-start text-on-primary">
          <h3 className="text-lg font-bold mb-2">Need Funds?</h3>
          <p className="text-sm text-primary-fixed-dim mb-4">Apply for a new Personal, Business, or Home loan in minutes.</p>
          <button 
            onClick={() => navigate('/customer/apply')}
            className="bg-on-primary text-primary font-semibold py-2 px-4 rounded-lg w-full flex justify-center items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
            Apply Now
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-on-surface mb-4">Application History</h2>
        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <div className="bg-surface border border-outline-variant rounded-xl p-8 text-center shadow-sm">
            <span className="material-symbols-outlined text-outline text-4xl mb-2">inbox</span>
            <p className="text-on-surface-variant">You have no active applications.</p>
          </div>
        ) : (
          <div className="bg-surface rounded-xl border border-surface-container-high shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant text-xs font-semibold uppercase tracking-wider border-b border-surface-container-high">
                    <th className="py-3 px-4">Application ID</th>
                    <th className="py-3 px-4">Loan Type</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Tenure</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Lending Partner</th>
                    <th className="py-3 px-4">Submitted Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high text-sm">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="py-4 px-4 font-mono font-medium">{app.application_id || `#APP-PENDING`}</td>
                      <td className="py-4 px-4">{app.loan_type}</td>
                      <td className="py-4 px-4 font-medium">₹{parseFloat(app.requested_amount).toLocaleString()}</td>
                      <td className="py-4 px-4">{app.tenure_months} Months</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border
                          ${app.status === 'APPROVED' || app.status === 'SANCTIONED' || app.status === 'DISBURSED' ? 'bg-secondary-container text-on-secondary-container border-secondary/20' : ''}
                          ${app.status === 'REJECTED' ? 'bg-error-container text-on-error-container border-error/20' : ''}
                          ${app.status === 'PROCESSING' || app.status === 'VERIFICATION' ? 'bg-surface-variant text-on-surface-variant border-outline-variant/30' : ''}
                        `}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-on-surface-variant">
                        {app.lending_partner_detail?.name || '—'}
                      </td>
                      <td className="py-4 px-4 text-on-surface-variant">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
