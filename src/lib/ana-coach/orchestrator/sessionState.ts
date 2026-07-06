// Ana AI Coach — pure session state machine + profile merge.
//
// No I/O — every function here is deterministic and unit-testable. Triage
// PROPOSES phase changes; this code DISPOSES. Phases are MONOTONIC (forward-only)
// so noisy triage output can never move the session backwards.

import {
  PHASE_INTAKE_FORCE_AT,
  PHASE_DIAGNOSIS_FORCE_AT,
  PHASE_WRAP_FORCE_AT,
  PHASE_CLOSE_AT,
} from '../config';
import type { MemberProfile, SessionPhase } from '../types';

const ORDER: SessionPhase[] = ['INTAKE', 'DIAGNOSIS', 'COACHING', 'WRAP_UP', 'CLOSED'];
// The MINIMUM needed to start coaching meaningfully. Deliberately small: the coach
// should engage with the member's actual concern, not run a fixed intake form.
// Everything else (Substack URL, subscriber count, revenue) is captured
// opportunistically by triage when the member mentions it, and asked for ONLY when
// it's relevant to what they raised — never as a default checklist.
const REQUIRED_INTAKE_FIELDS: (keyof MemberProfile)[] = ['niche', 'goal'];

function rank(p: SessionPhase): number {
  return ORDER.indexOf(p);
}

// Which required intake fields are still missing (null/undefined/empty).
export function missingIntakeFields(profile: MemberProfile): (keyof MemberProfile)[] {
  return REQUIRED_INTAKE_FIELDS.filter((f) => {
    const v = profile[f];
    return v === null || v === undefined || v === '';
  });
}

// Shallow-merge triage's profile_updates: only non-null scalar fields overwrite;
// array fields (blockers, products_owned) are unioned. Never deletes data.
export function mergeProfile(current: MemberProfile, updates: Partial<MemberProfile> | null | undefined): MemberProfile {
  const next: MemberProfile = { ...current };
  if (!updates) return next;
  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === undefined) continue;
    if (key === 'blockers' || key === 'products_owned') {
      if (Array.isArray(value)) {
        const existing = (next[key as 'blockers'] as string[]) ?? [];
        // Union + dedup, then keep only the most RECENT entries so the list can't
        // bloat over a long session (newest last; triage re-surfaces what matters).
        const merged = Array.from(new Set([...existing, ...value.map(String)])).filter(Boolean);
        const cap = key === 'blockers' ? 6 : 12;
        next[key as 'blockers'] = merged.slice(-cap);
      }
      continue;
    }
    if (typeof value === 'string' && value.trim() === '') continue;
    // @ts-expect-error dynamic assign across the union — validated by key set above
    next[key] = value;
  }
  return next;
}

export interface PhaseInputs {
  current: SessionPhase;
  messageCount: number; // AFTER this turn's reservation (both roles)
  profile: MemberProfile;
  proposeAdvance: boolean;
  proposeWrap: boolean;
}

// Compute the next phase. Forward-only; forcing thresholds guarantee the session
// always reaches WRAP_UP (action plan) before the message cap.
export function nextPhase(inp: PhaseInputs): SessionPhase {
  const { current, messageCount, profile, proposeAdvance, proposeWrap } = inp;
  let candidate: SessionPhase = current;

  switch (current) {
    case 'INTAKE': {
      const intakeComplete = missingIntakeFields(profile).length === 0;
      if (intakeComplete || messageCount >= PHASE_INTAKE_FORCE_AT) candidate = 'DIAGNOSIS';
      break;
    }
    case 'DIAGNOSIS': {
      const hasBlockers = (profile.blockers?.length ?? 0) > 0;
      if ((proposeAdvance && hasBlockers) || messageCount >= PHASE_DIAGNOSIS_FORCE_AT) candidate = 'COACHING';
      break;
    }
    case 'COACHING': {
      if (proposeWrap || messageCount >= PHASE_WRAP_FORCE_AT) candidate = 'WRAP_UP';
      break;
    }
    case 'WRAP_UP': {
      if (messageCount >= PHASE_CLOSE_AT) candidate = 'CLOSED';
      break;
    }
    case 'CLOSED':
      candidate = 'CLOSED';
      break;
  }

  // Count-based floor: if the session lingered in an early phase, message-count
  // thresholds pull it forward so it always reaches WRAP_UP before the cap — even
  // if it needs to skip more than one phase in a single turn. The floor never
  // forces CLOSED (that stays a one-step move from WRAP_UP) so the action plan is
  // always delivered.
  let floor: SessionPhase = 'INTAKE';
  if (messageCount >= PHASE_WRAP_FORCE_AT) floor = 'WRAP_UP';
  else if (messageCount >= PHASE_DIAGNOSIS_FORCE_AT) floor = 'COACHING';
  else if (messageCount >= PHASE_INTAKE_FORCE_AT) floor = 'DIAGNOSIS';

  const best = rank(candidate) >= rank(floor) ? candidate : floor;

  // Monotonic guard: never move backwards.
  return rank(best) >= rank(current) ? best : current;
}

// The per-phase directive injected into the synthesis (voice) prompt.
export function synthesisDirective(phase: SessionPhase, profile: MemberProfile, messageCount: number): string {
  const blockers = profile.blockers?.join(', ') || 'not yet identified';
  const knowNiche = !!(profile.niche && String(profile.niche).trim());
  const knowGoal = !!(profile.goal && String(profile.goal).trim());
  switch (phase) {
    case 'INTAKE': {
      // Member-centric intake: engage with what they actually said, then ask ONE
      // relevant follow-up — never a fixed checklist, never the Substack URL by
      // default. Only nudge toward niche/goal if genuinely unknown.
      const nudge = !knowNiche && !knowGoal
        ? ' If (and only if) it helps you respond to what they raised, you may work in one natural question about their niche or what they want to achieve.'
        : !knowGoal
          ? ' If it fits naturally, you may ask what outcome they want.'
          : '';
      return `You are opening a coaching session. React directly and specifically to what the member just told you — meet them where they are and show you understand their actual situation. Do NOT run through a list of intake questions. Ask at most ONE follow-up, and only if you genuinely need it to help with what THEY raised.${nudge} Never ask for their Substack URL unless answering their specific question requires seeing their publication. Never make it feel like a form. Do not recommend any product yet.`;
    }
    case 'DIAGNOSIS':
      return `Diagnose where the member is stuck. Probe with pointed questions, reflect what you see, and name their #1 blocker explicitly to get agreement. Do not recommend any product yet.`;
    case 'COACHING':
      return `Coach hard on their blockers (${blockers}). Apply your frameworks concretely. Every reply must end with something specific to do or decide.`;
    case 'WRAP_UP':
      return messageCount >= PHASE_CLOSE_AT
        ? `This is your FINAL substantive reply. Deliver a complete, self-contained numbered 3–5 step action plan tied to their blockers (${blockers}), with a 7-day horizon. Make it stand alone.`
        : `Begin closing the session. Deliver a numbered 3–5 step action plan tied to their blockers (${blockers}), with a 7-day horizon.`;
    case 'CLOSED':
      return `The session is complete. Warmly tell the member to start a new session when they're ready.`;
  }
}

export { PHASE_CLOSE_AT, PHASE_WRAP_FORCE_AT };
