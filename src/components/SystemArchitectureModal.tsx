import React from 'react';
import { X, ShieldCheck, Cpu, Database, Layers, Zap, Sparkles, Download } from 'lucide-react';
import { downloadFullProjectZip } from '../utils/zipGenerator';

interface SystemArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemArchitectureModal: React.FC<SystemArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Production Architecture Spec
              </span>
              <span className="text-xs text-slate-500 font-mono">Project 1C: NexBank</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              NexBank Autonomous Customer Service Agent
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Production-Grade, Self-Improving Agentic AI System for 2.7M Customers & 18,000 Daily Interactions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadFullProjectZip()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export ZIP</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scale & Specifications Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-[10px] font-semibold text-slate-500 uppercase">Customer Base</div>
            <div className="text-lg font-bold text-slate-900 font-mono">2.7 Million</div>
            <div className="text-[11px] text-blue-600">NexBank Neo-Banking</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-[10px] font-semibold text-slate-500 uppercase">Daily Traffic</div>
            <div className="text-lg font-bold text-slate-900 font-mono">18,000 Ops</div>
            <div className="text-[11px] text-emerald-700">86.4% Deflection</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-[10px] font-semibold text-slate-500 uppercase">KB Retrieval Latency</div>
            <div className="text-lg font-bold text-amber-600 font-mono">38ms</div>
            <div className="text-[11px] text-slate-500">&lt;200ms Hard SLA</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-[10px] font-semibold text-slate-500 uppercase">Safety Breaches</div>
            <div className="text-lg font-bold text-emerald-700 font-mono">0 Invariants</div>
            <div className="text-[11px] text-emerald-700">100% Invariant Hold</div>
          </div>
        </div>

        {/* Architectural Flow Diagram */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Cpu className="h-4 w-4 text-blue-600" />
            End-to-End Conversational & Agentic Flow
          </h3>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 font-mono text-xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-blue-700 font-bold mb-1 flex items-center gap-1.5 font-sans">
                  <span className="h-2 w-2 rounded-full bg-blue-600" /> Phase 1: Ingestion
                </div>
                <ul className="text-slate-600 text-[11px] space-y-1 list-disc pl-4 font-sans">
                  <li>Inbound User Utterance</li>
                  <li><strong>PII Sanitization</strong> (Aadhaar, PAN, CVV, OTP)</li>
                  <li>Multi-turn Session Context Loaded</li>
                </ul>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-indigo-700 font-bold mb-1 flex items-center gap-1.5 font-sans">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" /> Phase 2: Reasoning
                </div>
                <ul className="text-slate-600 text-[11px] space-y-1 list-disc pl-4 font-sans">
                  <li><strong>Hierarchical NLU</strong> (26 Intents across 6 Domains)</li>
                  <li><strong>Sub-200ms Dynamic KB</strong> (RBI Grounding)</li>
                  <li>Contextual Slot Extraction & Goal Mapping</li>
                </ul>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-emerald-700 font-bold mb-1 flex items-center gap-1.5 font-sans">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" /> Phase 3: Gate & Synthesis
                </div>
                <ul className="text-slate-600 text-[11px] space-y-1 list-disc pl-4 font-sans">
                  <li><strong>10 Safety Invariants</strong> Firewall</li>
                  <li><strong>12 HITL Triggers</strong> Check (Escalation / Takeover)</li>
                  <li>Response Synthesis + Action Execution</li>
                </ul>
              </div>
            </div>

            {/* Continuous Self-Improvement Loop Banner */}
            <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 text-[11px] font-sans flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <strong className="text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Continuous Self-Learning Feedback Loop
                </strong>
                <p className="text-slate-600 mt-0.5">
                  Supervisor Corrections + Customer CSAT Scores + Outcome Verification &rarr; Exemplar Store &rarr; Dynamic Few-Shot Invariant Regression &rarr; Model Policy Update.
                </p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-1 rounded whitespace-nowrap font-mono font-bold">
                Zero Invariant Degradation
              </span>
            </div>
          </div>
        </div>

        {/* Regulatory Framework Grounding */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Reserve Bank of India (RBI) & Indian Regulatory Grounding
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <strong className="text-slate-900">RBI/2017-18/15 (Zero Liability Circular)</strong>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Zero liability for customer when unauthorized electronic transaction reported within 3 working days. Mandatory shadow reversal credit within 10 working days.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <strong className="text-slate-900">DPSS.CO.PD No.629/02.01.014/2019-20 (TAT Harmonisation)</strong>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Failed UPI/ATM transactions must be auto-reversed by T+1 day. Banks liable for ₹100 per day penalty for delayed auto-reversals beyond TAT.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <strong className="text-slate-900">Reserve Bank - Integrated Ombudsman Scheme 2021</strong>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Transparent 30-day escalation ladder. Customer automatically provided Ombudsman portal details (cms.rbi.org.in) if complaint unresolved after 30 days.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <strong className="text-slate-900">DICGC Insurance & SEBI Advisory Regulations</strong>
              <p className="text-slate-600 mt-1 leading-relaxed">
                NexBank deposits insured up to ₹5,00,000 under DICGC. AI agent strictly firewalled against giving uncertified speculative stock/crypto trading advice.
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs px-5 py-2.5 rounded-xl font-medium transition"
          >
            Close Architecture Spec
          </button>
        </div>
      </div>
    </div>
  );
};
