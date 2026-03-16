import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { stripe, CREATOR_BUNDLE_PRICE, CREATOR_BUNDLE_BUMP_PRICE } from '@/lib/stripe';

export async function POST(request: NextRequest) {
    try {
        const { email, name, hasLaunchStack } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and name are required' }, { status: 400 });
        }

        let totalAmount = CREATOR_BUNDLE_PRICE;
        if (hasLaunchStack) {
            totalAmount += CREATOR_BUNDLE_BUMP_PRICE;
        }

        // Create or retrieve Stripe customer
        const customers = await stripe.customers.list({ email, limit: 1 });
        let customer = customers.data[0];
        if (!customer) {
            customer = await stripe.customers.create({ email, name });
        }

        // Insert lead into Supabase
        const { data: lead, error: leadError } = await supabaseAdmin
            .from('first100_leads')
            .insert({
                name,
                email,
                total_paid: totalAmount,
                source: 'creator_bundle',
                has_bump1: true,  // Genius Ideas (always in bundle)
                has_bump2: true,  // Hooks (always in bundle)
                has_bump3: true,  // Show Don't Tell (always in bundle)
                has_bundle: true,
                stripe_customer_id: customer.id,
            })
            .select('id')
            .single();

        if (leadError || !lead) {
            console.error('Supabase Lead Error:', leadError);
            return NextResponse.json({ success: false, error: 'Failed to create lead' }, { status: 500 });
        }

        // Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
            customer: customer.id,
            metadata: {
                leadId: lead.id,
                email,
                name,
                product: 'creator_bundle',
                hasSdtBump: 'true',
                hasGeniusBump: 'true',
                hasHooksBump: 'true',
                hasBundle: 'true',
                hasLaunchStack: hasLaunchStack ? 'true' : 'false',
            },
        });

        // Update lead with payment intent ID
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
        console.error('Create Payment Intent Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
