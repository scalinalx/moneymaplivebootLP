import React from 'react';
import { Button } from './Button';
import { Check, Calendar, Video, Users, MessageCircle } from 'lucide-react';

export const IncludedSection: React.FC = () => {
    const scrollToCheckout = () => {
        const element = document.getElementById('waitlist');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">

            {/* Header */}
            <div className="max-w-4xl w-full mx-auto text-center mb-16">
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase mb-6">
                    ✅ Here's Exactly What's Inside:
                </h2>
                <h3 className="font-poppins font-bold text-xl md:text-2xl text-black flex items-center justify-center gap-2">
                    <Calendar className="w-8 h-8" /> 30 Daily Action Plans
                </h3>
                <p className="mt-2 text-gray-600">Every day unlocks ONE task. No overwhelming modules. Just: Open → Do → Done.</p>
            </div>

            {/* Weekly Breakdown */}
            <div className="max-w-5xl w-full mx-auto space-y-12 mb-16">

                {/* WEEK 1 */}
                <div className="bg-gray-50 border-2 border-black p-6 md:p-8 rounded-lg shadow-[4px_4px_0px_#000]">
                    <h4 className="font-display font-black text-2xl md:text-3xl uppercase mb-4">WEEK 1: Validate & Position Your Offer <span className="text-base font-medium normal-case block md:inline text-gray-500 ml-0 md:ml-4">(Days 1-7)</span></h4>
                    <ul className="space-y-2 mb-6 font-poppins text-black">
                        <li><span className="font-bold">Day 1:</span> Offer Validation Worksheet (which offer to launch?)</li>
                        <li><span className="font-bold">Day 2:</span> Positioning Formula (craft your unique angle)</li>
                        <li><span className="font-bold">Day 3:</span> Pricing Calculator (determine your $10K price point)</li>
                        <li><span className="font-bold">Day 4:</span> Audience Mapping (find your 100 buyers)</li>
                        <li><span className="font-bold">Day 5:</span> Competitive Research Template (what makes you different?)</li>
                        <li><span className="font-bold">Day 6:</span> Guarantee Builder (craft your risk reversal)</li>
                        <li><span className="font-bold">Day 7:</span> Sales Page Outline (structure your pitch)</li>
                    </ul>
                    <div className="bg-white border border-black p-4 inline-block rounded-md shadow-sm">
                        <span className="font-bold">📞 Live Call #1:</span> Hot Seat Offer Audits
                    </div>
                </div>

                {/* WEEK 2 */}
                <div className="bg-gray-50 border-2 border-black p-6 md:p-8 rounded-lg shadow-[4px_4px_0px_#000]">
                    <h4 className="font-display font-black text-2xl md:text-3xl uppercase mb-4">WEEK 2: Build Your Sales Assets <span className="text-base font-medium normal-case block md:inline text-gray-500 ml-0 md:ml-4">(Days 8-14)</span></h4>
                    <ul className="space-y-2 mb-6 font-poppins text-black">
                        <li><span className="font-bold">Day 8:</span> Headline Formula (write 10 options, pick the winner)</li>
                        <li><span className="font-bold">Day 9:</span> Opening Hook (the problem/agitation section)</li>
                        <li><span className="font-bold">Day 10:</span> Solution Section (introduce your offer)</li>
                        <li><span className="font-bold">Day 11:</span> Features → Benefits Translator (what they actually get)</li>
                        <li><span className="font-bold">Day 12:</span> Objection Crusher (handle the top 5 "no's")</li>
                        <li><span className="font-bold">Day 13:</span> Stack & Bonus Builder (make it irresistible)</li>
                        <li><span className="font-bold">Day 14:</span> CTA & Urgency (scarcity mechanics)</li>
                    </ul>
                    <div className="bg-white border border-black p-4 inline-block rounded-md shadow-sm">
                        <span className="font-bold">📞 Live Call #2:</span> Sales Page Roast Sessions
                    </div>
                </div>

                {/* WEEK 3 */}
                <div className="bg-gray-50 border-2 border-black p-6 md:p-8 rounded-lg shadow-[4px_4px_0px_#000]">
                    <h4 className="font-display font-black text-2xl md:text-3xl uppercase mb-4">WEEK 3: Tech Setup & Pre-Launch <span className="text-base font-medium normal-case block md:inline text-gray-500 ml-0 md:ml-4">(Days 15-21)</span></h4>
                    <ul className="space-y-2 mb-6 font-poppins text-black">
                        <li><span className="font-bold">Day 15:</span> Email #1 Template (teaser/announcement)</li>
                        <li><span className="font-bold">Day 16:</span> Email #2 Template (problem deep-dive)</li>
                        <li><span className="font-bold">Day 17:</span> Email #3 Template (solution reveal)</li>
                        <li><span className="font-bold">Day 18:</span> Email #4 Template (objection handling)</li>
                        <li><span className="font-bold">Day 19:</span> Email #5 Template (urgency/final push)</li>
                        <li><span className="font-bold">Day 20:</span> Payment Setup Walkthrough (Stripe/Gumroad - 5 min Loom)</li>
                        <li><span className="font-bold">Day 21:</span> Email Tool Setup (schedule your sequence)</li>
                    </ul>
                    <div className="bg-white border border-black p-4 inline-block rounded-md shadow-sm">
                        <span className="font-bold">📞 Live Call #3:</span> Tech Troubleshooting + Email Sequence Feedback
                    </div>
                </div>

                {/* WEEK 4 */}
                <div className="bg-gray-50 border-2 border-black p-6 md:p-8 rounded-lg shadow-[4px_4px_0px_#000]">
                    <h4 className="font-display font-black text-2xl md:text-3xl uppercase mb-4">WEEK 4: Launch & Optimize <span className="text-base font-medium normal-case block md:inline text-gray-500 ml-0 md:ml-4">(Days 22-30)</span></h4>
                    <ul className="space-y-2 mb-6 font-poppins text-black">
                        <li><span className="font-bold">Day 22:</span> Pre-Launch Hype Plan (warm up your list)</li>
                        <li><span className="font-bold">Day 23:</span> Launch Day Checklist (hour-by-hour plan)</li>
                        <li><span className="font-bold">Day 24:</span> Engagement Boosters (get replies)</li>
                        <li><span className="font-bold">Day 25:</span> Objection Response Scripts (handle DMs)</li>
                        <li><span className="font-bold">Day 26:</span> Mid-Launch Pivot Plan (what if nobody's buying?)</li>
                        <li><span className="font-bold">Day 27:</span> Urgency Escalation (ethical scarcity)</li>
                        <li><span className="font-bold">Day 28:</span> Post-Launch Follow-Up (nurture "not yet" people)</li>
                        <li><span className="font-bold">Day 29:</span> Data Analysis Template (what worked/didn't)</li>
                        <li><span className="font-bold">Day 30:</span> Next Launch Planning (do it again, faster)</li>
                    </ul>
                    <div className="bg-white border border-black p-4 inline-block rounded-md shadow-sm">
                        <span className="font-bold">📞 Live Call #4:</span> Launch War Room
                    </div>
                </div>

            </div>

            {/* CTA */}
            <div className="w-full flex justify-center pb-8">
                <Button
                    onClick={scrollToCheckout}
                    className="mx-auto px-10 py-3.5 bg-brand-neon hover:bg-[#e6e200] border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">I'm ready to stand out!</span>
                        <span className="text-xs font-medium normal-case">$597 - The <span className="italic">$10k</span> Launch Lab</span>
                    </div>
                </Button>
            </div>

        </section>
    );
};
