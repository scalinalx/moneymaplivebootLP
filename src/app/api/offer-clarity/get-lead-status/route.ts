import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: 'leadId required' },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from('offer_clarity_leads')
      .select(
        'id, name, email, is_paid, has_bump_launch_stack, has_bump_hooks, has_bump_offer_genius, has_bump_bundle, has_coaching_upsell, total_paid_cents, payment_completed_at, stripe_customer_id',
      )
      .eq('id', leadId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, lead: data });
  } catch (error) {
    console.error('offer-clarity get-lead-status error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
