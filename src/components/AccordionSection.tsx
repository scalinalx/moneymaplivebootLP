import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import Animated10KGrowth from './Animated10KGrowth';

const AccordionSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const accordionItems = [
    {
      title: "Module 1: Foundation - Newsletter Business Fundamentals",
      content: "Master the essential building blocks of a successful newsletter business. Learn how to identify your niche, create a compelling value proposition, and set up your platform for maximum growth potential.",
      chapters: [
        {
          title: "Chapter 1.1: The Newsletter Business Mindset (12 min)",
          description: "Why 99% of newsletters fail to monetize, The Revenue Architecture Framework, Case study: Sarah's $340 → $3,700 transformation"
        },
        {
          title: "Chapter 1.2: The 4 Subscriber Psychology Types (15 min)",
          description: "Information Seekers (40-60%), Transformation Hunters (15-25%), Community Connectors (10-15%), Status Elevators (5-10%), Trigger content identification system"
        },
        {
          title: "Chapter 1.3: Content Strategy That Converts (12 min)",
          description: "The 70/20/10 content mix formula, Creating trigger content for each subscriber type, Weekly content planning template"
        }
      ]
    },
    {
      title: "Module 2: Conversion Machine - Turn Subscribers Into Buyers",
      content: "Discover proven strategies to transform your subscribers into paying customers. Learn content frameworks, email sequences, and psychological triggers that drive conversions and build trust.",
      chapters: [
        {
          title: "Chapter 2.1: Strategic Homepage That Sells (10 min)",
          description: "5-element homepage formula, Transformation promise creation, Before/after examples with conversion data"
        },
        {
          title: "Chapter 2.2: Welcome Sequence Mastery (14 min)",
          description: "Welcome sequence breakdown, Email timing and psychology, Segmentation through behavior tracking"
        },
        {
          title: "Chapter 2.3: The Micro-Commitment Ladder (11 min)",
          description: "7-step psychological investment system, Implementation examples from real newsletters, Conversion rate optimization"
        },
        {
          title: "Chapter 2.4: 30-Day Subscriber Journey Design (13 min)",
          description: "Onboarding phase (Days 1-10), Engagement phase (Days 11-20), Conversion preparation (Days 21-30), Journey mapping workshop"
        }
      ]
    },
    {
      title: "Module 3: Paywall Strategy - Choose Your Revenue Model",
      content: "Design the perfect monetization strategy for your audience. Explore different paywall models, pricing psychology, and how to create irresistible premium content that subscribers are eager to pay for.",
      chapters: [
        {
          title: "Chapter 3.1: The 4 Proven Paywall Models (15 min)",
          description: "Content Split vs Depth vs Implementation vs Community, Model selection framework, Real conversion rate data for each"
        },
        {
          title: "Chapter 3.2: Pricing Psychology Mastery (12 min)",
          description: "Problem cost assessment, Perceived alternative cost analysis, Value delivery optimization, Counterintuitive pricing insights"
        },
        {
          title: "Chapter 3.3: The Irresistible Offer Framework (14 min)",
          description: "5-element offer creation system, Marcus's tech newsletter breakdown, Offer testing and optimization"
        },
        {
          title: "Chapter 3.4: Conversion Ecosystem Design (11 min)",
          description: "Strategic placement opportunities, Behavioral triggers setup, Value-first presentation approach"
        }
      ]
    },
    {
      title: "Module 4: Multiple Income Streams - Scale Beyond Subscriptions",
      content: "Diversify your revenue beyond newsletter subscriptions. Learn how to implement sponsorships, digital products, courses, and other income streams that complement your newsletter business.",
      chapters: [
        {
          title: "Chapter 4.1: Multi-Modal Revenue System (13 min)",
          description: "Breaking the binary subscription trap, Jessica's 8x revenue increase case study, Revenue stream matching to subscriber types"
        },
        {
          title: "Chapter 4.2: The 7 Proven Income Streams (15 min)",
          description: "Core subscriptions, Premium workshops/bootcamps, Digital products and templates, 1:1 services and consulting, Affiliate partnerships, Sponsored content, SaaS tools integration"
        },
        {
          title: "Chapter 4.3: Revenue Model Selection (12 min)",
          description: "Authority Model vs Creator Model vs Curator Model, Value ladder construction, Revenue distribution optimization"
        },
        {
          title: "Chapter 4.4: Perfect Promotional Calendar (14 min)",
          description: "80/20 promotional principle, 4-week promotional sequence, Nurture vs Bridge vs Offer content balance"
        }
      ]
    },
    {
      title: "Module 5: Systems & Scaling - Build for Growth",
      content: "Create efficient systems and processes that allow your newsletter business to scale. Learn automation strategies, team building, and how to maintain quality while growing your subscriber base.",
      chapters: [
        {
          title: "Chapter 5.1: Content Creation Systems (11 min)",
          description: "Batch creation workflows, Content calendar templates, Quality control checklists"
        },
        {
          title: "Chapter 5.2: Audience Growth Systems (13 min)",
          description: "Daily micro-growth activities, Partnership and cross-promotion strategies, Growth experiment framework"
        },
        {
          title: "Chapter 5.3: Monetization Automation (12 min)",
          description: "Evergreen funnel setup, Email automation sequences, Revenue tracking systems"
        },
        {
          title: "Chapter 5.4: Scaling to $10K+ Monthly (15 min)",
          description: "The $10K newsletter formula, 90-day implementation roadmap, Common scaling mistakes to avoid"
        }
      ]
    },
    {
      title: "Module 6: Implementation & Optimization - Make It Happen",
      content: "Put everything into action with step-by-step implementation guides. Learn how to track key metrics, optimize your content, and continuously improve your newsletter business for maximum results.",
      chapters: [
        {
          title: "Chapter 6.1: Week 1-4 Action Plan (10 min)",
          description: "Priority implementation sequence, Quick wins identification, Common roadblocks and solutions"
        },
        {
          title: "Chapter 6.2: Testing and Optimization (12 min)",
          description: "A/B testing frameworks, Conversion rate optimization, Revenue optimization strategies"
        },
        {
          title: "Chapter 6.3: Troubleshooting Common Issues (14 min)",
          description: "Low open rates solutions, Poor conversion fixes, Subscriber engagement problems, Revenue plateau breakthroughs"
        },
        {
          title: "Chapter 6.4: Scaling Beyond $10K (13 min)",
          description: "Team building strategies, Advanced monetization models, Exit strategies and business valuation"
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        
        <h1 className="text-white text-4xl font-bold mb-4 leading-tight max-w-5xl mx-auto">
          Turn Your Newsletter Into a $10K+/Month Revenue Machine<br/>
          <span className="text-yellow-400 text-2xl">(Without Spending a Dime On Paid Ads)</span>
        </h1>
        <p className="text-gray-300 text-lg mb-4 max-w-4xl mx-auto leading-relaxed">
          The complete system to go from strategy to your first $5K in revenue — in 30 days or less
        </p>
        <Animated10KGrowth />
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-white text-4xl font-bold">What You'll Learn</h2>
          <ArrowDown className="text-white w-8 h-8" />
        </div>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
          6 Modules, 23 Chapters, 5+ hours content
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {accordionItems.map((item, index) => (
          <div
            key={index}
            className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/25 overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 flex items-center justify-between text-left"
              onClick={() => toggleItem(index)}
            >
              <div className="flex items-center gap-6 flex-1 min-w-0">
                {openItem === index ? (
                  <ChevronUp className="text-white w-5 h-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-white w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-white text-lg font-semibold truncate">{item.title}</span>
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium ml-auto mr-12 flex-shrink-0 whitespace-nowrap">
                  {item.chapters.length} LESSONS
                </span>
              </div>
            </button>
            
            {openItem === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  {item.content}
                </p>
                <div className="space-y-4">
                  {item.chapters.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className="bg-black/30 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-2">{chapter.title}</h3>
                      <p className="text-gray-300 text-sm">{chapter.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => {
            document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
        >
          JOIN BUILD TO PROFIT TODAY!
        </button>
      </div>
    </div>
  );
};

export default AccordionSection; 
