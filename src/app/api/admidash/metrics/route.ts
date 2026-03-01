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

export async function GET(req: NextRequest) {
    if (!verifyAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const since = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;
        const sinceISO = new Date(since * 1000).toISOString();

        // 1. Fetch Supabase Leads (all time or recent)
        const { data: supabaseLeads, error: leadsErr } = await supabaseAdmin
            .from('leads_bootcamp_brands')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(500);

        if (leadsErr) throw leadsErr;

        // 2. Fetch Stripe Charges (last 30 days)
        const stripeCharges = await stripe.charges.list({
            limit: 100,
            created: { gte: since },
        });

        // 3. Process Verified Sales (from Supabase where has_paid = true)
        const verifiedSales = (supabaseLeads || [])
            .filter(l => l.has_paid)
            .map(l => ({
                id: l.id,
                amount: l.amount_paid || 0,
                currency: l.currency || 'USD',
                product: normalizeProduct(l.product_name),
                email: l.email,
                date: l.payment_completed_at || l.created_at,
                source: `Supabase: leads_bootcamp_brands`,
                debugId: l.id,
                stripeId: l.stripe_session_id || '—',
                type: 'verified'
            }));

        // 4. Process Raw Stripe Sales (to find charges not linked to Supabase)
        const rawStripeSales = stripeCharges.data
            .filter(c => c.paid && !c.refunded)
            .map(c => {
                const isLinked = verifiedSales.some(v =>
                    v.stripeId === c.id ||
                    v.stripeId === c.payment_intent ||
                    v.email.toLowerCase() === c.billing_details?.email?.toLowerCase()
                );

                return {
                    id: c.id,
                    amount: c.amount,
                    currency: c.currency.toUpperCase(),
                    product: normalizeProduct(c.metadata?.product_name || c.metadata?.program || c.description),
                    email: c.billing_details?.email || c.metadata?.email || '—',
                    date: new Date(c.created * 1000).toISOString(),
                    source: `Stripe: Charge`,
                    debugId: c.id,
                    stripeId: c.id,
                    type: isLinked ? 'linked' : 'unlinked'
                };
            });

        // Combine for "Recent Sales" view - prefer verified, then unlinked raw charges
        const unlinkedStripe = rawStripeSales.filter(s => s.type === 'unlinked');
        const recentSales = [...verifiedSales, ...unlinkedStripe]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 50);

        const totalRevenue30d = recentSales.reduce((s, c) => s + c.amount, 0);

        // Product breakdown
        const productMap: Record<string, { revenue: number; count: number }> = {};
        for (const s of recentSales) {
            if (!productMap[s.product]) productMap[s.product] = { revenue: 0, count: 0 };
            productMap[s.product].revenue += s.amount;
            productMap[s.product].count += 1;
        }
        const productBreakdown = Object.entries(productMap)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.revenue - a.revenue);

        // 5. Leads Logic: Any record in leads_bootcamp_brands that HAS NOT paid
        const totalLeadsCount = supabaseLeads?.length || 0;
        const paidLeads = verifiedSales.length;
        const conversionRate = totalLeadsCount > 0 ? ((paidLeads / totalLeadsCount) * 100).toFixed(1) : '0.0';

        return NextResponse.json({
            totalRevenue30d,
            allTimeRevenue: verifiedSales.reduce((s, v) => s + v.amount, 0),
            totalLeads: totalLeadsCount,
            paidLeads,
            conversionRate,
            productBreakdown,
            recentSales,
            recentLeads: (supabaseLeads || []).slice(0, 50),
        });
    } catch (err: any) {
        console.error('[admidash/metrics]', err);
        return NextResponse.json({ error: err.message || 'Failed to fetch metrics' }, { status: 500 });
    }
}
