import { NextRequest, NextResponse } from 'next/server';
import { stripe, WORKSHOP_PRICE, BUNDLE_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import type { ApiResponse, StripeCheckoutSession } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { leadId, promoCode, variant } = await request.json();

    if (!leadId) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Lead ID is required'
      }, { status: 400 });
    }

    // Get lead information
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads_bootcamp_brands')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Lead not found'
      }, { status: 404 });
    }

    // IMPORTANT: Do not block returning customers who previously purchased
    // a different program (e.g., Money Map). We allow creating a new
    // Checkout session regardless of historical has_paid status.

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    // Choose price and product naming based on variant
    const isBundle = typeof variant === 'string' && variant.toLowerCase() === 'bundle';
    const chosenPrice = isBundle ? BUNDLE_PRICE : WORKSHOP_PRICE;
    const productName = isBundle
      ? 'Build to Profit + Money Map bundle'
      : 'Build to Profit liveworkshop';
    const productDescription = isBundle
      ? 'Bundle: Workshop + extras. 2x live sessions, templates, community access'
      : 'Cohort-based program: 2x live implementation sessions, templates, community access';

    // Prepare checkout session parameters
    const checkoutParams: any = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: productDescription,
            },
            unit_amount: chosenPrice,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      // Always send cancel back to upsell with the same leadId so the user can choose again
      cancel_url: `${baseUrl}/upsell?leadId=${encodeURIComponent(leadId)}`,
      customer_email: lead.email,
      metadata: {
        leadId: leadId,
        name: lead.name,
        program: 'build_to_profit',
        variant: isBundle ? 'bundle' : 'standard',
        product_name: productName
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_creation: 'always', // Required for Rewardful integration
    };

    // Optionally pre-apply a promotion code (by code) if provided
    if (promoCode && typeof promoCode === 'string') {
      try {
        const list = await stripe.promotionCodes.list({ code: promoCode, active: true, limit: 1 });
        const pc = list.data[0];
        if (pc) {
          checkoutParams.discounts = [{ promotion_code: pc.id }];
        }
      } catch (e) {
        // Non-fatal: if lookup fails, continue without pre-applied discount
        console.warn('Promo code lookup failed:', e);
      }
    }

    // Add client_reference_id if referral ID exists (required for Rewardful)
    if (lead.referral_id) {
      checkoutParams.client_reference_id = lead.referral_id;
      console.log('Including Rewardful referral ID in checkout:', lead.referral_id);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create(checkoutParams);

    // Update lead with checkout session info
    const { error: updateError } = await supabaseAdmin
      .from('leads_bootcamp_brands')
      .update({
        has_checkout_session: true,
        stripe_session_id: session.id
      })
      .eq('id', leadId);

    if (updateError) {
      console.error('Failed to update lead:', updateError);
      // Don't fail the request, just log the error
    }

    const checkoutData: StripeCheckoutSession = {
      sessionId: session.id,
      url: session.url!
    };

    return NextResponse.json<ApiResponse<StripeCheckoutSession>>({
      success: true,
      data: checkoutData,
      message: 'Checkout session created successfully'
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to create checkout session'
    }, { status: 500 });
  }
} 
