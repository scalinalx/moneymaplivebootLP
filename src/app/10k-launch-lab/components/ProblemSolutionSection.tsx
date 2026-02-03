import React from 'react';
import { Button } from './Button';

export const ProblemSolutionSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">

            {/* 1. Main Text Content */}
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-8">
                <h2 className="font-poppins font-medium text-lg md:text-xl uppercase tracking-widest text-gray-500">
                    We shop with our eyes first.
                </h2>

                <p className="font-poppins text-2xl md:text-4xl leading-tight text-black max-w-3xl mx-auto">
                    People don't buy your product, <span className="font-bold italic">they buy the feeling that your brand gives them.</span>
                </p>

                {/* The List Area */}
                <div className="text-left max-w-2xl mx-auto font-poppins text-base md:text-lg text-gray-800 leading-relaxed mt-12 mb-12">
                    <p className="font-bold mb-6 text-black">The <span className="italic">$10k</span> Launch Lab is for you if....</p>
                    <ul className="space-y-4 list-disc list-outside pl-5 marker:text-black">
                        <li>you're sick of doing things the traditional way and are ready to carve your own path</li>
                        <li>you're tired of blending in and getting lost in the online noise</li>
                        <li>your current brand just doesn't feel like you</li>
                        <li>you know who you are and want that to be brought forward</li>
                        <li>you want to show up confidently online & make more sales.</li>
                    </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-4 pb-8">
                    <Button className="mx-auto px-10 py-5 bg-brand-neon hover:bg-[#e6e200] border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                        <div className="flex flex-col items-center leading-tight">
                            <span className="font-normal text-lg md:text-xl tracking-wide uppercase">I'm ready to stand out!</span>
                            <span className="text-xs font-medium normal-case">$597 - The <span className="italic">$10k</span> Launch Lab</span>
                        </div>
                    </Button>
                </div>

                <p className="font-poppins font-medium text-lg md:text-2xl max-w-3xl mx-auto">
                    Learn what to focus on to create a signature <span className="italic font-bold">vibe</span> while breaking all the traditional brand rules, in just a few hours.
                </p>
            </div>

            {/* 2. Before / After Visuals */}
            <div className="max-w-6xl w-full mx-auto relative mt-12">

                <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start justify-center relative">

                    {/* LEFT: BEFORE (The Boring Grid) */}
                    <div className="flex flex-col items-center w-full max-w-md">
                        <div className="grid grid-cols-3 grid-rows-3 gap-1 md:gap-2 w-full aspect-square bg-gray-50 p-2 border border-gray-100 shadow-sm">
                            {/* 9 generic boxes imitating stock photos/canva templates */}
                            <div className="bg-blue-100 flex items-center justify-center relative overflow-hidden">
                                <div className="w-full h-1/2 bg-blue-200 absolute bottom-0 opacity-50"></div>
                                <span className="relative z-10 text-[8px] text-gray-500 uppercase tracking-widest">Post</span>
                            </div>
                            <div className="bg-pink-50 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-white text-xs">:)</div>
                            </div>
                            <div className="bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center grayscale opacity-50"></div>

                            <div className="bg-white border border-gray-100 flex items-center justify-center text-[6px] p-2 text-center font-serif leading-tight">
                                "Dream big,<br />work hard."
                            </div>
                            <div className="bg-amber-100 flex items-center justify-center text-amber-800 text-xs">Latte Art</div>
                            <div className="bg-[url('https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center opacity-60"></div>

                            <div className="bg-purple-50 flex items-center justify-center text-[6px] text-center p-1 font-hand text-purple-800">Live Laugh Love</div>
                            <div className="bg-orange-50 flex flex-col items-center justify-center gap-1">
                                <div className="w-4 h-4 bg-orange-200 rounded-sm"></div>
                                <div className="w-8 h-1 bg-orange-200 rounded-full"></div>
                            </div>
                            <div className="bg-gray-100 flex items-center justify-center text-[8px] uppercase tracking-wider text-gray-400">Link In Bio</div>
                        </div>
                        <h3 className="font-rock text-4xl md:text-5xl mt-8 text-gray-400 transform -rotate-2">BEFORE</h3>
                    </div>

                    {/* ARROW (Absolute centered on desktop) */}
                    <div className="hidden md:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-24 z-10 pointer-events-none">
                        <svg viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="4" className="text-black overflow-visible drop-shadow-sm">
                            {/* Wavy arrow path */}
                            <path d="M 20 40 C 60 80, 140 80, 180 40" strokeLinecap="round" />
                            {/* Arrowhead */}
                            <path d="M 170 45 L 180 40 L 175 30" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* RIGHT: AFTER (The Rebel Grid) */}
                    <div className="flex flex-col items-center w-full max-w-md">
                        <div className="grid grid-cols-3 grid-rows-3 gap-1 md:gap-2 w-full aspect-square bg-black p-2 border border-black shadow-2xl">
                            {/* 9 edgy boxes imitating the rebel vibe */}

                            {/* 1. Flash photography vibe */}
                            <div className="bg-zinc-800 flex items-center justify-center relative overflow-hidden grayscale contrast-125">
                                <div className="absolute w-20 h-20 bg-white rounded-full blur-xl opacity-20 top-0 left-0"></div>
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center mix-blend-luminosity"></div>
                            </div>

                            {/* 2. Bold text */}
                            <div className="bg-brand-neon flex items-center justify-center p-1">
                                <span className="font-display font-black text-xs md:text-sm uppercase leading-none text-center">WE'RE<br />GOING<br />ALL IN.</span>
                            </div>

                            {/* 3. Dark Mood */}
                            <div className="bg-zinc-900 flex items-center justify-center relative">
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center grayscale contrast-150"></div>
                                <div className="absolute inset-0 bg-black/30"></div>
                            </div>

                            {/* 4. Members Only */}
                            <div className="bg-white flex items-center justify-center p-1">
                                <div className="border border-black px-1 py-0.5">
                                    <span className="font-display font-bold text-[8px] md:text-[10px] uppercase text-black tracking-tighter block text-center">Members<br />Only<br />Club</span>
                                </div>
                            </div>

                            {/* 5. Flash Photo */}
                            <div className="bg-zinc-800 flex items-center justify-center overflow-hidden relative">
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center grayscale contrast-125"></div>
                                <div className="absolute inset-0 bg-noise opacity-20"></div>
                            </div>

                            {/* 6. Phone */}
                            <div className="bg-[#f0f0f0] flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center sepia-[.5]"></div>
                            </div>

                            {/* 7. Checkerboard */}
                            <div className="bg-black relative overflow-hidden">
                                <div className="absolute inset-0 opacity-100" style={{ backgroundImage: 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)', backgroundSize: '10px 10px' }}></div>
                            </div>

                            {/* 8. Clothes/Fashion */}
                            <div className="bg-zinc-800 flex items-center justify-center">
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1550614000-4b9519e02a29?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center grayscale"></div>
                            </div>

                            {/* 9. High Contrast */}
                            <div className="bg-zinc-900 flex items-center justify-center">
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center grayscale contrast-125"></div>
                            </div>
                        </div>
                        <h3 className="font-rock text-4xl md:text-5xl mt-8 transform -rotate-2 text-black">AFTER</h3>
                    </div>

                </div>

                {/* Mobile Arrow replacement */}
                <div className="md:hidden w-full flex justify-center my-8">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>

            </div>

        </section>
    );
};
