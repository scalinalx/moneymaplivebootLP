import { supabase } from '@/lib/supabaseClient';

export interface LeadActivity {
    timestamp: string;
    input: string;
    type: 'initial_generation' | 'refinement';
}

export const captureLead = async (name: string, email: string) => {
    const { data, error } = await supabase
        .from('ana_ai_leads')
        .upsert(
            { name, email, last_active_at: new Date().toISOString() },
            { onConflict: 'email' }
        )
        .select()
        .single();

    if (error) {
        console.error('Error capturing lead:', error);
        throw error;
    }
    return data;
};

export const trackActivity = async (email: string, input: string, type: 'initial_generation' | 'refinement') => {
    // First get the current history
    const { data: lead, error: fetchError } = await supabase
        .from('ana_ai_leads')
        .select('expertise_history')
        .eq('email', email)
        .single();

    if (fetchError) {
        console.error('Error fetching lead history:', fetchError);
        return;
    }

    const newActivity: LeadActivity = {
        timestamp: new Date().toISOString(),
        input,
        type
    };

    const currentHistory = Array.isArray(lead?.expertise_history) ? lead.expertise_history : [];
    const updatedHistory = [...currentHistory, newActivity];

    const { error: updateError } = await supabase
        .from('ana_ai_leads')
        .update({
            expertise_history: updatedHistory,
            last_active_at: new Date().toISOString()
        })
        .eq('email', email);

    if (updateError) {
        console.error('Error tracking activity:', updateError);
    }
};
