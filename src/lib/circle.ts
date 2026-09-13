// Server-side Circle Admin API v2 helper. Read-only for now: we poll member
// charges to learn who paid for the 30-Day Substack Challenge. The token is
// server-only (CIRCLE_ADMIN_TOKEN — never NEXT_PUBLIC_). Business plan quota is
// 5,000 requests/month, so callers keep to one list call per run.
// Spec: https://api-headless.circle.so/api/admin/v2/swagger.yaml

const CIRCLE_ADMIN_TOKEN = process.env.CIRCLE_ADMIN_TOKEN;
const CIRCLE_BASE_URL = process.env.CIRCLE_BASE_URL || 'https://app.circle.so/api/admin/v2/';

export interface CircleCharge {
  id: number | string;
  processor_id?: string | null;
  status: string;                 // e.g. 'paid', 'refunded', 'partial_refunded'
  amount: number;                 // currency subunits (cents)
  amount_refunded?: number | null;
  currency: string;               // 'usd'
  created_at: string;             // ISO8601
  paywall_id?: number | null;
  paywall_name?: string | null;
  paywall_price_id?: number | null;
  paywall_price_type?: string | null;
  paywall_coupon_code?: string | null;
  community_member_id?: number | null;
  community_member_name?: string | null;
  community_member_email?: string | null;
}

export interface CircleChargesPage {
  page: number;
  per_page: number;
  has_next_page: boolean;
  count: number;
  page_count: number;
  records: CircleCharge[];
}

export function circleConfigured(): boolean {
  return !!CIRCLE_ADMIN_TOKEN;
}

// The quick-start doc shows "Bearer <token>"; the swagger securityScheme says
// "Token <token>". Try Bearer first and fall back to Token on a 401.
async function circleFetch(path: string, init?: RequestInit): Promise<Response> {
  if (!CIRCLE_ADMIN_TOKEN) throw new Error('CIRCLE_ADMIN_TOKEN not configured');
  const url = CIRCLE_BASE_URL + path;
  const attempt = (scheme: 'Bearer' | 'Token') =>
    fetch(url, {
      ...init,
      headers: { Authorization: `${scheme} ${CIRCLE_ADMIN_TOKEN}`, Accept: 'application/json', ...(init?.headers || {}) },
      cache: 'no-store',
    });
  let res = await attempt('Bearer');
  if (res.status === 401) res = await attempt('Token');
  return res;
}

/** One page of member charges, newest first. */
export async function listCircleCharges(opts: {
  createdAtGte?: string;
  page?: number;
  perPage?: number;
  status?: string;      // comma list, e.g. 'paid,refunded'
}): Promise<CircleChargesPage> {
  const q = new URLSearchParams();
  q.set('page', String(opts.page ?? 1));
  q.set('per_page', String(opts.perPage ?? 100));
  q.set('sort', 'created_at');
  q.set('direction', 'desc');
  if (opts.createdAtGte) q.set('created_at_gte', opts.createdAtGte);
  if (opts.status) q.set('status', opts.status);
  const res = await circleFetch(`community_member_charges?${q.toString()}`);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Circle charges ${res.status}: ${text.slice(0, 300)}`);
  }
  return (await res.json()) as CircleChargesPage;
}
