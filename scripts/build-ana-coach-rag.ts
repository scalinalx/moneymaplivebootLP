/**
 * Build the Ana AI Coach retrieval corpus.
 *   npx tsx scripts/build-ana-coach-rag.ts   (npm run rag:build)
 *
 * Chunks every knowledge source (Kit emails + the claude-chat-files exports),
 * embeds each chunk with gemini-embedding-001, and writes
 * src/data/ana-coach/knowledge-chunks.json — the retrieval index the coach loads
 * at query time. Re-run whenever a source changes.
 */
import { config } from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import fs from 'node:fs';
import path from 'node:path';

config({ path: '.env.local' });

const ROOT = process.cwd();
const EMBED_MODEL = 'gemini-embedding-001';
const DIMS = 768;

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) { console.error('❌ GEMINI_API_KEY not set'); process.exit(1); }
const ai = new GoogleGenAI({ apiKey });

interface Chunk { id: string; source: string; title: string; text: string }
interface EmbeddedChunk extends Chunk { embedding: number[] }

const readJson = (p: string) => JSON.parse(fs.readFileSync(p, 'utf-8'));
const exists = (p: string) => fs.existsSync(p);

// Split a markdown doc into { heading, body } sections by `## ` headings,
// tracking the nearest preceding `# ` title for context.
function splitMarkdown(md: string): { title: string; body: string }[] {
  const lines = md.split('\n');
  const out: { title: string; body: string }[] = [];
  let h1 = '';
  let cur: { title: string; body: string[] } | null = null;
  const flush = () => { if (cur && cur.body.join('\n').trim()) out.push({ title: cur.title, body: cur.body.join('\n').trim() }); };
  for (const line of lines) {
    if (line.startsWith('# ')) { flush(); cur = null; h1 = line.slice(2).trim(); }
    else if (line.startsWith('## ')) { flush(); cur = { title: h1 ? `${h1} — ${line.slice(3).trim()}` : line.slice(3).trim(), body: [] }; }
    else if (cur) cur.body.push(line);
  }
  flush();
  return out;
}

function collectChunks(): Chunk[] {
  const chunks: Chunk[] = [];
  const CHAT = path.join(ROOT, 'claude chat files');

  // Kit emails
  const kitPath = path.join(ROOT, 'src/data/ana-coach/kit-emails.json');
  if (exists(kitPath)) {
    for (const e of readJson(kitPath) as { id: number; subject: string; text: string; kind: string }[]) {
      chunks.push({ id: `email-${e.id}`, source: `email:${e.kind}`, title: e.subject, text: e.text });
    }
  }
  // Posts
  const postsPath = path.join(CHAT, 'ana-posts.json');
  if (exists(postsPath)) {
    (readJson(postsPath) as { title: string; text: string }[]).forEach((p, i) => {
      if (p.text?.trim()) chunks.push({ id: `post-${i}`, source: 'post', title: p.title || `Post ${i + 1}`, text: p.text });
    });
  }
  // Notes (short — batch a few per chunk to avoid over-fragmenting)
  const notesPath = path.join(CHAT, 'ana-notes.json');
  if (exists(notesPath)) {
    const notes = (readJson(notesPath) as { text: string }[]).map((n) => n.text).filter(Boolean);
    for (let i = 0; i < notes.length; i += 4) {
      chunks.push({ id: `notes-${i}`, source: 'note', title: 'Substack Notes', text: notes.slice(i, i + 4).join('\n\n') });
    }
  }
  // Q&A
  const qaPath = path.join(CHAT, 'ana-qa.json');
  if (exists(qaPath)) {
    (readJson(qaPath) as { question: string; ana_response: string }[]).forEach((q, i) => {
      if (q.question && q.ana_response) chunks.push({ id: `qa-${i}`, source: 'qa', title: q.question, text: `Q: ${q.question}\n\nAna: ${q.ana_response}` });
    });
  }
  // Frameworks + Workshops (markdown from the claude-chat exports)
  for (const [file, src] of [['ana-frameworks.md', 'framework'], ['ana-workshops.md', 'workshop']] as const) {
    const p = path.join(CHAT, file);
    if (exists(p)) splitMarkdown(fs.readFileSync(p, 'utf-8')).forEach((s, i) => {
      chunks.push({ id: `${src}-${i}`, source: src, title: s.title, text: s.body });
    });
  }

  // Offer templates — the 100-offer library (previously a static prompt block on
  // the Strategy Coach). One chunk per offer so it's retrieved, not dumped.
  const kbPath = path.join(ROOT, 'src/data/offer-genius/knowledge_base.json');
  if (exists(kbPath)) {
    for (const o of readJson(kbPath) as Record<string, any>[]) {
      const fw = o.framework || {};
      const text = [
        `${o.title} — ${o.niche}, launch price $${o.launch_price}, ${o.effort_level || ''}`,
        o.audience ? `ICP: ${o.audience.icp || ''} (list ${o.audience.list_size || ''})` : '',
        fw.unfair_hook ? `Unfair hook: ${fw.unfair_hook}` : '',
        Array.isArray(fw.value_stack) ? `Value stack: ${fw.value_stack.join('; ')}` : '',
        o.money_funnel ? `Funnel: ${JSON.stringify(o.money_funnel)}` : '',
      ].filter(Boolean).join('\n');
      chunks.push({ id: `offer-${o.id}`, source: 'offer-template', title: o.title, text });
    }
  }

  // Feed-algorithm / growth research — previously a static ~10k-token block on the
  // Growth Auditor. Chunk by section so only relevant parts are retrieved.
  const growthPath = path.join(ROOT, 'docs/feed-algorithm-attention-mechanisms-research.md');
  if (exists(growthPath)) splitMarkdown(fs.readFileSync(growthPath, 'utf-8')).forEach((s, i) => {
    chunks.push({ id: `growth-${i}`, source: 'growth-research', title: s.title, text: s.body });
  });

  return chunks;
}

async function embedBatch(texts: string[], taskType: string): Promise<number[][]> {
  const res = await ai.models.embedContent({
    model: EMBED_MODEL,
    contents: texts,
    config: { taskType, outputDimensionality: DIMS },
  });
  return (res.embeddings ?? []).map((e) => e.values as number[]);
}

async function main() {
  const chunks = collectChunks();
  const bySource = chunks.reduce<Record<string, number>>((m, c) => ((m[c.source.split(':')[0]] = (m[c.source.split(':')[0]] || 0) + 1), m), {});
  console.log(`Collected ${chunks.length} chunks:`, JSON.stringify(bySource));
  if (chunks.length === 0) { console.error('❌ no chunks — is "claude chat files" present?'); process.exit(1); }

  const embedded: EmbeddedChunk[] = [];
  const BATCH = 20;
  for (let i = 0; i < chunks.length; i += BATCH) {
    const batch = chunks.slice(i, i + BATCH);
    // Prepend the title for lightweight contextual retrieval.
    const texts = batch.map((c) => `${c.title}\n\n${c.text}`.slice(0, 8000));
    const vectors = await embedBatch(texts, 'RETRIEVAL_DOCUMENT');
    batch.forEach((c, j) => embedded.push({ ...c, embedding: vectors[j] }));
    console.log(`  embedded ${Math.min(i + BATCH, chunks.length)}/${chunks.length}`);
  }

  const outPath = path.join(ROOT, 'src/data/ana-coach/knowledge-chunks.json');
  fs.writeFileSync(outPath, JSON.stringify(embedded));
  const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`\n✅ Wrote ${embedded.length} embedded chunks (${DIMS}-dim, ${kb} KB) → src/data/ana-coach/knowledge-chunks.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
