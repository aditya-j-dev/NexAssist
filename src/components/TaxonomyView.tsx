import React, { useState } from 'react';
import { INTENT_TAXONOMY, INTENT_DOMAINS } from '../data/intentTaxonomy';
import { IntentDomain } from '../types';
import { classifyHierarchicalIntent } from '../utils/dialogueEngine';
import {
  Layers,
  Search,
  Sparkles,
  ShieldAlert,
  Lock,
  Clock,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export const TaxonomyView: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [testUtterance, setTestUtterance] = useState('My UPI payment failed but money was debited from my account');
  const [testResult, setTestResult] = useState(() => classifyHierarchicalIntent('My UPI payment failed but money was debited from my account'));

  const handleTestClassifier = (query: string) => {
    setTestUtterance(query);
    if (query.trim()) {
      setTestResult(classifyHierarchicalIntent(query));
    }
  };

  const filteredIntents = INTENT_TAXONOMY.filter((intent) => {
    const matchesDomain = selectedDomain === 'ALL' || intent.domain === selectedDomain;
    const matchesSearch =
      searchQuery === '' ||
      intent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intent.sampleUtterances.some((u) => u.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              26-Intent Hierarchical NLU Taxonomy
            </h2>
            <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
              6 Banking Domains
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Production-grade banking classification hierarchy with slot models, authentication tiers, and regulatory SLA mappings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
            <span className="text-slate-500">Total Intents:</span>
            <strong className="text-slate-900 font-mono text-sm">{INTENT_TAXONOMY.length}</strong>
          </div>
        </div>
      </div>

      {/* Interactive NLU Classifier Sandbox */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Live Hierarchical NLU Classifier Sandbox
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Enter any sample customer sentence to test real-time intent mapping, confidence scoring, and slot extraction.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={testUtterance}
            onChange={(e) => handleTestClassifier(e.target.value)}
            placeholder="e.g. Someone stole my card and debited ₹8499 at 11pm"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
          <button
            onClick={() => handleTestClassifier(testUtterance)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-xl font-medium transition shadow-xs"
          >
            Classify Query
          </button>
        </div>

        {/* Classifier Result Display */}
        {testResult && (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">
                Classified Domain & Intent
              </div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-xs">
                  {testResult.domain}
                </span>
                <span>{INTENT_TAXONOMY.find((i) => i.id === testResult.intentId)?.name || testResult.intentId}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">
                  NLU Confidence Score
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full ${
                        testResult.confidence >= 0.8
                          ? 'bg-emerald-500'
                          : testResult.confidence >= 0.65
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${testResult.confidence * 100}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    {Math.round(testResult.confidence * 100)}%
                  </span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">
                  Extracted Entities / Slots
                </div>
                <div className="font-mono text-emerald-700 font-semibold">
                  {Object.keys(testResult.extractedSlots).length > 0
                    ? JSON.stringify(testResult.extractedSlots)
                    : 'None extracted'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex overflow-x-auto gap-1.5 pb-1">
          <button
            onClick={() => setSelectedDomain('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap ${
              selectedDomain === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            All Domains ({INTENT_TAXONOMY.length})
          </button>
          {INTENT_DOMAINS.map((d) => (
            <button
              key={d.domain}
              onClick={() => setSelectedDomain(d.domain)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap ${
                selectedDomain === d.domain
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search intents or utterances..."
            className="w-full sm:w-64 bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Intent Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntents.map((intent) => (
          <div
            key={intent.id}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shadow-sm transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {intent.domainTitle}
                </span>

                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  SLA: {intent.slaMinutes}m
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm mb-1.5">{intent.name}</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                {intent.description}
              </p>

              {/* Sample Utterances */}
              <div className="mb-3">
                <div className="text-[10px] uppercase font-semibold text-slate-500 mb-1">
                  Training Utterances
                </div>
                <div className="space-y-1">
                  {intent.sampleUtterances.slice(0, 2).map((ut, idx) => (
                    <div
                      key={idx}
                      className="text-[11px] text-slate-700 bg-slate-50 px-2.5 py-1 rounded border border-slate-200/80 italic"
                    >
                      "{ut}"
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 flex items-center gap-1">
                Auth:
                <strong className={
                  intent.requiredAuthLevel === 'BIOMETRIC_2FA'
                    ? 'text-emerald-700'
                    : intent.requiredAuthLevel === 'TPIN_VERIFIED'
                    ? 'text-blue-700'
                    : 'text-slate-700'
                }>
                  {intent.requiredAuthLevel}
                </strong>
              </span>

              {intent.isAccountWriteAction && (
                <span className="text-amber-700 font-semibold flex items-center gap-1 text-[10px] bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                  <Lock className="h-3 w-3" /> Write Action
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
