import React from 'react';
import { Hero } from '@/components/offer-clarity/Hero';
import { CaseStudyWalkthrough } from '@/components/offer-clarity/CaseStudyWalkthrough';
import { AuthorPreamble } from '@/components/offer-clarity/AuthorPreamble';
import { WhatsIncluded } from '@/components/offer-clarity/WhatsIncluded';
import { AllSalesFinal } from '@/components/offer-clarity/AllSalesFinal';
import { BeforeAfterLadder } from '@/components/offer-clarity/BeforeAfterLadder';
import { HowIsThisDifferent } from '@/components/offer-clarity/HowIsThisDifferent';
import { FiveStepInfographic } from '@/components/offer-clarity/FiveStepInfographic';
import { RealResults } from '@/components/offer-clarity/RealResults';
import { ToolsAndSignature } from '@/components/offer-clarity/ToolsAndSignature';
import { CourseGrowsWithYou } from '@/components/offer-clarity/CourseGrowsWithYou';
import { SubscribersCallout } from '@/components/offer-clarity/SubscribersCallout';
import { PricingTier } from '@/components/offer-clarity/PricingTier';
import { BonusStack } from '@/components/offer-clarity/BonusStack';
import { EmbeddedCheckout } from '@/components/offer-clarity/EmbeddedCheckout';
import { FinalCTA } from '@/components/offer-clarity/FinalCTA';
import { Footer } from '@/components/offer-clarity/Footer';

export default function OfferClarityPage() {
  return (
    <main className="bg-white text-[#1a1a1a]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
      <Hero />
      <CaseStudyWalkthrough />
      <AuthorPreamble />
      <WhatsIncluded />
      <AllSalesFinal />
      <BeforeAfterLadder />
      <HowIsThisDifferent />
      <FiveStepInfographic />
      <RealResults />
      <ToolsAndSignature />
      <CourseGrowsWithYou />
      <SubscribersCallout />
      <PricingTier />
      <BonusStack />
      <EmbeddedCheckout />
      <FinalCTA />
      <Footer />
    </main>
  );
}
