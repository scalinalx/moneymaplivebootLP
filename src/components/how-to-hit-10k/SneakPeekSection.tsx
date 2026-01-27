import React from 'react';
import { Play } from 'lucide-react';

export const SneakPeekSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                {/* Headline */}
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-black text-center mb-12">
                    Want a sneak-peek of the $10k framework?
                </h2>

                {/* Visuals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-[900px]">
                    {/* Image 1 */}
                    <div className="relative rounded-[5px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)] group cursor-pointer transform transition-transform hover:-translate-y-1">
                        <img
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
                            alt="Course Interface Preview"
                            className="w-full h-auto object-cover aspect-video"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-7 h-7 text-[#d81159] fill-[#d81159] ml-1" />
                            </div>
                        </div>
                    </div>

                    {/* Image 2 - Offset slightly on desktop for visual interest */}
                    <div className="relative rounded-[5px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)] group cursor-pointer transform transition-transform hover:-translate-y-1 md:mt-12">
                        <img
                            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                            alt="Lesson Preview"
                            className="w-full h-auto object-cover aspect-video"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-7 h-7 text-[#d81159] fill-[#d81159] ml-1" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
