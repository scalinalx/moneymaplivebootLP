import fs from 'fs';
import path from 'path';

const md = fs.readFileSync(path.join(process.cwd(), 'docs/ecosystem.md'), 'utf-8');

const sections = md.split(/^##\s+/m).slice(1);

const parsed = sections.map(section => {
    const titleLineEnd = section.indexOf('\n');
    const title = section.substring(0, titleLineEnd).trim();
    const body = section.substring(titleLineEnd);
    
    // We can extract items like ### [Title] or * **[Number]. [Title]**
    const items = [];
    
    // Match h3 items
    const h3Regex = /###\s+(?:[\d]+\.\s+)?(.*?)\n([\s\S]*?)(?=###|\n##|$)/g;
    let match;
    while ((match = h3Regex.exec(body)) !== null) {
        items.push({ type: 'h3', title: match[1]?.trim(), content: match[2]?.trim() });
    }
    
    return { title, items: items.length ? items : body.trim() };
});

console.log(JSON.stringify(parsed, null, 2));

