import React from 'react';
import AnaAiApp from '@/components/ana-ai/AnaAiApp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ANA'S OFFER FLOW",
  description: "A refined tool for creators to generate perfect offer stacks using Gemini 3.0 Flash.",
  openGraph: {
    title: "ANA'S OFFER STACK",
    description: "A refined tool for creators to generate perfect offer stacks using Gemini 3.0 Flash.",
    images: ["https://substackcdn.com/image/fetch/$s_!VUeE!,w_1360,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dc2df7d-6cba-4d7e-94fc-05583eec3cda_1280x1280.png"],
    url: "https://www.monetisesubstack.com/ana-ai-offer-flow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ANA'S OFFER STACK",
    description: "A refined tool for creators to generate perfect offer stacks using Gemini 3.0 Flash.",
    images: ["https://substackcdn.com/image/fetch/$s_!VUeE!,w_1360,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dc2df7d-6cba-4d7e-94fc-05583eec3cda_1280x1280.png"],
  },
};

export default function AnaAiOfferFlowPage() {
  return <AnaAiApp />;
}
