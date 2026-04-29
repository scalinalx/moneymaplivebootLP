import { NextRequest, NextResponse } from 'next/server';
import {
  stripe,
  OFFER_CLARITY_PRICE,
  OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE,
  OFFER_CLARITY_BUMP_HOOKS_PRICE,
  OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE,
  OFFER_CLARITY_BUMP_BUNDLE_PRICE,
} from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

interface RequestBody {
  email: string;
  name: string;
  hasBumpLaunchStack?: boolean;
  hasBumpHooks?: boolean;
  hasBumpOfferGenius?: boolean;
  hasBumpBundle?: boolean;
  utm?: { source?: string; medium?: string; campaign?: string };
  referrer?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const {
      email,
      name,
      hasBumpLaunchStack = false,
      hasBumpHooks = false,
      hasBumpOfferGenius = false,
      hasBumpBundle = false,
      utm,
      referrer,
    } = body;

    if (!email || !name) {
      return NextResponse.json(
        { success: false, error: 'Email and Name are required' },
        { status: 400 },
      );
    }

    // Bundle short-circuits the individual flags — bundle covers all 3.
    const bundleSelected = hasBumpBundle;
    const launchStackEffective = bundleSelected || hasBumpLaunchStack;
    const hooksEffective = bundleSelected || hasBumpHooks;
    const offerGeniusEffective = bundleSelected || hasBumpOfferGenius;

    let bumpsPriceCents = 0;
    if (bundleSelected) {
      bumpsPriceCents = OFFER_CLARITY_BUMP_BUNDLE_PRICE;
    } else {
      if (hasBumpLaunchStack) bumpsPriceCents += OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE;
      if (hasBumpHooks) bumpsPriceCents += OFFER_CLARITY_BUMP_HOOKS_PRICE;
      if (hasBumpOfferGenius) bumpsPriceCents += OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE;
    }
    const totalAmount = OFFER_CLARITY_PRICE + bumpsPriceCents;

    // Get-or-create Stripe customer
    let customer;
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({ email, name });
    }

    // Capture context for marketing
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      null;
    const userAgent = request.headers.get('user-agent') || null;

    // 1. Insert pending lead
    const { data: lead, error: insertError } = await supabaseAdmin
      .from('offer_clarity_leads')
      .insert({
        name,
        email,
        stripe_customer_id: customer.id,
        has_bump_launch_stack: launchStackEffective,
        has_bump_hooks: hooksEffective,
        has_bump_offer_genius: offerGeniusEffective,
        has_bump_bundle: bundleSelected,
        base_price_cents: OFFER_CLARITY_PRICE,
        bumps_price_cents: bumpsPriceCents,
        total_paid_cents: totalAmount,
        is_paid: false,
        utm_source: utm?.source || null,
        utm_medium: utm?.medium || null,
        utm_campaign: utm?.campaign || null,
        referrer_url: referrer || null,
        user_agent: userAgent,
        ip_address: ipAddress,
      })
      .select()
      .single();

    if (insertError || !lead) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json(
        { success: false, error: 'Failed to create lead record' },
        { status: 500 },
      );
    }

    // 2. Create Stripe Payment Intent (saving payment method for upsell)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      customer: customer.id,
      setup_future_usage: 'off_session',
      receipt_email: email,
      metadata: {
        leadId: lead.id,
        email,
        name,
        product: 'offer_clarity_sprint',
        bumpLaunchStack: launchStackEffective ? 'true' : 'false',
        bumpHooks: hooksEffective ? 'true' : 'false',
        bumpOfferGenius: offerGeniusEffective ? 'true' : 'false',
        bumpBundle: bundleSelected ? 'true' : 'false',
      },
    });

    // 3. Persist payment intent on lead
    await supabaseAdmin
      .from('offer_clarity_leads')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', lead.id);

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      leadId: lead.id,
    });
  } catch (error) {
    console.error('offer-clarity create-payment-intent error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
