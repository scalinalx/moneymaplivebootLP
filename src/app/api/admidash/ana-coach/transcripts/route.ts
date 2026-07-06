import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdmin } from '@/lib/ana-coach/authGuard';

// Transcript + panel-trace review for Ana. Bearer ADMIDASH_PASSWORD.
//   GET ?memberId=X       -> that member's conversations (list)
//   GET ?conversationId=Y -> one conversation's messages + turn traces
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const memberId = searchParams.get('memberId');
  const conversationId = searchParams.get('conversationId');

  try {
    if (memberId) {
      const { data, error } = await supabaseAdmin
        .from('ana_coach_conversations')
        .select('id, status, session_phase, message_count, created_at, ended_at')
        .eq('member_id', memberId)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return NextResponse.json({ conversations: data ?? [] });
    }

    if (conversationId) {
      const [{ data: messages }, { data: traces }] = await Promise.all([
        supabaseAdmin
          .from('ana_coach_messages')
          .select('id, role, content, created_at')
          .eq('conversation_id', conversationId)
          .order('id', { ascending: true }),
        supabaseAdmin
          .from('ana_coach_turn_traces')
          .select('turn_index, phase_before, phase_after, triage, specialists, synthesis, total_ms')
          .eq('conversation_id', conversationId)
          .order('turn_index', { ascending: true }),
      ]);
      return NextResponse.json({ messages: messages ?? [], traces: traces ?? [] });
    }

    return NextResponse.json({ error: 'Provide memberId or conversationId' }, { status: 400 });
  } catch (e) {
    console.error('[ana-coach] transcripts error:', e);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
