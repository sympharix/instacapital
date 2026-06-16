import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';
import type { RootState } from '../store';

const STATUS_CHOICES = [
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'VERIFICATION', label: 'Verification' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'SANCTIONED', label: 'Sanctioned' },
  { value: 'DISBURSED', label: 'Disbursed' },
  { value: 'REJECTED', label: 'Rejected' },
];

const getStatusColor = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'PROCESSING': return 'bg-surface-container-high text-on-surface-variant border border-outline-variant';
    case 'VERIFICATION': return 'bg-[#FFF3E0] text-[#E65100]';
    case 'APPROVED':
    case 'SANCTIONED':
    case 'DISBURSED': return 'bg-[#E8F5E9] text-[#1B5E20]';
    case 'REJECTED': return 'bg-error-container text-on-error-container';
    default: return 'bg-surface-container text-on-surface';
  }
};

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  const [application, setApplication] = useState<any>(null);
  const [partners, setPartners] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusValue, setStatusValue] = useState('');
  const [partnerValue, setPartnerValue] = useState('');
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchApplication = async () => {
    try {
      const res = await api.get(`/applications/${id}/`);
      setApplication(res.data);
      setStatusValue(res.data.status);
      setPartnerValue(res.data.lending_partner ? String(res.data.lending_partner) : '');
    } catch (err) {
      console.error('Error fetching application:', err);
    }
  };

  const fetchPartners = async () => {
    try {
      const res = await api.get('/applications/partners/');
      setPartners(res.data.results || res.data);
    } catch (err) {
      console.error('Error fetching lending partners:', err);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await api.get(`/documents/?application=${id}`);
      setDocuments(res.data.results || res.data);
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchApplication(), fetchPartners(), fetchDocuments()]);
      setLoading(false);
    };
    load();
  }, [id]);

  const handleUpdateStatus = async () => {
    setSaving(true);
    try {
      await api.patch(`/applications/${id}/`, { status: statusValue });
      await fetchApplication();
    } catch (err) {
      console.error('Error updating status:', err);
    }
    setSaving(false);
  };

  const handleAssignPartner = async () => {
    setSaving(true);
    try {
      await api.patch(`/applications/${id}/`, { lending_partner: partnerValue || null });
      await fetchApplication();
    } catch (err) {
      console.error('Error assigning lending partner:', err);
    }
    setSaving(false);
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setSaving(true);
    try {
      await api.post(`/applications/${id}/notes/`, { note: noteText });
      setNoteText('');
      await fetchApplication();
    } catch (err) {
      console.error('Error adding note:', err);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="max-w-[1000px] mx-auto p-8 text-center text-on-surface-variant">Loading application...</div>;
  }

  if (!application) {
    return <div className="max-w-[1000px] mx-auto p-8 text-center text-on-surface-variant">Application not found.</div>;
  }

  const customer = application.customer_detail;

  return (
    <div className="max-w-[1000px] mx-auto font-body-md">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard/applications')}
          className="flex items-center gap-1 text-sm text-primary hover:underline mb-3"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Applications
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display-lg md:text-3xl text-2xl font-bold text-on-surface mb-1" style={{ fontFamily: 'Montserrat' }}>
              {application.application_id}
            </h2>
            <p className="text-on-surface-variant">
              {customer?.full_name || 'Unknown Customer'} • {application.loan_type?.replace('_', ' ')}
            </p>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
            {application.status?.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Details */}
        <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-on-surface mb-4">Application Details</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-on-surface-variant">Loan Type</dt>
              <dd className="text-on-surface font-medium capitalize">{application.loan_type?.replace('_', ' ').toLowerCase()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-on-surface-variant">Requested Amount</dt>
              <dd className="text-on-surface font-medium">₹{application.requested_amount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-on-surface-variant">Tenure</dt>
              <dd className="text-on-surface font-medium">{application.tenure_months} months</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-on-surface-variant">Submitted On</dt>
              <dd className="text-on-surface font-medium">{new Date(application.created_at).toLocaleDateString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-on-surface-variant">Last Updated</dt>
              <dd className="text-on-surface font-medium">{new Date(application.updated_at).toLocaleDateString()}</dd>
            </div>
          </dl>
        </div>

        {/* Customer Details */}
        <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-on-surface mb-4">Customer Details</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-on-surface-variant">Name</dt>
              <dd className="text-on-surface font-medium">{customer?.full_name || 'N/A'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-on-surface-variant">Mobile</dt>
              <dd className="text-on-surface font-medium">{customer?.mobile || 'N/A'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-on-surface-variant">Email</dt>
              <dd className="text-on-surface font-medium">{customer?.email || 'N/A'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-on-surface-variant">Employment</dt>
              <dd className="text-on-surface font-medium capitalize">{customer?.employment_type?.replace('_', ' ').toLowerCase() || 'N/A'}</dd>
            </div>
          </dl>
        </div>

        {/* Status Management */}
        <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-on-surface mb-4">Application Status</h3>
          {isAdmin ? (
            <div className="flex gap-3">
              <div className="relative flex-1">
                <select
                  value={statusValue}
                  onChange={(e) => setStatusValue(e.target.value)}
                  className="w-full appearance-none bg-surface border border-outline-variant rounded-lg pl-4 pr-10 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  {STATUS_CHOICES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
              <button
                onClick={handleUpdateStatus}
                disabled={saving || statusValue === application.status}
                className="bg-primary text-on-primary text-sm font-medium py-2.5 px-5 rounded-lg hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors disabled:opacity-50 shadow-sm"
              >
                Update
              </button>
            </div>
          ) : (
            <p className="text-sm text-on-surface-variant">Current status: <span className="font-medium text-on-surface">{application.status?.replace('_', ' ')}</span></p>
          )}
        </div>

        {/* Lending Partner */}
        <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-on-surface mb-4">Lending Partner</h3>
          {isAdmin ? (
            <div className="flex gap-3">
              <div className="relative flex-1">
                <select
                  value={partnerValue}
                  onChange={(e) => setPartnerValue(e.target.value)}
                  className="w-full appearance-none bg-surface border border-outline-variant rounded-lg pl-4 pr-10 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="">Unassigned</option>
                  {partners.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.partner_type})</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
              <button
                onClick={handleAssignPartner}
                disabled={saving || partnerValue === (application.lending_partner ? String(application.lending_partner) : '')}
                className="bg-primary text-on-primary text-sm font-medium py-2.5 px-5 rounded-lg hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors disabled:opacity-50 shadow-sm"
              >
                Assign
              </button>
            </div>
          ) : (
            <p className="text-sm text-on-surface-variant">
              {application.lending_partner_detail
                ? `Assigned to ${application.lending_partner_detail.name}`
                : 'No lending partner assigned yet.'}
            </p>
          )}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm mt-6">
        <h3 className="text-lg font-semibold text-on-surface mb-4">Documents</h3>
        {documents.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No documents uploaded for this application.</p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc: any) => (
              <div key={doc.id} className="flex items-center justify-between border border-outline-variant rounded-lg px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">description</span>
                  <span className="text-sm text-on-surface">{doc.document_type?.replace('_', ' ')}</span>
                </div>
                <button
                  onClick={() => window.open(doc.file, '_blank')}
                  disabled={!doc.file}
                  className="text-primary text-sm font-medium hover:underline disabled:opacity-50 disabled:no-underline"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notes / Timeline */}
      <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm mt-6">
        <h3 className="text-lg font-semibold text-on-surface mb-4">Notes & Updates</h3>

        {isAdmin && (
          <div className="flex gap-3 mb-4">
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note about this application..."
              className="flex-1 px-4 py-2.5 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleAddNote}
              disabled={saving || !noteText.trim()}
              className="bg-primary text-on-primary text-sm font-medium py-2.5 px-5 rounded-lg hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors disabled:opacity-50 shadow-sm"
            >
              Add Note
            </button>
          </div>
        )}

        {application.notes?.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No notes yet.</p>
        ) : (
          <div className="space-y-3">
            {application.notes?.map((note: any) => (
              <div key={note.id} className="border border-outline-variant rounded-lg p-3">
                <p className="text-sm text-on-surface">{note.note}</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  {note.author_name || 'System'} • {new Date(note.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
