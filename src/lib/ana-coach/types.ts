// Ana AI Coach — shared domain types (server + client).

export type SessionPhase = 'INTAKE' | 'DIAGNOSIS' | 'COACHING' | 'WRAP_UP' | 'CLOSED';

export type SpecialistId = 'strategy_coach' | 'copy_critic' | 'growth_auditor' | 'product_matcher';

export type AttachmentKind = 'file' | 'url';

export interface MemberProfile {
  substack_url?: string | null;
  subscriber_count?: number | null;
  paid_subscriber_count?: number | null;
  niche?: string | null;
  revenue_monthly_usd?: number | null;
  goal?: string | null;          // ideal state — should be specific + measurable + time-bound
  blockers?: string[];           // current bottlenecks in the way
  constraints?: string[];        // limitations: time/week, budget, skills, etc.
  products_owned?: string[];
}

export interface CoachMember {
  id: string;
  member_name: string;
  member_email: string | null;
  status: 'active' | 'revoked';
  profile: MemberProfile;
}

export interface Conversation {
  id: string;
  member_id: string;
  status: 'active' | 'ended';
  session_phase: SessionPhase;
  member_profile: MemberProfile;
  message_count: number;
  message_limit: number;
}

export interface StoredMessage {
  id: number;
  role: 'user' | 'model';
  content: string;
}

export interface Attachment {
  id: string;
  conversation_id: string;
  kind: AttachmentKind;
  name: string;
  mime: string | null;
  char_count: number;
  truncated: boolean;
  extracted_text: string;
}

// Quota reservation result mirrors the ana_coach_consume_message RPC.
export type ConsumeReason = 'ok' | 'not_active' | 'busy' | 'conversation_cap' | 'daily_cap';
export interface ConsumeResult {
  ok: boolean;
  reason: ConsumeReason;
  new_count: number;
}
