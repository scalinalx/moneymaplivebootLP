import { NextRequest, NextResponse } from 'next/server';
import { stripe, GENIUS_IDEAS_PRICE, GENIUS_IDEAS_BUMP_PRICE, GENIUS_IDEAS_BUMP2_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name, hasOrderBump, hasOrderBump2 } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        // Calculate total price
        let totalAmount = GENIUS_IDEAS_PRICE;
        const products = ['100_genius_ideas'];

        if (hasOrderBump) {
            totalAmount += GENIUS_IDEAS_BUMP_PRICE;
            products.push('offer_genius');
        }

        if (hasOrderBump2) {
            totalAmount += GENIUS_IDEAS_BUMP2_PRICE;
            products.push('launch_stack');
        }

        // 1. Create the lead in Supabase first (Pending state)
        // Using 'genius_ideas_leads' table
        const { data: lead, error: supabaseError } = await supabaseAdmin
            .from('genius_ideas_leads')
            .insert({
                name,
                email,
                has_order_bump: hasOrderBump,
                has_order_bump2: hasOrderBump2,
                total_paid: totalAmount,
                products: products,
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
                hasOrderBump2: hasOrderBump2 ? 'true' : 'false',
                funnel: '100_genius_ideas'
            }
        });

        // 3. Update the lead with the Payment Intent ID
        await supabaseAdmin
            .from('genius_ideas_leads')
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
