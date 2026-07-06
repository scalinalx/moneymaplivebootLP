/**
 * Ingest ALL of Ana's substantive Kit broadcasts into raw coaching material.
 *   npx tsx scripts/ingest-kit-broadcasts.ts
 *
 * Pulls every completed broadcast, drops logistics/transactional sends (reminders,
 * "we're live", replays) and near-duplicate re-sends, strips HTML to clean text,
 * heuristically classifies each, and writes src/data/ana-coach/kit-emails.json —
 * the full library. The knowledge generator then feeds a diverse VOICE subset into
 * the coach's prompts and keeps the rest as the retrieval corpus.
 */
import { config } from 'dotenv';
import { htmlToText } from 'html-to-text';
import fs from 'node:fs';
import path from 'node:path';

config({ path: '.env.local' });

const KIT_API_KEY = process.env.KIT_API_KEY!;
const KIT_BASE_URL = process.env.KIT_BASE_URL || 'https://api.kit.com/v4/';

// Logistics / transactional subjects — low voice value, excluded.
const LOGISTICS = /(starting in|in \d+ hours?|we('re| are) live|we start|reminder|replay|1-hour|2 hours|15 minutes|get in here|doors are about to open|last shot|last call|only \d+ (spot|hours)|deadline to join|hours? left|resending|everything you need for tomorrow|tomorrow at|we're starting|grab your coffee|1 hour|hot seat|recording)/i;

type Kind = 'teaching' | 'story' | 'pricing' | 'sales';
function classify(subject: string, text: string): Kind {
  const s = subject.toLowerCase();
  const head = (subject + ' ' + text.slice(0, 160)).toLowerCase();
  if (/invitation|seats?|\bspots?\b|\bjoin\b|apply|enroll|doors open|looking for \d+|women\.|last chance|priority access/.test(s)) return 'sales';
  if (/\$\d|\/month|\/year|\bpric|charge|\btier\b|per month|per year/.test(head)) return 'pricing';
  if (/how to|the best way|here'?s|the rule|the difference|why you|you don'?t|\d+ (ways|reasons|things|reads|steps)|the exercise|the tool|swipe|framework|method|is enough|now you|it'?s your turn|stop |your fault/.test(s)) return 'teaching';
  return 'story';
}

function clean(html: string): string {
  return htmlToText(html, {
    wordwrap: false,
    selectors: [
      { selector: 'a', options: { ignoreHref: true } },
      { selector: 'img', format: 'skip' },
      { selector: 'style', format: 'skip' },
    ],
  })
    .replace(/\{\{[^}]*\}\}/g, 'there')
    .replace(/\n?Unsubscribe[\s\S]*$/i, '')
    .replace(/\n?Update your profile[\s\S]*$/i, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function listAll(): Promise<{ id: number; subject: string; status: string; recipients?: number }[]> {
  const out: { id: number; subject: string; status: string }[] = [];
  let cursor: string | undefined;
  for (let p = 0; p < 10; p++) {
    const url = new URL(`${KIT_BASE_URL}broadcasts`);
    url.searchParams.set('per_page', '100');
    if (cursor) url.searchParams.set('after', cursor);
    const r = await fetch(url, { headers: { 'X-Kit-Api-Key': KIT_API_KEY, Accept: 'application/json' } });
    const j = await r.json();
    out.push(...(j.broadcasts || []));
    if (!j.pagination?.has_next_page) break;
    cursor = j.pagination.end_cursor;
  }
  return out;
}

async function getBroadcast(id: number) {
  const res = await fetch(`${KIT_BASE_URL}broadcasts/${id}`, {
    headers: { 'X-Kit-Api-Key': KIT_API_KEY, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`broadcast ${id} → HTTP ${res.status}`);
  const json = await res.json();
  return json.broadcast || json;
}

async function main() {
  if (!KIT_API_KEY) { console.error('❌ KIT_API_KEY not set'); process.exit(1); }

  const all = await listAll();
  const completed = all.filter((b) => b.status === 'completed');
  const substantive = completed.filter((b) => !LOGISTICS.test(b.subject));

  // Dedup by normalized subject — keep the first occurrence (largest send is
  // usually first in the list, sorted newest-first; content is identical).
  const seen = new Set<string>();
  const distinct = substantive.filter((b) => {
    const k = (b.subject || '').toLowerCase().trim();
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  console.log(`Found ${all.length} broadcasts → ${completed.length} sent → ${substantive.length} substantive → ${distinct.length} distinct. Fetching content…\n`);

  const out: { id: number; kind: Kind; subject: string; text: string; chars: number }[] = [];
  for (const b of distinct) {
    try {
      const full = await getBroadcast(b.id);
      const text = clean(full.content || '');
      if (text.length < 150) continue; // skip near-empty
      out.push({ id: b.id, kind: classify(b.subject, text), subject: b.subject, text, chars: text.length });
    } catch (e) {
      console.log(`❌ ${b.id} — ${e instanceof Error ? e.message : e}`);
    }
  }

  const dir = path.join(process.cwd(), 'src/data/ana-coach');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'kit-emails.json'), JSON.stringify(out, null, 2));

  const byKind = out.reduce<Record<string, number>>((m, e) => ((m[e.kind] = (m[e.kind] || 0) + 1), m), {});
  const totalChars = out.reduce((s, e) => s + e.chars, 0);
  console.log(`📥 Saved ${out.length} emails (${JSON.stringify(byKind)}) — ${totalChars} chars, ~${Math.round(totalChars / 4)} tokens`);
  console.log(`   → src/data/ana-coach/kit-emails.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
