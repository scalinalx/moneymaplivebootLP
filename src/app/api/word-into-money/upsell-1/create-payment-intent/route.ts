import { NextRequest, NextResponse } from 'next/server';
import { stripe, WIM_UPSELL1_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name, wimLeadId } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        // Get or create Stripe customer
        let customer;
        const customers = await stripe.customers.list({ email, limit: 1 });
        if (customers.data.length > 0) {
            customer = customers.data[0];
        } else {
            customer = await stripe.customers.create({ email, name });
        }

        // Create lead in first100_leads
        const { data: lead, error: supabaseError } = await supabaseAdmin
            .from('first100_leads')
            .insert({
                name,
                email,
                total_paid: WIM_UPSELL1_PRICE,
                is_paid: false,
                stripe_customer_id: customer.id,
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (supabaseError) {
            console.error('Supabase Insert Error:', JSON.stringify(supabaseError, null, 2));
            return NextResponse.json({ success: false, error: 'Failed to create lead record' }, { status: 500 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: WIM_UPSELL1_PRICE,
            currency: 'usd',
            customer: customer.id,
            setup_future_usage: 'off_session',
            receipt_email: email,
            metadata: {
                leadId: lead.id,
                wimLeadId: wimLeadId || '',
                email,
                name,
                product: 'first100_from_wim_upsell',
            },
        });

        await supabaseAdmin
            .from('first100_leads')
            .update({ stripe_payment_intent_id: paymentIntent.id })
            .eq('id', lead.id);

        return NextResponse.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            leadId: lead.id,
        });
    } catch (error) {
        console.error('Upsell 1 Stripe Exception:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
