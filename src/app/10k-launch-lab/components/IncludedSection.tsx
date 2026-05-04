import React from 'react';
import { Button } from './Button';
import { Check, Calendar, Video, Users, MessageCircle } from 'lucide-react';

export const IncludedSection: React.FC = () => {
    const scrollToCheckout = () => {
        const element = document.getElementById('checkout');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-white pt-20 pb-2 px-4 md:px-8 flex flex-col items-center">

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
                <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-lg shadow-xl">
                    <h4 className="font-display font-black text-2xl md:text-3xl uppercase mb-4">WEEK 1: Offer Clarity & Foundation <span className="text-base font-medium normal-case block md:inline text-gray-500 ml-0 md:ml-4">(Days 1-7)</span></h4>
                    <p className="font-poppins text-gray-700 mb-4 font-bold italic">Build an offer people actually want—and are ready to buy.</p>
                    <ul className="space-y-3 mb-6 font-poppins text-black list-disc pl-5">
                        <li>Set clear launch goals and the mindset required to execute in 30 days</li>
                        <li>Decide exactly which offer you should launch (based on demand, not ego)</li>
                        <li>Choose the right format (workshop, webinar, course, or stack)</li>
                        <li>Define your unique angle and positioning in the market</li>
                        <li>Price your offer for profit—and learn how to test it safely</li>
                        <li>Identify your first 100 buyers inside your existing audience</li>
                        <li>Fix your About page, bio, and credibility signals so buyers trust you faster</li>
                    </ul>
                    <p className="mt-4 font-bold text-[#d81159]">Outcome: You know what you’re selling, who it’s for, and why it will sell.</p>
                </div>

                {/* WEEK 2 */}
                <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-lg shadow-xl">
                    <h4 className="font-display font-black text-2xl md:text-3xl uppercase mb-4">WEEK 2: Turn Your Newsletter Into a Sales Machine <span className="text-base font-medium normal-case block md:inline text-gray-500 ml-0 md:ml-4">(Days 8-14)</span></h4>
                    <p className="font-poppins text-gray-700 mb-4 font-bold italic">Transform your Substack from “nice content” into a conversion asset.</p>
                    <ul className="space-y-3 mb-6 font-poppins text-black list-disc pl-5">
                        <li>Turn your Substack homepage into a high-converting sales page</li>
                        <li>Define the clear transformation your newsletter promises</li>
                        <li>Implement the most underrated Substack update for conversions</li>
                        <li>Sell without selling using optimized email headers & footers</li>
                        <li>Learn how visuals and “show, don’t tell” content attract buyers</li>
                        <li>Set up automated welcome emails for every subscriber level</li>
                        <li>Learn how to sell high-ticket offers privately, without public pitching</li>
                    </ul>
                    <p className="mt-4 font-bold text-[#d81159]">Outcome: Your Substack starts pre-selling your offer before you ever announce it.</p>
                </div>

                {/* WEEK 3 */}
                <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-lg shadow-xl">
                    <h4 className="font-display font-black text-2xl md:text-3xl uppercase mb-4">WEEK 3: Content That Builds Desire & Demand <span className="text-base font-medium normal-case block md:inline text-gray-500 ml-0 md:ml-4">(Days 15-21)</span></h4>
                    <p className="font-poppins text-gray-700 mb-4 font-bold italic">Create demand before the launch—so you’re not convincing anyone.</p>
                    <ul className="space-y-3 mb-6 font-poppins text-black list-disc pl-5">
                        <li>Follow a 21-day posting strategy designed specifically for launches</li>
                        <li>Understand what actually makes people buy (psychology &gt; tactics)</li>
                        <li>Learn how to write content that drives both engagement and revenue</li>
                        <li>Use proven revenue-post formulas (Warm Up, Pivot & Final Push)</li>
                        <li>Get 50 revenue-focused article ideas across multiple creator niches</li>
                        <li>Study real engagement vs. revenue post examples</li>
                        <li>Know exactly what to post 3 weeks, 2 weeks, and days before launch</li>
                    </ul>
                    <p className="mt-4 font-bold text-[#d81159]">Outcome: Your audience is warmed up, aligned, and expecting your offer.</p>
                </div>

                {/* WEEK 4 */}
                <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-lg shadow-xl">
                    <h4 className="font-display font-black text-2xl md:text-3xl uppercase mb-4">WEEK 4: Conversion, Launch & Scale <span className="text-base font-medium normal-case block md:inline text-gray-500 ml-0 md:ml-4">(Days 22-30)</span></h4>
                    <p className="font-poppins text-gray-700 mb-4 font-bold italic">Turn attention into sales—cleanly, confidently, and repeatably.</p>
                    <ul className="space-y-3 mb-6 font-poppins text-black list-disc pl-5">
                        <li>Build a landing page that answers the 3 questions buyers actually care about</li>
                        <li>Set up referrals and conversion boosts</li>
                        <li>Create your personal Brand Book to stay consistent (using AI)</li>
                        <li>Get access to LaunchStack and your full sales launch email system</li>
                        <li>Learn how to structure launch emails for maximum impact</li>
                        <li>Use tools, templates, and landing-page resources</li>
                        <li>Learn Ana’s high-converting workshop/webinar structure you can reuse forever</li>
                    </ul>
                    <p className="mt-4 font-bold text-[#d81159]">Outcome: You complete your launch with a system you can reuse again and again—not a one-off win.</p>
                </div>

            </div>

            {/* Monthly Live Call */}
            <div className="max-w-5xl w-full mx-auto mb-16">
                <div className="bg-black text-white p-6 md:p-8 rounded-lg shadow-xl border border-gray-100">
                    <h4 className="font-display font-black text-2xl md:text-3xl uppercase mb-4">📞 Monthly Live Call With Ana</h4>
                    <p className="font-poppins text-white/80 mb-4 font-bold italic">One live group session each month — bring your offer, your draft emails, your stuck point, and walk out with answers.</p>
                    <ul className="space-y-3 font-poppins text-white list-disc pl-5">
                        <li>Hot-seat offer audits — Ana reviews your offer live and shows you exactly what to tighten</li>
                        <li>Real-time feedback on whatever you’re working on right now</li>
                        <li>Open Q&amp;A for your specific situation — no question too small</li>
                        <li>Email sequence & content feedback — paste your draft, get it critiqued live</li>
                        <li>Launch troubleshooting, positioning gut-checks, pricing pressure-tests, and more</li>
                    </ul>
                    <p className="mt-4 font-poppins text-white/60 text-sm italic">Can’t make it live? Every call is recorded and posted to the community shortly after — you keep access for life.</p>
                </div>
            </div>

            {/* CTA */}
            <div className="w-full flex justify-center pb-0">
                <Button
                    onClick={scrollToCheckout}
                    className="mx-auto px-10 py-3.5 bg-[#d81159] hover:bg-[#b30e4a] text-white border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">STOP BUILDING IN THE DARK—I'M IN!</span>
                    </div>
                </Button>
            </div>

        </section>
    );
};
