import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  status: 'connected' | 'disconnected' | 'coming_soon';
  lastRun?: string;
  runsCount?: number;
  docsUrl?: string;
  configFields: ConfigField[];
}

interface ConfigField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'url' | 'select';
  placeholder?: string;
  options?: string[];
}

// ─── Agent Registry ──────────────────────────────────────────────────────────

const AGENTS: Agent[] = [
  {
    id: 'brevo',
    name: 'Brevo (Sendinblue)',
    description: 'Send transactional emails, automated campaigns, and SMS notifications to your customers.',
    category: 'Communication',
    icon: 'mail',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    status: 'connected',
    lastRun: '2 hours ago',
    runsCount: 1248,
    docsUrl: 'https://developers.brevo.com/',
    configFields: [
      { key: 'api_key', label: 'API Key', type: 'password', placeholder: 'xkeysib-...' },
      { key: 'sender_email', label: 'Sender Email', type: 'text', placeholder: 'noreply@yourcompany.com' },
      { key: 'sender_name', label: 'Sender Name', type: 'text', placeholder: 'Instacapital' },
    ],
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Auto-create Jira tickets for escalated support cases, failed applications, or compliance alerts.',
    category: 'Project Management',
    icon: 'bug_report',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    status: 'disconnected',
    runsCount: 0,
    docsUrl: 'https://developer.atlassian.com/cloud/jira/',
    configFields: [
      { key: 'base_url', label: 'Jira Base URL', type: 'url', placeholder: 'https://yourorg.atlassian.net' },
      { key: 'email', label: 'Account Email', type: 'text', placeholder: 'admin@yourorg.com' },
      { key: 'api_token', label: 'API Token', type: 'password', placeholder: 'Your Jira API Token' },
      { key: 'project_key', label: 'Default Project Key', type: 'text', placeholder: 'CRM' },
    ],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Send automated WhatsApp messages for loan status updates, OTPs, and document reminders.',
    category: 'Communication',
    icon: 'chat',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    status: 'disconnected',
    runsCount: 0,
    configFields: [
      { key: 'phone_id', label: 'Phone Number ID', type: 'text', placeholder: 'Meta WhatsApp Phone ID' },
      { key: 'access_token', label: 'Access Token', type: 'password', placeholder: 'Meta Access Token' },
      { key: 'template_namespace', label: 'Template Namespace', type: 'text', placeholder: 'Your template namespace' },
    ],
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get real-time Slack alerts for high-priority leads, application status changes, and team mentions.',
    category: 'Communication',
    icon: 'tag',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    status: 'disconnected',
    runsCount: 0,
    configFields: [
      { key: 'webhook_url', label: 'Incoming Webhook URL', type: 'url', placeholder: 'https://hooks.slack.com/services/...' },
      { key: 'default_channel', label: 'Default Channel', type: 'text', placeholder: '#crm-alerts' },
    ],
  },
  {
    id: 'google_sheets',
    name: 'Google Sheets',
    description: 'Sync application data, lead lists, and reports directly into Google Sheets for analysis.',
    category: 'Data & Reporting',
    icon: 'table_chart',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    status: 'coming_soon',
    configFields: [],
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    description: 'Track loan disbursement payment events, EMI collections, and repayment webhooks.',
    category: 'Payments',
    icon: 'payments',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    status: 'coming_soon',
    configFields: [],
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    description: 'Sync contacts, deals, and loan pipeline stages bidirectionally with your HubSpot workspace.',
    category: 'CRM',
    icon: 'hub',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    status: 'coming_soon',
    configFields: [],
  },
  {
    id: 'twilio',
    name: 'Twilio SMS',
    description: 'Send SMS alerts for OTP verification, EMI reminders, and document collection prompts.',
    category: 'Communication',
    icon: 'sms',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    status: 'coming_soon',
    configFields: [],
  },
];

const CATEGORIES = ['All', 'Communication', 'Project Management', 'Data & Reporting', 'Payments', 'CRM'];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Agent['status'] }) {
  if (status === 'connected') return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#1B5E20]">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      Connected
    </span>
  );
  if (status === 'coming_soon') return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface-variant border border-outline-variant">
      Coming Soon
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-error-container text-on-error-container">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
      Not Connected
    </span>
  );
}

function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  return (
    <div
      onClick={agent.status !== 'coming_soon' ? onClick : undefined}
      className={`group relative bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 flex flex-col gap-4 shadow-sm transition-all duration-200 ${
        agent.status !== 'coming_soon'
          ? 'cursor-pointer hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5'
          : 'opacity-60 cursor-not-allowed'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl ${agent.iconBg} flex items-center justify-center flex-shrink-0`}>
          <span className={`material-symbols-outlined ${agent.iconColor}`} style={{ fontSize: '24px' }}>{agent.icon}</span>
        </div>
        <StatusBadge status={agent.status} />
      </div>

      {/* Info */}
      <div>
        <h3 className="font-semibold text-on-surface text-sm mb-1">{agent.name}</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">{agent.description}</p>
      </div>

      {/* Footer Stats */}
      {agent.status === 'connected' && (
        <div className="flex items-center gap-4 pt-3 border-t border-outline-variant">
          <div className="flex items-center gap-1 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>history</span>
            {agent.lastRun}
          </div>
          <div className="flex items-center gap-1 text-xs text-on-surface-variant ml-auto">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>bolt</span>
            {agent.runsCount?.toLocaleString()} runs
          </div>
        </div>
      )}

      {/* Category tag */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {agent.status !== 'coming_soon' && (
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>settings</span>
        )}
      </div>
    </div>
  );
}

interface ConfigDrawerProps {
  agent: Agent | null;
  onClose: () => void;
}

function ConfigDrawer({ agent, onClose }: ConfigDrawerProps) {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  if (!agent) return null;

  const handleSave = () => {
    // In real implementation, POST to /api/integrations/config/
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-surface-container-lowest border-l border-outline-variant shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        
        {/* Top gradient */}
        <div className="h-1.5 bg-gradient-to-r from-primary to-secondary flex-shrink-0" />

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-outline-variant flex-shrink-0">
          <div className={`w-10 h-10 rounded-xl ${agent.iconBg} flex items-center justify-center`}>
            <span className={`material-symbols-outlined ${agent.iconColor}`} style={{ fontSize: '22px' }}>{agent.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-on-surface text-base">{agent.name}</h2>
            <p className="text-xs text-on-surface-variant">{agent.category}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant">
            <div>
              <p className="text-sm font-semibold text-on-surface">Connection Status</p>
              <p className="text-xs text-on-surface-variant mt-0.5">Integration health check</p>
            </div>
            <StatusBadge status={agent.status} />
          </div>

          {/* Description */}
          <div>
            <p className="text-sm font-semibold text-on-surface mb-2">About this Agent</p>
            <p className="text-sm text-on-surface-variant leading-relaxed">{agent.description}</p>
            {agent.docsUrl && (
              <a href={agent.docsUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                View Documentation
              </a>
            )}
          </div>

          {/* Config Fields */}
          {agent.configFields.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-on-surface mb-3">Configuration</p>
              <div className="space-y-3">
                {agent.configFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-on-surface mb-1.5">{field.label}</label>
                    {field.type === 'select' ? (
                      <div className="relative">
                        <select
                          value={config[field.key] || ''}
                          onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
                          className="w-full appearance-none bg-surface border border-outline-variant rounded-lg pl-3 pr-8 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        >
                          <option value="">Select...</option>
                          {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" style={{ fontSize: '18px' }}>expand_more</span>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={config[field.key] || ''}
                        onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
                        className="w-full px-3 py-2.5 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Run Stats */}
          {agent.status === 'connected' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant">
                <p className="text-2xl font-bold text-on-surface">{agent.runsCount?.toLocaleString()}</p>
                <p className="text-xs text-on-surface-variant mt-1">Total Runs</p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant">
                <p className="text-sm font-bold text-on-surface">{agent.lastRun}</p>
                <p className="text-xs text-on-surface-variant mt-1">Last Triggered</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-outline-variant bg-surface-container-low/50 flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            {saved
              ? <><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span> Saved!</>
              : <><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span> Save Config</>
            }
          </button>
          {agent.status === 'connected' && (
            <button className="px-4 py-2.5 border border-error text-error text-sm font-medium rounded-lg hover:bg-error-container/30 transition-colors">
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Agents() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const connectedCount = AGENTS.filter(a => a.status === 'connected').length;

  const filtered = AGENTS.filter(agent => {
    const matchCategory = activeCategory === 'All' || agent.category === activeCategory;
    const matchSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-[1200px] mx-auto font-body-md">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="font-display-lg md:text-3xl text-2xl font-bold text-on-surface mb-1" style={{ fontFamily: 'Montserrat' }}>
            Agent Integrations
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Connect your workflow tools to automate the entire loan lifecycle.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-semibold text-on-surface">{connectedCount}</span>
          <span className="text-sm text-on-surface-variant">of {AGENTS.length} connected</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Agents', value: connectedCount, icon: 'check_circle', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Automation Runs', value: '1,248', icon: 'bolt', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Emails Sent', value: '3.4K', icon: 'mail', color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Available Tools', value: AGENTS.length, icon: 'extension', color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map(stat => (
          <div key={stat.label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
              <span className={`material-symbols-outlined ${stat.color}`} style={{ fontSize: '22px' }}>{stat.icon}</span>
            </div>
            <div>
              <p className="text-xl font-bold text-on-surface">{stat.value}</p>
              <p className="text-xs text-on-surface-variant">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: '20px' }}>search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search agents..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface border border-outline-variant text-on-surface-variant hover:border-primary/40 hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(agent => (
          <AgentCard key={agent.id} agent={agent} onClick={() => setSelectedAgent(agent)} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-3 block text-outline">search_off</span>
            No agents found matching your search.
          </div>
        )}
      </div>

      {/* Config Drawer */}
      {selectedAgent && (
        <ConfigDrawer agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </div>
  );
}
