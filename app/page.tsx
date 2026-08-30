"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScanModal from "@/components/ScanModal";
import RemediesSection from "@/components/RemediesSection";
import ResultModal from "@/components/ResultModal";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { ScanMode, AnalysisResult, RecentScanItem, MedicineResult, ProductResult } from "@/lib/types";

const DEFAULT_RECENT_SCANS: RecentScanItem[] = [
  {
    id: "rec-1",
    name: "Paracetamol 500mg",
    type: "medicine",
    category: "Fever & Pain",
    timeAgo: "2 min ago",
    rating: "safe",
    timestamp: Date.now() - 120000,
  },
  {
    id: "rec-2",
    name: "Lays Classic Chips",
    type: "product",
    category: "Snack (Palm Oil/Sodium)",
    timeAgo: "1 hour ago",
    rating: "caution",
    timestamp: Date.now() - 3600000,
  },
  {
    id: "rec-3",
    name: "Dove Moisture Shampoo",
    type: "product",
    category: "Haircare",
    timeAgo: "Yesterday",
    rating: "safe",
    timestamp: Date.now() - 86400000,
  },
];

export default function Home() {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [scanMode, setScanMode] = useState<ScanMode>("medicine");
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [currentPreviewImage, setCurrentPreviewImage] = useState<string | undefined>(undefined);
  const [recentScans, setRecentScans] = useState<RecentScanItem[]>(DEFAULT_RECENT_SCANS);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("your_dr_recent_scans");
      if (saved) {
        setRecentScans(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not read recent scans from localStorage:", e);
    }
  }, []);

  const openScan = (mode: ScanMode) => {
    setScanMode(mode);
    setIsScanModalOpen(true);
  };

  const openRemedies = () => {
    const el = document.getElementById("remedies");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAnalysisComplete = (
    result: AnalysisResult,
    mode: ScanMode,
    previewImage?: string
  ) => {
    setCurrentResult(result);
    setScanMode(mode);
    setCurrentPreviewImage(previewImage);
    setIsScanModalOpen(false);
    setIsResultModalOpen(true);

    // Add to recent scans list
    const newItem: RecentScanItem = {
      id: `scan-${Date.now()}`,
      name: result.name || (mode === "medicine" ? "Analyzed Medicine" : "Analyzed Product"),
      type: mode === "medicine" ? "medicine" : "product",
      category: mode === "medicine" ? (result as MedicineResult).type || "Medicine" : (result as ProductResult).category || "Product",
      timeAgo: "Just now",
      rating: result.healthRating || "safe",
      timestamp: Date.now(),
    };

    const updated = [newItem, ...recentScans.slice(0, 5)];
    setRecentScans(updated);
    try {
      localStorage.setItem("your_dr_recent_scans", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not write to localStorage", e);
    }
  };

  // Click on a recent item
  const handleSelectRecent = async (item: RecentScanItem) => {
    // Open scan modal prefilled with that item name
    setScanMode(item.type);
    setIsScanModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      
      {/* Top Navigation */}
      <Navbar onOpenScan={openScan} onOpenRemedies={openRemedies} />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection
          onOpenScan={openScan}
          onOpenRemedies={openRemedies}
          onSelectRecent={handleSelectRecent}
          recentScans={recentScans}
        />

        <RemediesSection />

        <HowItWorks onOpenScan={openScan} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Scan Modal */}
      <ScanModal
        isOpen={isScanModalOpen}
        mode={scanMode}
        onClose={() => setIsScanModalOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
      />

      {/* Analysis Result Modal */}
      <ResultModal
        isOpen={isResultModalOpen}
        mode={scanMode}
        result={currentResult}
        previewImage={currentPreviewImage}
        onClose={() => setIsResultModalOpen(false)}
        onScanAnother={() => {
          setIsResultModalOpen(false);
          setIsScanModalOpen(true);
        }}
      />

    </div>
  );
}
