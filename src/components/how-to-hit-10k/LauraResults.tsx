import React from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';

const data = [
    { name: '01/10', val: 0 }, { name: '01/11', val: 0 }, { name: '01/12', val: 0 },
    { name: '01/13', val: 1500 }, { name: '01/14', val: 4200 }, { name: '01/15', val: 3800 },
    { name: '01/16', val: 2488 }, { name: '01/17', val: 2000 },
];

export const LauraResults: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#E0F7FA]">
            <div className="max-w-[1200px] w-full flex flex-col items-center">

                {/* Headline */}
                <h2 className="font-lora text-3xl md:text-4xl lg:text-[42px] text-[#333333] leading-tight mb-12 text-center max-w-[900px]">
                    My student Tony used these steps to go from "Offer Confusion" to making <span className="font-bold text-[#4DB6AC] border-b-4 border-[#4DB6AC]/30">$13,988 in just 5 days!</span>
                </h2>

                {/* Content Container (Two Cards) */}
                <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 w-full mb-12 relative">

                    {/* Arrow Graphic */}
                    <div className="hidden lg:block absolute -top-8 -right-12 w-24 h-24 z-10 text-[#d81159] transform rotate-12">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20,80 Q60,10 90,50" stroke="currentColor" strokeWidth="3" fill="none" />
                            <path d="M90,50 L80,45 M90,50 L95,40" stroke="currentColor" strokeWidth="3" />
                        </svg>
                    </div>

                    {/* Left Card: Facebook Post */}
                    <div className="flex-1 bg-white border border-gray-300 p-6 shadow-sm rounded-sm">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                                T
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold font-lato text-gray-900 text-[15px]">Tony R.</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-lato mt-0.5">
                                    <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200 font-bold flex items-center gap-1">
                                        <span className="text-[10px]">💎</span> Top contributor
                                    </span>
                                    <span>• 5d • 🌍</span>
                                </div>
                            </div>
                            <div className="ml-auto text-gray-400 font-bold tracking-widest text-lg">...</div>
                        </div>

                        <div className="font-lato text-gray-800 text-[15px] leading-relaxed space-y-4">
                            <p>I just hit $13,988 in 5 days with my first real launch campaign. <span className="border-b-2 border-[#d81159]">I can't believe it actually worked.</span></p>
                            <p>I didn't even have to change my offer—just the way I positioned it and priced it. I followed the 5-step framework exactly as Ana said.</p>
                            <p>The best part? I did this with less than 500 subscribers on my list. If I can do it, anyone can!</p>
                        </div>

                        {/* Reactions Mockup */}
                        <div className="flex items-center gap-1 mt-6 border-t border-gray-100 pt-3">
                            <div className="flex -space-x-1">
                                <div className="w-5 h-5 rounded-full bg-blue-500 border border-white flex items-center justify-center text-[10px] text-white">👍</div>
                                <div className="w-5 h-5 rounded-full bg-red-500 border border-white flex items-center justify-center text-[10px] text-white">❤️</div>
                            </div>
                            <span className="text-gray-500 text-xs hover:underline cursor-pointer">You and 128 others</span>
                        </div>
                    </div>

                    {/* Right Card: Chart */}
                    <div className="flex-1 bg-white border border-gray-300 p-4 shadow-sm rounded-sm flex flex-col">
                        {/* Chart Header */}
                        <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-2">
                            <div>
                                <h4 className="font-bold text-2xl text-gray-900 font-lato">$13,988.00 <span className="text-xs text-gray-400 font-normal align-top ml-1">USD</span></h4>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-1">Gross Revenue</p>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="flex-grow w-full h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} barCategoryGap={5}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" hide />
                                    <YAxis hide domain={[0, 4500]} />
                                    <Bar dataKey="val" fill="#d81159" radius={[2, 2, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Chart Footer Mockup */}
                        <div className="flex justify-between text-[9px] text-gray-400 font-lato mt-2 px-2">
                            <span>Day 1</span>
                            <span>Day 2</span>
                            <span>Day 3</span>
                            <span>Day 4</span>
                            <span>Day 5</span>
                        </div>
                    </div>

                </div>

                {/* CTA Button */}
                <button
                    onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-2xl py-4 px-10 md:px-14 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide"
                >
                    I WANT RESULTS LIKE TONY!
                </button>

            </div>
        </div>
    );
};
