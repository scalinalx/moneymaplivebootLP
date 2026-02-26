import React from 'react';
import { Button } from './Button';

export const ReactionSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-12 px-4 md:px-8 flex justify-center">
            <div className="w-full max-w-lg mx-auto transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-[#f2f4f6] p-8 md:p-10 rounded-[2rem] rounded-tr-none shadow-2xl text-center border border-gray-100">
                    <p className="font-poppins text-xl md:text-3xl font-bold leading-snug text-black mb-2 uppercase">
                        SHUT. THE. FRONT.<br />DOOR. 🙀🙀🙀🙀
                    </p>
                    <p className="text-2xl md:text-3xl">
                        🔥🔥🔥🔥🔥🔥🔥🔥
                    </p>
                </div>
            </div>
            {/* CTA Button */}
            <div className="w-full flex justify-center mt-12">
                <Button
                    onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mx-auto px-10 py-3.5 bg-[#d81159] hover:bg-[#b30e4a] text-white border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">I NEED THIS! I’M IN, ANA!</span>
                    </div>
                </Button>
            </div>
        </section>
    );
};
