import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  console.log('🔔 Webhook received');

  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');

  console.log('📝 Webhook signature present:', !!signature);
  console.log('📝 Webhook secret configured:', !!process.env.STRIPE_WEBHOOK_SECRET);

  if (!signature) {
    console.log('❌ No signature provided');
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('✅ Webhook signature verified');
    console.log('📝 Event type:', event.type);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    console.log('💳 Processing checkout.session.completed');
    const session = event.data.object as any;

    // --- NEW: Handle show_dont_tell purchases ---
    if (session.metadata?.program === 'show_dont_tell') {
      const tokenId = session.metadata.tokenId;
      const creditsToAdd = parseInt(session.metadata.credits || '0');
      const customerEmail = session.customer_details?.email || session.metadata.email || '';
      const customerName = session.customer_details?.name || session.metadata.name || 'Customer';

      console.log(`📝 Show Don't Tell Purchase: Token ID ${tokenId}, adding ${creditsToAdd} credits`);

      try {
        const { data: existingUser } = await supabaseAdmin
          .from('show_dont_tell_users')
          .select('*')
          .eq('token_id', tokenId)
          .single();

        if (existingUser) {
          const newExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
          await supabaseAdmin.from('show_dont_tell_users').update({
            credits: (existingUser.credits || 0) + creditsToAdd,
            expires_at: newExpiresAt,
            payment_status: 'completed',
            payment_completed_at: new Date().toISOString(),
            stripe_customer_id: session.customer,
            amount_paid: session.amount_total,
            stripe_session_id: session.id
          }).eq('id', existingUser.id);
          console.log(`✅ Updated/Topped up SDT User: Token ID ${tokenId}`);
        } else {
          await supabaseAdmin.from('show_dont_tell_users').insert({
            email: customerEmail,
            name: customerName,
            token_id: tokenId,
            credits: creditsToAdd,
            payment_status: 'completed',
            payment_completed_at: new Date().toISOString(),
            stripe_customer_id: session.customer,
            amount_paid: session.amount_total,
            stripe_session_id: session.id
          });
          console.log(`✅ Created NEW SDT user for Token ID ${tokenId}`);
        }
        return NextResponse.json({ received: true });
      } catch (err) {
        console.error("❌ Failed processing show dont tell webhook:", err);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
      }
    }
    // --- END NEW ---

    const leadId = session.metadata?.leadId;

    console.log('📝 Lead ID from metadata:', leadId);
    console.log('📝 Session ID:', session.id);

    if (!leadId) {
      console.error('❌ No leadId found in session metadata');
      return NextResponse.json(
        { error: 'No leadId in metadata' },
        { status: 400 }
      );
    }

    try {
      console.log('🔄 Attempting to update lead in database...');

      // Gather additional details
      const amountTotal: number | null = typeof session.amount_total === 'number' ? session.amount_total : null;
      const amountPaidUnits = amountTotal != null ? amountTotal / 100 : null; // convert cents to currency units
      const currency: string | null = session.currency ? String(session.currency).toUpperCase() : null;
      const productVariant: string | null = session.metadata?.variant ?? null;
      const productName: string | null = session.metadata?.product_name ?? null;

      // Update lead as paid with extra fields
      const { error, data } = await supabaseAdmin
        .from('leads_bootcamp_brands')
        .update({
          has_paid: true,
          stripe_session_id: session.id,
          payment_completed_at: new Date().toISOString(),
          amount_paid: amountPaidUnits,
          currency: currency,
          product_variant: productVariant,
          product_name: productName
        })
        .eq('id', leadId)
        .select();

      if (error) {
        console.error('❌ Failed to update lead payment status:', error);
        return NextResponse.json(
          { error: 'Failed to update lead' },
          { status: 500 }
        );
      }

      console.log('✅ Successfully updated lead:', data);
      console.log(`🎉 Payment completed for lead ${leadId}`);

      // Here you could add additional logic like:
      // - Send confirmation email
      // - Add to workshop attendee list
      // - Trigger integrations with other tools

    } catch (error) {
      console.error('❌ Error processing webhook:', error);
      return NextResponse.json(
        { error: 'Webhook processing failed' },
        { status: 500 }
      );
    }
  } else if (event.type === 'payment_intent.succeeded') {
    // Funnel checkouts (offer-clarity, hit10k, launch-lab, first100, genius-ideas)
    // use Stripe Elements + Payment Intents. The client-side `/confirm-payment`
    // route flips `is_paid` first; this webhook is the safety net that does the
    // same flip if the browser closed before that POST went out.
    //
    // All updates here are IDEMPOTENT — re-running them when the row is already
    // paid is a no-op. Each branch is keyed by `metadata.product` (or `metadata.funnel`
    // for the legacy genius-ideas route).
    const intent = event.data.object as {
      id: string;
      metadata?: Record<string, string>;
    };
    const productKey = intent.metadata?.product || intent.metadata?.funnel || '';
    const leadId = intent.metadata?.leadId;
    console.log('💳 payment_intent.succeeded — product:', productKey, '| leadId:', leadId);

    if (!leadId) {
      console.log('⚠️ No leadId in payment_intent metadata — nothing to update');
      return NextResponse.json({ received: true, skipped: 'no leadId' });
    }

    // Map productKey → { table, paidAtColumn }.
    // `is_paid` column name is consistent across all five tables;
    // only the timestamp column differs (genius_ideas uses `paid_at`).
    const routes: Record<string, { table: string; paidAtColumn: string }> = {
      offer_clarity_sprint:        { table: 'offer_clarity_leads', paidAtColumn: 'payment_completed_at' },
      offer_clarity_what_to_sell_upsell: { table: 'offer_clarity_leads', paidAtColumn: 'what_to_sell_paid_at' },
      offer_clarity_coaching_upsell: { table: 'offer_clarity_leads', paidAtColumn: 'coaching_paid_at' },
      hit10k_workshop:             { table: 'hit10k_leads',        paidAtColumn: 'payment_completed_at' },
      '10k_launch_lab':            { table: 'launch_lab_leads',    paidAtColumn: 'payment_completed_at' },
      first100_workshop:           { table: 'first100_leads',      paidAtColumn: 'payment_completed_at' },
      first100_from_wim_upsell:    { table: 'first100_leads',      paidAtColumn: 'payment_completed_at' },
      '100_genius_ideas':          { table: 'genius_ideas_leads',  paidAtColumn: 'paid_at' },
    };

    const route = routes[productKey];
    if (!route) {
      console.log(`⚠️ No webhook route registered for product '${productKey}' — skipping`);
      return NextResponse.json({ received: true, skipped: `unrouted product: ${productKey}` });
    }

    try {
      const updatePayload: Record<string, unknown> = {
        is_paid: true,
        [route.paidAtColumn]: new Date().toISOString(),
      };

      // Special case: coaching upsell flips a different boolean
      if (productKey === 'offer_clarity_coaching_upsell') {
        updatePayload.has_coaching_upsell = true;
        updatePayload.coaching_payment_intent_id = intent.id;
        delete updatePayload.is_paid;  // base purchase is already paid by the time the upsell fires
      }
      // Special case: "What Do I Even Sell?" upsell flips its own boolean too
      if (productKey === 'offer_clarity_what_to_sell_upsell') {
        updatePayload.has_what_to_sell_upsell = true;
        updatePayload.what_to_sell_payment_intent_id = intent.id;
        delete updatePayload.is_paid;
      }

      const { error } = await supabaseAdmin
        .from(route.table)
        .update(updatePayload)
        .eq('id', leadId);

      if (error) {
        console.error(`❌ Failed to mark ${route.table} lead ${leadId} as paid:`, error);
        return NextResponse.json({ error: 'DB update failed' }, { status: 500 });
      }
      console.log(`✅ Marked ${route.table} lead ${leadId} as paid via webhook`);
    } catch (err) {
      console.error('❌ payment_intent.succeeded handler exception:', err);
      return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
  } else {
    console.log('📝 Ignoring event type:', event.type);
  }

  console.log('✅ Webhook processed successfully');
  return NextResponse.json({ received: true });
}

