import React from 'react';
import { Button } from './Button';

export const MagnetismSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center border-t border-gray-100">

            <div className="max-w-4xl w-full mx-auto">

                {/* 1. Intro Text */}
                <div className="space-y-6 font-poppins text-base md:text-lg text-black leading-relaxed mb-12">
                    <p>
                        You don't need to hire an agency that will take months and cost thousands of dollars.
                    </p>
                    <p>
                        You need The <span className="italic">$10k</span> Launch Lab to give you the exact strategy so you can create a brand that will stop traffic & turn heads.
                    </p>

                    <h3 className="text-xl md:text-2xl font-black pt-4">
                        I'm not here to teach you how to "play it safe".
                    </h3>

                    <p>
                        I'm here to give you my exact strategy and show you how to build & position your brand so that you can attract the right buyers, <span className="text-[#ff4d4d] font-bold italic">and repel everyone else.</span>
                    </p>

                    <p>
                        If you want to attract buyers, you need to stop them in their tracks and get them to pay attention.
                    </p>

                    <p className="font-bold text-lg pt-4">
                        A magnetic brand <span className="font-black">WILL</span>:
                    </p>
                </div>

                {/* 2. Magnet Illustration */}
                <div className="w-full py-12 flex justify-center overflow-hidden">
                    <div className="relative w-full max-w-3xl h-[250px] md:h-[300px]">

                        {/* Hand-drawn SVG Scene */}
                        <svg className="w-full h-full" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">

                            {/* --- LEFT: The Brand (Magnet Holder) --- */}
                            <g transform="translate(100, 100)">
                                {/* Stick Figure Holding Magnet */}
                                <circle cx="0" cy="0" r="15" stroke="black" strokeWidth="3" fill="none" /> {/* Head */}
                                <path d="M0 15 L0 80" stroke="black" strokeWidth="3" /> {/* Body */}
                                <path d="M0 80 L-15 130" stroke="black" strokeWidth="3" /> {/* Leg L */}
                                <path d="M0 80 L15 130" stroke="black" strokeWidth="3" /> {/* Leg R */}

                                {/* Arms holding magnet */}
                                <path d="M0 30 L40 40" stroke="black" strokeWidth="3" />
                                <path d="M0 30 L40 60" stroke="black" strokeWidth="3" />
                            </g>

                            {/* The Giant Magnet */}
                            <g transform="translate(180, 150) rotate(-10)">
                                {/* U Shape */}
                                <path d="M0 0 L50 0 A 25 25 0 0 1 50 50 L0 50" stroke="black" strokeWidth="15" fill="none" strokeLinecap="round" />
                                <path d="M0 -15 L50 -15 A 40 40 0 0 1 50 65 L0 65" stroke="black" strokeWidth="2" fill="none" />
                                <rect x="-10" y="-20" width="20" height="30" fill="black" />
                                <rect x="-10" y="40" width="20" height="30" fill="black" />

                                {/* "Force" Lines */}
                                <path d="M70 10 L90 5" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
                                <path d="M70 25 L100 25" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
                                <path d="M70 40 L90 45" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
                            </g>

                            {/* Label: YOUR BRAND */}
                            <text x="140" y="280" fontFamily="Rock Salt, cursive" fontSize="24" textAnchor="middle" fill="black">YOUR BRAND</text>


                            {/* --- MIDDLE: Attraction Arrow --- */}
                            <path d="M500 240 Q 400 260 300 200" stroke="#ff4d4d" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#ff4d4d" />
                                </marker>
                            </defs>


                            {/* --- RIGHT: Ideal Customers --- */}
                            <g transform="translate(500, 100)">
                                {/* Label: YOUR IDEAL CUSTOMERS */}
                                <text x="100" y="180" fontFamily="Rock Salt, cursive" fontSize="24" textAnchor="middle" fill="black">YOUR IDEAL CUSTOMERS</text>

                                {/* Customer 1 (Listening/Happy) */}
                                <g transform="translate(0, 0)">
                                    <circle cx="0" cy="0" r="12" stroke="black" strokeWidth="2" />
                                    <path d="M-5 2 Q0 8 5 2" stroke="black" strokeWidth="1" fill="none" /> {/* Smile */}
                                    <path d="M0 12 L0 60 M0 60 L-10 100 M0 60 L10 100 M0 30 L-10 50 M0 30 L10 50" stroke="black" strokeWidth="2" />
                                </g>

                                {/* Customer 2 (Excited) */}
                                <g transform="translate(40, 10)">
                                    <circle cx="0" cy="0" r="12" stroke="black" strokeWidth="2" />
                                    <path d="M-5 0 Q0 5 5 0" stroke="black" strokeWidth="1" fill="none" /> {/* Smile */}
                                    <circle cx="-4" cy="-4" r="1" fill="black" /> <circle cx="4" cy="-4" r="1" fill="black" />
                                    <path d="M0 12 L0 60 M0 60 L-10 100 M0 60 L10 100 M0 25 L-15 10 M0 25 L15 10" stroke="black" strokeWidth="2" />
                                </g>

                                {/* Customer 3 (Businessy) */}
                                <g transform="translate(80, 5)">
                                    <rect x="-10" y="-15" width="20" height="25" fill="none" stroke="black" strokeWidth="2" rx="5" /> {/* Head shape variation */}
                                    <path d="M0 10 L0 60 M0 60 L-10 100 M0 60 L10 100 M0 30 L-10 60 M0 30 L10 60" stroke="black" strokeWidth="2" />
                                    <path d="M-5 30 L5 30 L0 40 Z" fill="black" /> {/* Tie */}
                                </g>

                                {/* Customer 4 (Cool) */}
                                <g transform="translate(120, 0)">
                                    <circle cx="0" cy="0" r="12" stroke="black" strokeWidth="2" />
                                    <line x1="-8" y1="-2" x2="8" y2="-2" stroke="black" strokeWidth="4" /> {/* Glasses */}
                                    <path d="M0 12 L0 60 M0 60 L-10 100 M0 60 L10 100 M0 30 L-10 50 M0 30 L10 50" stroke="black" strokeWidth="2" />
                                </g>

                                {/* Customer 5 */}
                                <g transform="translate(160, 15)">
                                    <circle cx="0" cy="0" r="12" stroke="black" strokeWidth="2" />
                                    <path d="M0 12 L0 60 M0 60 L-10 100 M0 60 L10 100" stroke="black" strokeWidth="2" />
                                </g>
                            </g>

                            {/* --- Repelled Person (Flying away left) --- */}
                            <g transform="translate(50, 50) rotate(-45)">
                                <text x="0" y="-20" fontSize="12" fontFamily="sans-serif" fill="gray">Nope!</text>
                                <circle cx="0" cy="0" r="10" stroke="gray" strokeWidth="2" />
                                <path d="M0 10 L0 50 M0 50 L-10 80 M0 50 L10 80 M0 25 L-15 10 M0 25 L15 10" stroke="gray" strokeWidth="2" />
                                {/* Speed lines */}
                                <path d="M20 10 L40 10" stroke="gray" strokeWidth="1" />
                                <path d="M20 30 L40 30" stroke="gray" strokeWidth="1" />
                            </g>

                        </svg>
                    </div>
                </div>

                {/* 3. Bullet Points */}
                <div className="w-full max-w-2xl mx-auto mb-16">
                    <ul className="space-y-4 font-poppins text-base md:text-lg text-black">
                        <li className="flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                            <span>Break through the noise and build trust.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                            <span>Increase engagement and make attracting customers, <span className="italic">easier</span>.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                            <span>Create a <span className="font-bold italic">stronger</span> brand identity.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                            <span>Build long term loyalty.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                            <span>Set you apart.</span>
                        </li>
                    </ul>
                </div>

                {/* 4. CTA */}
                <div className="w-full flex justify-center">
                    <Button className="mx-auto px-10 py-5 bg-brand-neon hover:bg-[#e6e200] border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                        <div className="flex flex-col items-center leading-tight">
                            <span className="font-normal text-lg md:text-xl tracking-wide uppercase">I'm ready to stand out!</span>
                            <span className="text-xs font-medium normal-case">$597 - The <span className="italic">$10k</span> Launch Lab</span>
                        </div>
                    </Button>
                </div>

            </div>
        </section>
    );
};
