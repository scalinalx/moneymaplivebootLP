import React from 'react';

const Testimonials2 = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl font-bold mb-2">What Our Community Says</h2>
        <p className="text-gray-400">Join hundreds of successful newsletter creators</p>
      </div>
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Emma Wilson"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-white font-semibold">Emma Wilson</h3>
              <p className="text-gray-400 text-sm">Tech Trends Weekly</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "I was skeptical at first, but this program completely changed my perspective. The step-by-step guidance and community support helped me launch my newsletter and start making money within weeks."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="David Chen"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-white font-semibold">David Chen</h3>
              <p className="text-gray-400 text-sm">Startup Insights</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "The templates and strategies provided in this program are worth their weight in gold. I've been able to scale my newsletter to 10,000 subscribers and generate consistent revenue."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <br/>
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Emma Wilson"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-white font-semibold">Emma Wilson</h3>
              <p className="text-gray-400 text-sm">Tech Trends Weekly</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "I was skeptical at first, but this program completely changed my perspective. The step-by-step guidance and community support helped me launch my newsletter and start making money within weeks."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="David Chen"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-white font-semibold">David Chen</h3>
              <p className="text-gray-400 text-sm">Startup Insights</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "The templates and strategies provided in this program are worth their weight in gold. I've been able to scale my newsletter to 10,000 subscribers and generate consistent revenue."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <br/>
      </div>
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Emma Wilson"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-white font-semibold">Emma Wilson</h3>
              <p className="text-gray-400 text-sm">Tech Trends Weekly</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "I was skeptical at first, but this program completely changed my perspective. The step-by-step guidance and community support helped me launch my newsletter and start making money within weeks."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="David Chen"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-white font-semibold">David Chen</h3>
              <p className="text-gray-400 text-sm">Startup Insights</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "The templates and strategies provided in this program are worth their weight in gold. I've been able to scale my newsletter to 10,000 subscribers and generate consistent revenue."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials2; 