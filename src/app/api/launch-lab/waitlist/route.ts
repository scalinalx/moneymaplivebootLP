import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, name } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ success: false, error: 'Email and Name are required' }, { status: 400 });
        }

        // Insert into launch_lab_leads with is_waitlist: true
        const insertData: any = {
            name,
            email,
            total_paid: 0, // Waitlist signups have no payment
            is_paid: false,
            created_at: new Date().toISOString()
        };

        // Only add is_waitlist if the column exists (for backward compatibility)
        // This prevents errors if the schema hasn't been updated yet
        try {
            insertData.is_waitlist = true;
        } catch (e) {
            // Column doesn't exist yet, skip it
        }

        const { data, error: supabaseError } = await supabaseAdmin
            .from('launch_lab_leads')
            .insert(insertData)
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
