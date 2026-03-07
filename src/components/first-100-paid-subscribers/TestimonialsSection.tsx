import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

const testimonials = [
    {
        quote: "I'd been sitting on my paid tier idea for 8 months. After one session of applying Ana's upgrade sequence, I had 23 new paid subscribers in 5 days. The copy vault alone is worth 10x what I paid.",
        name: "Sarah M.",
        role: "Health & Wellness Writer",
        result: "0 → 23 paid in 5 days"
    },
    {
        quote: "I went from 4 paid subscribers to 118 in 27 days. I didn't change my writing — I changed my conversion system. Ana's framework is the only thing that actually moved the needle.",
        name: "James R.",
        role: "Finance Newsletter",
        result: "4 → 118 paid in 27 days"
    },
    {
        quote: "I was convinced I needed thousands of free subscribers before I could charge anyone. Ana completely dismantled that belief. I hit Bestseller status with 340 free subscribers. I nearly fell off my chair.",
        name: "Priya K.",
        role: "Personal Development Writer",
        result: "Bestseller with 340 free subs"
    },
    {
        quote: "The paywall strategy module alone saved me from making the mistake that kills most newsletter monetisations. I now know exactly what to put behind the wall — and my conversion rate proves it.",
        name: "Tom B.",
        role: "Tech & Startups Newsletter",
        result: "Conversion rate tripled"
    },
];

export const TestimonialsSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                <div className="inline-flex items-center gap-2 bg-[#ffc300] text-black px-5 py-2 rounded-full text-xs font-montserrat font-black uppercase tracking-[2px] mb-6 shadow-md">
                    Real writers. Real results. Real Bestseller badges.
                </div>

                <h2 className="font-anton text-4xl md:text-5xl text-[#333333] mb-4 text-center uppercase tracking-wide">
                    Here's What Happens When <span className="text-[#d81159]">You Actually Have a System</span>
                </h2>
                <p className="font-lora italic text-gray-500 text-center mb-12 text-lg max-w-2xl">
                    These writers didn't have bigger audiences or better writing. They just stopped guessing and started using a proven conversion framework.
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
                    className="group bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-2"
                >
                    <span>I WANT RESULTS LIKE THESE</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

            </div>
        </div>
    );
};
