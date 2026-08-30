"use client";

import React, { useState } from "react";
import {
  X,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  ShieldCheck,
  Scale,
  Calendar,
  Sparkles,
  Pill,
  Share2,
  ArrowRight,
  Info
} from "lucide-react";
import { MedicineResult, ProductResult, ScanMode, HealthRating } from "@/lib/types";

interface ResultModalProps {
  isOpen: boolean;
  mode: ScanMode;
  result: MedicineResult | ProductResult | null;
  previewImage?: string;
  onClose: () => void;
  onScanAnother: () => void;
}

export default function ResultModal({
  isOpen,
  mode,
  result,
  previewImage,
  onClose,
  onScanAnother,
}: ResultModalProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen || !result) return null;

  const isMedicine = mode === "medicine";
  const med = result as MedicineResult;
  const prod = result as ProductResult;

  // Text-To-Speech for elders and kids
  const toggleSpeech = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let speechText = "";
    if (isMedicine) {
      speechText = `${med.name}. Used for: ${med.usage}. Health rating is ${med.healthRating}. ${med.prescriptionRequired ? "Doctor prescription is required." : "No prescription required."} Important side effect warning: ${med.dailyUseWarning}`;
    } else {
      speechText = `${prod.name}. ${prod.safetyNote}. Health rating: ${prod.healthRating}. Weight impact: ${prod.weightNote}. Daily use advice: ${prod.dailyUseAdvice}`;
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const getRatingBadge = (rating: HealthRating) => {
    switch (rating) {
      case "safe":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          label: "Safe to Use",
        };
      case "caution":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          label: "Use with Caution",
        };
      case "danger":
        return {
          bg: "bg-red-50 text-red-800 border-red-200",
          icon: <AlertOctagon className="w-5 h-5 text-red-600" />,
          label: "Doctor Supervised Only",
        };
    }
  };

  const badge = getRatingBadge(result.healthRating || "caution");

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 sticky -top-6 bg-white z-10 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {isMedicine ? "💊 Medicine Analysis" : "🛒 Product Safety Analysis"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSpeech}
              title="Listen to analysis (Elder Friendly)"
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition cursor-pointer ${
                isSpeaking
                  ? "bg-emerald-600 text-white border-emerald-600 animate-pulse"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
              <span className="hidden sm:inline">{isSpeaking ? "Stop" : "Read Aloud"}</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="mt-6 space-y-6">
          
          {/* Main Title & Image Header */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {previewImage && (
              <img
                src={previewImage}
                alt="Product thumbnail"
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-slate-200 shadow-sm shrink-0"
              />
            )}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                {result.name || "Item Details"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {isMedicine ? (
                  <span>{med.genericName ? `Salt: ${med.genericName} • ` : ""}{med.type || "Medicine"}</span>
                ) : (
                  <span>{prod.brand ? `Brand: ${prod.brand} • ` : ""}{prod.category || "Consumer Product"}</span>
                )}
              </p>

              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2.5 mt-3">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-extrabold ${badge.bg}`}>
                  {badge.icon}
                  <span>{badge.label}</span>
                </div>

                {isMedicine ? (
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${
                    med.prescriptionRequired
                      ? "bg-red-50 text-red-800 border-red-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}>
                    <span>{med.prescriptionRequired ? "🔴 Doctor Prescription Required" : "🟢 OTC (No Prescription Needed)"}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-800 text-xs font-bold">
                    <span>⭐ Safety Score: {prod.rating || "8"}/10</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Health Verdict */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Health Verdict
            </h4>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {isMedicine ? med.healthNote : prod.healthNote}
            </p>
          </div>

          {/* MEDICINE SPECIFIC SECTIONS */}
          {isMedicine && (
            <div className="space-y-4">
              
              {/* Uses */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
                  <span>💡</span>
                  <span>What It&apos;s Used For</span>
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed">{med.usage}</p>
                {med.dosage && (
                  <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-emerald-100">
                    <strong className="text-slate-800">Dosage Note:</strong> {med.dosage}
                  </p>
                )}
              </div>

              {/* Side Effects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Short term */}
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>Short-Term Side Effects</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 pl-1">
                    {med.shortTermSideEffects?.map((effect, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500">•</span>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Long term */}
                <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200/60 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                    <span>⏳</span>
                    <span>Long-Term Side Effects</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 pl-1">
                    {med.longTermSideEffects?.map((effect, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-500">•</span>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Daily Use Warning */}
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-red-800">
                  <AlertOctagon className="w-4 h-4 text-red-600" />
                  <span>Crucial: Daily Use Warning</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {med.dailyUseWarning}
                </p>
              </div>

              {/* Prescription Note & Safe Alternatives */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <h5 className="font-bold text-slate-900">Doctor Prescription Advice:</h5>
                  <p>{med.prescriptionNote}</p>
                </div>

                {med.safeAlternatives && med.safeAlternatives.length > 0 && (
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs text-teal-900 space-y-1">
                    <h5 className="font-bold text-teal-950">Mild / Natural Alternatives:</h5>
                    <ul className="pl-2 space-y-0.5">
                      {med.safeAlternatives.map((alt, i) => (
                        <li key={i} className="list-disc list-inside">{alt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* PRODUCT SPECIFIC SECTIONS */}
          {!isMedicine && (
            <div className="space-y-4">
              
              {/* Safety & Daily Use Advice */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <span>🛡️</span>
                  <span>Safety & Daily Use Advice</span>
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed">{prod.safetyNote}</p>
                <p className="text-xs text-slate-600 pt-1 border-t border-emerald-100">
                  <strong className="text-slate-800">Frequency:</strong> {prod.dailyUseAdvice}
                </p>
              </div>

              {/* Weight Impact Card */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-purple-600" />
                    <span>Weight Gain / Loss Impact</span>
                  </h4>
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    prod.weightImpact === "weight_gain" ? "bg-red-100 text-red-800" :
                    prod.weightImpact === "weight_loss" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"
                  }`}>
                    {prod.weightImpact === "weight_gain" ? "⬆️ May Promote Weight Gain" :
                     prod.weightImpact === "weight_loss" ? "⬇️ Weight-Loss Friendly" : "➡️ Neutral Impact"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {prod.weightNote}
                </p>
              </div>

              {/* Ingredients Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Key Ingredients */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <span>🧪</span>
                    <span>Key Ingredients</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1 pl-1">
                    {prod.keyIngredients?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Harmful Ingredients */}
                <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200/60 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                    <span>⚠️</span>
                    <span>Harmful / Questionable</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1 pl-1">
                    {prod.harmfulIngredients && prod.harmfulIngredients.length > 0 ? (
                      prod.harmfulIngredients.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-red-500 font-bold">✗</span>
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-emerald-700 font-medium">No major toxic chemicals flagged.</li>
                    )}
                  </ul>
                </div>

              </div>

              {/* Better Cleaner Alternatives */}
              {prod.betterAlternatives && prod.betterAlternatives.length > 0 && (
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span>Healthier & Cleaner Alternatives</span>
                  </h4>
                  <ul className="text-xs text-slate-800 pl-2 space-y-0.5">
                    {prod.betterAlternatives.map((alt, i) => (
                      <li key={i} className="list-disc list-inside">{alt}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onScanAnother}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Scan Another Item</span>
          </button>
          <button
            onClick={onClose}
            className="py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-sm transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
