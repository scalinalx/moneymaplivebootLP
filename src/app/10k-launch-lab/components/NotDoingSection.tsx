import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from './Button';

export const NotDoingSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">

            <div className="max-w-4xl w-full mx-auto mb-16 text-center">
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase mb-8">
                    That's What the 10K Launch Lab Is.
                </h2>

                <p className="font-poppins text-lg md:text-2xl text-black mb-12">
                    <span className="font-bold">It's not another course where you "watch videos and figure it out."</span>
                </p>

                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm text-left mx-auto max-w-3xl">
                    <p className="font-poppins text-lg md:text-xl text-black leading-relaxed mb-8">
                        It's a <span className="font-bold text-[#d81159]">30-day implementation system</span> where every single day has <span className="font-bold">ONE focused task</span>.
                    </p>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 font-poppins text-lg text-gray-600">
                            <X className="text-red-500 w-6 h-6" /> No guessing.
                        </li>
                        <li className="flex items-center gap-3 font-poppins text-lg text-gray-600">
                            <X className="text-red-500 w-6 h-6" /> No decision fatigue.
                        </li>
                        <li className="flex items-center gap-3 font-poppins text-lg text-gray-600">
                            <X className="text-red-500 w-6 h-6" /> No "I'll do this later."
                        </li>
                    </ul>

                    <div className="bg-white border border-gray-100 p-6 shadow-xl text-center">
                        <p className="font-poppins font-bold text-xl md:text-2xl uppercase">
                            You open today's module. You do the task. You check the box.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl w-full mx-auto text-center font-poppins text-lg md:text-xl text-black leading-relaxed">
                <p>
                    And in 30 days, you've launched your offer and made your first $10K.
                </p>
                <p className="font-bold mt-4">
                    Or you know exactly what to fix for your next launch.
                </p>
            </div>

            {/* CTA Button */}
            <div className="w-full flex justify-center mt-12">
                <Button
                    onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mx-auto px-10 py-3.5 bg-[#d81159] hover:bg-[#b30e4a] text-white border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">I’M READY TO DEPLOY THIS SYSTEM</span>
                    </div>
                </Button>
            </div>

        </section>
    );
};
