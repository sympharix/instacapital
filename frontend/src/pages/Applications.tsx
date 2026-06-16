import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Applications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications/');
        setApplications(res.data.results || res.data);
      } catch (err) {
        console.error('Error fetching applications:', err);
      }
      setLoading(false);
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch(status?.toUpperCase()) {
      case 'DRAFT': return 'bg-surface-container-high text-on-surface-variant border border-outline-variant';
      case 'SUBMITTED': return 'bg-secondary-container text-on-secondary-container';
      case 'UNDER_REVIEW': return 'bg-[#FFF3E0] text-[#E65100]'; 
      case 'APPROVED': return 'bg-[#E8F5E9] text-[#1B5E20]'; 
      case 'REJECTED': return 'bg-error-container text-on-error-container';
      default: return 'bg-surface-container text-on-surface';
    }
  };

  const filteredApps = applications.filter(app =>
    (app.customer_detail?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     String(app.id).includes(searchTerm)) &&
    (statusFilter ? app.status === statusFilter : true)
  );

  return (
    <div className="max-w-[1200px] mx-auto font-body-md">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="font-display-lg md:text-3xl text-2xl font-bold text-on-surface mb-1" style={{ fontFamily: 'Montserrat' }}>Loan Applications</h2>
          <p className="font-body-md text-on-surface-variant">Review and manage loan applications.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-outline bg-surface text-on-surface font-label-sm text-sm rounded-lg hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
            Export
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary font-label-sm text-sm rounded-lg hover:bg-primary-container transition-colors shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            New Application
          </button>
        </div>
      </div>

      {/* Filters & Search Bar Section */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Search by customer name or ID..."
            type="text"
          />
        </div>
        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none min-w-[140px]">
            <select className="w-full appearance-none bg-surface border border-outline-variant rounded-lg pl-4 pr-10 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer">
              <option value="">All Loan Types</option>
              <option value="PERSONAL">Personal</option>
              <option value="BUSINESS">Business</option>
              <option value="HOME">Home</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
          <div className="relative flex-1 md:flex-none min-w-[140px]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-surface border border-outline-variant rounded-lg pl-4 pr-10 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Application ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Loan Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Tenure</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-on-surface-variant">
                    Loading applications...
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-on-surface-variant">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-on-surface">APP-{app.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary text-xs font-bold">
                          {app.customer_detail?.full_name?.[0] || 'U'}
                        </div>
                        <p className="text-sm text-on-surface font-medium">{app.customer_detail?.full_name || 'Unknown Customer'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-on-surface capitalize">{app.loan_type?.replace('_', ' ').toLowerCase() || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-on-surface">₹{app.requested_amount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-on-surface">{app.tenure_months} mo</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/dashboard/applications/${app.id}`)}
                        className="text-on-surface-variant hover:text-primary transition-colors p-1"
                        title="View application"
                      >
                        <span className="material-symbols-outlined text-xl">folder_open</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && filteredApps.length > 0 && (
          <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between">
            <p className="text-sm text-on-surface-variant">Showing 1 to {filteredApps.length} of {applications.length} applications</p>
            <div className="flex gap-1">
              <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded bg-primary text-on-primary text-sm flex items-center justify-center">1</button>
              <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
