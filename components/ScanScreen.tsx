"use client";

import { useRef, useState, useCallback } from "react";
import { ScanMode } from "@/lib/types";

interface ScanScreenProps {
  mode: ScanMode;
  onBack: () => void;
  onAnalyze: (base64Image: string) => void;
  isAnalyzing: boolean;
}

export default function ScanScreen({
  mode,
  onBack,
  onAnalyze,
  isAnalyzing,
}: ScanScreenProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const retake = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleAnalyze = () => {
    if (preview) onAnalyze(preview);
  };

  const title = mode === "medicine" ? "💊 Medicine Scanner" : "🛒 Product Scanner";

  return (
    <div
      className="w-full max-w-[480px] mx-auto px-5 py-5 min-h-dvh flex flex-col"
      style={{ animation: "fadeInUp 0.4s ease" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.05] text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/10 shrink-0"
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
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {!preview ? (
        /* Upload Area */
        <div className="flex-1 flex flex-col gap-5">
          <div
            onClick={openGallery}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`flex-1 min-h-[300px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 p-8 ${
              isDragOver
                ? "border-[var(--color-accent-teal)] bg-[rgba(0,210,168,0.05)]"
                : "border-white/15 bg-white/[0.05]"
            } hover:border-[var(--color-accent-teal)] hover:bg-[rgba(0,210,168,0.05)]`}
          >
            <div
              className="text-[var(--color-text-muted)]"
              style={{ animation: "cameraFloat 3s ease-in-out infinite" }}
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect
                  x="4"
                  y="12"
                  width="56"
                  height="44"
                  rx="8"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <circle
                  cx="32"
                  cy="34"
                  r="12"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <circle cx="32" cy="34" r="5" fill="currentColor" />
                <rect
                  x="44"
                  y="16"
                  width="10"
                  height="6"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-center leading-relaxed">
              Tap to take a photo
              <br />
              or upload an image
            </p>
            <p className="text-sm text-[var(--color-text-muted)] text-center">
              {mode === "medicine"
                ? "Photo of medicine box, label, or strip"
                : "Photo of product label or ingredients"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={openCamera}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/[0.08] bg-white/[0.05] text-white text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.97]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="20" height="14" rx="4" />
                <circle cx="12" cy="13" r="4" />
                <path d="M14 2H10L8 6h8l-2-4z" />
              </svg>
              Camera
            </button>
            <button
              onClick={openGallery}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/[0.08] bg-white/[0.05] text-white text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.97]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              Gallery
            </button>
          </div>
        </div>
      ) : (
        /* Preview Area */
        <div
          className="flex-1 flex flex-col gap-5"
          style={{ animation: "fadeInUp 0.4s ease" }}
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-[400px] object-contain rounded-3xl border border-white/[0.08] bg-[var(--color-card)]"
          />
          <div className="flex gap-3">
            <button
              onClick={retake}
              disabled={isAnalyzing}
              className="flex-1 py-4 rounded-2xl border border-white/[0.08] bg-white/[0.05] text-white text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-white/[0.08] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔄 Retake
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex-[2] py-4 rounded-2xl border-none bg-gradient-to-br from-[#00D2A8] to-[#0091FF] text-white text-lg font-bold cursor-pointer transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,210,168,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-[18px] h-[18px] border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                "🔍 Analyze Now"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
