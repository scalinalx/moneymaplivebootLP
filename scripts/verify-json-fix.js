
function testParse(text) {
    console.log("Testing:", text.substring(0, 50) + "...");
    try {
        const cleanedJson = text
            .replace(/^```json/gm, '')
            .replace(/```$/gm, '')
            .trim();

        try {
            const result = JSON.parse(cleanedJson);
            console.log("✅ Success (clean parse)");
            return result;
        } catch (e) {
            console.log("⚠️ Standard parse failed, trying fallback...");
            const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/) || text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const result = JSON.parse(jsonMatch[0]);
                console.log("✅ Success (fallback match)");
                return result;
            } else {
                console.log("❌ Failed to find JSON match");
                throw e;
            }
        }
    } catch (err) {
        console.log("❌ Ultimate failure:", err.message);
    }
}

const testCases = [
    '```json\n[{"test": 1}]\n```',
    'Some noise before ```json\n[{"test": 2}]\n``` and after',
    '[{"test": 3}]',
    'No markdown, just text and then [{"test": 4}] and maybe more text'
];

testCases.forEach(testParse);
