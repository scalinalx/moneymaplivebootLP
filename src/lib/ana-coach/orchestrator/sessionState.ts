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
// The diagnostic foundation every coaching session needs before prescribing:
// niche + a specific goal (ideal state) + at least one hard current-state number.
// The coach gathers these with SPECIFIC, data-seeking questions (see the INTAKE
// directive) — not a vague form. Revenue, paid subs, bottlenecks, and constraints
// are gathered alongside but don't hard-gate the phase (so it can't stall).
const REQUIRED_INTAKE_FIELDS: (keyof MemberProfile)[] = ['niche', 'goal', 'subscriber_count'];

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
    if (key === 'blockers' || key === 'products_owned' || key === 'constraints') {
      if (Array.isArray(value)) {
        const existing = (next[key as 'blockers'] as string[]) ?? [];
        // Union + dedup, then keep only the most RECENT entries so the list can't
        // bloat over a long session (newest last; triage re-surfaces what matters).
        const merged = Array.from(new Set([...existing, ...value.map(String)])).filter(Boolean);
        const cap = key === 'products_owned' ? 12 : 6;
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

// What the coach still needs to establish the diagnostic foundation, in plain
// terms it can weave into questions.
function stillNeeded(profile: MemberProfile): string[] {
  const need: string[] = [];
  if (!(profile.niche && String(profile.niche).trim())) need.push('their niche / who they serve');
  if (profile.subscriber_count == null) need.push('exact subscriber count (free)');
  if (profile.paid_subscriber_count == null) need.push('paid subscriber count');
  if (profile.revenue_monthly_usd == null) need.push('current monthly revenue ($)');
  if (!(profile.goal && String(profile.goal).trim())) need.push('their specific, measurable goal + timeframe');
  if (!(profile.blockers?.length)) need.push("what they think is blocking them right now");
  if (!(profile.constraints?.length)) need.push('their constraints (hours/week, budget, skills)');
  return need;
}

// The per-phase directive injected into the synthesis (voice) prompt. The coach's
// job across the whole session: move the member from their CURRENT STATE to their
// IDEAL STATE (goal) along the optimal, practical pathway — so it must first
// establish where they are, where they want to be, and what's in the way.
export function synthesisDirective(phase: SessionPhase, profile: MemberProfile, messageCount: number): string {
  const blockers = profile.blockers?.join(', ') || 'not yet identified';
  switch (phase) {
    case 'INTAKE': {
      const need = stillNeeded(profile);
      const needList = need.length ? need.join('; ') : 'nothing — you have the full picture';
      return `You are OPENING a coaching session, and you always start by understanding the member's situation in concrete terms before giving any prescriptive advice. First, react briefly and specifically to what they just told you so they feel understood. Then ask 1–2 SPECIFIC, data-seeking questions to fill in what you still need: ${needList}. Ask for real numbers and specifics, never vague ("what are you hoping for?" is banned — ask "how many free vs paid subscribers do you have, and what did you make last month?"). Do NOT dump every question at once — pick the 1–2 that matter most next and make them concrete. Do NOT give a plan or prescribe steps yet — you are mapping their current state and their goal. Do NOT recommend any product yet.`;
    }
    case 'DIAGNOSIS':
      return `You now know roughly where the member is and where they want to be. Pinpoint the ONE bottleneck most in the way of their goal, and begin mapping the optimal pathway from their current state to their ideal state. Probe with sharp, specific questions to confirm it, name the bottleneck explicitly, and get their agreement. If you're still missing a key number or constraint, ask for it specifically. Do not recommend any product yet.`;
    case 'COACHING':
      return `Walk the member down the optimal pathway toward their goal. Their bottlenecks: ${blockers}. Apply your frameworks concretely to THEIR actual numbers and situation — practical, step-by-step. Push them. Every reply must end with one specific thing to do or decide next.`;
    case 'WRAP_UP':
      return messageCount >= PHASE_CLOSE_AT
        ? `This is your FINAL substantive reply. Deliver a complete, self-contained numbered 3–5 step action plan that moves them along the pathway from where they are now to their goal, addressing their bottlenecks (${blockers}), with a 7-day horizon. Make it stand alone.`
        : `Begin closing the session. Deliver a numbered 3–5 step action plan that advances them from their current state toward their goal, addressing their bottlenecks (${blockers}), with a 7-day horizon.`;
    case 'CLOSED':
      return `The session is complete. Warmly tell the member to start a new session when they're ready.`;
  }
}

export { PHASE_CLOSE_AT, PHASE_WRAP_FORCE_AT };
