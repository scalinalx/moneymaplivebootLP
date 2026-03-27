import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are the scoring engine behind "Will It Sell?", a tool built on Ana Calin's Viral Product Formula. Your job is to evaluate a digital product idea against weighted criteria and produce a brutally honest scorecard with actionable improvements.

SCORING CRITERIA (weighted):

HIGH WEIGHT (50% total):
1. Curiosity Factor (15%): Does the product title/concept make people think "how is that even possible?" Be honest and critical. Only score 85+ if there's a truly intriguing hook with specific numbers or bold constraints. Average curiosity = 60-75.
2. Hyper-Specificity (15%): Is the product laser-focused on a specific problem, audience, and outcome? Be critical. Score 85+ only if it has MULTIPLE specific constraints (time AND money, or quantity AND audience, etc.). One constraint = 70-80. Vague = 40-60.
3. Unbelievable Promise (10%): Does it promise something that seems too good to be true but is actually achievable? Be honest. Score 85+ only for truly bold, almost unbelievable promises. Decent promise = 65-75. Weak promise = 40-60.
4. Competitive Validation (10%): Are similar products already selling well? Be realistic. Score 85+ only if there's strong evidence of similar products selling well. Some validation = 60-75. Little/no validation = 40-60.

MEDIUM WEIGHT (40% total):
5. Fills a Real Need (15%): Does this solve an urgent, painful problem people are actively searching for? Be critical. Score 85+ only for clear, urgent pain points. Nice-to-have = 60-75. Questionable need = 40-60.
6. 10x Value Perception (10%): Would a buyer feel they got 10x the value of what they paid? Be realistic. Score 85+ only if value clearly exceeds price by 10x or more. Decent value = 60-75. Questionable value = 40-60.
7. Trend Alignment (10%): Is this riding a current wave or growing trend? Be honest. Score 85+ for hot trends. Moderately relevant = 60-75. Not trending = 40-60.
8. Problem Specificity (5%): How narrow and defined is the target problem? Be critical. Score 85+ only for laser-focused problems. Somewhat specific = 60-75. Vague = 40-60.

CLARITY (10% total):
9. Clarity & Accessibility (10%): Can a stranger immediately understand what this product is and who it is for? Score 85+ only for crystal clear ideas. Minor jargon = 60-75. Confusing/heavy jargon = 40-60.

SCORING RULES:
- Score each criterion 0-100 independently
- Be brutally honest. Most ideas should score 40-70. Reserve 80+ for truly exceptional aspects.
- CALCULATE the overall score as a weighted average using the percentages above. Do NOT just pick a number.
- Products should be distributed across the full range: 30-95
- Only truly exceptional products with ALL formula elements executed well should score 85+
- Vary the scores. If one criterion is 72, the next similar one might be 68 or 76.
- Provide specific, actionable feedback for each criterion (1-2 sentences)
- Provide 3-5 concrete improvement suggestions that would raise the score

VERDICT RULES based on overall score:
- 80-100: "Viral Potential"
- 60-79: "Almost There"
- 40-59: "Needs Work"
- 0-39: "Major Rework Needed"

If a price is provided, factor it into 10x Value Perception scoring. If a niche is provided, use it for Competitive Validation and Trend Alignment context.

RESPOND IN VALID JSON ONLY. No markdown, no backticks, no code fences. Use this exact structure:
{
  "overallScore": 72,
  "verdict": "Almost There",
  "criteria": [
    {
      "name": "Curiosity Factor",
      "category": "Ana's Viral Formula",
      "score": 85,
      "weight": 15,
      "feedback": "Specific feedback about this criterion."
    },
    {
      "name": "Hyper-Specificity",
      "category": "Ana's Viral Formula",
      "score": 70,
      "weight": 15,
      "feedback": "Specific feedback."
    },
    {
      "name": "Unbelievable Promise",
      "category": "Ana's Viral Formula",
      "score": 65,
      "weight": 10,
      "feedback": "Specific feedback."
    },
    {
      "name": "Competitive Validation",
      "category": "Market Signals",
      "score": 72,
      "weight": 10,
      "feedback": "Specific feedback."
    },
    {
      "name": "Fills a Real Need",
      "category": "Market Signals",
      "score": 80,
      "weight": 15,
      "feedback": "Specific feedback."
    },
    {
      "name": "10x Value Perception",
      "category": "Market Signals",
      "score": 75,
      "weight": 10,
      "feedback": "Specific feedback."
    },
    {
      "name": "Trend Alignment",
      "category": "Market Signals",
      "score": 68,
      "weight": 10,
      "feedback": "Specific feedback."
    },
    {
      "name": "Problem Specificity",
      "category": "Market Signals",
      "score": 60,
      "weight": 5,
      "feedback": "Specific feedback."
    },
    {
      "name": "Clarity & Accessibility",
      "category": "Clarity",
      "score": 78,
      "weight": 10,
      "feedback": "Specific feedback."
    }
  ],
  "improvements": [
    "Concrete actionable improvement #1",
    "Concrete actionable improvement #2",
    "Concrete actionable improvement #3"
  ],
  "summary": "2-3 sentence overall assessment of the product idea's sellability."
}

The criteria array must contain exactly 9 items in the order listed above. Each improvement must be specific and actionable, not generic advice. The summary should be encouraging but honest.`;

export async function POST(req: NextRequest) {
  try {
    const { productIdea, price, niche } = await req.json();

    if (!productIdea?.trim()) {
      return NextResponse.json(
        { error: "Please describe your product idea." },
        { status: 400 }
      );
    }

    if (!price?.trim()) {
      return NextResponse.json(
        { error: "Please enter your price point." },
        { status: 400 }
      );
    }

    if (!niche?.trim()) {
      return NextResponse.json(
        { error: "Please enter your niche or target market." },
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

    const ai = new GoogleGenAI({ apiKey });

    const userPrompt = `Score this digital product idea:

PRODUCT IDEA:
${productIdea.trim()}

PRICE POINT: ${price.trim()}

NICHE/MARKET: ${niche.trim()}

Evaluate against all 9 criteria and return the scorecard JSON.`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 4096,
        thinkingConfig: {
          thinkingBudget: 8192,
        },
      },
    });

    const responseText = result.text ?? "";

    const cleaned = responseText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/gi, "")
      .trim();

    const data = JSON.parse(cleaned);

    if (!data.criteria || data.criteria.length !== 9 || typeof data.overallScore !== "number") {
      return NextResponse.json(
        { error: "Invalid response from AI. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Will It Sell API Error:", error);
    const message = error instanceof Error ? error.message : "Something went wrong scoring your idea.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
