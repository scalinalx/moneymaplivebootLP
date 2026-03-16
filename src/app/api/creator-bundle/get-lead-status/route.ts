import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const leadId = searchParams.get('leadId');

        if (!leadId) {
            return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
        }

        const { data: lead, error } = await supabaseAdmin
            .from('creator_bundle_leads')
            .select('id, is_paid, name, email, total_paid, has_launch_stack')
            .eq('id', leadId)
            .single();

        if (error || !lead) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, lead });

    } catch (error) {
        console.error('Get Creator Bundle Lead Status Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
