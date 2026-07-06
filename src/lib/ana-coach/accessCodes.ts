// Ana AI Coach — per-member access codes.
//
// Codes look like ANA-XXXX-XXXX-XXXX (12 chars from an unambiguous 32-symbol
// alphabet = 60 bits of entropy). Only the SHA-256 hash of the normalized code
// is ever stored; the plaintext is returned once at creation and never persisted.

import { createHash, randomInt } from 'node:crypto';

// 32 symbols, no 0/O/1/I/L to avoid transcription errors.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const GROUPS = 3;
const GROUP_LEN = 4;

export function generateCode(): string {
  const groups: string[] = [];
  for (let g = 0; g < GROUPS; g++) {
    let chunk = '';
    for (let i = 0; i < GROUP_LEN; i++) {
      chunk += ALPHABET[randomInt(ALPHABET.length)];
    }
    groups.push(chunk);
  }
  return `ANA-${groups.join('-')}`;
}

// Uppercase, strip the ANA- prefix, and drop all non-alphabet chars (dashes,
// spaces). This makes hashing insensitive to how the member typed the code.
export function normalizeCode(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/^ANA-?/, '')
    .split('')
    .filter((ch) => ALPHABET.includes(ch))
    .join('');
}

export function hashCode(raw: string): string {
  return createHash('sha256').update(normalizeCode(raw)).digest('hex');
}

// A normalized code must be exactly GROUPS*GROUP_LEN alphabet chars.
export function isPlausibleCode(raw: string): boolean {
  return normalizeCode(raw).length === GROUPS * GROUP_LEN;
}
