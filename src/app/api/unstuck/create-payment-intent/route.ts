import { NextRequest, NextResponse } from 'next/server';
import { stripe, UNSTUCK_PRICE, UNSTUCK_SDT_BUMP_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name, hasSdtBump } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        let totalAmount = UNSTUCK_PRICE;
        if (hasSdtBump) totalAmount += UNSTUCK_SDT_BUMP_PRICE;

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
                has_bump1: false,
                has_bump2: false,
                has_bump3: hasSdtBump ?? false,
                has_bundle: false,
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
                    has_bump1: false,
                    has_bump2: false,
                    has_bump3: hasSdtBump ?? false,
                    has_bundle: false,
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
                hasSdtBump: hasSdtBump ? 'true' : 'false',
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
