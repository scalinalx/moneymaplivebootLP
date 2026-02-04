import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

export const FlopToViralSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white overflow-hidden">
            <div className="max-w-[900px] w-full flex flex-col items-center">

                {/* Headline */}
                <h2 className="font-anton text-[rgb(56,170,185)] text-4xl md:text-5xl lg:text-6xl text-center mb-8 tracking-wide uppercase">
                    <span className="text-[#ffc300] drop-shadow-[3px_3px_0px_rgba(51,51,51,1)] mr-2">BONUS:</span> The “Viral Substack Notes Generator”
                </h2>

                {/* Subtext */}
                <p className="font-lora text-lg md:text-[20px] text-center leading-relaxed text-[#333333] max-w-4xl mb-16 md:mb-20">
                    When you join <span className="underline decoration-black/30 underline-offset-4">today</span>, you will get this bonus system that shows you exactly how to <br className="hidden md:block" />
                    generate <span className="font-bold text-[#d81159]">viral notes</span> so you can <span className="font-bold text-[#27AE60]">hit your first $10,000 month</span>.
                </p>

                {/* Device Composition */}
                <div className="relative w-full max-w-[700px] mb-16 md:mb-20 px-4 md:px-0">

                    {/* LAPTOP (Center Back) */}
                    <div className="mx-auto w-[85%] md:w-[80%] relative z-10">
                        {/* Screen Frame */}
                        <div className="bg-black rounded-t-xl p-[10px] md:p-[14px] pb-0 shadow-2xl">
                            <div className="bg-white rounded-t-sm aspect-[16/10] flex flex-col items-center justify-center p-4 relative overflow-hidden">

                                {/* Screen Content */}
                                <h3 className="font-lora font-bold text-base md:text-xl mb-6 text-center text-black">Viral Substack Notes Generator</h3>

                                {/* The Scale Graphic */}
                                <div className="w-full max-w-[90%] relative h-8 md:h-12 mb-4">
                                    <div className="w-full h-full flex border border-gray-200">
                                        {/* 12 Gradient Steps mimicking the image */}
                                        <div className="h-full flex-1 bg-[#C0392B]"></div>
                                        <div className="h-full flex-1 bg-[#E74C3C]"></div>
                                        <div className="h-full flex-1 bg-[#D35400]"></div>
                                        <div className="h-full flex-1 bg-[#E67E22]"></div>
                                        <div className="h-full flex-1 bg-[#F39C12]"></div>
                                        <div className="h-full flex-1 bg-[#F1C40F]"></div>
                                        <div className="h-full flex-1 bg-[#F7DC6F]"></div>
                                        <div className="h-full flex-1 bg-[#DCE775]"></div>
                                        <div className="h-full flex-1 bg-[#AED581]"></div>
                                        <div className="h-full flex-1 bg-[#81C784]"></div>
                                        <div className="h-full flex-1 bg-[#66BB6A]"></div>
                                        <div className="h-full flex-1 bg-[#4CAF50]"></div>
                                    </div>

                                    {/* Marker Pin */}
                                    <div className="absolute -top-1 bottom-0 right-[10%] w-0.5 bg-black flex flex-col items-center">
                                        <div className="w-3 h-3 bg-black transform rotate-45 -translate-y-1.5"></div>
                                    </div>
                                </div>

                                {/* Arrow under scale */}
                                <div className="w-full flex justify-center opacity-60">
                                    <ArrowRight className="text-black w-6 h-6" />
                                </div>

                                {/* Small unreadable text blocks for realism */}
                                <div className="w-full flex justify-between px-4 mt-2 opacity-30">
                                    <div className="h-1 bg-black w-16 rounded"></div>
                                    <div className="h-1 bg-black w-16 rounded"></div>
                                </div>
                            </div>
                        </div>
                        {/* Laptop Base */}
                        <div className="bg-[#1a1a1a] h-3 md:h-5 w-full rounded-b-lg shadow-lg relative mx-auto">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-b-sm"></div>
                        </div>
                    </div>

                    {/* TABLET LEFT (Flop) */}
                    <div className="absolute bottom-[-20px] left-0 md:left-[-20px] z-20 w-[38%] md:w-[32%]">
                        <div className="bg-black p-[6px] md:p-[8px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                            <div className="bg-white rounded-md aspect-[3/4] flex flex-col items-center justify-center text-center p-2 md:p-4">
                                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#E74C3C] flex items-center justify-center mb-3 md:mb-5 shadow-sm">
                                    <X className="text-white w-6 h-6 md:w-10 md:h-10" strokeWidth={3} />
                                </div>
                                <p className="font-montserrat font-bold text-[8px] md:text-[11px] leading-tight uppercase text-black tracking-wide">
                                    These launches are likely to flop
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* TABLET RIGHT (Viral) */}
                    <div className="absolute bottom-[-20px] right-0 md:right-[-20px] z-20 w-[38%] md:w-[32%]">
                        <div className="bg-black p-[6px] md:p-[8px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                            <div className="bg-white rounded-md aspect-[3/4] flex flex-col items-center justify-center text-center p-2 md:p-4 border-[3px] border-green-50">
                                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#27AE60] flex items-center justify-center mb-3 md:mb-5 shadow-sm">
                                    <Check className="text-white w-6 h-6 md:w-10 md:h-10" strokeWidth={3} />
                                </div>
                                <p className="font-montserrat font-bold text-[8px] md:text-[11px] leading-tight uppercase text-black tracking-wide">
                                    These launches are guaranteed to hit $10k+!
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Pricing */}
                <div className="flex items-center gap-4 mb-8 mt-16 md:mt-20">
                    <span className="font-anton text-4xl md:text-5xl text-[#E74C3C] relative transform -rotate-3">
                        <div className="absolute left-0 right-0 top-1/2 h-1.5 bg-[#E74C3C] transform -translate-y-1/2 rotate-[-10deg]"></div>
                        $197
                    </span>
                    <span className="font-anton text-5xl md:text-6xl text-[#27AE60]">
                        FREE*
                    </span>
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-2xl py-4 px-8 md:px-12 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider"
                >
                    I NEED THIS! I'M IN, ANA!
                </button>

                {/* Footer Text */}
                <p className="font-lora text-sm text-[#333333] italic mt-4">
                    *when you purchase this course today!
                </p>

            </div>
        </div>
    );
};
