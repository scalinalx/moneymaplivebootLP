import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { addSubscriberWithTag, KIT_HIT10K_TAG } from '@/lib/kit';

export async function POST(request: NextRequest) {
    try {
        const { leadId, paymentIntentId } = await request.json();

        if (!leadId || !paymentIntentId) {
            return NextResponse.json({ success: false, error: 'Lead ID and Payment Intent ID are required' }, { status: 400 });
        }

        // Update the lead in Supabase to mark as paid
        const { data: lead, error: supabaseError } = await supabaseAdmin
            .from('hit10k_leads')
            .update({
                is_paid: true,
                payment_completed_at: new Date().toISOString()
            })
            .eq('id', leadId)
            .eq('stripe_payment_intent_id', paymentIntentId)
            .select('name, email')
            .maybeSingle();

        if (supabaseError) {
            console.error('Supabase Update Error:', supabaseError);
            return NextResponse.json({ success: false, error: 'Failed to update payment status' }, { status: 500 });
        }

        // Enroll the buyer in Kit (best-effort — never blocks the success response).
        // The Stripe webhook is the backstop if the browser closed before this ran.
        if (lead?.email) {
            const firstName = String(lead.name || '').trim().split(/\s+/)[0];
            await addSubscriberWithTag(lead.email, firstName, KIT_HIT10K_TAG);
        }

        return NextResponse.json({ success: true, message: 'Payment status updated' });

    } catch (error) {
        console.error('Confirm Payment Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
