'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LaunchLabSuccessRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');

    useEffect(() => {
        if (leadId) {
            router.replace(`/first-100-paid-subscribers-success?leadId=${leadId}`);
        } else {
            router.replace('/first-100-paid-subscribers');
        }
    }, [leadId, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
    );
}
