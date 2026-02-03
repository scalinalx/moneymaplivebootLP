import { NextRequest, NextResponse } from 'next/server';
import { stripe, LAUNCHLAB_COACHING_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { leadId } = await request.json();

        if (!leadId) {
            return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
        }

        // 1. Fetch the lead to get stripe_customer_id
        const { data: lead, error: fetchError } = await supabaseAdmin
            .from('launch_lab_leads')
            .select('email, stripe_customer_id, is_paid')
            .eq('id', leadId)
            .single();

        if (fetchError || !lead) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        }

        if (!lead.is_paid && leadId !== 'TEST') {
            return NextResponse.json({ success: false, error: 'Main product not paid' }, { status: 400 });
        }

        // Test mode bypass
        if (leadId === 'TEST') {
            await supabaseAdmin.from('launch_lab_leads').update({ has_upsell: true }).eq('id', leadId);
            return NextResponse.json({ success: true });
        }

        // 2. Find the latest successful PaymentMethod for this customer
        const paymentMethods = await stripe.paymentMethods.list({
            customer: lead.stripe_customer_id,
            type: 'card',
        });

        if (paymentMethods.data.length === 0) {
            return NextResponse.json({ success: false, error: 'No saved payment method found' }, { status: 400 });
        }

        const paymentMethodId = paymentMethods.data[0].id;

        // 3. Create and confirm a new PaymentIntent for the upsell
        const paymentIntent = await stripe.paymentIntents.create({
            amount: LAUNCHLAB_COACHING_PRICE,
            currency: 'usd',
            customer: lead.stripe_customer_id,
            payment_method: paymentMethodId,
            off_session: true,
            confirm: true,
            metadata: {
                leadId: leadId,
                email: lead.email,
                product: '10k_launch_lab_upsell',
                upsell_name: '1:1 Sales Coaching Session with Ana'
            }
        });

        if (paymentIntent.status === 'succeeded') {
            // 4. Update Supabase
            await supabaseAdmin
                .from('launch_lab_leads')
                .update({
                    has_upsell: true,
                    total_paid: (await supabaseAdmin.from('launch_lab_leads').select('total_paid').eq('id', leadId).single()).data?.total_paid + LAUNCHLAB_COACHING_PRICE
                })
                .eq('id', leadId);

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: `Payment status: ${paymentIntent.status}` }, { status: 400 });
        }

    } catch (error: any) {
        console.error('Upsell execution error:', error);
        return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
