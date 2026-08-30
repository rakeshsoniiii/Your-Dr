"use client";

import React from "react";
import { Heart, Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Logo + Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.99 12 5.5C10.5 3.99 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 9V15M9 12H15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-white tracking-tight">Your Dr.</span>
              </div>
              <p className="text-xs text-slate-400">Know. Decide. Stay Healthy.</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300">
            <a href="#home" className="hover:text-emerald-400 transition">Home</a>
            <a href="#remedies" className="hover:text-emerald-400 transition">Safe Remedies</a>
            <a href="#how-it-works" className="hover:text-emerald-400 transition">How it Works</a>
            <a href="#about" className="hover:text-emerald-400 transition">About</a>
          </div>

          {/* Creator Credit */}
          <div className="text-xs text-center md:text-right">
            <p className="text-slate-300 font-semibold">A project made with ❤️ by <span className="text-emerald-400 font-bold">Rakesh Soni</span></p>
            <p className="text-[11px] text-slate-500 mt-0.5">Powered by Groq High-Speed AI & Tesseract OCR</p>
          </div>

        </div>

        {/* Disclaimer note */}
        <div className="pt-6 text-center text-[11px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Disclaimer: Your Dr. is an educational AI safety assistant and does not replace certified professional medical consultation, diagnosis, or treatment. Always read original packaging inserts and consult a certified medical practitioner for health emergencies.
        </div>
      </div>
    </footer>
  );
}
