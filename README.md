# 🩺 Your Dr. — AI-Powered Medicine & Product Safety Scanner

> **A project made by Rakesh Soni**  
> *Know. Decide. Stay Healthy.*

---

## 🌟 Overview

**Your Dr.** is a modern, accessible web application designed to help anyone — from kids to elders — instantly understand what is inside their medicines, food snacks, cosmetics, and everyday household products.

Simply take a photo of a medicine cover or product label, and **Your Dr.** uses advanced AI reasoning and OCR to reveal:
- **Medicine Usage & Dosage**
- **Short-Term & Long-Term Side Effects** (organ stress, liver/kidney load)
- **Daily Use Warnings** (what happens if taken routinely)
- **Doctor's Prescription Requirement** (Schedule H / Rx check)
- **Safe OTC & Natural Alternatives** for mild issues (Fever, Headache, Cough, Acidity)
- **Everyday Product Safety** (Shampoo, Chips, Hair Oil, Food)
- **Weight Impact** (Weight Gain / Weight Loss / Neutral)
- **Harmful Chemical Flags** (Palm oil, Sulfates, Parabens, Trans fats)

---

## 🚀 Key Features

### 💊 1. Medicine Safety Scanner
- **Label & Strip Scanning**: Works with photos taken via camera or uploaded from gallery.
- **Side Effect Matrix**: Unpacks immediate side effects vs. cumulative chronic damage from daily usage.
- **Prescription Check**: Clear green/red badges indicating whether doctor supervision is mandatory.
- **Listen Aloud (TTS)**: One-click audio reader for elders and children.

### 🛒 2. Daily Product Scanner
- **Food & Snack Safety**: Inspects chips, spreads, beverages for ultra-processed palm oils, sodium, and high glycemic index.
- **Cosmetics & Haircare**: Inspects shampoos and hair oils for mineral oils, silicones, sulfates, and parabens.
- **Weight Gain / Loss Impact**: Analyzes metabolic impact and calorie load.
- **Cleaner Alternatives**: Recommends healthier, non-toxic alternatives.

### 🌿 3. Quick OTC & Home Remedies (Zero-Prescription)
- Instant, verified guidance for common mild issues:
  - **Mild Fever** (Safe Paracetamol dosing, hydration, cooling compress)
  - **Tension & Stress Headache** (Acupressure, herbal balms, rest)
  - **Acidity, Heartburn & Gas** (Antacids, cold milk, fennel seeds)
  - **Sore Throat & Cough** (Herbal lozenges, salt-water gargle, turmeric honey)
  - **Muscle Soreness & Body Ache** (Topical balms, Epsom salt, gentle stretch)
  - **Mild Nausea & Motion Sickness** (Ginger candy, ORS)
- **AI Symptom Assistant**: Ask about any everyday mild discomfort for instant safe care advice.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI & Styling**: Tailwind CSS 4, Lucide Icons, Glassmorphism
- **AI Engine**: Groq High-Speed LPUs (`openai/gpt-oss-120b`, `qwen/qwen3.8-27b`)
- **OCR Engine**: Tesseract.js (Client-side and hybrid fallback)
- **Speech**: Web SpeechSynthesis API for accessibility

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rakeshsoniiii/Your-Dr.git
cd Your-Dr
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3000
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👨‍💻 Author

**Rakesh Soni**  
*Built with care for public health and consumer awareness.*
