import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdmin } from '@/lib/ana-coach/authGuard';

// Transcript export for Ana. Bearer ADMIDASH_PASSWORD.
//   GET ?memberId=X            -> one member only (omit = all members)
//   GET ?days=1|3|5|7          -> conversations started in the last N days
//   GET ?startDate=&endDate=   -> ISO date range (YYYY-MM-DD), inclusive
// Returns a structured JSON bundle of conversations + their messages.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const memberId = searchParams.get('memberId') || undefined;
  const days = searchParams.get('days');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  try {
    let q = supabaseAdmin
      .from('ana_coach_conversations')
      .select('id, member_id, session_phase, status, message_count, created_at, ended_at')
      .order('created_at', { ascending: true });

    if (memberId) q = q.eq('member_id', memberId);
    if (days && /^\d+$/.test(days)) {
      q = q.gte('created_at', new Date(Date.now() - Number(days) * 86_400_000).toISOString());
    } else {
      if (startDate) q = q.gte('created_at', `${startDate}T00:00:00.000Z`);
      if (endDate) q = q.lte('created_at', `${endDate}T23:59:59.999Z`);
    }

    const { data: convs, error } = await q;
    if (error) throw error;

    // Member name/email lookup.
    const { data: members } = await supabaseAdmin
      .from('ana_coach_members')
      .select('id, member_name, member_email');
    const nameMap = new Map((members ?? []).map((m) => [m.id, { name: m.member_name, email: m.member_email }]));

    const convIds = (convs ?? []).map((c) => c.id);
    let messages: { conversation_id: string; role: string; content: string; created_at: string }[] = [];
    if (convIds.length > 0) {
      const { data: msgs } = await supabaseAdmin
        .from('ana_coach_messages')
        .select('conversation_id, role, content, created_at')
        .in('conversation_id', convIds)
        .order('id', { ascending: true });
      messages = msgs ?? [];
    }
    const byConv = new Map<string, typeof messages>();
    for (const m of messages) {
      const arr = byConv.get(m.conversation_id) ?? [];
      arr.push(m);
      byConv.set(m.conversation_id, arr);
    }

    const conversations = (convs ?? []).map((c) => {
      const who = nameMap.get(c.member_id);
      return {
        conversation_id: c.id,
        member_id: c.member_id,
        member_name: who?.name ?? '(unknown)',
        member_email: who?.email ?? null,
        session_phase: c.session_phase,
        status: c.status,
        message_count: c.message_count,
        created_at: c.created_at,
        ended_at: c.ended_at,
        messages: (byConv.get(c.id) ?? []).map((m) => ({
          role: m.role,
          content: m.content,
          at: m.created_at,
        })),
      };
    });

    return NextResponse.json({
      exported_at: new Date().toISOString(),
      filter: { memberId: memberId ?? 'all', days: days ?? null, startDate: startDate ?? null, endDate: endDate ?? null },
      conversation_count: conversations.length,
      message_count: messages.length,
      conversations,
    });
  } catch (e) {
    console.error('[ana-coach] export error:', e);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
