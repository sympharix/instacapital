import React from 'react';

export default function SupportTickets() {
  return (
    <div className="max-w-[1200px] mx-auto font-body-md">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'Montserrat' }}>Active Support Tickets</h1>
          <p className="text-on-surface-variant text-lg">Manage and resolve customer concerns efficiently.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface border border-outline-variant text-on-surface px-4 py-2 rounded-lg hover:bg-surface-variant transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface border border-outline-variant text-on-surface px-4 py-2 rounded-lg hover:bg-surface-variant transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-6 rounded-xl border border-surface-container-high shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <span className="material-symbols-outlined text-primary mb-2 relative z-10">receipt_long</span>
          <p className="text-on-surface-variant text-sm font-medium relative z-10">Total Active</p>
          <h3 className="text-3xl font-semibold text-on-surface mt-1 relative z-10">142</h3>
        </div>
        <div className="bg-error-container/20 p-6 rounded-xl border border-error-container shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-error-container rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <span className="material-symbols-outlined text-error mb-2 relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
          <p className="text-on-surface-variant text-sm font-medium relative z-10">High Urgency</p>
          <h3 className="text-3xl font-semibold text-error mt-1 relative z-10">28</h3>
        </div>
        <div className="bg-secondary-container/20 p-6 rounded-xl border border-secondary-container shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-container rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <span className="material-symbols-outlined text-secondary mb-2 relative z-10">task_alt</span>
          <p className="text-on-surface-variant text-sm font-medium relative z-10">Resolved Today</p>
          <h3 className="text-3xl font-semibold text-secondary mt-1 relative z-10">64</h3>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-surface-container-high shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex items-center justify-center cursor-pointer">
          <div className="text-center">
            <span className="material-symbols-outlined text-outline-variant text-4xl mb-1 group-hover:text-primary transition-colors">trending_up</span>
            <p className="text-primary text-sm font-semibold">View Analytics Report</p>
          </div>
        </div>
      </div>

      {/* Tickets Table Area */}
      <div className="bg-surface rounded-xl border border-surface-container-high shadow-sm overflow-hidden flex flex-col">
        {/* Table Header/Toolbar */}
        <div className="p-4 border-b border-surface-container-high flex justify-between items-center bg-surface-container-lowest">
          <h2 className="text-lg font-semibold text-on-surface">Recent Submissions</h2>
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant text-sm font-medium">Sort by:</span>
            <select className="bg-surface-container-low border-none text-sm rounded-md py-1 pr-8 focus:ring-1 focus:ring-primary outline-none cursor-pointer">
              <option>Newest First</option>
              <option>Urgency (High-Low)</option>
              <option>Status</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-xs font-semibold uppercase tracking-wider border-b border-surface-container-high">
                <th className="py-3 px-4 w-24">Ticket ID</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Topic</th>
                <th className="py-3 px-4 w-32">Urgency</th>
                <th className="py-3 px-4 w-32">Status</th>
                <th className="py-3 px-4 w-32">Date Submitted</th>
                <th className="py-3 px-4 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high text-sm">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-lowest transition-colors group">
                <td className="py-4 px-4 font-mono text-outline">#TCK-8901</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">AM</div>
                    <span className="font-medium text-on-surface">Amit Mukherjee</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-on-surface-variant">Loan Disbursement Delay</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-container text-on-error-container">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span> High
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-surface-variant text-on-surface-variant border border-outline-variant/30">
                    Open
                  </span>
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-xs">Today, 09:30 AM</td>
                <td className="py-4 px-4 text-right">
                  <button className="text-primary hover:text-primary-fixed-variant text-sm font-medium px-3 py-1.5 border border-primary/20 rounded hover:bg-primary/5 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    Resolve
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-lowest transition-colors group">
                <td className="py-4 px-4 font-mono text-outline">#TCK-8895</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">SD</div>
                    <span className="font-medium text-on-surface">Sneha Das</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-on-surface-variant">Interest Rate Query</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-variant text-on-surface-variant">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Low
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-surface-container-highest text-on-surface-variant border border-outline-variant/30">
                    In Progress
                  </span>
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-xs">Yesterday, 14:15 PM</td>
                <td className="py-4 px-4 text-right">
                  <button className="text-primary hover:text-primary-fixed-variant text-sm font-medium px-3 py-1.5 border border-primary/20 rounded hover:bg-primary/5 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    Resolve
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-lowest transition-colors group">
                <td className="py-4 px-4 font-mono text-outline">#TCK-8890</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs">RB</div>
                    <span className="font-medium text-on-surface">Rahul Banerjee</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-on-surface-variant">Account Access Issue</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-tint/10 text-[#2559bd]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2559bd]"></span> Medium
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                    Resolved
                  </span>
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-xs">Oct 24, 11:00 AM</td>
                <td className="py-4 px-4 text-right">
                  <button className="text-outline hover:text-on-surface text-sm font-medium px-3 py-1.5 rounded hover:bg-surface-variant transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-surface-container-high bg-surface-container-low flex justify-between items-center text-sm text-on-surface-variant">
          <p>Showing <span className="font-medium text-on-surface">1</span> to <span className="font-medium text-on-surface">3</span> of <span className="font-medium text-on-surface">142</span> results</p>
          <div className="flex gap-1">
            <button className="p-1 rounded hover:bg-surface-variant text-outline disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded bg-primary text-on-primary font-medium flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded hover:bg-surface-variant font-medium flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded hover:bg-surface-variant font-medium flex items-center justify-center">3</button>
            <span className="w-8 h-8 flex items-center justify-center">...</span>
            <button className="p-1 rounded hover:bg-surface-variant text-on-surface">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
