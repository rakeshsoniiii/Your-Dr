"use client";

import {
  MedicineResult,
  ProductResult,
  ScanMode,
  HealthRating,
} from "@/lib/types";

interface ResultScreenProps {
  mode: ScanMode;
  result: MedicineResult | ProductResult;
  onBack: () => void;
  onHome: () => void;
}

function HealthBadge({ rating }: { rating: HealthRating }) {
  const config = {
    safe: {
      label: "✅ Safe",
      classes: "bg-[var(--color-safe-bg)] text-[var(--color-safe)] border-[rgba(34,197,94,0.2)]",
    },
    caution: {
      label: "⚠️ Use with Caution",
      classes: "bg-[var(--color-caution-bg)] text-[var(--color-caution)] border-[rgba(245,158,11,0.2)]",
    },
    danger: {
      label: "🚨 Danger",
      classes: "bg-[var(--color-danger-bg)] text-[var(--color-danger)] border-[rgba(239,68,68,0.2)]",
    },
  };
  const c = config[rating] || config.caution;
  return (
    <span className={`inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-base font-bold border ${c.classes}`}>
      {c.label}
    </span>
  );
}

function ResultCard({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-xl"
      style={{ animation: `cardIn 0.5s ease ${delay}s both` }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-2xl leading-none">{icon}</span>
        <h3 className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  );
}

function ListItems({ items }: { items: string[] }) {
  if (!items || items.length === 0) return <p className="text-[var(--color-text-muted)]">None found</p>;
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="pl-5 relative py-1 border-b border-white/[0.04] last:border-b-0 before:content-['•'] before:absolute before:left-0 before:text-[var(--color-accent-teal)] before:font-bold"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function MedicineResults({ result }: { result: MedicineResult }) {
  return (
    <>
      {/* Name Card */}
      <div
        className="bg-gradient-to-br from-[rgba(0,210,168,0.08)] to-[rgba(0,145,255,0.08)] border border-[rgba(0,210,168,0.2)] rounded-2xl p-7 text-center"
        style={{ animation: "cardIn 0.5s ease both" }}
      >
        <h2 className="text-2xl font-extrabold bg-gradient-to-br from-[#00D2A8] to-[#0091FF] bg-clip-text text-transparent">
          {result.name || "Unknown Medicine"}
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1.5">
          {result.manufacturer && `${result.manufacturer} · `}
          {result.type || "Medicine"}
        </p>
      </div>

      {/* Health Rating */}
      <ResultCard icon="🏥" title="Health Rating" delay={0.05}>
        <div className="flex flex-col gap-3">
          <HealthBadge rating={result.healthRating} />
          <p className="text-[var(--color-text-secondary)]">{result.healthNote}</p>
        </div>
      </ResultCard>

      {/* Prescription */}
      <ResultCard icon="📋" title="Prescription Required?" delay={0.1}>
        <div className="flex flex-col gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border self-start ${
              result.prescriptionRequired
                ? "bg-[var(--color-danger-bg)] text-[var(--color-danger)] border-[rgba(239,68,68,0.2)]"
                : "bg-[var(--color-safe-bg)] text-[var(--color-safe)] border-[rgba(34,197,94,0.2)]"
            }`}
          >
            {result.prescriptionRequired ? "🔴 Yes — Doctor's Prescription Required" : "🟢 No — Over the Counter"}
          </span>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.prescriptionNote}</p>
        </div>
      </ResultCard>

      {/* Usage */}
      <ResultCard icon="💡" title="What It's Used For" delay={0.15}>
        <p>{result.usage}</p>
      </ResultCard>

      {/* Dosage */}
      {result.dosage && (
        <ResultCard icon="💊" title="Dosage" delay={0.18}>
          <p>{result.dosage}</p>
        </ResultCard>
      )}

      {/* Short-term Side Effects */}
      <ResultCard icon="⚡" title="Short-Term Side Effects" delay={0.2}>
        <ListItems items={result.shortTermSideEffects} />
      </ResultCard>

      {/* Long-term Side Effects */}
      <ResultCard icon="⏳" title="Long-Term Side Effects" delay={0.25}>
        <ListItems items={result.longTermSideEffects} />
      </ResultCard>

      {/* Daily Use Warning */}
      <ResultCard icon="📅" title="What Happens with Daily Use?" delay={0.3}>
        <p className="text-[var(--color-caution)]">{result.dailyUseWarning}</p>
      </ResultCard>

      {/* Warnings */}
      {result.warnings && result.warnings.length > 0 && (
        <ResultCard icon="🚨" title="Warnings" delay={0.35}>
          <ListItems items={result.warnings} />
        </ResultCard>
      )}
    </>
  );
}

function ProductResults({ result }: { result: ProductResult }) {
  const ratingNum = parseInt(result.rating) || 5;
  const ratingColor =
    ratingNum >= 7
      ? "var(--color-safe)"
      : ratingNum >= 4
      ? "var(--color-caution)"
      : "var(--color-danger)";

  const weightConfig = {
    weight_gain: {
      icon: "⬆️",
      label: "May Cause Weight Gain",
      classes: "bg-[rgba(239,68,68,0.1)] text-[#f87171] border-[rgba(239,68,68,0.2)]",
    },
    weight_loss: {
      icon: "⬇️",
      label: "May Help Weight Loss",
      classes: "bg-[rgba(34,197,94,0.1)] text-[#4ade80] border-[rgba(34,197,94,0.2)]",
    },
    neutral: {
      icon: "➡️",
      label: "Neutral — No Major Impact",
      classes: "bg-[rgba(148,163,184,0.1)] text-[#94a3b8] border-[rgba(148,163,184,0.2)]",
    },
  };

  const wc = weightConfig[result.weightImpact] || weightConfig.neutral;

  return (
    <>
      {/* Name Card */}
      <div
        className="bg-gradient-to-br from-[rgba(0,210,168,0.08)] to-[rgba(0,145,255,0.08)] border border-[rgba(0,210,168,0.2)] rounded-2xl p-7 text-center"
        style={{ animation: "cardIn 0.5s ease both" }}
      >
        <h2 className="text-2xl font-extrabold bg-gradient-to-br from-[#00D2A8] to-[#0091FF] bg-clip-text text-transparent">
          {result.name || "Unknown Product"}
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1.5">
          {result.brand && `${result.brand} · `}
          {result.category || "Product"}
        </p>
      </div>

      {/* Safety + Health */}
      <ResultCard icon="🛡️" title="Safety Rating" delay={0.05}>
        <div className="flex flex-col gap-3">
          <HealthBadge rating={result.healthRating} />
          <p className="text-[var(--color-text-secondary)]">{result.safetyNote}</p>
        </div>
      </ResultCard>

      {/* Score */}
      <ResultCard icon="⭐" title="Safety Score" delay={0.1}>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex-1 h-2.5 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${ratingNum * 10}%`,
                background: ratingColor,
              }}
            />
          </div>
          <span
            className="text-2xl font-extrabold min-w-[45px] text-right"
            style={{ color: ratingColor }}
          >
            {ratingNum}/10
          </span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">{result.healthNote}</p>
      </ResultCard>

      {/* Weight Impact */}
      <ResultCard icon="⚖️" title="Weight Impact" delay={0.15}>
        <div className="flex flex-col gap-2">
          <span
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-bold border self-start ${wc.classes}`}
          >
            {wc.icon} {wc.label}
          </span>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.weightNote}</p>
        </div>
      </ResultCard>

      {/* Key Ingredients */}
      <ResultCard icon="🧪" title="Key Ingredients" delay={0.2}>
        <ListItems items={result.keyIngredients} />
      </ResultCard>

      {/* Harmful Ingredients */}
      {result.harmfulIngredients && result.harmfulIngredients.length > 0 && (
        <ResultCard icon="☠️" title="Harmful Ingredients" delay={0.25}>
          <ListItems items={result.harmfulIngredients} />
        </ResultCard>
      )}

      {/* Daily Use */}
      <ResultCard icon="📅" title="Daily Use Advice" delay={0.3}>
        <p>{result.dailyUseAdvice}</p>
      </ResultCard>

      {/* Alternatives */}
      {result.betterAlternatives && result.betterAlternatives.length > 0 && (
        <ResultCard icon="💚" title="Better Alternatives" delay={0.35}>
          <ListItems items={result.betterAlternatives} />
        </ResultCard>
      )}
    </>
  );
}

export default function ResultScreen({
  mode,
  result,
  onBack,
  onHome,
}: ResultScreenProps) {
  return (
    <div
      className="w-full max-w-[520px] mx-auto px-5 py-5 pb-10"
      style={{ animation: "fadeInUp 0.4s ease" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 sticky top-0 z-10 py-2 bg-gradient-to-b from-[var(--color-background)] from-60% to-transparent">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.05] text-white flex items-center justify-center cursor-pointer transition-all hover:bg-white/10 shrink-0"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="flex-1 text-xl font-bold">Results</h2>
        <button
          onClick={onHome}
          className="w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.05] flex items-center justify-center cursor-pointer transition-all hover:bg-white/10 text-xl"
        >
          🏠
        </button>
      </div>

      {/* Result Cards */}
      <div className="flex flex-col gap-4">
        {mode === "medicine" ? (
          <MedicineResults result={result as MedicineResult} />
        ) : (
          <ProductResults result={result as ProductResult} />
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <button
          onClick={onHome}
          className="w-full py-[18px] rounded-2xl border-none bg-gradient-to-br from-[#00D2A8] to-[#0091FF] text-white text-lg font-bold cursor-pointer transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,210,168,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] mb-4"
        >
          Scan Another
        </button>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
          ⚠️ This is AI-powered analysis. Always consult a doctor for medical advice.
        </p>
      </div>
    </div>
  );
}
