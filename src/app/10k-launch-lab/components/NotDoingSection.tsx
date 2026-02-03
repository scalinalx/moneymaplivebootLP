import React from 'react';
import { X } from 'lucide-react';

export const NotDoingSection: React.FC = () => {
    const notItems = [
        "helping you to write your mission, vision, and values",
        "following trends",
        "crafting play-it-safe messaging",
        "discovering your life's purpose",
        "teaching you the \"4 P's of Branding\"",
        "following the industry best practices",
        "building your corporate branding play x play"
    ];

    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">

            {/* 1. Top Boxed Testimonial */}
            <div className="max-w-4xl w-full mx-auto mb-20">
                <div className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
                    <p className="font-poppins font-medium text-sm md:text-base leading-relaxed">
                        <span className="text-pink-400 mr-2">🩷</span>
                        <span className="font-bold">WHY I WANNA WORK WITH *YOU*:</span> I was already in love once I checked out your website but The <span className="italic">$10k</span> Launch Lab is what really sold me tbh. I love your no-bullshit approach, love that you're very unapologetically you, and simply felt things click into place. It's like the universe told me <span className="italic">"Bitch, you wanna re-brand, this is the gal who can do it"</span> .
                    </p>
                </div>
            </div>

            {/* 2. The "NOT" List */}
            <div className="max-w-3xl w-full mx-auto mb-24 pl-2">
                <h2 className="text-xl md:text-2xl font-poppins font-medium mb-8 text-black">
                    Here's what we're <span className="text-[#ff4d4d] font-bold">NOT</span> doing:
                </h2>

                <ul className="space-y-4">
                    {notItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 md:gap-4 font-poppins text-base md:text-xl text-black leading-tight">
                            <div className="mt-0.5">
                                {/* Thick Red X */}
                                <X className="w-6 h-6 md:w-7 md:h-7 text-[#ff4d4d] stroke-[4]" />
                            </div>
                            <span>
                                <span className="text-[#ff4d4d] font-bold mr-1">NOT</span>
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 3. Bottom Chat Bubble with Circle */}
            <div className="max-w-md mx-auto w-full flex justify-center">
                <div className="bg-[#f2f4f6] text-gray-800 p-6 md:p-8 rounded-3xl rounded-tr-sm relative text-sm md:text-base font-medium leading-relaxed shadow-sm">
                    <p className="mb-4">
                        I'm in shock, legit shock, with how much thought, effort, intention and pure creativity you put into my brand guide. I know I shouldn't be shocked because you exude top quality work, but this is beyond that. I'm not gonna lie, this is even more than I thought I was getting.
                    </p>

                    <div className="relative inline-block">
                        <span className="relative z-10 font-bold text-black">I'm OBSESSED with my brand even more</span>

                        {/* Hand-drawn Red Circle SVG */}
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[180%] pointer-events-none text-[#ff4d4d]" viewBox="0 0 200 100" fill="none">
                            <path
                                d="M20,45 C30,25 100,10 170,35 C200,50 190,80 150,85 C90,95 30,85 10,60 C-5,45 10,35 25,35"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                                transform="rotate(-2 100 50)"
                            />
                        </svg>
                    </div>
                </div>
            </div>

        </section>
    );
};
