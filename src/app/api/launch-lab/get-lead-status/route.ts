import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');

    if (!leadId) {
        return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('launch_lab_leads')
            .select('is_paid, has_order_bump, has_order_bump2, has_upsell')
            .eq('id', leadId)
            .single();

        if (error) {
            console.error('Fetch lead error:', error);
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, lead: data });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
