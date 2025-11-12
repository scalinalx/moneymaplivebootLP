'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Import your new components
import PricingComponent from '@/components/PricingComponent';
import PricingComp2 from '@/components/PricingComp2';
import OldVsNewWaySection from '@/components/OldVsNewWaySection';
import ColdHardTruthSection from '@/components/ColdHardTruthSection';
import FooterSection from '@/components/FooterSection';

// Main Landing Page Component
export default function LandingPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/landing');
  }, [router]);
  return (
    <div className="min-h-screen bg-page-radial relative">
      <div className="relative z-10">
        <PricingComponent />
        <PricingComp2/>
        <OldVsNewWaySection/>
        <ColdHardTruthSection/>
        <FooterSection/>
        </div>
    </div>
  );
}
