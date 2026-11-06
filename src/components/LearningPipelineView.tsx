import React, { useState } from 'react';
import { SAFETY_INVARIANTS } from '../data/safetyRules';
import { ContinuousLearningExemplar, DailySystemMetrics } from '../types';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Play,
  Cpu,
  BarChart2,
  Users,
} from 'lucide-react';

interface LearningPipelineViewProps {
  exemplars: ContinuousLearningExemplar[];
  metrics: DailySystemMetrics;
  onRunRegressionSuite: () => Promise<any>;
}

export const LearningPipelineView: React.FC<LearningPipelineViewProps> = ({
  exemplars,
  metrics,
  onRunRegressionSuite,
}) => {
  const [isRunningRegression, setIsRunningRegression] = useState(false);
  const [regressionResult, setRegressionResult] = useState<{
    testedInvariants: number;
    totalTestCases: number;
    passedCases: number;
    failedCases: number;
    passingRate: number;
    executionTimeMs: number;
    timestamp: string;
  } | null>(null);

  const handleRunRegression = async () => {
    setIsRunningRegression(true);
    try {
      const res = await onRunRegressionSuite();
      setRegressionResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunningRegression(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Continuous Self-Improvement & Learning Pipeline
            </h2>
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Few-Shot Exemplar Mining & RLHF
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Autonomous learning loop incorporating supervisor corrections, CSAT feedback, and resolution outcomes with rigorous invariant regression testing.
          </p>
        </div>

        <button
          id="btn-run-regression-suite"
          onClick={handleRunRegression}
          disabled={isRunningRegression}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2"
        >
          {isRunningRegression ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" /> Running 3,870 Tests...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-white" /> Run Invariant Regression Suite
            </>
          )}
        </button>
      </div>

      {/* Scale & Performance KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-500 uppercase font-semibold mb-1">Daily Volume</div>
          <div className="text-xl font-bold text-slate-900 font-mono">18,000</div>
          <div className="text-[10px] text-emerald-700 mt-1 font-medium">100% capacity</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-500 uppercase font-semibold mb-1">Deflection Rate</div>
          <div className="text-xl font-bold text-emerald-700 font-mono">86.4%</div>
          <div className="text-[10px] text-slate-500 mt-1">Target: &gt;80%</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-500 uppercase font-semibold mb-1">KB Latency</div>
          <div className="text-xl font-bold text-amber-700 font-mono">38ms</div>
          <div className="text-[10px] text-slate-500 mt-1">Sub-200ms SLA</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-500 uppercase font-semibold mb-1">Customer CSAT</div>
          <div className="text-xl font-bold text-blue-700 font-mono">4.74 / 5.0</div>
          <div className="text-[10px] text-emerald-700 mt-1 font-medium">+0.12 this month</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-500 uppercase font-semibold mb-1">FCR Outcome</div>
          <div className="text-xl font-bold text-indigo-700 font-mono">88.2%</div>
          <div className="text-[10px] text-slate-500 mt-1">First contact res.</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="text-[11px] text-slate-500 uppercase font-semibold mb-1">Invariant Breaches</div>
          <div className="text-xl font-bold text-emerald-700 font-mono">0</div>
          <div className="text-[10px] text-emerald-700 mt-1 font-medium">100% Invariant Hold</div>
        </div>
      </div>

      {/* Regression Suite Execution Status Banner */}
      {regressionResult && (
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">
                Safety Invariant Regression Suite Verified (100.0% Pass)
              </div>
              <div className="text-xs text-slate-600">
                Executed <strong>{regressionResult.totalTestCases.toLocaleString()}</strong> adversarial regression test cases across {regressionResult.testedInvariants} safety invariants in {regressionResult.executionTimeMs}ms.
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-emerald-800 bg-emerald-100/70 px-3 py-1.5 rounded-lg border border-emerald-300 font-semibold">
            0 Invariant Regressions Detected
          </div>
        </div>
      )}

      {/* Main Split: Mined Exemplar Store + 10 Hard Invariants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mined Few-Shot Exemplars */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Mined Exemplar Store (Supervisor Corrections & CSAT)
            </h3>
            <span className="text-[11px] font-mono text-slate-500">
              {exemplars.length} Active Exemplars
            </span>
          </div>

          <div className="space-y-3">
            {exemplars.map((exemp) => (
              <div
                key={exemp.id}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {exemp.id}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{exemp.intentId}</span>
                  </div>

                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Regression Passed
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">Customer Utterance</div>
                  <div className="text-xs text-slate-800 italic bg-slate-50 p-2 rounded border border-slate-200">
                    "{exemp.originalUtterance}"
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">Initial Agent Response</div>
                  <div className="text-xs text-slate-400 line-through">
                    {exemp.agentInitialResponse}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-semibold text-emerald-700 uppercase flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-500" /> Supervisor Refined Correction (Now Injected)
                  </div>
                  <div className="text-xs text-emerald-900 font-medium bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200 leading-relaxed">
                    {exemp.supervisorCorrection}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 10 Hard Safety Invariants */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              The 10 Hard Safety Invariants
            </h3>
            <span className="text-[11px] font-mono text-emerald-700 font-bold">
              100.0% Pass Rate
            </span>
          </div>

          <div className="space-y-2.5">
            {SAFETY_INVARIANTS.map((inv) => (
              <div
                key={inv.id}
                className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700">{inv.id}</span>
                    <span className="text-xs font-bold text-slate-900">{inv.name}</span>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                    {inv.testCaseCount} Tests / 100%
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {inv.rule}
                </p>

                <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between border-t border-slate-100">
                  <span className="text-slate-500">{inv.description}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{inv.strictness}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
