import { GoogleGenAI, Type } from "@google/genai";
import { LaunchFormData, SequenceResponse, EmailDay } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const LAUNCH_MASTERCLASS_GUIDELINES = `
*** HIGH-CONVERTING LAUNCH SEQUENCE PRINCIPLES ***

CORE CONVERSION LAWS
1. SPECIFICITY DOMINANCE
Use exact numbers (2.96x not "almost 3x")
Show precise data ($96,407 → $285,029)
Include decimals for credibility (2.9565176x)
Prove with screenshots/evidence

2. PROBLEM REFRAME
"The problem is almost never [what they think], but [how they're doing it]"
Absolve their core thing (offer, content, talent)
Redirect to execution gap
Makes solution accessible, preserves ego

3. PRE-EMPTIVE OBJECTION HANDLING
Address before they think it:
"Too good to be true" → "Results look fake. Here's proof."
"Just works for you" → Show 3+ diverse student results
"Need resources" → "Without X, Y, Z. Just need [solution]"
"My situation's different" → List 7-12 use cases
"No time" → Show surprisingly short timeframe

4. PROOF STACKING
Layer all 6 types:
Your transformation (exact before/after)
Student results (3+ different niches/levels)
Process proof (what you didn't change)
Month-by-month data (show the messy middle)
Screenshots/visuals
Logic/mechanism explanation

5. VULNERABILITY = CREDIBILITY
Show the struggle:
Failed attempts with specific losses
Emotional low points ("pulling my hair out")
Month-by-month plateau data
How long you were stuck
What didn't work before breakthrough

6. PHILOSOPHICAL TENSION
Create identity choice:
"Most ask 'what's enough?' Winners ask 'what's possible?'"
"Don't think about money made. Think about money NOT made."
Position comfort-seeking as dangerous
Make purchase an identity statement

7. BARRIER REMOVAL
"[Result] WITHOUT:
[Time barrier]
[Money barrier]
[Knowledge barrier]
[Audience barrier]
[Resource barrier]"
List 5-7 things they DON'T need.

8. REAL SCARCITY ONLY
Operational reasons:
Event happens at specific time
Limited capacity (real reason why)
Enrollment window closes (focus on cohort)
Never fake urgency
Escalate: "5 days" → "3 days" → "24 hours" → "Final 3 hours"

9. CONVERSATIONAL INTIMACY
Techniques:
Parentheticals: "(gulp)", "(and pay attention here)"
Fragments: "So.", "Right.", "Anyway."
Self-aware humor about results looking fake
Direct address: "You're probably thinking..."
1-2 mild censored profanities max ("f*cked up")
Controlled tangents with acknowledgment

10. CONFIDENT CTAs
❌ Never: "CLICK NOW!!!", "LIMITED TIME!!!"
✅ Always: "Click here to reserve your spot", "Here's the link"
2-3 per email
Understated and confident
No desperation signals

11. BROAD APPLICABILITY
List 7-12 specific use cases:
Start with 3 most common avatars
Add 3-4 medium applications
End with unexpected use: "Even [surprising application]"
Each reader finds themselves in the list

12. GRANULAR TRANSPARENCY
Show the messy data:
Month-by-month revenue (ups and downs)
Exact turning point with dates
What didn't work (failed strategies)
Actual time/money invested
Student context (niche, starting point, timeframe)

13. THE FUNDAMENTAL FLAW
Position as ONE fixable thing:
"There was a fundamental flaw in [business/approach]"
"It wasn't WHAT we sold, but HOW"
Build mystery around what it is
Creates curiosity gap + hope
Make it seem recently discovered

14. MATHEMATICAL PRECISION
Go beyond rounded numbers:
Show exact calculations
Include "too precise" decimals
Joke about precision: "(2.9565176x but less sexy title)"
Display backend screenshots
Month-by-month data tables (12-24 months)

15. SOCIAL PROOF DIVERSITY
Show success across:
Experience levels (beginner → advanced)
Different niches/industries
Various starting points ($0, struggling, successful)
Different result types (revenue, clients, time)
Minimum 3 testimonials with specifics

STRUCTURAL PATTERNS
OPENING HOOKS
Bold tease: "Boy are you going to like this..."
Time stamp: "Back in November 2024, I was..."
Contrarian: "The problem is almost never..."
Acknowledgment: "Results are so good, they look fake..."
Data drop: "$96,407 → $285,029 in 60 days..."

P.S. PROOF BOMB
High-readership area. Use for:
Testimonial avalanche (3 rapid-fire examples)
Final objection destruction
Self-aware stop: "Alright enough of that"
End with CTA link

LEAD MAGNET → PAID BRIDGE
Lead Magnet: [Quick tactical win]
Paid Offer: [Complete strategic system]
Bridge: "[Quick win] proves it works. [System] makes it sustainable."
Natural progression, not forced upsell.

CRITICAL REQUIREMENTS
Every email must have:
Exact numbers (not vague)
Conversational tone (not corporate)
Real scarcity with reason
2-3 understated CTAs
Strategic vulnerability

Never include:
Vague claims ("better", "more")
Sanitized success stories
Fake urgency
ALL CAPS CTAs
Corporate formality

DUAL OPTIMIZATION
For lead magnet downloads:
Clear quick win promise
Simple access instructions
Social proof of others downloading
Time-sensitive value

For paid conversions:
Lead magnet as gateway/proof
Complete system positioning
Gap revelation (what magnet doesn't cover)
Natural progression messaging

TONE CALIBRATION
Write like:
Texting a smart friend
Confident expert without ego
Vulnerable human with proof
Data scientist with personality

Not like:
Corporate presentation
Desperate marketer
Guru with secrets
Perfect success story
`;

export const generateEmailSequence = async (data: LaunchFormData): Promise<SequenceResponse> => {
    // Switched to Flash for speed. 
    // It handles large contexts well and is much faster than Pro.
    const modelId = "gemini-2.0-flash-exp";

    const textPrompt = `
    You are a world-class direct response copywriter and launch strategist. 
    Your goal is to write a high-converting, comprehensive email launch sequence that converts an audience to sales.
    
    ${LAUNCH_MASTERCLASS_GUIDELINES}

    Here is the Offer Context:
    1. **Audience**: ${data.audience}
    2. **Lead Magnet (The Hook)**: ${data.leadMagnetName} - ${data.leadMagnetDescription}
    3. **Core Product (The Upsell)**: ${data.coreProductName} - ${data.coreProductDescription}
    4. **Launch Date**: ${data.launchDate}
    ${data.extraOfferDetails ? `5. **Extra Offer Details**: ${data.extraOfferDetails}` : ""}

    **Sequence Structure Instructions**:
    You must generate exactly **9 Emails** divided into three distinct phases to ensure a robust runway (Minimum 5 emails for Pre-Launch + Launch):

    **PHASE 1: PRE-LAUNCH (Indoctrination, Hype & Anticipation)**
    *Goal: Shift beliefs and build anticipation so they are hungry for the Lead Magnet before it even drops.*
    - **Email 1 (Day Offset: -4)**: 4 Days before. "The Pattern Interrupt / The Myth". Address a common misconception in the industry. Why the old way fails. Use the "Problem Reframe" principle.
    - **Email 2 (Day Offset: -3)**: 3 Days before. "The New Mechanism". Hint that there is a better way without revealing the product yet. Educational value. Use "Mathematical Precision" if applicable.
    - **Email 3 (Day Offset: -2)**: 2 Days before. "The Specific Tease". Reveal that you have created a resource (the Lead Magnet) to solve this specific problem. Use "Vulnerability = Credibility".
    - **Email 4 (Day Offset: -1)**: 1 Day before. "High Alert". Tomorrow is the day. Build massive anticipation. "Keep an eye on your inbox". Use "Philosophical Tension".

    **PHASE 2: LAUNCH (The Trigger)**
    - **Email 5 (Day Offset: 0)**: LAUNCH DAY. It's Live. High excitement. Direct link to get the Lead Magnet. "The wait is over." Use "Confident CTAs".

    **PHASE 3: POST-LAUNCH (Value into Sales of Core Product)**
    *Goal: Bridge the gap between the free lead magnet and the paid core product.*
    - **Email 6 (Day Offset: 1)**: "Did you see this?". Check in on consumption. Offer a 'hidden' tip inside the lead magnet. Use "Dual Optimization".
    - **Email 7 (Day Offset: 2)**: "The Pivot (Problem Agitation)". The Lead Magnet solves the immediate pain, but the Core Product solves the root cause/permanent fix. Introduce the Core Product. Use "The Fundamental Flaw".
    - **Email 8 (Day Offset: 3)**: "Social Proof & Logic". Case studies. Logical reasons to upgrade now. Stack the value. Use "Proof Stacking" and "Social Proof Diversity".
    - **Email 9 (Day Offset: 4)**: "The Close (Scarcity/Urgency)". "Bonus disappearing" or "Doors closing". Final push for the Core Product. Use "Real Scarcity Only" and "Barrier Removal".

    **Strategy Instructions**:
    Apply the "HIGH-CONVERTING LAUNCH SEQUENCE PRINCIPLES" provided above religiously.
    Ensure the transition from Free Lead Magnet to Paid Core Product feels natural but inevitable.
    Adopt the "Tone Calibration" described in the guidelines.

    **Output Format**:
    Return PURE JSON.
  `;

    try {
        const response = await ai.models.generateContent({
            model: modelId,
            contents: textPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sequence: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    phase: { type: Type.STRING, enum: ["Pre-Launch", "Launch Day", "Post-Launch"] },
                                    dayOffset: { type: Type.INTEGER, description: "Negative for pre-launch, 0 for launch, positive for post-launch." },
                                    subject: { type: Type.STRING },
                                    previewText: { type: Type.STRING },
                                    body: { type: Type.STRING, description: "The email body content. Use <br/> for line breaks and simple HTML tags like <b>, <i>, <u>." },
                                    strategyNote: { type: Type.STRING, description: "Brief explanation of the marketing psychology used in this email, referencing specific principles from the guidelines." }
                                },
                                required: ["phase", "dayOffset", "subject", "previewText", "body", "strategyNote"]
                            }
                        }
                    },
                    required: ["sequence"]
                }
            }
        });

        if (!response.text) {
            throw new Error("No content generated from Gemini.");
        }

        const result = JSON.parse(response.text) as SequenceResponse;

        // Post-processing to add calculated dates
        const launchDateObj = new Date(data.launchDate);

        // We need to properly handle time zones to avoid off-by-one errors in display
        // Using UTC to ensure consistency
        const utcLaunchDate = new Date(launchDateObj.getTime() + launchDateObj.getTimezoneOffset() * 60000);

        const processedSequence: EmailDay[] = result.sequence.map(email => {
            // Clone the launch date
            const emailDate = new Date(utcLaunchDate);
            // Add the offset (days)
            emailDate.setDate(emailDate.getDate() + email.dayOffset);

            return {
                ...email,
                formattedDate: emailDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                })
            };
        });

        return { sequence: processedSequence };

    } catch (error) {
        console.error("Error generating email sequence:", error);
        throw new Error("Failed to generate the email sequence. Please try again.");
    }
};
