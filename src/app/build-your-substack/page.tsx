'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/unstuck-to-published/AnnouncementBar';
import { HeroSection } from '@/components/build-your-substack/HeroSection';
import { BridgeSection } from '@/components/build-your-substack/BridgeSection';
import { HowItWorksSection } from '@/components/build-your-substack/HowItWorksSection';
import { OutcomesSection } from '@/components/build-your-substack/OutcomesSection';
import { TestimonialStrip } from '@/components/build-your-substack/TestimonialStrip';
import { StudentProofSection } from '@/components/build-your-substack/StudentProofSection';
import { BestsellerProofSection } from '@/components/build-your-substack/BestsellerProofSection';
import { CurriculumSection } from '@/components/build-your-substack/CurriculumSection';
import { TestimonialsGrid } from '@/components/build-your-substack/TestimonialsGrid';
import { ValueStackSection } from '@/components/build-your-substack/ValueStackSection';
import { WhoIsItForSection } from '@/components/build-your-substack/WhoIsItForSection';
import { GuaranteeSection } from '@/components/build-your-substack/GuaranteeSection';
import { FinalCTASection } from '@/components/build-your-substack/FinalCTASection';
import { NicheProofSection } from '@/components/unstuck-to-published/NicheProofSection';
import { FAQSection } from '@/components/unstuck-to-published/FAQSection';
import { EmbeddedCheckout } from '@/components/build-your-substack/EmbeddedCheckout';
import { PurchaseNotification } from '@/components/PurchaseNotification';

const BuildYourSubstackPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AnnouncementBar />
            <main className="flex-grow">
                {/* 1. Hero — dream outcome headline, "even if" qualifier, authority stats */}
                <HeroSection />

                {/* 2. Bridge — "you're so close" reframe, $0 required grid */}
                <BridgeSection />

                {/* 3. How It Works — 3-step simplifier (The Substack Day-One Framework) */}
                <HowItWorksSection />

                {/* 4. Outcomes — "How to X so that Y" desire-embedded bullets */}
                <OutcomesSection />

                {/* TESTIMONIAL #1 — woven between content sections */}
                <TestimonialStrip
                    imageSrc="/imgs/unstuck-to-published/testim/1.jpeg"
                    caption="Real results from a real creator — starting from zero."
                    ctaText="I WANT RESULTS LIKE THESE →"
                />

                {/* 5. Student proof — animated 10,000+ counter */}
                <StudentProofSection />

                {/* 6. Hosts — who built this */}
                <BestsellerProofSection />

                {/* TESTIMONIAL #2 — after authority section */}
                <TestimonialStrip
                    imageSrc="/imgs/unstuck-to-published/testim/2.jpeg"
                    caption="From overthinking to published — in one workshop."
                    ctaText="I'M SOLD — SAVE MY SPOT →"
                />

                {/* 7. Curriculum — what you'll build, with timing */}
                <CurriculumSection />

                {/* 8. All testimonials grid — full social proof wall */}
                <TestimonialsGrid />

                {/* 9. Value stack — price anchor and reveal */}
                <ValueStackSection />

                {/* TESTIMONIAL #3 — after price reveal */}
                <TestimonialStrip
                    imageSrc="/imgs/unstuck-to-published/testim/3.jpeg"
                    caption="Worth every penny — and then some."
                    ctaText="THAT'S ALL I NEEDED — I'M IN →"
                />

                {/* 10. Who it's for / not for */}
                <WhoIsItForSection />

                {/* 11. Guarantee — "still on the fence?" */}
                <GuaranteeSection />

                {/* 12. Final urgency CTA */}
                <FinalCTASection />

                {/* TESTIMONIAL #4 — final push before FAQ */}
                <TestimonialStrip
                    imageSrc="/imgs/unstuck-to-published/testim/4.jpeg"
                    caption="Another creator who stopped waiting and started building."
                />

                {/* 13. Niche proof — "will this work for me?" */}
                <NicheProofSection />

                {/* 14. FAQ */}
                <div id="faq-section">
                    <FAQSection />
                </div>

                {/* 15. Checkout */}
                <div id="checkout-section" className="w-full flex justify-center py-20 px-6 bg-white">
                    <div className="w-full max-w-[770px] flex flex-col items-center">
                        <h2 className="font-anton text-4xl md:text-5xl text-[#333333] mb-4 text-center uppercase tracking-wide">
                            LET&apos;S <span className="text-[#f72585]">DO THIS</span>
                        </h2>
                        <p className="font-lora italic text-gray-500 text-center mb-10 text-lg">
                            Saturday, March 21 @ 10:00 AM EST. Replay + all templates & resources included.
                        </p>
                        <EmbeddedCheckout />
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-gray-400 text-sm font-sans bg-white border-t border-gray-100">
                <p>&copy; 2026 How We Grow. All rights reserved. Support: <a href="mailto:anaxcalin@gmail.com" className="hover:text-gray-600 transition-colors">anaxcalin@gmail.com</a></p>
            </footer>
            <PurchaseNotification />
        </div>
    );
};

export default BuildYourSubstackPage;
