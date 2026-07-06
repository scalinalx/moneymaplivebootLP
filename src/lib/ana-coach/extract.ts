// Ana AI Coach — text extraction from uploaded files.
//
// txt/md decode directly; pdf via unpdf (pdf.js under the hood — no pdf-parse CVE
// surface); docx via mammoth (raw text). Output is char-capped by the caller's
// MAX_FILE_TEXT_CHARS. Scanned/image-only PDFs yield empty text → the route
// returns a clear 422.

import { extractText as pdfExtractText, getDocumentProxy } from 'unpdf';
import mammoth from 'mammoth';
import { MAX_FILE_TEXT_CHARS } from './config';
import type { FileKind } from './fileValidation';

export interface Extracted {
  text: string;
  truncated: boolean;
}

// Strip C0 control chars except tab/newline/carriage-return.
function clean(s: string): string {
  let out = '';
  for (const ch of s) {
    const c = ch.codePointAt(0)!;
    if (c < 0x20 && c !== 0x09 && c !== 0x0a && c !== 0x0d) continue;
    if (c === 0x7f) continue;
    out += ch;
  }
  return out;
}

function cap(text: string): Extracted {
  const cleaned = clean(text).trim();
  return { text: cleaned.slice(0, MAX_FILE_TEXT_CHARS), truncated: cleaned.length > MAX_FILE_TEXT_CHARS };
}

export async function extractFileText(kind: FileKind, buf: Buffer): Promise<Extracted> {
  if (kind === 'txt' || kind === 'md') {
    return cap(buf.toString('utf8'));
  }
  if (kind === 'pdf') {
    const pdf = await getDocumentProxy(new Uint8Array(buf));
    const { text } = await pdfExtractText(pdf, { mergePages: true });
    return cap(Array.isArray(text) ? text.join('\n') : text);
  }
  // docx
  const { value } = await mammoth.extractRawText({ buffer: buf });
  return cap(value);
}
