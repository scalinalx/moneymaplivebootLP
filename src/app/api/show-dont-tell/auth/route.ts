import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Ensure we have the required environment variables
if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials missing for show-dont-tell auth route.");
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export async function POST(req: Request) {
    try {
        const { tokenId } = await req.json();

        if (!tokenId) {
            return NextResponse.json({ success: false, error: "Token ID is required." }, { status: 400 });
        }

        // Query Supabase for the token
        const { data: user, error } = await supabase
            .from('show_dont_tell_users')
            .select('id, name, email, expires_at, usage, credits')
            .eq('token_id', tokenId)
            .single();

        if (error || !user) {
            return NextResponse.json({ success: false, error: "Invalid Token ID." }, { status: 401 });
        }

        // Check expiration
        const expiryDate = new Date(user.expires_at);
        if (expiryDate < new Date()) {
            return NextResponse.json({ success: false, error: "This Token ID has expired." }, { status: 403 });
        }

        // Valid token
        return NextResponse.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                usage: user.usage,
                credits: user.credits,
            }
        });

    } catch (error: any) {
        console.error("Auth error:", error);
        return NextResponse.json({ success: false, error: "An unexpected error occurred." }, { status: 500 });
    }
}
