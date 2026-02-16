import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { Button } from './Button';

const DMCard = ({
    message,
    rotation,
    delay,
    profileIndex,
    highlight = false
}: {
    message: string;
    rotation: string;
    delay?: string;
    profileIndex: number;
    highlight?: boolean;
}) => {
    // Generate deterministic generic avatar based on index
    // Generate deterministic generic avatar based on index - NEW IMAGES
    const avatar = `https://images.unsplash.com/photo-${[
        '1554151228-14d9def656ec', // Person 1
        '1527980965255-d3b416303d12', // Person 2
        '1544005313-94ddf0286df2', // Person 3
        '1506794778202-cad84cf45f1d', // Person 4
        '1544725176-7c40e5a71c5e', // Person 5
        '1535713875002-d1d0cf377fde'  // Person 6
    ][profileIndex % 6]}?auto=format&fit=crop&w=64&q=80`;

    return (
        <div
            className={`
                bg-white rounded-2xl p-2 md:p-3 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 
                w-full max-w-[400px] md:max-w-[480px]
                transform ${rotation} hover:scale-105 hover:z-10 transition-all duration-300
                flex flex-col gap-1.5 md:gap-2
                ${highlight ? 'border-l-4 border-l-brand-neon' : ''}
            `}
            style={{ animationDelay: delay }}
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                    <img src={avatar} alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="h-2 md:h-2.5 w-16 md:w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-1.5 md:h-2 w-10 md:w-12 bg-gray-100 rounded-full"></div>
                </div>
            </div>

            <p className="font-poppins text-xs md:text-sm text-gray-800 leading-relaxed font-medium">
                {message}
            </p>

            <div className="self-end flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full border border-gray-100 mt-1">
                <div className="bg-blue-500 rounded-full p-0.5">
                    <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                </div>
                <span className="text-[10px] text-gray-500 font-bold">1</span>
            </div>
        </div>
    );
};

export const ProblemSolutionSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">

            {/* 1. TEXT CONTENT SECTION (Centered Top) */}
            <div className="max-w-3xl w-full mx-auto flex flex-col items-center text-center mb-16">
                <h2 className="font-poppins font-medium text-lg md:text-xl uppercase tracking-widest text-gray-500 mb-6">
                    You Know WHAT to Do.
                </h2>

                <p className="font-bold mb-8 text-black text-xl md:text-2xl">Let me guess:</p>
                <ul className="space-y-4 text-left list-disc list-outside pl-5 marker:text-black font-poppins text-base md:text-lg mb-8 max-w-xl mx-auto">
                    <li>You attended the workshop. You took notes. You downloaded the templates.</li>
                    <li>You were PUMPED.</li>
                    <li>Then you sat down to actually write your sales page... and froze.</li>
                    <li>Stared at the blank screen. Thought: "I'll figure this out tomorrow."</li>
                    <li>Tomorrow became next week. Next week became next month.</li>
                    <li><span className="font-bold">And 3 months later, you still haven't launched.</span></li>
                </ul>

                <div className="mt-4 p-6 bg-red-50 border-l-4 border-red-500 text-black font-poppins text-left max-w-xl mx-auto w-full shadow-sm">
                    <p className="font-bold">The Hard Truth:</p>
                    <p>87% of people who buy courses never finish them specifically because they get stuck on <i>implementation</i>.</p>
                </div>
            </div>

            {/* 2. VISUALS SECTION (Stacked Below) */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start mb-20">

                {/* BEFORE PREVIEW */}
                <div className="flex flex-col items-center">
                    <div className="font-display font-black text-2xl uppercase text-red-500 bg-red-50 px-6 py-2 rounded rotate-2 mb-8 shadow-sm border border-red-100">
                        BEFORE
                    </div>

                    <div className="flex flex-col gap-6 w-full items-center">
                        <DMCard
                            message="I've been staring at a blank sales page for 3 days. How do you even start? 😭"
                            rotation="-rotate-1"
                            profileIndex={0}
                        />
                        <DMCard
                            message="I've taken 4 courses on launching and still haven't launched anything. I'm stuck in learning mode and my offer is making $0."
                            rotation="rotate-1"
                            profileIndex={1}
                        />
                        <DMCard
                            message="I only have 287 subscribers. Should I even bother launching or wait until I have more people?"
                            rotation="-rotate-1"
                            profileIndex={2}
                        />
                    </div>
                </div>

                {/* AFTER PREVIEW */}
                <div className="flex flex-col items-center">
                    <div className="font-display font-black text-2xl uppercase text-green-500 bg-green-50 px-6 py-2 rounded -rotate-2 mb-8 shadow-sm border border-green-100">
                        AFTER
                    </div>

                    <div className="flex flex-col gap-6 w-full items-center">
                        <DMCard
                            message="Just finished Day 9 and my sales page is DONE. This took me 45 minutes after being stuck for months! 🔥"
                            rotation="rotate-1"
                            highlight={true}
                            profileIndex={3}
                        />
                        <DMCard
                            message="FIRST SALE!! $497 from my list of 412 people. I'm literally shaking rn 😭"
                            rotation="-rotate-1"
                            highlight={true}
                            profileIndex={4}
                        />
                        <DMCard
                            message="Final numbers: $8,200 in 30 days with 394 subscribers. I can't believe this actually worked."
                            rotation="rotate-1"
                            highlight={true}
                            profileIndex={5}
                        />
                    </div>
                </div>
            </div>

            {/* EXTRA TESTIMONIALS BELOW */}
            <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-center relative">
                {/* Decorative arrow connecting top section to this */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-gray-300 hidden md:block">
                    <svg width="40" height="60" viewBox="0 0 40 60" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M 20 0 L 20 60" strokeDasharray="4 4" />
                        <path d="M 10 50 L 20 60 L 30 50" />
                    </svg>
                </div>

                <DMCard
                    message="Set up Stripe in 12 minutes using your Loom. Why did I avoid this for weeks?? 😅"
                    rotation="-rotate-1"
                    profileIndex={6}
                />
                <DMCard
                    message="I actually feel like I know what I'm doing now. Game changer."
                    rotation="rotate-1"
                    profileIndex={7}
                />
            </div>

            {/* CTA Button */}
            <div className="w-full flex justify-center mt-12">
                <Button
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mx-auto px-10 py-3.5 bg-brand-neon hover:bg-[#e6e200] border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">ENTER THE 10K LAB NOW</span>
                    </div>
                </Button>
            </div>

        </section>
    );
};
