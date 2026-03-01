import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function verifyAuth(req: NextRequest) {
    const auth = req.headers.get('authorization') || '';
    const token = auth.replace('Bearer ', '');
    return token === process.env.ADMIDASH_PASSWORD;
}

export async function GET(req: NextRequest) {
    if (!verifyAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase configuration missing');
        }

        // Fetch OpenAPI spec from Supabase root to get list of tables
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`Supabase API responded with ${response.status}`);
        }

        const data = await response.json();

        // Extract table names and definitions
        const definitions = data.definitions || {};
        const tables = Object.keys(definitions).map(name => ({
            name,
            description: definitions[name].description || 'No description available',
            columns: Object.keys(definitions[name].properties || {}).length
        }));

        // Get row counts for each table (heuristic: select count)
        const tablesWithCounts = await Promise.all(tables.map(async (table) => {
            try {
                const { count, error } = await supabaseAdmin
                    .from(table.name)
                    .select('*', { count: 'exact', head: true });

                return {
                    ...table,
                    rowCount: error ? 'Error' : (count || 0)
                };
            } catch (e) {
                return { ...table, rowCount: 'Unknown' };
            }
        }));

        return NextResponse.json({
            tables: tablesWithCounts.sort((a, b) => a.name.localeCompare(b.name))
        });

    } catch (err: any) {
        console.error('[admidash/tables]', err);
        return NextResponse.json({ error: err.message || 'Failed to fetch table list' }, { status: 500 });
    }
}
