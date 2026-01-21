import React from 'react';
import AnaAiApp from '@/components/ana-ai/AnaAiApp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ANA'S OfferFlow",
  description: "A refined tool for creators to generate perfect offer stacks using Gemini 3.0 Flash.",
};

export default function AnaAiOfferFlowPage() {
  return <AnaAiApp />;
}
