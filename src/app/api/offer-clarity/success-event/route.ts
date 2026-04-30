import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Whitelist so we can't accidentally pollute the table from typos/random clients.
const ALLOWED_EVENT_TYPES = new Set([
  'page_loaded',
  'lead_fetch_started',
  'lead_fetch_success',
  'lead_fetch_failed',
  'lead_missing',
  'render_snapshot',
  'password_revealed',
  'password_copied',
  'link_clicked',
  'coaching_card_shown',
  'error_caught',
  'time_on_page',
]);

interface IncomingEvent {
  leadId?: string | null;
  sessionId: string;
  eventType: string;
  eventData?: Record<string, unknown>;
  viewportW?: number;
  viewportH?: number;
}

export async function POST(request: NextRequest) {
  try {
    let body: IncomingEvent;
    try {
      body = (await request.json()) as IncomingEvent;
    } catch {
      return NextResponse.json({ success: false, error: 'invalid json' }, { status: 400 });
    }

    const { leadId, sessionId, eventType, eventData, viewportW, viewportH } = body;

    if (!sessionId || !eventType) {
      return NextResponse.json(
        { success: false, error: 'sessionId and eventType required' },
        { status: 400 },
      );
    }
    if (!ALLOWED_EVENT_TYPES.has(eventType)) {
      return NextResponse.json(
        { success: false, error: `unknown event_type: ${eventType}` },
        { status: 400 },
      );
    }

    const userAgent = request.headers.get('user-agent') ?? null;
    const referrer = request.headers.get('referer') ?? null;
    // Trust the standard forwarded-for chain when present; fall back to remote
    // address. Keeps it readable for debugging without going overboard.
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      null;

    const insertPayload = {
      lead_id: leadId && leadId.length > 0 && leadId !== 'TEST-LEAD-ID' ? leadId : null,
      session_id: sessionId,
      event_type: eventType,
      event_data: eventData ?? null,
      user_agent: userAgent,
      ip_address: ip,
      referrer,
      viewport_w: typeof viewportW === 'number' ? viewportW : null,
      viewport_h: typeof viewportH === 'number' ? viewportH : null,
    };

    const { error } = await supabaseAdmin
      .from('offer_clarity_success_events')
      .insert(insertPayload);

    if (error) {
      // Don't 500 the client — they might be in the unload phase, and a failure
      // here shouldn't break the success page UX. Just log.
      console.error('[offer-clarity/success-event] insert failed', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 200 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[offer-clarity/success-event] handler crashed', e);
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : 'unknown' },
      { status: 200 },
    );
  }
}
