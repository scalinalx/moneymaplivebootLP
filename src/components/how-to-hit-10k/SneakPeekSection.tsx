import React from 'react';

export const SneakPeekSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                {/* Headline */}
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-black text-center mb-12">
                    Want a sneak-peek of the $10k framework?
                </h2>

                {/* Embedded sneak-peek video */}
                <div className="relative w-full max-w-[900px] aspect-video rounded-[5px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube-nocookie.com/embed/3LkVCamZY3E"
                        title="Sneak-peek of the $10k framework"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>

            </div>
        </div>
    );
};
