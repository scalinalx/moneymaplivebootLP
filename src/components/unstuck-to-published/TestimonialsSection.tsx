import React from 'react';
import { ArrowRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                <div className="inline-flex items-center gap-2 bg-[#ffc300] text-black px-5 py-2 rounded-full text-xs font-montserrat font-black uppercase tracking-[2px] mb-6 shadow-md">
                    Real writers. Real results. Real growth.
                </div>

                <h2 className="font-anton text-4xl md:text-5xl text-[#333333] mb-4 text-center uppercase tracking-wide">
                    Here's What Happens When <span className="text-[#f72585]">You Actually Have a System</span>
                </h2>
                <p className="font-lora italic text-gray-500 text-center mb-12 text-lg max-w-2xl">
                    These writers didn't have bigger audiences or better writing. They just stopped guessing and started using a proven framework.
                </p>

                <div className="columns-1 md:columns-2 gap-8 w-full mb-12 space-y-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <div key={num} className="break-inside-avoid shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                            <img
                                src={`/imgs/first-100-paid-subscribers/testim/${num}.webp`}
                                alt={`Testimonial ${num}`}
                                className="w-full h-auto block"
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-2"
                >
                    <span>I WANT RESULTS LIKE THESE</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

            </div>
        </div>
    );
};
