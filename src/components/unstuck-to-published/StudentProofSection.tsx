'use client';

import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ end }: { end: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        if (!hasAnimated) return;

        let startTime: number | null = null;
        const duration = 2500;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeValue = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeValue * end));
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [end, hasAnimated]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const StudentProofSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-24 px-6 bg-[#E0F7FA]">
            <div className="max-w-[1000px] w-full flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 text-center md:text-left flex justify-center md:justify-start">
                    <h3 className="font-montserrat font-bold text-black text-2xl md:text-4xl leading-tight max-w-lg">
                        Our students apply these systems and flip the switch — from stuck to published and earning — in under 30 days.
                    </h3>
                </div>
                <div className="flex-shrink-0">
                    <div className="bg-[#f72585] text-white rounded-[20px] py-10 px-12 shadow-2xl flex flex-col items-center justify-center text-center border-4 border-white/30 transform transition-transform hover:scale-105">
                        <span className="font-anton text-4xl md:text-6xl mb-2 leading-none">
                            <AnimatedCounter end={10000} />+
                        </span>
                        <span className="font-lato font-bold uppercase tracking-widest text-sm md:text-base">Subscribers Converted</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
