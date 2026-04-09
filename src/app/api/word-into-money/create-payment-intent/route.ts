import { NextRequest, NextResponse } from 'next/server';
import { stripe, WIM_PRICE, WIM_BUMP1_PRICE, WIM_BUMP2_PRICE, WIM_BUMP3_PRICE, WIM_BUNDLE_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name, hasBump1, hasBump2, hasBump3, hasBundle } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        let totalAmount = WIM_PRICE;
        if (hasBundle) {
            totalAmount += WIM_BUNDLE_PRICE;
        } else {
            if (hasBump1) totalAmount += WIM_BUMP1_PRICE;
            if (hasBump2) totalAmount += WIM_BUMP2_PRICE;
            if (hasBump3) totalAmount += WIM_BUMP3_PRICE;
        }

        // Create or Retrieve Stripe Customer
        let customer;
        const customers = await stripe.customers.list({ email, limit: 1 });
        if (customers.data.length > 0) {
            customer = customers.data[0];
        } else {
            customer = await stripe.customers.create({ email, name });
        }

        // Create the lead in Supabase
        const { data: lead, error: supabaseError } = await supabaseAdmin
            .from('wim_leads')
            .insert({
                name,
                email,
                total_paid: totalAmount,
                is_paid: false,
                stripe_customer_id: customer.id,
                created_at: new Date().toISOString(),
                has_bump1: hasBundle ? false : (hasBump1 ?? false),
                has_bump2: hasBundle ? false : (hasBump2 ?? false),
                has_bump3: hasBundle ? false : (hasBump3 ?? false),
                has_bundle: hasBundle ?? false,
            })
            .select()
            .single();

        if (supabaseError) {
            console.error('Supabase Insert Error:', JSON.stringify(supabaseError, null, 2));
            return NextResponse.json({ success: false, error: 'Failed to create lead record' }, { status: 500 });
        }

        // Create the Stripe Payment Intent
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
                product: 'word_into_money',
                hasBump1: hasBump1 ? 'true' : 'false',
                hasBump2: hasBump2 ? 'true' : 'false',
                hasBump3: hasBump3 ? 'true' : 'false',
                hasBundle: hasBundle ? 'true' : 'false',
            },
        });

        // Update the lead with the Payment Intent ID
        await supabaseAdmin
            .from('wim_leads')
            .update({ stripe_payment_intent_id: paymentIntent.id })
            .eq('id', lead.id);

        return NextResponse.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            leadId: lead.id,
        });
    } catch (error) {
        console.error('Stripe Exception:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
