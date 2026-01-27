import React from 'react';
import { Target, DollarSign, Users, PenTool, Zap, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
    const steps = [
        {
            icon: <Target className="w-10 h-10 md:w-12 md:h-12 text-[#d81159]" strokeWidth={1.5} />,
            title: "Pick Your Winning Offer",
            subtext: "We'll use my validation framework to choose which ONE offer hits $10K fastest."
        },
        {
            icon: <DollarSign className="w-10 h-10 md:w-12 md:h-12 text-[#d81159]" strokeWidth={1.5} />,
            title: "Price It Confidently",
            subtext: "Stop underpricing. I'll show you why higher prices often sell BETTER."
        },
        {
            icon: <Users className="w-10 h-10 md:w-12 md:h-12 text-[#d81159]" strokeWidth={1.5} />,
            title: "Find Your 100 Buyers",
            subtext: "You don't need a huge list. Learn how to launch with <500 subscribers."
        },
        {
            icon: <PenTool className="w-10 h-10 md:w-12 md:h-12 text-[#d81159]" strokeWidth={1.5} />,
            title: "Write Killer Sales Copy",
            subtext: "The exact messaging formulas that make saying 'no' feel like a mistake."
        },
        {
            icon: <Zap className="w-10 h-10 md:w-12 md:h-12 text-[#d81159]" strokeWidth={1.5} />,
            title: "Launch & Optimize",
            subtext: "Daily checklist and disaster recovery if sales are slow."
        }
    ];

    return (
        <div className="w-full flex flex-col items-center pt-16 pb-24 px-6 bg-white">
            <div className="max-w-[1200px] w-full text-center">
                {/* Main Headline */}
                <h2 className="font-montserrat font-bold text-3xl md:text-[40px] text-black mb-16 md:mb-24">
                    Here's how it works:
                </h2>

                {/* Steps Row */}
                <div className="flex flex-col md:flex-row items-start justify-between relative gap-12 md:gap-0">

                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            {/* Step Item */}
                            <div className="flex flex-col items-center text-center px-4 flex-1 relative group">
                                <div className="mb-8 p-6 bg-pink-50 rounded-full flex items-center justify-center shadow-sm transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md border border-pink-100">
                                    {step.icon}
                                </div>
                                <h3 className="font-montserrat font-bold text-2xl text-black mb-4 leading-tight min-h-[3.5rem] flex items-start justify-center pt-1">
                                    {step.title}
                                </h3>
                                <p className="font-lora italic text-[#555555] text-lg leading-relaxed max-w-[320px] mx-auto">
                                    {step.subtext}
                                </p>
                            </div>

                            {/* Arrow Connector (Desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:flex items-start pt-10 justify-center w-16 flex-shrink-0 text-gray-300">
                                    <ArrowRight className="w-10 h-10 text-gray-300 opacity-60" strokeWidth={1.5} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                </div>

                {/* Simple Bridge */}
                <div className="border-t border-gray-100 pt-12 mt-16 max-w-4xl mx-auto">
                    <p className="font-lora text-[#555555] text-xl md:text-[22px] leading-relaxed">
                        So simple, right? I did all the heavy lifting to figure this out — <span className="font-bold text-gray-800">all you have to do is follow my timeline.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
