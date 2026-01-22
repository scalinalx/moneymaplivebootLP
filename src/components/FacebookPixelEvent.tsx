'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        fbq: (action: string, event: string, params?: Record<string, any>) => void;
    }
}

interface FacebookPixelProps {
    event: 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase' | 'Lead';
    params?: {
        content_name?: string;
        content_category?: string;
        content_ids?: string[];
        content_type?: string;
        value?: number;
        currency?: string;
    };
}

export function FacebookPixelEvent({ event, params }: FacebookPixelProps) {
    useEffect(() => {
        // Check if fbq is available
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', event, params);
        }
    }, [event, params]);

    return null;
}
