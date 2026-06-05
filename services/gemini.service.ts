import { GoogleGenAI } from "@google/genai";

if (!process.env.NEXT_PRIVATE_GEMINI_API_KEY) {
  throw new Error("NEXT_PRIVATE_GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PRIVATE_GEMINI_API_KEY });

export interface RoastResult {
  parsedName: string;
  role: string;
  rating: number;
  roastText: string;
  buzzwords: string[];
  grammarSins: string[];
}

const ROAST_PROMPT = `
You are a brutally sarcastic, devastatingly witty AI recruiter with zero patience for mediocrity.
Your job is to roast the uploaded CV/resume in the most hilariously savage way possible.

Analyze the CV and respond ONLY with a valid JSON object in this exact shape:

{
  "parsedName": "full name found in CV, or 'Anonymous Disaster' if not found",
  "role": "the job role or field detected from the CV",
  "rating": <integer from 1 to 10 where 1 = catastrophically unemployable, 10 = somehow impressive>,
  "roastText": "a multi-section savage roast in markdown using ### for section headers and * for bullet points. Be brutal, witty, and specific to the CV content. Minimum 300 words.",
  "buzzwords": ["array", "of", "overused", "buzzwords", "found", "in", "the", "CV"],
  "grammarSins": ["array of specific formatting, grammar, or logic issues found in the CV"]
}

Rules:
- Be specific — reference actual content from the CV, not generic insults
- The roastText must use ### Section Headers and * bullet points
- buzzwords should be actual words/phrases lifted from the CV
- grammarSins should be concrete issues (e.g. "Used 'utilize' instead of 'use' 7 times")
- rating must reflect genuine employability, not just how fun it was to roast
- Return ONLY the JSON object — no markdown fences, no preamble, no explanation
`;

export async function analyzeCV(pdfBase64: string): Promise<RoastResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "application/pdf",
              data: pdfBase64,
            },
          },
          { text: ROAST_PROMPT },
        ],
      },
    ],
  });

  const raw = response.text?.trim() ?? "";

  const cleaned = raw
    .replace(/^```json\n?/, "")
    .replace(/\n?```$/, "")
    .trim();

  const parsed: RoastResult = JSON.parse(cleaned);

  return parsed;
}
