import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-01-27.acacia' });

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
        // ── Stripe: last 30 days ──────────────────────────────────────────
        const since = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

        const charges = await stripe.charges.list({
            limit: 100,
            created: { gte: since },
        });

        const recentSales = charges.data
            .filter(c => c.paid && !c.refunded)
            .map(c => ({
                id: c.id,
                amount: c.amount,
                currency: c.currency.toUpperCase(),
                product: normalizeProduct(
                    c.metadata?.product_name || c.metadata?.program || c.description
                ),
                email: c.billing_details?.email || c.metadata?.email || '—',
                date: new Date(c.created * 1000).toISOString(),
            }));

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

        // ── Supabase: leads ───────────────────────────────────────────────
        const { data: leads, error: leadsErr } = await supabaseAdmin
            .from('leads_bootcamp_brands')
            .select('id, email, name, has_paid, amount_paid, product_name, payment_completed_at, created_at')
            .order('created_at', { ascending: false })
            .limit(200);

        if (leadsErr) throw leadsErr;

        const totalLeads = leads?.length ?? 0;
        const paidLeads = leads?.filter(l => l.has_paid) ?? [];
        const conversionRate = totalLeads > 0 ? ((paidLeads.length / totalLeads) * 100).toFixed(1) : '0.0';

        // All-time revenue from Supabase (from paid leads)
        const allTimeRevenue = paidLeads.reduce((s, l) => s + (l.amount_paid || 0), 0);

        return NextResponse.json({
            totalRevenue30d,
            allTimeRevenue,
            totalLeads,
            paidLeads: paidLeads.length,
            conversionRate,
            productBreakdown,
            recentSales: recentSales.slice(0, 30),
            recentLeads: leads?.slice(0, 50) ?? [],
        });
    } catch (err: any) {
        console.error('[admidash/metrics]', err);
        return NextResponse.json({ error: err.message || 'Failed to fetch metrics' }, { status: 500 });
    }
}
