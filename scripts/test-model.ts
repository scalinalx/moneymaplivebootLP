import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        // There isn't a direct listModels in the standard JS SDK easily accessible 
        // without more boilerplate, so let's just try a known older one as a backup
        // or try the full path
        const model = genAI.getGenerativeModel({ model: "models/text-embedding-004" });
        const result = await model.embedContent("test");
        console.log("✅ Success with models/text-embedding-004");
    } catch (e: any) {
        console.log("❌ Failed with models/text-embedding-004:", e.status, e.statusText);

        try {
            const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
            const result = await model.embedContent("test");
            console.log("✅ Success with text-embedding-004");
        } catch (e2: any) {
            console.log("❌ Failed with text-embedding-004:", e2.status, e2.statusText);

            try {
                const model = genAI.getGenerativeModel({ model: "models/embedding-001" });
                const result = await model.embedContent("test");
                console.log("✅ Success with models/embedding-001");
            } catch (e3: any) {
                console.log("❌ Failed with models/embedding-001:", e3.status, e3.statusText);
            }
        }
    }
}

listModels();
