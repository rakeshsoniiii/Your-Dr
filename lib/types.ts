export type ScanMode = "medicine" | "product" | "remedy";

export type HealthRating = "safe" | "caution" | "danger";

export type WeightImpact = "weight_gain" | "weight_loss" | "neutral";

export interface MedicineResult {
  name: string;
  genericName?: string;
  manufacturer?: string;
  type: string;
  usage: string;
  shortTermSideEffects: string[];
  longTermSideEffects: string[];
  dailyUseWarning: string;
  prescriptionRequired: boolean;
  prescriptionNote: string;
  healthRating: HealthRating;
  healthNote: string;
  dosage: string;
  warnings: string[];
  safeAlternatives?: string[];
  isOtcSafeForMildIssue?: boolean;
}

export interface ProductResult {
  name: string;
  brand?: string;
  category: string;
  isSafe: boolean;
  safetyNote: string;
  keyIngredients: string[];
  harmfulIngredients: string[];
  healthRating: HealthRating;
  healthNote: string;
  weightImpact: WeightImpact;
  weightNote: string;
  dailyUseAdvice: string;
  betterAlternatives: string[];
  rating: string; // 1-10
}

export type AnalysisResult = MedicineResult | ProductResult;

export interface QuickRemedyItem {
  id: string;
  symptom: string;
  icon: string;
  severity: "mild" | "moderate";
  description: string;
  safeOtcOptions: {
    name: string;
    generic: string;
    howItWorks: string;
    typicalDose: string;
    sideEffects: string;
    isNoPrescriptionNeeded: boolean;
  }[];
  homeRemedies: string[];
  whatToAvoid: string[];
  whenToSeeDoctor: string;
}

export interface RecentScanItem {
  id: string;
  name: string;
  type: "medicine" | "product";
  category: string;
  timeAgo: string;
  rating: HealthRating;
  timestamp: number;
}
