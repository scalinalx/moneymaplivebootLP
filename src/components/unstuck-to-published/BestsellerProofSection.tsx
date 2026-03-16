import React from 'react';
import { ArrowRight } from 'lucide-react';

export const BestsellerProofSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#FDF2F8]">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                <div className="inline-flex items-center gap-2 bg-[#f72585] text-white px-5 py-2 rounded-full text-xs font-montserrat font-black uppercase tracking-[2px] mb-6 shadow-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    Your Hosts — Two Creators. Two Skillsets. One Complete System.
                </div>

                <h2 className="font-anton text-3xl md:text-5xl text-[#333333] mb-4 text-center uppercase tracking-wide">
                    Meet <span className="text-[#f72585]">Ana & Jessica</span>
                </h2>
                <p className="font-lora italic text-gray-500 text-center mb-12 text-lg md:text-xl max-w-2xl">
                    Not theory from people who've read about Substack. Real systems from creators who've built Bestseller publications from scratch.
                </p>

                {/* Presenter Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-12">
                    {/* Ana */}
                    <div className="flex flex-col items-center bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <img
                            src="https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F571a8b69-320b-4df6-ba84-dd1394fb5af1_864x864.png"
                            alt="Ana Calin"
                            className="w-24 h-24 rounded-full border-[3px] border-[#ffc300] object-cover mb-4"
                        />
                        <h4 className="font-montserrat font-bold text-[#1a1a1a] text-xl mb-1 flex items-center gap-1.5">
                            Ana Calin
                            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#FF6719"/><path d="M9.5 14.5L6 11l1.4-1.4 2.1 2.1 4.1-4.1L15 9l-5.5 5.5z" fill="#fff"/></svg>
                        </h4>
                        <p className="text-[#f72585] text-sm font-semibold mb-3 flex items-center gap-1.5">
                            How We Grow — 79,000+ subscribers
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#FF6719"/><path d="M9.5 14.5L6 11l1.4-1.4 2.1 2.1 4.1-4.1L15 9l-5.5 5.5z" fill="#fff"/></svg>
                            <span className="text-[#FF6719] text-[10px] uppercase tracking-wider font-black">Bestseller</span>
                        </p>
                        <p className="font-lato text-gray-600 text-sm leading-relaxed text-center">
                            Forbes-recognized marketing leader. Grew How We Grow from 0 to Bestseller in under 3 months. $119K+ months. Teaches newsletter creators how to position, price, and monetize — without a massive audience, sales calls, or burnout.
                        </p>
                    </div>

                    {/* Jessica */}
                    <div className="flex flex-col items-center bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <img
                            src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F73cbd9d5-897c-4efd-8e01-ad688304de32_1170x1170.jpeg"
                            alt="Jessica"
                            className="w-24 h-24 rounded-full border-[3px] border-[#ffc300] object-cover mb-4"
                        />
                        <h4 className="font-montserrat font-bold text-[#1a1a1a] text-xl mb-1 flex items-center gap-1.5">
                            Jessica Best
                            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#FF6719"/><path d="M9.5 14.5L6 11l1.4-1.4 2.1 2.1 4.1-4.1L15 9l-5.5 5.5z" fill="#fff"/></svg>
                        </h4>
                        <p className="text-[#f72585] text-sm font-semibold mb-3 flex items-center gap-1.5">
                            Unstuck to Published — 8,000+ subscribers
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#FF6719"/><path d="M9.5 14.5L6 11l1.4-1.4 2.1 2.1 4.1-4.1L15 9l-5.5 5.5z" fill="#fff"/></svg>
                            <span className="text-[#FF6719] text-[10px] uppercase tracking-wider font-black">Bestseller</span>
                        </p>
                        <p className="font-lato text-gray-600 text-sm leading-relaxed text-center">
                            Specializes in helping first-time Substack creators go from "I have an idea" to "I have a live publication" — fast. Her Get Unstuck Framework has helped hundreds of creators stop overthinking and start publishing.
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-2"
                >
                    <span>I WANT IN!</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

            </div>
        </div>
    );
};
