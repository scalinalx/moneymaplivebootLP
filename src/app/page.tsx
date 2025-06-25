'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Shield } from 'lucide-react';
import { LeadForm } from '@/components/forms/LeadForm';
import type { Lead, ApiResponse, StripeCheckoutSession } from '@/types';

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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLeadSuccess = async (leadData: Lead) => {
    setIsProcessingPayment(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId: leadData.id }),
      });

      const result: ApiResponse<StripeCheckoutSession> = await response.json();

      if (result.success && result.data) {
        window.location.href = result.data.url;
      } else {
        setError(result.error || 'Failed to create checkout session');
        setIsProcessingPayment(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  const handleLeadError = (errorMessage: string) => {
    setError(errorMessage);
  };
  
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

        <section id="form-section" className="py-16 bg-gray-50 scroll-mt-20">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Save Your Seat Now! (Only 48H Left!)
              </h2>
              <p className="text-xl text-gray-600">
                Just one step away from transforming your skills
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              {isProcessingPayment ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Redirecting to Secure Checkout...
                  </h3>
                  <p className="text-gray-600">
                    Please wait while we prepare your payment page
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                    Your Information
                  </h3>
                  <LeadForm onSuccess={handleLeadSuccess} onError={handleLeadError} />
                </>
              )}
            </div>

            <div className="text-center text-sm text-gray-500 space-y-2">
              <p className="flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Your information is secure and will never be shared
              </p>
              <p>💳 Powered by Stripe - Industry-leading payment security</p>
              <p>📧 You&apos;ll receive instant access details via email</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
