import React from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const WhoIsItForSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#E0F7FA]">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                <h2 className="font-anton text-4xl md:text-6xl text-[#333333] mb-12 text-center uppercase tracking-wide">
                    Is This <span className="text-[#d81159]">For You?</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6 w-full mb-16">
                    <div className="bg-white p-8 rounded-3xl border border-[#4DB6AC]/30 shadow-sm">
                        <h3 className="font-montserrat font-bold text-2xl mb-6 text-[#333333] flex items-center gap-2">
                            <CheckCircle2 className="text-[#27AE60]" size={24} />
                            YES — THIS IS YOU, IF:
                        </h3>
                        <ul className="space-y-4">
                            {[
                                'You\'re writing consistently but your paid count is stuck at zero — or embarrassingly low',
                                'You have no idea what to put behind the paywall, or whether you even should',
                                'You want Substack Bestseller status and a clear, systematic path to get there',
                                'You have under 1,000 free subscribers and you\'re ready to monetise right now',
                                'You\'re tired of watching writers with "worse" newsletters earn more than you'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-700">
                                    <div className="w-1.5 h-1.5 bg-[#27AE60] rounded-full mt-2.5 flex-shrink-0"></div>
                                    <span className="font-lato text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm">
                        <h3 className="font-montserrat font-bold text-2xl mb-6 text-[#333333] flex items-center gap-2">
                            <XCircle className="text-[#d81159]" size={24} />
                            NOT FOR YOU, IF:
                        </h3>
                        <ul className="space-y-4">
                            {[
                                'You already have a thriving paid tier with a conversion system that works',
                                'You\'re looking for a 12-week group coaching program',
                                'You want someone to write your newsletter for you',
                                'You\'re not willing to send a single email asking readers to upgrade',
                                'You have zero interest in ever charging for your work'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-700">
                                    <div className="w-1.5 h-1.5 bg-[#d81159] rounded-full mt-2.5 flex-shrink-0"></div>
                                    <span className="font-lato text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-2"
                >
                    <span>I WANT TO ATTRACT THE BEST PAID SUBSCRIBERS</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

            </div>
        </div>
    );
};
