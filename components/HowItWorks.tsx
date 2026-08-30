"use client";

import React from "react";
import { Camera, Sparkles, HeartHandshake, ShieldCheck, Scale, AlertOctagon } from "lucide-react";
import { ScanMode } from "@/lib/types";

interface HowItWorksProps {
  onOpenScan: (mode: ScanMode) => void;
}

export default function HowItWorks({ onOpenScan }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            How Your Dr. Keeps You Safe
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Designed for everyone from kids to grandparents — take a photo and get clear, instant clinical and product clarity.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/80 space-y-4 hover:shadow-lg transition group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
              📸
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">Step 01</span>
            <h3 className="text-xl font-bold text-slate-900">Snap or Upload</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Take a clear picture of any tablet cover, syrup bottle, shampoo, chips packet, or hair oil using your camera or phone gallery.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/80 space-y-4 hover:shadow-lg transition group">
            <div className="w-14 h-14 rounded-2xl bg-teal-100/70 text-teal-700 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
              🧠
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700">Step 02</span>
            <h3 className="text-xl font-bold text-slate-900">AI Deep Analysis</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our dual OCR & reasoning engine deciphers active chemicals, contraindications, long-term organ impacts, and weight gain factors.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/80 space-y-4 hover:shadow-lg transition group">
            <div className="w-14 h-14 rounded-2xl bg-purple-100/70 text-purple-700 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
              🌿
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">Step 03</span>
            <h3 className="text-xl font-bold text-slate-900">Decide with Confidence</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Get color-coded safety badges, dosage notes, doctor prescription requirements, and cleaner, safer everyday alternatives.
            </p>
          </div>

        </div>

        {/* Feature Grid Highlights */}
        <div id="about" className="mt-20 pt-16 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Created by Rakesh Soni
            </span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              Empowering Every Family with Instant Health Clarity
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Many people unintentionally consume harmful ingredients in everyday food or take prescription medicines without knowing their long-term effects on the liver, kidneys, or weight.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Your Dr.</strong> bridges that gap by transforming complex medical and chemical jargon into simple, actionable insights anyone can understand.
            </p>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => onOpenScan("medicine")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-2xl transition cursor-pointer"
              >
                Scan a Medicine Now
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-8 rounded-3xl border border-emerald-200/80 space-y-4">
            <h4 className="font-extrabold text-slate-900 text-lg">Key Health Features:</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Short & Long Term Side Effects:</strong> Uncover organ stress from daily use.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Prescription Check:</strong> Clear badge if doctor supervision is required.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Product & Food Safety:</strong> Flags palm oil, trans fat, sulfates & parabens.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Weight Gain / Loss Impact:</strong> Calorie load and metabolic guidance.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Zero-Prescription Mild Care:</strong> Safe OTC + home remedies for fever & headache.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
