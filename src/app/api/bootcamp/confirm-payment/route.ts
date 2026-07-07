import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { addSubscriberWithTag, KIT_BOOTCAMP_TAG } from '@/lib/kit';

// Marks a bootcamp lead paid immediately after the client confirms payment. The
// Stripe webhook (product = 'bootcamp') is the reliable backstop if the client
// never fires this (tab closed). Idempotent — both paths set the same fields
// and both add the buyer to Kit with the bootcamp tag (re-tagging is a no-op).
export async function POST(request: NextRequest) {
  try {
    const { leadId, paymentIntentId } = await request.json();
    if (!leadId || !paymentIntentId) {
      return NextResponse.json({ success: false, error: 'leadId and paymentIntentId are required' }, { status: 400 });
    }

    const { data: lead, error } = await supabaseAdmin
      .from('bootcamp_leads')
      .update({ is_paid: true, payment_completed_at: new Date().toISOString() })
      .eq('id', leadId)
      .eq('stripe_payment_intent_id', paymentIntentId)
      .select('name, email')
      .maybeSingle();

    if (error) {
      console.error('[bootcamp] confirm-payment update error:', error.message);
      return NextResponse.json({ success: false, error: 'Could not update payment status' }, { status: 500 });
    }

    // Enroll the buyer in Kit (best-effort — never blocks the success response).
    if (lead?.email) {
      const firstName = String(lead.name || '').trim().split(/\s+/)[0];
      await addSubscriberWithTag(lead.email, firstName, KIT_BOOTCAMP_TAG);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[bootcamp] confirm-payment error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
