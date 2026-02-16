import React from 'react';

export const StudentSpotlight: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#FFF0F5]">
            {/* Increased max-width significantly to allow side-by-side layout with long button text */}
            <div className="max-w-[1400px] w-full flex flex-col items-center">

                {/* Headline */}
                <h3 className="font-montserrat font-bold text-2xl md:text-[28px] text-black leading-snug mb-12 text-center max-w-[850px]">
                    My student Susan used these steps to go from "Offer Confusion" to making <span className="text-[#d81159]">$8,800</span> in her first week!
                </h3>

                {/* Content Row: Image + Inline CTA */}
                {/* Switched to lg:flex-row to ensure it only goes side-by-side when there is enough room */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full">

                    {/* Mock Proof Visual (Notification Card) */}
                    <div className="w-full max-w-md bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 transform rotate-1 transition-transform hover:rotate-0 duration-500 flex-shrink-0">
                        {/* Mock Header */}
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold font-lato">Success Story #842</span>
                        </div>

                        {/* Mock Message Content */}
                        <div className="p-6 md:p-8 flex items-start gap-4 text-left">
                            <div className="w-12 h-12 rounded-full bg-pink-100 flex-shrink-0 flex items-center justify-center text-xl shadow-inner text-[#d81159] border border-pink-200">
                                S
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-baseline mb-1">
                                    <p className="font-lato font-bold text-gray-900 text-lg">Susan M.</p>
                                    <span className="text-xs text-gray-400 font-lato">1 week ago</span>
                                </div>
                                <p className="font-lora text-gray-600 italic leading-relaxed text-[17px]">
                                    "I can't believe it. I had these offers just sitting there for months. After taking the course, I finally launched and hit <span className="font-bold text-[#d81159] bg-pink-50 px-1 rounded">$8,800 in 7 days</span>. This stuff actually works!"
                                </p>
                            </div>
                        </div>

                        {/* Mock Stats Footer */}
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 font-lato">
                            <span>Status: <strong>Verified Purchase</strong></span>
                            <span className="text-[#d81159] font-bold">+ $8,800.00 Revenue</span>
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <button
                            onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg lg:text-xl py-6 px-12 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex flex-col md:flex-row items-center justify-center gap-4 text-center"
                        >
                            <span className="leading-tight whitespace-nowrap">GIVE ME THE STEALTH SALES BLUEPRINT</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};
