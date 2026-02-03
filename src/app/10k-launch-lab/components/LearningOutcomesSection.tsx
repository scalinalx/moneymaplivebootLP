import React from 'react';
import { Button } from './Button';

export const LearningOutcomesSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">

            {/* 1. Learning List */}
            <div className="max-w-4xl w-full mx-auto mb-16">
                <h3 className="font-poppins font-bold text-xl md:text-2xl mb-8 text-black">
                    In The <span className="italic">$10k</span> Launch Lab, you'll learn how to:
                </h3>

                <ul className="space-y-4 font-poppins text-base md:text-lg text-black leading-relaxed list-disc pl-5 marker:text-black">
                    <li>
                        <span className="font-bold">Create brand obsession</span> and the psychology behind making your brand captivate and convert.
                    </li>
                    <li>
                        <span className="font-bold">Focus on the exact things</span> that stops the scrolls, turns heads, and sells for you.
                    </li>
                    <li>
                        <span className="font-bold">Magnetize your messaging</span> to attract the right customers and repel everyone else.
                    </li>
                    <li>
                        <span className="font-bold">Craft polarizing hooks</span> that instantly get people curious.
                    </li>
                    <li>
                        <span className="font-bold">Tell better visual stories</span> and establish signature moments to make your business instantly recognizable.
                    </li>
                    <li>
                        <span className="font-bold">Develop your main-character energy</span> and embrace your brand persona that commands attention & fosters loyalty.
                    </li>
                </ul>
            </div>

            {/* 2. Bundle Mockup Visual */}
            <div className="w-full max-w-5xl mx-auto mb-16 relative flex items-center justify-center">
                {/* Container for the composition */}
                <div className="relative w-full aspect-[16/9] md:aspect-[2/1] max-h-[500px] flex items-end justify-center">

                    {/* LEFT STACK: Papers/Booklets */}
                    <div className="absolute left-0 md:left-10 bottom-10 z-10 w-24 md:w-40 aspect-[3/4] transform -rotate-12 hover:-rotate-6 transition-transform duration-500 origin-bottom-right">
                        {/* Paper 1: Bottom */}
                        <div className="absolute top-4 left-4 w-full h-full bg-white border border-gray-200 shadow-xl rotate-6"></div>
                        {/* Paper 2: Rebel Playbook */}
                        <div className="absolute top-0 left-0 w-full h-full bg-white border border-gray-900 shadow-2xl p-2 flex flex-col">
                            <div className="h-1/2 bg-gray-200 mb-2 overflow-hidden relative grayscale">
                                {/* Placeholder Texture */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 to-gray-800 opacity-20"></div>
                                <div className="absolute bottom-0 w-full text-[8px] font-bold text-center bg-brand-neon py-0.5">The $10k LAUNCH LAB</div>
                            </div>
                            <div className="text-center mt-1">
                                <h4 className="font-display font-black text-xs md:text-lg uppercase leading-none mb-1 text-black">REBEL<br />PLAYBOOK</h4>
                                <div className="h-0.5 w-6 md:w-8 bg-black mx-auto"></div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute left-8 md:left-32 bottom-20 z-0 w-20 md:w-32 aspect-[3/4] transform -rotate-[20deg] origin-bottom-right">
                        <div className="w-full h-full bg-zinc-900 border border-gray-700 shadow-xl p-2 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-noise opacity-20"></div>
                            <div className="w-8 h-8 rounded-full bg-brand-neon mb-2 shadow-[0_0_10px_rgba(255,251,0,0.5)]"></div>
                            <span className="text-white font-display text-[8px] md:text-[10px] uppercase tracking-widest text-center leading-tight">THE<br />AUDITOR</span>
                        </div>
                    </div>


                    {/* CENTER: Laptop */}
                    <div className="relative z-20 w-[280px] md:w-[600px] mb-4">
                        <div className="bg-[#1a1a1a] rounded-t-xl p-2 md:p-4 shadow-2xl border-2 border-[#111]">
                            <div className="bg-black aspect-[16/10] flex flex-col items-center justify-center relative overflow-hidden border border-gray-800">
                                {/* Screen Glare */}
                                <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/5 to-transparent transform rotate-45 pointer-events-none"></div>

                                <div className="text-center z-10 p-4 w-full">
                                    <p className="font-hand text-brand-neon text-lg md:text-3xl -rotate-6 mb-2">The $10k Launch Lab</p>
                                    <h1 className="font-display font-black text-white text-3xl md:text-6xl uppercase tracking-tighter leading-[0.85] mb-4 drop-shadow-lg">
                                        LAUNCH LAB
                                    </h1>
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-3"></div>
                                    <p className="text-[6px] md:text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                                        For those who want to stand out & make sales
                                    </p>
                                </div>

                                {/* Abstract Element behind text */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full"></div>
                            </div>
                        </div>
                        {/* Laptop Base */}
                        <div className="bg-[#111] h-2 md:h-4 rounded-b-lg mx-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-gray-800"></div>
                    </div>

                    {/* RIGHT: Phone */}
                    <div className="absolute right-2 md:right-20 bottom-0 z-30 w-16 md:w-28 transform rotate-3 origin-bottom-left transition-transform hover:rotate-0 duration-300">
                        <div className="bg-black rounded-[1rem] md:rounded-[1.5rem] p-1 shadow-2xl border border-gray-800">
                            <div className="bg-white rounded-[0.8rem] md:rounded-[1.2rem] h-32 md:h-56 overflow-hidden relative border border-gray-200 flex flex-col">
                                {/* Phone Header */}
                                <div className="bg-black text-white p-2 pt-3 pb-2 text-center relative">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-700 mx-auto mb-1 overflow-hidden border border-white/20">
                                        <div className="w-full h-full bg-gradient-to-tr from-purple-500 to-pink-500"></div>
                                    </div>
                                    <p className="text-[4px] md:text-[6px] uppercase font-bold leading-tight">Launch Lab Archetype<br />Vault</p>
                                </div>
                                {/* Chat bubbles */}
                                <div className="p-2 space-y-2 bg-gray-50 flex-1 overflow-hidden text-[4px] md:text-[6px]">
                                    <div className="text-[4px] text-gray-400 mb-1">By How We Grow, LLC</div>
                                    <div className="bg-gray-200 p-1.5 rounded-lg rounded-tl-none self-start w-full text-black leading-tight">
                                        Welcome, Rebel, to your Launch Lab Archetype Vault. Most people never sound as powerful...
                                    </div>
                                    <div className="bg-white border border-gray-200 p-1.5 rounded-lg w-full shadow-sm text-black leading-tight">
                                        <span className="text-red-500 font-bold bg-red-50 px-0.5">You're not most people.</span> This exists to help you discover your authentic brand voice.
                                    </div>
                                    {/* Fake Button */}
                                    <div className="mt-2 w-full bg-black text-white py-1 rounded text-center font-bold tracking-wider">
                                        START HERE, REBEL ⚡️
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Neon Arrow */}
                    <div className="absolute right-[18%] bottom-[25%] z-40 w-16 h-16 md:w-24 md:h-24 text-brand-neon transform rotate-12 hidden md:block opacity-80">
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M 80 20 Q 50 50 20 80" />
                            <path d="M 25 70 L 20 80 L 30 78" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>

                </div>
            </div>

            {/* 3. CTA Button */}
            <div className="w-full flex justify-center pb-8">
                <Button className="mx-auto px-10 py-5 bg-brand-neon hover:bg-[#e6e200] border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">I'm ready to stand out!</span>
                        <span className="text-xs font-medium normal-case">$597 - The <span className="italic">$10k</span> Launch Lab</span>
                    </div>
                </Button>
            </div>

        </section>
    );
};
