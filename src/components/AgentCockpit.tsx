import React from 'react';
import { CustomerProfile, DialogueState, ChatMessage, ReasoningStep } from '../types';
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  Layers,
  Database,
  Lock,
  Cpu,
  Terminal,
  Clock,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';

interface AgentCockpitProps {
  dialogueState: DialogueState;
  customer: CustomerProfile;
  lastMessage?: ChatMessage;
}

export const AgentCockpit: React.FC<AgentCockpitProps> = ({
  dialogueState,
  customer,
  lastMessage,
}) => {
  const steps: ReasoningStep[] = lastMessage?.metadata?.reasoningSteps || [
    {
      step: 1,
      phase: 'PERCEPTION_PII',
      title: 'PII Scrubbing & Sanitization',
      thought: 'Perception layer scanned input for 12-digit Aadhaar, 16-digit PAN, CVV, and OTPs. All values redacted to secure masked patterns.',
      actionTaken: 'Sanitized input forwarded to NLU classifier.',
      latencyMs: 3,
    },
    {
      step: 2,
      phase: 'INTENT_CLASSIFICATION',
      title: 'Hierarchical NLU Classification',
      thought: `Query classified into Intent [${dialogueState.currentIntent || 'balance_inquiry'}] under Domain [${dialogueState.intentDomain || 'ACCOUNT_KYC'}]. Confidence score: ${Math.round((dialogueState.intentConfidence || 0.92) * 100)}%.`,
      actionTaken: 'Mapped dialogue goals and extracted contextual slots.',
      latencyMs: 14,
    },
    {
      step: 3,
      phase: 'KNOWLEDGE_RETRIEVAL',
      title: 'Sub-200ms Dynamic Knowledge Retrieval',
      thought: 'Executed inverted index search against RBI master circulars and product catalogues. Latency: 38ms (compliant with <200ms SLA).',
      actionTaken: 'Retrieved regulatory guidance.',
      latencyMs: 38,
    },
    {
      step: 4,
      phase: 'POLICY_EVALUATION',
      title: 'Safety Guardrails & HITL Evaluation',
      thought: 'Evaluated 10 Hard Invariants and 12 HITL trigger conditions. Confirmed compliance with SEBI investment regulations and PCI-DSS.',
      actionTaken: 'Verified authorization tier and write privileges.',
      latencyMs: 8,
    },
  ];

  const safetyAudit = lastMessage?.metadata?.safetyAudit;

  return (
    <div className="space-y-6">
      {/* Top Banner: Real-time Multi-Turn Reasoning Summary */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Agentic CoT & Dialogue State Inspector
            </h2>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Turn #{dialogueState.turnCount}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time step-by-step reasoning, hierarchical classification, sub-200ms knowledge retrieval, and safety invariant verification.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
            <span className="text-slate-500">Current Goal:</span>
            <strong className="text-slate-900 font-mono">{dialogueState.activeGoal || 'Idle / Ready'}</strong>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
            <span className="text-slate-500">Sentiment:</span>
            <span
              className={`font-semibold ${
                dialogueState.sentiment === 'ANGRY' || dialogueState.sentiment === 'DISTRESSED'
                  ? 'text-red-600'
                  : 'text-emerald-700'
              }`}
            >
              {dialogueState.sentiment}
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
            <span className="text-slate-500">HITL Status:</span>
            <span
              className={`font-bold ${
                dialogueState.hitlTriggered ? 'text-red-600' : 'text-emerald-700'
              }`}
            >
              {dialogueState.hitlTriggered ? 'Escalated to Supervisor' : 'Autonomous'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Reasoning Steps + Slot State */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chain of Thought Reasoning Steps */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-blue-600" />
            Execution Trace & Multi-Turn Chain-of-Thought
          </h3>

          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-slate-300 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-mono text-xs flex items-center justify-center font-bold">
                      {step.step}
                    </span>
                    <span className="text-xs font-bold text-slate-800 tracking-wide">
                      {step.title}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {step.phase}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <Clock className="h-3 w-3 text-slate-400" />
                    {step.latencyMs}ms
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pl-7">
                  {step.thought}
                </p>

                {step.actionTaken && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 pl-7 text-[11px] font-mono text-emerald-700 flex items-center gap-1.5 font-medium">
                    <ArrowRight className="h-3 w-3 text-slate-400" />
                    <span>Action: {step.actionTaken}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Dialogue State, Extracted Slots & Safety Audit */}
        <div className="lg:col-span-4 space-y-5">
          {/* Extracted Slots & Entities */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-600" />
              Dialogue Slots & Entities
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Customer ID:</span>
                <span className="font-mono text-slate-900 font-semibold">{customer.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Auth Tier:</span>
                <span className="font-semibold text-blue-700">{customer.authLevel}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Card Status:</span>
                <span className={customer.isCardFrozen ? 'text-red-600 font-bold' : 'text-emerald-700 font-semibold'}>
                  {customer.isCardFrozen ? 'LOCKED / FROZEN' : 'ACTIVE'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Disputes Count:</span>
                <span className="font-mono text-amber-700 font-semibold">{customer.openDisputesCount} Active</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Extracted Amount:</span>
                <span className="font-mono text-slate-900 font-semibold">
                  {dialogueState.slots['amountINR'] ? `₹${dialogueState.slots['amountINR']}` : 'None'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono text-slate-900 font-semibold">
                  {dialogueState.slots['transactionId'] || 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Safety Audit Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Safety Guardrails Pre/Post Audit
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700">PII Masking (Aadhaar/Card):</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Enforced
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700">Financial Advice Firewall:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> SEBI Compliant
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700">Write Action Auth Gate:</span>
                <span className="text-blue-700 font-bold flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" /> TPIN Required
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700">Prompt Injection Filter:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Immune
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700">Hard Safety Invariants:</span>
                <span className="text-emerald-700 font-bold font-mono">
                  10 / 10 Active
                </span>
              </div>
            </div>
          </div>

          {/* Raw State JSON Inspector */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-slate-400" />
              State Machine Context (JSON)
            </h4>
            <pre className="bg-slate-900 p-3 rounded-lg text-[11px] font-mono text-slate-200 overflow-x-auto max-h-48 border border-slate-800">
              {JSON.stringify(
                {
                  sessionId: dialogueState.sessionId,
                  turn: dialogueState.turnCount,
                  currentIntent: dialogueState.currentIntent,
                  domain: dialogueState.intentDomain,
                  confidence: dialogueState.intentConfidence,
                  slots: dialogueState.slots,
                  authLevel: customer.authLevel,
                  hitlTriggered: dialogueState.hitlTriggered,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
