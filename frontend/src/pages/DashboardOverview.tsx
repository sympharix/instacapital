import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface TrendPoint {
  month: string;
  applications: number;
  disbursed: number;
}

interface ActivityItem {
  type: 'lead' | 'application' | 'document';
  title: string;
  subtitle: string;
  timestamp: string;
}

interface DashboardStats {
  total_leads: number;
  active_applications: number;
  pending_documents: number;
  disbursed_total: number;
  trends: TrendPoint[];
  recent_activity: ActivityItem[];
}

const ACTIVITY_ICONS: Record<ActivityItem['type'], { icon: string; bg: string; text: string }> = {
  lead: { icon: 'person_add', bg: 'bg-surface-container-high', text: 'text-primary' },
  application: { icon: 'article', bg: 'bg-secondary-container', text: 'text-on-secondary-container' },
  document: { icon: 'upload_file', bg: 'bg-surface-container-high', text: 'text-primary' },
};

const formatRelativeTime = (timestamp: string) => {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

const formatCurrency = (value: number) => {
  if (value >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(1)}Cr`;
  if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
};

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats/');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const trends = stats?.trends || [];
  const maxValue = Math.max(1, ...trends.flatMap(t => [t.applications, t.disbursed]));

  const toPoints = (key: 'applications' | 'disbursed') => {
    if (trends.length === 0) return '';
    const step = 100 / (trends.length - 1 || 1);
    return trends
      .map((t, i) => `${i * step},${100 - (t[key] / maxValue) * 100}`)
      .join(' ');
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 font-body-md text-on-surface">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-background mb-1">Overview Dashboard</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Here's what's happening with your applications today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-surface text-on-surface border border-outline-variant rounded-lg font-label-sm flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm flex items-center gap-2 hover:bg-primary-container transition-colors shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>tune</span>
            Filter Data
          </button>
        </div>
      </div>

      {/* Bento Grid Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Leads */}
        <div className="bg-surface rounded-xl p-6 border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-surface-container-highest rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-2 bg-surface-container-high rounded-lg text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">person_add</span>
            </div>
          </div>
          <div className="relative z-10">
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Total Leads</p>
            <h3 className="font-display-lg text-4xl font-bold text-on-background" style={{ fontFamily: 'Montserrat' }}>
              {loading ? '...' : stats?.total_leads.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Active Applications */}
        <div className="bg-surface rounded-xl p-6 border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-surface-container-highest rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-2 bg-primary-container rounded-lg text-on-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined">article</span>
            </div>
          </div>
          <div className="relative z-10">
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Active Applications</p>
            <h3 className="font-display-lg text-4xl font-bold text-on-background" style={{ fontFamily: 'Montserrat' }}>
              {loading ? '...' : stats?.active_applications.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Pending Documents */}
        <div className="bg-surface rounded-xl p-6 border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-error-container rounded-full opacity-20 group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-2 bg-surface-container-high rounded-lg text-error flex items-center justify-center">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            {!loading && (stats?.pending_documents || 0) > 0 && (
              <span className="flex items-center gap-1 text-error font-label-xs text-label-xs bg-error-container/20 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>warning</span>
                Action Needed
              </span>
            )}
          </div>
          <div className="relative z-10">
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Pending Documents</p>
            <h3 className="font-display-lg text-4xl font-bold text-on-background" style={{ fontFamily: 'Montserrat' }}>
              {loading ? '...' : stats?.pending_documents.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Disbursed Loans */}
        <div className="bg-primary text-on-primary rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary-container rounded-full opacity-80 group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-2 bg-white/20 rounded-lg text-white flex items-center justify-center">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <span className="flex items-center gap-1 text-white font-label-xs text-label-xs bg-white/20 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>done_all</span>
              Total
            </span>
          </div>
          <div className="relative z-10">
            <p className="font-label-sm text-label-sm text-primary-fixed-dim mb-1">Disbursed (Total)</p>
            <h3 className="font-display-lg text-4xl font-bold text-white" style={{ fontFamily: 'Montserrat' }}>
              {loading ? '...' : formatCurrency(stats?.disbursed_total || 0)}
            </h3>
          </div>
        </div>
      </div>

      {/* Chart & Feed Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart Area (Span 2) */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-headline-md text-xl font-semibold text-on-background">Application Trends</h3>
              <p className="font-label-xs text-label-xs text-on-surface-variant mt-1">Monthly volume vs Disbursals (last 6 months)</p>
            </div>
          </div>

          <div className="flex-1 bg-surface-container-lowest border border-outline-variant/50 rounded-lg flex items-center justify-center min-h-[300px] relative overflow-hidden">
            {/* Faux Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-8 px-12 pointer-events-none">
              <div className="w-full h-px bg-outline-variant/30"></div>
              <div className="w-full h-px bg-outline-variant/30"></div>
              <div className="w-full h-px bg-outline-variant/30"></div>
              <div className="w-full h-px bg-outline-variant/30"></div>
            </div>
            {!loading && trends.length > 0 && (
              <svg className="absolute inset-0 w-full h-full pt-8 pb-12 px-12" preserveAspectRatio="none" viewBox="0 0 100 100">
                <polyline fill="none" points={toPoints('applications')} stroke="#b1c5ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                <polyline fill="none" points={toPoints('disbursed')} stroke="#006c49" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
              </svg>
            )}
            {/* X Axis Labels */}
            <div className="absolute bottom-4 left-12 right-12 flex justify-between font-label-xs text-[10px] text-on-surface-variant">
              {trends.map((t) => <span key={t.month}>{t.month}</span>)}
            </div>
            <div className="absolute top-4 right-4 flex gap-4 font-label-xs text-xs">
              <div className="flex items-center gap-1"><span className="w-3 h-1 bg-primary-fixed-dim rounded"></span> Applications</div>
              <div className="flex items-center gap-1"><span className="w-3 h-1 bg-secondary rounded"></span> Disbursed</div>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed (Span 1) */}
        <div className="bg-surface rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-xl font-semibold text-on-background">Recent Activity</h3>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {loading ? (
              <p className="text-sm text-on-surface-variant">Loading activity...</p>
            ) : !stats?.recent_activity.length ? (
              <p className="text-sm text-on-surface-variant">No recent activity.</p>
            ) : (
              stats.recent_activity.map((item, index) => {
                const style = ACTIVITY_ICONS[item.type];
                const isLast = index === stats.recent_activity.length - 1;
                return (
                  <div key={index} className="flex gap-4 relative">
                    {!isLast && (
                      <div className="absolute left-[15px] top-8 bottom-[-24px] w-px bg-outline-variant z-0"></div>
                    )}
                    <div className={`w-8 h-8 rounded-full ${style.bg} ${style.text} flex items-center justify-center z-10 shrink-0`}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{style.icon}</span>
                    </div>
                    <div>
                      <p className="font-label-sm text-sm text-on-surface font-semibold">{item.title}</p>
                      <p className="font-body-md text-xs text-on-surface-variant mt-1">{item.subtitle}</p>
                      <p className="font-label-xs text-[11px] text-outline mt-1">{formatRelativeTime(item.timestamp)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
