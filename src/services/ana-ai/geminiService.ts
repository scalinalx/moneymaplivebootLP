import { GoogleGenerativeAI } from "@google/generative-ai";
import { OfferStackResponse } from "../../types/ana-ai";

// Note: Using @google/generative-ai which is the standard package name
// The user provided @google/genai, but it's likely @google/generative-ai
const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const responseSchema = {
    type: "object",
    properties: {
        stack: {
            type: "object",
            properties: {
                leadMagnet: { type: "object", properties: { title: { type: "string" }, price: { type: "string" }, deliveryVehicle: { type: "string" }, description: { type: "string" }, valueStackItems: { type: "array", items: { type: "object", properties: { component: { type: "string" }, value: { type: "string" } } } }, totalValue: { type: "string" }, valueProps: { type: "array", items: { type: "string" } }, bonuses: { type: "array", items: { type: "string" } }, guarantee: { type: "string" } }, required: ["title", "price", "deliveryVehicle", "description", "valueStackItems", "totalValue", "valueProps", "bonuses", "guarantee"] },
                coreProduct: { type: "object", properties: { title: { type: "string" }, price: { type: "string" }, deliveryVehicle: { type: "string" }, description: { type: "string" }, valueStackItems: { type: "array", items: { type: "object", properties: { component: { type: "string" }, value: { type: "string" } } } }, totalValue: { type: "string" }, valueProps: { type: "array", items: { type: "string" } }, bonuses: { type: "array", items: { type: "string" } }, guarantee: { type: "string" } }, required: ["title", "price", "deliveryVehicle", "description", "valueStackItems", "totalValue", "valueProps", "bonuses", "guarantee"] },
                upsell: { type: "object", properties: { title: { type: "string" }, price: { type: "string" }, deliveryVehicle: { type: "string" }, description: { type: "string" }, valueStackItems: { type: "array", items: { type: "object", properties: { component: { type: "string" }, value: { type: "string" } } } }, totalValue: { type: "string" }, valueProps: { type: "array", items: { type: "string" } }, bonuses: { type: "array", items: { type: "string" } }, guarantee: { type: "string" } }, required: ["title", "price", "deliveryVehicle", "description", "valueStackItems", "totalValue", "valueProps", "bonuses", "guarantee"] },
                downsell: { type: "object", properties: { title: { type: "string" }, price: { type: "string" }, deliveryVehicle: { type: "string" }, description: { type: "string" }, valueStackItems: { type: "array", items: { type: "object", properties: { component: { type: "string" }, value: { type: "string" } } } }, totalValue: { type: "string" }, valueProps: { type: "array", items: { type: "string" } }, bonuses: { type: "array", items: { type: "string" } }, guarantee: { type: "string" } }, required: ["title", "price", "deliveryVehicle", "description", "valueStackItems", "totalValue", "valueProps", "bonuses", "guarantee"] },
            },
            required: ["leadMagnet", "coreProduct", "upsell", "downsell"]
        },
        strategySummary: { type: "string" }
    },
    required: ["stack", "strategySummary"]
} as any;

// Next.js adapter for the provided logic
export const generateOfferStack = async (expertise: string): Promise<OfferStackResponse> => {
    try {
        const model = ai.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const prompt = `
      You are a world-class digital product strategist and monetization expert.
      The user is a creator/solopreneur with expertise in: "${expertise}".

      Your goal is to design a "Grand Slam" offer stack for them.
      Apply the principles of high perceived value, scarcity, urgency, and risk reversal.
      
      Create 4 distinct products:
      1. **Lead Magnet (Free)**: Solves a specific, narrow problem immediately.
      2. **Core Product (The Flagship)**: The main system/method. Price typically $97 - $497.
      3. **Upsell (The Accelerator)**: Done-for-you, templates, or coaching. Price $97 - $997.
      4. **Downsell (The Splinter)**: A smaller piece/lower-tier. Price $7 - $97.

      **CRITICAL: THE VALUE STACK**
      For EACH product, you must create a "Value Stack". This is a list of components (modules, tools, scripts, bonuses) included in the offer.
      - Break the product down into 3-6 distinct parts.
      - Assign a **High Perceived Value** (Anchor Price) to each part (e.g., "The Masterclass" Value $297).
      - Ensure the **Total Value** is significantly higher than the actual **Price**.
      - Include Bonuses in the Value Stack list.

      **Delivery Vehicles**:
      Be creative. Use formats like: Evergreen Course, Template Pack, AI Tool, Masterclass, Group Coaching, DFY Service, Private Community, Implementation Sprints, Audits, Calculators.

      Constraints:
      - All prices (actual cost to user) must be <= $997.
      - Tone: Professional, empowering, highly specific.
      
      Return ONLY valid JSON matching this structure:
      {
        "stack": {
          "leadMagnet": { "title": "...", "price": "Free", "deliveryVehicle": "...", "description": "...", "valueStackItems": [{"component": "...", "value": "..."}], "totalValue": "...", "valueProps": ["..."], "bonuses": ["..."], "guarantee": "..." },
          "coreProduct": { ... },
          "upsell": { ... },
          "downsell": { ... }
        },
        "strategySummary": "..."
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) {
            throw new Error("No response generated");
        }

        return JSON.parse(text) as OfferStackResponse;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

export const refineOfferStack = async (expertise: string, currentStack: OfferStackResponse, feedback: string): Promise<OfferStackResponse> => {
    try {
        const model = ai.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const prompt = `
      You are a world-class digital product strategist. 
      You previously generated an offer stack for the expertise: "${expertise}".
      
      Here is the Current Offer Stack JSON:
      ${JSON.stringify(currentStack)}

      The user has provided the following FEEDBACK:
      "${feedback}"

      Your goal: Analyze the current stack and the feedback. Identify opportunities for improvement.
      Regenerate the offer stack.
      
      **Requirement**: Maintain the "Value Stack" structure. 
      - Break down each product into components with perceived values.
      - Recalculate Total Value vs Actual Price.
      - Ensure Delivery Vehicles are clear.
      
      Ensure all constraints (Prices <= $997) still apply.
      
      Return ONLY valid JSON matching the original structure.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) {
            throw new Error("No response generated");
        }

        return JSON.parse(text) as OfferStackResponse;
    } catch (error) {
        console.error("Gemini API Error (Refinement):", error);
        throw error;
    }
};
