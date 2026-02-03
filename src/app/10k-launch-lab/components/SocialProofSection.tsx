import React from 'react';

export const SocialProofSection: React.FC = () => {
    return (
        <section className="w-full bg-white relative">

            {/* --- PART 1: WHITE BACKGROUND SECTION --- */}
            <div className="py-20 px-4">
                {/* 1. Top Testimonial Cluster (Stacked Notes) */}
                <div className="max-w-4xl mx-auto relative mb-32 flex flex-col items-center">

                    {/* First Note */}
                    <div className="bg-[#1a1a1a] text-white p-6 md:p-10 rounded-sm shadow-xl max-w-2xl transform -rotate-1 relative z-10 mx-auto w-full">
                        <p className="font-poppins text-sm md:text-lg leading-relaxed">
                            <span className="font-bold block mb-4 text-gray-200">Dear Ana,</span>
                            I bought your <span className="font-bold text-white">The <span className="italic">$10k</span> Launch Lab</span> yesterday and felt a strong impulse to reach out and say thank you. I'm genuinely blown away by your approach. I've invested in countless courses and coaching programs over the years, and this one feels like a <span className="font-bold text-white">deep exhale</span>. More than anything, it has brought back a sense of <span className="font-bold text-white">hope</span>.
                        </p>
                    </div>

                    {/* Connector Area & Arrow */}
                    <div className="relative h-16 w-full max-w-2xl pointer-events-none z-20 hidden md:block">
                        <svg className="absolute left-[-40px] top-[-20px] w-32 h-40 text-brand-neon" viewBox="0 0 100 120" style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.5))' }}>
                            <path d="M 60 10 Q 10 50 40 100" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="0" />
                            <path d="M 25 85 L 40 100 L 55 90" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Second Note */}
                    <div className="bg-[#1a1a1a] text-white p-6 md:p-10 rounded-sm shadow-xl max-w-2xl transform rotate-1 relative z-10 w-full mt-4 md:mt-0 md:ml-24 border border-gray-800">
                        <p className="font-poppins text-sm md:text-lg leading-relaxed font-medium">
                            <span className="text-brand-neon block mb-2 text-2xl font-hand">Omg.</span>
                            I just had to stop working through your workbook to say, THIS IS THE BEST $597 I'VE EVER SPENT! Wow. I am just blown away by the value that you put into The <span className="italic">$10k</span> Launch Lab. Just amazing!! Thank you so much, and I'm not even finished yet!!
                        </p>
                    </div>
                </div>

                {/* 2. Philosophy Text */}
                <div className="max-w-4xl mx-auto text-center mb-24 font-poppins px-4 relative">
                    <h2 className="text-2xl md:text-4xl font-bold italic mb-1 text-black">
                        The <span className="italic">$10k</span> Launch Lab ≠ <span className="italic decoration-4 decoration-brand-neon underline-offset-4">skipping branding</span>.
                    </h2>
                    <h2 className="text-2xl md:text-4xl font-black italic mb-10 text-black">
                        It's skipping the bullsh*t.
                    </h2>

                    <div className="space-y-8 text-base md:text-xl text-gray-800 leading-relaxed font-medium">
                        <p className="italic max-w-3xl mx-auto">
                            Traditional branding advice loves to waste your time with mission statements, "brand values" busywork, template culture, and play-it-safe logic that makes every brand sound the same.
                        </p>

                        <p className="italic max-w-4xl mx-auto">
                            The <span className="italic">$10k</span> Launch Lab is identity-first brand strategy <span className="text-[#ff4d4d] font-bold">that throws out the industry norms playbook</span> and teaches you the mechanics behind magnetism, attention, recognition, and resonance, so you can build a brand people feel on sight.
                        </p>

                        <p className="italic">
                            This is the foundation <span className="text-[#ff4d4d] font-bold">of everything.</span>
                        </p>
                    </div>
                </div>

                {/* 3. Bottom Dark Testimonials Grid (Original) */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-2 md:px-4">

                    {/* Left: Comment Thread Style */}
                    <div className="bg-black p-6 md:p-10 relative group border-2 border-black shadow-hard-sm md:shadow-hard">
                        <svg className="absolute -top-8 -left-8 w-24 h-24 text-brand-neon z-30 transform -rotate-12" viewBox="0 0 100 100">
                            <path d="M50 50 L50 20 M50 50 L80 50 M50 50 L50 80 M50 50 L20 50 M50 50 L71 29 M50 50 L71 71 M50 50 L29 71 M50 50 L29 29" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                        </svg>

                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex-shrink-0"></div>
                                <div className="bg-[#1a1a1a] p-3 md:p-4 rounded-2xl rounded-tl-none border border-gray-800 text-white flex-1">
                                    <p className="text-xs md:text-sm font-bold text-gray-400 mb-1">Sarah M.</p>
                                    <p className="text-sm md:text-base">Agree! Best $597 I've spent all year! I wouldn't sleep on this 🤯</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex-shrink-0"></div>
                                <div className="bg-[#1a1a1a] p-3 md:p-4 rounded-2xl rounded-tl-none border border-gray-800 text-white flex-1">
                                    <p className="text-xs md:text-sm font-bold text-gray-400 mb-1">Barbara K.</p>
                                    <p className="text-sm md:text-base">Just purchased. Can't wait to implement 💯</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex-shrink-0"></div>
                                <div className="bg-[#1a1a1a] p-3 md:p-4 rounded-2xl rounded-tl-none border border-gray-800 text-white flex-1">
                                    <p className="text-xs md:text-sm font-bold text-gray-400 mb-1">Mirjam</p>
                                    <p className="text-sm md:text-base">Money well spent i LOVED The <span className="italic">$10k</span> Launch Lab and all goodies that came with it. Thanks Ana!!!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Long Text */}
                    <div className="bg-black p-6 md:p-10 relative flex items-center border-2 border-black shadow-hard-sm md:shadow-hard">
                        <div className="bg-white text-black p-6 rounded-xl relative">
                            <div className="absolute top-6 -left-3 w-6 h-6 bg-white transform rotate-45"></div>
                            <p className="font-poppins text-sm md:text-base leading-relaxed relative z-10">
                                <span className="font-bold">Ana.. my hero. 😤😭</span> i just wanted to let you know , i have done so many courses workshops masterclasses you name it. But The <span className="italic">$10k</span> Launch Lab made me find my voice. And all the extra's oh god i cant thank you enough for the rebel chatgpt. I just had a long chat and an epifany. Not there yet at all but getting there. Thank you thank you!! And do charge more its all worth so much more 🍀🍀🍀 love from Holland, Miriam.
                            </p>
                        </div>
                        <svg className="absolute -bottom-10 -right-8 w-32 h-32 text-brand-neon transform rotate-12 z-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M50 85 C 10 70 -10 30 25 25 C 40 20 50 40 50 40 C 50 40 60 20 75 25 C 110 30 90 70 50 85 Z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M 60 25 L 65 15" strokeWidth="2" />
                            <path d="M 70 28 L 78 20" strokeWidth="2" />
                        </svg>
                    </div>

                </div>
            </div>

            {/* --- PART 2: NEW BLACK BACKGROUND SECTION --- */}
            <div className="w-full bg-black py-20 px-4 md:px-8 border-t-2 border-black">
                <div className="max-w-6xl mx-auto flex flex-col gap-24">

                    {/* 1. "The Tea is Hot" Single Card */}
                    <div className="relative w-full max-w-2xl mx-auto mt-8">
                        {/* Yellow Squiggle SVG */}
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-20 h-24 text-brand-neon z-20">
                            <svg viewBox="0 0 50 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
                                <path d="M25 100 C 40 80, 10 80, 25 60 C 40 40, 10 40, 25 20" />
                            </svg>
                        </div>

                        <div className="bg-white text-black p-6 md:p-8 rounded-xl shadow-[0px_0px_20px_rgba(255,255,255,0.1)] transform -rotate-2 relative z-10 mx-auto w-full text-center">
                            <p className="font-poppins font-bold text-lg md:text-2xl leading-snug">
                                The tea is hottt. Your The <span className="italic">$10k</span> Launch Lab is beyond amazing🤩🤩 ❤️ 🤩🤩 thank you so much!
                            </p>
                        </div>
                    </div>

                    {/* 2. Two-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full items-start">

                        {/* Left: Long Text Card */}
                        <div className="bg-white p-8 md:p-10 rounded-sm shadow-2xl relative">
                            <p className="font-poppins text-sm md:text-base leading-relaxed text-black font-medium">
                                Hi! I just want to directly reach out to tell you how happy I am with the <span className="font-bold">EXTREME</span> value you are providing with this program.<br /><br />
                                I chose to buy because it was not expensive and I am a rebel to my core but never thought it would take me that far and that deep and focus that much on the very foundation of identity and vision.<br /><br />
                                You help me <span className="font-bold">TREMENDOUSLY</span>.<br />
                                Aunty Brand is absolutely <span className="font-bold">AMAZYING</span>. Beyond words.<br />
                                Thank you deeply for making this available to me. Really.
                            </p>
                        </div>

                        {/* Right: Visuals + Chats */}
                        <div className="flex flex-col gap-6">
                            {/* 3 Image Panels (Mocking the collage) */}
                            <div className="bg-white p-3 rounded-lg grid grid-cols-3 gap-2 h-48 md:h-56 overflow-hidden shadow-lg">
                                <div className="bg-gray-100 h-full flex flex-col justify-center items-center relative overflow-hidden text-center p-1">
                                    <span className="font-display font-black text-lg leading-none mb-1">BLACK<br />FRIDAY</span>
                                    <span className="text-[6px] uppercase">Spending More</span>
                                </div>
                                <div className="bg-zinc-800 h-full flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-gray-600 to-black"></div>
                                    <span className="text-white text-xs font-bold relative z-10">Next Level</span>
                                </div>
                                <div className="bg-gray-200 h-full flex items-center justify-center relative overflow-hidden">
                                    {/* Abstract art */}
                                    <div className="w-12 h-12 bg-black rounded-full mix-blend-overlay"></div>
                                </div>
                            </div>

                            {/* Chat Bubbles */}
                            <div className="space-y-4 relative pl-2">
                                <div className="bg-[#e5e7eb] self-start py-3 px-5 rounded-3xl rounded-tl-sm text-black text-sm md:text-base font-medium inline-block shadow-sm">
                                    Look what I made!!!😍
                                </div>
                                <br />
                                <div className="bg-[#e5e7eb] self-start py-3 px-5 rounded-3xl rounded-tl-sm text-black text-sm md:text-base font-medium inline-block shadow-sm">
                                    Your offers are legit! Thanks for sharing your knowledge
                                </div>

                                {/* Arrow pointing to last bubble */}
                                <div className="absolute -bottom-16 right-0 md:right-10 w-24 h-24 text-brand-neon transform rotate-12">
                                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                        <path d="M80 80 Q 60 90 20 60" />
                                        <path d="M25 55 L 20 60 L 30 65" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </section>
    );
};
