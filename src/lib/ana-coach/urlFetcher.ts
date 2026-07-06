// Ana AI Coach — SSRF-safe URL fetcher.
//
// Only user-submitted URLs are ever fetched (never model-initiated, never
// auto-followed from page content). Validates scheme/port/credentials, blocks
// private ranges via a connect-time safe lookup (undici Agent), handles redirects
// manually with per-hop re-validation, caps download size + time, and extracts
// readable text with html-to-text (no jsdom).

import { Agent, fetch as undiciFetch } from 'undici';
import { htmlToText } from 'html-to-text';
import { isForbiddenAddress, isForbiddenHostname, safeLookup } from './ssrf';
import {
  URL_FETCH_TIMEOUT_MS,
  URL_MAX_DOWNLOAD_BYTES,
  URL_MAX_REDIRECTS,
  MAX_URL_TEXT_CHARS,
} from './config';

const ALLOWED_CONTENT_TYPES = ['text/html', 'application/xhtml+xml', 'text/plain', 'text/markdown'];

// Shared agent whose connect-time lookup validates every resolved address.
const safeAgent = new Agent({
  connect: {
    // safeLookup honors both the single-address and all-addresses callback
    // shapes; the cast bridges our signature to undici's LookupFunction type.
    lookup: safeLookup as never,
  },
});

export interface FetchResult {
  ok: boolean;
  finalUrl?: string;
  text?: string;
  truncated?: boolean;
  error?: string;
}

// Static validation of a single URL (per hop). Returns an error string or null.
function validateUrl(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return 'Invalid URL';
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return 'Only http/https URLs are allowed';
  if (u.username || u.password) return 'Credentials in URL are not allowed';
  if (u.port && u.port !== '80' && u.port !== '443') return 'Only ports 80 and 443 are allowed';
  const host = u.hostname.replace(/^\[|\]$/g, ''); // strip IPv6 brackets
  if (isForbiddenHostname(host)) return 'That host is not allowed';
  // If the host is a literal IP, block reserved ranges up front (DNS check still
  // runs at connect for hostnames).
  if (/^[0-9.]+$/.test(host) || host.includes(':')) {
    if (isForbiddenAddress(host)) return 'That address is not allowed';
  }
  return null;
}

export async function fetchUserSubmittedUrl(raw: string): Promise<FetchResult> {
  let current = raw.trim();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), URL_FETCH_TIMEOUT_MS);

  try {
    for (let hop = 0; hop <= URL_MAX_REDIRECTS; hop++) {
      const err = validateUrl(current);
      if (err) return { ok: false, error: err };

      let res;
      try {
        res = await undiciFetch(current, {
          method: 'GET',
          redirect: 'manual',
          signal: controller.signal,
          dispatcher: safeAgent,
          headers: {
            'user-agent': 'AnaCoachBot/1.0 (+https://monetisesubstack.com)',
            accept: 'text/html,application/xhtml+xml,text/plain,text/markdown',
          },
        });
      } catch {
        return { ok: false, error: 'Could not reach that link' };
      }

      // Manual redirect handling with per-hop re-validation.
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get('location');
        if (!loc) return { ok: false, error: 'Broken redirect' };
        current = new URL(loc, current).toString();
        continue;
      }

      if (!res.ok) return { ok: false, error: `The link returned status ${res.status}` };

      const ctype = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
      if (!ALLOWED_CONTENT_TYPES.includes(ctype)) {
        return { ok: false, error: 'That link is not a readable web page' };
      }

      // Stream the body, aborting if it exceeds the size cap.
      const reader = res.body?.getReader();
      if (!reader) return { ok: false, error: 'Empty response' };
      const chunks: Uint8Array[] = [];
      let total = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          total += value.length;
          if (total > URL_MAX_DOWNLOAD_BYTES) {
            controller.abort();
            return { ok: false, error: 'That page is too large to analyse' };
          }
          chunks.push(value);
        }
      }
      const raw = Buffer.concat(chunks).toString('utf8');

      const extracted = ctype.includes('html')
        ? htmlToText(raw, {
            wordwrap: false,
            selectors: [
              { selector: 'script', format: 'skip' },
              { selector: 'style', format: 'skip' },
              { selector: 'nav', format: 'skip' },
              { selector: 'a', options: { ignoreHref: true } },
              { selector: 'img', format: 'skip' },
            ],
          })
        : raw;

      const truncated = extracted.length > MAX_URL_TEXT_CHARS;
      return {
        ok: true,
        finalUrl: current,
        text: extracted.slice(0, MAX_URL_TEXT_CHARS),
        truncated,
      };
    }
    return { ok: false, error: 'Too many redirects' };
  } finally {
    clearTimeout(timer);
  }
}
