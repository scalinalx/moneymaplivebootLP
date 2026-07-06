// Ana AI Coach — quota reason → HTTP status mapping.

import type { ConsumeReason } from './types';

export interface QuotaError {
  status: number;
  code: string;
  message: string;
}

export function consumeReasonToError(reason: ConsumeReason): QuotaError {
  switch (reason) {
    case 'busy':
      return { status: 409, code: 'busy', message: 'A previous message is still being processed.' };
    case 'conversation_cap':
      return {
        status: 409,
        code: 'conversation_cap',
        message: 'This session has reached its message limit. Start a new session to continue.',
      };
    case 'daily_cap':
      return {
        status: 429,
        code: 'daily_cap',
        message: "You've reached today's coaching limit. Come back tomorrow.",
      };
    case 'not_active':
    default:
      return { status: 404, code: 'not_active', message: 'No active session found.' };
  }
}
