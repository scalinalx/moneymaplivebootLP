import React from 'react';
import { Button } from './Button';

export const DeepDiveSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">

            <div className="max-w-3xl w-full mx-auto text-center space-y-6 mb-12">
                <h2 className="font-poppins font-black text-xl md:text-3xl text-black">
                    Stop wasting time and money on generic templates.
                </h2>
                <p className="font-poppins text-lg md:text-xl text-black">
                    And start creating a brand that people can't get enough of.
                </p>
                <p className="font-poppins text-lg md:text-xl text-black">
                    Inside The <span className="italic">$10k</span> Launch Lab, I'll show you how to go from <span className="font-bold italic">meh to magnetic.</span>
                </p>
                <p className="font-poppins text-lg md:text-xl text-black pt-4">
                    We go deep into:
                </p>
            </div>

            {/* Diagram */}
            <div className="w-full max-w-md mx-auto mb-16 relative">
                <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-sm">
                    {/* Circle */}
                    <circle cx="200" cy="200" r="190" fill="none" stroke="black" strokeWidth="8" />

                    {/* Cross Lines */}
                    <line x1="200" y1="10" x2="200" y2="390" stroke="black" strokeWidth="8" />
                    <line x1="10" y1="200" x2="390" y2="200" stroke="black" strokeWidth="8" />

                    {/* Quadrant Text */}
                    <g className="font-rock text-3xl md:text-4xl" textAnchor="middle" dominantBaseline="middle" fill="black" style={{ letterSpacing: '0.05em' }}>
                        {/* Top Left */}
                        <text x="100" y="85">POINT OF</text>
                        <text x="100" y="125">VIEW</text>

                        {/* Top Right */}
                        <text x="300" y="85">SIGNATURE</text>
                        <text x="300" y="125">ENERGY</text>

                        {/* Bottom Left */}
                        <text x="100" y="275">RED</text>
                        <text x="100" y="315">FLAGS</text>

                        {/* Bottom Right */}
                        <text x="300" y="275">VISUAL</text>
                        <text x="300" y="315">IMPACT</text>
                    </g>
                </svg>
            </div>

            {/* Detailed Copy */}
            <div className="max-w-3xl w-full mx-auto space-y-6 font-poppins text-base md:text-lg text-black leading-relaxed mb-12">
                <p>
                    Whether you're building a personal brand, a product, or service based business, you NEED to stand out from the sea-of-sames.
                </p>
                <p>
                    The <span className="italic">$10k</span> Launch Lab takes the guesswork <span className="italic">(and the agency price tag)</span> out, so that your brand can withstand the trends.
                </p>
                <p>
                    If you're trying to appeal to the masses, you're appealing to no one.
                </p>
                <p>
                    I'm going to show you how to quickly generate emotional recognition through your rebellious edge.
                </p>

                <div className="pt-4 space-y-4">
                    <p className="font-bold">
                        You need to have a point of view.
                    </p>
                    <p className="font-bold">
                        You need to have a signature look.
                    </p>
                    <p className="font-bold">
                        You need to be the first one people think of and the last one they remember.
                    </p>
                </div>

                <p className="pt-4">
                    We focus on building brand equity through a visual-first approach because when someone mentally assigns a value to your brand, it's got to have a 7-figure look.
                </p>
            </div>

            {/* CTA */}
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
