// Ana AI Coach — central configuration.
//
// All limits are server-only and env-overridable, mirroring src/lib/constants.ts.
// NOTHING here is NEXT_PUBLIC_ — none of this may reach the browser bundle.

function intEnv(name: string, fallback: number): number {
  return Number.parseInt(process.env[name] || String(fallback), 10);
}

// --- Models (per role, all env-overridable so you can switch any time) ----
// Base default for the panel/synthesis. gemini-3.5-flash = the stable, highest-
// quality flash tier ($1.50/$9.00 per 1M). Set ANA_COACH_MODEL to swap globally.
export const COACH_MODEL = process.env.ANA_COACH_MODEL || 'gemini-3.5-flash';
// Triage is pure routing/extraction — use the cheap, fast lite tier ($0.25/$1.50).
export const COACH_TRIAGE_MODEL = process.env.ANA_COACH_TRIAGE_MODEL || 'gemini-3.1-flash-lite';
// Specialists do the analysis; synthesis writes Ana's voice — both default to the base.
export const COACH_SPECIALIST_MODEL = process.env.ANA_COACH_SPECIALIST_MODEL || COACH_MODEL;
export const COACH_SYNTHESIS_MODEL = process.env.ANA_COACH_SYNTHESIS_MODEL || COACH_MODEL;
// Isolated url_context extraction call (secrets-free). Lite tier is plenty.
export const COACH_URL_MODEL = process.env.ANA_COACH_URL_MODEL || COACH_TRIAGE_MODEL;
// Set ANA_COACH_USE_URL_CONTEXT=false to fall back to the SSRF-safe server fetcher.
export const USE_URL_CONTEXT = (process.env.ANA_COACH_USE_URL_CONTEXT || 'true') !== 'false';

// --- Session / conversation caps ----------------------------------------
export const MESSAGE_LIMIT = intEnv('ANA_COACH_MAX_MESSAGES_PER_CONVERSATION', 30); // both roles
export const MAX_CONVERSATIONS_PER_DAY = intEnv('ANA_COACH_MAX_CONVERSATIONS_PER_DAY', 10);
export const MAX_MESSAGES_PER_DAY = intEnv('ANA_COACH_MAX_MESSAGES_PER_DAY', 60);
export const MAX_MESSAGE_CHARS = intEnv('ANA_COACH_MAX_MESSAGE_CHARS', 4000);
export const SESSION_TTL_HOURS = intEnv('ANA_COACH_SESSION_TTL_HOURS', 12);
export const IN_FLIGHT_STALE_SECS = intEnv('ANA_COACH_IN_FLIGHT_STALE_SECS', 120);

// --- Phase machine thresholds (message_count, both-role) -----------------
export const PHASE_INTAKE_FORCE_AT = intEnv('ANA_COACH_PHASE_INTAKE_FORCE_AT', 8);
export const PHASE_DIAGNOSIS_FORCE_AT = intEnv('ANA_COACH_PHASE_DIAGNOSIS_FORCE_AT', 14);
export const PHASE_WRAP_FORCE_AT = intEnv('ANA_COACH_PHASE_WRAP_FORCE_AT', 25);
export const PHASE_CLOSE_AT = intEnv('ANA_COACH_PHASE_CLOSE_AT', 28);

// --- Attachments ---------------------------------------------------------
export const MAX_FILES_PER_MESSAGE = intEnv('ANA_COACH_MAX_FILES_PER_MESSAGE', 2);
export const MAX_FILES_PER_DAY = intEnv('ANA_COACH_MAX_FILES_PER_DAY', 10);
export const MAX_FILE_BYTES = intEnv('ANA_COACH_MAX_FILE_BYTES', 4 * 1024 * 1024); // 4 MB
export const MAX_FILE_TEXT_CHARS = intEnv('ANA_COACH_MAX_FILE_TEXT_CHARS', 15000);

// --- URL fetching --------------------------------------------------------
export const MAX_URLS_PER_MESSAGE = intEnv('ANA_COACH_MAX_URLS_PER_MESSAGE', 2);
export const MAX_URLS_PER_DAY = intEnv('ANA_COACH_MAX_URLS_PER_DAY', 10);
export const URL_FETCH_TIMEOUT_MS = intEnv('ANA_COACH_URL_TIMEOUT_MS', 10000);
export const URL_MAX_DOWNLOAD_BYTES = intEnv('ANA_COACH_URL_MAX_DOWNLOAD_BYTES', 2 * 1024 * 1024); // 2 MB
export const URL_MAX_REDIRECTS = intEnv('ANA_COACH_URL_MAX_REDIRECTS', 3);
export const MAX_URL_TEXT_CHARS = intEnv('ANA_COACH_MAX_URL_TEXT_CHARS', 12000);

// --- Orchestrator bounds -------------------------------------------------
export const MAX_SPECIALISTS_PER_TURN = intEnv('ANA_COACH_MAX_SPECIALISTS_PER_TURN', 3);
export const TRIAGE_TIMEOUT_MS = intEnv('ANA_COACH_TRIAGE_TIMEOUT_MS', 10000);
export const SPECIALIST_TIMEOUT_MS = intEnv('ANA_COACH_SPECIALIST_TIMEOUT_MS', 25000);
export const SYNTHESIS_TIMEOUT_MS = intEnv('ANA_COACH_SYNTHESIS_TIMEOUT_MS', 60000);

// Per-role token caps.
export const TOKENS = {
  triage: { thinking: 0, out: 768, temp: 0.1 },
  strategy_coach: { thinking: 4096, out: 1024, temp: 0.4 },
  copy_critic: { thinking: 4096, out: 1024, temp: 0.3 },
  growth_auditor: { thinking: 2048, out: 1024, temp: 0.3 },
  product_matcher: { thinking: 2048, out: 768, temp: 0.2 },
  synthesis: { thinking: 2048, out: 1400, temp: 0.7 },
} as const;

// Largest single untrusted block routed to a specialist (chars, ~4 chars/token).
export const MAX_ATTACHMENT_CONTEXT_CHARS = intEnv('ANA_COACH_MAX_ATTACHMENT_CONTEXT_CHARS', 96000);

// --- Rate limiting (per-IP, best-effort in-memory) -----------------------
export const RATE_AUTH_PER_MIN = intEnv('ANA_COACH_RATE_AUTH_PER_MIN', 5);
export const RATE_CHAT_PER_MIN = intEnv('ANA_COACH_RATE_CHAT_PER_MIN', 20);

// --- Retention -----------------------------------------------------------
export const RETENTION_DAYS = intEnv('ANA_COACH_RETENTION_DAYS', 30);

// --- Pricing (for the admidash cost estimate; USD per 1M tokens) ----------
// Env-overridable so it's trivial to correct when the model's price changes.
// Output includes thinking tokens. These are ESTIMATES — label them as such.
function floatEnv(name: string, fallback: number): number {
  return Number.parseFloat(process.env[name] || String(fallback));
}
// Defaults to the gemini-3.5-flash rate (the dominant cost — synthesis + panel).
// Triage tokens run on the cheaper lite tier, so this slightly OVER-estimates
// (conservative). Override if you shift roles to different models.
export const PRICE_IN_PER_1M = floatEnv('ANA_COACH_PRICE_IN_PER_1M', 1.50);
export const PRICE_OUT_PER_1M = floatEnv('ANA_COACH_PRICE_OUT_PER_1M', 9.00);

// --- Secrets (validated lazily, never logged) ----------------------------
export function getGeminiApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('[ana-coach] GEMINI_API_KEY is not set');
  return key;
}

export function getSessionSecret(): string {
  const secret = process.env.ANA_COACH_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('[ana-coach] ANA_COACH_SESSION_SECRET is not set or too short (need 16+ chars)');
  }
  return secret;
}
