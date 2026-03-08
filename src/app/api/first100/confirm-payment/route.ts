import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
    try {
        const { leadId, paymentIntentId } = await request.json();

        if (!leadId || !paymentIntentId) {
            return NextResponse.json({ success: false, error: 'Lead ID and Payment Intent ID are required' }, { status: 400 });
        }

        // Retrieve bump flags from Stripe PI metadata
        let hasBump1 = false, hasBump2 = false, hasBump3 = false, hasBundle = false;
        try {
            const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
            hasBump1 = pi.metadata?.hasBump1 === 'true';
            hasBump2 = pi.metadata?.hasBump2 === 'true';
            hasBump3 = pi.metadata?.hasBump3 === 'true';
            hasBundle = pi.metadata?.hasBundle === 'true';
        } catch (e) {
            console.warn('Could not retrieve PI metadata, defaulting bumps to false', e);
        }

        const { error: supabaseError } = await supabaseAdmin
            .from('first100_leads')
            .update({
                is_paid: true,
                payment_completed_at: new Date().toISOString(),
                has_bump1: hasBump1,
                has_bump2: hasBump2,
                has_bump3: hasBump3,
                has_bundle: hasBundle,
            })
            .eq('id', leadId)
            .eq('stripe_payment_intent_id', paymentIntentId);

        if (supabaseError) {
            console.error('Supabase Update Error:', supabaseError);
            return NextResponse.json({ success: false, error: 'Failed to update payment status' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Payment status updated' });

    } catch (error) {
        console.error('Confirm Payment Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
