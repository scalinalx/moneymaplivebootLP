// Ana AI Coach — the turn pipeline. runTurn() is an async generator that yields
// SSE CoachEvents as it works and RETURNS a TurnResult the route persists.
//
// Stages: triage (always) → panel (conditional, parallel) → synthesis (streaming).
// Hard ceiling of 6 LLM calls/turn; no loops.

import { runTriage } from './triage';
import { selectPanel, runPanel } from './panel';
import { runSynthesis, extractRecommendedSlugs } from './synthesis';
import { mergeProfile, nextPhase, synthesisDirective } from './sessionState';
import { profileBlock } from './prompts/base';
import { embedQuery, retrieveWithVector, formatRetrieved } from '../retrieval';
import type { CoachEvent } from '../events';
import type { GeminiContent } from './gemini';
import type { Attachment, MemberProfile, SessionPhase } from '../types';
import type { SpecialistNote } from './specialists/types';

export interface RunTurnCtx {
  phase: SessionPhase;
  profile: MemberProfile;
  history: GeminiContent[]; // includes the latest user turn as the last element
  memberMessage: string;
  pending: Attachment[];
  messageCountAfter: number; // conversation message_count after reservation
}

export interface TurnResult {
  fullText: string;
  phaseBefore: SessionPhase;
  phaseAfter: SessionPhase;
  profile: MemberProfile;
  recommendedSlugs: string[];
  usage: { tokens_in: number; tokens_out: number }; // summed across all LLM calls this turn
  trace: {
    triage: unknown;
    specialists: unknown;
    synthesis: unknown;
    total_ms: number;
  };
}

export async function* runTurn(ctx: RunTurnCtx): AsyncGenerator<CoachEvent, TurnResult, void> {
  const started = Date.now();
  const phaseBefore = ctx.phase;

  // --- STAGE 1: TRIAGE + RETRIEVAL (parallel) ----------------------------
  // Retrieval only needs the member's message, so it runs concurrently with
  // triage — its latency hides behind triage and costs nothing on the timeline.
  yield { type: 'status', stage: 'triage' };
  // Embed the member message ONCE; the vector is reused for synthesis and for
  // each specialist's own domain-scoped retrieval (no per-agent embed calls).
  const [triage, queryVector] = await Promise.all([
    runTriage(ctx.phase, ctx.history),
    embedQuery(ctx.memberMessage),
  ]);
  const retrieved = queryVector ? retrieveWithVector(queryVector, 8) : [];
  const libraryText = formatRetrieved(retrieved);

  const profile = mergeProfile(ctx.profile, triage.profile_updates);
  const phaseAfter = nextPhase({
    current: ctx.phase,
    messageCount: ctx.messageCountAfter,
    profile,
    proposeAdvance: triage.propose_advance,
    proposeWrap: triage.propose_wrap,
  });
  const profileText = profileBlock(profile);

  // --- STAGE 2: PANEL ----------------------------------------------------
  const panel = selectPanel(triage.specialists, phaseAfter, ctx.pending);
  let notes: SpecialistNote[] = [];
  if (panel.length > 0) {
    yield { type: 'status', stage: 'panel', specialists: panel.map((p) => p.id) };
    const doneEvents: CoachEvent[] = [];
    notes = await runPanel(
      panel,
      { profileText, memberMessage: ctx.memberMessage, queryVector },
      ctx.pending,
      (note) => doneEvents.push({ type: 'status', stage: 'specialist_done', specialist: note.id, ms: note.ms }),
    );
    // Emit the specialist_done events collected during the parallel run.
    for (const ev of doneEvents) yield ev;
  }

  // --- STAGE 3: SYNTHESIS ------------------------------------------------
  yield { type: 'status', stage: 'synthesis' };
  const phaseDirective = synthesisDirective(phaseAfter, profile, ctx.messageCountAfter);
  const attachmentSummary = ctx.pending
    .map((a) => `- ${a.name} (${a.kind === 'url' ? 'web page' : 'file'})`)
    .join('\n');
  const synth = runSynthesis({
    phase: phaseAfter,
    profileText,
    phaseDirective,
    triageDirective: triage.synthesis_directive,
    notes,
    history: ctx.history,
    attachmentSummary,
    library: libraryText,
  });

  let synthUsage = { tokens_in: 0, tokens_out: 0 };
  let fullText = '';
  while (true) {
    const { value, done } = await synth.next();
    if (done) {
      synthUsage = value.usage;
      fullText = value.fullText;
      break;
    }
    yield { type: 'delta', text: value };
  }

  const recommendedSlugs = extractRecommendedSlugs(fullText);

  // Sum token usage across every LLM call this turn (triage + specialists + synthesis).
  const specialistTokensIn = notes.reduce((s, n) => s + (n.usage?.tokens_in ?? 0), 0);
  const specialistTokensOut = notes.reduce((s, n) => s + (n.usage?.tokens_out ?? 0), 0);
  const usage = {
    tokens_in: triage.usage.tokens_in + specialistTokensIn + synthUsage.tokens_in,
    tokens_out: triage.usage.tokens_out + specialistTokensOut + synthUsage.tokens_out,
  };

  return {
    fullText,
    phaseBefore,
    phaseAfter,
    profile,
    recommendedSlugs,
    usage,
    trace: {
      triage: {
        turn_type: triage.turn_type,
        retried: triage.retried,
        fell_back: triage.fell_back,
        specialists: triage.specialists.map((s) => s.id),
        usage: triage.usage,
      },
      specialists: notes.map((n) => ({
        id: n.id,
        status: n.status,
        ms: n.ms,
        usage: n.usage,
        notes: n.notes,
        recommendations: n.recommendations,
      })),
      synthesis: {
        usage: synthUsage,
        chars: fullText.length,
        retrieved: retrieved.map((r) => ({ id: r.id, source: r.source, score: Number(r.score.toFixed(3)) })),
      },
      total_ms: Date.now() - started,
    },
  };
}
