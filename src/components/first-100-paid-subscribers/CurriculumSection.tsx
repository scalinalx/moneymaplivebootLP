import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FIRST100_PRICE } from '@/lib/stripe';

export const CurriculumSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white">
            <div className="max-w-[900px] w-full flex flex-col items-center">

                <div className="bg-[#FDF2F8] border border-rose-100 rounded-3xl p-6 md:p-8 mb-10 max-w-3xl text-left">
                    <p className="font-montserrat font-bold text-[#333333] text-sm uppercase tracking-widest mb-3">Why not just watch free YouTube videos about Substack?</p>
                    <p className="font-lato text-[#333333] text-base md:text-lg leading-relaxed">
                        Because free content tells you to "post consistently" and "grow your list." This workshop skips all of that and goes straight to the one thing the free content never covers: <span className="font-bold text-[#d81159]">how to convert the readers you already have into people who pay you.</span> That's a completely different skill — and it's the only one that puts money in your account.
                    </p>
                </div>

                <p className="font-montserrat text-black text-center text-xl md:text-[22px] leading-relaxed max-w-4xl mb-8">
                    A <span className="font-bold text-[#d81159]">90-minute live workshop on March 12th</span> built for one purpose: getting you to 100 paid subscribers and Substack Bestseller status — as fast as humanly possible, without burning out or begging for attention.
                </p>

                <h2 className="font-anton text-[rgb(56,170,185)] text-5xl md:text-7xl text-center mb-12 tracking-[0.05em] uppercase">
                    What's Inside
                </h2>

                <div className="flex flex-col gap-6 w-full">
                    {[
                        { bold: "The Bestseller Blueprint", italic: "the exact subscriber thresholds Substack uses to award Bestseller status — and the systematic path to hit them without luck." },
                        { bold: "The Paid Conversion System", italic: "the 5-lever framework that turns free readers into paid subscribers without ever feeling pushy, salesy, or desperate." },
                        { bold: "The Perfect Paid Tier", italic: "how to structure what's behind your paywall so readers feel they'd be crazy not to upgrade right now." },
                        { bold: "Pricing That Converts", italic: "the counterintuitive price points that maximise paid sign-ups — most writers get this badly wrong and lose half their conversions." },
                        { bold: "The 7-Day Upgrade Sequence", italic: "three emails that move your existing free subscribers to paid within a week — and feel completely natural to send." },
                        { bold: "The 30-Day Bestseller Roadmap", italic: "a day-by-day action plan to hit 100 paid subscribers and claim your Bestseller badge before next month." },
                        { bold: "The Paid Subscriber Welcome Sequence", italic: "make every new paid subscriber feel like they just made the best decision of their week — so they stay.", isBonus: true },
                        { bold: "The Objection-Crushing Copy Vault", italic: "the exact lines that dissolve 'I'll wait' and 'is it worth it?' before they're even said out loud.", isBonus: true },
                        { bold: "Tiny List, Big Revenue", italic: "how to hit Bestseller status with under 500 free subscribers — yes, this is genuinely possible and I'll show you exactly how.", isBonus: true },
                        { bold: "Viral Substack Notes Generator", italic: "($197 value) — the system I use to grow free AND paid subscribers simultaneously, without spending an extra hour on content.", isBonus: true }
                    ].map((item, index) => (
                        <div key={index} className="flex items-start gap-5">
                            <div className="flex-shrink-0 mt-1">
                                <img
                                    src="https://d9hhrg4mnvzow.cloudfront.net/learn.coachmariawendt.com/viral-product-course-retargeting-coupon/2b058da7-number-1-3_100u00u000000000000028.png"
                                    alt="Check"
                                    className="w-8 h-auto"
                                />
                            </div>
                            <div className="font-lato text-lg md:text-[19px] text-[#333333] leading-relaxed">
                                {item.isBonus && (
                                    <span className="inline-block bg-[#ffc300] text-black text-[10px] md:text-[12px] font-anton px-2 py-0.5 rounded-sm uppercase tracking-wider mr-2 align-middle">
                                        Bonus
                                    </span>
                                )}
                                <span className="font-bold">{item.bold}</span>{' '}
                                <span className="italic">{item.italic}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price and CTA */}
                <div className="mt-16 w-full flex flex-col items-center">
                    <div className="relative mb-2">
                        <span className="font-anton text-gray-500 text-3xl md:text-5xl">
                            Regular Price $300
                        </span>
                        <div className="absolute left-0 right-0 top-1/2 h-1.5 bg-[#E74C3C] transform -translate-y-1/2 rotate-[-5deg]"></div>
                    </div>
                    <div className="font-anton text-[#27AE60] text-7xl md:text-9xl mb-6">
                        ${FIRST100_PRICE / 100}
                    </div>
                    <button
                        onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-2xl py-6 px-10 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex flex-col md:flex-row items-center justify-center gap-3 text-center w-full md:w-auto"
                    >
                        <span>WHEN DO WE START?</span>
                        <ArrowRight className="w-6 h-6 hidden md:block group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </button>
                    <p className="font-lato text-gray-500 mt-4 text-sm">One-time payment. Live on March 12th + replay + all templates & bonuses.</p>
                </div>

            </div>
        </div>
    );
};
