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
    { name: 'leads_bootcamp_brands', emailCol: 'email', dateCol: 'created_at', paidCol: 'has_paid' },
    { name: 'hit10k_leads', emailCol: 'email', dateCol: 'created_at', paidCol: 'is_paid' },
    { name: 'launch_lab_leads', emailCol: 'email', dateCol: 'created_at', paidCol: 'is_paid' },
    { name: 'genius_ideas_leads', emailCol: 'email', dateCol: 'created_at', paidCol: 'is_paid' },
    { name: 'show_dont_tell_users', emailCol: 'email', dateCol: 'created_at', paidCol: null }, // Treat all as paid
];

export async function GET(req: NextRequest) {
    if (!verifyAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const range = searchParams.get('range') || 'last30d';
        const limit = parseInt(searchParams.get('limit') || '50');

        let startDate = new Date();
        let endDate = new Date();

        if (range === 'today') {
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

        // 1. Fetch Stripe Charges for the range
        const stripeCharges = await stripe.charges.list({
            limit: 100,
            created: {
                gte: Math.floor(startDate.getTime() / 1000),
                lte: Math.floor(endDate.getTime() / 1000)
            },
        });

        const successfulStripeEmails = new Set(
            stripeCharges.data
                .filter(c => c.paid && !c.refunded)
                .map(c => c.billing_details?.email?.toLowerCase())
                .filter(Boolean)
        );

        // 2. Fetch data from all tables in parallel
        const tableResults = await Promise.all(TABLES_MAP.map(async (t) => {
            let query = supabaseAdmin
                .from(t.name)
                .select('*')
                .gte(t.dateCol, startISO)
                .lte(t.dateCol, endISO)
                .order(t.dateCol, { ascending: false })
                .limit(limit);

            const { data, error } = await query;
            if (error) {
                console.error(`Error fetching from ${t.name}:`, error);
                return [];
            }
            return (data || []).map(row => ({
                ...row,
                _sourceTable: t.name,
                _email: row[t.emailCol],
                _date: row[t.dateCol],
                _isPaid: t.paidCol ? row[t.paidCol] : true, // show_dont_tell defaults to true
            }));
        }));

        const allRecords = tableResults.flat();

        // 3. Separate into Sales and Leads
        // A "Sale" is either marked paid in DB OR has a successful Stripe charge
        const sales = allRecords
            .filter(r => r._isPaid || successfulStripeEmails.has(r._email?.toLowerCase()))
            .map(r => ({
                id: r.id,
                amount: r.amount_paid || r.amount || 0,
                currency: r.currency || 'USD',
                product: normalizeProduct(r.product_name || r._sourceTable),
                email: r._email || '—',
                date: r.payment_completed_at || r.paid_at || r._date,
                source: r._sourceTable,
                debugId: r.id,
                type: 'verified'
            }));

        // A "Lead" is someone who hasn't paid in any source
        const leads = allRecords
            .filter(r => !r._isPaid && !successfulStripeEmails.has(r._email?.toLowerCase()))
            .map(r => ({
                id: r.id,
                name: r.name || '—',
                email: r._email || '—',
                product: normalizeProduct(r.product_name || r._sourceTable),
                date: r._date,
                source: r._sourceTable,
                debugId: r.id,
            }));

        // 4. Add "Raw" Stripe Sales (charges that don't match any DB record email)
        const dbEmails = new Set(allRecords.map(r => r._email?.toLowerCase()).filter(Boolean));
        const standaloneStripe = stripeCharges.data
            .filter(c => c.paid && !c.refunded && !dbEmails.has(c.billing_details?.email?.toLowerCase()))
            .map(c => ({
                id: c.id,
                amount: c.amount,
                currency: c.currency.toUpperCase(),
                product: normalizeProduct(c.metadata?.product_name || c.metadata?.program || c.description),
                email: c.billing_details?.email || '—',
                date: new Date(c.created * 1000).toISOString(),
                source: 'Stripe: Charge',
                debugId: c.id,
                type: 'unlinked'
            }));

        const allSales = [...sales, ...standaloneStripe]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit);

        const allLeads = leads
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit);

        const totalRevenue = allSales.reduce((sum, s) => sum + s.amount, 0);

        // 5. Product Breakdown
        const productMap: Record<string, { revenue: number; count: number }> = {};
        for (const s of allSales) {
            if (!productMap[s.product]) productMap[s.product] = { revenue: 0, count: 0 };
            productMap[s.product].revenue += s.amount;
            productMap[s.product].count += 1;
        }
        const productBreakdown = Object.entries(productMap)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.revenue - a.revenue);

        return NextResponse.json({
            totalRevenue,
            totalLeads: allLeads.length,
            productBreakdown,
            recentSales: allSales,
            recentLeads: allLeads,
            range,
            limit
        });
    } catch (err: any) {
        console.error('[admidash/metrics]', err);
        return NextResponse.json({ error: err.message || 'Failed to fetch metrics' }, { status: 500 });
    }
}
