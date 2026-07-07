import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Marks a bootcamp lead paid immediately after the client confirms payment. The
// Stripe webhook (product = 'bootcamp') is the reliable backstop if the client
// never fires this (tab closed). Idempotent — both paths set the same fields.
export async function POST(request: NextRequest) {
  try {
    const { leadId, paymentIntentId } = await request.json();
    if (!leadId || !paymentIntentId) {
      return NextResponse.json({ success: false, error: 'leadId and paymentIntentId are required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('bootcamp_leads')
      .update({ is_paid: true, payment_completed_at: new Date().toISOString() })
      .eq('id', leadId)
      .eq('stripe_payment_intent_id', paymentIntentId);

    if (error) {
      console.error('[bootcamp] confirm-payment update error:', error.message);
      return NextResponse.json({ success: false, error: 'Could not update payment status' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[bootcamp] confirm-payment error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
