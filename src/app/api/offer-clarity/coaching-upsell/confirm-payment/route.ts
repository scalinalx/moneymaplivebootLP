import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { OFFER_CLARITY_COACHING_PRICE } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { leadId, paymentIntentId } = await request.json();

    if (!leadId || !paymentIntentId) {
      return NextResponse.json(
        { success: false, error: 'leadId and paymentIntentId required' },
        { status: 400 },
      );
    }

    // Fetch existing lead to compute updated total
    const { data: lead } = await supabaseAdmin
      .from('offer_clarity_leads')
      .select('total_paid_cents')
      .eq('id', leadId)
      .single();
    const newTotal = (lead?.total_paid_cents ?? 0) + OFFER_CLARITY_COACHING_PRICE;

    const { error } = await supabaseAdmin
      .from('offer_clarity_leads')
      .update({
        has_coaching_upsell: true,
        coaching_payment_intent_id: paymentIntentId,
        coaching_paid_at: new Date().toISOString(),
        coaching_price_cents: OFFER_CLARITY_COACHING_PRICE,
        total_paid_cents: newTotal,
      })
      .eq('id', leadId);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update upsell status' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('coaching-upsell confirm error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
