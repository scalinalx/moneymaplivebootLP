import { NextRequest, NextResponse } from 'next/server';
import { stripe, OFFER_CLARITY_COACHING_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: 'leadId required' },
        { status: 400 },
      );
    }

    // Look up the lead's customer for one-click purchase
    const { data: lead, error: fetchError } = await supabaseAdmin
      .from('offer_clarity_leads')
      .select('id, email, name, stripe_customer_id, is_paid')
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

    if (!lead.stripe_customer_id) {
      return NextResponse.json(
        { success: false, error: 'Stripe customer missing' },
        { status: 400 },
      );
    }

    // Try a one-click charge against the saved payment method first
    const paymentMethods = await stripe.paymentMethods.list({
      customer: lead.stripe_customer_id,
      type: 'card',
      limit: 1,
    });

    let paymentIntent;
    if (paymentMethods.data.length > 0) {
      // Off-session charge — instant on success.
      paymentIntent = await stripe.paymentIntents.create({
        amount: OFFER_CLARITY_COACHING_PRICE,
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
          product: 'offer_clarity_coaching_upsell',
        },
      });
    } else {
      // Fallback: create intent and let the page collect a card.
      paymentIntent = await stripe.paymentIntents.create({
        amount: OFFER_CLARITY_COACHING_PRICE,
        currency: 'usd',
        customer: lead.stripe_customer_id,
        receipt_email: lead.email,
        metadata: {
          leadId: lead.id,
          email: lead.email,
          name: lead.name,
          product: 'offer_clarity_coaching_upsell',
        },
      });
    }

    // If off-session succeeded, mark immediately
    if (paymentIntent.status === 'succeeded') {
      await supabaseAdmin
        .from('offer_clarity_leads')
        .update({
          has_coaching_upsell: true,
          coaching_payment_intent_id: paymentIntent.id,
          coaching_paid_at: new Date().toISOString(),
          coaching_price_cents: OFFER_CLARITY_COACHING_PRICE,
          total_paid_cents: (await currentTotal(lead.id)) + OFFER_CLARITY_COACHING_PRICE,
        })
        .eq('id', lead.id);

      return NextResponse.json({
        success: true,
        oneClick: true,
        paymentIntentId: paymentIntent.id,
      });
    }

    // Otherwise, return clientSecret so the page can finish via Elements
    return NextResponse.json({
      success: true,
      oneClick: false,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: unknown) {
    console.error('offer-clarity coaching upsell error:', error);
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
