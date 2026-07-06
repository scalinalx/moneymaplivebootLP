// Ana AI Coach — upload validation. Extension + magic-byte sniffing (extension
// alone is trivially spoofed). Binary parsing is bounded by size caps upstream.

import { MAX_FILE_BYTES } from './config';

export type FileKind = 'txt' | 'md' | 'pdf' | 'docx';

export interface FileValidation {
  ok: boolean;
  kind?: FileKind;
  error?: string;
}

function extensionOf(name: string): string {
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : '';
}

// Valid UTF-8 check for text files (rejects binary masquerading as .txt).
function isProbablyUtf8Text(buf: Buffer): boolean {
  const slice = buf.subarray(0, 4096);
  // Reject NUL bytes (strong binary signal).
  if (slice.includes(0)) return false;
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(slice);
    return true;
  } catch {
    return false;
  }
}

export function validateFile(name: string, sizeBytes: number, buf: Buffer): FileValidation {
  if (sizeBytes > MAX_FILE_BYTES) {
    return { ok: false, error: `File too large (max ${Math.floor(MAX_FILE_BYTES / (1024 * 1024))}MB)` };
  }
  const ext = extensionOf(name);
  if (!['txt', 'md', 'pdf', 'docx'].includes(ext)) {
    return { ok: false, error: 'Only .txt, .md, .pdf, and .docx files are supported' };
  }

  if (ext === 'pdf') {
    // %PDF- magic.
    if (buf.subarray(0, 5).toString('latin1') !== '%PDF-') {
      return { ok: false, error: "That doesn't look like a real PDF" };
    }
    return { ok: true, kind: 'pdf' };
  }

  if (ext === 'docx') {
    // ZIP local file header PK\x03\x04 (docx is a zip).
    const sig = buf.subarray(0, 4);
    if (!(sig[0] === 0x50 && sig[1] === 0x4b && sig[2] === 0x03 && sig[3] === 0x04)) {
      return { ok: false, error: "That doesn't look like a real .docx" };
    }
    return { ok: true, kind: 'docx' };
  }

  // txt / md
  if (!isProbablyUtf8Text(buf)) {
    return { ok: false, error: 'That file is not readable text' };
  }
  return { ok: true, kind: ext === 'md' ? 'md' : 'txt' };
}
