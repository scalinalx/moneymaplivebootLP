'use client';

import React from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';

const mainNiches = [
    {
        title: "Newsletter Writers",
        description: "You want to start publishing on Substack but you're stuck on the name, niche, or first post. This workshop gives you the structure to launch properly — and a paywall strategy from Day 1.",
    },
    {
        title: "Coaches & Consultants",
        description: "You're using your newsletter to build authority and attract clients — but you haven't launched yet or your setup feels messy. We'll rebuild it properly in 60 minutes.",
    },
    {
        title: "Content Creators",
        description: "You're creating across platforms and Substack is your home base. You have the ideas but no structure. This gives you a positioned publication and a first article ready to publish.",
    },
    {
        title: "Digital Educators",
        description: "You teach, share frameworks, or break down complex topics. Your knowledge deserves a publication — and this workshop will help you build one that converts from Day 1.",
    },
];

const specificNiches = [
    [
        "Health & Wellness Writer",
        "Finance Newsletter",
        "Mindset Coach",
        "Copywriter",
        "Business Coach",
        "Bookkeeper",
        "Parenting Writer",
        "Brand Strategist",
    ],
    [
        "Lifestyle Blogger",
        "Travel Writer",
        "Food & Recipe Creator",
        "Tech Newsletter",
        "Culture & Arts Writer",
        "Interior Designer",
        "Podcast Host",
        "Social Media Manager",
    ],
    [
        "Digital Marketer",
        "Sales Coach",
        "Course Creator",
        "Wellness Coach",
        "Life Coach",
        "Financial Coach",
        "Email Marketer",
        "Content Strategist",
    ],
];

export const NicheProofSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#FDF2F8]">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                <h2 className="font-anton text-4xl md:text-6xl text-[#333333] mb-6 text-center uppercase tracking-wide">
                    Will This Work For Me?
                </h2>

                <p className="font-lato text-[#333333] text-lg md:text-xl text-center mb-12 max-w-2xl">
                    This workshop works for these <span className="font-bold">four main niches.</span> If you're in one of these, this will be a great fit for you!
                </p>

                {/* 4 Main Niche Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full mb-6">
                    {mainNiches.map((niche, i) => (
                        <div key={i} className="bg-[#E0F7FA] border-2 border-[#4DB6AC] rounded-2xl py-8 px-5 flex flex-col items-center justify-center text-center">
                            <BadgeCheck className="w-12 h-12 text-[#4DB6AC] mb-3" strokeWidth={1.5} />
                            <h3 className="font-montserrat font-bold text-[#333333] text-lg uppercase tracking-wide">
                                {niche.title}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Niche Descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-16">
                    {mainNiches.map((niche, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="font-montserrat font-bold text-[#333333] text-base uppercase tracking-wide mb-2">{niche.title}</h4>
                            <p className="font-lato text-gray-600 text-base leading-relaxed">{niche.description}</p>
                        </div>
                    ))}
                </div>

                <p className="font-lato text-[#333333] text-lg md:text-xl text-center mb-10 max-w-2xl">
                    Still unsure? Here are more specific niches that have used this system and seen great results!
                </p>

                {/* Detailed Niche Checklist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-14">
                    {specificNiches.map((column, colIdx) => (
                        <div key={colIdx} className="bg-white rounded-2xl border border-gray-200 p-6">
                            <ul className="space-y-4">
                                {column.map((niche, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-[#4DB6AC] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-lato text-[#333333] text-base md:text-lg">{niche}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-2"
                >
                    <span>SOUNDS LIKE A GREAT FIT — I'M IN!</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

            </div>
        </div>
    );
};
