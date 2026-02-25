import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            tokenId,
            title,
            keywords = "",
            style = "",
            aspectRatio = "16:9",
            lessVirality = false
        } = body;

        const numImages = 2; // Always generate 2 images
        const creditCost = 2; // 1 credit per image as requested

        if (!tokenId || !title) {
            return NextResponse.json({ success: false, error: "Token ID and title are required." }, { status: 400 });
        }

        if (!GEMINI_API_KEY) {
            return NextResponse.json({ success: false, error: "Image generation is not configured on the server." }, { status: 500 });
        }

        // 1. Verify Token validitiy
        const { data: user, error: userError } = await supabase
            .from('show_dont_tell_users')
            .select('id, expires_at, usage, history, credits')
            .eq('token_id', tokenId)
            .single();

        if (userError || !user) {
            return NextResponse.json({ success: false, error: "Invalid Token ID." }, { status: 401 });
        }

        const expiryDate = new Date(user.expires_at);
        if (expiryDate < new Date()) {
            return NextResponse.json({ success: false, error: "This Token ID has expired." }, { status: 403 });
        }

        if (user.credits !== undefined && user.credits < creditCost) {
            return NextResponse.json({ success: false, error: "Insufficient credits." }, { status: 403 });
        }

        // 2. Setup Gemini 2.5 Flash Image Request
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        const line2 = lessVirality ? "Title grabs attention. Visuals spark curiosity." : "Title grabs attention. Visuals spark curiosity. Designed to farm engagement.";
        const line4 = lessVirality ? "Bold, creative visuals; highlight action/emotion; captivate the viewer." : "Viral, bold, creative visuals; highlight action/emotion; hook and captivate.";

        let promptText = `Make a viral thumbnail for a post titled "${title}"
${line2}

Engaging, eye-catching visuals. ${style}.
${line4}`;

        if (keywords && keywords.trim().length > 0) {
            promptText += `\n\nAdditional keywords: ${keywords}`;
        }

        console.log(`[Nano Banana / Gemini] Generating ${numImages} images. Prompt:\n${promptText}`);

        const generateImage = async () => {
            try {
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash-image",
                    contents: promptText,
                    config: {
                        imageConfig: {
                            aspectRatio: aspectRatio,
                        }
                    } as any
                });

                if (response.candidates && response.candidates[0]?.content?.parts) {
                    for (const part of response.candidates[0].content.parts) {
                        if (part.inlineData && part.inlineData.data) {
                            return `data:image/jpeg;base64,${part.inlineData.data}`;
                        }
                    }
                }
                throw new Error('No image data found in candidate parts.');
            } catch (err: any) {
                console.error("Gemini API Error details:", err);
                throw err;
            }
        };

        // Generate N images in parallel
        const promises = Array.from({ length: numImages }).map(() => generateImage());
        const results = await Promise.allSettled(promises);

        const generatedImages: string[] = [];
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                generatedImages.push(result.value);
            } else {
                console.error("Image generation failed:", result.reason);
            }
        });

        if (generatedImages.length === 0) {
            return NextResponse.json({ success: false, error: "Failed to generate any images." }, { status: 500 });
        }

        // 3. Update Supabase Usage and History
        const currentHistory = Array.isArray(user.history) ? user.history : [];
        const newHistoryEntry = {
            timestamp: new Date().toISOString(),
            title,
            keywords,
            style,
            aspectRatio,
            lessVirality,
            images_requested: numImages,
            images_generated: generatedImages.length,
            credits_spent: creditCost
        };

        const { error: updateError } = await supabase
            .from('show_dont_tell_users')
            .update({
                usage: user.usage + creditCost,
                credits: user.credits !== undefined ? Math.max(0, user.credits - creditCost) : 5000 - creditCost,
                history: [...currentHistory, newHistoryEntry]
            })
            .eq('id', user.id);

        if (updateError) {
            console.error("Failed to update user usage/history:", updateError);
        }

        return NextResponse.json({
            success: true,
            images: generatedImages,
            newUsage: user.usage + creditCost,
            newCredits: user.credits !== undefined ? Math.max(0, user.credits - creditCost) : 5000 - creditCost
        });

    } catch (error: any) {
        console.error("Generate error:", error);
        return NextResponse.json({ success: false, error: "Failed to process the request." }, { status: 500 });
    }
}
