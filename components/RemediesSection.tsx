"use client";

import React, { useState } from "react";
import { COMMON_REMEDIES } from "@/lib/remediesData";
import { QuickRemedyItem } from "@/lib/types";
import { Sparkles, ShieldCheck, CheckCircle2, AlertTriangle, Stethoscope, Search, Info, HelpCircle } from "lucide-react";

interface RemediesSectionProps {
  onSelectRemedy?: (remedy: QuickRemedyItem) => void;
}

export default function RemediesSection({ onSelectRemedy }: RemediesSectionProps) {
  const [selectedId, setSelectedId] = useState<string>("fever");
  const [customQuery, setCustomQuery] = useState("");
  const [customResult, setCustomResult] = useState<QuickRemedyItem | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const activeRemedy = customResult || COMMON_REMEDIES.find((r) => r.id === selectedId) || COMMON_REMEDIES[0];

  const handleCustomSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "remedy", textQuery: customQuery }),
      });
      const data = await res.json();
      if (data.result) {
        setCustomResult({
          id: "custom",
          icon: "🩺",
          ...data.result,
        });
      }
    } catch (err) {
      console.error("Remedy search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section id="remedies" className="py-16 bg-slate-50/80 border-t border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Prescription & Minimal Side-Effect Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Safe Relief for Everyday Issues
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Scientifically verified home care & mild OTC options for common issues like fever, headache, or acidity that don&apos;t require heavy drugs or doctor visits.
          </p>
        </div>

        {/* AI Symptom Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <form onSubmit={handleCustomSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Ask about any mild issue (e.g., 'mild throat itch', 'gas after dinner')..."
                className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-900 shadow-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !customQuery.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
            >
              {isSearching ? <span className="animate-spin">⏳</span> : <Sparkles className="w-4 h-4" />}
              <span>Get Advice</span>
            </button>
          </form>
        </div>

        {/* Quick Symptom Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {COMMON_REMEDIES.map((remedy) => (
            <button
              key={remedy.id}
              onClick={() => {
                setCustomResult(null);
                setSelectedId(remedy.id);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                selectedId === remedy.id && !customResult
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>{remedy.icon}</span>
              <span>{remedy.symptom}</span>
            </button>
          ))}
        </div>

        {/* Remedy Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl max-w-4xl mx-auto space-y-8">
          
          {/* Title and description */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl shrink-0">
                {activeRemedy.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">{activeRemedy.symptom}</h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Mild Issue
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">{activeRemedy.description}</p>
              </div>
            </div>
            <div className="bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200/70 text-emerald-900 text-xs font-semibold self-start sm:self-auto">
              🟢 No Doctor Prescription Required
            </div>
          </div>

          {/* Grid: Safe OTC vs Natural Home Remedies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Safe OTC Options */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4" />
                <span>Safe OTC Options (Minimal Side Effects)</span>
              </div>

              <div className="space-y-3">
                {activeRemedy.safeOtcOptions.map((opt, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-sm text-slate-900">{opt.name}</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Safe OTC
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed"><strong className="text-slate-800">How it works:</strong> {opt.howItWorks}</p>
                    <p className="text-xs text-slate-600"><strong className="text-slate-800">Typical dose:</strong> {opt.typicalDose}</p>
                    <p className="text-[11px] text-emerald-700 font-medium">✨ {opt.sideEffects}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Natural Home Remedies */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm uppercase tracking-wide">
                <span>🌿</span>
                <span>Natural Home Care & Comfort</span>
              </div>

              <div className="bg-teal-50/40 border border-teal-100 rounded-2xl p-5 space-y-3">
                <ul className="space-y-2.5">
                  {activeRemedy.homeRemedies.map((hr, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                      <span>{hr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Things to Avoid & Red Flag Warnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
            
            {/* What to avoid */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-amber-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-800">
                <AlertTriangle className="w-4 h-4" />
                <span>Things to Avoid</span>
              </div>
              <ul className="space-y-1 text-slate-700 pl-2">
                {activeRemedy.whatToAvoid.map((w, wi) => (
                  <li key={wi} className="list-disc list-inside">{w}</li>
                ))}
              </ul>
            </div>

            {/* When to see a doctor */}
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200/70 text-red-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-red-800">
                <Stethoscope className="w-4 h-4" />
                <span>When to Consult a Doctor</span>
              </div>
              <p className="text-slate-700 leading-relaxed">{activeRemedy.whenToSeeDoctor}</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
