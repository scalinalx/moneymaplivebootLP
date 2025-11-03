import React from 'react';

const WhoThisIsForSection = () => {
  const targetAudiences = [
    {
      title: "Newsletter Creators",
      description: "Looking to turn their growing audience into sustainable monthly revenue"
    },
    {
      title: "Content Creators",
      description: "Ready to monetize their expertise through newsletter-based income streams"
    },
    {
      title: "Entrepreneurs",
      description: "Wanting to build authority and generate leads through valuable newsletter content"
    },
    {
      title: "Course Creators",
      description: "Seeking to amplify their reach and create consistent revenue between launches"
    },
    {
      title: "Coaches and Consultants",
      description: "Aiming to attract premium clients without endless cold outreach and pitching"
    },
    {
      title: "Anyone who understands the value in building an audience of the right people",
      description: "Ready to transform subscribers into loyal customers and consistent revenue"
    }
  ];

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-lg opacity-30" style={{ backgroundColor: '#ffc300' }}></div>
              <span className="relative text-black text-sm font-semibold px-6 py-2 rounded-full border" style={{ backgroundColor: '#ffc300', borderColor: '#ffc300' }}>
                Transform your newsletter
              </span>
            </div>
          </div>
          
          <h2 className="text-white text-5xl font-bold leading-tight">
            Who this is for
          </h2>
        </div>

        {/* Target Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {targetAudiences.map((audience, index) => (
            <div 
              key={index}
              className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-2xl hover:border-white/40 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <div className="text-center space-y-4">
                {/* Title */}
                <h3 className="text-white text-xl font-bold leading-tight">
                  {audience.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 text-base leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg blur-lg opacity-40" style={{ boxShadow: '0 0 30px #ffc300' }}></div>
            
            {/* Button */}
            <button 
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative text-black font-bold py-4 px-12 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 hover:opacity-90" style={{ backgroundColor: '#ffc300' }}
            >
              GET INSTANT ACCESS TODAY
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            Join 300+ newsletter creators already building sustainable revenue streams
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoThisIsForSection; 
