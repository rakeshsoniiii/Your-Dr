"use client";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ message, onClose }: ErrorModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-[100] p-5"
      style={{ animation: "fadeInUp 0.3s ease" }}
    >
      <div className="bg-[var(--color-card)] border border-white/[0.08] rounded-3xl p-10 text-center max-w-[360px] w-full">
        <div className="text-5xl mb-4">😔</div>
        <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
        <p className="text-[var(--color-text-secondary)] text-sm mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-8 py-3.5 rounded-2xl border-none bg-gradient-to-br from-[#00D2A8] to-[#0091FF] text-white text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,210,168,0.3)]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
