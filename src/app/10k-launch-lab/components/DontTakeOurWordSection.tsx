import React from 'react';

export const DontTakeOurWordSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">
            <h2 className="font-poppins font-bold text-2xl md:text-4xl text-black mb-12 text-center uppercase tracking-tight">
                PS: Don't Take Our Word For It...
            </h2>

            <div className="w-full max-w-2xl bg-black p-6 md:p-12 rounded-[2rem] relative shadow-2xl flex flex-col gap-6 md:gap-8">

                {/* Decorative Arrow 1 (Top Left pointing to first bubble) */}
                <div className="absolute -top-8 -left-2 md:top-6 md:-left-16 w-16 h-16 md:w-24 md:h-24 text-[#ff4d4d] z-20 transform -rotate-12 hidden md:block">
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <path d="M 10 80 Q 40 20 80 40" />
                        <path d="M 70 35 L 80 40 L 75 50" />
                    </svg>
                </div>

                {/* Bubble 1: Invite to follow */}
                <div className="self-end bg-white text-black p-4 rounded-2xl rounded-tr-none max-w-[90%] md:max-w-[70%] relative shadow-[4px_4px_0px_#333]">
                    <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px]">f</div>
                        <span className="text-blue-600 font-bold text-xs uppercase">Invite to follow</span>
                    </div>
                    <p className="font-medium text-sm md:text-base">I loved The <span className="italic">$10k</span> Launch Lab.</p>
                </div>

                {/* Bubble 2: Hi Ana */}
                <div className="self-start bg-white text-black p-5 rounded-2xl rounded-tl-none max-w-[90%] md:max-w-[80%] shadow-[4px_4px_0px_#333]">
                    <p className="text-sm md:text-base">
                        Hi Ana, I just wanted to say thank you. I bought The <span className="italic">$10k</span> Launch Lab and the assets and it was absolutely fantastic.
                    </p>
                </div>

                {/* Bubble 3: Quote */}
                <div className="self-end bg-white text-black p-6 rounded-2xl rounded-br-none max-w-[90%] md:max-w-[80%] relative mt-2 md:mt-4 shadow-[4px_4px_0px_#333] border-l-4 border-gray-200">
                    <p className="italic text-gray-600 font-serif text-sm md:text-lg">
                        "even just buying this gave me some kind of permission I was needing from myself!"
                    </p>

                    {/* Arrow pointing to this */}
                    <div className="absolute -bottom-10 -right-4 md:-right-10 w-12 h-12 md:w-16 md:h-16 text-[#ff4d4d] transform rotate-12 z-20">
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M 80 100 Q 100 50 60 20" />
                            <path d="M 70 20 L 60 20 L 65 30" />
                        </svg>
                    </div>
                </div>

                {/* Bubble 4: Amazing */}
                <div className="self-center w-full bg-white text-black p-6 rounded-xl transform -rotate-1 mt-4 md:mt-6 shadow-[4px_4px_0px_#333]">
                    <p className="font-bold text-base md:text-lg italic text-center">
                        This is amazing! It helps me so much to find my special language that fits my brand! Thank you!
                    </p>
                </div>

                {/* Bubble 5: Long text */}
                <div className="self-start bg-white text-black p-5 rounded-2xl max-w-[95%] mt-4 text-xs md:text-sm leading-relaxed shadow-[4px_4px_0px_#333] relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 text-[#ff4d4d]">
                        <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M 25 0 L 25 35" />
                            <path d="M 15 25 L 25 35 L 35 25" />
                        </svg>
                    </div>
                    <p className="font-bold mb-1">Hi Ana,</p>
                    <p>
                        Just wanted to let you know that I finally went through all the content today and it's FANTASTIC! It was exactly what I was looking for. I'm glad I upgraded prompt like a pro. It gave me everything I needed to create images with AI. Thank you for creating such a great resource.
                    </p>
                </div>

                {/* Bubble 6: Brilliant */}
                <div className="self-start md:self-end w-full md:w-auto flex flex-col md:flex-row items-end gap-4 mt-6 md:mt-4 relative">

                    {/* Left part of this row (on desktop) */}
                    <div className="bg-white text-black p-5 rounded-2xl rounded-tr-none shadow-[4px_4px_0px_#333] max-w-full md:max-w-xs relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-brand-neon overflow-hidden border border-black">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover grayscale" alt="User" />
                            </div>
                            <span className="font-bold leading-tight">Brilliant<br />Launch Lab.</span>
                        </div>
                        <p className="text-sm md:text-base">
                            Thank you for confirming what I've been thinking.
                        </p>
                    </div>

                    {/* Right part (Date note) */}
                    <div className="bg-[#f0f0f0] p-4 rounded-xl text-xs shadow-sm transform rotate-2 max-w-[200px] border border-gray-300">
                        <span className="block text-[10px] text-gray-500 mb-1 border-b border-gray-200 pb-1">May 12, 2025</span>
                        <p>
                            ...The <span className="italic">$10k</span> Launch Lab was the shit! I quickly dove in and redid my whole brand kit now my brand now visually FEELS like me.
                        </p>

                        {/* Arrow pointing to this note */}
                        <div className="absolute -top-10 -right-4 w-12 h-12 text-[#ff4d4d] transform -rotate-12 hidden md:block">
                            <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M 40 0 Q 45 20 20 40" />
                                <path d="M 25 35 L 20 40 L 30 45" />
                            </svg>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};
