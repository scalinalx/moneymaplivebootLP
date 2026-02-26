import React from 'react';
import { Star } from 'lucide-react';
import { Button } from './Button';

export const DontTakeOurWordSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">

            <div className="max-w-4xl w-full mx-auto text-center mb-16">
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase mb-6 text-black">
                    💬 What People Are Saying:
                </h2>
            </div>

            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

                {/* Success Story 1 */}
                <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-lg shadow-2xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-5 h-5 fill-brand-neon stroke-black" />
                            ))}
                        </div>
                        <p className="font-poppins text-sm md:text-base leading-relaxed mb-6 italic">
                            "I spent 3 months 'figuring it out' on my own. Made $0. 30 days in the Lab? $5,200. The daily tasks made it impossible to procrastinate. I just opened the module, did the thing, moved on."
                        </p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <p className="font-bold text-lg">Marcus D.</p>
                        <p className="text-xs font-bold text-green-600 uppercase tracking-wider mt-1">Verified Purchase | $5,200 Revenue</p>
                    </div>
                </div>

                {/* Success Story 2 */}
                <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-lg shadow-2xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-5 h-5 fill-brand-neon stroke-black" />
                            ))}
                        </div>
                        <p className="font-poppins text-sm md:text-base leading-relaxed mb-6 italic">
                            "I've bought 4 different courses on 'how to launch.' Watched all the videos. Never launched. The Lab was different. No 3-hour modules. Just ONE task per day. Day 22: Launched. Day 28: $6,400 in sales."
                        </p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <p className="font-bold text-lg">Priya S.</p>
                        <p className="text-xs font-bold text-green-600 uppercase tracking-wider mt-1">Verified Purchase | $6,400 Revenue</p>
                    </div>
                </div>

                {/* Success Story 3 */}
                <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-lg shadow-2xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-5 h-5 fill-brand-neon stroke-black" />
                            ))}
                        </div>
                        <p className="font-poppins text-sm md:text-base leading-relaxed mb-6 italic">
                            "The templates are insane. I'm not a copywriter. But the fill-in-the-blank sales page template made me sound like one. I launched 19 days after joining. Made $3,200 in the first week."
                        </p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <p className="font-bold text-lg">Lizzy D.</p>
                        <p className="text-xs font-bold text-green-600 uppercase tracking-wider mt-1">Verified Purchase | $3,200+ Revenue</p>
                    </div>
                </div>

            </div>

            {/* CTA Button */}
            <div className="w-full flex justify-center mt-12">
                <Button
                    onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mx-auto px-10 py-3.5 bg-[#d81159] hover:bg-[#b30e4a] text-white border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">SIGN ME UP! I’M IN, ANA!</span>
                    </div>
                </Button>
            </div>

        </section >
    );
};
