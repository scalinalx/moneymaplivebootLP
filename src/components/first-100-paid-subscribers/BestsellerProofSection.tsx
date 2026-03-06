import React from 'react';
import { ArrowRight } from 'lucide-react';

export const BestsellerProofSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#FDF2F8]">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                <div className="inline-flex items-center gap-2 bg-[#d81159] text-white px-5 py-2 rounded-full text-xs font-montserrat font-black uppercase tracking-[2px] mb-6 shadow-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    Real Results. Real Bestseller Status.
                </div>

                <h2 className="font-anton text-3xl md:text-5xl text-[#333333] mb-4 text-center uppercase tracking-wide">
                    This Is What <span className="text-[#d81159]">Bestseller Status</span> Looks Like
                </h2>
                <p className="font-lora italic text-gray-500 text-center mb-12 text-lg md:text-xl max-w-2xl">
                    Not theory. Not a screenshot from someone else's account. These are Ana's actual Substack results — built with the exact system you're about to learn.
                </p>

                {/* 2x2 Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-12">
                    {[
                        { src: '/imgs/first-100-paid-subscribers/1.webp', alt: 'Substack Bestseller Status — Proof 1' },
                        { src: '/imgs/first-100-paid-subscribers/2.webp', alt: 'Substack Bestseller Status — Proof 2' },
                    ].map((img, i) => (
                        <div
                            key={i}
                            className="rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-auto block"
                            />
                        </div>
                    ))}
                </div>

                <p className="font-montserrat font-bold text-[#333333] text-center text-lg md:text-xl mb-10 max-w-2xl">
                    Inside the workshop, I show you step-by-step how I got here — and give you the exact system to replicate it on your own Substack.
                </p>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-2"
                >
                    <span>I WANT TO HIT BESTSELLER STATUS!</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

            </div>
        </div>
    );
};
