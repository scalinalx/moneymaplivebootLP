import React, { useState, useEffect } from 'react';

export const AnnouncementBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Entrance animation delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-[100] w-full bg-[#d81159] text-white text-center py-2.5 md:py-3.5 px-4 shadow-2xl transition-all duration-700 ease-out transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 md:gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full animate-ping"></div>
                <p className="font-display font-bold text-[12px] sm:text-[14px] md:text-[18px] lg:text-[20px] tracking-[0.02em] leading-tight uppercase">
                    Enrollment in the <span className="text-[#FFFB00]">10K LAUNCH LAB</span> is now open!
                    <span className="hidden sm:inline mx-2 opacity-50">|</span>
                    <span className="block sm:inline mt-1 sm:mt-0">
                        ONLY until <span className="underline decoration-2 underline-offset-4">Feb 7, 18:00 EST</span>
                    </span>
                    <span className="hidden lg:inline mx-2 opacity-50">|</span>
                    <span className="lg:inline font-black bg-white/10 px-2 py-0.5 rounded-sm ml-1 text-[#FFFB00]">
                        17 out of 30 spots remaining
                    </span>
                </p>
                <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-white/5 pointer-events-none animate-pulse"></div>
        </div>
    );
};
