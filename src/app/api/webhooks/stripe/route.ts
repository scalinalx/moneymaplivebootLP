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
            expires_at: newExpiresAt
          }).eq('id', existingUser.id);
          console.log(`✅ Topped up Token ID ${tokenId}`);
        } else {
          await supabaseAdmin.from('show_dont_tell_users').insert({
            email: customerEmail,
            name: customerName,
            token_id: tokenId,
            credits: creditsToAdd
          });
          console.log(`✅ Created NEW user for Token ID ${tokenId}`);
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
  } else {
    console.log('📝 Ignoring event type:', event.type);
  }

  console.log('✅ Webhook processed successfully');
  return NextResponse.json({ received: true });
} 
