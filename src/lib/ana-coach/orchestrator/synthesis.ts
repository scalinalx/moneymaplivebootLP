// Ana AI Coach — synthesis stage (streaming, Ana's voice).

import { streamText } from './gemini';
import type { GeminiContent, Usage } from './gemini';
import { synthesisSystemPrompt } from './prompts/synthesis';
import { COACH_SYNTHESIS_MODEL, TOKENS, SYNTHESIS_TIMEOUT_MS } from '../config';
import { PRODUCT_SLUGS } from '../knowledge.generated';
import type { SessionPhase } from '../types';
import type { SpecialistNote } from './specialists/types';

const SLUG_SET = new Set(PRODUCT_SLUGS);

export interface SynthesisArgs {
  phase: SessionPhase;
  profileText: string;
  phaseDirective: string;
  triageDirective: string;
  notes: SpecialistNote[];
  history: GeminiContent[];
  attachmentSummary: string;
  library: string;
}

// Streams Ana's reply. Yields text deltas; returns { usage, fullText }.
export async function* runSynthesis(
  args: SynthesisArgs,
): AsyncGenerator<string, { usage: Usage; fullText: string }, void> {
  const cfg = TOKENS.synthesis;
  const system = synthesisSystemPrompt({
    phase: args.phase,
    profileText: args.profileText,
    phaseDirective: args.phaseDirective,
    triageDirective: args.triageDirective,
    notes: args.notes,
    attachmentSummary: args.attachmentSummary,
    library: args.library,
  });

  const stream = streamText({
    model: COACH_SYNTHESIS_MODEL,
    system,
    contents: args.history,
    temperature: cfg.temp,
    maxOutputTokens: cfg.out,
    thinkingBudget: cfg.thinking,
    timeoutMs: SYNTHESIS_TIMEOUT_MS,
  });

  let full = '';
  let usage: Usage = { tokens_in: 0, tokens_out: 0 };
  while (true) {
    const { value, done } = await stream.next();
    if (done) {
      usage = value as Usage;
      break;
    }
    full += value;
    yield value;
  }

  return { usage, fullText: sanitizeMarkers(full) };
}

// Belt-and-suspenders: strip any [[product:slug]] marker whose slug is not real,
// in case the model invents one despite the prompt whitelist.
export function sanitizeMarkers(text: string): string {
  return text.replace(/\[\[product:([a-z0-9-]+)\]\]/gi, (m, slug) =>
    SLUG_SET.has(String(slug).toLowerCase()) ? m : '',
  );
}

// Extract the (validated) product slugs actually recommended in the final text —
// used for the coach_product_recommended analytics event + trace.
export function extractRecommendedSlugs(text: string): string[] {
  const out: string[] = [];
  const re = /\[\[product:([a-z0-9-]+)\]\]/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const slug = m[1].toLowerCase();
    if (SLUG_SET.has(slug) && !out.includes(slug)) out.push(slug);
  }
  return out;
}
