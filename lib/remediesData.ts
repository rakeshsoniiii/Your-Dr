import { QuickRemedyItem } from "./types";

export const COMMON_REMEDIES: QuickRemedyItem[] = [
  {
    id: "fever",
    symptom: "Mild Fever",
    icon: "🌡️",
    severity: "mild",
    description: "Low-grade body temperature rise (99°F - 101°F) usually caused by minor viral infections or fatigue.",
    safeOtcOptions: [
      {
        name: "Paracetamol / Acetaminophen (500mg - 650mg)",
        generic: "Paracetamol (Acetaminophen)",
        howItWorks: "Reduces fever by resetting the brain's thermostat and eases mild body aches.",
        typicalDose: "1 tablet (500mg) every 6-8 hours after food. Max 3g in 24 hours.",
        sideEffects: "Very low risk when taken at recommended dose. Safe for stomach.",
        isNoPrescriptionNeeded: true,
      },
    ],
    homeRemedies: [
      "Drink plenty of fluids (warm water, coconut water, herbal soups) to prevent dehydration.",
      "Rest in a well-ventilated, cool room with light clothing.",
      "Apply a lukewarm wet sponge compress on forehead and wrists.",
      "Eat light, easily digestible food like khichdi, oats, or clear broths."
    ],
    whatToAvoid: [
      "Do NOT take multiple fever medicines together without checking generic names.",
      "Avoid heavy physical exertion and icy cold water baths.",
      "Avoid self-prescribing antibiotics (fever is mostly viral)."
    ],
    whenToSeeDoctor: "Consult immediately if fever exceeds 102°F, lasts more than 3 days, or is accompanied by stiff neck, rash, or breathing difficulty."
  },
  {
    id: "headache",
    symptom: "Tension & Stress Headache",
    icon: "🤕",
    severity: "mild",
    description: "Dull, aching head pain often triggered by screen time, lack of sleep, dehydration, or stress.",
    safeOtcOptions: [
      {
        name: "Paracetamol (500mg)",
        generic: "Paracetamol",
        howItWorks: "Gentle pain reliever that does not irritate stomach lining.",
        typicalDose: "1 tablet with a full glass of water. Do not repeat within 4-6 hours.",
        sideEffects: "Virtually zero major side effects for short term mild headache use.",
        isNoPrescriptionNeeded: true,
      },
      {
        name: "Herbal Balm (Tiger Balm / Amrutanjan / Peppermint Oil)",
        generic: "Menthol & Camphor Topical",
        howItWorks: "Cooling effect relaxes tense temple and neck muscles naturally.",
        typicalDose: "Gently massage a small dab on temples and forehead.",
        sideEffects: "None (avoid getting into eyes).",
        isNoPrescriptionNeeded: true,
      }
    ],
    homeRemedies: [
      "Drink 2 large glasses of water (mild dehydration is #1 cause of headaches).",
      "Rest in a quiet, dimmed room and close your eyes for 20 minutes.",
      "Apply a cold pack or warm cloth to your forehead or back of the neck.",
      "Gently massage the temples and base of your skull."
    ],
    whatToAvoid: [
      "Avoid staring at mobile/laptop screens while headache persists.",
      "Avoid excessive caffeine or abrupt caffeine withdrawal.",
      "Avoid skipping meals."
    ],
    whenToSeeDoctor: "Seek medical care if the headache is sudden and unusually severe ('thunderclap'), accompanied by numbness, slurred speech, or vision loss."
  },
  {
    id: "acidity",
    symptom: "Acidity, Heartburn & Gas",
    icon: "🔥",
    severity: "mild",
    description: "Burning feeling in the chest/throat or stomach bloatedness after oily, spicy, or late meals.",
    safeOtcOptions: [
      {
        name: "Antacid Liquid / Gel (Digene, Gelusil, Eno)",
        generic: "Magnesium Hydroxide + Aluminium Hydroxide / Sodium Bicarbonate",
        howItWorks: "Instantly neutralizes excess stomach acid within minutes.",
        typicalDose: "1-2 teaspoons or 1 sachet in a glass of water after meals.",
        sideEffects: "Extremely safe for occasional use. Non-habit forming.",
        isNoPrescriptionNeeded: true,
      }
    ],
    homeRemedies: [
      "Sip half a glass of cold milk (natural calcium buffers stomach acid).",
      "Chew a teaspoon of fennel seeds (Saunf) or ajwain with warm water.",
      "Drink tender coconut water to soothe the stomach lining.",
      "Stay upright for at least 2 hours after eating (don't lie down immediately)."
    ],
    whatToAvoid: [
      "Avoid deep-fried, heavily spiced food and sour citrus on an empty stomach.",
      "Avoid carbonated sodas and smoking.",
      "Avoid tight clothing around the abdomen."
    ],
    whenToSeeDoctor: "See a doctor if acidity happens daily for more than 2 weeks, or if you experience difficulty swallowing or black stools."
  },
  {
    id: "sore-throat",
    symptom: "Sore Throat & Cough",
    icon: "🧣",
    severity: "mild",
    description: "Scratchy, painful, or dry throat often triggered by pollution, weather change, or early cold.",
    safeOtcOptions: [
      {
        name: "Herbal Lozenges (Strepsils / Vicks / Koflet)",
        generic: "Amylmetacresol / Herbal extracts",
        howItWorks: "Soothes throat lining and provides mild local numbing.",
        typicalDose: "Dissolve 1 lozenge slowly in mouth every 3-4 hours.",
        sideEffects: "Safe and mild.",
        isNoPrescriptionNeeded: true,
      },
      {
        name: "Saline Nasal Drops / Steam Inhaler",
        generic: "0.9% Sodium Chloride",
        howItWorks: "Moisturizes nasal passages and loosens mucus naturally.",
        typicalDose: "2 drops per nostril or steam inhalation for 5-10 minutes.",
        sideEffects: "Zero chemical side effects.",
        isNoPrescriptionNeeded: true,
      }
    ],
    homeRemedies: [
      "Gargle with warm water + 1/2 tsp salt 3 times a day (reduces swelling fast).",
      "Drink warm water with 1 tsp raw honey and a pinch of black pepper/ginger.",
      "Inhale steam with a drop of eucalyptus oil or plain water.",
      "Drink warm turmeric milk (Golden milk) before bedtime."
    ],
    whatToAvoid: [
      "Avoid ice-cold beverages and very dry air.",
      "Avoid shouting or straining your voice.",
      "Do NOT take antibiotics without throat culture/doctor's guidance."
    ],
    whenToSeeDoctor: "If throat pain prevents swallowing water, or is accompanied by high fever, white spots on tonsils, or difficulty breathing."
  },
  {
    id: "body-ache",
    symptom: "Mild Body Ache & Muscle Soreness",
    icon: "🏃‍♂️",
    severity: "mild",
    description: "Generalized muscle fatigue or stiffness from workout, travel, poor posture, or viral recovery.",
    safeOtcOptions: [
      {
        name: "Paracetamol (500mg) or Topical Pain Spray/Gel (Volini / Moov)",
        generic: "Paracetamol / Diclofenac or Menthol Gel (Topical)",
        howItWorks: "Topical gels relieve local inflammation without affecting the stomach.",
        typicalDose: "Apply thin layer to affected muscles and massage gently twice daily.",
        sideEffects: "Topical application has minimal systemic absorption and no stomach upset.",
        isNoPrescriptionNeeded: true,
      }
    ],
    homeRemedies: [
      "Take a warm Epsom salt bath or warm water shower.",
      "Gentle stretching and light walking to improve blood flow.",
      "Stay hydrated with electrolyte water or fresh fruit juices.",
      "Ensure 8 hours of uninterrupted sleep."
    ],
    whatToAvoid: [
      "Avoid sudden heavy lifting on sore muscles.",
      "Avoid taking excessive painkillers back to back."
    ],
    whenToSeeDoctor: "If accompanied by severe localized joint swelling, inability to walk, or numbness radiating down limbs."
  },
  {
    id: "nausea",
    symptom: "Mild Nausea & Motion Sickness",
    icon: "🤢",
    severity: "mild",
    description: "Uneasy stomach feeling caused by travel, indigestion, or foul smells.",
    safeOtcOptions: [
      {
        name: "Ginger Candies / Oral Rehydration Salts (ORS)",
        generic: "Gingerol Extract / Electrolytes",
        howItWorks: "Ginger naturally calms stomach motility and receptors.",
        typicalDose: "Chew ginger candy or sip ORS slowly in small sips.",
        sideEffects: "Safe, natural, and non-drowsy.",
        isNoPrescriptionNeeded: true,
      }
    ],
    homeRemedies: [
      "Sip warm ginger tea with a squeeze of fresh lemon.",
      "Inhale the aroma of fresh lemon or peppermint oil.",
      "Focus on the horizon when traveling in cars or buses.",
      "Eat small, bland snacks like plain crackers or dry toast."
    ],
    whatToAvoid: [
      "Avoid greasy, heavy meals right before traveling.",
      "Avoid reading or looking at phone screens in moving vehicles."
    ],
    whenToSeeDoctor: "If vomiting is continuous for more than 12 hours, accompanied by severe abdominal pain or signs of severe dehydration."
  }
];
