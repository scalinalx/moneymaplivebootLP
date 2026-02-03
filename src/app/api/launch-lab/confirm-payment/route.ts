import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { leadId, paymentIntentId } = await request.json();

        if (!leadId || !paymentIntentId) {
            return NextResponse.json({ success: false, error: 'Lead ID and Payment Intent ID are required' }, { status: 400 });
        }

        // Update the lead in Supabase to mark as paid
        const { error: supabaseError } = await supabaseAdmin
            .from('launch_lab_leads')
            .update({
                is_paid: true,
                payment_completed_at: new Date().toISOString()
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
