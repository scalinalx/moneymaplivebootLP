'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/unstuck-to-published/AnnouncementBar';
import { HeroSection } from '@/components/unstuck-to-published/HeroSection';
import { OutcomesSection } from '@/components/unstuck-to-published/OutcomesSection';
import { StudentProofSection } from '@/components/unstuck-to-published/StudentProofSection';
import { BestsellerProofSection } from '@/components/unstuck-to-published/BestsellerProofSection';
import { BridgeSection } from '@/components/unstuck-to-published/BridgeSection';
import { CurriculumSection } from '@/components/unstuck-to-published/CurriculumSection';
import { TestimonialsSection } from '@/components/unstuck-to-published/TestimonialsSection';
import { WhoIsItForSection } from '@/components/unstuck-to-published/WhoIsItForSection';
import { GuaranteeSection } from '@/components/unstuck-to-published/GuaranteeSection';
import { ValueStackSection } from '@/components/unstuck-to-published/ValueStackSection';
import { FinalCTASection } from '@/components/unstuck-to-published/FinalCTASection';
import { NicheProofSection } from '@/components/unstuck-to-published/NicheProofSection';
import { FAQSection } from '@/components/unstuck-to-published/FAQSection';
import { EmbeddedCheckout } from '@/components/unstuck-to-published/EmbeddedCheckout';
import { PurchaseNotification } from '@/components/PurchaseNotification';

const UnstuckToPublishedPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AnnouncementBar />
            <main className="flex-grow">
                {/* 1. Hero — headline, image, CTA, credibility boxes, testimonials */}
                <HeroSection />
                {/* 2. Outcomes — "By the end of this workshop you'll know exactly how to..." */}
                <OutcomesSection />
                {/* 3. Student proof — animated counter */}
                <StudentProofSection />
                {/* 4. Hosts — Ana + Jessica proof */}
                <BestsellerProofSection />
                {/* 4. Bridge — problem section, stuck list */}
                <BridgeSection />
                {/* 5. Curriculum — workshop agenda */}
                <CurriculumSection />
                {/* 6. Testimonials — social proof avalanche */}
                <TestimonialsSection />
                {/* 7. Who it's for */}
                <WhoIsItForSection />
                {/* 8. Guarantee */}
                <GuaranteeSection />
                {/* 9. Value Stack — everything you get */}
                <ValueStackSection />
                {/* 10. Final urgency CTA stack */}
                <FinalCTASection />
                {/* 10. Niche self-selection — "Will this work in my niche?" */}
                <NicheProofSection />
                {/* 11. FAQ */}
                <FAQSection />
                {/* 12. Checkout */}
                <div id="checkout-section" className="w-full flex justify-center py-20 px-6 bg-white">
                    <div className="w-full max-w-[770px] flex flex-col items-center">
                        <h2 className="font-anton text-4xl md:text-5xl text-[#333333] mb-4 text-center uppercase tracking-wide">
                            BOOK YOUR <span className="text-[#f72585]">SEAT NOW</span>
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

export default UnstuckToPublishedPage;
