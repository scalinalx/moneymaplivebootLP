import React, { useState, useEffect } from 'react';
import { Check, Shield, Zap, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LeadForm } from '@/components/forms/LeadForm';
import type { Lead, ApiResponse, StripeCheckoutSession } from '@/types';
import AccordionSection from './AccordionSection';
import ResultsGallery from './ResultsGallery';
import Testimonials2 from './Testimonials2';
import Animated10KGrowth from './Animated10KGrowth';

const PricingComp2 = () => {
  const router = useRouter();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen relative">
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        
        

        {/* Testimonials Section */}
        

        {/* Countdown Timer */}
        

        {/* Creator Stories Section */}
        

        {/* Transition Section */}
        

        {/* What We Cover Section */}
       

        {/* Pricing Section */}
        <div id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Get The Complete System for Just{' '}
              <span className="text-gray-400 line-through mr-4">$897</span>
              <span className="text-yellow-400">$497</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              (Save $400 + & $2,000+ vs. hiring a consultant)
            </p>
            
            {/* Value Points */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">6 proven modules used by 12 Substack Bestsellers</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">50+ high-converting templates & frameworks</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">Private community of $10K+/month creators</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">Everything you need to replicate these results</span>
                </div>
              </div>
            </div>
            
            {/* Urgency Message */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-8 max-w-md mx-auto">
              <p className="text-red-300 text-sm font-semibold">
                ⚠️ 47 spots left at this price
              </p>
              <p className="text-red-300 text-sm font-bold mt-1">
                Next cohort: $897
              </p>
            </div>
          </div>
          
          {/* Form Section */}
          <section id="form-section" className="scroll-mt-20">
            <div className="max-w-2xl mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Secure Your Spot Now
                </h2>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
                  <p className="text-red-300">{error}</p>
                </div>
              )}

              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 mb-8 border border-white/25 shadow-2xl">
                {isProcessingPayment ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Redirecting to Secure Checkout...
                    </h3>
                    <p className="text-gray-300">
                      Please wait while we prepare your payment page
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                      Your Information
                    </h3>
                    <LeadForm onSuccess={handleLeadSuccess} onError={handleLeadError} />
                  </>
                )}
              </div>

              <div className="text-center text-sm text-gray-400 space-y-2">
                <p className="flex items-center justify-center">
                  <Shield className="w-4 h-4 mr-2 text-green-400" />
                  Your information is secure and will never be shared
                </p>
                <p>💳 Powered by Stripe - Industry-leading payment security</p>
                <p>📧 You&apos;ll receive instant access details via email</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PricingComp2; 