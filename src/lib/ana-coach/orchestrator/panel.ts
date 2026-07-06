// Ana AI Coach — specialist panel selection + parallel dispatch.
//
// Triage proposes specialists; this applies deterministic overrides (force
// attachment analysis, suppress the panel during pure intake, cap at N), routes
// untrusted blocks ONLY to the specialists that should see them, and runs the
// selected specialists in parallel — best-effort (allSettled).

import { runSpecialist } from './specialists';
import { wrapUntrusted } from '../untrusted';
import { embedQuery, retrieveWithVector, formatRetrieved, SPECIALIST_SOURCES } from '../retrieval';
import { MAX_SPECIALISTS_PER_TURN } from '../config';
import type { SpecialistPlan } from './triage';
import type { Attachment, SessionPhase, SpecialistId } from '../types';
import type { SpecialistNote, SpecialistContext } from './specialists/types';

export function selectPanel(
  triagePlan: SpecialistPlan[],
  phase: SessionPhase,
  pending: Attachment[],
): SpecialistPlan[] {
  const plan: SpecialistPlan[] = [...triagePlan];
  const has = (id: SpecialistId) => plan.some((p) => p.id === id);
  const hasFile = pending.some((a) => a.kind === 'file');
  const hasUrl = pending.some((a) => a.kind === 'url');

  if (pending.length > 0) {
    // Force the specialist that consumes each attachment kind.
    if (hasUrl && !has('growth_auditor')) {
      plan.unshift({ id: 'growth_auditor', question: 'Audit the web page the member submitted.', attachment_ids: [] });
    }
    if (hasFile && !has('copy_critic')) {
      plan.unshift({ id: 'copy_critic', question: 'Review the file the member uploaded.', attachment_ids: [] });
    }
  } else if (phase === 'INTAKE') {
    // Pure intake with nothing attached → conversation only, no panel.
    return [];
  }

  return plan.slice(0, MAX_SPECIALISTS_PER_TURN);
}

// Untrusted content routing: copy_critic sees uploaded FILES, growth_auditor sees
// fetched URLS. strategy_coach and product_matcher NEVER receive raw untrusted
// text (product_matcher makes purchase-adjacent claims → zero injection surface).
function untrustedFor(id: SpecialistId, pending: Attachment[]): string[] {
  if (id === 'copy_critic') {
    return pending
      .filter((a) => a.kind === 'file')
      .map((a) => wrapUntrusted(a.extracted_text, `member-uploaded file: ${a.name}`));
  }
  if (id === 'growth_auditor') {
    return pending
      .filter((a) => a.kind === 'url')
      .map((a) => wrapUntrusted(a.extracted_text, `web page fetched at member request: ${a.name}`));
  }
  return [];
}

function failedNote(id: SpecialistId, ms: number): SpecialistNote {
  return { id, status: 'failed', ms, usage: { tokens_in: 0, tokens_out: 0 }, notes: '' };
}

export async function runPanel(
  panel: SpecialistPlan[],
  base: { profileText: string; memberMessage: string; queryVector: number[] | null },
  pending: Attachment[],
  onDone: (note: SpecialistNote) => void,
): Promise<SpecialistNote[]> {
  const tasks = panel.map(async (p) => {
    const start = Date.now();
    // Each specialist retrieves from its OWN domain sources, using ITS diagnostic
    // question as the query (tailored to its angle by triage) so the most relevant
    // use cases from Ana's experience surface. Falls back to the turn's shared
    // vector if the question is empty or embedding fails.
    const sources = SPECIALIST_SOURCES[p.id];
    let queryVec = base.queryVector;
    if (p.question?.trim()) {
      queryVec = (await embedQuery(`${p.question}\n${base.memberMessage}`)) ?? base.queryVector;
    }
    const library =
      queryVec && Array.isArray(sources)
        ? formatRetrieved(retrieveWithVector(queryVec, 6, 0.5, sources))
        : '';
    const ctx: SpecialistContext = {
      question: p.question,
      profileText: base.profileText,
      memberMessage: base.memberMessage,
      library,
      untrusted: untrustedFor(p.id, pending),
    };
    try {
      const note = await runSpecialist(p.id, ctx);
      onDone(note);
      return note;
    } catch (err) {
      console.error(`[ana-coach] specialist ${p.id} failed:`, err instanceof Error ? err.message : err);
      const note = failedNote(p.id, Date.now() - start);
      onDone(note);
      return note;
    }
  });

  const settled = await Promise.allSettled(tasks);
  return settled.map((s, i) =>
    s.status === 'fulfilled' ? s.value : failedNote(panel[i].id, 0),
  );
}
