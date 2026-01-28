import React, { useState, useEffect } from 'react';

export const AnnouncementBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Optional: Hide on scroll down, show on scroll up logic, 
    // or keep it permanently sticky as per standard sales letters.
    // We will keep it permanently sticky top as requested.

    return (
        <div className="sticky top-0 z-50 w-full bg-[#d81159] text-white text-center py-2 md:py-3 px-4 shadow-md">
            <p className="font-lato font-bold text-[13px] md:text-[19px] tracking-wide flex items-center justify-center gap-2 leading-tight">
                <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                LIVE FEB 3, 10:00AM EST: <span className="text-[#FCD34D]">Join the 60-Minute Intensive</span> — How To Hit Your First $10,000 Month (Simplified)
            </p>
        </div>
    );
};
