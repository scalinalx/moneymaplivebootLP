import React from 'react';
import { Button } from './Button';

export const BioSection: React.FC = () => {
    const scrollToCheckout = () => {
        const element = document.getElementById('checkout');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-16">

                    {/* Image Column */}
                    <div className="w-full md:w-1/3 flex justify-center relative">
                        {/* Decorative backing for the image */}
                        <div className="absolute inset-0 bg-rose-50 transform rotate-3 rounded-lg scale-95 -z-10 shadow-2xl"></div>

                        <div className="relative w-64 md:w-full aspect-[3/4] shadow-[10px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden rounded-2xl rotate-[-2deg] border-4 border-black transition-transform hover:rotate-0 duration-500 bg-white p-2">
                            {/* Placeholder for Ana - using a stylish stock photo that fits the vibe */}
                            <img
                                src="/imgs/ana-calin.jpg"
                                alt="Ana - How We Grow"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-gray-200 cursor-pointer"
                                onClick={scrollToCheckout}
                            />
                        </div>
                    </div>

                    {/* Text Column - All Sales Final */}
                    <div className="w-full md:w-2/3 space-y-6 font-poppins text-base md:text-lg text-black leading-relaxed">
                        <h2 className="font-display font-black text-3xl md:text-5xl uppercase leading-none mb-4">
                            All Sales Final
                        </h2>

                        <p>
                            Because of the digital and live nature of this program — instant access to the full curriculum, templates, AI tools, community, and live coaching call the moment you join — <span className="font-bold">no refunds or guarantees can be offered.</span>
                        </p>

                        <p>
                            Please make sure you’re ready to do the work before enrolling. If you have questions about whether the Lab is the right fit for you, reach out before purchasing and we’ll help you decide.
                        </p>
                    </div>

                </div>

                {/* CTA */}
                <div className="w-full flex justify-center">
                    <Button
                        onClick={scrollToCheckout}
                        className="mx-auto px-10 py-3.5 bg-[#d81159] hover:bg-[#b30e4a] text-white border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">I WANT RESULTS LIKE THE LAB CREW!</span>
                    </Button>
                </div>

            </div >
        </section >
    );
};
