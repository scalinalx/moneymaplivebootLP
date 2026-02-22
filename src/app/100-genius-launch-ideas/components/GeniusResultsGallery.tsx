'use client';

import React from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

interface ResultCardProps {
    name: string;
    handle: string;
    image: string;
    text: string;
    time: string;
    likes: number;
}

const ResultCard = ({ name, handle, image, text, time, likes }: ResultCardProps) => {
    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            {/* Aspect Ratio 3:2 Container */}
            <div className="aspect-[3/2] w-full flex flex-col p-5 md:p-6 relative bg-white">

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 p-0.5 bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 rounded-full">
                        <div className="bg-white p-0.5 rounded-full">
                            <img
                                src={image}
                                alt={name}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-slate-100"
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm md:text-base">{handle}</h4>
                        <p className="text-slate-500 text-xs">{name}</p>
                    </div>
                    <div className="ml-auto text-slate-400 text-xs">{time}</div>
                </div>

                {/* Body Content (The "Comment") */}
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-sm md:text-lg font-light leading-relaxed text-slate-800">
                        {text}
                    </p>
                </div>

                {/* Footer Reactions */}
                <div className="pt-4 mt-3 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Heart className="w-5 h-5 text-slate-300 group-hover:text-red-500 transition-colors" />
                        <MessageCircle className="w-5 h-5 text-slate-300" />
                        <Send className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                        <Bookmark className="w-5 h-5 text-slate-300" />
                    </div>
                </div>

                <div className="mt-4 font-bold text-slate-800 text-base md:text-lg">
                    {likes.toLocaleString()} likes
                </div>

                {/* Reaction Bubble Overlay - Scaled Up */}
                <div className="absolute top-10 right-10 bg-white rounded-full px-4 py-2 shadow-lg border border-slate-100 flex gap-2 animate-bounce-slow">
                    <span className="text-xl transform hover:scale-125 transition-transform cursor-default">❤️</span>
                    <span className="text-xl transform hover:scale-125 transition-transform cursor-default">👏</span>
                    <span className="text-xl transform hover:scale-125 transition-transform cursor-default">🔥</span>
                </div>

            </div>
        </div>
    );
};

export const GeniusResultsGallery = () => {
    const results = [
        {
            name: "David Ross",
            handle: "david_launch_lab",
            image: "/imgs/testimonials/testimonial-david.png",
            text: "I spent 3 years trying to build a 'perfect' course. Then I found Idea #81 in this guide. Launched a simple PDF + Loom video bundle in 48 hours. Just crossed $4k in sales. I feel so stupid for waiting this long. 🤯",
            time: "3h ago",
            likes: 7
        },
        {
            name: "Emma Sterling",
            handle: "emma.writes.copy",
            image: "/imgs/testimonials/testimonial-emma.png",
            text: "The 'Niche Compatibility' breakdown is worth 10x the price. I didn't realize my audience was too small for a membership, but PERFECT for a 'VIP Day' offer (Idea #12). Booked 3 clients at $500 each this week. 💸",
            time: "7h ago",
            likes: 14
        },
        {
            name: "Alex Mercer",
            handle: "alex_mercer_growth",
            image: "/imgs/testimonials/testimonial-alex.png",
            text: "Honest review: most 'idea lists' are trash. This one is dangerous. I bookmarked 15 feasible ideas in the first 10 minutes. Executed #04 (Resource Library) and added 200 subs to my list in 2 days. 🚀",
            time: "1d ago",
            likes: 11
        }
    ];

    return (
        <section className="w-full py-20 px-6 bg-slate-50 border-t border-slate-100">
            <div className="max-w-[1000px] mx-auto">

                <h2 className="font-display font-bold text-3xl md:text-5xl text-center mb-16 text-slate-900 leading-tight">
                    Results That Speak<br />
                    <span className="text-rose-500">For Themselves</span>
                </h2>

                <div className="flex flex-col items-center">
                    {results.map((item, index) => (
                        <ResultCard key={index} {...item} />
                    ))}
                </div>

            </div>
        </section>
    );
};
