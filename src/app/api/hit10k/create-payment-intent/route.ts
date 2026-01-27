import { NextRequest, NextResponse } from 'next/server';
import { stripe, HIT10K_PRICE, HIT10K_BUMP_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name, hasOrderBump } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        // Calculate total price
        let totalAmount = HIT10K_PRICE;
        if (hasOrderBump) {
            totalAmount += HIT10K_BUMP_PRICE;
        }

        // 1. Create the lead in Supabase first (Pending state)
        const { data: lead, error: supabaseError } = await supabaseAdmin
            .from('hit10k_leads')
            .insert({
                name,
                email,
                has_order_bump: hasOrderBump,
                total_paid: totalAmount,
                is_paid: false
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
            receipt_email: email,
            metadata: {
                leadId: lead.id,
                email: email,
                name: name,
                hasOrderBump: hasOrderBump ? 'true' : 'false',
                product: 'hit10k_workshop'
            }
        });

        // 3. Update the lead with the Payment Intent ID
        await supabaseAdmin
            .from('hit10k_leads')
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
