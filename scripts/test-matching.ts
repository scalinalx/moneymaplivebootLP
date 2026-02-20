import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { findTopMatches } from '../src/services/ana-ai/offerMatchingService';

async function testMatching() {
    const inputs = [
        "I help mothers with anxiety using somatic therapy",
        "How to scale a coaching business to $10k a month",
        "Morning routine for high performance"
    ];

    for (const input of inputs) {
        console.log(`\n--- Input: "${input}" ---`);
        const matches = await findTopMatches(input, 3);
        matches.forEach((m, i) => {
            console.log(`${i + 1}. [${(m.similarity * 100).toFixed(1)}%] ${m.offer.title} (${m.offer.id})`);
            console.log(`   Hook: ${m.offer.framework.unfair_hook}`);
        });
    }
}

testMatching();
