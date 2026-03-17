'use client';

import { useEffect, useState, useRef } from 'react';

export const StudentProofSection = () => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateCount();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateCount = () => {
        const target = 10000;
        const duration = 2000;
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const formattedCount = count.toLocaleString();

    return (
        <section ref={sectionRef} className="bg-[#f72585]/5 py-16 px-6">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                    <p className="font-montserrat font-bold text-[#f72585] text-xs tracking-widest uppercase mb-3">
                        PROVEN RESULTS
                    </p>
                    <h2 className="font-anton text-3xl md:text-4xl text-[#333333] uppercase mb-4">
                        Our Students Have Converted Over
                    </h2>
                    <p className="font-anton text-6xl md:text-7xl text-[#f72585]">
                        {formattedCount}+
                    </p>
                    <p className="font-montserrat font-bold text-[#333333] text-lg mt-2">
                        Subscribers &amp; Counting
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <p className="font-anton text-2xl text-[#ffc300]">88,000+</p>
                        <p className="text-xs text-gray-500 mt-1">Combined Subscribers</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <p className="font-anton text-2xl text-[#ffc300]">#1 Bestseller</p>
                        <p className="text-xs text-gray-500 mt-1">On Substack</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
