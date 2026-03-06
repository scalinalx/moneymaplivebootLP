import React from 'react';

export const AnnouncementBar: React.FC = () => {
    return (
        <div className="sticky top-0 z-50 w-full bg-[#d81159] text-white text-center py-2 md:py-3 px-4 shadow-md">
            <p className="font-lato font-bold text-[13px] md:text-[19px] tracking-wide flex items-center justify-center gap-2 leading-tight">
                <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                LIVE WORKSHOP — MARCH 12TH: <span className="text-[#FCD34D]">Reserve Your Seat</span> — 100 Paid Subscribers + Substack Bestseller Status. No Viral Moment Required.
            </p>
        </div>
    );
};
