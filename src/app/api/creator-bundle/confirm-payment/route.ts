import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';

const CREATOR_BUNDLE_SDT_CREDITS = 400;

export async function POST(request: NextRequest) {
    try {
        const { leadId, paymentIntentId } = await request.json();

        if (!leadId || !paymentIntentId) {
            return NextResponse.json({ success: false, error: 'Lead ID and Payment Intent ID are required' }, { status: 400 });
        }

        // Retrieve metadata from Stripe
        let customerEmail = '';
        let customerName = '';
        let hasLaunchStack = false;
        try {
            const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
            customerEmail = pi.metadata?.email || '';
            customerName = pi.metadata?.name || '';
            hasLaunchStack = pi.metadata?.hasLaunchStack === 'true';
        } catch (e) {
            console.warn('Could not retrieve PI metadata:', e);
        }

        // Update lead as paid
        const { error: supabaseError } = await supabaseAdmin
            .from('creator_bundle_leads')
            .update({
                is_paid: true,
                payment_completed_at: new Date().toISOString(),
            })
            .eq('id', leadId)
            .eq('stripe_payment_intent_id', paymentIntentId);

        if (supabaseError) {
            console.error('Supabase Update Error:', supabaseError);
            return NextResponse.json({ success: false, error: 'Failed to update payment status' }, { status: 500 });
        }

        // Create/update SDT credits (bundle always includes SDT)
        let sdtTokenId = null;
        if (customerEmail) {
            try {
                const { data: existingUser } = await supabaseAdmin
                    .from('show_dont_tell_users')
                    .select('*')
                    .eq('email', customerEmail)
                    .single();

                if (existingUser) {
                    const newExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
                    await supabaseAdmin.from('show_dont_tell_users').update({
                        credits: (existingUser.credits || 0) + CREATOR_BUNDLE_SDT_CREDITS,
                        expires_at: newExpiresAt,
                        payment_status: 'completed',
                        payment_completed_at: new Date().toISOString(),
                    }).eq('id', existingUser.id);

                    sdtTokenId = existingUser.token_id;
                } else {
                    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
                    let token = 'SDT-';
                    for (let i = 0; i < 8; i++) {
                        token += chars.charAt(Math.floor(Math.random() * chars.length));
                    }

                    await supabaseAdmin.from('show_dont_tell_users').insert({
                        email: customerEmail,
                        name: customerName,
                        token_id: token,
                        credits: CREATOR_BUNDLE_SDT_CREDITS,
                        payment_status: 'completed',
                        payment_completed_at: new Date().toISOString(),
                    });

                    sdtTokenId = token;
                }
            } catch (sdtError) {
                console.error('Failed to create/update SDT credits:', sdtError);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Payment confirmed',
            sdtTokenId,
            hasLaunchStack,
        });

    } catch (error) {
        console.error('Confirm Payment Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
