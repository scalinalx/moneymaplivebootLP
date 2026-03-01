import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { name, email, existingTokenId, packageType } = await request.json();

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        // Pricing Config
        const packages = {
            'starter': { price: 2400, credits: 200, name: 'Starter Package (200 Credits)', description: 'Generate 100 viral thumbnails' },
            'pro': { price: 24700, credits: 2500, name: 'Pro Package (2500 Credits)', description: 'Generate 1250 viral thumbnails' },
        };

        const selectedPackage = packages[packageType as keyof typeof packages];

        if (!selectedPackage) {
            return NextResponse.json({ success: false, error: 'Invalid package selected' }, { status: 400 });
        }

        // Check if token exists or generate new one
        let tokenId = existingTokenId;

        if (!tokenId) {
            // Find by email first just in case
            const { data: existingUser } = await supabaseAdmin
                .from('show_dont_tell_users')
                .select('token_id')
                .eq('email', email)
                .single();

            if (existingUser) {
                tokenId = existingUser.token_id;
            } else {
                // Generate a secure, readable random token ID for new users
                const generateToken = () => {
                    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded I, O, 1, 0 for readability
                    let result = 'SDT-';
                    for (let i = 0; i < 8; i++) {
                        result += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    return result;
                };
                tokenId = generateToken();
            }
        }

        const checkoutParams: any = {
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: selectedPackage.name,
                            description: selectedPackage.description,
                        },
                        unit_amount: selectedPackage.price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${baseUrl}/show-dont-tell/success?token_id=${tokenId}`,
            cancel_url: `${baseUrl}/show-dont-tell/purchase`,
            customer_email: email,
            metadata: {
                program: 'show_dont_tell',
                tokenId: tokenId,
                credits: selectedPackage.credits.toString(),
                name: name || '',
                email: email
            },
            allow_promotion_codes: true,
            billing_address_collection: 'required',
        };

        const session = await stripe.checkout.sessions.create(checkoutParams);

        // --- NEW: Lead Capture at Initiation ---
        try {
            const { data: existing } = await supabaseAdmin
                .from('show_dont_tell_users')
                .select('id')
                .eq('token_id', tokenId)
                .single();

            if (existing) {
                await supabaseAdmin.from('show_dont_tell_users').update({
                    payment_status: 'initiated',
                    stripe_session_id: session.id,
                    last_active_at: new Date().toISOString()
                }).eq('id', existing.id);
            } else {
                await supabaseAdmin.from('show_dont_tell_users').insert({
                    email,
                    name: name || 'Customer',
                    token_id: tokenId,
                    payment_status: 'initiated',
                    stripe_session_id: session.id,
                    credits: 0 // Will be added on completion
                });
            }
        } catch (dbErr) {
            console.error('❌ Failed to capture SDT lead initiation:', dbErr);
            // Non-blocking for the user
        }
        // --- END NEW ---

        return NextResponse.json({
            success: true,
            url: session.url
        });

    } catch (error) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json({ success: false, error: 'Failed to create checkout session' }, { status: 500 });
    }
}
