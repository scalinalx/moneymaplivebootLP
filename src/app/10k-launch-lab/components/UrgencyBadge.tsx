import React from 'react';

export const UrgencyBadge: React.FC = () => {
    return (
        <section className="w-full bg-white py-8 px-4 md:px-8 flex justify-center">
            <div className="w-full max-w-xl mx-auto transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-rose-50 p-6 md:p-8 rounded-[2rem] rounded-tl-none shadow-2xl text-center border border-gray-100 relative overflow-hidden group">
                    {/* Animated background element */}
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>

                    <p className="font-display text-xl md:text-2xl lg:text-3xl font-black leading-tight text-black mb-1 uppercase tracking-tighter relative z-10">
                        HURRY UP! 💨 60% of spots filled within the first 24h! ⚡️
                    </p>
                    <div className="flex justify-center gap-2 mt-2 relative z-10">
                        <span className="animate-pulse">⏳</span>
                        <span className="animate-bounce delay-100">🔥</span>
                        <span className="animate-pulse delay-200">⌛️</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
