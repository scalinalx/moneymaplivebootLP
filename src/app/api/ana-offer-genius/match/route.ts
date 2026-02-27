import { NextRequest, NextResponse } from 'next/server';
import { findTopMatches } from '@/services/ana-ai/offerMatchingService';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

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
            model: "gemini-3-flash-preview", // Upgraded to Gemini 3 Flash Preview
            generationConfig: {
                responseMimeType: "application/json",
                maxOutputTokens: 2000, // Ensure enough capacity for the detailed response
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

        let customizedMatches;
        try {
            // Clean up text if needed (Gemini sometimes adds ```json blocks even with mimeType set)
            const cleanedJson = customizedMatchesText
                .replace(/^```json/gm, '')
                .replace(/```$/gm, '')
                .trim();

            customizedMatches = JSON.parse(cleanedJson);
        } catch (parseError) {
            console.error('❌ OfferGenius JSON Parse Error:', parseError);
            console.error('📄 Raw Content that failed to parse:', customizedMatchesText);

            // Fallback: try to find anything that looks like a JSON array/object if cleanup failed
            const jsonMatch = customizedMatchesText.match(/\[\s*\{[\s\S]*\}\s*\]/) || customizedMatchesText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    customizedMatches = JSON.parse(jsonMatch[0]);
                } catch (innerError) {
                    throw new Error(`Failed to parse AI response: ${customizedMatchesText.substring(0, 100)}...`);
                }
            } else {
                throw new Error(`AI response was not valid JSON: ${customizedMatchesText.substring(0, 100)}...`);
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
