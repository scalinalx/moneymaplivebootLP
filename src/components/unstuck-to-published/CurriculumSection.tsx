import React from 'react';
import { ArrowRight } from 'lucide-react';

const buildItems = [
    {
        bold: "A Clear Positioning Angle",
        italic: "Who is this for, what problem does it solve, why should someone subscribe, and what transformation does the reader get. Answered. Decided. Done.",
        presenter: "Ana teaches this",
    },
    {
        bold: "A Working Publication Name, Description & About Page",
        italic: "Stop agonizing. We'll use the \"working name\" framework to pick one that works, write a description that converts visitors, and structure your About page so it sells 24/7.",
        presenter: "Jessica teaches this",
    },
    {
        bold: "Your First Article — Structured, Outlined, Ready to Publish",
        italic: "Using the Story → Lesson → Framework structure that performs best for discovery and engagement. You'll know exactly what to write, how to open it, and how to end it.",
        presenter: "Jessica teaches this",
    },
    {
        bold: "A Paywall Strategy That Converts from Day 1",
        italic: "Where to place your paywall, what goes behind it, how to price your paid tier, and how to make the upgrade feel like a natural next step. The exact system behind a $119K/month Substack.",
        presenter: "Ana teaches this",
    },
    {
        bold: "20 Minutes of Live Q&A",
        italic: "Drop your Substack link. Share your niche idea. Ask the question that's been keeping you stuck. Two experienced creators giving you direct, honest, specific feedback in real time.",
        presenter: "Ana + Jessica",
    },
];

const agendaItems = [
    { minutes: "5", title: "Opening: Why Creators Stay Stuck", who: "Jessica" },
    { minutes: "10", title: "The Get Unstuck Framework", who: "Jessica" },
    { minutes: "10", title: "Positioning Your Publication to Convert", who: "Ana" },
    { minutes: "10", title: "The First Article Framework", who: "Jessica" },
    { minutes: "10", title: "Paywall Strategy That Converts from Day 1", who: "Ana + Jessica" },
    { minutes: "5", title: "Closing: The Momentum Rule", who: "Jessica" },
    { minutes: "20", title: "Live Q&A — Ask Us Anything", who: "Ana + Jessica" },
];

export const CurriculumSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white">
            <div className="max-w-[900px] w-full flex flex-col items-center">

                <div className="bg-[#FDF2F8] border border-rose-100 rounded-3xl p-6 md:p-8 mb-10 max-w-3xl text-left">
                    <p className="font-montserrat font-bold text-[#333333] text-sm uppercase tracking-widest mb-3">Why not just watch free YouTube videos about Substack?</p>
                    <p className="font-lato text-[#333333] text-base md:text-lg leading-relaxed">
                        Free advice tells you what to do. This workshop sits next to you while you do it. You'll leave with actual assets — <span className="font-bold text-[#f72585]">a positioned publication, a first article outline, a paywall strategy</span> — not just more ideas to add to the pile.
                    </p>
                </div>

                <h2 className="font-anton text-[rgb(56,170,185)] text-5xl md:text-7xl text-center mb-4 tracking-[0.05em] uppercase">
                    What You'll Build
                </h2>
                <p className="font-lato text-gray-500 text-center text-base md:text-lg mb-10 max-w-2xl">
                    Not theory. Not "things to think about later." Actual assets you'll have when the call ends.
                </p>

                <div className="flex flex-col gap-6 w-full">
                    {buildItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-5">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full bg-[#ffc300] flex items-center justify-center">
                                    <span className="font-bold text-[#1a1a1a] text-sm">{index + 1}</span>
                                </div>
                            </div>
                            <div className="font-lato text-lg md:text-[19px] text-[#333333] leading-relaxed">
                                <span className="font-bold">{item.bold}</span>{' '}
                                <span className="italic">{item.italic}</span>
                                <span className="block text-[#f72585] text-xs font-bold uppercase tracking-wider mt-1">{item.presenter}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Social Proof Insert */}
                <div className="mt-16 mb-8 w-full max-w-[800px] flex flex-col sm:flex-row gap-6 justify-center">
                    <img src="/imgs/first-100-paid-subscribers/testim/13.webp" alt="Testimonial 13" className="w-full sm:w-1/2 rounded-2xl shadow-lg border border-gray-100 object-contain" />
                    <img src="/imgs/first-100-paid-subscribers/testim/14.webp" alt="Testimonial 14" className="w-full sm:w-1/2 rounded-2xl shadow-lg border border-gray-100 object-contain" />
                </div>

                {/* Agenda */}
                <h3 className="font-anton text-2xl md:text-3xl text-[#333333] text-center mb-6 uppercase tracking-wide mt-8">
                    Workshop Agenda — <span className="text-[#ffc300]">60 Minutes</span>
                </h3>
                <div className="flex flex-col w-full mb-10">
                    {agendaItems.map((item, i) => (
                        <div key={i} className={`flex gap-4 py-4 ${i < agendaItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div className="flex-shrink-0 w-12 text-center">
                                <span className="font-montserrat font-black text-[#1a1a1a] text-xl leading-none">{item.minutes}</span>
                                <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">min</span>
                            </div>
                            <div>
                                <h4 className="font-montserrat font-bold text-[#1a1a1a] text-base">{item.title}</h4>
                                <span className="text-[#f72585] text-[11px] font-bold uppercase tracking-wider">{item.who}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price and CTA */}
                <div className="w-full flex flex-col items-center">
                    <div className="relative mb-2">
                        <span className="font-anton text-gray-500 text-3xl md:text-5xl">
                            Regular Price $300
                        </span>
                        <div className="absolute left-0 right-0 top-1/2 h-1.5 bg-[#E74C3C] transform -translate-y-1/2 rotate-[-5deg]"></div>
                    </div>
                    <div className="font-anton text-[#27AE60] text-7xl md:text-9xl mb-6">
                        $97
                    </div>
                    <button
                        onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-lg md:text-2xl py-6 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex flex-col md:flex-row items-center justify-center gap-3 text-center w-full md:w-auto"
                    >
                        <span>WHEN DO WE START?</span>
                        <ArrowRight className="w-6 h-6 hidden md:block group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </button>
                    <p className="font-lato text-gray-500 mt-4 text-sm">One-time payment. Sat, March 21 @ 10:00 AM EST + replay + all templates.</p>
                </div>

            </div>
        </div>
    );
};
