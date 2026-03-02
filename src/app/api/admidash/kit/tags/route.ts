import { NextRequest, NextResponse } from 'next/server';

const KIT_API_KEY = process.env.KIT_API_KEY;
const KIT_BASE_URL = process.env.KIT_BASE_URL || 'https://api.kit.com/v4/';

export async function GET(req: NextRequest) {
    if (!KIT_API_KEY) {
        return NextResponse.json({ error: 'Kit API key not configured' }, { status: 501 });
    }

    // Password check header
    const auth = req.headers.get('authorization') || '';
    const token = auth.replace('Bearer ', '');
    if (token !== process.env.ADMIDASH_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const response = await fetch(`${KIT_BASE_URL}tags`, {
            headers: {
                'X-Kit-Api-Key': KIT_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Kit API responded with ${response.status}`);
        }

        const data = await response.json();
        // Kit V4 returns tags in 'tags' array
        return NextResponse.json({
            tags: data.tags || []
        });

    } catch (err: any) {
        console.error('[admidash/kit/tags] Error:', err);
        return NextResponse.json({ error: err.message || 'Failed to fetch tags' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    if (!KIT_API_KEY) {
        return NextResponse.json({ error: 'Kit API key not configured' }, { status: 501 });
    }

    // Password check header
    const auth = req.headers.get('authorization') || '';
    const token = auth.replace('Bearer ', '');
    if (token !== process.env.ADMIDASH_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { name } = await req.json();
        if (!name) return NextResponse.json({ error: 'Tag name is required' }, { status: 400 });

        const response = await fetch(`${KIT_BASE_URL}tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Kit-Api-Key': KIT_API_KEY
            },
            body: JSON.stringify({ name })
        });

        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`Kit API responded with ${response.status}: ${errBody}`);
        }

        const data = await response.json();
        return NextResponse.json({
            success: true,
            tag: data.tag
        });

    } catch (err: any) {
        console.error('[admidash/kit/tags] POST Error:', err);
        return NextResponse.json({ error: err.message || 'Failed to create tag' }, { status: 500 });
    }
}
