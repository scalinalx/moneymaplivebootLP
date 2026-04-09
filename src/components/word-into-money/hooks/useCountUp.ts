'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from './useScrollReveal';

interface UseCountUpOptions {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export function useCountUp({ end, duration = 1500, prefix = '', suffix = '', decimals = 0 }: UseCountUpOptions) {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
    const [display, setDisplay] = useState(`${prefix}0${suffix}`);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isVisible || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();

        function update(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart for satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = eased * end;

            if (decimals > 0) {
                setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
            } else {
                setDisplay(`${prefix}${Math.round(current).toLocaleString()}${suffix}`);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Ensure final value is exact
                if (decimals > 0) {
                    setDisplay(`${prefix}${end.toFixed(decimals)}${suffix}`);
                } else {
                    setDisplay(`${prefix}${end.toLocaleString()}${suffix}`);
                }
            }
        }

        requestAnimationFrame(update);
    }, [isVisible, end, duration, prefix, suffix, decimals]);

    return { ref, display, isVisible };
}
