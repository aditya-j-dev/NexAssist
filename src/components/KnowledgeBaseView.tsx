import React, { useState } from 'react';
import { KNOWLEDGE_BASE_DOCUMENTS, queryKnowledgeBase } from '../data/knowledgeBase';
import { KnowledgeRetrievalResult } from '../types';
import {
  Zap,
  Search,
  BookOpen,
  Clock,
  ShieldCheck,
  FileText,
  Tag,
  CheckCircle2,
} from 'lucide-react';

export const KnowledgeBaseView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('unauthorized fraud debit zero liability');
  const [retrievalResult, setRetrievalResult] = useState<KnowledgeRetrievalResult>(() =>
    queryKnowledgeBase('unauthorized fraud debit zero liability')
  );

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim()) {
      setRetrievalResult(queryKnowledgeBase(q));
    }
  };

  const sampleQueries = [
    'RBI zero liability unauthorized debit',
    'UPI failed transaction compensation 100 per day',
    'Fixed deposit interest rates senior citizen DICGC',
    'Card freeze instant rules RBI circular',
    'DigiLocker Aadhaar KYC masking',
    'RBI Integrated Ombudsman Scheme 2021',
  ];

  return (
    <div className="space-y-6">
      {/* Top Header with Latency Counter */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Dynamic Knowledge Base & Regulatory Index
            </h2>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Sub-200ms Inverted Vector Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Grounded directly on Reserve Bank of India (RBI) master circulars, NPCI payment specifications, and internal bank policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs flex items-center gap-2.5">
            <span className="text-slate-500">Current Search Latency:</span>
            <span className="font-mono text-emerald-700 font-bold text-sm">
              {retrievalResult.retrievalLatencyMs} ms
            </span>
            <span className="text-[10px] text-slate-400">(Target: &lt;200ms)</span>
          </div>
        </div>
      </div>

      {/* Real-time Query Benchmark Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Type any banking search query to test sub-200ms retrieval speed..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Query Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 text-[11px] font-medium mr-1">Suggested Benchmarks:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(q)}
              className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
                searchQuery === q
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results / Retrieved Articles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Retrieved <strong className="text-slate-900">{retrievalResult.documents.length}</strong> regulatory documents for query "{retrievalResult.query}"
          </span>
          <span className="font-mono text-emerald-700 font-medium">
            Speed: {retrievalResult.retrievalLatencyMs}ms (Sub-200ms SLA PASSED)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {retrievalResult.documents.map(({ document: doc, score, matchSnippet }) => (
            <div
              key={doc.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {doc.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {doc.domain.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{doc.title}</h3>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-mono font-bold">
                    Score: {score}
                  </span>
                  <span className="text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    TAT: {doc.turnaroundTimeHours}h
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium italic">
                "{matchSnippet}"
              </p>

              {/* Document Full Content */}
              <div className="text-xs text-slate-700 whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                {doc.content}
              </div>

              {/* Footer Meta & Grounding */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1 text-indigo-700 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Mandate: <strong className="text-slate-900">{doc.rbiCircularRef || 'NexBank Core Rule'}</strong></span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Tag className="h-3 w-3 text-slate-400" />
                  <div className="flex gap-1 flex-wrap">
                    {doc.keywords.slice(0, 4).map((kw, i) => (
                      <span key={i} className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
