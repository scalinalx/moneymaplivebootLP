const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/app/10k-launch-lab/components');

const replacements = [
    { regex: /shadow-hard-sm/g, replacement: 'shadow-lg' },
    { regex: /shadow-hard/g, replacement: 'shadow-2xl' },
    { regex: /border-2 border-black/g, replacement: 'border border-gray-100' },
    { regex: /border border-black/g, replacement: 'border border-gray-100' },
    { regex: /border-b-2 border-black/g, replacement: 'border-b border-gray-100' },
    { regex: /border-t-2 border-black/g, replacement: 'border-t border-gray-100' },
    { regex: /border-l-2 border-black/g, replacement: 'border-l border-gray-100' },
    { regex: /border-r-2 border-black/g, replacement: 'border-r border-gray-100' },
    { regex: /border-b border-black/g, replacement: 'border-b border-gray-100' },

    // Custom button effects removal
    { regex: /shadow-\[4px_4px_0px_#[0-9a-fA-F]+\]/g, replacement: 'shadow-xl' },
    { regex: /shadow-\[6px_6px_0px_#[0-9a-fA-F]+\]/g, replacement: 'shadow-2xl' },
    { regex: /shadow-\[8px_8px_0px_#[0-9a-fA-F]+\]/g, replacement: 'shadow-2xl' },
    { regex: /shadow-\[3px_3px_0px_#[0-9a-fA-F]+\]/g, replacement: 'shadow-lg' },

    { regex: /hover:shadow-\[2px_2px_0px_#[0-9a-fA-F]+\]/g, replacement: 'hover:shadow-2xl' },
    { regex: /hover:shadow-\[3px_3px_0px_#[0-9a-fA-F]+\]/g, replacement: 'hover:shadow-2xl' },
    { regex: /hover:shadow-\[1px_1px_0px_#[0-9a-fA-F]+\]/g, replacement: 'hover:shadow-lg' },

    { regex: /hover:translate-x-\[2px\] hover:translate-y-\[2px\]/g, replacement: 'hover:-translate-y-1' },
    { regex: /hover:translate-x-\[3px\] hover:translate-y-\[3px\]/g, replacement: 'hover:-translate-y-1' },

    { regex: /hover:bg-\[#[a-fA-F0-9]+\]/g, replacement: 'hover:bg-[#b30e4a]' },
    { regex: /bg-brand-neon hover:bg-\[#b30e4a\] text-black/g, replacement: 'bg-[#d81159] hover:bg-[#b30e4a] text-white' },
    { regex: /bg-brand-neon hover:bg-\[#b30e4a\]/g, replacement: 'bg-[#d81159] hover:bg-[#b30e4a] text-white' },
    { regex: /bg-brand-neon text-black/g, replacement: 'bg-[#d81159] text-white' },

    // Radiuses
    { regex: /rounded-sm/g, replacement: 'rounded-2xl' },
    { regex: /rounded /g, replacement: 'rounded-2xl ' },
    { regex: /rounded"/g, replacement: 'rounded-2xl"' },

    // Specific text emphasis tweaks
    { regex: /bg-brand-neon px-1/g, replacement: 'text-[#d81159]' },
    { regex: /bg-brand-neon px-2 inline-block transform -rotate-1/g, replacement: 'text-[#d81159] text-xl py-2 inline-block' },

    // Clean up random left-over neons that are backgrounds to text/icons
    { regex: /bg-brand-neon/g, replacement: 'bg-rose-50' }, // Soft background instead of neon
];

function walk(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let updated = content;
            for (const { regex, replacement } of replacements) {
                updated = updated.replace(regex, replacement);
            }
            if (content !== updated) {
                fs.writeFileSync(filePath, updated, 'utf8');
                console.log(`Updated ${filePath}`);
            }
        }
    }
}

walk(dir);
console.log('Done!');
