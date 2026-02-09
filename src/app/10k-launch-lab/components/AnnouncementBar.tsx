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

    const scrollToWaitlist = () => {
        const element = document.getElementById('waitlist');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-[100] w-full bg-black text-white text-center py-3 md:py-4 px-4 shadow-2xl transition-all duration-700 ease-out transform border-b-2 border-brand-neon ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95'
                }`}
        >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <p className="font-display font-black text-[13px] sm:text-[15px] md:text-[18px] lg:text-[20px] tracking-[0.02em] leading-tight uppercase">
                    🚫 Enrollment in the <span className="text-brand-neon">10K LAUNCH LAB</span> is now CLOSED!
                    <span className="hidden sm:inline mx-2 opacity-50">|</span>
                    <span className="block sm:inline mt-1 sm:mt-0 text-white/90">
                        Join the waitlist to be the <span className="text-brand-neon font-black">FIRST</span> to know when we open doors again
                    </span>
                </p>
                <button
                    onClick={scrollToWaitlist}
                    className="flex-shrink-0 bg-brand-neon hover:bg-[#e6e200] text-black font-display font-black text-xs md:text-sm px-4 md:px-6 py-2 md:py-2.5 rounded-md uppercase tracking-wider transition-all shadow-[3px_3px_0px_#FFFB00] hover:shadow-[1px_1px_0px_#FFFB00] hover:translate-x-[2px] hover:translate-y-[2px] border border-black"
                >
                    Join Waitlist →
                </button>
            </div>
        </div>
    );
};
