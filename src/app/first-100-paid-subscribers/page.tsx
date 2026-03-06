'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/first-100-paid-subscribers/AnnouncementBar';
import { HeroSection } from '@/components/first-100-paid-subscribers/HeroSection';
import { OutcomesSection } from '@/components/first-100-paid-subscribers/OutcomesSection';
import { BestsellerProofSection } from '@/components/first-100-paid-subscribers/BestsellerProofSection';
import { BridgeSection } from '@/components/first-100-paid-subscribers/BridgeSection';
import { CurriculumSection } from '@/components/first-100-paid-subscribers/CurriculumSection';
import { TestimonialsSection } from '@/components/first-100-paid-subscribers/TestimonialsSection';
import { WhoIsItForSection } from '@/components/first-100-paid-subscribers/WhoIsItForSection';
import { GuaranteeSection } from '@/components/first-100-paid-subscribers/GuaranteeSection';
import { FinalCTASection } from '@/components/first-100-paid-subscribers/FinalCTASection';
import { NicheProofSection } from '@/components/first-100-paid-subscribers/NicheProofSection';
import { FAQSection } from '@/components/first-100-paid-subscribers/FAQSection';
import { EmbeddedCheckout } from '@/components/first-100-paid-subscribers/EmbeddedCheckout';
import { PurchaseNotification } from '@/components/PurchaseNotification';

const First100Page: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AnnouncementBar />
            <main className="flex-grow">
                {/* 1. Hero */}
                <HeroSection />
                {/* 2. Outcomes — what they'll be able to DO */}
                <OutcomesSection />
                {/* 3. Bestseller Proof — Ana's actual results */}
                <BestsellerProofSection />
                {/* 4. Bridge — story, authority, problem, NO section */}
                <BridgeSection />
                {/* 5. Curriculum — what's inside + differentiation */}
                <CurriculumSection />
                {/* 6. Testimonials — social proof avalanche */}
                <TestimonialsSection />
                {/* 7. Who it's for */}
                <WhoIsItForSection />
                {/* 8. Guarantee */}
                <GuaranteeSection />
                {/* 9. Final urgency CTA stack + value reveal */}
                <FinalCTASection />
                {/* 10. Niche self-selection — "Will this work in my niche?" */}
                <NicheProofSection />
                {/* 11. FAQ */}
                <FAQSection />
                {/* 11. Checkout */}
                <div id="checkout-section" className="w-full flex justify-center py-20 px-6 bg-white">
                    <div className="w-full max-w-[700px] flex flex-col items-center">
                        <h2 className="font-anton text-4xl md:text-5xl text-[#333333] mb-4 text-center uppercase tracking-wide">
                            I WANT TO HIT <span className="text-[#d81159]">BESTSELLER STATUS!</span>
                        </h2>
                        <p className="font-lora italic text-gray-500 text-center mb-10 text-lg">
                            Live on March 12th. Replay + all templates & bonuses sent immediately after.
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

export default First100Page;
