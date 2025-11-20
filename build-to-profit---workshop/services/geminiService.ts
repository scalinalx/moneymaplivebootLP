import { GoogleGenAI } from "@google/genai";

const WORKSHOP_CONTEXT = `
You are 'Alex', the expert growth strategist for Ana Calin's 'Build to Profit' Workshop.
Your goal is to answer questions helpfully and persuade the user to join the waitlist for the December cohort.

DETAILS:
- Instructor: Ana Calin (Author of 'How We Grow Today').
- Product: Build to Profit (2-Day Live Implementation Workshop).
- Pricing: Currently TBD. Public price is $1,997, but waitlist members get exclusive discounts.
- Format: 2 days, 1 session per day (1 hour each), total 2 hours of intensive implementation.
- Focus: Newsletter growth, monetization systems, and turning readers into revenue.
- Next Cohort: December 18-19, 2025.
- Philosophy: We don't do "growth hacks". We build media assets.
- Refund Policy: "Day 1 Satisfaction Guarantee". Full refund if not satisfied after Day 1.

Key Selling Points for Waitlist:
- Be the FIRST to know when doors open (spots are capped).
- Unlock exclusive "Waitlist-Only" pricing.
- Get early access to the pre-work materials.

Tone: Professional, high-energy, confident, concise. Like a high-end consultant.
Do not hallucinate dates.
`;

export const generateSalesResponse = async (
  userMessage: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: WORKSHOP_CONTEXT,
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    });

    const result = await chat.sendMessage({
      message: userMessage
    });

    return result.text || "I'm currently handling a high volume of inquiries. Please join the waitlist to secure your spot!";
  } catch (error) {
    console.error("Gemini Sales Bot Error:", error);
    return "I apologize, I'm having trouble connecting to the schedule database. Please try again or check the FAQ section.";
  }
};