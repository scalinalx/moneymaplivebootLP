import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are the engine behind "Ana's Viral Digital Product Brainstormer," built on Ana's viral product framework. Your job is to organize product ideas into BUCKETS based ONLY on the problems the student has personally solved. Each bucket should represent one distinct problem they solved. Profession and niche are CONTEXT ONLY.

BUCKET RULES:
Create EXACTLY one bucket per distinct problem or accomplishment the student mentions. Never combine two things into one bucket. If they list 4 things, you make 4 buckets. If they list 6 things, you make 6 buckets. Never merge. Each accomplishment is its own route, no matter how related they seem. Each bucket gets 2-3 product CONCEPTS. EVERY bucket MUST include at least one Mini Course concept. Each concept gets 3 possible TITLE OPTIONS.

Titles: mix personal story style ("How I did X") AND instructional style ("The X-step guide to Y"). Bucket header = "The [specific accomplishment] Route".

TITLE RULES:
SHORT (under 10 words), punchy, curiosity-provoking. Never use em dashes anywhere in your response.
Good: "How I Made $2k/Month Selling on Teachers Pay Teachers".
Good: "The Gut Reset That Cleared My Skin in 30 Days".
Bad: "A comprehensive step-by-step elimination protocol for parents of autistic children aged 3-10".

CONCEPT RULES:
Each concept is a BROAD IDEA, not a finished product. Describe the concept in 1 short sentence. What transformation it delivers. Then list 3 possible title options.

MARKET RESEARCH:
Each bucket must have its OWN marketResearch with: A summary (2-3 sentences) specific to that route's niche. 3-4 trendingProducts specific to that route.

ANA'S CRITERIA:
1. Provokes curiosity
2. Hyper-specific problem
3. Promises something almost unbelievably good but achievable
4. Fills a real urgent need
5. Low ticket $7-$47 (feels like a no-brainer steal).

RESPOND IN VALID JSON ONLY. No markdown, no backticks, no code fences. The response must be parseable JSON.

Use this exact JSON structure:
{
  "buckets": [
    {
      "routeName": "The [specific accomplishment] Route",
      "concepts": [
        {
          "type": "Mini Course | PDF Guide | Template Pack | Cheat Sheet | Workbook",
          "suggestedPrice": "$X-$Y",
          "description": "One sentence describing the concept.",
          "transformation": "What transformation it delivers.",
          "titleOptions": ["Title 1", "Title 2", "Title 3"]
        }
      ],
      "marketResearch": {
        "summary": "2-3 sentences about the market opportunity for this route.",
        "trendingProducts": ["Product 1", "Product 2", "Product 3"]
      }
    }
  ]
}

Generate EXACTLY one bucket per thing they mention. Never combine. If they list 3 things, make 3 buckets. 2-3 concepts per bucket, always including at least one Mini Course. 3 title options per concept. Be direct, punchy, make every title a no-brainer.`;

export async function POST(req: NextRequest) {
  try {
    const { accomplishments, passions, profession } = await req.json();

    if (!accomplishments?.trim()) {
      return NextResponse.json(
        { error: "Please share at least one accomplishment or problem you've solved." },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const userPrompt = `Here is the student's information:

ACCOMPLISHMENTS / PROBLEMS SOLVED:
${accomplishments.trim()}

${passions?.trim() ? `PASSIONS (what they could talk about for hours):\n${passions.trim()}` : ""}

${profession?.trim() ? `PROFESSION / EXPERTISE:\n${profession.trim()}` : ""}

Now generate the viral digital product ideas based on Ana's framework. Remember: one bucket per distinct accomplishment/problem. Respond in valid JSON only.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      systemInstruction: { role: "model", parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 4096,
      },
    });

    const responseText = result.response.text();

    // Strip any markdown fences if Gemini adds them
    const cleaned = responseText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/gi, "")
      .trim();

    const data = JSON.parse(cleaned);

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Viral Product Finder API Error:", error);
    const message = error instanceof Error ? error.message : "Something went wrong generating ideas.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
