import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { leadId } = await request.json();

        if (!leadId) {
            return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
        }

        // Update the lead record to reflect the upsell purchase
        const { error } = await supabaseAdmin
            .from('hit10k_leads')
            .update({ has_upsell: true })
            .eq('id', leadId);

        if (error) {
            console.error('Update upsell error:', error);
            return NextResponse.json({ success: false, error: 'Failed to update upsell status' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
