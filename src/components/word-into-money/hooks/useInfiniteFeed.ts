'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { type FeedItem, infinitePool, type CardType } from '../data/feedContent';

const BATCH_SIZE = 5;
const CTA_EVERY = 5; // Insert a CTA card every N pool cards

const animationVariants: Record<CardType, string> = {
    hero: 'none',
    author: 'fade',
    problem: 'slide-up',
    stat: 'scale',
    testimonial: 'slide-up',
    benefit: 'slide-left',
    curriculum: 'slide-up',
    quote: 'fade',
    image: 'scale',
    comparison: 'slide-up',
    guarantee: 'fade',
    priceReveal: 'scale',
    cta: 'scale',
    faq: 'slide-up',
    urgency: 'slide-up',
    checkout: 'slide-up',
    teaser: 'fade',
    bridge: 'fade',
};

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function useInfiniteFeed() {
    const [extraCards, setExtraCards] = useState<FeedItem[]>([]);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const poolIndex = useRef(0);
    const shuffledPool = useRef<FeedItem[]>(shuffle(infinitePool));
    const cardsSinceLastCta = useRef(0);
    const isLoading = useRef(false);
    const cycleCount = useRef(0);
    const cardCounter = useRef(0);

    const loadMore = useCallback(() => {
        if (isLoading.current) return;
        isLoading.current = true;

        const newCards: FeedItem[] = [];
        let added = 0;

        while (added < BATCH_SIZE) {
            // If pool exhausted, reshuffle
            if (poolIndex.current >= shuffledPool.current.length) {
                shuffledPool.current = shuffle(infinitePool);
                poolIndex.current = 0;
                cycleCount.current++;
            }

            const candidate = shuffledPool.current[poolIndex.current];
            poolIndex.current++;
            cardCounter.current++;

            const animation = animationVariants[candidate.type] || 'slide-up';
            newCards.push({ ...candidate, id: `${candidate.id}-c${cycleCount.current}-${cardCounter.current}`, animation });
            added++;
            cardsSinceLastCta.current++;

            // Insert CTA every N cards
            if (cardsSinceLastCta.current >= CTA_EVERY) {
                cardsSinceLastCta.current = 0;
                newCards.push({
                    id: `infinite-cta-${Date.now()}-${added}`,
                    type: 'cta',
                    animation: 'scale',
                    data: {
                        headline: [
                            'Still thinking about it?',
                            'Ready to turn words into money?',
                            'Your copy skills are one click away.',
                            "You've scrolled this far. You know this is different.",
                            "Every minute reading is a minute not earning. Let's fix that.",
                            "Someone just enrolled while you were scrolling.",
                        ][Math.floor(Math.random() * 6)],
                        buttonText: 'GET INSTANT ACCESS — $97',
                    },
                });
            }
        }

        setExtraCards((prev) => [...prev, ...newCards]);
        isLoading.current = false;
    }, []);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: '400px' }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMore]);

    return { extraCards, sentinelRef };
}
