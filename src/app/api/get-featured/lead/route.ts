import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { validateEmail, validateName } from '@/utils/validation';
import { addSubscriberWithTag, KIT_GET_FEATURED_TAG } from '@/lib/kit';

const WANTS = new Set([
  'Forbes or a business magazine',
  'A national newspaper',
  'A trade publication',
  'A podcast',
  "Someone else's newsletter",
  'Not sure yet',
]);
const PLACEMENTS = new Set(['top', 'bottom']);

// Get Featured waitlist signup. Records the lead in get_featured_leads and
// subscribes + tags them in Kit (KIT_GET_FEATURED_TAG), in parallel and both
// best-effort: a missing table (migration not applied) or a Kit hiccup is
// logged, and the visitor still sees "You're on the list".
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const wants = WANTS.has(body?.wants) ? (body.wants as string) : null;
    const placement = PLACEMENTS.has(body?.placement) ? (body.placement as string) : null;

    if (!email || !name) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address' }, { status: 400 });
    }
    if (!validateName(name)) {
      return NextResponse.json({ success: false, error: 'Name must be at least 2 characters' }, { status: 400 });
    }

    const firstName = name.split(/\s+/)[0];
    const [{ data, error, status }, kitTagged] = await Promise.all([
      supabaseAdmin
        .from('get_featured_leads')
        .insert({ name, email, wants, placement, created_at: new Date().toISOString() })
        .select('id')
        .single(),
      addSubscriberWithTag(email, firstName, KIT_GET_FEATURED_TAG),
    ]);
    if (error) console.error(`[get-featured] lead insert failed (migration applied?): HTTP ${status}`, error.message || JSON.stringify(error));
    if (!kitTagged) console.warn('[get-featured] Kit tag not applied for', email);

    return NextResponse.json({ success: true, data: { id: data?.id ?? null, email, name } });
  } catch (error) {
    console.error('[get-featured] lead API error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
