import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';
import { UNSTUCK_SDT_BUMP_CREDITS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
    try {
        const { leadId, paymentIntentId } = await request.json();

        if (!leadId || !paymentIntentId) {
            return NextResponse.json({ success: false, error: 'Lead ID and Payment Intent ID are required' }, { status: 400 });
        }

        // Retrieve metadata from Stripe Payment Intent
        let hasSdtBump = false;
        let hasGeniusBump = false;
        let hasHooksBump = false;
        let hasBundle = false;
        let customerEmail = '';
        let customerName = '';
        try {
            const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
            hasSdtBump = pi.metadata?.hasSdtBump === 'true';
            hasGeniusBump = pi.metadata?.hasGeniusBump === 'true';
            hasHooksBump = pi.metadata?.hasHooksBump === 'true';
            hasBundle = pi.metadata?.hasBundle === 'true';
            customerEmail = pi.metadata?.email || '';
            customerName = pi.metadata?.name || '';
        } catch (e) {
            console.warn('Could not retrieve PI metadata:', e);
        }

        // Update lead as paid
        const { error: supabaseError } = await supabaseAdmin
            .from('unstuck_leads')
            .update({
                is_paid: true,
                payment_completed_at: new Date().toISOString(),
                has_bump1: hasGeniusBump,
                has_bump2: hasHooksBump,
                has_bump3: hasSdtBump,
                has_bundle: hasBundle,
            })
            .eq('id', leadId)
            .eq('stripe_payment_intent_id', paymentIntentId);

        if (supabaseError) {
            console.error('Supabase Update Error:', supabaseError);
            return NextResponse.json({ success: false, error: 'Failed to update payment status' }, { status: 500 });
        }

        // If SDT bump was purchased (individually or via bundle), create/update show_dont_tell_users entry with credits
        let sdtTokenId = null;
        if (hasSdtBump && customerEmail) {
            try {
                // Check if user already has an SDT account
                const { data: existingUser } = await supabaseAdmin
                    .from('show_dont_tell_users')
                    .select('*')
                    .eq('email', customerEmail)
                    .single();

                if (existingUser) {
                    // Top up existing user
                    const newExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
                    await supabaseAdmin.from('show_dont_tell_users').update({
                        credits: (existingUser.credits || 0) + UNSTUCK_SDT_BUMP_CREDITS,
                        expires_at: newExpiresAt,
                        payment_status: 'completed',
                        payment_completed_at: new Date().toISOString(),
                    }).eq('id', existingUser.id);

                    sdtTokenId = existingUser.token_id;
                    console.log(`Topped up SDT credits for existing user: ${sdtTokenId} (+${UNSTUCK_SDT_BUMP_CREDITS})`);
                } else {
                    // Generate new token
                    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
                    let token = 'SDT-';
                    for (let i = 0; i < 8; i++) {
                        token += chars.charAt(Math.floor(Math.random() * chars.length));
                    }

                    await supabaseAdmin.from('show_dont_tell_users').insert({
                        email: customerEmail,
                        name: customerName,
                        token_id: token,
                        credits: UNSTUCK_SDT_BUMP_CREDITS,
                        payment_status: 'completed',
                        payment_completed_at: new Date().toISOString(),
                    });

                    sdtTokenId = token;
                    console.log(`Created new SDT user: ${token} with ${UNSTUCK_SDT_BUMP_CREDITS} credits`);
                }
            } catch (sdtError) {
                console.error('Failed to create/update SDT credits:', sdtError);
                // Non-blocking — payment still succeeded
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Payment status updated',
            sdtTokenId: sdtTokenId,
        });

    } catch (error) {
        console.error('Confirm Payment Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
