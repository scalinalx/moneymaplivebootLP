'use client';

import Image from 'next/image';

export const TestimonialsGrid = () => {
    const handleCTAClick = () => {
        const el = document.getElementById('checkout-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const testimonialImages = [1, 2, 3, 4];

    return (
        <section className="bg-white py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <p className="font-montserrat font-bold text-[#f72585] text-xs tracking-widest uppercase text-center mb-4">
                    WHAT CREATORS ARE SAYING
                </p>
                <h2 className="font-anton text-3xl md:text-4xl text-[#333333] uppercase text-center mb-12">
                    Real Results From Real Creators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                    {testimonialImages.map((n) => (
                        <div key={n} className="rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            <Image
                                src={`/imgs/unstuck-to-published/testim/${n}.jpeg`}
                                alt={`Creator testimonial ${n}`}
                                width={600}
                                height={400}
                                className="w-full h-auto"
                            />
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <button
                        onClick={handleCTAClick}
                        className="inline-block bg-[#ffc300] hover:bg-[#e6b000] text-[#333333] font-montserrat font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide"
                    >
                        JOIN THESE CREATORS →
                    </button>
                </div>
            </div>
        </section>
    );
};
