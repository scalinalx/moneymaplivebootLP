import { NextRequest, NextResponse } from 'next/server';
import { stripe, FIRST100_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        // 1. Create the lead in Supabase (Pending state)
        const { data: lead, error: supabaseError } = await supabaseAdmin
            .from('first100_leads')
            .insert({
                name,
                email,
                total_paid: FIRST100_PRICE,
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
            amount: FIRST100_PRICE,
            currency: 'usd',
            receipt_email: email,
            metadata: {
                leadId: lead.id,
                email,
                name,
                product: 'first100_workshop'
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
