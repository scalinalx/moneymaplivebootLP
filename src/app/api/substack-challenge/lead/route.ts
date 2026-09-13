import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { validateEmail, validateName } from '@/utils/validation';
import { addSubscriberWithTag, KIT_SUBSTACK_CHALLENGE_LEAD_TAG } from '@/lib/kit';

const TIERS = new Set(['challenge', 'challenge_1on1']);

// Records a 30-Day Substack Challenge lead (name + email + which pricing card
// they clicked) right before the client redirects them to the Circle checkout.
// There is no Stripe step here, so this is the only server-side record of the
// visitor. Two things happen in parallel, both best-effort so neither can
// block someone from paying:
//   1. insert into substack_challenge_leads (logs loudly if the table is
//      missing — migration not applied — but still returns success);
//   2. subscribe + tag the lead in Kit (KIT_SUBSTACK_CHALLENGE_LEAD_TAG), which
//      starts the abandoned-cart / recovery sequences. Buyers are removed from
//      those sequences by the Circle → Kit "paid" tag, set up outside this app.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const tier = TIERS.has(body?.tier) ? (body.tier as string) : 'challenge';

    if (!email || !name) {
      return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address' }, { status: 400 });
    }
    if (!validateName(name)) {
      return NextResponse.json({ success: false, error: 'Name must be at least 2 characters' }, { status: 400 });
    }

    let leadId: string | null = null;
    const firstName = name.split(/\s+/)[0];
    const [{ data, error, status }, kitTagged] = await Promise.all([
      supabaseAdmin
        .from('substack_challenge_leads')
        .insert({ name, email, tier, created_at: new Date().toISOString() })
        .select('id')
        .single(),
      addSubscriberWithTag(email, firstName, KIT_SUBSTACK_CHALLENGE_LEAD_TAG),
    ]);
    if (!kitTagged) console.warn('[substack-challenge] Kit lead tag not applied for', email);

    if (error) {
      console.error(`[substack-challenge] lead insert failed (migration applied?): HTTP ${status}`, error.message || JSON.stringify(error));
    } else {
      leadId = data?.id ?? null;
    }

    return NextResponse.json({ success: true, data: { id: leadId, email, name, tier } });
  } catch (error) {
    console.error('[substack-challenge] lead API error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
