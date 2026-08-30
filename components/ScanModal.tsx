"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Camera, Upload, Sparkles, RefreshCw, AlertCircle, Search, FileText, CheckCircle2 } from "lucide-react";
import { ScanMode, AnalysisResult } from "@/lib/types";
import Tesseract from "tesseract.js";

interface ScanModalProps {
  isOpen: boolean;
  mode: ScanMode;
  onClose: () => void;
  onAnalysisComplete: (result: AnalysisResult, mode: ScanMode, previewImage?: string) => void;
}

const MEDICINE_PRESETS = [
  { name: "Paracetamol 500mg Tablet", desc: "Common OTC fever & mild pain relief" },
  { name: "Amoxicillin 500mg Capsule", desc: "Antibiotic for bacterial infections" },
  { name: "Pantoprazole 40mg (Pan-D)", desc: "Acidity, GERD & stomach ulcer" },
  { name: "Cetirizine 10mg Tablet", desc: "Anti-allergy, cold & runny nose" },
  { name: "Ibuprofen 400mg Tablet", desc: "NSAID painkiller & swelling" },
];

const PRODUCT_PRESETS = [
  { name: "Lay's Classic Salted Potato Chips", desc: "Snack - Check trans fat, palm oil & weight gain" },
  { name: "Dove Daily Moisture Shampoo", desc: "Haircare - Check sulfates, parabens & scalp safety" },
  { name: "Dabur Amla Hair Oil", desc: "Hair oil - Check mineral oils & natural extracts" },
  { name: "Nutella Hazelnut Cocoa Spread", desc: "Food - Check sugar content & palm oil load" },
  { name: "Colgate Total Toothpaste", desc: "Hygiene - Check fluoride & chemical safety" },
];

export default function ScanModal({
  isOpen,
  mode,
  onClose,
  onAnalysisComplete,
}: ScanModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<string>("");
  const [ocrText, setOcrText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera when closing
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setImagePreview(null);
      setOcrText("");
      setSearchQuery("");
      setErrorMessage(null);
      setIsAnalyzing(false);
    }
  }, [isOpen, stopCamera]);

  if (!isOpen) return null;

  // Start Web Camera
  const startCamera = async () => {
    try {
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error("Camera access error:", err);
      setErrorMessage("Could not access camera. Please upload an image from gallery or select a sample preset.");
      fileInputRef.current?.click();
    }
  };

  // Capture Frame from Video
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setImagePreview(dataUrl);
      stopCamera();
      runOcrAndAnalyze(dataUrl);
    }
  };

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImagePreview(dataUrl);
        runOcrAndAnalyze(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run OCR (Tesseract.js) + Send to Groq AI
  const runOcrAndAnalyze = async (imgData: string, manualQuery?: string) => {
    setIsAnalyzing(true);
    setErrorMessage(null);

    let extractedOcr = "";

    try {
      if (imgData && !manualQuery) {
        setAnalysisStatus("1/3 🔍 Reading text on packaging with Tesseract OCR...");
        try {
          const { data } = await Tesseract.recognize(imgData, "eng", {
            logger: (m) => {
              if (m.status === "recognizing text") {
                setAnalysisStatus(`1/3 🔍 Reading text... (${Math.round((m.progress || 0) * 100)}%)`);
              }
            },
          });
          extractedOcr = data.text || "";
          setOcrText(extractedOcr);
        } catch (ocrErr) {
          console.warn("Client OCR non-fatal warning:", ocrErr);
        }
      }

      setAnalysisStatus("2/3 🧠 Analyzing clinical safety, side effects & ingredients...");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imgData || undefined,
          extractedText: extractedOcr || undefined,
          textQuery: manualQuery || searchQuery || undefined,
          mode: mode === "remedy" ? "medicine" : mode,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Analysis failed. Please try again.");
      }

      setAnalysisStatus("3/3 ✅ Preparing easy-to-read health report...");
      setTimeout(() => {
        onAnalysisComplete(data.result, mode, imgData);
      }, 400);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setErrorMessage(err.message || "Failed to analyze. Please check the image and try again.");
      setIsAnalyzing(false);
    }
  };

  // Handle Manual Preset or Search
  const handlePresetSelect = (name: string) => {
    setSearchQuery(name);
    runOcrAndAnalyze("", name);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    runOcrAndAnalyze("", searchQuery);
  };

  const isMedicine = mode === "medicine";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl ${
              isMedicine ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-purple-50 text-purple-600 border border-purple-200"
            }`}>
              {isMedicine ? "💊" : "🛒"}
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                {isMedicine ? "Medicine Safety Scanner" : "Daily Product Scanner"}
              </h3>
              <p className="text-xs text-slate-500">
                {isMedicine ? "Scan medicine cover or strip for uses & side effects" : "Scan shampoo, chips, hair oil or snacks"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p className="flex-1">{errorMessage}</p>
          </div>
        )}

        {/* Analyzing Loading State */}
        {isAnalyzing ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl">
                {isMedicine ? "💊" : "🛒"}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Your Dr. is analyzing...</h4>
              <p className="text-xs text-emerald-700 font-medium mt-1 animate-pulse">
                {analysisStatus || "Extracting text and verifying safety profile..."}
              </p>
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Scanning thumbnail"
                className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-sm mt-2 opacity-80"
              />
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            
            {/* Live Camera View */}
            {isCameraActive ? (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border-2 border-emerald-500 shadow-inner flex items-center justify-center">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  
                  {/* Camera overlay targeting box */}
                  <div className="absolute inset-8 border-2 border-dashed border-white/70 rounded-2xl pointer-events-none flex items-center justify-center">
                    <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                      Align label inside box
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={capturePhoto}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Take Photo</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    className="py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Capture Options */
              <div className="space-y-4">
                
                {/* Upload or Camera Clickable Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/80 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition text-center group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">
                      Take Photo or Upload Image
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isMedicine
                        ? "Photo of tablet strip, syrup bottle, or prescription"
                        : "Photo of chips packet, shampoo, hair oil, or cosmetic"}
                    </p>
                  </div>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Two Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={startCamera}
                    className="py-3.5 px-4 rounded-2xl border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <span>Open Camera</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="py-3.5 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <Upload className="w-4 h-4 text-slate-600" />
                    <span>Upload from Gallery</span>
                  </button>
                </div>

                {/* Manual Name Search */}
                <div className="pt-2">
                  <div className="relative">
                    <form onSubmit={handleManualSearch} className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={isMedicine ? "Or type medicine name (e.g., Paracetamol)..." : "Or type product name (e.g., Lay's Chips)..."}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={!searchQuery.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition cursor-pointer"
                      >
                        Analyze
                      </button>
                    </form>
                  </div>
                </div>

                {/* Quick Sample Presets */}
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    💡 Or test with 1-click popular samples:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(isMedicine ? MEDICINE_PRESETS : PRODUCT_PRESETS).map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => handlePresetSelect(preset.name)}
                        className="text-left bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-xl px-3 py-1.5 transition text-xs font-semibold text-slate-700 hover:text-emerald-800"
                      >
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
