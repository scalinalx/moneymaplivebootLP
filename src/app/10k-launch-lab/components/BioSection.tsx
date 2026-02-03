import React from 'react';
import { Button } from './Button';

export const BioSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-16">

                    {/* Image Column */}
                    <div className="w-full md:w-1/3 flex justify-center relative">
                        {/* Decorative backing for the image */}
                        <div className="absolute inset-0 bg-gray-100 transform rotate-3 rounded-lg scale-95 -z-10"></div>

                        <div className="relative w-64 md:w-full aspect-[3/4] shadow-[10px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden rounded-sm rotate-[-2deg] border-4 border-white transition-transform hover:rotate-0 duration-500">
                            {/* Placeholder for Ana - using a stylish stock photo that fits the vibe */}
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                                alt="Ana - How We Grow"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="w-full md:w-2/3 space-y-6 font-poppins text-base md:text-lg text-black leading-relaxed">
                        <p>
                            I'm Ana, founder and head rebel at How We Grow, and your guide inside The <span className="italic">$10k</span> Launch Lab.
                        </p>
                        <p>
                            I've married my passion for branding, aesthetics, and subcultures with 30 years of business experience to create a consultancy that helps small business owners stop blending in and start building brands that actually sell.
                        </p>
                        <p>
                            I've grown How We Grow into a multiple 5-figure-a-month business built on bold choices and atmosphere-driven branding. My work is proof that you don't have to follow the traditional path or play it safe, you can build a business that feels good, authentic, and profitable.
                        </p>
                        <p className="font-bold italic text-lg md:text-xl pt-2">
                            The <span className="italic">$10k</span> Launch Lab is your permission slip to do things differently.
                        </p>
                    </div>

                </div>

                {/* CTA */}
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
