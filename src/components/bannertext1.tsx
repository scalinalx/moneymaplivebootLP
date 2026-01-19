import React from 'react';

const NewsletterMonetizationCopy = () => {
  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-lg opacity-30" style={{ backgroundColor: '#ffc300' }}></div>
              <span className="relative text-black text-sm font-semibold px-6 py-2 rounded-full border" style={{ backgroundColor: '#ffc300', borderColor: '#ffc300' }}>
                The truth about newsletter monetization
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-8 leading-tight">
            There&apos;s no reason why you should be <span className="text-yellow-400">struggling to monetize</span> your newsletter
          </h1>

          {/* Subheadline */}
          <h2 className="text-gray-300 text-2xl md:text-3xl mb-12 leading-relaxed font-medium">
            So what should you be doing to turn your newsletter into a revenue machine?
          </h2>

          {/* Content Card */}
          <div className="relative mb-12">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl blur-md opacity-20" style={{ boxShadow: '0 0 40px #ffc300' }}></div>

            {/* Main content card */}
            <div className="relative bg-black/20 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/25 shadow-2xl">
              <div className="space-y-8">
                <p className="text-white text-xl md:text-2xl leading-relaxed font-medium">
                  The new way of newsletter monetization is simple:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
                  <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <span className="text-yellow-400 text-2xl font-bold">1</span>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">Create Valuable Content</h3>
                    <p className="text-gray-400 text-sm">Content that actually helps your readers achieve their goals</p>
                  </div>

                  <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <span className="text-yellow-400 text-2xl font-bold">2</span>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">Build Genuine Relationships</h3>
                    <p className="text-gray-400 text-sm">Real connections with your readers, not just email addresses</p>
                  </div>

                  <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <span className="text-yellow-400 text-2xl font-bold">3</span>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">Launch Irresistible Offer(s)</h3>
                    <p className="text-gray-400 text-sm">Products and services your audience can&apos;t wait to buy</p>
                  </div>

                  <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <span className="text-yellow-400 text-2xl font-bold">4</span>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">Multiple Income Streams</h3>
                    <p className="text-gray-400 text-sm">Revenue sources that don&apos;t depend on massive audiences</p>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-xl border border-yellow-400/20">
                  <p className="text-gray-300 text-lg leading-relaxed italic mb-4">
                    &ldquo;Simple enough, but not easy to master.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="text-center">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
              That&apos;s where the <span style={{ color: '#ffc300' }}>Newsletter Money Map</span> comes in
            </h2>

            <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              The complete system that shows you exactly how to implement these strategies, step by step.
            </p>

            <button
              onClick={() => {
                document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-black font-bold py-4 px-12 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 hover:opacity-90" style={{ backgroundColor: '#ffc300' }}
            >
              I'M READY TO SCALE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterMonetizationCopy; 