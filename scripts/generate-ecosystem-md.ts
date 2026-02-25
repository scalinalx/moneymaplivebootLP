import fs from 'fs';
import path from 'path';

// Load the JSON data
const dataPath = path.join(process.cwd(), 'src/data/ecosystem.json');
const ecosystemData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

function generateMarkdown() {
    let md = `# ${ecosystemData.title}\n\n`;
    md += `${ecosystemData.description}\n\n`;
    md += `> **Note:** This file is auto-generated from \`src/data/ecosystem.json\`. Do not edit this markdown file directly. Instead, update the JSON file and run \`npm run generate:docs\`.\n\n`;

    ecosystemData.sections.forEach((section: any, index: number) => {
        md += `## ${index + 1}. ${section.title}\n\n`;

        if (section.description) {
            md += `${section.description}\n\n`;
        }
        if (section.subtitle) {
            md += `_${section.subtitle}_\n\n`;
        }

        if (section.items) {
            section.items.forEach((item: any) => {
                md += `*   **${item.name || item.path}**`;
                if (item.price) {
                    md += `: **${item.price}** ${item.priceNote || ''}`;
                }
                md += `\n`;

                if (item.description) {
                    md += `    *   ${item.description}\n`;
                }
                if (item.redirect) {
                    md += `    *   **Redirect:** ${item.redirect}\n`;
                }
                if (item.content) {
                    md += `    *   **Content:** ${item.content}\n`;
                }
                if (item.features) {
                    md += `    *   **Features:** ${item.features}\n`;
                }
                if (item.id) {
                    md += `    *   (\`ID: ${item.id}\`)\n`;
                }

                if (item.links && item.links.length > 0) {
                    const linkList = item.links.map((l: any) => `[${l.label || l.name}](${l.url})`).join(' | ');
                    md += `    *   *Links:* ${linkList}\n`;
                }

                if (item.dynamicRendering) {
                    md += `    *   **Dynamic Bump/Upsell Rendering:**\n`;
                    item.dynamicRendering.forEach((dr: string) => {
                        md += `        *   ${dr}\n`;
                    });
                }

                if (item.callout) {
                    md += `    *   **Note:** ${item.callout}\n`;
                }
            });
            md += `\n`;
        }

        if (section.apps) {
            section.apps.forEach((app: any) => {
                md += `### ${app.name}\n\n`;
                md += `${app.description}\n`;

                if (app.type || app.access) {
                    md += `*   **Access/Type:** ${app.type || app.access}\n`;
                }
                if (app.url) {
                    md += `*   **App URL:** \`${app.url}\`\n`;
                }

                if (app.packages) {
                    md += `*   **Pricing Packages:**\n`;
                    app.packages.forEach((pkg: any) => {
                        md += `    *   **${pkg.name}${pkg.badge ? ` ("${pkg.badge}")` : ''}:** **${pkg.price}** (${pkg.details})\n`;
                    });
                }

                if (app.links) {
                    app.links.forEach((l: any) => {
                        md += `*   **${l.label} Page:** \`${l.url}\`\n`;
                    });
                }
                md += `\n`;
            });
        }

        if (section.table) {
            md += `| Name | Price | Type | Offered On | Variables |\n`;
            md += `| :--- | :--- | :--- | :--- | :--- |\n`;
            section.table.forEach((row: any) => {
                md += `| **${row.name}** | ${row.price} | ${row.type} | ${row.offeredOn} | ${row.varies.join('<br>')} |\n`;
                if (row.details) {
                    md += `| ↳ _Details_ | <td colspan="4">_${row.details}_</td> |\n`;
                }
            });
            md += `\n`;
        }

        if (section.links && !section.items) {
            section.links.forEach((l: any) => {
                md += `*   **${l.name}:** \`${l.url}\`\n`;
            });
            md += `\n`;
        }

        if (section.apis) {
            md += `### Active Server Routes\n\n`;
            section.apis.forEach((api: any) => {
                md += `*   **\`${api.path}\`**: ${api.description}\n`;
            });
            md += `\n`;
        }

        if (section.tables) {
            md += `### Supabase Tables\n\n`;
            section.tables.forEach((t: any) => {
                md += `*   **${t.name}:** ${t.description}\n`;
            });
            md += `\n`;
        }

        if (section.services) {
            section.services.forEach((service: any) => {
                md += `### ${service.name}\n\n`;
                service.vars.forEach((v: any) => {
                    md += `*   **\`${v.key}\`**: ${v.description}\n`;
                });
                md += `\n`;
            });
        }

        md += `---\n\n`;
    });

    return md;
}

const finalMarkdown = generateMarkdown();
const outputPath = path.join(process.cwd(), 'docs/ecosystem.md');

fs.writeFileSync(outputPath, finalMarkdown.trim() + '\n');
console.log('✅ Successfully generated docs/ecosystem.md from JSON source of truth!');

