'use client';

import React from 'react';

export const AnnouncementBar: React.FC = () => {
    return (
        <div className="sticky top-0 z-50 w-full bg-[#d81159] text-white text-center py-2 md:py-3 px-4 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
                <p className="font-lato font-bold text-[13px] md:text-[17px] tracking-wide flex items-center justify-center gap-2 leading-tight">
                    <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    INSTANT ACCESS: <span className="text-[#FCD34D] ml-1">Full Webinar Recording + All Templates & Bonuses</span>
                </p>

                <a
                    href="#checkout-section"
                    className="hidden md:inline-block bg-white text-[#d81159] px-4 py-1 rounded font-black text-xs uppercase hover:bg-[#FCD34D] hover:text-black transition-colors"
                >
                    GET INSTANT ACCESS →
                </a>
            </div>
        </div>
    );
};
