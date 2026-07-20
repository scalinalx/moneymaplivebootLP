// Server-side Kit (V4 API) helper. Same auth pattern as the admidash Kit
// routes: KIT_API_KEY + X-Kit-Api-Key header. Everything here is best-effort —
// callers are payment flows, so a Kit outage must never fail a purchase.

const KIT_API_KEY = process.env.KIT_API_KEY;
const KIT_BASE_URL = process.env.KIT_BASE_URL || 'https://api.kit.com/v4/';

/** Tag applied to every paid bootcamp enrollment. */
export const KIT_BOOTCAMP_TAG = 'bootcampjuly';

/** Tag applied to every paid "How To Hit 10k" workshop purchase.
 *  (Kit stores it as '10kJUL' — its own casing; lookup is case-insensitive.) */
export const KIT_HIT10K_TAG = '10kjul';

async function kitFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${KIT_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': KIT_API_KEY!,
      ...init?.headers,
    },
    signal: AbortSignal.timeout(8000),
  });
}

async function findTagByName(tagName: string): Promise<number | null> {
  let after: string | null = null;
  for (let page = 0; page < 10; page++) {
    const res = await kitFetch(`tags?per_page=500${after ? `&after=${encodeURIComponent(after)}` : ''}`);
    if (!res.ok) return null;
    const data = await res.json();
    const target = tagName.toLowerCase();
    const hit = (data.tags || []).find((t: { id: number; name: string }) => t.name.toLowerCase() === target);
    if (hit) return hit.id;
    if (!data.pagination?.has_next_page || !data.pagination?.end_cursor) return null;
    after = data.pagination.end_cursor;
  }
  return null;
}

/** Find a tag by exact name, creating it if missing. Kit's tag list lags a
 *  minute or two behind writes, so a freshly created tag can be missing from
 *  the list while create returns "already exists" — hence the retry lookup. */
async function resolveTagId(tagName: string): Promise<number | null> {
  const found = await findTagByName(tagName);
  if (found) return found;
  const created = await kitFetch('tags', { method: 'POST', body: JSON.stringify({ name: tagName }) });
  if (created.ok) return (await created.json()).tag?.id ?? null;
  return findTagByName(tagName);
}

/**
 * Subscribe an email to Kit (active state) and apply a tag. Idempotent — both
 * the client confirm-payment call and the Stripe webhook run this, and
 * re-subscribing/re-tagging an existing subscriber is a no-op on Kit's side.
 * Never throws; returns whether the tag was applied.
 */
export async function addSubscriberWithTag(
  email: string,
  firstName: string,
  tagName: string,
): Promise<boolean> {
  if (!KIT_API_KEY) {
    console.warn('[kit] KIT_API_KEY not configured — skipping subscribe/tag for', tagName);
    return false;
  }
  try {
    // Create (or hit the existing) subscriber. A non-2xx here is fine — the
    // subscriber may already exist; tagging below is keyed by email anyway.
    await kitFetch('subscribers', {
      method: 'POST',
      body: JSON.stringify({ email_address: email, first_name: firstName || undefined }),
    }).catch(() => null);

    const tagId = await resolveTagId(tagName);
    if (!tagId) {
      console.error(`[kit] could not resolve tag '${tagName}'`);
      return false;
    }

    const tagged = await kitFetch(`tags/${tagId}/subscribers`, {
      method: 'POST',
      body: JSON.stringify({ email_address: email }),
    });
    if (!tagged.ok) {
      console.error(`[kit] tagging failed (${tagged.status}):`, await tagged.text());
      return false;
    }
    console.log(`[kit] tagged ${email} with '${tagName}'`);
    return true;
  } catch (e) {
    console.error('[kit] subscribe/tag error (non-fatal):', e instanceof Error ? e.message : e);
    return false;
  }
}
