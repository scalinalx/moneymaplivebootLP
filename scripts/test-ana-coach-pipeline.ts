/**
 * Live end-to-end test of the multi-agent turn pipeline against the real Gemini
 * API — NO database required. Drives runTurn() directly with a mock context.
 *
 *   npx tsx scripts/test-ana-coach-pipeline.ts
 *
 * Exercises: triage routing + JSON schema, parallel specialist panel, streaming
 * synthesis, phase transition, and the [[product:slug]] whitelist.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { runTurn } from '../src/lib/ana-coach/orchestrator';
import type { GeminiContent } from '../src/lib/ana-coach/orchestrator/gemini';
import type { Attachment, MemberProfile } from '../src/lib/ana-coach/types';

async function turn(label: string, opts: {
  phase: any;
  profile: MemberProfile;
  history: GeminiContent[];
  message: string;
  pending?: Attachment[];
  messageCountAfter: number;
}) {
  console.log(`\n\n════════ ${label} ════════`);
  const it = runTurn({
    phase: opts.phase,
    profile: opts.profile,
    history: opts.history,
    memberMessage: opts.message,
    pending: opts.pending ?? [],
    messageCountAfter: opts.messageCountAfter,
  });

  let result;
  let streamed = '';
  while (true) {
    const { value, done } = await it.next();
    if (done) { result = value; break; }
    if (value.type === 'status') {
      if (value.stage === 'panel') console.log(`  ▸ panel: ${value.specialists.join(', ')}`);
      else if (value.stage === 'specialist_done') console.log(`  ▸ ${value.specialist} done (${value.ms}ms)`);
      else console.log(`  ▸ ${value.stage}`);
    } else if (value.type === 'delta') {
      streamed += value.text;
      process.stdout.write(value.text);
    }
  }
  console.log(`\n  --- phase ${result.phaseBefore} → ${result.phaseAfter} | ${result.trace.total_ms}ms | recs: ${result.recommendedSlugs.join(',') || 'none'} ---`);
  return result;
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not set in .env.local');
    process.exit(1);
  }

  const history: GeminiContent[] = [];
  const push = (role: 'user' | 'model', text: string) => history.push({ role, parts: [{ text }] });

  // Turn 1 — intake (should select 0 specialists, ask intake questions).
  push('user', "Hi Ana, I want your help making money from my newsletter.");
  const r1 = await turn('TURN 1 — intake', {
    phase: 'INTAKE', profile: {}, history: [...history], message: history[0].parts[0].text, messageCountAfter: 2,
  });
  push('model', r1.fullText);

  // Turn 2 — member gives profile facts (triage should extract them).
  const msg2 = "I write about productivity for knowledge workers. 1,400 free subscribers, zero paid, making $0/mo. I want my first paid launch.";
  push('user', msg2);
  const r2 = await turn('TURN 2 — profile facts + strategy', {
    phase: r1.phaseAfter, profile: r1.profile, history: [...history], message: msg2, messageCountAfter: 4,
  });
  console.log('\n  captured profile:', JSON.stringify(r2.profile));
  push('model', r2.fullText);

  // Turn 3 — a copy-review turn via a mock uploaded file (forces copy_critic).
  const mockFile: Attachment = {
    id: 'att-1', conversation_id: 'c1', kind: 'file', name: 'my-headline.txt', mime: 'text/plain',
    char_count: 60, truncated: false,
    extracted_text: 'My newsletter helps you be more productive and get more done every day.',
  };
  const msg3 = "Here's my tagline — is it any good?";
  push('user', msg3);
  const r3 = await turn('TURN 3 — copy critique (file attached)', {
    phase: r2.phaseAfter, profile: r2.profile, history: [...history], message: msg3, pending: [mockFile], messageCountAfter: 6,
  });
  push('model', r3.fullText);

  // Turn 4 — force wrap-up (messageCountAfter >= 25) → expect action plan.
  const msg4 = "Okay what should I actually do this week?";
  push('user', msg4);
  const r4 = await turn('TURN 4 — forced WRAP_UP action plan', {
    phase: r3.phaseAfter, profile: r3.profile, history: [...history], message: msg4, messageCountAfter: 26,
  });

  console.log('\n\n✅ pipeline test complete.');
  console.log(`   phases reached: 1:${r1.phaseAfter} 2:${r2.phaseAfter} 3:${r3.phaseAfter} 4:${r4.phaseAfter}`);
}

main().catch((e) => { console.error('\n❌ pipeline test failed:', e); process.exit(1); });
