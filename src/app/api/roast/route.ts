import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface RoastRequest {
  code: string;
  language?: string;
  roastLevel?: "halka" | "tikha" | "zanzanit";
  persona?: "standup" | "sharma_ji" | "professor" | "hostel_bhau" | "recruiter";
  errorMessage?: string;
}

interface IssueItem {
  lines: string;
  category: "LOGIC" | "PERFORMANCE" | "STYLE" | "SECURITY" | "SYNTAX";
  severity: "HIGH" | "MEDIUM" | "LOW";
  roast: string;
  fix: string;
}

interface RoastResponse {
  headline: string;
  score: number;
  scoreLabel: string;
  spiceVerdict: string;
  issues: IssueItem[];
  errorExplanation: string | null;
  correctedCode: string;
  encouragement: string;
  isFallback?: boolean;
}

// Pre-defined fallback roasts for workshops/offline mode (Section 19 of design spec)
const FALLBACK_ROASTS: Record<string, RoastResponse> = {
  default: {
    headline: "Yeh code nahi, Panchavati Express ki general boghi hai — gardi khup, speed zero!",
    score: 72,
    scoreLabel: "ATTENDANCE SHORT, CODE BHI SHORT",
    spiceVerdict: "Zanzanit 🌶️🔥",
    issues: [
      {
        lines: "02–04",
        category: "LOGIC",
        severity: "HIGH",
        roast: "Bhau, yaha pe condition nahi, Nashik Highway cha blind turn ahe ha! Equality check visarla ka?",
        fix: "Use strict equality `===` instead of assignment `=` inside the conditional."
      },
      {
        lines: "07",
        category: "PERFORMANCE",
        severity: "MEDIUM",
        roast: "O(n!) complexity detected. Yeh loop chalne se pehle DevFest Nashik 2027 aa jayega!",
        fix: "Replace nested iterative scan with a Hash Map / Set lookup for O(1) time."
      },
      {
        lines: "11",
        category: "STYLE",
        severity: "LOW",
        roast: "Variable ka naam 'temp_final_really_done_v2'? College project submission aahe ka?",
        fix: "Rename identifier to a descriptive noun describing its domain purpose."
      }
    ],
    errorExplanation: "Uncaught ReferenceError: You tried calling a method on an undefined object before initialization.",
    correctedCode: `// DevFest Nashik 2026 - Cleaned & Optimized Edition
function calculateTelemetry(records: number[]): number {
  if (!records || records.length === 0) return 0;
  
  // O(N) optimized pipeline with explicit safeguards
  const lookupSet = new Set(records);
  const validSum = records.reduce((acc, curr) => acc + (lookupSet.has(curr) ? curr : 0), 0);
  
  return validSum;
}`,
    encouragement: "Chinta mat kar! Code bhi gym jaisa hai — repeat karoge toh better hoga. DevFest Nashik 2026 is proud of you.",
    isFallback: true
  }
};

export async function POST(req: NextRequest) {
  try {
    const body: RoastRequest = await req.json();
    const { code, language = "auto", roastLevel = "tikha", persona = "standup", errorMessage = "" } = body;

    if (!code || code.trim().length === 0) {
      return NextResponse.json({ error: "Code cannot be empty, bhau!" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not configured, serving offline fallback roast");
      return NextResponse.json(FALLBACK_ROASTS.default);
    }

    const personaDescriptions: Record<string, string> = {
      standup: "A witty, sarcastic Indian tech stand-up comedian with rapid-fire Hinglish and Marathi punchlines.",
      sharma_ji: "Sharma ji ka Beta who scored 99.9% and wrote an OS in class 8, constantly comparing the developer with exceptional relatives.",
      professor: "A strict engineering college professor threatening zero internal marks and attendance shortage.",
      hostel_bhau: "A caring but blunt Nashik engineering hostel senior ('Bhau') using local slang like 'Wat lavli', 'Ata bagha', 'Jugaad band kar'.",
      recruiter: "An exasperated campus recruiter reviewing candidate submissions before DevFest Nashik placement interviews."
    };

    const spiceLevelDescriptions: Record<string, string> = {
      halka: "Mild and affectionate teasing, constructive, light humor with small laughs.",
      tikha: "Medium-spicy, savage observations, punchy Hinglish idioms, genuine debugging roast.",
      zanzanit: "Maximum Nashik extra-spicy roast (Zanzanit Misal level!), ruthlessly witty, unapologetic DevFest energy, but roasting the code habits, never attacking the person."
    };

    const systemPrompt = `You are "Code Roaster", the official AI debugging roaster for DevFest Nashik 2026 (built by Google Developer Groups Nashik).
Your personality: ${personaDescriptions[persona] || personaDescriptions.standup}.
Spiciness intensity: ${spiceLevelDescriptions[roastLevel] || spiceLevelDescriptions.tikha}.

Tone & Rules:
- Blend English, Hinglish, and authentic Marathi slang/expressions naturally ("Bhau", "Wat lavli", "Panchavati Express", "Chai thandi ho gayi", "Zanzanit", "DevFest Nashik 2026").
- The PRD Comedy Contract: Roast the code, bad architecture, poor naming, and questionable logic, NEVER insult the person directly.
- Always be technically accurate: find real bugs, code smells, anti-patterns, or performance bottlenecks in the user's snippet.
- The "Redemption Arc" must contain complete, high-quality, working corrected code.
- Return ONLY a valid JSON object matching the exact schema below.

JSON Schema:
{
  "headline": "A savage, funny one-liner headline summarizing the disaster in quotes",
  "score": number between 15 and 95 (higher score = more roasted/fried),
  "scoreLabel": "SHORT MONOSPACE BADGE TEXT (e.g. ATTENDANCE SHORT, CODE BHI SHORT)",
  "spiceVerdict": "e.g. Zanzanit 🌶️🔥 or Tikha 🌶️ or Halka 🍋",
  "issues": [
    {
      "lines": "Line number range e.g. 03-05 or 12",
      "category": "LOGIC" | "PERFORMANCE" | "STYLE" | "SECURITY" | "SYNTAX",
      "severity": "HIGH" | "MEDIUM" | "LOW",
      "roast": "Funny spicy roast explaining the bad code habit",
      "fix": "Actionable technical instruction to fix it"
    }
  ],
  "errorExplanation": "Plain explanation in Hinglish/English of the user's runtime error if supplied, else null",
  "correctedCode": "The full working clean corrected code block",
  "encouragement": "Warm, encouraging closing quote (e.g. Chinta mat kar. Code bhi gym jaisa hai — repeat karoge toh better hoga.)"
}`;

    const userPrompt = `Language: ${language}
Roast Level: ${roastLevel}
Persona: ${persona}
${errorMessage ? `Supplied Runtime Error: ${errorMessage}\n` : ""}
Code snippet to roast:
\`\`\`${language}
${code}
\`\`\``;

    // Call Gemini 2.5 Flash with structured JSON output
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const geminiPayload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: systemPrompt },
            { text: userPrompt }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.85
      }
    };

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", response.status, errText);
      return NextResponse.json(FALLBACK_ROASTS.default);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidate) {
      console.warn("No candidate text from Gemini, returning fallback");
      return NextResponse.json(FALLBACK_ROASTS.default);
    }

    const parsedRoast: RoastResponse = JSON.parse(candidate);
    return NextResponse.json(parsedRoast);

  } catch (error) {
    console.error("Roast generation handler failure:", error);
    return NextResponse.json(FALLBACK_ROASTS.default);
  }
}
