'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/how-to-hit-10k/AnnouncementBar';
import { HeroSection } from '@/components/how-to-hit-10k/HeroSection';
import { BridgeSection } from '@/components/how-to-hit-10k/BridgeSection';
import { ProcessSection } from '@/components/how-to-hit-10k/ProcessSection';
import { StudentSpotlight } from '@/components/how-to-hit-10k/StudentSpotlight';
import { RequirementsSection } from '@/components/how-to-hit-10k/RequirementsSection';
import { OfferStack } from '@/components/how-to-hit-10k/OfferStack';
import { FlopToViralSection } from '@/components/how-to-hit-10k/FlopToViralSection';
import { LynsaySpotlight } from '@/components/how-to-hit-10k/LynsaySpotlight';
import { LauraResults } from '@/components/how-to-hit-10k/LauraResults';
import { SneakPeekSection } from '@/components/how-to-hit-10k/SneakPeekSection';
import { ObjectionHandlingSection } from '@/components/how-to-hit-10k/ObjectionHandlingSection';
import { HayleyeSpotlight } from '@/components/how-to-hit-10k/HayleyeSpotlight';
import { GabrielleSpotlight } from '@/components/how-to-hit-10k/GabrielleSpotlight';
import { FAQSection } from '@/components/how-to-hit-10k/FAQSection';
import { WaitlistForm } from '@/components/how-to-hit-10k/WaitlistForm';
import { SectionDivider } from '@/components/how-to-hit-10k/SectionDivider';

const HowToHit10kPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AnnouncementBar />
            <main className="flex-grow">
                <HeroSection />
                <BridgeSection />
                <ProcessSection />
                <StudentSpotlight />
                <OfferStack />
                <FlopToViralSection />
                <RequirementsSection />
                <LynsaySpotlight />
                <LauraResults />

                {/* NEW SECTIONS */}
                <SneakPeekSection />
                <ObjectionHandlingSection />
                <HayleyeSpotlight />
                <SectionDivider />
                <GabrielleSpotlight />
                <FAQSection />
                <div className="py-20 bg-gray-50 flex justify-center px-6">
                    <WaitlistForm />
                </div>
            </main>

            <footer className="py-8 text-center text-gray-400 text-sm font-sans bg-white border-t border-gray-100">
                <p>&copy; 2026 How We Grow. All rights reserved. Support: <a href="mailto:anaxcalin@gmail.com" className="hover:text-gray-600 transition-colors">anaxcalin@gmail.com</a></p>
            </footer>
        </div>
    );
};

export default HowToHit10kPage;

