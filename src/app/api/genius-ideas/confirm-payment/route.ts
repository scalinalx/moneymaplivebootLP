import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { paymentIntentId, leadId } = await request.json();

        if (!paymentIntentId || !leadId) {
            return NextResponse.json({ success: false, error: 'Missing required parameters' }, { status: 400 });
        }

        // Update lead status to paid
        const { error } = await supabaseAdmin
            .from('genius_ideas_leads')
            .update({
                is_paid: true,
                paid_at: new Date().toISOString()
            })
            .eq('id', leadId)
            .eq('stripe_payment_intent_id', paymentIntentId); // Security check

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ success: false, error: 'Failed to update lead status' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Confirmation Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
