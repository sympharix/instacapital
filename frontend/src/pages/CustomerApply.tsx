import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import api from '../services/api';

export default function CustomerApply() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) navigate('/customer/login');
  }, [user, navigate]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(33);

  const [form, setForm] = useState({
    loanType: '',
    loanAmount: '',
    tenure: '12',
  });

  const updateField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    const filled = Object.values(updated).filter(v => v !== '').length;
    setProgress(Math.max(33, (filled / Object.keys(updated).length) * 100));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.loanType || !form.loanAmount || !form.tenure) return setError('Please fill all required fields.');
    setLoading(true);
    setError('');
    try {
      await api.post(`/applications/`, {
        loan_type: form.loanType.toUpperCase(),
        requested_amount: form.loanAmount,
        tenure_months: form.tenure
      });
      setProgress(100);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <main className="flex-grow w-full px-4 md:px-10 max-w-[1200px] mx-auto py-8 md:py-12 flex justify-center items-start">
        <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-surface-container px-8 py-10 text-center border-b border-outline-variant relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-primary to-transparent pointer-events-none"></div>
            <h1 className="font-headline-md text-3xl font-bold text-on-surface mb-2 relative z-10">Start Your Loan Journey</h1>
            <p className="font-body-md text-on-surface-variant max-w-xl mx-auto relative z-10">
              Tell us about your financial needs. Our team ensures rapid processing and personalized service to get you funded quickly.
            </p>
          </div>

          <div className="p-8">
            {/* Progress Bar */}
            <div className="w-full bg-surface-variant h-1 rounded-full mb-8 overflow-hidden">
              <div className="bg-secondary h-full rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progress}%` }}></div>
            </div>

            {error && (
              <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined icon-fill text-on-secondary-container text-4xl">check_circle</span>
                </div>
                <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-2">Application Submitted!</h2>
                <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-8">
                  Thank you for applying. You can track your application status in your Dashboard.
                </p>
                <button onClick={() => navigate('/customer/dashboard')} className="px-6 py-2 border border-outline-variant text-on-surface font-label-sm rounded-lg hover:bg-surface-variant transition-colors">
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-sm text-sm text-on-surface mb-1" htmlFor="loanType">Loan Type</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-3 text-outline">account_balance</span>
                      <select className="w-full pl-10 pr-10 py-3 bg-surface-bright border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-on-surface appearance-none cursor-pointer" id="loanType" name="loanType" value={form.loanType} onChange={updateField} required>
                        <option value="" disabled>Select Loan Type</option>
                        <option value="PERSONAL">Personal Loan</option>
                        <option value="BUSINESS">Business Loan</option>
                        <option value="HOME">Home Loan</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3 text-outline pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-sm text-sm text-on-surface mb-1" htmlFor="tenure">Tenure (Months)</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-3 text-outline">calendar_month</span>
                      <input className="w-full pl-10 pr-4 py-3 bg-surface-bright border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-on-surface placeholder:text-outline-variant" id="tenure" name="tenure" type="number" min="3" max="120" value={form.tenure} onChange={updateField} required />
                    </div>
                  </div>
                </div>
                {/* Loan Amount */}
                <div>
                  <label className="block font-label-sm text-sm text-on-surface mb-1" htmlFor="loanAmount">Requested Loan Amount (₹)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-outline">currency_rupee</span>
                    <input className="w-full pl-10 pr-4 py-3 bg-surface-bright border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-on-surface placeholder:text-outline-variant" id="loanAmount" name="loanAmount" type="number" min="10000" step="5000" value={form.loanAmount} onChange={updateField} required />
                  </div>
                </div>

                {/* Submit Area */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between border-t border-outline-variant gap-4">
                  <div className="flex items-center text-secondary gap-2 text-sm">
                    <span className="material-symbols-outlined icon-fill">verified_user</span>
                    <span className="font-label-sm">Secure 256-bit encryption</span>
                  </div>
                  <button className="w-full sm:w-auto px-8 py-3 bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-2" type="submit" disabled={loading}>
                    <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
                    {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
