'use client';

import React from 'react';
import { Heart } from 'lucide-react';

interface TestimonialProps {
    name: string;
    handle: string;
    image: string;
    text: string;
    time: string;
    likes: number;
}

const TestimonialCard = ({ name, handle, image, text, time, likes }: TestimonialProps) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-3 relative transform transition-transform hover:-translate-y-1 duration-300">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full rounded-full border-2 border-white object-cover"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                    <h4 className="font-bold text-slate-900 text-sm">{handle}</h4>
                    <span className="text-slate-400 text-xs">{time}</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-2">
                    {text}
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <button className="hover:text-slate-600">Reply</button>
                    {likes > 0 && <span>{likes} likes</span>}
                </div>
            </div>

            {/* Like Button */}
            <div className="pt-2">
                <Heart size={14} className="text-slate-300 hover:text-red-500 cursor-pointer transition-colors" />
            </div>

            {/* Reaction Bubble Overlay */}
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-2 py-1 shadow-md border border-slate-100 flex gap-0.5 animate-bounce-slow">
                <span className="text-xs transform hover:scale-125 transition-transform cursor-default">❤️</span>
                <span className="text-xs transform hover:scale-125 transition-transform cursor-default">🔥</span>
                <span className="text-xs transform hover:scale-125 transition-transform cursor-default">😮</span>
            </div>
        </div>
    );
};

export const GeniusTestimonials = () => {
    const testimonials = [
        {
            name: "Sarah Jenkins",
            handle: "sarah.creates",
            image: "/imgs/testimonials/testimonial-sarah.png",
            text: "I was so stuck on what to launch. Downloaded this list, scrolled to Idea #42, and launched it next day. Made $450 in my first weekend! 😭🙌",
            time: "2h",
            likes: 124
        },
        {
            name: "Mike Chen",
            handle: "mike_builds",
            image: "/imgs/testimonials/testimonial-mike.png",
            text: "The 'Effort Score' is a lifesaver. I picked a 'Low Effort / High Revenue' idea (#17) and it's already generated more leads than my last 3 launches combined.",
            time: "5h",
            likes: 89
        },
        {
            name: "Jessica Alverez",
            handle: "jess_art_studio",
            image: "/imgs/testimonials/testimonial-jessica.png",
            text: "Finally a list that isn't just 'start a dropshipping store'. These are actual legit offers for creators. Ideally for anyone with a small audience! ✅",
            time: "1d",
            likes: 243
        }
    ];

    return (
        <section className="w-full py-12 px-6 overflow-hidden">
            <div className="max-w-[1000px] mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div key={i} className={`transform ${i === 1 ? 'md:translate-y-4' : ''}`}>
                            <TestimonialCard {...t} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
