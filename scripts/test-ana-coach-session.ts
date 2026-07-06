/**
 * Unit tests for the pure session state machine + profile merge.
 *   npx tsx scripts/test-ana-coach-session.ts
 * No DB / network — pure functions only.
 */
import {
  nextPhase,
  mergeProfile,
  missingIntakeFields,
  synthesisDirective,
} from '../src/lib/ana-coach/orchestrator/sessionState';
import type { MemberProfile, SessionPhase } from '../src/lib/ana-coach/types';

let failures = 0;
function assert(label: string, cond: boolean, detail = '') {
  console.log(`${cond ? '✅' : '❌'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!cond) failures++;
}

const FULL: MemberProfile = {
  substack_url: 'https://x.substack.com',
  subscriber_count: 1200,
  niche: 'productivity',
  revenue_monthly_usd: 0,
  goal: 'first paid launch',
};

// --- missingIntakeFields --------------------------------------------------
assert('full profile → no missing intake fields', missingIntakeFields(FULL).length === 0);
assert('empty profile → 5 missing', missingIntakeFields({}).length === 5);
assert('revenue 0 counts as present (not missing)',
  !missingIntakeFields(FULL).includes('revenue_monthly_usd'));

// --- mergeProfile ---------------------------------------------------------
const merged = mergeProfile({ niche: 'old' }, { niche: 'new', subscriber_count: 500, blockers: ['pricing'] });
assert('merge overwrites scalar', merged.niche === 'new');
assert('merge adds new scalar', merged.subscriber_count === 500);
assert('merge sets blockers', merged.blockers?.[0] === 'pricing');
const merged2 = mergeProfile(merged, { niche: null, blockers: ['positioning', 'pricing'] });
assert('merge null does not wipe', merged2.niche === 'new');
assert('merge unions blockers (dedup)', merged2.blockers?.length === 2, JSON.stringify(merged2.blockers));
assert('merge empty string ignored', mergeProfile({ goal: 'keep' }, { goal: '' }).goal === 'keep');

// --- nextPhase: INTAKE ----------------------------------------------------
assert('INTAKE stays when incomplete + low count',
  nextPhase({ current: 'INTAKE', messageCount: 2, profile: {}, proposeAdvance: false, proposeWrap: false }) === 'INTAKE');
assert('INTAKE → DIAGNOSIS when profile complete',
  nextPhase({ current: 'INTAKE', messageCount: 4, profile: FULL, proposeAdvance: false, proposeWrap: false }) === 'DIAGNOSIS');
assert('INTAKE → DIAGNOSIS forced at count 8',
  nextPhase({ current: 'INTAKE', messageCount: 8, profile: {}, proposeAdvance: false, proposeWrap: false }) === 'DIAGNOSIS');

// --- nextPhase: DIAGNOSIS -------------------------------------------------
assert('DIAGNOSIS stays without blockers even if proposeAdvance',
  nextPhase({ current: 'DIAGNOSIS', messageCount: 10, profile: FULL, proposeAdvance: true, proposeWrap: false }) === 'DIAGNOSIS');
assert('DIAGNOSIS → COACHING with blockers + proposeAdvance',
  nextPhase({ current: 'DIAGNOSIS', messageCount: 10, profile: { ...FULL, blockers: ['pricing'] }, proposeAdvance: true, proposeWrap: false }) === 'COACHING');
assert('DIAGNOSIS → COACHING forced at 14',
  nextPhase({ current: 'DIAGNOSIS', messageCount: 14, profile: FULL, proposeAdvance: false, proposeWrap: false }) === 'COACHING');

// --- nextPhase: COACHING → WRAP_UP ---------------------------------------
assert('COACHING stays mid-session',
  nextPhase({ current: 'COACHING', messageCount: 18, profile: FULL, proposeAdvance: false, proposeWrap: false }) === 'COACHING');
assert('COACHING → WRAP_UP forced at 25',
  nextPhase({ current: 'COACHING', messageCount: 25, profile: FULL, proposeAdvance: false, proposeWrap: false }) === 'WRAP_UP');
assert('COACHING → WRAP_UP on proposeWrap',
  nextPhase({ current: 'COACHING', messageCount: 20, profile: FULL, proposeAdvance: false, proposeWrap: true }) === 'WRAP_UP');

// --- nextPhase: WRAP_UP → CLOSED -----------------------------------------
assert('WRAP_UP → CLOSED at 28',
  nextPhase({ current: 'WRAP_UP', messageCount: 28, profile: FULL, proposeAdvance: false, proposeWrap: false }) === 'CLOSED');

// --- Count-based floor cascades multiple phases in one turn --------------
assert('INTAKE at count 25 cascades straight to WRAP_UP',
  nextPhase({ current: 'INTAKE', messageCount: 25, profile: {}, proposeAdvance: false, proposeWrap: false }) === 'WRAP_UP');
assert('INTAKE at count 14 cascades to COACHING',
  nextPhase({ current: 'INTAKE', messageCount: 14, profile: {}, proposeAdvance: false, proposeWrap: false }) === 'COACHING');
assert('floor never forces CLOSED (WRAP_UP delivered first)',
  nextPhase({ current: 'DIAGNOSIS', messageCount: 30, profile: {}, proposeAdvance: false, proposeWrap: false }) === 'WRAP_UP');

// --- Monotonicity: never move backwards ----------------------------------
const phases: SessionPhase[] = ['INTAKE', 'DIAGNOSIS', 'COACHING', 'WRAP_UP', 'CLOSED'];
let monotonic = true;
for (let i = 0; i < phases.length; i++) {
  // Even with all "advance" signals off and low counts, phase must not regress.
  const out = nextPhase({ current: phases[i], messageCount: 0, profile: {}, proposeAdvance: false, proposeWrap: false });
  if (phases.indexOf(out) < i) monotonic = false;
}
assert('phases never regress', monotonic);

// --- synthesisDirective sanity -------------------------------------------
assert('WRAP_UP directive at close is final/self-contained',
  /FINAL/.test(synthesisDirective('WRAP_UP', FULL, 28)));
assert('INTAKE directive forbids product rec',
  /Do not recommend/i.test(synthesisDirective('INTAKE', {}, 2)));

console.log(`\n${failures === 0 ? '✅ all passed' : `❌ ${failures} failing`}\n`);
process.exit(failures === 0 ? 0 : 1);
