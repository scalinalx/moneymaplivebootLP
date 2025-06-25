import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's the pricing exactly?",
      answer: "Newsletter Money Map starts at $247/month for the Academy plan, or save $1,967 with our VIP annual plan at $997/year. That's less than what most people spend on streaming services, yet our students are generating $2,000-$8,000+ monthly from their newsletters. One successful campaign pays for the entire program multiple times over."
    },
    {
      question: "I've wasted money on courses in the past. What's different about Newsletter Money Map?",
      answer: "Most courses give you theory. We give you the exact templates, frameworks, and strategies that generated over $500k+ for our students. You get proven systems used by 12 Substack Bestsellers, plus a community of 250+ successful newsletter creators who actually implement and see results."
    },
    {
      question: "How can I be sure this program is right for me?",
      answer: "If you're tired of writing newsletters that don't make money, this is for you. Whether you have 0 subscribers or 10,000, our frameworks work. 93% of our students see results within 90 days. Plus, you get access - so even if you're not ready now, you can start when you are."
    },
    {
      question: "What exactly do I get?",
      answer: "You get everything you need to build a $120K+/year newsletter business: 6 complete modules, 50+ email templates, monetization frameworks, growth strategies, case studies, and access to our private community. Plus monthly live Q&As where you can get your questions answered directly."
    },
    {
      question: "How much time do I need to dedicate to this?",
      answer: "You can start seeing results with just 2-3 hours per week. Our system is designed for busy creators - you'll get step-by-step processes that streamline your workflow. Most students implement one strategy at a time and see their first revenue spike within 30-60 days."
    },
    {
      question: "I'm a complete beginner. Will this work for me?",
      answer: "Absolutely! 40% of our most successful students started with zero subscribers. We provide beginner-friendly templates, done-for-you frameworks, and a supportive community. You'll learn the exact strategies that took our founders from 0 to multiple 6-figure newsletter businesses."
    },
    {
      question: "How quickly can I expect to see results?",
      answer: "Most students see their first monetization within 30-90 days. However, some have generated revenue in their first week using our quick-win strategies. The key is implementation - follow our proven system and you'll start building a profitable newsletter faster than going it alone."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Have any questions?
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between group"
              >
                <span className="text-white text-lg font-semibold pr-4 group-hover:text-gray-200 transition-colors duration-200">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <Minus className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Plus className="w-6 h-6 text-yellow-400" />
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-gray-300 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection; 