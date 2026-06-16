import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import type { RootState } from '../store';

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async (leadId: number) => {
    if (!window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      return;
    }
    try {
      await api.delete(`/leads/${leadId}/`);
      setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
    setOpenMenuId(null);
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await api.get('/leads/');
        setLeads(res.data.results || res.data);
      } catch (err) {
        console.error('Error fetching leads:', err);
      }
      setLoading(false);
    };
    fetchLeads();
  }, []);

  const getStatusColor = (status: string) => {
    switch(status.toUpperCase()) {
      case 'NEW': return 'bg-secondary-container text-on-secondary-container';
      case 'CONTACTED': return 'bg-surface-container-high text-on-surface-variant border border-outline-variant';
      case 'IN_PROGRESS': return 'bg-[#FFF3E0] text-[#E65100]'; // Orange equivalent for in-progress
      case 'CLOSED_WON': return 'bg-[#E8F5E9] text-[#1B5E20]'; // Green equivalent
      case 'CLOSED_LOST': return 'bg-error-container text-on-error-container';
      default: return 'bg-surface-container text-on-surface';
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const filteredLeads = leads.filter(lead => 
    (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     lead.mobile.includes(searchTerm)) &&
    (statusFilter ? lead.status === statusFilter : true)
  );

  return (
    <div className="max-w-[1200px] mx-auto font-body-md">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="font-display-lg md:text-3xl text-2xl font-bold text-on-surface mb-1" style={{ fontFamily: 'Montserrat' }}>Leads Management</h2>
          <p className="font-body-md text-on-surface-variant">Review and manage incoming loan inquiries.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-outline bg-surface text-on-surface font-label-sm text-sm rounded-lg hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
            Export
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary font-label-sm text-sm rounded-lg hover:bg-primary-container transition-colors shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            Add Lead
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
            placeholder="Search by name, ID, or phone..."
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
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="CLOSED_WON">Closed (Won)</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-outline-variant bg-surface text-on-surface text-sm rounded-lg hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_today</span>
            Date Range
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Loan Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Created At</th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">
                    Loading leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary text-sm font-bold">
                          {getInitials(lead.name)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">{lead.name}</p>
                          <p className="text-xs text-on-surface-variant">{lead.mobile} {lead.email && `• ${lead.email}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-on-surface font-medium capitalize">{lead.loan_type?.replace('_', ' ').toLowerCase() || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-on-surface">{lead.source}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-on-surface">{new Date(lead.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block" ref={openMenuId === lead.id ? menuRef : null}>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === lead.id ? null : lead.id)}
                          className="text-on-surface-variant hover:text-primary transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-xl">more_vert</span>
                        </button>
                        {openMenuId === lead.id && (
                          <div className="absolute right-0 top-full mt-1 w-36 bg-surface border border-outline-variant rounded-lg shadow-md z-10 overflow-hidden">
                            {isAdmin && (
                              <button
                                onClick={() => handleDelete(lead.id)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error-container transition-colors text-left"
                              >
                                <span className="material-symbols-outlined text-base">delete</span>
                                Delete
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && filteredLeads.length > 0 && (
          <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between">
            <p className="text-sm text-on-surface-variant">Showing 1 to {filteredLeads.length} of {leads.length} leads</p>
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
