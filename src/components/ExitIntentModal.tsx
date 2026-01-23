'use client';

import React, { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

export const ExitIntentModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        // Desktop: Mouse leaves view from top
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
            }
        };

        // Mobile/Back Button Detection
        const handlePopState = () => {
            if (!hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
                // Re-push state so if they cancel/close modal, they are still "trapped" or just stay on page
                window.history.pushState(null, '', window.location.href);
            }
        };

        // Initialize listeners
        document.addEventListener('mouseleave', handleMouseLeave);

        // Add a history entry so "Back" triggers popstate instead of leaving
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [hasTriggered]);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-in zoom-in-95 duration-300 border-2 border-emerald-100">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center">
                    <div className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        Wait! Before you go...
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                        Don't leave your <span className="text-emerald-600">$10k/month potential</span> behind.
                    </h2>

                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        You have the offer stack. But without the <span className="font-semibold text-slate-900">launch strategy</span>, it's just a PDF. The Money Map Bootcamp is the roadmap you need to turn this plan into a 6-figure business.
                    </p>

                    <div className="space-y-4">
                        <a
                            href="https://www.monetisesubstack.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-emerald-900/10 transition-all hover:scale-[1.02]"
                        >
                            Yes, Show Me The Roadmap
                            <ArrowRight size={20} />
                        </a>

                        <button
                            onClick={handleClose}
                            className="text-sm text-slate-400 hover:text-slate-600 underline decoration-slate-300 hover:decoration-slate-500 underline-offset-4 transition-all"
                        >
                            No thanks, I'll figure it out alone.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
