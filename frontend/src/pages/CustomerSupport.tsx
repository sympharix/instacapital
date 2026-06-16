import React from 'react';

export default function CustomerSupport() {
  return (
    <div className="w-full">
      <main className="flex-grow pt-8 pb-16 px-6 md:px-10 max-w-[1200px] mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-on-background mb-4" style={{ fontFamily: 'Montserrat' }}>Customer Support</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">We're here to help. Raise a new concern or check the status of your existing requests below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Raise a Concern Form */}
          <section className="lg:col-span-7 bg-surface rounded-xl border border-outline-variant p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              Raise a New Concern
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="topic">Topic</label>
                <select className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-on-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" id="topic" name="topic">
                  <option value="">Select a topic</option>
                  <option value="payment">Payment</option>
                  <option value="application">Application</option>
                  <option value="kyc">KYC</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="subject">Subject</label>
                <input className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-on-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" id="subject" name="subject" placeholder="Briefly describe your issue" type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="description">Description</label>
                <textarea className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-on-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow resize-y" id="description" name="description" placeholder="Provide more details about your concern..." rows={5}></textarea>
              </div>
              <div className="pt-4">
                <button className="w-full md:w-auto bg-primary text-on-primary text-sm font-medium rounded-lg px-8 py-3 h-12 flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm" type="submit">
                  <span className="material-symbols-outlined">send</span>
                  Submit Request
                </button>
              </div>
            </form>
          </section>

          {/* My Tickets Section */}
          <section className="lg:col-span-5 bg-surface-container rounded-xl p-6 md:p-8 flex flex-col">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">confirmation_number</span>
              My Tickets
            </h2>
            <div className="space-y-4 flex-grow">
              {/* Ticket Card 1 */}
              <div className="bg-surface rounded-lg border border-outline-variant p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-on-surface-variant">#INC-1042</span>
                  <span className="bg-[#e6f4ea] text-[#0d652d] px-2 py-1 rounded-full text-xs font-semibold border border-[#ceead6]">Resolved</span>
                </div>
                <h3 className="text-base font-semibold text-on-background mb-1">Payment deduction failed</h3>
                <p className="text-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  Updated 2 days ago
                </p>
              </div>
              {/* Ticket Card 2 */}
              <div className="bg-surface rounded-lg border border-outline-variant p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-on-surface-variant">#INC-1045</span>
                  <span className="bg-[#fff8e1] text-[#f57f17] px-2 py-1 rounded-full text-xs font-semibold border border-[#ffecb3]">In Progress</span>
                </div>
                <h3 className="text-base font-semibold text-on-background mb-1">KYC document verification delay</h3>
                <p className="text-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  Updated 5 hours ago
                </p>
              </div>
              {/* Ticket Card 3 */}
              <div className="bg-surface rounded-lg border border-outline-variant p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-on-surface-variant">#INC-1048</span>
                  <span className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded-full text-xs font-semibold border border-outline-variant">Pending</span>
                </div>
                <h3 className="text-base font-semibold text-on-background mb-1">Application status inquiry</h3>
                <p className="text-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  Created 1 hour ago
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant text-center">
              <a className="text-sm font-medium text-primary hover:underline transition-colors flex items-center justify-center gap-1" href="#">
                View all tickets
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
