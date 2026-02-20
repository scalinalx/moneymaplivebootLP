import { GoogleGenerativeAI } from "@google/generative-ai";
import kbData from "../../data/offer-genius/knowledge_base.json";
import embeddingData from "../../data/offer-genius/embeddings.json";

const getAI = () => {
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    if (!key) throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not configured.");
    return new GoogleGenerativeAI(key);
};

// Helper to get the model, ensuring it stays fresh
const getEmbeddingModel = () => {
    const ai = getAI();
    return ai.getGenerativeModel({ model: "gemini-embedding-001" });
};

export interface OfferMatch {
    offer: any; // Type-safe enough for now given JSON import
    similarity: number;
}

/**
 * Calculates the cosine similarity between two vectors.
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magA * magB);
}

/**
 * Finds the top N offers that match a user's input expertise or goal.
 */
export async function findTopMatches(userInput: string, limit: number = 3): Promise<OfferMatch[]> {
    try {
        // 1. Embed the user input as a query
        const model = getEmbeddingModel();
        const result = await model.embedContent({
            content: { role: 'user', parts: [{ text: userInput }] },
            taskType: "RETRIEVAL_QUERY" as any
        });

        const userVector = result.embedding.values;

        // 2. Calculate similarity for each offer
        // Force type cast for JSON imports which sometimes default to object in TS
        const embeddings = (embeddingData as any) as Array<{ id: string, embedding: number[] }>;
        const library = (kbData as any) as any[];

        const matches: OfferMatch[] = embeddings.map((emb) => {
            const offer = library.find(o => o.id === emb.id);
            if (!offer) return null;

            return {
                offer,
                similarity: cosineSimilarity(userVector, emb.embedding)
            };
        }).filter((m): m is OfferMatch => m !== null);

        // 3. Sort by similarity descending and return top matches
        return matches
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, limit);

    } catch (error) {
        console.error("❌ Error finding offer matches:", error);
        throw error;
    }
}
