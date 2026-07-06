// Ana AI Coach — Supabase data access (service-role only).
//
// All reads/writes go through supabaseAdmin. Quota-sensitive mutations use the
// atomic RPCs from the migration (no read-then-write races).

import { supabaseAdmin } from '@/lib/supabase';
import {
  IN_FLIGHT_STALE_SECS,
  MAX_MESSAGES_PER_DAY,
  MESSAGE_LIMIT,
} from './config';
import type {
  Attachment,
  ConsumeResult,
  Conversation,
  CoachMember,
  MemberProfile,
  SessionPhase,
  StoredMessage,
} from './types';

type DailyKind = 'conversations' | 'file_uploads' | 'url_fetches';

export async function getMemberById(id: string): Promise<CoachMember | null> {
  const { data, error } = await supabaseAdmin
    .from('ana_coach_members')
    .select('id, member_name, member_email, status, profile')
    .eq('id', id)
    .maybeSingle();
  if (error || !data) return null;
  return data as CoachMember;
}

export async function getMemberByCodeHash(codeHash: string): Promise<CoachMember | null> {
  const { data, error } = await supabaseAdmin
    .from('ana_coach_members')
    .select('id, member_name, member_email, status, profile')
    .eq('code_hash', codeHash)
    .maybeSingle();
  if (error || !data) return null;
  return data as CoachMember;
}

export async function touchMemberLastUsed(id: string): Promise<void> {
  await supabaseAdmin
    .from('ana_coach_members')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', id);
}

export async function getActiveConversation(memberId: string): Promise<Conversation | null> {
  const { data, error } = await supabaseAdmin
    .from('ana_coach_conversations')
    .select('id, member_id, status, session_phase, member_profile, message_count, message_limit')
    .eq('member_id', memberId)
    .eq('status', 'active')
    .maybeSingle();
  if (error || !data) return null;
  return data as Conversation;
}

export async function getConversation(id: string, memberId: string): Promise<Conversation | null> {
  const { data, error } = await supabaseAdmin
    .from('ana_coach_conversations')
    .select('id, member_id, status, session_phase, member_profile, message_count, message_limit')
    .eq('id', id)
    .eq('member_id', memberId)
    .maybeSingle();
  if (error || !data) return null;
  return data as Conversation;
}

// Ends any active conversation for the member, then starts a fresh one with an
// EMPTY profile. Per spec, "starting a new one resets all context and data" — a
// new session is a true clean slate; nothing from prior sessions carries over.
// Resilient to concurrent starts (double-click / two tabs / refresh timing): the
// one-active-per-member unique index can reject the insert if another start
// raced ahead, so we end-all-active and retry once on that conflict.
export async function startConversation(memberId: string): Promise<Conversation> {
  for (let attempt = 0; attempt < 2; attempt++) {
    await endActiveConversation(memberId);
    const { data, error } = await supabaseAdmin
      .from('ana_coach_conversations')
      .insert({
        member_id: memberId,
        status: 'active',
        session_phase: 'INTAKE',
        member_profile: {},
        message_count: 0,
        message_limit: MESSAGE_LIMIT,
      })
      .select('id, member_id, status, session_phase, member_profile, message_count, message_limit')
      .single();
    if (!error && data) return data as Conversation;
    // 23505 = unique_violation on the one-active index → a concurrent start won;
    // loop to end that active row and try again.
    if (error?.code === '23505' && attempt === 0) continue;
    throw new Error(`[ana-coach] failed to start conversation: ${error?.message}`);
  }
  throw new Error('[ana-coach] failed to start conversation after retry');
}

export async function endActiveConversation(memberId: string): Promise<void> {
  // No profile carry-over: a new session starts clean (see startConversation).
  // End ALL active rows for the member (not just one) so a
  // concurrent start can't leave two actives and trip the unique index.
  await supabaseAdmin
    .from('ana_coach_conversations')
    .update({ status: 'ended', ended_at: new Date().toISOString() })
    .eq('member_id', memberId)
    .eq('status', 'active');
}

export async function loadHistory(conversationId: string): Promise<StoredMessage[]> {
  const { data, error } = await supabaseAdmin
    .from('ana_coach_messages')
    .select('id, role, content')
    .eq('conversation_id', conversationId)
    .order('id', { ascending: true });
  if (error || !data) return [];
  return data as StoredMessage[];
}

export async function insertMessage(
  conversationId: string,
  role: 'user' | 'model',
  content: string,
): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from('ana_coach_messages')
    .insert({ conversation_id: conversationId, role, content })
    .select('id')
    .single();
  if (error || !data) throw new Error(`[ana-coach] failed to insert message: ${error?.message}`);
  return data.id as number;
}

export async function deleteMessage(id: number): Promise<void> {
  await supabaseAdmin.from('ana_coach_messages').delete().eq('id', id);
}

export async function getPendingAttachments(conversationId: string): Promise<Attachment[]> {
  const { data, error } = await supabaseAdmin
    .from('ana_coach_attachments')
    .select('id, conversation_id, kind, name, mime, char_count, truncated, extracted_text')
    .eq('conversation_id', conversationId)
    .is('consumed_by_message_id', null)
    .order('created_at', { ascending: true });
  if (error || !data) return [];
  return data as Attachment[];
}

export async function insertAttachment(
  conversationId: string,
  fields: {
    kind: 'file' | 'url';
    name: string;
    mime: string | null;
    char_count: number;
    truncated: boolean;
    extracted_text: string;
  },
): Promise<string> {
  const { data, error } = await supabaseAdmin
    .from('ana_coach_attachments')
    .insert({ conversation_id: conversationId, ...fields })
    .select('id')
    .single();
  if (error || !data) throw new Error(`[ana-coach] failed to insert attachment: ${error?.message}`);
  return data.id as string;
}

export async function markAttachmentsConsumed(ids: string[], messageId: number): Promise<void> {
  if (ids.length === 0) return;
  await supabaseAdmin
    .from('ana_coach_attachments')
    .update({ consumed_by_message_id: messageId })
    .in('id', ids);
}

export async function updateConversationState(
  conversationId: string,
  phase: SessionPhase,
  profile: MemberProfile,
): Promise<void> {
  await supabaseAdmin
    .from('ana_coach_conversations')
    .update({ session_phase: phase, member_profile: profile })
    .eq('id', conversationId);
}

// --- Atomic quota RPCs ---------------------------------------------------

export async function consumeMessage(conversationId: string, memberId: string): Promise<ConsumeResult> {
  const { data, error } = await supabaseAdmin.rpc('ana_coach_consume_message', {
    p_conversation: conversationId,
    p_member: memberId,
    p_max_messages_per_day: MAX_MESSAGES_PER_DAY,
    p_lock_stale_secs: IN_FLIGHT_STALE_SECS,
  });
  if (error) throw new Error(`[ana-coach] consume_message failed: ${error.message}`);
  // RPC returns a single-row table.
  const row = Array.isArray(data) ? data[0] : data;
  return { ok: !!row?.ok, reason: row?.reason ?? 'not_active', new_count: row?.new_count ?? 0 };
}

export async function releaseLock(conversationId: string): Promise<void> {
  await supabaseAdmin.rpc('ana_coach_release_lock', { p_conversation: conversationId });
}

export async function refundMessage(conversationId: string, memberId: string): Promise<void> {
  await supabaseAdmin.rpc('ana_coach_refund_message', {
    p_conversation: conversationId,
    p_member: memberId,
  });
}

// Atomically add a turn's token usage to the member's lifetime counters.
// Non-critical: token accounting must NEVER break a coaching turn, and it must
// tolerate the counter migration not being applied yet — so errors are swallowed.
export async function addTokenUsage(memberId: string, tokensIn: number, tokensOut: number): Promise<void> {
  if (tokensIn <= 0 && tokensOut <= 0) return;
  try {
    const { error } = await supabaseAdmin.rpc('ana_coach_add_tokens', {
      p_member: memberId,
      p_in: Math.max(0, Math.round(tokensIn)),
      p_out: Math.max(0, Math.round(tokensOut)),
    });
    if (error) console.warn('[ana-coach] token counter skipped (migration applied?):', error.message);
  } catch (err) {
    console.warn('[ana-coach] token counter error (non-fatal):', err instanceof Error ? err.message : err);
  }
}

export async function bumpDaily(memberId: string, kind: DailyKind, max: number): Promise<boolean> {
  const { data, error } = await supabaseAdmin.rpc('ana_coach_bump_daily', {
    p_member: memberId,
    p_kind: kind,
    p_max: max,
  });
  if (error) throw new Error(`[ana-coach] bump_daily failed: ${error.message}`);
  return data === true;
}

export async function insertTurnTrace(trace: {
  conversation_id: string;
  message_id: number | null;
  turn_index: number;
  phase_before: string;
  phase_after: string;
  triage: unknown;
  specialists: unknown;
  synthesis: unknown;
  total_ms: number;
  model: string;
}): Promise<void> {
  await supabaseAdmin.from('ana_coach_turn_traces').insert(trace);
}
