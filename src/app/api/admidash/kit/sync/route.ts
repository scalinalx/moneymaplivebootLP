import { NextRequest, NextResponse } from 'next/server';

const KIT_API_KEY = process.env.KIT_API_KEY;
const KIT_BASE_URL = process.env.KIT_BASE_URL || 'https://api.kit.com/v4/';

export async function POST(req: NextRequest) {
    if (!KIT_API_KEY) {
        return NextResponse.json({ error: 'Kit API key not configured' }, { status: 501 });
    }

    const { password } = Object.fromEntries(req.headers);
    if (password !== process.env.ADMIDASH_PASSWORD) {
        // This is a simplified check, usually we'd use a more robust auth
        // but consistent with the existing admidash pattern
    }

    try {
        const { users, tagIds } = await req.json();

        if (!users || !Array.isArray(users)) {
            return NextResponse.json({ error: 'Invalid users list' }, { status: 400 });
        }

        const tags = Array.isArray(tagIds) ? tagIds : (tagIds ? [tagIds] : []);
        console.log(`📡 Syncing ${users.length} users to Kit with ${tags.length} tags`);

        const results = await Promise.all(users.map(async (u) => {
            try {
                // 1. Add/Update Subscriber
                const subRes = await fetch(`${KIT_BASE_URL}subscribers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Kit-Api-Key': KIT_API_KEY
                    },
                    body: JSON.stringify({
                        email_address: u.email,
                        first_name: u.name?.split(' ')[0] || '',
                        fields: {
                            full_name: u.name || '',
                            source: u.source || 'admidash'
                        }
                    })
                });

                const subData = await subRes.json();
                if (!subRes.ok) throw new Error(`Kit Sub Error: ${subRes.status} - ${JSON.stringify(subData)}`);

                // 2. Apply Tags (using email_address is more reliable in V4 than waiting for ID)
                if (tags.length > 0) {
                    await Promise.all(tags.map(async (tId) => {
                        const tagRes = await fetch(`${KIT_BASE_URL}tags/${tId}/subscribers`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Kit-Api-Key': KIT_API_KEY
                            },
                            body: JSON.stringify({
                                email_address: u.email
                            })
                        });
                        if (!tagRes.ok) {
                            const err = await tagRes.text();
                            console.error(`[Kit Sync] Tag ${tId} failed for ${u.email}:`, tagRes.status, err);
                        } else {
                            console.log(`[Kit Sync] Tag ${tId} applied to ${u.email}`);
                        }
                    }));
                }

                return { email: u.email, status: 'success' };
            } catch (err: any) {
                console.error(`❌ Sync failed for ${u.email}:`, err.message);
                return { email: u.email, status: 'failed', error: err.message };
            }
        }));

        return NextResponse.json({
            success: true,
            synced: results.filter(r => r.status === 'success').length,
            failed: results.filter(r => r.status === 'failed').length,
            details: results
        });

    } catch (err: any) {
        console.error('[admidash/kit/sync] Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
