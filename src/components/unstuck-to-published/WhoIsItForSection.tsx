import React from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const WhoIsItForSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#1a1a1a]">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                <h2 className="font-anton text-4xl md:text-6xl text-[#ffc300] mb-12 text-center uppercase tracking-wide">
                    Is This <span className="text-[#f72585]">For You?</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6 w-full mb-16">
                    <div className="p-8 rounded-3xl bg-[rgba(255,195,0,0.08)] border border-[rgba(255,195,0,0.2)]">
                        <h3 className="font-montserrat font-bold text-2xl mb-6 text-[#ffc300] flex items-center gap-2">
                            <CheckCircle2 className="text-[#ffc300]" size={24} />
                            THIS IS FOR YOU IF:
                        </h3>
                        <ul className="space-y-4">
                            {[
                                'You want to start a Substack but haven\'t published yet',
                                'You launched but it feels messy and you want to rebuild it properly',
                                'You\'re stuck choosing a name, niche, or topic',
                                'You don\'t know what to put behind your paywall — or when to turn it on',
                                'You want to monetize eventually and don\'t want to set things up wrong from the start',
                                'You\'re tired of consuming advice and ready to actually execute',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-[#ffc300] rounded-full mt-2.5 flex-shrink-0"></div>
                                    <span className="font-lato text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-[rgba(247,37,133,0.06)] border border-[rgba(247,37,133,0.15)]">
                        <h3 className="font-montserrat font-bold text-2xl mb-6 text-[#f72585] flex items-center gap-2">
                            <XCircle className="text-[#f72585]" size={24} />
                            NOT FOR YOU IF:
                        </h3>
                        <ul className="space-y-4">
                            {[
                                'You already have 1,000+ subscribers and a clear monetization strategy',
                                'You\'re looking for advanced growth tactics (that\'s Ana\'s other workshops)',
                                'You want to watch a recording "someday" but won\'t do the work live',
                                'You\'re not willing to publish within 7 days of this workshop',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-[#f72585] rounded-full mt-2.5 flex-shrink-0"></div>
                                    <span className="font-lato text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social Proof Insert */}
                <div className="w-full max-w-[800px] flex flex-col sm:flex-row gap-6 justify-center mb-12">
                    <img src="/imgs/first-100-paid-subscribers/testim/15.webp" alt="Testimonial 15" className="w-full sm:w-1/2 rounded-2xl shadow-lg border border-white/10 object-contain" />
                    <img src="/imgs/first-100-paid-subscribers/testim/16.webp" alt="Testimonial 16" className="w-full sm:w-1/2 rounded-2xl shadow-lg border border-white/10 object-contain" />
                </div>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-2"
                >
                    <span>THAT'S ME — I'M IN!</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

            </div>
        </div>
    );
};
