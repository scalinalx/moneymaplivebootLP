import { NextRequest, NextResponse } from "next/server";
import { captureLead } from "@/services/ana-ai/leadService";

// Saves an Offer Flow sign-up server-side (ana_ai_leads is service-role-only).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!name || name.length > 200) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await captureLead(name, email);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Ana AI Offer Flow lead error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
