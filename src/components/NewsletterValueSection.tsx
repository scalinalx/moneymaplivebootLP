import React, { useState } from 'react';
import { Check, MessageCircle, GraduationCap, BarChart3, Users } from 'lucide-react';

type TabType = 'Community' | 'Course' | 'Frameworks' | 'Coaching';

interface TabContent {
  title: string;
  points: string[];
  screenshot: string;
}

const NewsletterValueSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Community');

  const tabs: TabType[] = ['Community', 'Course', 'Frameworks', 'Coaching'];

  const tabContent: Record<TabType, TabContent> = {
    Community: {
      title: "Join the #1 Newsletter Creator Community",
      points: [
        "Get daily feedback from 380+ successful newsletter creators",
        "Share revenue wins, growth strategies, and monetization tactics",
        "Access our private mastermind of $10K+/month newsletter owners"
      ],
      screenshot: "Discord/Slack community interface showing active newsletter creators sharing revenue screenshots and growth tips"
    },
    Course: {
      title: "Complete Newsletter Monetization Course",
      points: [
        "6 comprehensive modules with step-by-step video training",
        "50+ high-converting newsletter templates and frameworks",
        "Revenue tracking spreadsheets and growth optimization tools"
      ],
      screenshot: "Course dashboard showing video lessons, templates, and progress tracking"
    },
    Frameworks: {
      title: "Proven Templates & Revenue Systems",
      points: [
        "50+ high-converting newsletter templates that generate sales",
        "Step-by-step monetization frameworks used by top creators",
        "Revenue tracking spreadsheets and growth optimization tools"
      ],
      screenshot: "Dashboard showing newsletter templates, revenue tracking tools, and growth frameworks"
    },
    Coaching: {
      title: "Access to Our Newsletter Creator Network",
      points: [
        "Connect with newsletter creators in your niche for cross-promotion",
        "Partner with other creators for joint ventures and collaborations",
        "Get introduced to brands and sponsors looking for newsletter partners"
      ],
      screenshot: "Network interface showing newsletter creators connecting for partnerships and sponsorship opportunities"
    }
  };

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-lg opacity-30" style={{ backgroundColor: '#ffc300' }}></div>
              <span className="relative text-black text-sm font-semibold px-6 py-2 rounded-full border" style={{ backgroundColor: '#ffc300', borderColor: '#ffc300' }}>
                Real tangible value
              </span>
            </div>
          </div>

          <h2 className="text-white text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            Everything you need to transform your newsletter into a revenue machine
          </h2>

          <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
            As a SubstackMoney Map member you'll not just receive 6+ modules of expert content to help you become a top 1% newsletter creator, you'll
            receive an enormous amount of support, resources and coaching to help you accelerate your growth.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-black/20 backdrop-blur-xl rounded-xl p-2 border border-white/25">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === tab
                  ? 'text-black'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                style={activeTab === tab ? { backgroundColor: '#ffc300' } : {}}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <h3 className="text-white text-3xl font-bold leading-tight">
              {tabContent[activeTab].title}
            </h3>

            <div className="space-y-4">
              {tabContent[activeTab].points.map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1">
                    <Check className="w-6 h-6 flex-shrink-0" style={{ color: '#ffc300' }} />
                  </div>
                  <span className="text-gray-300 text-lg leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative">
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-0 border border-white/25 shadow-2xl">
              {/* Mock Interface */}
              <div className="aspect-video rounded-xl overflow-hidden relative" style={{ background: 'linear-gradient(to bottom right, #ffc300, #d97706)' }}>
                {/* Header Bar */}
                <div className="bg-black/20 p-4 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-white text-sm font-medium">Newsletter Money Map - {activeTab}</div>
                </div>

                {/* Content Area */}
                <div className="px-4 pt-4 pb-16 h-full flex flex-col justify-center items-center text-center">
                  {activeTab === 'Community' && (
                    <>
                      <div className="flex justify-center mb-4">
                        <MessageCircle className="w-16 h-16 text-white" />
                      </div>
                      <div className="text-white text-xl font-bold mb-2">Active Community</div>
                      <div className="text-white/80 text-sm">380+ Newsletter Creators Sharing Daily Wins</div>
                      <div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-xs">
                        <div className="bg-white/20 rounded p-2 text-white text-xs">Revenue: $5,200 MRR</div>
                        <div className="bg-white/20 rounded p-2 text-white text-xs">Subscribers: 12K</div>
                        <div className="bg-white/20 rounded p-2 text-white text-xs">Launch: $25K</div>
                        <div className="bg-white/20 rounded p-2 text-white text-xs">Growth: +450%</div>
                      </div>
                    </>
                  )}

                  {activeTab === 'Course' && (
                    <>
                      <div className="flex justify-center mb-4">
                        <GraduationCap className="w-16 h-16 text-white" />
                      </div>
                      <div className="text-white text-xl font-bold mb-2">Complete Course</div>
                      <div className="text-white/80 text-sm">6 Modules, 23 Chapters, 5+ Hours</div>
                      <div className="mt-4 space-y-2 w-full max-w-sm">
                        <div className="bg-white/20 rounded p-2 flex items-center justify-between">
                          <span className="text-white text-xs">Module 1: Foundation</span>
                          <span className="text-green-400 text-xs">✓ Complete</span>
                        </div>
                        <div className="bg-white/20 rounded p-2 flex items-center justify-between">
                          <span className="text-white text-xs">Module 2: Content Strategy</span>
                          <span className="text-green-400 text-xs">✓ Complete</span>
                        </div>
                        <div className="bg-white/20 rounded p-2 flex items-center justify-between">
                          <span className="text-white text-xs">Module 3: Monetization</span>
                          <span className="text-blue-400 text-xs">⏵ In Progress</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'Frameworks' && (
                    <>
                      <div className="flex justify-center mb-4">
                        <BarChart3 className="w-16 h-16 text-white" />
                      </div>
                      <div className="text-white text-xl font-bold mb-2">Revenue Frameworks</div>
                      <div className="text-white/80 text-sm">50+ Templates & Tools</div>
                      <div className="mt-4 grid grid-cols-1 gap-2 w-full max-w-sm">
                        <div className="bg-white/20 rounded p-2 text-white text-xs flex justify-between">
                          <span>Sales Email Templates</span>
                          <span style={{ color: '#ffc300' }}>✓ 12</span>
                        </div>
                        <div className="bg-white/20 rounded p-2 text-white text-xs flex justify-between">
                          <span>Revenue Trackers</span>
                          <span style={{ color: '#ffc300' }}>✓ 5</span>
                        </div>
                        <div className="bg-white/20 rounded p-2 text-white text-xs flex justify-between">
                          <span>Launch Sequences</span>
                          <span style={{ color: '#ffc300' }}>✓ 8</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'Coaching' && (
                    <>
                      <div className="flex justify-center mb-4">
                        <Users className="w-16 h-16 text-white" />
                      </div>
                      <div className="text-white text-xl font-bold mb-2">Creator Network</div>
                      <div className="text-white/80 text-sm">Supercharge Your Growth with Recorded Coaching Libraries</div>
                      <div className="mt-4 space-y-2 w-full max-w-sm">
                        <div className="bg-white/20 rounded p-2 flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs">M</div>
                          <div className="text-white text-xs">Marketing Newsletters</div>
                        </div>
                        <div className="bg-white/20 rounded p-2 flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-xs">T</div>
                          <div className="text-white text-xs">My Perfect Tech Stack</div>
                        </div>
                        <div className="bg-white/20 rounded p-2 flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-white text-xs">B</div>
                          <div className="text-white text-xs">Business Insights from 50K subs</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Join CTA Overlay */}


              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-black font-bold py-4 px-12 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 hover:opacity-90" style={{ backgroundColor: '#ffc300' }}
          >
            JOIN BUILD TO PROFIT TODAY!
          </button>
          <p className="text-gray-400 text-sm mt-4">Join 380+ newsletter creators already building their revenue machines</p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterValueSection; 
