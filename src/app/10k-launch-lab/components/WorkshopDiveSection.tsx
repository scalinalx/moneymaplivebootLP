import React from 'react';
import { Button } from './Button';
import { Gift, Zap, FileText, Database, LifeBuoy } from 'lucide-react';

export const WorkshopDiveSection: React.FC = () => {
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
                    🎁 EXCLUSIVE BONUSES
                </h2>
                <p className="font-poppins font-bold text-xl md:text-2xl text-brand-neon bg-black inline-block px-4 py-1 transform -rotate-1">
                    (Worth $3,750)
                </p>
                <div className="mt-8 p-4 bg-orange-50 border-l-4 border-orange-500 text-left font-poppins text-sm md:text-base">
                    <p className="font-bold text-orange-800">🔥 You're getting more in bonuses than you're paying for the program.</p>
                </div>
            </div>

            <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 px-2">

                {/* Bonus 1 */}
                <div className="bg-white border-2 border-black p-6 rounded-lg relative overflow-hidden group hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-2 py-1">BONUS #1</div>
                    <div className="mb-4 text-brand-neon"><Zap className="w-8 h-8 fill-brand-neon stroke-black" /></div>
                    <h3 className="font-display font-bold text-xl uppercase mb-2">AI Offer Stack Tool</h3>
                    <p className="text-green-600 text-sm mb-4 font-bold transition-all duration-300 group-hover:text-brand-neon-dark group-hover:scale-110 group-hover:origin-left group-hover:text-lg">($197 Value)</p>
                    <p className="font-poppins text-sm leading-relaxed mb-4">Input your expertise → Get 5 proven offer ideas in 60 seconds.</p>
                    <p className="font-poppins text-xs font-bold italic">Saves you weeks of "offer confusion."</p>
                </div>

                {/* Bonus 2 */}
                <div className="bg-white border-2 border-black p-6 rounded-lg relative overflow-hidden group hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-2 py-1">BONUS #2</div>
                    <div className="mb-4 text-brand-neon"><Zap className="w-8 h-8 fill-brand-neon stroke-black" /></div>
                    <h3 className="font-display font-bold text-xl uppercase mb-2">AI Launch Stack Tool</h3>
                    <p className="text-green-600 text-sm mb-4 font-bold transition-all duration-300 group-hover:text-brand-neon-dark group-hover:scale-110 group-hover:origin-left group-hover:text-lg">($297 Value) <span className="text-red-500 text-xs ml-1">🔥 NOT RELEASED TO PUBLIC</span></p>
                    <p className="font-poppins text-sm leading-relaxed mb-4">Input your offer details → Get a complete sales email funnel written in 3 minutes.</p>
                    <p className="font-poppins text-xs font-bold italic">Saves you days of staring at blank screens. Early access.</p>
                </div>

                {/* Bonus 3 */}
                <div className="bg-white border-2 border-black p-6 rounded-lg relative overflow-hidden group hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 transition-all duration-300 md:col-span-2">
                    <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-2 py-1">BONUS #3</div>
                    <div className="mb-4 text-brand-neon"><FileText className="w-8 h-8 fill-brand-neon stroke-black" /></div>
                    <h3 className="font-display font-bold text-xl uppercase mb-2">3 x Sales Page Templates</h3>
                    <p className="text-green-600 text-sm mb-4 font-bold transition-all duration-300 group-hover:text-brand-neon-dark group-hover:scale-110 group-hover:origin-left group-hover:text-lg">($3,000 Value)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="font-poppins text-sm leading-relaxed mb-2">Complex, beautiful, high-converting templates. Not basic Notion docs.</p>
                            <p className="font-poppins text-xs font-bold italic">Just duplicate, fill in your offer, publish.</p>
                        </div>
                        <ul className="text-xs space-y-1 font-poppins text-gray-600">
                            <li>• The "Story-Driven" Page</li>
                            <li>• The "Data-Driven" Page</li>
                            <li>• The "Transformation" Page</li>
                        </ul>
                    </div>
                </div>

                {/* Bonus 4 */}
                <div className="bg-white border-2 border-black p-6 rounded-lg relative overflow-hidden group hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-2 py-1">BONUS #4</div>
                    <div className="mb-4 text-brand-neon"><Database className="w-8 h-8 fill-brand-neon stroke-black" /></div>
                    <h3 className="font-display font-bold text-xl uppercase mb-2">Swipe File Vault</h3>
                    <p className="text-green-600 text-sm mb-4 font-bold transition-all duration-300 group-hover:text-brand-neon-dark group-hover:scale-110 group-hover:origin-left group-hover:text-lg">($147 Value)</p>
                    <p className="font-poppins text-sm leading-relaxed mb-4">50 proven subject lines, opening hooks, and CTA variations tested on 70K+ subscribers.</p>
                </div>

                {/* Bonus 5 */}
                <div className="bg-white border-2 border-black p-6 rounded-lg relative overflow-hidden group hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-2 py-1">BONUS #5</div>
                    <div className="mb-4 text-brand-neon"><LifeBuoy className="w-8 h-8 fill-brand-neon stroke-black" /></div>
                    <h3 className="font-display font-bold text-xl uppercase mb-2">"Disaster Recovery Playbook"</h3>
                    <p className="text-green-600 text-sm mb-4 font-bold transition-all duration-300 group-hover:text-brand-neon-dark group-hover:scale-110 group-hover:origin-left group-hover:text-lg">($109 Value)</p>
                    <p className="font-poppins text-sm leading-relaxed mb-4">The 7-step rescue plan if nobody buys, emails flop, or sales stall.</p>
                    <p className="font-poppins text-xs font-bold italic">Saved Marcus's launch ($5,200).</p>
                </div>

            </div>

            {/* CTA */}
            <div className="w-full flex justify-center pb-8">
                <Button
                    onClick={scrollToCheckout}
                    className="mx-auto px-10 py-3.5 bg-brand-neon hover:bg-[#e6e200] border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">ACTIVATE THE STEALTH SALES MACHINE</span>
                    </div>
                </Button>
            </div>

        </section>
    );
};
