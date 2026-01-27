import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HIT10K_PRICE } from '@/lib/stripe';

export const OfferStack: React.FC = () => {
    const stackItems = [
        {
            bold: "clear instructions on how to do this without having to pay for any additional equipment or software.",
            italic: "You can create your viral digital product literally for free."
        },
        {
            bold: "best practices for what to include, what to leave out, & how to properly structure your digital product",
            italic: "so it actually goes viral!"
        },
        {
            bold: "how to choose the right price point for your digital product so everyone who sees how much you're charging feels excited",
            italic: "(charge too much or too little and it will kill your product's momentum)"
        },
        {
            bold: "insider secrets on the top 3 things every digital product needs to have included",
            italic: "in order to catch fire in the marketplace."
        },
        {
            bold: "how to create a course outline that is so sexy your potential customers HAVE to buy your digital product",
            italic: "(this is one of the many ways you can make a product blow up)"
        },
        {
            bold: "“Secret Spy” market research hacks so sneaky good",
            italic: "you know exactly what digital product your potential customers are desperately waiting for you to create."
        },
        {
            bold: "how to choose a niche that is small enough for you to stand out (not overly saturated)",
            italic: "but not so narrow you can't go viral (your product flops)"
        },
        {
            bold: "[bonus] clear instructions on what goes inside your viral digital product",
            italic: "with specifics on what to do if you're using a Mac, Windows, or iPhone."
        },
        {
            bold: "[bonus] how to make a digital product that looks and feels credible",
            italic: "even if deep down you secretly feel you're not an expert at anything."
        },
        {
            bold: "[bonus] Viral Substack Notes Generator: the exact system I use to generate viral notes",
            italic: "so you can hit your first $10,000 month."
        }
    ];

    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white">
            <div className="max-w-[900px] w-full flex flex-col items-center">

                {/* Bridge Headline */}
                <p className="font-montserrat text-black text-center text-xl md:text-[22px] leading-relaxed max-w-4xl mb-8">
                    A <span className="font-bold text-[#d81159]">60-minute live intensive</span> revealing the exact positioning, pricing, and launch framework used by my students to scale existing offers to <span className="font-bold underline">5-figure months</span>.
                </p>

                {/* Section Headline */}
                <h2 className="font-anton text-[rgb(56,170,185)] text-5xl md:text-7xl text-center mb-12 tracking-[0.05em] uppercase">
                    What's Inside?
                </h2>

                {/* The Feature List (The Stack) */}
                <div className="flex flex-col gap-6 w-full">
                    {[
                        { bold: "Validation framework", italic: "to pick which ONE offer has the highest chance of hitting $10K in 30 days." },
                        { bold: "Pricing secrets", italic: "so you stop underpricing. I'll show you why higher prices often sell BETTER." },
                        { bold: "Launch strategies for tiny lists", italic: "(you don't need 10,000 subscribers to make $5K)." },
                        { bold: "Messaging formulas", italic: "that make saying 'no' feel like a mistake." },
                        { bold: "Daily launch checklist", italic: "so you know exactly what to do each day of your launch." },
                        { bold: "Disaster recovery framework", italic: "for what to do if nobody buys on day one." },
                        { bold: "Notion sales page template", italic: "(no fancy design skills needed).", isBonus: true },
                        { bold: "Take-away intensive worksheets", italic: "for every single launch you do.", isBonus: true },
                        { bold: "5-email launch sequence", italic: "templates included so you just plug and play.", isBonus: true },
                        { bold: "The \"Viral Substack Notes Generator\"", italic: "($197 value) included for FREE.", isBonus: true }
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
                                <span className="font-bold">{item.bold}</span>{" "}
                                <span className="italic">{item.italic}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price and Closing CTA */}
                <div className="mt-16 w-full flex flex-col items-center">
                    <div className="relative mb-2">
                        <span className="font-anton text-gray-500 text-3xl md:text-5xl">
                            Regular Price $300
                        </span>
                        <div className="absolute left-0 right-0 top-1/2 h-1.5 bg-[#E74C3C] transform -translate-y-1/2 rotate-[-5deg]"></div>
                    </div>
                    <div className="font-anton text-[#27AE60] text-7xl md:text-9xl mb-6">
                        ${HIT10K_PRICE / 100}
                    </div>
                    <button
                        onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-2xl py-6 px-10 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex flex-col md:flex-row items-center justify-center gap-3 text-center w-full md:w-auto"
                    >
                        <span>Reserve My Spot — ${HIT10K_PRICE / 100}</span>
                        <ArrowRight className="w-6 h-6 hidden md:block group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </button>
                    <p className="font-lato text-gray-500 mt-4 text-sm">One-time payment. Lifetime access to the recording & templates.</p>
                </div>

            </div>
        </div>
    );
};
