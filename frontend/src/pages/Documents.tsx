import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Documents() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await api.get('/documents/');
        setDocuments(res.data.results || res.data);
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
      setLoading(false);
    };
    fetchDocuments();
  }, []);

  const getUrgencyColor = (isUrgent: boolean) => {
    return isUrgent 
      ? 'bg-error-container text-on-error-container'
      : 'bg-surface-container text-on-surface-variant';
  };

  return (
    <div className="max-w-[1200px] mx-auto font-body-md">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display-lg md:text-3xl text-2xl font-bold text-on-surface mb-2" style={{ fontFamily: 'Montserrat' }}>Document Verification</h2>
          <p className="text-on-surface-variant">Review pending document sets for active loan applications.</p>
        </div>
        
        {/* Quick Stats / Actions */}
        <div className="flex gap-3">
          <div className="bg-surface border border-outline-variant rounded-xl px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>warning</span>
            </div>
            <div>
              <p className="font-label-xs text-xs text-on-surface-variant">Urgent Reviews</p>
              <p className="font-headline-md text-lg leading-tight font-bold text-on-surface">
                {documents.filter(d => d.status === 'PENDING_URGENT').length || 0}
              </p>
            </div>
          </div>
          <div className="bg-surface border border-outline-variant rounded-xl px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>pending_actions</span>
            </div>
            <div>
              <p className="font-label-xs text-xs text-on-surface-variant">Pending Total</p>
              <p className="font-headline-md text-lg leading-tight font-bold text-on-surface">
                {documents.filter(d => d.status === 'PENDING' || d.status === 'PENDING_URGENT').length || documents.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
          <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-on-surface">Filters</h3>
              <button className="text-primary text-xs hover:underline">Clear all</button>
            </div>
            
            {/* Urgency */}
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">Urgency</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                  <span className="text-sm text-on-surface group-hover:text-primary transition-colors">High Priority (24h)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                  <span className="text-sm text-on-surface group-hover:text-primary transition-colors">Standard (48h)</span>
                </label>
              </div>
            </div>
            
            <div className="h-px bg-outline-variant w-full mb-5"></div>
            
            {/* Document Types */}
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">Document Type</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                  <span className="text-sm text-on-surface group-hover:text-primary transition-colors">Identity (Aadhar/PAN)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                  <span className="text-sm text-on-surface group-hover:text-primary transition-colors">Income (ITR/Salary)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                  <span className="text-sm text-on-surface group-hover:text-primary transition-colors">Address Proof</span>
                </label>
              </div>
            </div>
            
          </div>
        </div>

        {/* Document List Area */}
        <div className="flex-1 bg-surface border border-outline-variant rounded-xl shadow-sm flex flex-col overflow-hidden">
          {/* List Header */}
          <div className="bg-surface-container-low border-b border-outline-variant px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-on-surface-variant">Sort by:</span>
              <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-fixed-dim transition-colors">
                Submission Date
                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              </button>
            </div>
            <div className="text-xs text-on-surface-variant">
              Showing {documents.length} pending
            </div>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2 max-h-[600px]">
            {loading ? (
              <div className="p-8 text-center text-on-surface-variant">Loading documents...</div>
            ) : documents.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant">No pending documents found.</div>
            ) : (
              documents.map((doc: any, index: number) => {
                const isUrgent = doc.status === 'PENDING_URGENT';
                return (
                  <div key={doc.id || index} className="bg-surface border border-outline-variant hover:border-primary/50 hover:shadow-sm rounded-lg p-5 transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-full ${isUrgent ? 'bg-error-container text-on-error-container' : 'bg-surface-container-high text-primary'} flex items-center justify-center shrink-0 mt-1 sm:mt-0`}>
                        <span className="material-symbols-outlined text-[24px]">folder_special</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg font-semibold text-on-surface">{doc.customer_name || `App #${doc.application}`}</h4>
                          {isUrgent && (
                            <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Urgent</span>
                          )}
                          <span className="text-on-surface-variant text-xs">Doc ID: {doc.id}</span>
                        </div>
                        <p className="text-sm text-on-surface-variant mb-3">{doc.document_type?.replace('_', ' ')} - {doc.status}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 bg-surface-container border border-outline-variant px-2.5 py-1 rounded-md text-[11px] font-medium text-on-surface">
                            <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span> Uploaded
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 sm:border-l border-outline-variant pt-4 sm:pt-0 sm:pl-6 shrink-0 min-w-[140px]">
                      <div className="text-left sm:text-right">
                        <p className="text-xs text-on-surface-variant">Submitted</p>
                        <p className="text-sm text-on-surface font-medium">{new Date(doc.uploaded_at || Date.now()).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => window.open(doc.file, '_blank', 'noopener,noreferrer')}
                        disabled={!doc.file}
                        className="bg-primary text-on-primary text-sm font-medium py-2 px-5 rounded-lg hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors flex items-center justify-center w-full sm:w-auto shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Footer */}
          {!loading && documents.length > 0 && (
            <div className="bg-surface border-t border-outline-variant px-6 py-4 flex items-center justify-between mt-auto">
              <button className="text-on-surface-variant disabled:opacity-50 flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span> Previous
              </button>
              <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-primary-container text-on-primary-container text-sm font-medium">1</button>
              </div>
              <button className="text-primary flex items-center gap-1 text-sm font-medium hover:text-primary-fixed-dim transition-colors disabled:opacity-50" disabled>
                Next <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
