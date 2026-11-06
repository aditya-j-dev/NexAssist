import React, { useState } from 'react';
import { HITL_TRIGGER_CONDITIONS } from '../data/safetyRules';
import { HitlEscalationTicket } from '../types';
import {
  AlertTriangle,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Flame,
  Check,
} from 'lucide-react';

interface HitlQueueViewProps {
  tickets: HitlEscalationTicket[];
  onTakeoverTicket: (ticketId: string) => void;
  onResolveTicketWithCorrection: (ticketId: string, correction: string) => void;
}

export const HitlQueueView: React.FC<HitlQueueViewProps> = ({
  tickets,
  onTakeoverTicket,
  onResolveTicketWithCorrection,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<HitlEscalationTicket | null>(
    tickets[0] || null
  );
  const [correctionText, setCorrectionText] = useState('');
  const [resolutionSuccess, setResolutionSuccess] = useState(false);

  const handleTakeover = (t: HitlEscalationTicket) => {
    onTakeoverTicket(t.id);
    setSelectedTicket({ ...t, status: 'IN_REVIEW', assignedSupervisor: 'Current Supervisor (You)' });
  };

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !correctionText.trim()) return;
    onResolveTicketWithCorrection(selectedTicket.id, correctionText.trim());
    setResolutionSuccess(true);
    setTimeout(() => {
      setResolutionSuccess(false);
      setCorrectionText('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Human-in-the-Loop (HITL) Escalation Framework
            </h2>
            <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              12 Trigger Conditions Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Deterministic escalation framework ensuring high-risk disputes, extreme sentiment, vulnerability, and legal notices are routed directly to banking supervisors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
            <span className="text-slate-500">Pending Escalations:</span>
            <span className="font-mono text-red-600 font-bold text-sm">
              {tickets.filter((t) => t.status === 'PENDING_SUPERVISOR').length} Tickets
            </span>
          </div>
        </div>
      </div>

      {/* 12 Trigger Conditions Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          The 12 Production Trigger Conditions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {HITL_TRIGGER_CONDITIONS.map((cond) => (
            <div
              key={cond.id}
              className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-start justify-between gap-2 text-xs"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                      cond.severity === 'CRITICAL'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : cond.severity === 'HIGH'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {cond.severity}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{cond.id}</span>
                </div>
                <div className="font-semibold text-slate-900 text-xs mb-0.5">{cond.name}</div>
                <div className="text-[11px] text-slate-500 line-clamp-2">{cond.thresholdCriteria}</div>
              </div>

              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-0.5 whitespace-nowrap">
                <Clock className="h-3 w-3 text-slate-400" /> {cond.rbiSlaMinutes}m
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Ticket Escalation Queue & Takeover Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tickets List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Active Incident Escalation Queue</span>
            <span className="text-[11px] font-mono text-slate-400">{tickets.length} Incidents</span>
          </h3>

          <div className="space-y-2.5">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  selectedTicket?.id === ticket.id
                    ? 'bg-blue-50/60 border-blue-500 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">#{ticket.id}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                        ticket.severity === 'CRITICAL'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {ticket.severity}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">{ticket.createdAt}</span>
                </div>

                <div className="font-bold text-slate-900 text-xs mb-1">{ticket.customerName}</div>
                <div className="text-xs text-red-600 font-medium mb-2 flex items-center gap-1">
                  <Flame className="h-3 w-3" /> {ticket.triggerName}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 italic bg-slate-50 p-2 rounded border border-slate-200">
                  "{ticket.customerMessage}"
                </p>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Sentiment: <strong className="text-red-600">{ticket.sentiment}</strong></span>
                  <span className={`font-semibold ${
                    ticket.status === 'RESOLVED_OVERRIDE'
                      ? 'text-emerald-700'
                      : ticket.status === 'IN_REVIEW'
                      ? 'text-blue-700'
                      : 'text-amber-700'
                  }`}>
                    {ticket.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Supervisor Cockpit & Learning Correction Editor */}
        <div className="lg:col-span-7">
          {selectedTicket ? (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Incident #{selectedTicket.id}</div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedTicket.triggerName}</h3>
                </div>

                <div className="flex items-center gap-2">
                  {selectedTicket.status !== 'IN_REVIEW' && selectedTicket.status !== 'RESOLVED_OVERRIDE' && (
                    <button
                      onClick={() => handleTakeover(selectedTicket)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 shadow-xs"
                    >
                      <UserCheck className="h-3.5 w-3.5" /> Take Over Ticket
                    </button>
                  )}
                  <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200 font-medium">
                    Risk Score: {selectedTicket.riskScore}/100
                  </span>
                </div>
              </div>

              {/* Customer Input Box */}
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Customer Query (Triggered Escalation)
                </label>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans">
                  {selectedTicket.customerMessage}
                </div>
              </div>

              {/* Agent Proposed Draft */}
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  AI Agent Proposed Response
                </label>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
                  {selectedTicket.agentProposedResponse}
                </div>
              </div>

              {/* Supervisor Override & Few-Shot Learning Editor */}
              <form onSubmit={handleResolve} className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                    Inject Supervisor Correction & Update Self-Learning Memory
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Mined directly into Continuous Learning Exemplars
                  </span>
                </div>

                <textarea
                  value={correctionText}
                  onChange={(e) => setCorrectionText(e.target.value)}
                  placeholder="Draft supervisor verified response. For example: Immediately invoke RBI Zero Liability, quote 3-day reporting rule, confirm card freeze, and credit temporary shadow reversal..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                />

                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-slate-500">
                    Saves correction and triggers continuous learning regression check.
                  </p>
                  <button
                    type="submit"
                    disabled={!correctionText.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-medium text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {resolutionSuccess ? 'Saved to Learning Pipeline!' : 'Resolve with Correction'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 text-xs">
              Select an escalated ticket from the queue to inspect and intervene.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
