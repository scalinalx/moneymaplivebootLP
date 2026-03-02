import React, { useState, useEffect } from 'react';

export const AnnouncementBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const scrollToCheckout = () => {
        const element = document.getElementById('checkout');
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
                    🚀 <span className="text-brand-neon">Today ONLY: 70% OFF.</span> Grab this promo before it ends.
                </p>
                <button
                    onClick={scrollToCheckout}
                    className="flex-shrink-0 bg-[#d81159] hover:bg-[#b30e4a] text-white font-display font-black text-xs md:text-sm px-4 md:px-6 py-2 md:py-2.5 rounded-md uppercase tracking-wider transition-all shadow-lg hover:shadow-lg hover:-translate-y-1 border border-gray-100"
                >
                    Enroll Now →
                </button>
            </div>
        </div>
    );
};
