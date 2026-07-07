import { NextRequest, NextResponse } from 'next/server';
import { stripe, BOOTCAMP_FOUNDING_PRICE, BOOTCAMP_STANDARD_PRICE, BOOTCAMP_FOUNDING_DEADLINE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

// Creates a PaymentIntent for the 6-Figures Newsletter Bootcamp. The charged
// amount is founding vs standard, computed server-side from the deadline (the
// client cannot pick the price). The lead row is recorded best-effort: the
// bootcamp_leads table is added in a later step, so a missing table degrades
// gracefully — the payment still works and the metadata carries everything the
// webhook needs to reconcile once the table exists.
export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();
    if (!email || !name) {
      return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
    }

    const isFounding = new Date() < new Date(BOOTCAMP_FOUNDING_DEADLINE);
    const amount = isFounding ? BOOTCAMP_FOUNDING_PRICE : BOOTCAMP_STANDARD_PRICE;

    // Find or create the Stripe customer.
    let customer;
    const customers = await stripe.customers.list({ email, limit: 1 });
    customer = customers.data.length > 0 ? customers.data[0] : await stripe.customers.create({ email, name });

    // Best-effort lead record (table may not exist yet — see note above).
    let leadId: string | null = null;
    try {
      const { data: lead, error } = await supabaseAdmin
        .from('bootcamp_leads')
        .insert({
          name,
          email,
          tier: isFounding ? 'founding' : 'standard',
          total_paid: amount,
          is_paid: false,
          stripe_customer_id: customer.id,
          created_at: new Date().toISOString(),
        })
        .select('id')
        .single();
      if (!error && lead) leadId = lead.id;
      else if (error) console.warn('[bootcamp] lead insert skipped (migration applied?):', error.message);
    } catch (e) {
      console.warn('[bootcamp] lead insert error (non-fatal):', e instanceof Error ? e.message : e);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
      setup_future_usage: 'off_session',
      receipt_email: email,
      metadata: {
        leadId: leadId ?? '',
        email,
        name,
        product: 'bootcamp',
        tier: isFounding ? 'founding' : 'standard',
      },
    });

    if (leadId) {
      await supabaseAdmin
        .from('bootcamp_leads')
        .update({ stripe_payment_intent_id: paymentIntent.id })
        .eq('id', leadId)
        .then(undefined, () => {});
    }

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      leadId,
      amount,
    });
  } catch (error) {
    console.error('[bootcamp] create-payment-intent error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
