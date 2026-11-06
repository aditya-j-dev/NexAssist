import React from 'react';
import { CustomerProfile, DailySystemMetrics } from '../types';
import {
  ShieldCheck,
  Zap,
  Download,
  Users,
  Info,
  Layers,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { downloadFullProjectZip } from '../utils/zipGenerator';

interface HeaderProps {
  currentCustomer: CustomerProfile;
  customers: CustomerProfile[];
  onSelectCustomer: (cust: CustomerProfile) => void;
  activeTab: 'CHAT' | 'COCKPIT' | 'TAXONOMY' | 'KB' | 'HITL' | 'LEARNING';
  onSelectTab: (tab: 'CHAT' | 'COCKPIT' | 'TAXONOMY' | 'KB' | 'HITL' | 'LEARNING') => void;
  pendingEscalationsCount: number;
  metrics: DailySystemMetrics;
  onOpenArchitectureModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCustomer,
  customers,
  onSelectCustomer,
  activeTab,
  onSelectTab,
  pendingEscalationsCount,
  metrics,
  onOpenArchitectureModal,
}) => {
  const [customerDropdownOpen, setCustomerDropdownOpen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const handleZipDownload = async () => {
    setIsExporting(true);
    try {
      await downloadFullProjectZip();
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
      {/* Top Banking Compliance & Scale Ticker */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            NexBank AI Gateway 2.4 Live
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Users className="h-3.5 w-3.5 text-blue-400" />
            <strong className="text-white">2.7M</strong> Active Customers • <strong className="text-white">18,000</strong> Daily Ops
          </span>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="flex items-center gap-1 text-slate-300 hidden md:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            RBI Compliant (Zero-Liability DBR.No.Leg.BC.78)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 bg-blue-950/70 border border-blue-800/50 px-2 py-0.5 rounded text-blue-300 font-mono text-[11px]">
            <Zap className="h-3 w-3 text-amber-400" />
            Sub-200ms KB: <strong className="text-white">{metrics.averageRetrievalLatencyMs}ms</strong>
          </span>
          <span className="flex items-center gap-1 bg-emerald-950/70 border border-emerald-800/50 px-2 py-0.5 rounded text-emerald-300 text-[11px]">
            Deflection: <strong className="text-white">{metrics.autonomousDeflectionRate}%</strong>
          </span>
          <button
            id="btn-open-arch-modal"
            onClick={onOpenArchitectureModal}
            className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-0.5 rounded hover:bg-slate-800 transition"
          >
            <Info className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Architecture</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-slate-900 shrink-0 text-sm shadow-sm">
            NB
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-white flex items-center gap-2">
              <span>NexBank</span>
              <span className="text-slate-400 font-normal hidden sm:inline text-sm">
                | Customer Intelligence Agent v4.2
              </span>
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-950/90 p-1 rounded-xl border border-slate-800">
          <button
            id="nav-tab-chat"
            onClick={() => onSelectTab('CHAT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeTab === 'CHAT'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>💬</span> Customer Chat
          </button>
          <button
            id="nav-tab-cockpit"
            onClick={() => onSelectTab('COCKPIT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeTab === 'COCKPIT'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>🧠</span> Agent Reasoning
          </button>
          <button
            id="nav-tab-taxonomy"
            onClick={() => onSelectTab('TAXONOMY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeTab === 'TAXONOMY'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="h-3.5 w-3.5" /> 26 Intents
          </button>
          <button
            id="nav-tab-kb"
            onClick={() => onSelectTab('KB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeTab === 'KB'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-amber-400" /> Knowledge Base
          </button>
          <button
            id="nav-tab-hitl"
            onClick={() => onSelectTab('HITL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 relative ${
              activeTab === 'HITL'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>🚨</span> HITL Escalation
            {pendingEscalationsCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full animate-pulse">
                {pendingEscalationsCount}
              </span>
            )}
          </button>
          <button
            id="nav-tab-learning"
            onClick={() => onSelectTab('LEARNING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeTab === 'LEARNING'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" /> Self-Learning & Safety
          </button>
        </nav>

        {/* Right Action Area: Supervisor, Customer Selector & ZIP Download */}
        <div className="flex items-center gap-3">
          {/* Supervisor Identity from Design HTML */}
          <div className="hidden xl:flex items-center gap-3 pr-2 border-r border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-400">System Active</span>
            </div>
            <div className="h-6 w-[1px] bg-slate-700"></div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Supervisor</p>
              <p className="text-xs font-medium text-white leading-tight mt-0.5">Ananya Sharma</p>
            </div>
          </div>

          {/* Customer Selector Dropdown */}
          <div className="relative">
            <button
              id="btn-customer-selector"
              onClick={() => setCustomerDropdownOpen(!customerDropdownOpen)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs transition"
            >
              <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-[11px]">
                {currentCustomer.name.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-medium text-white leading-tight">{currentCustomer.name}</div>
                <div className="text-[10px] text-slate-400 leading-tight">
                  ₹{currentCustomer.balanceINR.toLocaleString('en-IN')} • {currentCustomer.tier.split('_')[0]}
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {customerDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Customer
                </div>
                {customers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCustomer(c);
                      setCustomerDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition flex items-center justify-between mb-1 ${
                      c.id === currentCustomer.id
                        ? 'bg-blue-600/20 text-blue-200 border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-white">{c.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {c.tier.replace(/_/g, ' ')} • •••• {c.primaryCardLast4}
                      </div>
                    </div>
                    <span className="font-mono text-emerald-400 text-[11px] font-semibold">
                      ₹{c.balanceINR.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Project ZIP Button */}
          <button
            id="btn-download-project-zip"
            onClick={handleZipDownload}
            disabled={isExporting}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs px-3 py-1.5 rounded-lg shadow-md shadow-emerald-700/20 transition disabled:opacity-50"
            title="Download full project repository as ZIP file"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="font-semibold hidden sm:inline">
              {isExporting ? 'Packaging...' : 'Export ZIP'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-800 gap-1 text-xs bg-slate-950">
        <button
          onClick={() => onSelectTab('CHAT')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'CHAT' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          💬 Chat
        </button>
        <button
          onClick={() => onSelectTab('COCKPIT')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'COCKPIT' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          🧠 Reasoning
        </button>
        <button
          onClick={() => onSelectTab('TAXONOMY')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'TAXONOMY' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          📂 26 Intents
        </button>
        <button
          onClick={() => onSelectTab('KB')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'KB' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          ⚡ KB (&lt;200ms)
        </button>
        <button
          onClick={() => onSelectTab('HITL')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'HITL' ? 'bg-rose-600 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          🚨 HITL ({pendingEscalationsCount})
        </button>
        <button
          onClick={() => onSelectTab('LEARNING')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'LEARNING' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400'
          }`}
        >
          📈 Learning & Safety
        </button>
      </div>
    </header>
  );
};
