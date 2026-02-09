import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        // Insert into launch_lab_leads with is_waitlist: true
        const { data, error: supabaseError } = await supabaseAdmin
            .from('launch_lab_leads')
            .insert({
                name,
                email,
                is_waitlist: true,
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (supabaseError) {
            console.error('Supabase Waitlist Error:', supabaseError);
            // Handle unique constraint if they are already on the list
            if (supabaseError.code === '23505') {
                return NextResponse.json({ success: true, message: 'Already on waitlist' });
            }
            return NextResponse.json({ success: false, error: 'Failed to join waitlist' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully joined waitlist',
            leadId: data.id
        });

    } catch (error) {
        console.error('Waitlist API Exception:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
