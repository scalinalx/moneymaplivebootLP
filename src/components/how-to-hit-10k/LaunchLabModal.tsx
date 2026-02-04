'use client';

import React from 'react';
import { X, ArrowRight, Zap, CheckCircle } from 'lucide-react';

interface LaunchLabModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LaunchLabModal: React.FC<LaunchLabModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleGoToSalesPage = () => {
        window.location.href = '/10k-launch-lab';
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.3)] border border-gray-100 transform transition-all animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-20"
                >
                    <X size={20} />
                </button>

                <div className="bg-[#ffc300] p-4 md:p-6 text-center relative overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <Zap className="absolute -left-10 -top-10 text-white" size={80} fill="white" />
                    </div>

                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3 shadow-lg relative z-10">
                        <CheckCircle className="text-[#27AE60]" size={24} />
                    </div>
                    <h2 className="font-montserrat font-black text-xl md:text-3xl text-[#333333] uppercase leading-tight tracking-tight relative z-10">
                        You're In. But Here's The Truth:
                    </h2>
                </div>

                <div className="p-6 md:p-10">
                    <div className="text-center mb-6">
                        <p className="font-montserrat font-bold text-lg md:text-xl text-[#333333] leading-tight">
                            The workshop teaches the system. <span className="text-[#d81159]">The Lab BUILDS it for you.</span>
                        </p>
                        <p className="mt-2 font-lato text-gray-600 font-bold italic text-base">
                            Why wait 6 weeks when you could launch in 30 days?
                        </p>
                    </div>

                    <div className="space-y-3 mb-6">
                        <p className="font-montserrat font-bold text-[10px] uppercase tracking-widest text-gray-400">Right now, you can get:</p>
                        <div className="flex items-start gap-3">
                            <ArrowRight className="text-[#d81159] mt-1 shrink-0" size={16} />
                            <p className="font-lato text-gray-700 leading-snug text-base">
                                <span className="font-bold">The complete 30-day implementation system</span> (Every daily task. Every template. Zero guesswork.)
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <ArrowRight className="text-[#d81159] mt-1 shrink-0" size={16} />
                            <p className="font-lato text-gray-700 leading-snug text-base">
                                <span className="font-bold">4 live launch audits</span> where I personally fix your strategy and tech in real-time
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <ArrowRight className="text-[#d81159] mt-1 shrink-0" size={16} />
                            <p className="font-lato text-gray-700 leading-snug text-base">
                                <span className="font-bold">The private community</span> with 24-hour response times when you get stuck
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <ArrowRight className="text-[#d81159] mt-1 shrink-0" size={16} />
                            <p className="font-lato text-gray-700 leading-snug text-base">
                                <span className="font-bold">$3,750 in proven templates</span> including our 3 top-converting page frameworks
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mb-6">
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                            <div className="opacity-60">
                                <p className="font-montserrat font-bold text-xs uppercase mb-1 text-[#333333]">Wait for the workshop</p>
                                <p className="font-lato text-xs text-gray-600 leading-relaxed">Learn the framework → Still have to implement alone</p>
                            </div>
                            <div className="border-l-4 border-[#ffc300] pl-6">
                                <p className="font-montserrat font-bold text-sm uppercase mb-1 text-[#d81159]">Start the Lab today</p>
                                <p className="font-lato text-sm text-[#333333] font-bold leading-relaxed">Systematic Roadmap → Launch in 30 days → Make Your First $3k-$10k</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <button
                            onClick={handleGoToSalesPage}
                            className="w-full bg-[#d81159] hover:bg-[#b00e49] text-white font-montserrat font-bold text-xl py-5 rounded-lg shadow-xl hover:-translate-y-1 transition-all uppercase tracking-wider flex items-center justify-center gap-3"
                        >
                            YES, I WANT TO LAUNCH IN 30 DAYS <ArrowRight size={24} />
                        </button>
                        <p className="mt-4 font-lato text-xs text-gray-500">
                            Only $597. Ironclad guarantee. But you launch <span className="font-bold text-black italic">6 weeks faster</span>.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full text-gray-400 hover:text-gray-600 transition-colors font-bold text-[10px] text-center uppercase tracking-widest"
                    >
                        Close and return to workshop page
                    </button>
                </div>
            </div>
        </div>
    );
};
