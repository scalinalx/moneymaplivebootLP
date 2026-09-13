import { supabaseAdmin } from '@/lib/supabase';
import { addSubscriberWithTag, KIT_SUBSTACK_CHALLENGE_PAID_TAG } from '@/lib/kit';
import { listCircleCharges, type CircleCharge, type CircleChargesPage } from '@/lib/circle';
import { SUBSTACK_CHALLENGE_PRICE, SUBSTACK_CHALLENGE_PLUS_PRICE } from '@/lib/constants';

// Polls Circle for paid 30-Day Substack Challenge charges and (1) marks the
// matching lead paid in substack_challenge_leads, (2) tags the buyer in Kit
// with the paid tag so Kit drops them from the recovery sequences.
//
// Idempotency: each processed charge's Circle id is stored on the lead row
// (circle_charge_id, unique). A re-run sees it and skips. If the paid columns
// from migration 20260913130000 aren't applied yet, the lookup fails softly:
// we still tag Kit (re-tagging is a no-op there) and log that the DB write was
// skipped, so the sequences stop even before the migration lands.
//
// Matching: a charge is "ours" when the paywall name matches
// CIRCLE_CHALLENGE_PAYWALL_MATCH (default: contains "substack challenge",
// case-insensitive) OR it's a USD charge for exactly the challenge price or the
// challenge+1:1 price. Two rules so a renamed paywall or a coupon-adjusted
// amount still matches on the other rule.

const PAYWALL_MATCH = new RegExp(process.env.CIRCLE_CHALLENGE_PAYWALL_MATCH || 'substack\\s*challenge', 'i');
const PAID_STATUSES = new Set(['paid', 'succeeded', 'success']);
const LOOKBACK_DAYS_DEFAULT = 14;   // first run / no state
const LOOKBACK_MARGIN_DAYS = 2;     // re-scan window behind the newest known charge
const MAX_PAGES = 5;

export interface SyncSummary {
  since: string;
  fetched: number;
  matched: number;
  already_processed: number;
  marked_paid: number;
  inserted_leads: number;
  kit_tagged: number;
  refunded_seen: number;
  db_write_skipped: number;
  errors: string[];
}

export function isChallengeCharge(c: CircleCharge): boolean {
  if (c.paywall_name && PAYWALL_MATCH.test(c.paywall_name)) return true;
  const usd = (c.currency || '').toLowerCase() === 'usd';
  return usd && (c.amount === SUBSTACK_CHALLENGE_PRICE || c.amount === SUBSTACK_CHALLENGE_PLUS_PRICE);
}

export function tierForCharge(c: CircleCharge): 'challenge' | 'challenge_1on1' {
  return c.amount >= SUBSTACK_CHALLENGE_PLUS_PRICE ? 'challenge_1on1' : 'challenge';
}

function isMissingColumn(err: { code?: string; message?: string } | null): boolean {
  if (!err) return false;
  return err.code === '42703' || err.code === 'PGRST204' || /column .* does not exist|schema cache/i.test(err.message || '');
}

async function computeSince(): Promise<string> {
  const fallback = new Date(Date.now() - LOOKBACK_DAYS_DEFAULT * 86_400_000);
  try {
    const { data, error } = await supabaseAdmin
      .from('substack_challenge_leads')
      .select('paid_at')
      .not('circle_charge_id', 'is', null)
      .order('paid_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data?.paid_at) return fallback.toISOString();
    const newest = new Date(data.paid_at).getTime() - LOOKBACK_MARGIN_DAYS * 86_400_000;
    return new Date(Math.min(newest, Date.now())).toISOString();
  } catch {
    return fallback.toISOString();
  }
}

type Fetcher = (opts: { createdAtGte?: string; page?: number; perPage?: number; status?: string }) => Promise<CircleChargesPage>;

export async function syncCirclePaid(fetcher: Fetcher = listCircleCharges): Promise<SyncSummary> {
  const since = await computeSince();
  const s: SyncSummary = { since, fetched: 0, matched: 0, already_processed: 0, marked_paid: 0, inserted_leads: 0, kit_tagged: 0, refunded_seen: 0, db_write_skipped: 0, errors: [] };

  // 1. Pull every charge since `since` (newest first, a few pages at most).
  const charges: CircleCharge[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await fetcher({ createdAtGte: since, page, perPage: 100 });
    charges.push(...(res.records || []));
    if (!res.has_next_page) break;
  }
  s.fetched = charges.length;

  // 2. Keep ours; oldest first so paid_at ordering is natural.
  const ours = charges.filter(isChallengeCharge).sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
  s.matched = ours.length;

  for (const c of ours) {
    const status = (c.status || '').toLowerCase();
    if (/refund/.test(status)) { s.refunded_seen++; continue; }   // logged only, for now
    if (!PAID_STATUSES.has(status)) { s.errors.push(`charge ${c.id}: unhandled status '${c.status}'`); continue; }
    const email = (c.community_member_email || '').trim().toLowerCase();
    if (!email) { s.errors.push(`charge ${c.id}: no member email`); continue; }
    const chargeId = String(c.id);
    const firstName = String(c.community_member_name || '').trim().split(/\s+/)[0];
    const paidAt = c.created_at || new Date().toISOString();
    const tier = tierForCharge(c);

    // 3. Skip if we've already processed this charge.
    let dbAvailable = true;
    try {
      const { data: seen, error } = await supabaseAdmin
        .from('substack_challenge_leads').select('id').eq('circle_charge_id', chargeId).limit(1);
      if (error) {
        if (isMissingColumn(error)) { dbAvailable = false; s.db_write_skipped++; }
        else s.errors.push(`charge ${chargeId}: lookup failed: ${error.message}`);
      } else if (seen && seen.length) { s.already_processed++; continue; }
    } catch (e) {
      s.errors.push(`charge ${chargeId}: lookup threw: ${e instanceof Error ? e.message : String(e)}`);
    }

    // 4. Mark the lead paid (newest lead row for that email), or insert one.
    if (dbAvailable) {
      const paidFields = { is_paid: true, paid_at: paidAt, circle_charge_id: chargeId, amount_paid: c.amount, currency: c.currency, paywall_name: c.paywall_name ?? null };
      const { data: lead } = await supabaseAdmin
        .from('substack_challenge_leads').select('id').eq('email', email).order('created_at', { ascending: false }).limit(1).maybeSingle();
      if (lead?.id) {
        const { error } = await supabaseAdmin.from('substack_challenge_leads').update(paidFields).eq('id', lead.id);
        if (error) s.errors.push(`charge ${chargeId}: update failed: ${error.message}`); else s.marked_paid++;
      } else {
        const { error } = await supabaseAdmin.from('substack_challenge_leads')
          .insert({ email, name: c.community_member_name ?? null, tier, source: 'circle', created_at: paidAt, ...paidFields });
        if (error) s.errors.push(`charge ${chargeId}: insert failed: ${error.message}`); else s.inserted_leads++;
      }
    }

    // 5. Tag in Kit (idempotent on Kit's side).
    if (await addSubscriberWithTag(email, firstName, KIT_SUBSTACK_CHALLENGE_PAID_TAG)) s.kit_tagged++;
    else s.errors.push(`charge ${chargeId}: Kit tag not applied`);
  }

  return s;
}
