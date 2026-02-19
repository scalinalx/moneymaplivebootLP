import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
if (!API_KEY) {
    console.error("❌ Error: NEXT_PUBLIC_GEMINI_API_KEY is not defined in .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

const KB_PATH = path.join(process.cwd(), 'src/data/offer-genius/knowledge_base.json');
const OUTPUT_PATH = path.join(process.cwd(), 'src/data/offer-genius/embeddings.json');

async function generateEmbeddings() {
    try {
        console.log("📖 Reading knowledge base...");
        const kbContent = fs.readFileSync(KB_PATH, 'utf-8');
        const offers = JSON.parse(kbContent);

        console.log(`🚀 Generating embeddings for ${offers.length} offers...`);

        const results = [];

        // We process in batches to avoid rate limits and for efficiency
        for (let i = 0; i < offers.length; i++) {
            const offer = offers[i];

            // Create a rich text string representing the offer
            const textToEmbed = `
                Title: ${offer.title}
                Niche: ${offer.niche}
                Effort: ${offer.effort_level}
                Price: $${offer.launch_price}
                ICP: ${offer.audience.icp}
                Hook: ${offer.framework.unfair_hook}
                Value: ${offer.framework.value_stack.join(', ')}
            `.trim();

            console.log(`[${i + 1}/${offers.length}] Embedding: ${offer.title}`);

            try {
                // Following user suggestion for taskType and model refinement
                const result = await model.embedContent({
                    content: { role: 'user', parts: [{ text: textToEmbed }] },
                    taskType: "SEMANTIC_SIMILARITY" as any
                });
                const embedding = result.embedding.values;

                results.push({
                    id: offer.id,
                    embedding: embedding
                });
            } catch (err) {
                console.error(`❌ Failed to embed offer ${offer.id}:`, err);
                // Continue with other offers
            }
        }

        console.log(`✅ Finished generating ${results.length} embeddings.`);
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
        console.log(`💾 Saved to ${OUTPUT_PATH}`);

    } catch (error) {
        console.error("💥 Critical Error:", error);
    }
}

generateEmbeddings();
