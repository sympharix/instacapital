import { useEffect, useState } from 'react';
import api from '../services/api';

interface Customer {
  id: number;
  full_name: string;
  email: string;
  mobile: string;
}

interface CreateApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LOAN_TYPES = [
  { value: 'PERSONAL', label: 'Personal Loan' },
  { value: 'BUSINESS', label: 'Business Loan' },
  { value: 'HOME', label: 'Home Loan' },
  { value: 'EDUCATION', label: 'Education Loan' },
  { value: 'VEHICLE', label: 'Vehicle Loan' },
  { value: 'LAP', label: 'Loan Against Property' },
];

export default function CreateApplicationModal({ isOpen, onClose, onSuccess }: CreateApplicationModalProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // step 1: customer, step 2: loan details

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState({
    loan_type: 'PERSONAL',
    requested_amount: '',
    tenure_months: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchCustomers('');
      setStep(1);
      setSelectedCustomer(null);
      setForm({ loan_type: 'PERSONAL', requested_amount: '', tenure_months: '' });
      setError('');
      setSearchTerm('');
    }
  }, [isOpen]);

  const fetchCustomers = async (search: string) => {
    setLoading(true);
    try {
      const res = await api.get('/customers/', { params: { search } });
      setCustomers(res.data.results || res.data);
    } catch {
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    fetchCustomers(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedCustomer) return;
    if (!form.requested_amount || !form.tenure_months) {
      setError('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await api.post('/applications/', {
        customer: selectedCustomer.id,
        loan_type: form.loan_type,
        requested_amount: parseFloat(form.requested_amount),
        tenure_months: parseInt(form.tenure_months),
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-primary to-secondary w-full" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '22px' }}>assignment_add</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-lg font-bold text-on-surface">New Application</h2>
              <p className="text-xs text-on-surface-variant">
                Step {step} of 2 — {step === 1 ? 'Select Customer' : 'Loan Details'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex px-6 pt-5 gap-2">
          {[1, 2].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= s ? 'bg-primary' : 'bg-surface-container-high'}`} />
          ))}
        </div>

        {/* Body */}
        <div className="px-6 py-5">

          {/* STEP 1: Customer Search & Select */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-on-surface-variant font-medium">Search and select the customer for this application:</p>
              
              {/* Search Input */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: '20px' }}>search</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by name, email or mobile..."
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-xl text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                />
              </div>

              {/* Customer List */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {loading ? (
                  <div className="text-center py-6 text-on-surface-variant text-sm">Searching...</div>
                ) : customers.length === 0 ? (
                  <div className="text-center py-6 text-on-surface-variant text-sm">No customers found.</div>
                ) : (
                  customers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCustomer(c)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                        selectedCustomer?.id === c.id
                          ? 'border-primary bg-primary-container/30 shadow-sm'
                          : 'border-outline-variant hover:border-primary/40 hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                        {c.full_name?.[0]?.toUpperCase() || 'C'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-on-surface truncate">{c.full_name}</p>
                        <p className="text-xs text-on-surface-variant truncate">{c.email || c.mobile}</p>
                      </div>
                      {selectedCustomer?.id === c.id && (
                        <span className="material-symbols-outlined text-primary flex-shrink-0" style={{ fontSize: '20px' }}>check_circle</span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Loan Details */}
          {step === 2 && selectedCustomer && (
            <div className="space-y-4">
              {/* Selected Customer Summary */}
              <div className="flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant">
                <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-sm">
                  {selectedCustomer.full_name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-surface">{selectedCustomer.full_name}</p>
                  <p className="text-xs text-on-surface-variant">{selectedCustomer.email || selectedCustomer.mobile}</p>
                </div>
                <button onClick={() => { setStep(1); setSelectedCustomer(null); }} className="ml-auto text-xs text-primary hover:underline">Change</button>
              </div>

              {/* Loan Type */}
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">Loan Type</label>
                <div className="relative">
                  <select
                    value={form.loan_type}
                    onChange={(e) => setForm({ ...form, loan_type: e.target.value })}
                    className="w-full appearance-none bg-surface border border-outline-variant rounded-xl pl-4 pr-10 py-3 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    {LOAN_TYPES.map((lt) => (
                      <option key={lt.value} value={lt.value}>{lt.label}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Amount & Tenure */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Requested Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm font-semibold">₹</span>
                    <input
                      type="number"
                      placeholder="500000"
                      value={form.requested_amount}
                      onChange={(e) => setForm({ ...form, requested_amount: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-2">Tenure (Months)</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="36"
                      value={form.tenure_months}
                      onChange={(e) => setForm({ ...form, tenure_months: e.target.value })}
                      className="w-full pl-4 pr-10 py-3 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xs">mo</span>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 px-4 py-3 bg-error-container text-on-error-container rounded-xl text-sm">
                  <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: '18px' }}>error</span>
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant bg-surface-container-low/50">
          <button
            onClick={step === 1 ? onClose : () => setStep(1)}
            className="px-5 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
          >
            {step === 1 ? 'Cancel' : '← Back'}
          </button>

          {step === 1 ? (
            <button
              disabled={!selectedCustomer}
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>
          ) : (
            <button
              disabled={submitting}
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating...' : 'Create Application'}
              {!submitting && <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
