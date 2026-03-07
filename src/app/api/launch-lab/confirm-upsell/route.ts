import { NextRequest, NextResponse } from 'next/server';
import { stripe, LAUNCHLAB_COACHING_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { leadId } = await request.json();

        if (!leadId) {
            return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
        }

        // 1. Fetch the lead - check both tables
        let lead;
        let table = 'launch_lab_leads';

        // Try launch_lab_leads first
        const { data: labLead } = await supabaseAdmin
            .from('launch_lab_leads')
            .select('email, stripe_customer_id, is_paid, total_paid')
            .eq('id', leadId)
            .single();

        if (labLead) {
            lead = labLead;
            table = 'launch_lab_leads';
        } else {
            // Try first100_leads
            const { data: f100Lead } = await supabaseAdmin
                .from('first100_leads')
                .select('email, stripe_customer_id, is_paid, total_paid')
                .eq('id', leadId)
                .single();

            if (f100Lead) {
                lead = f100Lead;
                table = 'first100_leads';
            }
        }

        if (!lead) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        }

        if (!lead.is_paid && leadId !== 'TEST') {
            return NextResponse.json({ success: false, error: 'Main product not paid' }, { status: 400 });
        }

        // Determine Stripe Customer ID
        let stripeCustomerId = lead.stripe_customer_id;
        if (!stripeCustomerId) {
            const customers = await stripe.customers.list({ email: lead.email, limit: 1 });
            if (customers.data.length > 0) {
                stripeCustomerId = customers.data[0].id;
            }
        }

        if (!stripeCustomerId) {
            return NextResponse.json({ success: false, error: 'Stripe customer not found' }, { status: 400 });
        }

        // Test mode bypass
        if (leadId === 'TEST') {
            await supabaseAdmin.from(table).update({ has_upsell: true }).eq('id', leadId);
            return NextResponse.json({ success: true });
        }

        // 2. Find the latest successful PaymentMethod for this customer
        const paymentMethods = await stripe.paymentMethods.list({
            customer: stripeCustomerId,
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
            customer: stripeCustomerId,
            payment_method: paymentMethodId,
            off_session: true,
            confirm: true,
            metadata: {
                leadId: leadId,
                email: lead.email,
                product: '10k_launch_lab_upsell',
                upsell_name: '1:1 Sales Coaching Session with Ana',
                source_table: table
            }
        });

        if (paymentIntent.status === 'succeeded') {
            // 4. Update the primary table
            await supabaseAdmin
                .from(table)
                .update({
                    has_upsell: true,
                    total_paid: (lead.total_paid || 0) + LAUNCHLAB_COACHING_PRICE
                })
                .eq('id', leadId);

            // 5. Also update First 100 leads table if user exists there (for consolidated success page)
            if (lead.email) {
                await supabaseAdmin
                    .from('first100_leads')
                    .update({ has_upsell: true })
                    .eq('email', lead.email);
            }

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: `Payment status: ${paymentIntent.status}` }, { status: 400 });
        }

    } catch (error: any) {
        console.error('Upsell execution error:', error);
        return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
