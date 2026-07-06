// Shared analytics contract: the event-type allowlist, batch limits, and the
// server-side validation / sanitization used by /api/collect. Kept in one place
// so the ingestion endpoint and the later sessions-rollup agree on what a valid
// event looks like.
//
// Hard privacy rules enforced here (not just convention):
//   - Only event_types on the allowlist are accepted; everything else is dropped.
//   - Only whitelisted columns survive; unknown top-level fields are ignored.
//   - Any key literally named `value` is stripped recursively from `meta` — a
//     second line of defense so a form input value can never be persisted.

export const EVENT_TYPES = [
  'page_view',
  'engagement_heartbeat',
  'scroll_milestone',
  'section_view',
  'cta_click',
  'outbound_click',
  'form_start',
  'form_field_focus',
  'form_field_blur',
  'form_field_error',
  'form_submit_attempt',
  'form_submit_success',
  'form_abandon',
  'checkout_step',
  'page_exit',
  // Ana AI Coach (VIP) — counts/slugs only, never message content
  'coach_conversation_started',
  'coach_message_sent',
  'coach_panel_turn',
  'coach_file_uploaded',
  'coach_url_analyzed',
  'coach_limit_reached',
  'coach_product_recommended',
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

const EVENT_TYPE_SET = new Set<string>(EVENT_TYPES);

// Batch / payload guards.
export const MAX_EVENTS_PER_BATCH = 60;
export const MAX_BODY_BYTES = 64 * 1024; // 64 KB
const MAX_META_BYTES = 4 * 1024; // 4 KB serialized

// The shape we insert into analytics_events. Server-derived fields
// (device/browser/os/country, received_at) are added by the route, not here.
export interface CleanEvent {
  visitor_id: string;
  session_id: string;
  event_type: EventType;
  event_name: string | null;
  path: string | null;
  occurred_at: string | null; // ISO; null -> DB default NOW()
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
  ck_subscriber_id: string | null;
  sh_kit: string | null;
  scroll_pct: number | null;
  engaged_ms: number | null;
  cta_id: string | null;
  section_id: string | null;
  outbound_domain: string | null;
  form_id: string | null;
  field_name: string | null;
  meta: Record<string, unknown> | null;
}

function str(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t) return null;
  return t.length > max ? t.slice(0, max) : t;
}

function intInRange(v: unknown, min: number, max: number): number | null {
  const n = typeof v === 'number' ? v : typeof v === 'string' ? Number(v) : NaN;
  if (!Number.isFinite(n)) return null;
  const i = Math.round(n);
  if (i < min) return min;
  if (i > max) return max;
  return i;
}

// epoch-ms (or ISO string) -> ISO string, rejecting absurd timestamps.
function toIso(v: unknown): string | null {
  let ms: number | null = null;
  if (typeof v === 'number' && Number.isFinite(v)) ms = v;
  else if (typeof v === 'string') {
    const n = Number(v);
    if (Number.isFinite(n)) ms = n;
    else {
      const parsed = Date.parse(v);
      if (Number.isFinite(parsed)) ms = parsed;
    }
  }
  if (ms === null) return null;
  // Reject pre-2020 and >1 day in the future (clock-skew / garbage guard).
  const MIN = 1577836800000; // 2020-01-01
  const MAX = receivedNowMs() + 24 * 60 * 60 * 1000;
  if (ms < MIN || ms > MAX) return null;
  return new Date(ms).toISOString();
}

// Isolated so it's the only wall-clock read here (kept trivially testable).
function receivedNowMs(): number {
  return Date.now();
}

// Recursively remove any key named `value` from a plain object/array tree, and
// cap depth/size. Defense in depth: form input values must never be stored.
function scrubMeta(input: unknown, depth = 0): Record<string, unknown> | null {
  if (depth > 6 || input === null || typeof input !== 'object') return null;
  const walk = (node: unknown, d: number): unknown => {
    if (node === null || node === undefined) return node;
    if (Array.isArray(node)) return node.slice(0, 50).map((x) => walk(x, d + 1));
    if (typeof node === 'object') {
      if (d > 6) return undefined;
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
        if (k.toLowerCase() === 'value') continue; // strip input values, always
        const w = walk(v, d + 1);
        if (w !== undefined) out[k] = w;
      }
      return out;
    }
    if (typeof node === 'string') return node.length > 512 ? node.slice(0, 512) : node;
    if (typeof node === 'number' || typeof node === 'boolean') return node;
    return undefined; // drop functions/symbols/etc.
  };
  const cleaned = walk(input, depth) as Record<string, unknown>;
  if (!cleaned || Object.keys(cleaned).length === 0) return null;
  // Final size cap.
  try {
    const json = JSON.stringify(cleaned);
    if (json.length > MAX_META_BYTES) return null;
  } catch {
    return null;
  }
  return cleaned;
}

/**
 * Validate + sanitize one raw event from the client.
 * Returns a CleanEvent, or null if the event is unusable (missing ids or an
 * event_type that isn't on the allowlist). Unknown fields are dropped by virtue
 * of only reading known keys.
 */
export function sanitizeEvent(raw: unknown): CleanEvent | null {
  if (!raw || typeof raw !== 'object') return null;
  const e = raw as Record<string, unknown>;

  const event_type = typeof e.type === 'string' ? e.type : typeof e.event_type === 'string' ? e.event_type : '';
  if (!EVENT_TYPE_SET.has(event_type)) return null;

  const visitor_id = str(e.visitor_id ?? e.vid, 100);
  const session_id = str(e.session_id ?? e.sid, 100);
  if (!visitor_id || !session_id) return null;

  return {
    visitor_id,
    session_id,
    event_type: event_type as EventType,
    event_name: str(e.name ?? e.event_name, 128),
    path: str(e.path, 1024),
    occurred_at: toIso(e.ts ?? e.occurred_at),
    utm_source: str(e.utm_source, 256),
    utm_medium: str(e.utm_medium, 256),
    utm_campaign: str(e.utm_campaign, 256),
    utm_content: str(e.utm_content, 256),
    utm_term: str(e.utm_term, 256),
    referrer: str(e.referrer, 2048),
    ck_subscriber_id: str(e.ck_subscriber_id, 128),
    sh_kit: str(e.sh_kit, 128),
    scroll_pct: intInRange(e.scroll_pct, 0, 100),
    engaged_ms: intInRange(e.engaged_ms, 0, 24 * 60 * 60 * 1000),
    cta_id: str(e.cta_id, 256),
    section_id: str(e.section_id, 256),
    outbound_domain: str(e.outbound_domain, 256),
    form_id: str(e.form_id, 256),
    field_name: str(e.field_name, 256),
    meta: scrubMeta(e.meta),
  };
}

// Minimal, dependency-free user-agent parsing. We only need coarse buckets for
// the dashboard (mobile vs desktop, rough browser/OS) — not exhaustive accuracy.
// The raw UA is parsed here and then discarded by the caller; it is never stored.
export function parseUserAgent(ua: string | null): {
  device: string | null;
  browser: string | null;
  os: string | null;
} {
  if (!ua) return { device: null, browser: null, os: null };
  const s = ua.toLowerCase();

  const isBot = /bot|crawler|spider|crawling|facebookexternalhit|preview|headless|lighthouse/.test(s);
  const isTablet = /ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(s);
  const isMobile = /mobi|iphone|ipod|android.*mobile|windows phone|blackberry|bb10|opera mini/.test(s);
  const device = isBot ? 'bot' : isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

  let browser: string | null = null;
  if (s.includes('edg/') || s.includes('edge')) browser = 'Edge';
  else if (s.includes('opr/') || s.includes('opera')) browser = 'Opera';
  else if (s.includes('chrome') && !s.includes('chromium')) browser = 'Chrome';
  else if (s.includes('firefox')) browser = 'Firefox';
  else if (s.includes('safari') && !s.includes('chrome')) browser = 'Safari';
  else if (s.includes('chromium')) browser = 'Chromium';

  let os: string | null = null;
  if (/iphone|ipad|ipod|ios/.test(s)) os = 'iOS';
  else if (s.includes('mac os')) os = 'macOS';
  else if (s.includes('android')) os = 'Android';
  else if (s.includes('windows')) os = 'Windows';
  else if (s.includes('linux')) os = 'Linux';
  else if (s.includes('cros')) os = 'ChromeOS';

  return { device, browser, os };
}
