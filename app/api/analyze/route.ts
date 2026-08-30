import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Groq active models
const VISION_MODEL = "qwen/qwen3.8-27b";
const TEXT_MODEL = "openai/gpt-oss-120b";
const FALLBACK_MODEL = "qwen/qwen3.8-27b";

function buildMedicinePrompt(textContext?: string): string {
  return `You are "Your Dr.", an expert clinical pharmacist and consumer health safety advisor.
Analyze the medicine packaging/label information provided below.

${textContext ? `[Extracted Text/Label details from photo/OCR]:\n${textContext}\n` : ""}

Return your clinical analysis as a strict JSON object with EXACTLY this schema (no markdown, no backticks, only valid JSON):

{
  "name": "Full medicine/brand name",
  "genericName": "Active salt/compound name (e.g. Paracetamol, Ibuprofen, Pantoprazole)",
  "manufacturer": "Brand or pharmaceutical company",
  "type": "Tablet / Capsule / Syrup / Cream / Drops / Injection / etc.",
  "usage": "Plain-language explanation of what this is used for (2-3 simple sentences)",
  "shortTermSideEffects": ["Common temporary side effect 1", "Common temporary side effect 2", "Common temporary side effect 3"],
  "longTermSideEffects": ["Long term impact 1 if used for weeks/months", "Long term impact 2", "Organ stress warning if applicable (e.g., Liver/Kidney/Gut)"],
  "dailyUseWarning": "Crucial warning: what happens if taken daily without medical reason (2 sentences)",
  "prescriptionRequired": true or false,
  "prescriptionNote": "Clear explanation of whether doctor's prescription is required and why",
  "healthRating": "safe" or "caution" or "danger",
  "healthNote": "Overall health and safety verdict in simple words",
  "dosage": "Typical standard adult dose or package instructions (always advise following doctor/leaflet)",
  "warnings": ["Important contraindication or allergy alert 1", "Warning 2 (e.g. alcohol interaction, pregnancy safety)"],
  "safeAlternatives": ["Mild OTC or natural alternative 1 if applicable for mild issues", "Alternative 2"],
  "isOtcSafeForMildIssue": true or false
}

Rules:
- For OTC vitamins/mild antacids/pain balms: healthRating is "safe".
- For standard NSAIDs/cough syrups/common tablets: healthRating is "caution" (use only as needed).
- For antibiotics, steroids, schedule-H drugs, sleeping pills, heart/BP meds: healthRating is "danger" (strictly require doctor prescription).
- Use clear, caring language understandable by elders and teens.
- Always output raw valid JSON only.`;
}

function buildProductPrompt(textContext?: string): string {
  return `You are "Your Dr.", an expert consumer product safety, food nutrition, and cosmetic chemical safety analyst.
Analyze the daily use product (food, chips, shampoo, hair oil, cosmetic, snack, hygiene item) provided below.

${textContext ? `[Extracted Text/Ingredients from photo/OCR]:\n${textContext}\n` : ""}

Return your safety analysis as a strict JSON object with EXACTLY this schema (no markdown, no backticks, only valid JSON):

{
  "name": "Product name",
  "brand": "Brand name",
  "category": "Food / Snack / Shampoo / Hair Oil / Skincare / Beverage / etc.",
  "isSafe": true or false,
  "safetyNote": "Is this safe for routine use/consumption? (2-3 plain-language sentences)",
  "keyIngredients": ["Key ingredient 1 (and benefit)", "Key ingredient 2", "Key ingredient 3"],
  "harmfulIngredients": ["Harmful/questionable chemical, additive, palm oil, excessive sugar, sulfate, paraben with reason", "Harmful ingredient 2"],
  "healthRating": "safe" or "caution" or "danger",
  "healthNote": "Comprehensive health assessment in simple language",
  "weightImpact": "weight_gain" or "weight_loss" or "neutral",
  "weightNote": "How this specific food/snack affects body weight, metabolism, calorie load or fat accumulation",
  "dailyUseAdvice": "Can a person consume or apply this daily? Clear guidance on frequency",
  "betterAlternatives": ["Healthier or cleaner alternative 1", "Healthier alternative 2"],
  "rating": "Overall safety score as a number between 1 to 10"
}

Rules:
- For hair oil / shampoo: check for mineral oils, silicones, sulfates, parabens, synthetic fragrances.
- For food/chips/snacks: check for ultra-processed refined oils (palm oil), excessive sodium, trans fats, artificial colors (E numbers), high glycemic index.
- Always output raw valid JSON only.`;
}

function buildRemedySearchPrompt(symptomQuery: string): string {
  return `You are "Your Dr.", an empathetic medical assistant providing safe, non-prescription OTC guidance and home remedies for mild, everyday symptoms.

User Query: "${symptomQuery}"

Provide safe guidance as a strict JSON object with EXACTLY this schema (raw JSON only):

{
  "symptom": "Identified mild symptom",
  "severity": "mild",
  "description": "Brief explanation of what might be causing this mild discomfort",
  "safeOtcOptions": [
    {
      "name": "Standard Safe OTC Option (e.g. Paracetamol, Antacid, Saline spray)",
      "generic": "Generic salt name",
      "howItWorks": "Simple explanation of how it eases the symptom",
      "typicalDose": "Standard general adult dose",
      "sideEffects": "Very low risk notes",
      "isNoPrescriptionNeeded": true
    }
  ],
  "homeRemedies": ["Safe, natural home care step 1", "Hydration/food tip 2", "Comfort step 3"],
  "whatToAvoid": ["Thing to avoid 1", "Thing to avoid 2"],
  "whenToSeeDoctor": "Clear red flags when the user MUST consult a doctor immediately."
}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, mode, textQuery, extractedText } = body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key not configured on server" },
        { status: 500 }
      );
    }

    // 1. If it's a Quick Remedy / Symptom search
    if (mode === "remedy" && textQuery) {
      const prompt = buildRemedySearchPrompt(textQuery);
      const groqRes = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: TEXT_MODEL,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
          max_tokens: 1500,
        }),
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        const content = data.choices?.[0]?.message?.content || "";
        const cleanJson = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed = JSON.parse(cleanJson);
        return NextResponse.json({ result: parsed, mode: "remedy" });
      }
    }

    // 2. Medicine or Product Analysis
    const prompt =
      mode === "medicine"
        ? buildMedicinePrompt(extractedText || textQuery)
        : buildProductPrompt(extractedText || textQuery);

    let groqData: any = null;
    let lastError = "";

    // Case A: If an image is provided and no pre-extracted text, try Groq vision
    if (image && !extractedText) {
      try {
        const visionRes = await fetch(GROQ_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: VISION_MODEL,
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: prompt },
                  {
                    type: "image_url",
                    image_url: { url: image },
                  },
                ],
              },
            ],
            temperature: 0.2,
            max_tokens: 2000,
          }),
        });

        if (visionRes.ok) {
          groqData = await visionRes.json();
        } else {
          const errText = await visionRes.text();
          lastError = `Vision model error (${visionRes.status}): ${errText}`;
          console.warn("Vision model attempt failed:", lastError);
        }
      } catch (e: any) {
        console.warn("Vision model exception:", e.message);
      }
    }

    // Case B: If vision model didn't return or we have extracted text / query, use text reasoning model
    if (!groqData) {
      const combinedText = extractedText || textQuery || "Photo of standard medicine or product label.";
      const textPrompt =
        mode === "medicine"
          ? buildMedicinePrompt(combinedText)
          : buildProductPrompt(combinedText);

      const textRes = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: TEXT_MODEL,
          messages: [{ role: "user", content: textPrompt }],
          temperature: 0.2,
          max_tokens: 2000,
        }),
      });

      if (textRes.ok) {
        groqData = await textRes.json();
      } else {
        // Fallback to secondary model
        const fallbackRes = await fetch(GROQ_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: FALLBACK_MODEL,
            messages: [{ role: "user", content: textPrompt }],
            temperature: 0.2,
            max_tokens: 2000,
          }),
        });
        if (fallbackRes.ok) {
          groqData = await fallbackRes.json();
        } else {
          const errData = await fallbackRes.text();
          return NextResponse.json(
            { error: "AI analysis server is busy. Please try again.", details: errData },
            { status: 500 }
          );
        }
      }
    }

    const rawContent = groqData?.choices?.[0]?.message?.content;
    if (!rawContent) {
      return NextResponse.json(
        { error: "No response received from AI engine." },
        { status: 500 }
      );
    }

    // Parse and sanitize JSON
    const cleanJson = rawContent
      .replace(/```json\n?/gi, "")
      .replace(/```\n?/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleanJson);
      return NextResponse.json({ result: parsed, mode });
    } catch (parseError) {
      // If direct parse fails, try extracting first valid { ... }
      const match = cleanJson.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        return NextResponse.json({ result: parsed, mode });
      }
      return NextResponse.json(
        { error: "Could not structure AI health analysis.", raw: rawContent },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("API /api/analyze error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}
