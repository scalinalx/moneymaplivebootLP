import React from 'react';

export const MockupGroup: React.FC = () => {
    return (
        <div className="relative w-full max-w-4xl mx-auto h-[320px] md:h-[500px] flex items-center justify-center">

            {/* Background Decorative Elements - Softer, 'Girly' gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-pink-200/40 via-purple-200/30 to-yellow-100/40 rounded-full blur-3xl -z-10 opacity-70"></div>

            {/* Left Element: The Playbook/Workbook */}
            <div className="absolute left-2 md:left-4 bottom-4 md:bottom-12 z-10 transform -rotate-6 w-36 md:w-56 transition-transform hover:-rotate-2 duration-500">
                <div className="bg-white p-1 md:p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] border border-gray-100 rounded-2xl">
                    <div className="bg-[#fcfcfc] aspect-[3/4] p-4 flex flex-col items-center justify-between text-center relative overflow-hidden border border-gray-100">
                        {/* Decorative header */}
                        <div className="w-full pt-2">
                            <div className="text-[8px] uppercase tracking-[0.2em] text-gray-400 mb-2">The Strategy</div>
                            <h3 className="text-black font-poppins font-black text-xl md:text-2xl uppercase leading-none">Content<br />Ecosystem</h3>
                        </div>

                        {/* Abstract chart */}
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-brand-neon flex items-center justify-center relative">
                            <div className="absolute inset-0 border-2 border-pink-300 rounded-full scale-75 border-dashed"></div>
                            <span className="font-hand text-xl md:text-2xl rotate-[-12deg] text-gray-800">Plan</span>
                        </div>

                        <div className="w-full">
                            <div className="w-full h-px bg-gray-200 mb-2"></div>
                            <p className="text-gray-400 text-[8px] uppercase tracking-widest">Confidential</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Center Element: Laptop - Dashboard View */}
            <div className="relative z-20 w-[260px] md:w-[600px] transform transition-transform hover:scale-[1.02] duration-500">
                {/* Laptop Body */}
                <div className="bg-white rounded-t-xl p-2 md:p-3 shadow-2xl border border-gray-100">
                    {/* Screen */}
                    <div className="bg-black aspect-[16/10] relative overflow-hidden flex flex-col border border-gray-800">
                        {/* Screen Content - Dark Mode Dashboard for Contrast */}
                        <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center relative">
                            <div className="absolute inset-0 bg-zinc-900 opacity-90"></div>

                            <div className="relative z-10 text-center mb-6">
                                <span className="font-hand text-brand-neon text-xl md:text-3xl -rotate-6 block mb-2">Newsletter Mastery</span>
                                <h2 className="font-poppins font-black text-3xl md:text-6xl text-white leading-[0.85] uppercase tracking-tighter">
                                    $100K<br />STACK
                                </h2>
                            </div>

                            <div className="relative z-10 bg-zinc-800/80 backdrop-blur-sm p-3 rounded-lg border border-zinc-700 w-full max-w-[200px] md:max-w-xs">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest">Monthly Rev</span>
                                    <span className="text-brand-neon font-bold text-xs md:text-sm">↗ 24%</span>
                                </div>
                                <div className="text-2xl md:text-4xl font-mono font-bold text-white tracking-tight">$12,450</div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Laptop Bottom */}
                <div className="bg-[#1a1a1a] h-2 md:h-5 rounded-b-lg relative shadow-md mx-4 md:mx-8 border-b-2 border-l-2 border-r border-gray-100"></div>
            </div>

            {/* Right Element: Phone - Newsletter View */}
            <div className="absolute right-0 md:-right-4 -bottom-4 md:bottom-0 z-30 transform rotate-6 w-20 md:w-32 transition-transform hover:rotate-2 duration-500">
                <div className="bg-black rounded-[1.5rem] p-1.5 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] border border-gray-800">
                    <div className="bg-white rounded-[1.2rem] h-40 md:h-64 overflow-hidden relative border border-gray-300 flex flex-col">
                        {/* Header */}
                        <div className="bg-rose-50 h-12 md:h-16 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-200 to-transparent opacity-50"></div>
                            <span className="font-rock text-[10px] md:text-xs text-black relative z-10">How We Grow</span>
                        </div>
                        {/* Body */}
                        <div className="p-2 md:p-3 space-y-2 bg-gray-50 flex-1">
                            <div className="flex gap-1 mb-2">
                                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                <div className="h-2 w-16 bg-gray-200 rounded-2xl mt-1"></div>
                            </div>
                            <div className="h-16 w-full bg-white rounded-2xl border border-gray-100 p-2">
                                <div className="h-1.5 w-full bg-gray-100 rounded-2xl mb-1"></div>
                                <div className="h-1.5 w-3/4 bg-gray-100 rounded-2xl"></div>
                            </div>

                            <div className="mt-2 p-1 bg-black rounded-2xl text-center">
                                <p className="text-[4px] text-white font-bold uppercase tracking-widest">Read Now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Handwritten Arrow pointing to CTA */}
            <div className="absolute -right-4 md:-right-20 bottom-0 md:bottom-10 z-40 hidden md:block">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="text-brand-neon transform rotate-[30deg] drop-shadow-md">
                    <path d="M20 20 C 40 60, 60 40, 80 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M60 75 L 80 80 L 85 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
            </div>

        </div>
    );
};
