// Ana AI Coach — semantic retrieval (RAG).
//
// Loads the pre-embedded knowledge corpus (Ana's emails, posts, notes, Q&A,
// frameworks, workshops) and, per coaching turn, embeds the member's query and
// returns the most relevant chunks by cosine similarity. This replaces stuffing
// the whole corpus into every prompt — only the pieces relevant to what the
// member is actually asking get injected.

import { GoogleGenAI } from '@google/genai';
import { getGeminiApiKey } from './config';
import chunks from '@/data/ana-coach/knowledge-chunks.json';

const EMBED_MODEL = 'gemini-embedding-001';
const DIMS = 768;

interface EmbeddedChunk { id: string; source: string; title: string; text: string; embedding: number[] }
const CORPUS = chunks as EmbeddedChunk[];

// Precompute magnitudes once (module load) so per-query scoring is a dot product.
const MAGS = CORPUS.map((c) => Math.sqrt(c.embedding.reduce((s, v) => s + v * v, 0)));

let client: GoogleGenAI | null = null;
function ai(): GoogleGenAI {
  if (!client) client = new GoogleGenAI({ apiKey: getGeminiApiKey() });
  return client;
}

export interface RetrievedChunk { id: string; source: string; title: string; text: string; score: number }

// Domain source-prefixes each specialist retrieves from, so its core material
// surfaces within its own pool instead of competing with the whole corpus (e.g. a
// feed-algorithm question would otherwise rank her practical Notes above the
// research doc — scoping the Growth Auditor to growth sources fixes that).
export const SPECIALIST_SOURCES: Record<string, string[] | null> = {
  strategy_coach: ['offer-template', 'framework', 'email:teaching', 'email:pricing', 'email:sales', 'qa', 'post'],
  copy_critic: ['email', 'post', 'framework', 'note'],
  growth_auditor: ['growth-research', 'workshop', 'post', 'note', 'email:story', 'email:teaching'],
  product_matcher: null, // has the full catalog statically — no retrieval
};

// Embed a query once (RETRIEVAL_QUERY). Exported so a turn can embed the member's
// message a single time and reuse the vector across every specialist + synthesis.
export async function embedQuery(text: string): Promise<number[] | null> {
  if (!text.trim()) return null;
  try {
    const res = await ai().models.embedContent({
      model: EMBED_MODEL,
      contents: text.slice(0, 8000),
      config: { taskType: 'RETRIEVAL_QUERY', outputDimensionality: DIMS },
    });
    return (res.embeddings?.[0]?.values as number[]) ?? null;
  } catch (err) {
    console.error('[ana-coach] query embed failed:', err instanceof Error ? err.message : err);
    return null;
  }
}

// Score the corpus against an already-computed query vector, optionally scoped to
// a set of source prefixes, and return the top-K above minScore. Pure (no I/O).
export function retrieveWithVector(
  qv: number[],
  k = 8,
  minScore = 0.5,
  sources?: string[] | null,
): RetrievedChunk[] {
  if (CORPUS.length === 0) return [];
  const qMag = Math.sqrt(qv.reduce((s, v) => s + v * v, 0)) || 1;
  const out: RetrievedChunk[] = [];
  for (let i = 0; i < CORPUS.length; i++) {
    const c = CORPUS[i];
    if (sources && !sources.some((s) => c.source.startsWith(s))) continue;
    let dot = 0;
    const e = c.embedding;
    for (let j = 0; j < e.length; j++) dot += e[j] * qv[j];
    const score = dot / (MAGS[i] * qMag);
    if (score >= minScore) out.push({ id: c.id, source: c.source, title: c.title, text: c.text, score });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, k);
}

// Convenience: embed + retrieve in one call (used where a vector isn't reused).
export async function retrieve(query: string, k = 8, minScore = 0.5, sources?: string[] | null): Promise<RetrievedChunk[]> {
  const qv = await embedQuery(query);
  if (!qv) return [];
  return retrieveWithVector(qv, k, minScore, sources);
}

// Format retrieved chunks for injection into a prompt.
export function formatRetrieved(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) return '';
  const label = (src: string) => {
    if (src.startsWith('email')) return 'from an email Ana wrote';
    if (src === 'post') return 'from one of Ana\'s essays';
    if (src === 'note') return 'from Ana\'s Substack notes';
    if (src === 'qa') return 'how Ana answers this kind of question';
    if (src === 'framework') return 'one of Ana\'s frameworks';
    if (src === 'workshop') return 'from Ana\'s workshop teaching';
    if (src === 'offer-template') return 'a proven offer template';
    if (src === 'growth-research') return 'from Ana\'s growth/feed-algorithm research';
    return 'from Ana\'s material';
  };
  let out = "RELEVANT MATERIAL FROM ANA'S OWN LIBRARY (her actual writing, frameworks, and answers most relevant to this turn — draw on these ideas and phrasing, present them as your own; do NOT quote them as if reading from a document):\n\n";
  for (const c of chunks) {
    out += `--- ${label(c.source)}${c.title ? ` — "${c.title}"` : ''}:\n${c.text}\n\n`;
  }
  return out;
}
