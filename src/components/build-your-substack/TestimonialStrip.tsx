'use client';

import Image from 'next/image';

interface TestimonialStripProps {
    imageSrc: string;
    caption: string;
    ctaText?: string;
}

export const TestimonialStrip = ({ imageSrc, caption, ctaText }: TestimonialStripProps) => {
    const handleCTAClick = () => {
        const el = document.getElementById('checkout-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-white py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="relative w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={caption}
                        width={1200}
                        height={800}
                        className="w-full h-auto"
                    />
                </div>
                <p className="font-montserrat font-bold text-[#333333] text-center text-lg mt-6">
                    {caption}
                </p>
                {ctaText && (
                    <div className="text-center mt-8">
                        <button
                            onClick={handleCTAClick}
                            className="inline-block bg-[#ffc300] hover:bg-[#e6b000] text-[#333333] font-montserrat font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide"
                        >
                            {ctaText}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
