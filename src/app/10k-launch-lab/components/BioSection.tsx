import React from 'react';
import { Button } from './Button';
import { ShieldCheck, Check } from 'lucide-react';

export const BioSection: React.FC = () => {
    const scrollToCheckout = () => {
        const element = document.getElementById('waitlist');
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
                        <div className="absolute inset-0 bg-brand-neon transform rotate-3 rounded-lg scale-95 -z-10 shadow-hard"></div>

                        <div className="relative w-64 md:w-full aspect-[3/4] shadow-[10px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden rounded-sm rotate-[-2deg] border-4 border-black transition-transform hover:rotate-0 duration-500 bg-white p-2">
                            {/* Placeholder for Ana - using a stylish stock photo that fits the vibe */}
                            <img
                                src="/imgs/ana-calin.jpg"
                                alt="Ana - How We Grow"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-gray-200"
                            />
                        </div>
                    </div>

                    {/* Text Column - Guarantee */}
                    <div className="w-full md:w-2/3 space-y-6 font-poppins text-base md:text-lg text-black leading-relaxed">
                        <h2 className="font-display font-black text-3xl md:text-5xl uppercase leading-none mb-4">
                            ⚡ THE GUARANTEE:<br />
                            "Launch-or-We-Fix-It"
                        </h2>

                        <p className="font-bold">Here's my promise to you:</p>

                        <div className="bg-gray-50 p-6 border-l-4 border-black space-y-4">
                            <p className="font-bold">IF YOU:</p>
                            <ul className="space-y-2 pl-4">
                                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /> Complete all 30 daily tasks</li>
                                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /> Attend ALL 4 weekly calls</li>
                                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /> Launch your offer within 45 days</li>
                            </ul>

                            <p className="font-bold pt-2">AND YOU DON'T MAKE AT LEAST $3,000...</p>
                        </div>

                        <div className="space-y-2">
                            <p className="font-bold">I'LL PERSONALLY:</p>
                            <ol className="list-decimal pl-5 space-y-1 font-medium">
                                <li>Audit your entire sales funnel</li>
                                <li>Rewrite your sales page headline + CTA</li>
                                <li>Give you a custom recovery plan</li>
                            </ol>
                        </div>

                        <p className="font-bold text-xl">OR refund your $597. No questions asked.</p>

                        <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                            <ShieldCheck className="w-5 h-5" />
                            You literally can't lose if you do the work.
                        </div>
                    </div>

                </div>

                {/* CTA */}
                <div className="w-full flex justify-center">
                    <Button
                        onClick={scrollToCheckout}
                        className="mx-auto px-10 py-3.5 bg-brand-neon hover:bg-[#e6e200] border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">I WANT RESULTS LIKE THE LAB CREW!</span>
                    </Button>
                </div>

            </div >
        </section >
    );
};
