import React from 'react';
import { Button } from './Button';

export const ReactionSection: React.FC = () => {
    const scrollToCheckout = () => {
        const element = document.getElementById('checkout');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-white pt-0 pb-12 px-4 md:px-8 flex flex-col items-center">
            {/* Added High-Fidelity Breakdown Image - Tighter Layout */}
            <div className="w-full max-w-5xl mb-2 flex justify-center px-4">
                <img
                    src="/imgs/10k-launch-lab/d4_1.webp"
                    alt="10k Launch Lab Program Details"
                    className="w-full h-auto cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                    onClick={scrollToCheckout}
                />
            </div>

            <div className="w-full max-w-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-[#f2f4f6] p-8 md:p-10 rounded-[2rem] rounded-tr-none shadow-2xl text-center border border-gray-100">
                    <p className="font-poppins text-xl md:text-3xl font-bold leading-snug text-black mb-2 uppercase">
                        SHUT. THE. FRONT.<br />DOOR. 🙀🙀🙀🙀
                    </p>
                    <p className="text-2xl md:text-3xl">
                        🔥🔥🔥🔥🔥🔥🔥🔥
                    </p>
                </div>
            </div>
        </section>
    );
};
