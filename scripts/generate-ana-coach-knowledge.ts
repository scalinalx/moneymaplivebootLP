/**
 * Ana AI Coach — build-time knowledge generator.
 *
 *   npm run generate:coach
 *
 * Reads the canonical knowledge sources in the repo and emits two artifacts:
 *   - src/lib/ana-coach/knowledge.generated.ts  (server: per-specialist slices)
 *   - src/data/ana-coach/products.ts             (client: slug → card registry)
 *
 * Internal-ops sections of ecosystem.json (Command Centre, Backend
 * Infrastructure, Env Vars, Third-Party Tracking, Fulfillment pages, Legal) are
 * deliberately dropped — the coach must never see internal infrastructure text.
 *
 * The script FAILS (nonzero exit) if an expected source or section is missing,
 * so a rename can't silently ship an empty knowledge slice.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf-8');
const readJson = (p: string) => JSON.parse(read(p));

function fail(msg: string): never {
  console.error(`\n❌ generate:coach — ${msg}\n`);
  process.exit(1);
}

// --- Hand-authored persona facts (not machine-derivable) -----------------
const PERSONA_FACTS = `Ana Calin is a copywriter and newsletter monetisation expert. She grew her own
Substack ("How We Grow") to 71,000+ subscribers starting September 2024, becoming
the fastest-growing female creator on the platform. She has taught 2,300+ students
and her students have generated over $1.2M. She runs a $10K–$100K+ newsletter
monetisation community. She teaches from lived experience, not theory.`;

const GROWTH_STORY = `Ana started her Substack in September 2024. She focused on quality over quantity —
finding her writing style, tone of voice, and branding first, then compounding with
consistency. She reached 71,000+ subscribers and became the fastest-growing female
creator on Substack. Her approach: publish with a clear point of view, use Notes to
drive discovery, convert free readers to paid with a specific offer, not a vague
"support me" ask.`;

// --- ecosystem.json → member-facing catalog + slugs ----------------------
interface EcoLink { label?: string; name?: string; url: string }
interface EcoItem { name?: string; description?: string; price?: string; links?: EcoLink[] }
interface EcoApp { name?: string; description?: string; type?: string; packages?: { name: string; price: string; details?: string }[]; links?: EcoLink[] }

// Generic route words that make poor product slugs — fall back to the name.
const GENERIC_SLUGS = new Set([
  'landing', 'join', 'checkout', 'checkout-step1', 'upsell', 'success', 'offer', 'sales',
]);

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(live|the|a|an)\b/g, ' ')
    .replace(/\bworkshop|program|course|generator|tool\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 4)
    .join('-');
}

function slugFromLinks(links: EcoLink[] | undefined, name?: string): string | null {
  if (!links || links.length === 0) return null;
  const prefer = (label: string) =>
    links.find((l) => (l.label || l.name || '').toLowerCase().includes(label));
  const chosen = prefer('sales') || prefer('checkout') || prefer('app') || links[0];
  const url = chosen?.url || '';
  const m = url.match(/^\/([a-z0-9-]+)/i);
  const urlSlug = m ? m[1].toLowerCase() : null;
  if (urlSlug && !GENERIC_SLUGS.has(urlSlug)) return urlSlug;
  return name ? nameToSlug(name) : urlSlug;
}

interface CatalogProduct {
  slug: string;
  name: string;
  price: string;
  pitch: string;
  url: string;
}

function buildCatalog() {
  const eco = readJson('src/data/ecosystem.json');
  const sections: { title: string; items?: EcoItem[]; apps?: EcoApp[]; funnels?: unknown[] }[] = eco.sections;

  const byTitle = (needle: string) =>
    sections.find((s) => s.title.toLowerCase().includes(needle.toLowerCase()));

  const core = byTitle('Core Educational Programs');
  const mini = byTitle('Targeted Mini-Workshops');
  const apps = byTitle('AI Software');
  const funnelSec = byTitle('Funnel Architecture');
  if (!core?.items || !mini?.items) fail('ecosystem.json is missing the Core/Mini product sections');
  if (!apps?.apps) fail('ecosystem.json is missing the AI Software apps section');

  const products: CatalogProduct[] = [];
  const seen = new Set<string>();

  const pushItem = (it: EcoItem) => {
    const slug = slugFromLinks(it.links, it.name);
    if (!slug || seen.has(slug) || !it.name) return;
    seen.add(slug);
    const canonical = it.links?.find((l) => /sales|checkout|app/i.test(l.label || l.name || '')) || it.links?.[0];
    products.push({
      slug,
      name: it.name,
      price: it.price || 'see page',
      pitch: (it.description || '').trim(),
      url: canonical?.url || `/${slug}`,
    });
  };

  core.items.forEach(pushItem);
  mini.items.forEach(pushItem);
  apps.apps.forEach((app) => {
    const slug = slugFromLinks(app.links, app.name);
    if (!slug || seen.has(slug) || !app.name) return;
    seen.add(slug);
    const price = app.packages?.length ? app.packages.map((p) => `${p.name} ${p.price}`).join(' / ') : 'Free';
    products.push({
      slug,
      name: app.name,
      price,
      pitch: (app.description || '').trim(),
      url: app.links?.[0]?.url || `/${slug}`,
    });
  });

  if (products.length < 8) fail(`only ${products.length} products parsed from ecosystem.json — expected more`);

  // Human-readable catalog for the Product Matcher prompt.
  let catalogMd = 'ANA CALIN — PRODUCT ECOSYSTEM (member-facing catalog)\n\n';
  for (const p of products) {
    catalogMd += `- slug: ${p.slug}\n  name: ${p.name}\n  price: ${p.price}\n  url: ${p.url}\n  what: ${p.pitch}\n\n`;
  }

  // Funnel relationships (what upsells to what) — helps sequencing recommendations.
  if (funnelSec?.funnels && Array.isArray(funnelSec.funnels)) {
    catalogMd += '\nFUNNEL / UPSELL RELATIONSHIPS\n\n';
    for (const f of funnelSec.funnels as Record<string, unknown>[]) {
      const name = f.name as string;
      const core = f.coreProduct as { name?: string; price?: string } | undefined;
      const bumps = (f.orderBumps as { name?: string }[] | undefined)?.map((b) => b.name).filter(Boolean) || [];
      const upsells = (f.upsells as { name?: string }[] | undefined)?.map((u) => u.name).filter(Boolean) || [];
      catalogMd += `- ${name}: core = ${core?.name || '?'} (${core?.price || '?'})`;
      if (bumps.length) catalogMd += `; bumps = ${bumps.join(', ')}`;
      if (upsells.length) catalogMd += `; upsells = ${upsells.join(', ')}`;
      catalogMd += '\n';
    }
  }

  return { products, catalogMd, slugs: products.map((p) => p.slug) };
}

// --- will-it-sell → Viral Product Formula criteria -----------------------
function buildViralCriteria() {
  const src = read('src/app/api/will-it-sell/route.ts');
  const start = src.indexOf('SCORING CRITERIA');
  const end = src.indexOf('SCORING RULES');
  if (start === -1 || end === -1) fail('could not locate Viral Product Formula criteria in will-it-sell route');
  return 'ANA CALIN — VIRAL PRODUCT FORMULA (weighted criteria)\n\n' + src.slice(start, end).trim();
}

// --- knowledge_base.json → 100-template one-line index -------------------
function buildTemplateIndex() {
  const kb = readJson('src/data/offer-genius/knowledge_base.json') as Record<string, unknown>[];
  if (!Array.isArray(kb) || kb.length === 0) fail('offer-genius knowledge_base.json is empty');
  let md = 'OFFER TEMPLATE INDEX (proven offer patterns; use as inspiration, adapt to the member)\n\n';
  for (const o of kb) {
    const fw = o.framework as { unfair_hook?: string } | undefined;
    md += `- [${o.id}] ${o.title} — ${o.niche}, $${o.launch_price}. Hook: ${fw?.unfair_hook || ''}\n`;
  }
  return md;
}

// --- kit-emails.json → real voice examples --------------------------------
// Optional source: present only after `npm run ingest:kit` has run. The file is
// the FULL library (all distinct substantive emails); for prompt injection we
// select a diverse, token-bounded subset — few-shot voice learning saturates, so
// a curated spread teaches the voice as well as the whole library would, without
// bloating every coaching turn. The rest stays in the file as the RAG corpus.
const VOICE_CHAR_BUDGET = Number(process.env.ANA_COACH_VOICE_CHAR_BUDGET || 52000); // ~13k tokens

function buildEmailExamples(): string {
  const p = path.join(ROOT, 'src/data/ana-coach/kit-emails.json');
  if (!fs.existsSync(p)) {
    console.warn('   (no kit-emails.json — run `npm run ingest:kit` to add real voice examples)');
    return '';
  }
  const emails = JSON.parse(fs.readFileSync(p, 'utf-8')) as { subject: string; kind: string; text: string; chars: number }[];
  if (!Array.isArray(emails) || emails.length === 0) return '';

  // Round-robin across kinds for diversity, filling up to the char budget.
  const byKind: Record<string, typeof emails> = {};
  for (const e of emails) (byKind[e.kind] ??= []).push(e);
  const kinds = Object.keys(byKind);
  const picked: typeof emails = [];
  let used = 0;
  for (let round = 0; picked.length < emails.length; round++) {
    let advanced = false;
    for (const k of kinds) {
      const e = byKind[k][round];
      if (!e) continue;
      advanced = true;
      if (used + e.chars > VOICE_CHAR_BUDGET) continue;
      picked.push(e);
      used += e.chars;
    }
    if (!advanced) break;
  }

  console.log(`   voice examples: ${picked.length}/${emails.length} emails (~${Math.round(used / 4)} tokens) into prompts; full ${emails.length} kept as library`);
  let md = "ANA'S REAL EMAILS (study the VOICE — rhythm, one-line paragraphs, directness, hooks. Do NOT copy the email format; a coaching reply is a chat message, not an email.)\n\n";
  for (const e of picked) md += `--- [${e.kind}] subject: "${e.subject}"\n${e.text}\n\n`;
  return md;
}

// --- testimonials.json → compact proof lines -----------------------------
function buildTestimonials() {
  const raw = readJson('src/data/testimonials.json') as Record<string, unknown>[];
  const arr = Array.isArray(raw) ? raw : [];
  if (arr.length === 0) fail('testimonials.json is empty');
  let md = 'MEMBER RESULTS (real testimonials — cite the quantified result, never invent one)\n\n';
  for (const t of arr) {
    const name = t.Name || t.name;
    const info = t.additionalinfo || '';
    const text = (t.Text as string) || '';
    md += `- ${name}: ${text} ${info ? `(${info})` : ''}\n`;
  }
  return md;
}

// --- Emit ----------------------------------------------------------------
function esc(s: string): string {
  return JSON.stringify(s);
}

function main() {
  const { products, catalogMd, slugs } = buildCatalog();
  const styleGuide = read('docs/writing-style-1.md');
  const offerStrategy = read('docs/OFFER_CONTEXT.md');
  const growthResearch = read('docs/feed-algorithm-attention-mechanisms-research.md');
  const viralCriteria = buildViralCriteria();
  const templateIndex = buildTemplateIndex();
  const testimonials = buildTestimonials();
  const emailExamples = buildEmailExamples();

  const header = `// AUTO-GENERATED by scripts/generate-ana-coach-knowledge.ts — DO NOT EDIT.
// Run \`npm run generate:coach\` to regenerate.
/* eslint-disable */
`;

  const serverOut =
    header +
    `export const PERSONA_FACTS = ${esc(PERSONA_FACTS)};\n` +
    `export const GROWTH_STORY = ${esc(GROWTH_STORY)};\n` +
    `export const STYLE_GUIDE = ${esc(styleGuide)};\n` +
    `export const OFFER_STRATEGY = ${esc(offerStrategy)};\n` +
    `export const VIRAL_FORMULA_CRITERIA = ${esc(viralCriteria)};\n` +
    `export const GROWTH_RESEARCH = ${esc(growthResearch)};\n` +
    `export const ECOSYSTEM_CATALOG = ${esc(catalogMd)};\n` +
    `export const OFFER_TEMPLATE_INDEX = ${esc(templateIndex)};\n` +
    `export const TESTIMONIALS_COMPACT = ${esc(testimonials)};\n` +
    `export const ANA_EMAIL_EXAMPLES = ${esc(emailExamples)};\n` +
    `export const PRODUCT_SLUGS: string[] = ${JSON.stringify(slugs)};\n`;

  fs.mkdirSync(path.join(ROOT, 'src/lib/ana-coach'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'src/lib/ana-coach/knowledge.generated.ts'), serverOut);

  // Client registry — safe subset (no strategy/prompt content).
  const clientOut =
    header +
    `export interface CoachProductCard { slug: string; name: string; price: string; tagline: string; url: string }\n` +
    `export const COACH_PRODUCTS: Record<string, CoachProductCard> = ${JSON.stringify(
      Object.fromEntries(
        products.map((p) => [
          p.slug,
          { slug: p.slug, name: p.name, price: p.price, tagline: p.pitch.slice(0, 140), url: p.url },
        ]),
      ),
      null,
      2,
    )};\n`;

  fs.mkdirSync(path.join(ROOT, 'src/data/ana-coach'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'src/data/ana-coach/products.ts'), clientOut);

  console.log(`✅ generate:coach — ${products.length} products, ${slugs.length} slugs.`);
  console.log(`   slugs: ${slugs.join(', ')}`);
}

main();
