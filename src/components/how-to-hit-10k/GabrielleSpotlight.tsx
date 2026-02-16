import React from 'react';
import { HIT10K_PRICE } from '@/lib/stripe';

export const GabrielleSpotlight: React.FC = () => {
    return (
        <>
            {/* Gabrielle Success Story Section */}
            <div className="w-full flex justify-center py-20 px-6 bg-[#E0F7FA]">
                <div className="max-w-[1200px] w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">

                    {/* LEFT COLUMN: Facebook Post Mockup */}
                    <div className="w-full max-w-[550px] bg-white border border-gray-300 rounded-sm shadow-sm p-4 relative order-2 md:order-1">
                        {/* Post Header */}
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 border border-gray-100 flex-shrink-0">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" alt="Gabrielle" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="font-bold font-lato text-gray-900 text-[14px]">Gabrielle</span>
                                    <div className="w-0 h-0 border-l-[4px] border-l-gray-300 border-y-[3px] border-y-transparent mx-1"></div>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-1 rounded flex items-center gap-1 border border-gray-200 font-semibold">
                                        <span className="text-[10px]">⭐</span> Rising contributor
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 font-lato mt-0.5 flex items-center gap-1">
                                    <span>2h</span>
                                    <span>•</span>
                                    <span>👥</span>
                                </div>
                            </div>
                            <div className="text-gray-400 font-bold text-lg leading-none cursor-pointer">...</div>
                        </div>

                        {/* Post Body Text */}
                        <div className="font-lato text-gray-900 text-[14px] leading-relaxed mb-3">
                            <p className="mb-2">Sharing a major win today!</p>
                            <p className="mb-2">
                                <span className="bg-pink-100 border-b border-pink-300">I just hit $3,988 in 5 days with 450 subscribers.</span> I didn't think I could do it with such a small list.
                            </p>
                            <p>It was all about the positioning. Thanks Ana for showing me the way! <span className="font-semibold cursor-pointer">See more</span></p>
                        </div>

                        {/* Post Visuals (Split Image) */}
                        <div className="flex border border-gray-100 h-48 sm:h-64">
                            {/* Left Half: Chart Mockup */}
                            <div className="w-[40%] bg-white border-r border-gray-100 p-2 flex flex-col justify-end">
                                <div className="w-full flex items-end justify-around gap-1 h-32">
                                    <div className="w-full bg-blue-100 h-[35%] rounded-t-sm"></div>
                                    <div className="w-full bg-blue-500 h-[100%] rounded-t-sm"></div>
                                    <div className="w-full bg-blue-300 h-[60%] rounded-t-sm"></div>
                                </div>
                                <div className="text-[8px] text-gray-300 mt-1 truncate">Day 1 Day 2 Day 3 Day 4 Day 5</div>
                            </div>
                            {/* Right Half: Photo Mockup */}
                            <div className="w-[60%] bg-gray-100 relative overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400&auto=format&fit=crop" alt="Recording" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Post Footer Actions */}
                        <div className="border-t border-gray-100 mt-3 pt-2 flex justify-between text-gray-500 text-xs font-semibold px-2">
                            <div className="flex items-center gap-2"><span>👍</span> <span>Like</span></div>
                            <div className="flex items-center gap-2"><span>💬</span> <span>Comment</span></div>
                            <div className="flex items-center gap-2"><span>↗️</span> <span>Share</span></div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Text & CTA */}
                    <div className="flex-1 max-w-[600px] text-center md:text-left relative order-1 md:order-2">

                        {/* Arrow Graphic (Visible on desktop) */}
                        <div className="hidden lg:block absolute -left-28 top-1/2 -translate-y-1/2 w-20 h-20 text-[#d81159]">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform rotate-[-20deg]">
                                <path d="M90,10 Q50,50 10,60" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <path d="M10,60 L25,55 M10,60 L20,75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h2 className="font-lora text-3xl md:text-4xl text-[#333333] leading-tight mb-8">
                            This student <span className="font-bold text-[#4DB6AC] border-b-2 border-[#4DB6AC]/40">hit $3,988 in her first five days</span> of launching her digital product to 450 subscribers!
                        </h2>

                        <button
                            onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-xl py-4 px-8 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide"
                        >
                            OK, I’M CONVINCED—LET’S GO!
                        </button>
                    </div>

                </div>
            </div>

            {/* FAQ Teaser Section */}
            <div className="w-full flex justify-center py-24 px-6 bg-white">
                <div className="max-w-[800px] w-full text-center">
                    <h2 className="font-anton text-[rgb(56,170,185)] text-4xl md:text-5xl lg:text-6xl mb-6 tracking-wide">
                        Have more questions?
                    </h2>
                    <p className="font-lora text-lg md:text-2xl text-[#333333] leading-relaxed">
                        No worries! Just scroll to the FAQ section at the bottom of <a href="#" className="text-blue-700 underline decoration-blue-700/30 underline-offset-4 hover:text-blue-800">this page!</a>
                    </p>
                </div>
            </div>
        </>
    );
};
