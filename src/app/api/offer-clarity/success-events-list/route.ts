import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function verifyAuth(req: NextRequest) {
  const auth = req.headers.get('authorization') || '';
  const token = auth.replace('Bearer ', '');
  return token === process.env.ADMIDASH_PASSWORD;
}

interface SuccessEvent {
  id: number;
  created_at: string;
  lead_id: string | null;
  session_id: string;
  event_type: string;
  event_data: Record<string, unknown> | null;
  user_agent: string | null;
  ip_address: string | null;
  referrer: string | null;
  viewport_w: number | null;
  viewport_h: number | null;
}

interface OfferClarityLead {
  id: string;
  email: string;
  name: string | null;
  has_bump_launch_stack: boolean | null;
  has_bump_hooks: boolean | null;
  has_bump_offer_genius: boolean | null;
  has_bump_bundle: boolean | null;
  has_coaching_upsell: boolean | null;
  is_paid: boolean | null;
  total_paid_cents: number | null;
}

export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get('limit') || '500'), 2000);
    const leadId = searchParams.get('leadId');
    const sessionId = searchParams.get('sessionId');

    let query = supabaseAdmin
      .from('offer_clarity_success_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (leadId) query = query.eq('lead_id', leadId);
    if (sessionId) query = query.eq('session_id', sessionId);

    const { data: events, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const list = (events ?? []) as SuccessEvent[];

    // Pull the relevant leads in one batch so we can label sessions with the
    // buyer's email + the actual bump flags from the DB.
    const leadIds = Array.from(
      new Set(list.map((e) => e.lead_id).filter((id): id is string => Boolean(id))),
    );
    let leadsMap: Record<string, OfferClarityLead> = {};
    if (leadIds.length) {
      const { data: leads } = await supabaseAdmin
        .from('offer_clarity_leads')
        .select(
          'id, email, name, has_bump_launch_stack, has_bump_hooks, has_bump_offer_genius, has_bump_bundle, has_coaching_upsell, is_paid, total_paid_cents',
        )
        .in('id', leadIds);
      leadsMap = Object.fromEntries((leads ?? []).map((l) => [l.id, l as OfferClarityLead]));
    }

    // Group by session for an at-a-glance journey view.
    const bySession: Record<
      string,
      { sessionId: string; leadId: string | null; events: SuccessEvent[] }
    > = {};
    for (const e of list) {
      const key = e.session_id;
      if (!bySession[key]) {
        bySession[key] = { sessionId: key, leadId: e.lead_id, events: [] };
      }
      bySession[key].events.push(e);
      if (!bySession[key].leadId && e.lead_id) bySession[key].leadId = e.lead_id;
    }
    const sessions = Object.values(bySession).sort(
      (a, b) =>
        new Date(b.events[0].created_at).getTime() -
        new Date(a.events[0].created_at).getTime(),
    );

    return NextResponse.json({
      success: true,
      count: list.length,
      sessions,
      leads: leadsMap,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'unknown' },
      { status: 500 },
    );
  }
}
