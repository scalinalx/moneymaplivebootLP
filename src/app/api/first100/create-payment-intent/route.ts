import { NextRequest, NextResponse } from 'next/server';
import { stripe, FIRST100_PRICE, FIRST100_BUMP_PRICE, FIRST100_BUMP2_PRICE, FIRST100_BUMP3_PRICE, FIRST100_BUNDLE_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name, hasBump1, hasBump2, hasBump3, hasBundle } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        let totalAmount = FIRST100_PRICE;
        if (hasBundle) {
            totalAmount += FIRST100_BUNDLE_PRICE;
        } else {
            if (hasBump1) totalAmount += FIRST100_BUMP_PRICE;
            if (hasBump2) totalAmount += FIRST100_BUMP2_PRICE;
            if (hasBump3) totalAmount += FIRST100_BUMP3_PRICE;
        }

        // 0. Create or Retrieve Stripe Customer
        let customer;
        const customers = await stripe.customers.list({ email, limit: 1 });
        if (customers.data.length > 0) {
            customer = customers.data[0];
        } else {
            customer = await stripe.customers.create({ email, name });
        }

        // 1. Create the lead in Supabase (Pending state)
        const { data: lead, error: supabaseError } = await supabaseAdmin
            .from('first100_leads')
            .insert({
                name,
                email,
                total_paid: totalAmount,
                is_paid: false,
                stripe_customer_id: customer.id, // Ensure this exists or fallback to metadata
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (supabaseError) {
            console.error('Supabase Error:', supabaseError);
            return NextResponse.json({ success: false, error: 'Failed to create lead record' }, { status: 500 });
        }

        // 2. Create the Stripe Payment Intent
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
                product: 'first100_workshop',
                hasBump1: hasBump1 ? 'true' : 'false',
                hasBump2: hasBump2 ? 'true' : 'false',
                hasBump3: hasBump3 ? 'true' : 'false',
                hasBundle: hasBundle ? 'true' : 'false'
            }
        });

        // 3. Update the lead with the Payment Intent ID
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
