'use client';

import { useState } from 'react';

// Import your new components
import PricingComponent from '@/components/PricingComponent';
import BannerText1 from '@/components/bannertext1';
import NewsletterValueSection from '@/components/NewsletterValueSection';
import WhoThisIsForSection from '@/components/WhoThisIsForSection';
import GrowthStorySection from '@/components/GrowthStorySection';
import WhatYoullGetSection from '@/components/WhatYoullGetSection';
import Testimonial4 from '@/components/testimonial4';
import PricingComp2 from '@/components/PricingComp2';
import OldVsNewWaySection from '@/components/OldVsNewWaySection';
import ColdHardTruthSection from '@/components/ColdHardTruthSection';
import FAQSection from '@/components/FAQSection';
import FooterSection from '@/components/FooterSection';

// Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      {/* Global red overlay - 3% opacity */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(239, 68, 68, 0.03)' }}></div>
      
      <div className="relative z-10">
        <PricingComponent />
        <BannerText1/>
        <NewsletterValueSection />
        <WhoThisIsForSection/>
        <GrowthStorySection/>
        <WhatYoullGetSection/>
        <Testimonial4/>
        <PricingComp2/>
        <OldVsNewWaySection/>
        <ColdHardTruthSection/>
        <FAQSection/>
        <FooterSection/>
      </div>
    </div>
  );
}
