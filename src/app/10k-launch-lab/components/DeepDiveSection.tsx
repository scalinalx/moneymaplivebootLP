import React from 'react';
import { Button } from './Button';
import { Clock, DollarSign, XCircle, CheckCircle } from 'lucide-react';

export const DeepDiveSection: React.FC = () => {
    const scrollToCheckout = () => {
        const element = document.getElementById('waitlist');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">

            <div className="max-w-4xl w-full mx-auto text-center mb-16">
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase mb-6">
                    💰 The Math You Need to See:
                </h2>
            </div>

            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">

                {/* Option A */}
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg shadow-sm">
                    <h3 className="font-display font-bold text-xl uppercase mb-4 text-gray-500">Option A: "Figure It Out" On Your Own</h3>
                    <ul className="space-y-4 font-poppins text-sm md:text-base mb-6 text-gray-600">
                        <li className="flex items-start gap-2"><Clock className="w-5 h-5 flex-shrink-0" /> 6 months of trial and error</li>
                        <li className="flex items-start gap-2"><DollarSign className="w-5 h-5 flex-shrink-0" /> Likely outcome: $0-$2,000</li>
                        <li className="flex items-start gap-2"><XCircle className="w-5 h-5 flex-shrink-0 text-red-500" /> Lost revenue: $60,000</li>
                    </ul>
                    <p className="font-bold text-red-500">Cost: $0 (but you lose 6 months)</p>
                </div>

                {/* Option C (Center - Featured) */}
                <div className="bg-white border-2 border-black p-8 rounded-lg shadow-hard transform md:-translate-y-4 relative z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-neon px-4 py-1 border border-black font-bold uppercase text-xs tracking-wider shadow-sm">Best Value</div>
                    <h3 className="font-display font-black text-2xl uppercase mb-4 text-black">Option C: Join the 10K Launch Lab</h3>
                    <ul className="space-y-4 font-poppins text-sm md:text-base mb-6 text-black font-medium">
                        <li className="flex items-start gap-2"><DollarSign className="w-5 h-5 flex-shrink-0 text-green-600" /> Investment: $597</li>
                        <li className="flex items-start gap-2"><Clock className="w-5 h-5 flex-shrink-0 text-green-600" /> Time: 30 days (30-60 min/day)</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" /> Control: 100%</li>
                    </ul>
                    <div className="bg-gray-100 p-4 rounded text-center mb-6">
                        <p className="font-bold">If you hit ONE $7K launch:</p>
                        <p className="text-sm">This pays for itself 12x over.</p>
                    </div>
                    <Button
                        onClick={scrollToCheckout}
                        className="w-full py-3 bg-brand-neon hover:bg-[#e6e200] border-2 border-black text-xs md:text-sm uppercase tracking-wider"
                    >
                        LET’S HIT 10K TOGETHER, ANA!
                    </Button>
                </div>

                {/* Option B */}
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg shadow-sm">
                    <h3 className="font-display font-bold text-xl uppercase mb-4 text-gray-500">Option B: Hire It Out</h3>
                    <ul className="space-y-4 font-poppins text-sm md:text-base mb-6 text-gray-600">
                        <li className="flex items-start gap-2"><span className="font-bold w-full">Funnel builder: $1,500</span></li>
                        <li className="flex items-start gap-2"><span className="font-bold w-full">Copywriter: $2,000</span></li>
                        <li className="flex items-start gap-2"><span className="font-bold w-full">Launch consultant: $2,500</span></li>
                        <li className="flex items-start gap-2"><XCircle className="w-5 h-5 flex-shrink-0 text-red-500" /> Control: 0%</li>
                    </ul>
                    <p className="font-bold text-red-500">Total: $6,000+</p>
                </div>

            </div>

            <div className="max-w-2xl mx-auto text-center font-poppins text-lg md:text-xl font-bold bg-black text-white p-4 transform -rotate-1 rounded-sm shadow-hard">
                Which option makes the most sense?
            </div>

        </section>
    );
};
