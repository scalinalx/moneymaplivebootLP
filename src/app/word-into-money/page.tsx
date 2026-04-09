'use client';

import React from 'react';
import { FeedContainer } from '@/components/word-into-money/FeedContainer';
import { FeedCard } from '@/components/word-into-money/FeedCard';
import { StickyCTA } from '@/components/word-into-money/StickyCTA';
import { EmbeddedCheckout } from '@/components/word-into-money/EmbeddedCheckout';
import { useInfiniteFeed } from '@/components/word-into-money/hooks/useInfiniteFeed';
import { coreSequence } from '@/components/word-into-money/data/feedContent';
import type { FeedItem } from '@/components/word-into-money/data/feedContent';

// Card components
import { HeroCard } from '@/components/word-into-money/cards/HeroCard';
import { AuthorCard } from '@/components/word-into-money/cards/AuthorCard';
import { ProblemCard } from '@/components/word-into-money/cards/ProblemCard';
import { StatCard } from '@/components/word-into-money/cards/StatCard';
import { TestimonialCard } from '@/components/word-into-money/cards/TestimonialCard';
import { BenefitCard } from '@/components/word-into-money/cards/BenefitCard';
import { CurriculumCard } from '@/components/word-into-money/cards/CurriculumCard';
import { QuoteCard } from '@/components/word-into-money/cards/QuoteCard';
import { ImageCard } from '@/components/word-into-money/cards/ImageCard';
import { ComparisonCard } from '@/components/word-into-money/cards/ComparisonCard';
import { GuaranteeCard } from '@/components/word-into-money/cards/GuaranteeCard';
import { PriceRevealCard } from '@/components/word-into-money/cards/PriceRevealCard';
import { CTACard } from '@/components/word-into-money/cards/CTACard';
import { FAQCard } from '@/components/word-into-money/cards/FAQCard';
import { UrgencyCard } from '@/components/word-into-money/cards/UrgencyCard';
import { TeaserCard } from '@/components/word-into-money/cards/TeaserCard';
import { BridgeCard } from '@/components/word-into-money/cards/BridgeCard';
import { PurchaseNotification } from '@/components/PurchaseNotification';

function renderCard(item: FeedItem) {
    const { id, type, animation, variant, data } = item;
    const v = variant as any;

    switch (type) {
        case 'hero':
            return <HeroCard key={id} headline={data.headline} subheadline={data.subheadline} />;
        case 'author':
            return <AuthorCard key={id} animation={animation} />;
        case 'problem':
            return <ProblemCard key={id} text={data.text} animation={animation} variant={v} />;
        case 'stat':
            return <StatCard key={id} number={data.number} context={data.context} animation={animation} variant={v} />;
        case 'testimonial':
            return (
                <TestimonialCard
                    key={id}
                    name={data.name}
                    text={data.text}
                    avatarUrl={data.avatarUrl}
                    detail={data.detail}
                    animation={animation}
                    variant={v}
                />
            );
        case 'benefit':
            return (
                <BenefitCard
                    key={id}
                    number={data.number}
                    total={data.total}
                    headline={data.headline}
                    detail={data.detail}
                    animation={animation}
                    variant={v}
                />
            );
        case 'curriculum':
            return <CurriculumCard key={id} modules={data.modules} animation={animation} />;
        case 'quote':
            return <QuoteCard key={id} quote={data.quote} attribution={data.attribution} animation={animation} variant={v} />;
        case 'image':
            return <ImageCard key={id} src={data.src} alt={data.alt} caption={data.caption} animation={animation} />;
        case 'comparison':
            return <ComparisonCard key={id} before={data.before} after={data.after} animation={animation} />;
        case 'guarantee':
            return <GuaranteeCard key={id} animation={animation} />;
        case 'priceReveal':
            return (
                <PriceRevealCard
                    key={id}
                    items={data.items}
                    totalValue={data.totalValue}
                    price={data.price}
                    animation={animation}
                />
            );
        case 'cta':
            return <CTACard key={id} headline={data.headline} buttonText={data.buttonText} animation={animation} />;
        case 'faq':
            return <FAQCard key={id} faqs={data.faqs} animation={animation} />;
        case 'urgency':
            return <UrgencyCard key={id} text={data.text} animation={animation} />;
        case 'teaser':
            return <TeaserCard key={id} text={data.text} animation={animation} />;
        case 'bridge':
            return <BridgeCard key={id} text={data.text} animation={animation} />;
        case 'checkout':
            return (
                <FeedCard key={id} animation={animation as any} noPadding>
                    <EmbeddedCheckout />
                </FeedCard>
            );
        default:
            return null;
    }
}

export default function WordIntoMoneyPage() {
    const { extraCards, sentinelRef } = useInfiniteFeed();

    return (
        <>
            <FeedContainer>
                {/* Phase 1: Core sales sequence */}
                {coreSequence.map(renderCard)}

                {/* Phase 2: Infinite loop cards */}
                {extraCards.map(renderCard)}

                {/* Sentinel for infinite scroll loading */}
                <div ref={sentinelRef} className="h-4" />
            </FeedContainer>

            <StickyCTA />
            <PurchaseNotification />
        </>
    );
}
