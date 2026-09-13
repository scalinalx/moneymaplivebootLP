import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { validateEmail, validateName } from '@/utils/validation';

const TIERS = new Set(['challenge', 'challenge_1on1']);

// Records a 30-Day Substack Challenge lead (name + email + which pricing card
// they clicked) right before the client redirects them to the Circle checkout.
// There is no Stripe step here, so this is the only server-side record of the
// visitor. The insert is best-effort: if the substack_challenge_leads table
// isn't there yet (migration not applied) we log loudly but still return
// success, because a missing table must never block someone from paying.
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
    const { data, error, status } = await supabaseAdmin
      .from('substack_challenge_leads')
      .insert({ name, email, tier, created_at: new Date().toISOString() })
      .select('id')
      .single();

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
