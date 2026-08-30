"use client";

import { ScanMode } from "@/lib/types";

interface HomeScreenProps {
  onSelectMode: (mode: ScanMode) => void;
}

export default function HomeScreen({ onSelectMode }: HomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[480px] mx-auto px-5 py-8 min-h-dvh gap-9">
      {/* Logo */}
      <div className="text-center" style={{ animation: "logoEnter 0.8s ease" }}>
        <div
          className="w-[100px] h-[100px] mx-auto mb-4"
          style={{ animation: "logoPulse 3s ease-in-out infinite" }}
        >
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="url(#logoGrad)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <path
              d="M28 32C28 28 32 24 36 24H44C48 24 52 28 52 32V34H28V32Z"
              fill="white"
              opacity="0.9"
            />
            <rect x="26" y="34" width="28" height="4" rx="1" fill="white" />
            <path
              d="M30 38H50L48 56C48 57.1 47.1 58 46 58H34C32.9 58 32 57.1 32 56L30 38Z"
              fill="white"
              opacity="0.9"
            />
            <line
              x1="36"
              y1="43"
              x2="36"
              y2="53"
              stroke="url(#logoGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="40"
              y1="43"
              x2="40"
              y2="53"
              stroke="url(#logoGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="44"
              y1="43"
              x2="44"
              y2="53"
              stroke="url(#logoGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="logoGrad"
                x1="0"
                y1="0"
                x2="80"
                y2="80"
              >
                <stop offset="0%" stopColor="#00D2A8" />
                <stop offset="100%" stopColor="#0091FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-br from-[#00D2A8] to-[#0091FF] bg-clip-text text-transparent tracking-tight">
          YOUR DR.
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] mt-1 font-medium">
          Your Health & Safety Scanner
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          by Rakesh Soni
        </p>
      </div>

      {/* Mode Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          id="btn-medicine"
          onClick={() => onSelectMode("medicine")}
          className="group flex items-center sm:flex-col sm:text-center gap-4 w-full p-6 sm:py-8 rounded-3xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-white/15 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] active:translate-y-0 active:scale-[0.98]"
        >
          <span className="text-5xl sm:text-6xl leading-none shrink-0">💊</span>
          <div>
            <span className="block text-xl font-bold text-[var(--color-medicine)] leading-tight">
              Medicine
              <br />
              Scanner
            </span>
            <span className="block text-xs text-[var(--color-text-muted)] mt-1">
              Side effects, prescription info & more
            </span>
          </div>
        </button>

        <button
          id="btn-product"
          onClick={() => onSelectMode("product")}
          className="group flex items-center sm:flex-col sm:text-center gap-4 w-full p-6 sm:py-8 rounded-3xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-white/15 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] active:translate-y-0 active:scale-[0.98]"
        >
          <span className="text-5xl sm:text-6xl leading-none shrink-0">🛒</span>
          <div>
            <span className="block text-xl font-bold text-[var(--color-product)] leading-tight">
              Product
              <br />
              Scanner
            </span>
            <span className="block text-xs text-[var(--color-text-muted)] mt-1">
              Is it safe? Weight impact & more
            </span>
          </div>
        </button>
      </div>

      {/* Hint */}
      <p
        className="text-sm text-[var(--color-text-muted)] text-center"
        style={{ animation: "hintBounce 2s ease-in-out infinite" }}
      >
        📸 Just take a photo of the label!
      </p>
    </div>
  );
}
