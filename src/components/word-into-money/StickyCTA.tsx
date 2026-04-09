'use client';

import React, { useEffect, useState, useRef } from 'react';

export const StickyCTA: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [enrolled, setEnrolled] = useState(2347);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Live enrollment counter — increments every 45-90s
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setEnrolled(prev => prev + 1);
        }, 45000 + Math.random() * 45000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const checkoutEl = document.getElementById('checkout-section');

            if (scrollY > 600) {
                if (checkoutEl) {
                    const checkoutRect = checkoutEl.getBoundingClientRect();
                    setVisible(checkoutRect.top > window.innerHeight || checkoutRect.bottom < 0);
                } else {
                    setVisible(true);
                }
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToCheckout = () => {
        document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 bg-brand-950/95 backdrop-blur-md border-t border-brand-800 transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <div className="max-w-[620px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <div className="hidden sm:block">
                    <p className="font-anton text-brand-white text-lg">$97 — Instant Access</p>
                    <p className="text-brand-grey text-xs">
                        <span className="text-brand-lime font-bold">{enrolled.toLocaleString()}</span> enrolled
                    </p>
                </div>
                <button
                    onClick={scrollToCheckout}
                    className="w-full sm:w-auto bg-brand-lime hover:bg-brand-limeDim text-brand-950 font-anton text-lg py-3 px-8 rounded-xl transition-all hover:scale-[1.02] uppercase tracking-wide"
                >
                    GET ACCESS NOW
                </button>
            </div>
        </div>
    );
};
