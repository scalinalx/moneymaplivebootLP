'use client';

import React from 'react';

export const AnnouncementBar: React.FC = () => {
    return (
        <div className="sticky top-0 z-50 w-full bg-[#1a1a1a] text-white text-center py-2 md:py-3 px-4 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
                <p className="font-lato font-bold text-[13px] md:text-[17px] tracking-wide flex items-center justify-center gap-2 leading-tight">
                    <span className="inline-block w-1.5 h-1.5 bg-[#ffc300] rounded-full animate-pulse"></span>
                    LIVE WORKSHOP — SAT, MARCH 21 @ 10:00 AM EST: <span className="text-[#ffc300] ml-1">From Unstuck to Published</span>
                </p>

                <a
                    href="#checkout-section"
                    className="hidden md:inline-block bg-[#ffc300] text-[#1a1a1a] px-4 py-1 rounded font-black text-xs uppercase hover:bg-[#e6b000] transition-colors"
                >
                    BOOK YOUR SEAT — $97 →
                </a>
            </div>
        </div>
    );
};
