import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-05-28.basil' });

function verifyAuth(req: NextRequest) {
    const auth = req.headers.get('authorization') || '';
    const token = auth.replace('Bearer ', '');
    return token === process.env.ADMIDASH_PASSWORD;
}

const PRODUCT_LABELS: Record<string, string> = {
    'launch_lab': 'Launch Lab',
    'launch-lab': 'Launch Lab',
    'hit10k': 'How To Hit 10K',
    'hit_10k': 'How To Hit 10K',
    'genius_ideas': '100 Genius Ideas',
    'genius-ideas': '100 Genius Ideas',
    'show_dont_tell': "Show Don't Tell",
    'show-dont-tell': "Show Don't Tell",
    'vdpb': 'VDPB',
    'bundle': 'Bundle',
};

function normalizeProduct(raw: string | null | undefined): string {
    if (!raw) return 'Other';
    const key = raw.toLowerCase().replace(/ /g, '_');
    for (const [k, v] of Object.entries(PRODUCT_LABELS)) {
        if (key.includes(k.replace(/ /g, '_').replace(/-/g, '_'))) return v;
    }
    return raw;
}

const TABLES_MAP = [
    { name: 'leads_bootcamp_brands', emailCol: 'email', nameCol: 'name', dateCol: 'created_at', paidCol: 'has_paid', productCol: 'product_name' },
    { name: 'hit10k_leads', emailCol: 'email', nameCol: 'name', dateCol: 'created_at', paidCol: 'is_paid', productCol: null, defaultProduct: 'Hit 10k' },
    { name: 'launch_lab_leads', emailCol: 'email', nameCol: 'name', dateCol: 'created_at', paidCol: 'is_paid', productCol: null, defaultProduct: 'Launch Lab' },
    { name: 'genius_ideas_leads', emailCol: 'email', nameCol: 'name', dateCol: 'created_at', paidCol: 'is_paid', productCol: null, defaultProduct: '100 Genius Ideas' },
    { name: 'show_dont_tell_users', emailCol: 'email', nameCol: 'name', dateCol: 'created_at', paidCol: null, productCol: null, defaultProduct: 'Show Don\'t Tell' },
    { name: 'ana_ai_leads', emailCol: 'email', nameCol: 'name', dateCol: 'last_active_at', paidCol: null, productCol: null, defaultProduct: 'ANA AI' },
    { name: 'leads', emailCol: 'email', nameCol: 'full_name', dateCol: 'created_at', paidCol: 'payment_completed_at', productCol: 'package', defaultProduct: 'Lead Capture' },
];

export async function GET(req: NextRequest) {
    if (!verifyAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const range = searchParams.get('range') || 'last30d';
        const limit = parseInt(searchParams.get('limit') || '50');
        const customStart = searchParams.get('startDate');
        const customEnd = searchParams.get('endDate');

        let startDate = new Date();
        let endDate = new Date();

        if (customStart && customEnd) {
            startDate = new Date(customStart);
            endDate = new Date(customEnd);
        } else if (range === 'today') {
            startDate.setHours(0, 0, 0, 0);
        } else if (range === 'yesterday') {
            startDate.setDate(startDate.getDate() - 1);
            startDate.setHours(0, 0, 0, 0);
            endDate.setDate(endDate.getDate() - 1);
            endDate.setHours(23, 59, 59, 999);
        } else if (range === 'last7d') {
            startDate.setDate(startDate.getDate() - 7);
        } else if (range === 'last30d') {
            startDate.setDate(startDate.getDate() - 30);
        } else if (range === 'all') {
            startDate = new Date(0);
        }

        const startISO = startDate.toISOString();
        const endISO = endDate.toISOString();

        // 1. Fetch Stripe Charges for the range (> $0 only)
        const stripeCharges = await stripe.charges.list({
            limit: 100,
            created: {
                gte: Math.floor(startDate.getTime() / 1000),
                lte: Math.floor(endDate.getTime() / 1000)
            },
            expand: ['data.customer']
        });

        const successfulCharges = stripeCharges.data.filter(c => c.paid && !c.refunded && c.amount > 0);

        // 2. Fetch data from all tables in parallel
        const tableResults = await Promise.all(TABLES_MAP.map(async (t) => {
            let query = supabaseAdmin
                .from(t.name)
                .select('*')
                .gte(t.dateCol, startISO)
                // .lte(t.dateCol, endISO) // Removed to catch leads that might be slightly outside range if checking global
                .order(t.dateCol, { ascending: false })
                .limit(limit * 2);

            const { data, error } = await query;
            if (error) {
                console.error(`Error fetching from ${t.name}:`, error);
                return [];
            }
            return (data || []).map(row => {
                const email = t.emailCol ? (row[t.emailCol] || '') : '';
                const name = t.nameCol ? (row[t.nameCol] || '—') : '—';
                const product = (t.productCol && row[t.productCol]) ? row[t.productCol] : (t.defaultProduct || 'Unknown Product');

                return {
                    ...row,
                    _sourceTable: t.name,
                    _email: email.toLowerCase(),
                    _name: name,
                    _date: row[t.dateCol],
                    _isPaid: t.paidCol ? !!row[t.paidCol] : false,
                    _product: product
                };
            });
        }));

        const allSupabaseRecords = tableResults.flat();

        // --- REFINED: Store all records per email to allow smarter matching ---
        const supabaseRecordsByEmail = allSupabaseRecords.reduce((acc, r) => {
            if (!r._email) return acc;
            if (!acc[r._email]) acc[r._email] = [];
            acc[r._email].push(r);
            return acc;
        }, {} as Record<string, any[]>);

        // helper to find the BEST match in Supabase for a given Stripe email + product
        const findBestSupabaseMatch = (email: string, stripeProduct: string, stripeDate: string, amount?: number) => {
            const matches = supabaseRecordsByEmail[email] || [];
            if (matches.length === 0) return null;
            if (matches.length === 1) return matches[0];

            const normStripe = stripeProduct.toLowerCase();
            const stripeTime = new Date(stripeDate).getTime();

            // Priority 1: Exact product match AND similar date (within 7 days)
            const exactProductRecent = matches.find((m: any) => {
                const productMatch = m._product.toLowerCase().includes(normStripe) || normStripe.includes(m._product.toLowerCase());
                const dateMatch = Math.abs(new Date(m._date).getTime() - stripeTime) < 7 * 24 * 60 * 60 * 1000;
                return productMatch && dateMatch;
            });
            if (exactProductRecent) return exactProductRecent;

            // Priority 2: Matches payment intent ID (Strongest link if available)
            // Priority 3: Exact product match
            const productOnlyMatch = matches.find((m: any) =>
                m._product.toLowerCase().includes(normStripe) ||
                normStripe.includes(m._product.toLowerCase())
            );
            if (productOnlyMatch) return productOnlyMatch;

            // Fallback: Pick the one with the closest date
            return matches.sort((a: any, b: any) =>
                Math.abs(new Date(a._date).getTime() - stripeTime) -
                Math.abs(new Date(b._date).getTime() - stripeTime)
            )[0];
        };

        // 3. Process Sales (Revenue > 0)
        const stripeSales = stripeCharges.data
            .filter(c => c.paid && !c.refunded && (c.amount || 0) > 0)
            .map(c => {
                const rawEmail = c.billing_details?.email || (c.customer as any)?.email || c.metadata?.email;
                const email = rawEmail?.toLowerCase();

                // Determine product from Stripe first as it's the "source of truth" for the actual charge
                const stripeProductRaw = c.metadata?.product_name || c.metadata?.program || c.description || 'Unknown Product';
                const stripeProduct = normalizeProduct(stripeProductRaw);

                // Find matching Supabase record, prioritized by product similarity and date proximity
                const supabaseMatch = email ? findBestSupabaseMatch(email, stripeProduct, new Date(c.created * 1000).toISOString(), c.amount) : null;

                return {
                    id: c.id,
                    amount: c.amount,
                    currency: c.currency.toUpperCase(),
                    date: new Date(c.created * 1000).toISOString(),
                    email: email || '—',
                    customerName: supabaseMatch?._name || c.billing_details?.name || c.metadata?.name || '—',
                    product: stripeProduct,
                    source: supabaseMatch ? `Supabase: ${supabaseMatch._sourceTable}` : 'Stripe: Charge',
                    debugId: supabaseMatch?.[t_id_key(supabaseMatch._sourceTable)] || supabaseMatch?.id || c.id,
                    type: supabaseMatch ? 'verified' : 'unlinked'
                };
            });

        // 4. Process Abandoned Carts
        const successfulEmails = new Set(stripeSales.map(s => `${s.email}|${s.product}`));

        const stripeAbandonments = stripeCharges.data
            .filter(c => (c.amount === 0 || !c.paid))
            .map(c => {
                const rawEmail = c.billing_details?.email || (c.customer as any)?.email || c.metadata?.email;
                const email = rawEmail?.trim().toLowerCase();
                const stripeProduct = normalizeProduct(c.description || 'Abandoned Checkout');
                const stripeDate = new Date(c.created * 1000).toISOString();
                const supabaseMatch = email ? findBestSupabaseMatch(email, stripeProduct, stripeDate) : null;

                return {
                    id: c.id,
                    email: email || '—',
                    name: supabaseMatch?._name || c.billing_details?.name || '—',
                    product: stripeProduct,
                    date: stripeDate,
                    reason: (c.amount === 0 && c.paid) ? '$0 Session' : 'Unpaid Charge',
                    source: 'Stripe',
                    potentialRevenue: c.amount || 0
                };
            });

        const supabaseAbandonments = allSupabaseRecords
            .filter(r => {
                if (r._isPaid) return false;
                if (successfulEmails.has(`${r._email}|${r._product}`)) return false;

                // ── Rule A: Explicit Checkout Indicators ────────────────
                const hasStartedCheckout = r.checkout_started_at || r.checkout_status === 'lead_captured';
                const hasStripeIntent = r.stripe_payment_intent_id || r.stripe_session_id || r.stripe_customer_id;

                // ── Rule B: Automatic Abandonment for Core Tables ───────
                const isProductSpecific = ['launch_lab_leads', 'hit10k_leads', 'genius_ideas_leads', 'leads_bootcamp_brands'].includes(r._sourceTable);
                const notWaitlist = r.is_waitlist === false || r.is_waitlist === null;

                // ── Rule C: SDT Initiated Status ────────────────────────
                const isSDTInitiated = r._sourceTable === 'show_dont_tell_users' && r.payment_status === 'initiated';

                return hasStartedCheckout || hasStripeIntent || (isProductSpecific && notWaitlist) || isSDTInitiated;
            })
            .map(r => ({
                id: r.id,
                email: r._email,
                name: r._name || '—',
                product: r._product,
                date: r.checkout_started_at || r._date,
                reason: r.payment_status === 'initiated' ? 'Payment Initiated' :
                    r.stripe_payment_intent_id ? 'Stripe Intent Created' :
                        'Incomplete Checkout',
                source: r._sourceTable,
                potentialRevenue: r.total_paid || r.amount_paid || r.amount || 0
            }));

        // --- DEDUPLICATION LOGIC ---
        const dedupedMap = new Map();
        [...stripeAbandonments, ...supabaseAbandonments].forEach(item => {
            const day = new Date(item.date).toISOString().split('T')[0];
            // Key: email + product + day (STRICT DEDUPE)
            const key = `${item.email.toLowerCase()}|${item.product}|${day}`;

            if (!dedupedMap.has(key)) {
                dedupedMap.set(key, item);
            } else {
                const existing = dedupedMap.get(key);
                // Prefer Stripe source or higher potential revenue
                if (item.source === 'Stripe' || (item.potentialRevenue || 0) > (existing.potentialRevenue || 0)) {
                    dedupedMap.set(key, item);
                }
            }
        });

        const abandonedCarts = Array.from(dedupedMap.values())
            .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // 5. Abandonment Report (By Product)
        const abandonmentMap: Record<string, { count: number; potentialRevenue: number }> = {};
        abandonedCarts.forEach(a => {
            if (!abandonmentMap[a.product]) abandonmentMap[a.product] = { count: 0, potentialRevenue: 0 };
            abandonmentMap[a.product].count += 1;
            // potentialRevenue is optional in the object
            // @ts-ignore
            if (a.potentialRevenue) abandonmentMap[a.product].potentialRevenue += a.potentialRevenue;
        });
        const abandonmentReport = Object.entries(abandonmentMap)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.count - a.count);

        function t_id_key(table: string) {
            if (table === 'show_dont_tell_users') return 'token_id';
            return 'id';
        }

        // 4. Process Leads
        // A "Lead" is someone in Supabase who has NO stripe charge (abandoned cart)
        const stripeEmails = new Set(successfulCharges.map(c => c.billing_details?.email?.toLowerCase()).filter(Boolean));

        const leads = allSupabaseRecords
            .filter(r => !r._isPaid && !stripeEmails.has(r._email))
            .map(r => ({
                id: r.id,
                name: r._name || '—',
                email: r._email || '—',
                product: normalizeProduct(r._product),
                date: r._date,
                source: r._sourceTable,
                debugId: r.id,
            }));

        const allSales = stripeSales
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit);

        const allLeads = leads
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit);

        // 5. Product Breakdown & Totals
        const productMap: Record<string, { revenue: number; count: number; leadCount: number }> = {};

        stripeSales.forEach(s => {
            if (!productMap[s.product]) productMap[s.product] = { revenue: 0, count: 0, leadCount: 0 };
            productMap[s.product].revenue += s.amount;
            productMap[s.product].count += 1;
        });

        leads.forEach(l => {
            if (!productMap[l.product]) productMap[l.product] = { revenue: 0, count: 0, leadCount: 0 };
            productMap[l.product].leadCount += 1;
        });

        const productBreakdown = Object.entries(productMap)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.revenue - a.revenue);

        // 6. Best Customers (Aggregated by Email)
        const customerMap: Record<string, { email: string; name: string; totalSpent: number; products: Set<string>; lastPurchase: string }> = {};

        stripeSales.forEach(s => {
            if (!customerMap[s.email]) {
                customerMap[s.email] = {
                    email: s.email,
                    name: s.customerName,
                    totalSpent: 0,
                    products: new Set(),
                    lastPurchase: s.date
                };
            }
            customerMap[s.email].totalSpent += s.amount;
            customerMap[s.email].products.add(s.product);
            if (new Date(s.date) > new Date(customerMap[s.email].lastPurchase)) {
                customerMap[s.email].lastPurchase = s.date;
            }
        });

        const bestCustomers = Object.values(customerMap)
            .map(c => ({
                ...c,
                productCount: c.products.size,
                products: Array.from(c.products)
            }))
            .sort((a, b) => b.totalSpent - a.totalSpent || b.productCount - a.productCount)
            .slice(0, 100);

        return NextResponse.json({
            totalRevenue: stripeSales.reduce((sum, s) => sum + s.amount, 0),
            totalLeads: leads.length,
            productBreakdown,
            recentSales: allSales,
            recentLeads: allLeads,
            abandonedCarts: abandonedCarts.slice(0, limit),
            abandonmentReport,
            bestCustomers,
            range,
            limit,
            startDate: startISO,
            endDate: endISO
        });
    } catch (err: any) {
        console.error('[admidash/metrics]', err);
        return NextResponse.json({ error: err.message || 'Failed to fetch metrics' }, { status: 500 });
    }
}
