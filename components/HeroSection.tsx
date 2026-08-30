"use client";

import React from "react";
import { Camera, ShoppingBag, Sparkles, ShieldCheck, Users, HeartPulse, ArrowRight, Pill, Sparkle } from "lucide-react";
import { ScanMode, RecentScanItem } from "@/lib/types";

interface HeroSectionProps {
  onOpenScan: (mode: ScanMode) => void;
  onOpenRemedies: () => void;
  onSelectRecent: (item: RecentScanItem) => void;
  recentScans: RecentScanItem[];
}

export default function HeroSection({
  onOpenScan,
  onOpenRemedies,
  onSelectRecent,
  recentScans,
}: HeroSectionProps) {
  return (
    <section id="home" className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>AI Powered Health Scanner</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Scan it.<br />
                <span className="text-emerald-700">Understand it.</span><br />
                Use it wisely.
              </h1>
              <p className="pt-4 text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Get instant AI-powered insights about medicines and everyday products.
                Know the uses, short & long-term side effects, prescription requirements, and if it&apos;s truly safe for you.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenScan("medicine")}
                className="group inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-7 py-4 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Camera className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Scan Medicine</span>
              </button>

              <button
                onClick={() => onOpenScan("product")}
                className="group inline-flex items-center gap-2.5 bg-purple-50 hover:bg-purple-100/80 text-purple-900 border border-purple-200 font-bold text-base px-7 py-4 rounded-2xl shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-purple-600 transition-transform group-hover:scale-110" />
                <span>Scan Product</span>
              </button>

              <button
                onClick={onOpenRemedies}
                className="inline-flex items-center gap-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 font-semibold text-sm px-5 py-4 rounded-2xl transition cursor-pointer"
              >
                <span>🌿 Fever, Headache & OTC Remedies</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Three Value Props */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 max-w-lg">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                  <Sparkle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">AI Powered</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Smart & Accurate</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Private & Secure</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Your data is safe</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Simple for All</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Kids to Elders</p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="User" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Trusted by 10,000+ users</p>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="font-bold text-slate-700 ml-1">4.8/5</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Phone Mockup as in the UI screenshot */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Decorative background badges */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-200/40 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-200/40 rounded-full blur-xl pointer-events-none"></div>

            {/* Smartphone frame */}
            <div className="w-[320px] sm:w-[350px] bg-slate-900 p-3.5 rounded-[44px] shadow-2xl shadow-slate-900/30 border-4 border-slate-800 relative z-10 transition-transform duration-500 hover:scale-[1.02]">
              
              {/* Screen container */}
              <div className="bg-gradient-to-b from-[#f0fdf4] via-white to-slate-50 rounded-[36px] overflow-hidden p-5 flex flex-col gap-4 text-slate-900 min-h-[580px] border border-slate-100">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between text-xs text-slate-800 font-semibold px-2">
                  <span>9:41</span>
                  <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto"></div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px]">5G</span>
                    <div className="w-5 h-2.5 border border-slate-800 rounded-xs p-0.5">
                      <div className="h-full bg-slate-800 rounded-xs w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* App Header Inside Mockup */}
                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                        <span>Hello, Rakesh</span>
                        <span>👋</span>
                      </p>
                      <h3 className="text-lg font-black text-slate-900 leading-tight">
                        What do you want<br />to scan today?
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold border border-emerald-200">
                      RS
                    </div>
                  </div>
                </div>

                {/* Card 1: Medicine Scanner */}
                <div
                  onClick={() => onOpenScan("medicine")}
                  className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center gap-3.5"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    💊
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">Medicine Scanner</h4>
                      <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Know uses, side effects, warnings & more.</p>
                  </div>
                </div>

                {/* Card 2: Product Scanner */}
                <div
                  onClick={() => onOpenScan("product")}
                  className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center gap-3.5"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    🛒
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">Product Scanner</h4>
                      <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Check food, cosmetics, shampoo, chips & more.</p>
                  </div>
                </div>

                {/* Card 3: Quick OTC Remedies */}
                <div
                  onClick={onOpenRemedies}
                  className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/70 shadow-xs cursor-pointer hover:bg-emerald-100/70 transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌿</span>
                    <span className="text-xs font-bold text-emerald-900">Fever / Headache Relief (No Rx)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                </div>

                {/* Recent Scans Section inside phone */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-xs font-bold text-slate-900">Recent Scans</h5>
                    <button
                      onClick={() => onOpenScan("medicine")}
                      className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      Scan new
                    </button>
                  </div>

                  <div className="space-y-2">
                    {recentScans.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectRecent(item)}
                        className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center justify-between shadow-2xs hover:border-emerald-200 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{item.type === "medicine" ? "💊" : "🛒"}</span>
                          <div>
                            <p className="text-xs font-bold text-slate-800 leading-tight">{item.name}</p>
                            <p className="text-[10px] text-slate-400">{item.timeAgo}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.rating === "safe" ? "bg-emerald-100 text-emerald-800" :
                          item.rating === "caution" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                        }`}>
                          {item.rating === "safe" ? "Safe" : item.rating === "caution" ? "Caution" : "Danger"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Bottom Disclaimer Banner as in the screenshot */}
        <div className="mt-12 lg:mt-16 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xs">
          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            ⓘ
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold">Important:</strong> Your Dr. provides general information & ingredient safety insights only and does not replace professional medical advice. Always consult a certified doctor or pharmacist for personal medical prescriptions.
          </p>
        </div>

      </div>
    </section>
  );
}
