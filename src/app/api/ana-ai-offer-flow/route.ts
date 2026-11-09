import { NextRequest, NextResponse } from "next/server";
import { generateOfferStack, refineOfferStack } from "@/services/ana-ai/geminiService";
import { trackActivity } from "@/services/ana-ai/leadService";

// Best-effort: a tracking failure must never cost the user their result.
const track = async (email: unknown, input: string, type: "initial_generation" | "refinement") => {
  if (typeof email !== "string" || !email.trim() || email.length > 254) return;
  try {
    await trackActivity(email.trim(), input, type);
  } catch (err) {
    console.error("Ana AI Offer Flow tracking error:", err);
  }
};

// Server-side proxy for the Offer Flow tool so the Gemini key never ships to the browser.
// Generation takes ~15-25s.
export const maxDuration = 120;

const MAX_TEXT = 2000;
const MAX_STACK_JSON = 50000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body?.action;
    const expertise = typeof body?.expertise === "string" ? body.expertise.trim() : "";

    if (!expertise) {
      return NextResponse.json({ error: "Please describe your expertise." }, { status: 400 });
    }
    if (expertise.length > MAX_TEXT) {
      return NextResponse.json({ error: "Your description is too long." }, { status: 400 });
    }

    if (action === "generate") {
      const data = await generateOfferStack(expertise);
      await track(body?.email, expertise, "initial_generation");
      return NextResponse.json(data);
    }

    if (action === "refine") {
      const feedback = typeof body?.feedback === "string" ? body.feedback.trim() : "";
      const currentStack = body?.currentStack;

      if (!feedback || feedback.length > MAX_TEXT) {
        return NextResponse.json({ error: "Please enter feedback (max 2000 characters)." }, { status: 400 });
      }
      if (!currentStack || typeof currentStack !== "object" || JSON.stringify(currentStack).length > MAX_STACK_JSON) {
        return NextResponse.json({ error: "Invalid offer stack." }, { status: 400 });
      }

      const data = await refineOfferStack(expertise, currentStack, feedback);
      await track(body?.email, feedback, "refinement");
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (error: unknown) {
    console.error("Ana AI Offer Flow API Error:", error);
    return NextResponse.json({ error: "Something went wrong generating your offer stack." }, { status: 500 });
  }
}
