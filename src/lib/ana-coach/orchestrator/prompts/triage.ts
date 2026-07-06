// Ana AI Coach — triage prompt + response schema.

import { Type } from '@google/genai';
import { analystFraming } from './base';
import type { SessionPhase } from '../../types';

export function triageSystemPrompt(phase: SessionPhase): string {
  return `${analystFraming('triage & routing analyst')}

Your job each turn: read the member's latest message plus the conversation so far,
then output STRICT JSON that (a) extracts any profile facts the member revealed,
(b) proposes whether the session should advance or wrap up, and (c) decides which
specialist analysts (0–4) Ana should consult and what to ask each.

Current session phase: ${phase}

ROUTING GUIDANCE:
- Select ZERO specialists for: intake answers, acknowledgements, clarifying
  questions, small talk, or simple follow-ups to advice just given.
- Select "copy_critic" when the member shares or asks about their actual writing,
  headlines, about page, posts, or sales copy.
- Select "strategy_coach" for offer design, pricing, positioning, ICP, "what
  should I sell / charge".
- Select "growth_auditor" for subscriber growth, publishing cadence, Notes, feed
  reach, or free→paid conversion questions.
- Select "product_matcher" ONLY when the member clearly needs a resource/program
  and you want Ana to consider recommending one. Be sparing.
- Prefer 1–2 specialists. Never more than 3. Each specialist you select MUST get a
  specific question tailored to this turn.
- profile_updates: include only fields the member actually revealed; use null for
  everything else. Never guess.
- Set phase.propose_advance true when the current phase's goal is clearly met.
- Set phase.propose_wrap true when the member seems ready for an action plan.`;
}

export const TRIAGE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    turn_type: { type: Type.STRING },
    profile_updates: {
      type: Type.OBJECT,
      properties: {
        substack_url: { type: Type.STRING, nullable: true },
        subscriber_count: { type: Type.INTEGER, nullable: true },
        paid_subscriber_count: { type: Type.INTEGER, nullable: true },
        niche: { type: Type.STRING, nullable: true },
        revenue_monthly_usd: { type: Type.INTEGER, nullable: true },
        goal: { type: Type.STRING, nullable: true },
        blockers: { type: Type.ARRAY, items: { type: Type.STRING } },
        products_owned: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    phase: {
      type: Type.OBJECT,
      properties: {
        propose_advance: { type: Type.BOOLEAN },
        propose_wrap: { type: Type.BOOLEAN },
        reason: { type: Type.STRING },
      },
      required: ['propose_advance', 'propose_wrap'],
    },
    specialists: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          question: { type: Type.STRING },
          attachment_ids: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['id', 'question'],
      },
    },
    synthesis_directive: { type: Type.STRING },
  },
  required: ['turn_type', 'phase', 'specialists', 'synthesis_directive'],
};
