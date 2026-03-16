import { NextRequest, NextResponse } from 'next/server';
import { stripe, UNSTUCK_PRICE, UNSTUCK_SDT_BUMP_PRICE, UNSTUCK_GENIUS_BUMP_PRICE, UNSTUCK_HOOKS_BUMP_PRICE, UNSTUCK_BUNDLE_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name, hasSdtBump, hasGeniusBump, hasHooksBump, hasBundle } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        let totalAmount = UNSTUCK_PRICE;
        if (hasBundle) {
            totalAmount += UNSTUCK_BUNDLE_PRICE;
        } else {
            if (hasSdtBump) totalAmount += UNSTUCK_SDT_BUMP_PRICE;
            if (hasGeniusBump) totalAmount += UNSTUCK_GENIUS_BUMP_PRICE;
            if (hasHooksBump) totalAmount += UNSTUCK_HOOKS_BUMP_PRICE;
        }

        // Effective bump states (bundle includes all 3)
        const effectiveSdt = hasBundle || hasSdtBump;
        const effectiveGenius = hasBundle || hasGeniusBump;
        const effectiveHooks = hasBundle || hasHooksBump;

        // Create or retrieve Stripe Customer
        let customer;
        const customers = await stripe.customers.list({ email, limit: 1 });
        if (customers.data.length > 0) {
            customer = customers.data[0];
        } else {
            customer = await stripe.customers.create({ email, name });
        }

        // Create lead in Supabase
        let { data: lead, error: supabaseError } = await supabaseAdmin
            .from('first100_leads')
            .insert({
                name,
                email,
                total_paid: totalAmount,
                is_paid: false,
                stripe_customer_id: customer.id,
                created_at: new Date().toISOString(),
                has_bump1: effectiveGenius,
                has_bump2: effectiveHooks,
                has_bump3: effectiveSdt,
                has_bundle: hasBundle ?? false,
                source: 'unstuck_to_published',
            })
            .select()
            .single();

        if (supabaseError) {
            // Fallback without source column
            const fallback = await supabaseAdmin
                .from('first100_leads')
                .insert({
                    name,
                    email,
                    total_paid: totalAmount,
                    is_paid: false,
                    stripe_customer_id: customer.id,
                    created_at: new Date().toISOString(),
                    has_bump1: effectiveGenius,
                    has_bump2: effectiveHooks,
                    has_bump3: effectiveSdt,
                    has_bundle: hasBundle ?? false,
                })
                .select()
                .single();

            if (fallback.error) {
                console.error('Supabase Insert Error:', JSON.stringify(fallback.error, null, 2));
                return NextResponse.json({ success: false, error: 'Failed to create lead record' }, { status: 500 });
            }

            lead = fallback.data;
        }

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
            customer: customer.id,
            setup_future_usage: 'off_session',
            receipt_email: email,
            metadata: {
                leadId: lead.id,
                email,
                name,
                product: 'unstuck_to_published',
                hasSdtBump: effectiveSdt ? 'true' : 'false',
                hasGeniusBump: effectiveGenius ? 'true' : 'false',
                hasHooksBump: effectiveHooks ? 'true' : 'false',
                hasBundle: hasBundle ? 'true' : 'false',
            }
        });

        // Update lead with Payment Intent ID
        await supabaseAdmin
            .from('first100_leads')
            .update({ stripe_payment_intent_id: paymentIntent.id })
            .eq('id', lead.id);

        return NextResponse.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            leadId: lead.id
        });

    } catch (error) {
        console.error('Stripe Exception:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
