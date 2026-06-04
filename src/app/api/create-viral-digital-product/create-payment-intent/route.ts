import { NextRequest, NextResponse } from 'next/server';
import {
    stripe,
    CVDP_PRICE,
    CVDP_BUMP1_PRICE,
    CVDP_BUMP2_PRICE,
    CVDP_BUMP3_PRICE,
    CVDP_BUNDLE_PRICE,
} from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name, hasBump1, hasBump2, hasBump3, hasBundle } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        // Calculate total. Bundle short-circuits the 3 individual bumps.
        let totalAmount = CVDP_PRICE;
        if (hasBundle) {
            totalAmount += CVDP_BUNDLE_PRICE;
        } else {
            if (hasBump1) totalAmount += CVDP_BUMP1_PRICE;
            if (hasBump2) totalAmount += CVDP_BUMP2_PRICE;
            if (hasBump3) totalAmount += CVDP_BUMP3_PRICE;
        }

        // Effective bump states (bundle includes all 3)
        const effective1 = hasBundle || hasBump1; // 100 Genius Launch Ideas
        const effective2 = hasBundle || hasBump2; // Offer Genius AI Builder
        const effective3 = hasBundle || hasBump3; // The Launch Stack

        // Create or retrieve Stripe Customer (card reusable for any future upsell)
        let customer;
        const customers = await stripe.customers.list({ email, limit: 1 });
        if (customers.data.length > 0) {
            customer = customers.data[0];
        } else {
            customer = await stripe.customers.create({ email, name });
        }

        // Create the lead in Supabase (Pending state)
        const { data: lead, error: supabaseError } = await supabaseAdmin
            .from('cvdp_leads')
            .insert({
                name,
                email,
                total_paid: totalAmount,
                is_paid: false,
                stripe_customer_id: customer.id,
                has_bump1: effective1,
                has_bump2: effective2,
                has_bump3: effective3,
                has_bundle: hasBundle ?? false,
            })
            .select()
            .single();

        if (supabaseError || !lead) {
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
                product: 'create_viral_digital_product',
                hasBump1: effective1 ? 'true' : 'false',
                hasBump2: effective2 ? 'true' : 'false',
                hasBump3: effective3 ? 'true' : 'false',
                hasBundle: hasBundle ? 'true' : 'false',
            },
        });

        // Persist the Payment Intent ID on the lead
        await supabaseAdmin
            .from('cvdp_leads')
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
