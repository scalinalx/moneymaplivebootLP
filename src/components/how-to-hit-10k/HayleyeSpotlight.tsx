import React from 'react';

export const HayleyeSpotlight: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#E0F7FA]">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                {/* Headline */}
                <div className="relative mb-12 text-center max-w-[850px] z-10">
                    <h2 className="font-lora text-3xl md:text-4xl text-[#333333] leading-tight relative inline-block">
                        My student Judy used these steps to go from $0 to<br className="hidden md:block" />
                        <span className="font-bold text-[#4DB6AC] border-b-2 border-[#4DB6AC]/40">$2,800 in her first week</span> with only 427 subscribers!

                        {/* Hand-drawn Arrow Graphic */}
                        <div className="hidden lg:block absolute -right-[80px] top-[40%] w-24 h-24 text-[#d81159] pointer-events-none">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform rotate-12">
                                <path d="M10,10 Q60,5 60,50 T40,90" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                                <path d="M30,80 L40,90 L55,85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </h2>
                </div>

                {/* Content Row */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 w-full mb-16 relative z-0">

                    {/* Left Card: FB Post Mockup */}
                    <div className="flex-1 w-full bg-white border border-gray-300 p-6 shadow-sm rounded-sm max-w-[400px]">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border border-gray-100 flex items-center justify-center font-bold text-gray-400">
                                J
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold font-lato text-gray-900 text-[16px]">Judy L.</h4>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-lato mt-1">
                                    <span className="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-bold border border-gray-300">
                                        Top contributor
                                    </span>
                                    <span>• 2 days ago • <span className="text-gray-400">👥</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="font-lato text-gray-900 text-[16px] leading-relaxed">
                            I just hit $2,800 in my first week! 🤯 I only have 427 subscribers on my list. I didn't think it was possible until I used Ana's positioning framework.
                        </div>
                    </div>

                    {/* Right Card: Notification List Mockup */}
                    <div className="flex-1 w-full bg-white border border-[#4DB6AC] border-2 shadow-md rounded-sm max-w-[400px] overflow-hidden">
                        <div className="p-5 bg-white">
                            {/* Notification Item 1 */}
                            <div className="mb-6 pb-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-bold text-sm text-gray-900 font-lato">Stripe</span>
                                    <div className="flex items-center text-xs text-gray-400 font-lato">
                                        Just now <span className="ml-1 text-gray-300 font-bold">&gt;</span>
                                    </div>
                                </div>
                                <p className="text-[15px] font-bold text-gray-900 font-lato mb-1">You've made a sale! + $2,800.00 total</p>
                            </div>

                            {/* Notification Item 2 */}
                            <div className="flex items-start gap-3">
                                <div className="mt-2 w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-sm text-gray-900 font-lato">System</span>
                                        <div className="flex items-center text-xs text-gray-400 font-lato">
                                            1m ago <span className="ml-1 text-gray-300 font-bold">&gt;</span>
                                        </div>
                                    </div>
                                    <p className="text-[15px] font-bold text-gray-900 font-lato">Launch Goal Reached: $2,500 Target met!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* CTA Button */}
                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-2xl py-4 px-10 md:px-14 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide"
                >
                    I WANT TO HIT $5K-$10K MONTHS!
                </button>

            </div>
        </div>
    );
};
