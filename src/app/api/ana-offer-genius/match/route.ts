import { NextRequest, NextResponse } from 'next/server';
import { findTopMatches } from '@/services/ana-ai/offerMatchingService';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

/**
 * Last-ditch repair for a truncated JSON array. Walks the text counting brace
 * depth, finds the latest position where we're back at depth 0 inside the
 * array, slices to that point and seals the array with `]`. If that parses,
 * we keep the (possibly fewer) complete offers and drop the half-written one.
 */
function repairTruncatedArray(raw: string): unknown[] | null {
    const start = raw.indexOf('[');
    if (start === -1) return null;
    let depth = 0;
    let inStr = false;
    let escape = false;
    let lastSafe = -1;
    for (let i = start; i < raw.length; i++) {
        const c = raw[i];
        if (escape) {
            escape = false;
            continue;
        }
        if (c === '\\') {
            escape = true;
            continue;
        }
        if (c === '"') {
            inStr = !inStr;
            continue;
        }
        if (inStr) continue;
        if (c === '{' || c === '[') depth++;
        else if (c === '}' || c === ']') {
            depth--;
            // We just closed a top-level offer object inside the outer array.
            if (depth === 1 && c === '}') lastSafe = i;
        }
    }
    if (lastSafe === -1) return null;
    const repaired = raw.slice(start, lastSafe + 1) + ']';
    try {
        return JSON.parse(repaired) as unknown[];
    } catch {
        return null;
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { expertise, niche, audienceSize, revenueGoal, launchTimeline, effortLevel, deliveryPreference, useVideo, limit = 3 } = body;

        if (!expertise) {
            return NextResponse.json({
                success: false,
                error: 'Expertise is required'
            }, { status: 400 });
        }

        console.log(`🚀 OfferGenius: Customizing matches for "${expertise}" (${niche})`);

        // 1. Find semantic matches
        const searchQuery = `${expertise} ${niche}`;
        const rawMatches = await findTopMatches(searchQuery, limit);

        // 2. Use Gemini to "Customize" the Top 3 matches
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
            generationConfig: {
                responseMimeType: "application/json",
                // Real-world successful runs land around 3-4K tokens of JSON +
                // ~1-2K of MEDIUM thinking tokens. 8000 gives ~30% headroom and
                // caps the worst-case API cost. The repair helper below salvages
                // partial output if Gemini ever does hit the cap on a complex run.
                maxOutputTokens: 8000,
                // @ts-ignore
                thinking_config: {
                    thinking_level: "MEDIUM"
                }
            }
        });

        const prompt = `
            You are "Ana Calin", a world-class offer architect, 10-figure Digital Product Creator, and direct-response marketing expert. 
            You are known for building high-converting products and elite-level direct-response copy.
            Your golden rule is "Clear over Clever."

            CRITICAL POLICY: DO NOT mention any other business coaches, experts, or educators (e.g., Hormozi, Amy Porterfield, Maria Wendt, BossBabe, etc.). 
            You must ONLY refer to your own expertise as Ana Calin. 

            I have found 3 high-converting core offer architectures for a user. 
            YOUR TASK: Adapt these 3 offers to be an ABSOLUTELY PERFECT CUSTOM FIT for the user based on their specific inputs.

            USER INPUTS:
            - Expertise: ${expertise}
            - Niche: ${niche}
            - Audience Size: ${audienceSize}
            - Revenue Goal: ${revenueGoal}
            - Launch Timeline: ${launchTimeline}
            - Desired Effort: ${effortLevel}
            - Delivery Style: ${deliveryPreference}
            - Can use Video? ${useVideo ? 'YES' : 'NO'}

            RAW MATCHES:
            ${JSON.stringify(rawMatches, null, 2)}

            NAMING FRAMEWORKS (Apply EXACTLY ONE of these internal Ana Calin frameworks to each individual offer title):
            1. The "Institutional Authority": [Subject/Result] + [Institutional Noun: Academy, Lab, Blueprint, School, etc.].
            2. The "Direct-Response Metric": The [Exact ROI/Metric] + [Specific Result].
            3. The "Pure Leverage Shortcut": Max results, min effort. (Uses labels like: Lazy, Passive, 1-Hour, Secret).
            4. The "Identity Transformation": Identity shifts (CEO, Boss) or [Input] to [Output] (e.g., Content to Cash).

            YOUR TASK:
            For each of the 3 offers:
            1. Analyze the context and select the SINGLE most effective Naming Framework for that specific offer.
            2. Rewrite the TITLE to strictly follow that framework's structure.
            3. Rewrite the UNFAIR HOOK to be elite level direct-response copy that sounds like it came directly from Ana Calin.
            4. Create a "how_you_sell_this": A deep tactical executive summary. You MUST include:
               - how to leverage the lead magnet to build trust and liquid cash.
               - what is the UNIQUE sales leverage this specific offer has and how to take advantage of it.
               - what's the specific leverage for growth and scale (how to 10x it).
               - plan for fast shipping, testing, and iteration.
               - Remember: ALWAYS provide 10x more value than you ask for in exchange.

            RETURN ONLY valid JSON in this structure:
            [
              {
                "offer": {
                  "id": "original_id",
                  "title": "Elite Framework Multiplier Name",
                  "naming_framework_used": "Institutional Authority | Direct-Response Metric | Pure Leverage | Identity Transformation",
                  "niche": "Customized Niche",
                  "effort_level": "Low | Mid | High",
                  "launch_price": number,
                  "audience": { "icp": "Customized ICP" },
                  "framework": {
                    "unfair_hook": "Copywriter-level hook...",
                    "value_stack": ["Item 1", "Item 2", "Item 3", "Item 4"],
                    "money_funnel": {
                      "lead_magnet": "Specific customized lead magnet",
                      "core_offer": "Specific customized core offer"
                    },
                    "how_you_sell_this": {
                      "executive_summary": "Master copywriter summary...",
                      "lead_magnet_leverage": "How to weaponize the lead magnet...",
                      "sales_leverage": "The unique sales advantage and how to exploit it...",
                      "scale_leverage": "How to 10x this offer's growth...",
                      "value_philosophy": "How you provide massive value first..."
                    }
                  }
                },
                "similarity": number
              }
            ]
        `;

        const result = await model.generateContent(prompt);
        const customizedMatchesText = result.response.text();
        // Gemini exposes finishReason/usage on the candidate — log them so any
        // future truncation is obvious from the server logs.
        const finishReason =
            result.response.candidates?.[0]?.finishReason ?? 'UNKNOWN';
        const usage = result.response.usageMetadata;
        console.log(
            `📊 OfferGenius: finishReason=${finishReason}, length=${customizedMatchesText.length}, tokens=`,
            usage,
        );

        let customizedMatches;
        try {
            const cleanedJson = customizedMatchesText
                .replace(/^```json/gm, '')
                .replace(/```$/gm, '')
                .trim();
            customizedMatches = JSON.parse(cleanedJson);
        } catch (parseError) {
            console.error('❌ OfferGenius JSON Parse Error:', parseError);
            console.error('📄 Raw response length:', customizedMatchesText.length);
            console.error('📄 First 500 chars:', customizedMatchesText.slice(0, 500));
            console.error('📄 Last 500 chars:', customizedMatchesText.slice(-500));

            // Repair attempt #1: full-shape regex
            const jsonMatch =
                customizedMatchesText.match(/\[\s*\{[\s\S]*\}\s*\]/) ||
                customizedMatchesText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    customizedMatches = JSON.parse(jsonMatch[0]);
                } catch {
                    // Repair attempt #2: truncated array — find the last complete
                    // top-level `}` and reseal the array. Common when Gemini hits
                    // maxOutputTokens partway through the 3rd offer.
                    customizedMatches = repairTruncatedArray(customizedMatchesText);
                }
            } else {
                customizedMatches = repairTruncatedArray(customizedMatchesText);
            }

            if (!customizedMatches) {
                const hint =
                    finishReason === 'MAX_TOKENS'
                        ? ' (Gemini hit MAX_TOKENS — bump maxOutputTokens further)'
                        : '';
                throw new Error(
                    `Failed to parse AI response${hint}. Length=${customizedMatchesText.length}, finishReason=${finishReason}.`,
                );
            }
        }

        return NextResponse.json({
            success: true,
            matches: customizedMatches
        });

    } catch (error: any) {
        console.error('💥 OfferGenius API Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Internal Server Error'
        }, { status: 500 });
    }
}
