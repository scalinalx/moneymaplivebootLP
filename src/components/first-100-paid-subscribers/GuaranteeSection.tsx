import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

export const GuaranteeSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#E0F7FA]">
            <div className="max-w-[800px] w-full flex flex-col items-center text-center">

                <div className="w-24 h-24 rounded-full bg-white border-4 border-[#27AE60] flex items-center justify-center mb-8 shadow-xl">
                    <Shield className="w-12 h-12 text-[#27AE60]" />
                </div>

                <h2 className="font-anton text-4xl md:text-5xl text-[#333333] mb-4 uppercase tracking-wide">
                    The "Show Up & Implement" <span className="text-[#27AE60]">Promise</span>
                </h2>

                <p className="font-lora text-[#333333] text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl">
                    Because this is a live workshop with real-time access and instant digital delivery of all materials, all sales are final.
                </p>

                <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#27AE60]/30 shadow-sm mb-8 text-left">
                    <p className="font-montserrat font-bold text-[#333333] text-lg md:text-xl mb-4 uppercase">
                        Here's what I can promise you:
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Apply the 7-Day Upgrade Sequence and you will see paid subscribers move — often within the first 48 hours of sending.",
                            "Implement the Paid Tier Structure and your paywall will stop feeling like a wall and start feeling like a VIP invitation.",
                            "Use the 30-Day Bestseller Roadmap and you will have a clearer path to Bestseller status than 95% of Substack writers who are winging it.",
                            "Show up to the live workshop with your questions and I will answer them in real time — so you leave with zero ambiguity about your next step."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#27AE60] flex items-center justify-center mt-0.5">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-lato text-[#333333] text-base md:text-lg leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Proof Insert */}
                <div className="w-full max-w-[600px] flex justify-center mb-10">
                    <img src="/imgs/first-100-paid-subscribers/testim/17.webp" alt="Testimonial 17" className="w-full rounded-2xl shadow-lg border border-[#27AE60]/30 object-contain" />
                </div>

                <p className="font-lora italic text-gray-500 text-lg mb-10">
                    The only way this doesn't work for you is if you don't implement it. And if you implement even one module, you'll earn back your $97 with your first handful of new paid subscribers.
                </p>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-2"
                >
                    <span>I'M IN, ANA!</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

            </div>
        </div>
    );
};
