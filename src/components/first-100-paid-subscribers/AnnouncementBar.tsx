'use client';

import React, { useState, useEffect } from 'react';

export const AnnouncementBar: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<{ hours: string, minutes: string, seconds: string } | null>(null);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        // Target: March 12, 2026, 17:00 Athens Time (UTC+2)
        const targetDate = new Date('2026-03-12T17:00:00+02:00');

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                setIsLive(true);
                setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
                return;
            }

            const h = Math.floor(difference / (1000 * 60 * 60));
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({
                hours: h.toString().padStart(2, '0'),
                minutes: m.toString().padStart(2, '0'),
                seconds: s.toString().padStart(2, '0')
            });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="sticky top-0 z-50 w-full bg-[#d81159] text-white text-center py-2 md:py-3 px-4 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
                <p className="font-lato font-bold text-[13px] md:text-[17px] tracking-wide flex items-center justify-center gap-2 leading-tight">
                    <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    LIVE WORKSHOP TODAY @ 17:00 ATHENS: <span className="text-[#FCD34D] ml-1">No Viral Moment Required</span>
                </p>

                {timeLeft && (
                    <div className="flex items-center gap-2 bg-black/20 px-4 py-1 rounded-full border border-white/20">
                        <span className="text-[10px] uppercase font-black tracking-tighter text-white/70">Starts In:</span>
                        <div className="flex items-center font-mono font-bold text-sm md:text-lg tabular-nums">
                            <span>{timeLeft.hours}</span>
                            <span className="mx-0.5 animate-pulse">:</span>
                            <span>{timeLeft.minutes}</span>
                            <span className="mx-0.5 animate-pulse">:</span>
                            <span>{timeLeft.seconds}</span>
                        </div>
                    </div>
                )}

                <a 
                    href="#checkout-section" 
                    className="hidden md:inline-block bg-white text-[#d81159] px-4 py-1 rounded font-black text-xs uppercase hover:bg-[#FCD34D] hover:text-black transition-colors"
                >
                    SECURE YOUR SEAT →
                </a>
            </div>
        </div>
    );
};
