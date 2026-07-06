// Ana AI Coach — triage stage.
//
// One fast, cheap, thinking-free JSON call that extracts profile facts, proposes
// phase transitions, and routes to specialists. One retry on invalid JSON, then a
// deterministic fallback (no panel, no profile change) so a malformed triage can
// never break the turn.

import { callJson } from './gemini';
import { triageSystemPrompt, TRIAGE_SCHEMA } from './prompts/triage';
import type { GeminiContent, Usage } from './gemini';
import { COACH_TRIAGE_MODEL, MAX_SPECIALISTS_PER_TURN, TOKENS, TRIAGE_TIMEOUT_MS } from '../config';
import type { MemberProfile, SessionPhase, SpecialistId } from '../types';

const VALID_SPECIALISTS: SpecialistId[] = [
  'strategy_coach',
  'copy_critic',
  'growth_auditor',
  'product_matcher',
];

export interface SpecialistPlan {
  id: SpecialistId;
  question: string;
  attachment_ids: string[];
}

export interface TriageResult {
  turn_type: string;
  profile_updates: Partial<MemberProfile>;
  propose_advance: boolean;
  propose_wrap: boolean;
  specialists: SpecialistPlan[];
  synthesis_directive: string;
  usage: Usage;
  retried: boolean;
  fell_back: boolean;
}

interface RawTriage {
  turn_type?: string;
  profile_updates?: Record<string, unknown>;
  phase?: { propose_advance?: boolean; propose_wrap?: boolean };
  specialists?: { id?: string; question?: string; attachment_ids?: string[] }[];
  synthesis_directive?: string;
}

function normalize(raw: RawTriage): Omit<TriageResult, 'usage' | 'retried' | 'fell_back'> {
  const specialists: SpecialistPlan[] = [];
  const seen = new Set<string>();
  for (const s of raw.specialists ?? []) {
    const id = s.id as SpecialistId;
    if (!VALID_SPECIALISTS.includes(id) || seen.has(id)) continue;
    seen.add(id);
    specialists.push({
      id,
      question: typeof s.question === 'string' ? s.question.slice(0, 600) : '',
      attachment_ids: Array.isArray(s.attachment_ids) ? s.attachment_ids.map(String) : [],
    });
    if (specialists.length >= MAX_SPECIALISTS_PER_TURN) break;
  }
  return {
    turn_type: raw.turn_type ?? 'other',
    profile_updates: (raw.profile_updates ?? {}) as Partial<MemberProfile>,
    propose_advance: !!raw.phase?.propose_advance,
    propose_wrap: !!raw.phase?.propose_wrap,
    specialists,
    synthesis_directive: typeof raw.synthesis_directive === 'string' ? raw.synthesis_directive : '',
  };
}

function fallback(): Omit<TriageResult, 'usage' | 'retried' | 'fell_back'> {
  return {
    turn_type: 'other',
    profile_updates: {},
    propose_advance: false,
    propose_wrap: false,
    specialists: [],
    synthesis_directive: '',
  };
}

export async function runTriage(
  phase: SessionPhase,
  contents: GeminiContent[],
): Promise<TriageResult> {
  const cfg = TOKENS.triage;
  let retried = false;
  let usage: Usage = { tokens_in: 0, tokens_out: 0 };

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { data, usage: u } = await callJson<RawTriage>({
        model: COACH_TRIAGE_MODEL,
        system: triageSystemPrompt(phase),
        contents,
        temperature: cfg.temp,
        maxOutputTokens: cfg.out,
        thinkingBudget: cfg.thinking,
        timeoutMs: TRIAGE_TIMEOUT_MS,
        schema: TRIAGE_SCHEMA,
      });
      usage = u;
      return { ...normalize(data), usage, retried, fell_back: false };
    } catch (err) {
      console.error(`[ana-coach] triage attempt ${attempt + 1} failed:`, err instanceof Error ? err.message : err);
      retried = true;
    }
  }

  // Deterministic fallback — turn proceeds panel-less.
  return { ...fallback(), usage, retried, fell_back: true };
}
