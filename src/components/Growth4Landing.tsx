import React from 'react';
import Image from 'next/image';

// Clone of GrowthStorySection, renamed for landing usage
const Growth4Landing = () => {
  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-lg opacity-30" style={{ backgroundColor: '#ffc300' }}></div>
              <span className="relative text-black text-sm font-semibold px-6 py-2 rounded-full border" style={{ backgroundColor: '#ffc300', borderColor: '#ffc300' }}>
                Discover my proven strategies
              </span>
            </div>
          </div>

          <h2 className="text-white text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Supercharge the growth & monetization of your <span className="text-yellow-400">newsletter</span>
          </h2>

          <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
            Just over 1 year ago I started Substack with zero followers and no idea where to begin. <br/> Now I'm one of the fastest growing 
            female creators on the platform. Inside Build To Profit, I'll reveal exactly how I did it so you can achieve success with your 
            newsletter.
          </p>
        </div>

        {/* Growth Chart Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/25 shadow-2xl">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400">
                <Image 
                  src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6b1deb04-e24a-4f12-af95-c9941a3c4a34_1500x1500.png" 
                  alt="Ana Calin"
                  className="w-full h-full object-cover"
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <h3 className="text-yellow-400 text-2xl font-bold">Ana Calin</h3>
                <p className="text-gray-300">64,987 subscribers</p>
              </div>
            </div>

            {/* Chart Container */}
            <div className="relative bg-white rounded-xl p-6 mb-8">
              {/* Y-axis labels */}
              <div className="absolute left-2 top-6 bottom-16 flex flex-col justify-between text-gray-600 text-sm">
                <span>60,000</span>
                <span>45,000</span>
                <span>30,000</span>
                <span>15,000</span>
                <span>0</span>
              </div>
              
              {/* Chart area */}
              <div className="ml-16 mr-4 relative" style={{ height: '400px' }}>
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-rows-4 opacity-20">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border-b border-gray-300"></div>
                  ))}
                </div>
                
                {/* Growth curve area */}
                <div className="absolute bottom-0 left-0 right-0" style={{ height: '80%' }}>
                  <div 
                    className="absolute bottom-0 left-0 right-0 rounded-t-lg opacity-60"
                    style={{ 
                      background: 'linear-gradient(to top, #eab308, #fbbf24, rgba(251, 191, 36, 0.3))',
                      clipPath: 'polygon(0% 100%, 15% 90%, 35% 75%, 55% 55%, 75% 30%, 90% 10%, 100% 0%, 100% 100%)'
                    }}
                  ></div>
                  
                  {/* Growth line */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M 0 100 Q 20 85 40 65 Q 60 45 80 20 Q 90 10 100 5"
                      stroke="#1f2937"
                      strokeWidth="0.5"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* Milestone points and callouts */}
                <div className="absolute inset-0">
                  {/* Point 1 */}
                  <div className="absolute" style={{ left: '15%', bottom: '20%' }}>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64">
                      <div className="bg-yellow-500 text-black p-3 rounded-lg relative">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center absolute -top-4 left-4 text-black font-bold text-sm">1</div>
                        <p className="text-sm font-medium pt-2">I created my account in September 2024</p>
                        <div className="absolute -top-2 left-8 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-yellow-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="absolute" style={{ left: '55%', bottom: '45%' }}>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-80">
                      <div className="bg-yellow-500 text-black p-3 rounded-lg relative">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center absolute -top-4 left-4 text-black font-bold text-sm">2</div>
                        <p className="text-sm font-medium pt-2">
                          Found my style of writing, branding, tone of voice and built a consistent value delivery system - 
                          <span className="font-bold"> focused on quality not just quantity.</span>
                        </p>
                        <div className="absolute -top-2 left-8 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-yellow-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="absolute" style={{ left: '85%', bottom: '85%' }}>
                    <div className="absolute top-6 right-0 w-72">
                      <div className="bg-yellow-500 text-black p-3 rounded-lg relative">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center absolute -top-4 right-4 text-black font-bold text-sm">3</div>
                        <p className="text-sm font-medium pt-2">
                          Became <span className="font-bold">the fastest growing female creator</span> on the platform.
                        </p>
                        <div className="absolute -top-2 right-8 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-yellow-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Point 4 – attached below the plot line near end */}
                  <div className="absolute" style={{ left: '97%', bottom: '75%' }}>
                    <div className="absolute top-6 left-0 -translate-x-1/2">
                      <div className="relative inline-flex items-center justify-center bg-yellow-500 text-black px-4 py-2 rounded-[10.5px] text-center">
                        <div className="h-7 w-7 bg-yellow-500 rounded-full flex items-center justify-center absolute -top-5 left-1/2 -translate-x-1/2 text-black font-extrabold text-[16px]">4</div>
                        <span className="text-xs font-bold leading-none whitespace-nowrap">Crossed $250,000 ARR</span>
                        
                      </div>
                    </div>
                  </div>
                </div>

                {/* X-axis timeline */}
                <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-between items-center text-xs text-gray-600">
                  <span>Sep 2024</span>
                  <span>Oct 2024</span>
                  <span>Nov 2024</span>
                  <span>Dec 2024</span>
                  <span>Jan 2025</span>
                  <span>Feb 2025</span>
                  <span>Mar 2025</span>
                  <span>Apr 2025</span>
                  <span>May 2025</span>
                  <span>Jun 2025</span>
                  <span>Jul 2025</span>
                  <span>Aug 2025</span>
                  <span>Sep 2025</span>
                  <span>Oct 2025</span>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
              <button 
                onClick={() => {
                  document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-black font-bold py-4 px-12 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 hover:opacity-90" style={{ backgroundColor: '#ffc300' }}
              >
                LEARN MY EXACT STRATEGIES
              </button>
              <p className="text-gray-400 text-sm mt-4">
                Get the step-by-step blueprint that created this growth
              </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
  );
};

export default Growth4Landing; 
