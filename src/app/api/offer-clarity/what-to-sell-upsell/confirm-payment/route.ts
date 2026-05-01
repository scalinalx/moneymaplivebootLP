import { NextRequest, NextResponse } from 'next/server';
import { stripe, OFFER_CLARITY_WHAT_TO_SELL_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * Confirms the "What Do I Even Sell?" upsell payment from the embedded Elements
 * fallback path, and flips the flag on offer_clarity_leads. Webhook is the
 * server-side safety net; this route is the synchronous client-side flip.
 */
export async function POST(request: NextRequest) {
  try {
    const { leadId, paymentIntentId } = await request.json();

    if (!leadId || !paymentIntentId) {
      return NextResponse.json(
        { success: false, error: 'leadId and paymentIntentId required' },
        { status: 400 },
      );
    }

    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (intent.status !== 'succeeded') {
      return NextResponse.json(
        { success: false, error: `PaymentIntent status: ${intent.status}` },
        { status: 400 },
      );
    }

    const { data: existing } = await supabaseAdmin
      .from('offer_clarity_leads')
      .select('total_paid_cents, has_what_to_sell_upsell')
      .eq('id', leadId)
      .single();

    // Idempotent — webhook may have already flipped it.
    if (existing?.has_what_to_sell_upsell) {
      return NextResponse.json({ success: true, alreadyMarked: true });
    }

    const { error } = await supabaseAdmin
      .from('offer_clarity_leads')
      .update({
        has_what_to_sell_upsell: true,
        what_to_sell_payment_intent_id: paymentIntentId,
        what_to_sell_paid_at: new Date().toISOString(),
        what_to_sell_price_cents: OFFER_CLARITY_WHAT_TO_SELL_PRICE,
        total_paid_cents:
          (existing?.total_paid_cents ?? 0) + OFFER_CLARITY_WHAT_TO_SELL_PRICE,
      })
      .eq('id', leadId);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : 'unknown' },
      { status: 500 },
    );
  }
}
