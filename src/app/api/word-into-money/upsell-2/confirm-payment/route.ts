import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { leadId, paymentIntentId, wimLeadId } = await request.json();

        if (!leadId || !paymentIntentId) {
            return NextResponse.json({ success: false, error: 'Lead ID and Payment Intent ID are required' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('launch_lab_leads')
            .update({
                is_paid: true,
                payment_completed_at: new Date().toISOString(),
            })
            .eq('id', leadId)
            .eq('stripe_payment_intent_id', paymentIntentId);

        if (error) {
            console.error('Supabase Update Error:', error);
            return NextResponse.json({ success: false, error: 'Failed to update payment status' }, { status: 500 });
        }

        if (wimLeadId) {
            await supabaseAdmin
                .from('wim_leads')
                .update({ has_upsell2: true })
                .eq('id', wimLeadId);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Confirm Upsell 2 Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
