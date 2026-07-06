// Ana AI Coach — SSE event protocol (shared by the message route and the client).

import type { SpecialistId, SessionPhase } from './types';

export type CoachEvent =
  | { type: 'status'; stage: 'triage' }
  | { type: 'status'; stage: 'panel'; specialists: SpecialistId[] }
  | { type: 'status'; stage: 'specialist_done'; specialist: SpecialistId; ms: number }
  | { type: 'status'; stage: 'synthesis' }
  | { type: 'delta'; text: string }
  | { type: 'done'; message_count: number; message_limit: number; session_phase: SessionPhase }
  | { type: 'error'; code: string; message?: string };

// Serialize one event as an SSE `data:` line.
export function sseLine(event: CoachEvent): string {
  return `data:${JSON.stringify(event)}\n\n`;
}

// Keepalive comment (ignored by EventSource/readers, keeps the connection warm).
export const SSE_PING = ': ping\n\n';
