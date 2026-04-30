// Lightweight telemetry helper for the /offer-clarity-success page.
// Posts events to /api/offer-clarity/success-event so we can debug
// "I paid but couldn't see the bumps" complaints by replaying what each
// buyer actually saw on the success page.

const ENDPOINT = '/api/offer-clarity/success-event';
const SESSION_KEY = 'oc_success_session_id';

export type SuccessEventType =
  | 'page_loaded'
  | 'lead_fetch_started'
  | 'lead_fetch_success'
  | 'lead_fetch_failed'
  | 'lead_missing'
  | 'render_snapshot'
  | 'password_revealed'
  | 'password_copied'
  | 'link_clicked'
  | 'coaching_card_shown'
  | 'error_caught'
  | 'time_on_page';

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as Crypto & { randomUUID: () => string }).randomUUID();
  }
  // Fallback for very old browsers — not cryptographically strong but fine
  // for a session id used purely as a correlation key.
  return 'sess-' + Math.random().toString(36).slice(2) + '-' + Date.now().toString(36);
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = uuid();
    window.sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    // sessionStorage might be disabled (private mode + Safari edge cases)
    return uuid();
  }
}

interface TrackOptions {
  /** Use sendBeacon — fire-and-forget, survives page unload. */
  beacon?: boolean;
}

export function trackSuccessEvent(
  eventType: SuccessEventType,
  args: {
    leadId?: string | null;
    sessionId: string;
    data?: Record<string, unknown>;
  },
  opts: TrackOptions = {},
): void {
  if (typeof window === 'undefined') return;

  const payload = JSON.stringify({
    leadId: args.leadId ?? null,
    sessionId: args.sessionId,
    eventType,
    eventData: args.data ?? null,
    viewportW: window.innerWidth,
    viewportH: window.innerHeight,
  });

  // sendBeacon is the right tool for page-unload events — synchronous would
  // be cancelled, async fetch may not flush before the tab dies.
  if (opts.beacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
    try {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon(ENDPOINT, blob);
      return;
    } catch {
      // fall through to fetch
    }
  }

  // Fire-and-forget; we never want telemetry failures to break the UX.
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    /* swallow */
  });
}
