import { NextRequest, NextResponse } from 'next/server';
import { stripe, OFFER_CLARITY_WHAT_TO_SELL_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * "What Do I Even Sell?" workshop-recording upsell — sits between the main
 * Offer Clarity Sprint checkout and the 1:1 coaching upsell.
 *
 * Same one-click off-session pattern as the coaching upsell: try to charge the
 * saved card immediately; fall back to embedded Stripe Elements on the page if
 * no card is on file.
 */
export async function POST(request: NextRequest) {
  try {
    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: 'leadId required' },
        { status: 400 },
      );
    }

    const { data: lead, error: fetchError } = await supabaseAdmin
      .from('offer_clarity_leads')
      .select('id, email, name, stripe_customer_id, is_paid, has_what_to_sell_upsell')
      .eq('id', leadId)
      .single();

    if (fetchError || !lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      );
    }

    if (!lead.is_paid) {
      return NextResponse.json(
        { success: false, error: 'Base purchase not completed' },
        { status: 400 },
      );
    }

    if (lead.has_what_to_sell_upsell) {
      return NextResponse.json({ success: true, alreadyPurchased: true });
    }

    if (!lead.stripe_customer_id) {
      return NextResponse.json(
        { success: false, error: 'Stripe customer missing' },
        { status: 400 },
      );
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: lead.stripe_customer_id,
      type: 'card',
      limit: 1,
    });

    let paymentIntent;
    if (paymentMethods.data.length > 0) {
      paymentIntent = await stripe.paymentIntents.create({
        amount: OFFER_CLARITY_WHAT_TO_SELL_PRICE,
        currency: 'usd',
        customer: lead.stripe_customer_id,
        payment_method: paymentMethods.data[0].id,
        off_session: true,
        confirm: true,
        receipt_email: lead.email,
        metadata: {
          leadId: lead.id,
          email: lead.email,
          name: lead.name,
          product: 'offer_clarity_what_to_sell_upsell',
        },
      });
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount: OFFER_CLARITY_WHAT_TO_SELL_PRICE,
        currency: 'usd',
        customer: lead.stripe_customer_id,
        receipt_email: lead.email,
        metadata: {
          leadId: lead.id,
          email: lead.email,
          name: lead.name,
          product: 'offer_clarity_what_to_sell_upsell',
        },
      });
    }

    if (paymentIntent.status === 'succeeded') {
      await supabaseAdmin
        .from('offer_clarity_leads')
        .update({
          has_what_to_sell_upsell: true,
          what_to_sell_payment_intent_id: paymentIntent.id,
          what_to_sell_paid_at: new Date().toISOString(),
          what_to_sell_price_cents: OFFER_CLARITY_WHAT_TO_SELL_PRICE,
          total_paid_cents:
            (await currentTotal(lead.id)) + OFFER_CLARITY_WHAT_TO_SELL_PRICE,
        })
        .eq('id', lead.id);

      return NextResponse.json({
        success: true,
        oneClick: true,
        paymentIntentId: paymentIntent.id,
      });
    }

    return NextResponse.json({
      success: true,
      oneClick: false,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: unknown) {
    console.error('offer-clarity what-to-sell upsell error:', error);
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

async function currentTotal(leadId: string): Promise<number> {
  const { data } = await supabaseAdmin
    .from('offer_clarity_leads')
    .select('total_paid_cents')
    .eq('id', leadId)
    .single();
  return data?.total_paid_cents ?? 0;
}
