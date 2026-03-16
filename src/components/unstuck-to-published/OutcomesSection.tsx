import React from 'react';
import { ArrowRight } from 'lucide-react';

const outcomes = [
    "Know exactly how to position your publication so the right readers subscribe on sight",
    "Pick a working name, write a converting description, and structure your About page — in minutes, not months",
    "Outline your first article using the Story → Lesson → Framework structure that gets discovered and shared",
    "Set up your paywall strategy correctly from Day 1 — what goes behind it, how to price it, how to make the upgrade feel natural",
    "Stop second-guessing your niche and commit to a positioning angle that attracts paying readers",
    "Walk away with a 7-day action plan to go from idea to published — no more 'I'll start next week'",
    "Get direct, real-time feedback on your Substack from two creators who've built Bestseller publications",
    "Build the structural foundation that turns a hobby newsletter into a real revenue-generating business",
];

export const OutcomesSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#1a1a2e]">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                <h2 className="font-montserrat font-extrabold text-white text-2xl md:text-4xl text-center uppercase mb-3 leading-tight">
                    By the end of this workshop, you'll know exactly how to:
                </h2>
                <p className="font-lora italic text-[#ffc300] text-center text-lg mb-12">
                    ...and you'll have the templates to start doing it the same day.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-12">
                    {outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-start gap-4 bg-white/5 rounded-2xl p-5 border border-white/10">
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#27AE60] flex items-center justify-center mt-0.5">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-lato text-white text-base md:text-lg leading-snug">
                                {outcome}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="font-montserrat font-bold text-[#ffc300] text-center text-base md:text-lg mb-8 uppercase tracking-wide">
                    ...and so much more. Live. Saturday, March 21 @ 10:00 AM EST.
                </p>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-2"
                >
                    <span>THAT'S FOR ME!</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>
                <p className="font-lato text-white/50 text-sm mt-4 text-center">Sat, March 21 @ 10:00 AM EST · Replay included · All templates sent immediately</p>

            </div>
        </div>
    );
};
