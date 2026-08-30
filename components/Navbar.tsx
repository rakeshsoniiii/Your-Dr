"use client";

import React, { useState } from "react";
import { PlusCircle, Heart, Sparkles, Menu, X, ShieldCheck } from "lucide-react";
import { ScanMode } from "@/lib/types";

interface NavbarProps {
  onOpenScan: (mode: ScanMode) => void;
  onOpenRemedies: () => void;
}

export default function Navbar({ onOpenScan, onOpenRemedies }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm relative group">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.99 12 5.5C10.5 3.99 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 9V15M9 12H15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">Your Dr.</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">AI</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">Know. Decide. Stay Healthy.</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-semibold text-emerald-700 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-emerald-600 after:rounded-full">
              Home
            </a>
            <button
              onClick={() => onOpenScan("medicine")}
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition cursor-pointer"
            >
              Medicine Scanner
            </button>
            <button
              onClick={() => onOpenScan("product")}
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition cursor-pointer"
            >
              Product Scanner
            </button>
            <button
              onClick={onOpenRemedies}
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 flex items-center gap-1 transition cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Quick Remedies
            </button>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition">
              How it Works
            </a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition">
              About
            </a>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenScan("medicine")}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm hover:shadow-md hover:shadow-emerald-600/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              Get Started
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenScan("medicine")}
              className="bg-emerald-600 text-white p-2 rounded-xl text-xs font-semibold"
            >
              Scan
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <button
            onClick={() => {
              onOpenScan("medicine");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl font-medium text-slate-800 bg-emerald-50/60 text-emerald-700 flex items-center justify-between"
          >
            <span>💊 Medicine Scanner</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Scan</span>
          </button>
          <button
            onClick={() => {
              onOpenScan("product");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl font-medium text-slate-800 bg-purple-50/60 text-purple-700 flex items-center justify-between"
          >
            <span>🛒 Daily Product Scanner</span>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">Scan</span>
          </button>
          <button
            onClick={() => {
              onOpenRemedies();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2"
          >
            <span>🌿 Quick OTC & Home Remedies (No Rx)</span>
          </button>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-xl font-medium text-slate-600 hover:bg-slate-50"
          >
            How it Works
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-xl font-medium text-slate-600 hover:bg-slate-50"
          >
            About Project (by Rakesh Soni)
          </a>
        </div>
      )}
    </header>
  );
}
