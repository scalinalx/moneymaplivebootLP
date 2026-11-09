import { NextRequest, NextResponse } from "next/server";
import { generateEmailSequence } from "@/components/launch-stack/services/geminiService";
import { LaunchFormData } from "@/components/launch-stack/types";

// Server-side proxy for Launch Stack so the Gemini key never ships to the browser.
// A 9-email sequence takes ~40s to generate.
export const maxDuration = 120;

const MAX_FIELD = 3000;
const REQUIRED_FIELDS = [
  "leadMagnetName",
  "leadMagnetDescription",
  "coreProductName",
  "coreProductDescription",
  "audience",
  "launchDate",
] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    for (const field of REQUIRED_FIELDS) {
      const value = body?.[field];
      if (typeof value !== "string" || !value.trim()) {
        return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
      }
      if (value.length > MAX_FIELD) {
        return NextResponse.json({ error: "One of your answers is too long." }, { status: 400 });
      }
    }
    if (body.extraOfferDetails !== undefined &&
        (typeof body.extraOfferDetails !== "string" || body.extraOfferDetails.length > MAX_FIELD)) {
      return NextResponse.json({ error: "Extra offer details are too long." }, { status: 400 });
    }

    const data: LaunchFormData = {
      leadMagnetName: body.leadMagnetName,
      leadMagnetDescription: body.leadMagnetDescription,
      coreProductName: body.coreProductName,
      coreProductDescription: body.coreProductDescription,
      audience: body.audience,
      launchDate: body.launchDate,
      extraOfferDetails: body.extraOfferDetails,
    };

    const result = await generateEmailSequence(data);
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Launch Stack API Error:", error);
    return NextResponse.json({ error: "Failed to generate the email sequence. Please try again." }, { status: 500 });
  }
}
