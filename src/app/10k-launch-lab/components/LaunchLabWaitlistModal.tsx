'use client';

import React from 'react';
import { X, CheckCircle } from 'lucide-react';

interface LaunchLabWaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LaunchLabWaitlistModal: React.FC<LaunchLabWaitlistModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.3)] border-2 border-black transform transition-all animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-20"
                >
                    <X size={20} />
                </button>

                <div className="bg-brand-neon p-6 md:p-8 text-center relative overflow-hidden border-b-2 border-black">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg relative z-10 border-2 border-black">
                        <CheckCircle className="text-[#27AE60]" size={32} />
                    </div>
                    <h2 className="font-display font-black text-2xl md:text-4xl text-black uppercase leading-tight tracking-tight relative z-10">
                        HOORAY! YOU'RE ON THE LIST!
                    </h2>
                </div>

                <div className="p-8 md:p-12 text-center">
                    <p className="font-poppins font-bold text-xl md:text-2xl text-black leading-tight mb-4">
                        You'll be the <span className="relative inline-block">
                            <span className="absolute inset-0 bg-brand-neon transform -skew-x-12 -z-10"></span>
                            <span className="relative px-2">FIRST</span>
                        </span> to know when we open doors again.
                    </p>

                    <p className="font-poppins text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                        Check your inbox for confirmation. We'll notify you the moment enrollment opens for the next cohort of the <span className="font-bold">$10k Launch Lab</span>.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-2xl border-2 border-black mb-8">
                        <p className="font-poppins text-sm text-gray-600 italic">
                            <span className="font-bold text-black not-italic">Pro tip:</span> Waitlist members get exclusive early-bird pricing when we reopen. You made the right call.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-black hover:bg-gray-800 text-white font-display font-bold text-lg py-4 rounded-lg shadow-[4px_4px_0px_#FFFB00] hover:shadow-[2px_2px_0px_#FFFB00] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider border-2 border-black"
                    >
                        GOT IT, THANKS!
                    </button>
                </div>
            </div>
        </div>
    );
};
