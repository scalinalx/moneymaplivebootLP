import React, { useState } from 'react';

const Testimonial4 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock testimonial videos data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Newsletter Creator",
      subscribers: "12K subscribers",
      revenue: "$3.2K/month",
      videoUrl: "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Video+1",
      thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face&auto=format&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Content Creator",
      subscribers: "8.5K subscribers",
      revenue: "$2.1K/month",
      videoUrl: "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Video+2",
      thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face&auto=format&q=80"
    },
    {
      id: 3,
      name: "Emily Davis",
      title: "Newsletter Creator",
      subscribers: "15K subscribers",
      revenue: "$4.8K/month",
      videoUrl: "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Video+3",
      thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face&auto=format&q=80"
    },
    {
      id: 4,
      name: "David Rodriguez",
      title: "Course Creator",
      subscribers: "22K subscribers",
      revenue: "$6.5K/month",
      videoUrl: "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Video+4",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face&auto=format&q=80"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Newsletter Creator",
      subscribers: "9.8K subscribers",
      revenue: "$2.7K/month",
      videoUrl: "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Video+5",
      thumbnail: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=300&fit=crop&crop=face&auto=format&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-lg opacity-30" style={{ backgroundColor: '#ffc300' }}></div>
              <span className="relative text-black text-base font-semibold px-6 py-2 rounded-full border" style={{ backgroundColor: '#ffc300', borderColor: '#ffc300' }}>
                Even More Success Stories
              </span>
            </div>
          </div>
          
          <h2 className="text-white text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Just take a look at what our <span className="text-yellow-400">250+</span> members are saying.
          </h2>
        </div>

        {/* Video Gallery */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Video Container */}
          <div className="relative bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-2xl mb-8">
            <div className="aspect-video rounded-xl overflow-hidden relative bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Video Thumbnail with Play Button */}
              <div className="relative w-full h-full">
                <img 
                  src={testimonials[currentSlide].thumbnail}
                  alt={testimonials[currentSlide].name}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-300 transition-colors duration-200 group">
                    <svg className="w-8 h-8 text-black ml-1 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Creator Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">{testimonials[currentSlide].name}</h3>
                    <p className="text-gray-300 text-sm mb-2">{testimonials[currentSlide].title}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-yellow-400">{testimonials[currentSlide].subscribers}</span>
                      <span className="text-green-400">{testimonials[currentSlide].revenue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Preview Row */}
          <div className="mt-8 grid grid-cols-5 gap-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToSlide(index)}
                className={`aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentSlide 
                    ? 'border-yellow-400 scale-105' 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <img 
                  src={testimonial.thumbnail}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/25">
            <div className="text-4xl font-bold text-yellow-400 mb-2">250+</div>
            <div className="text-gray-300">Active Members</div>
          </div>
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/25">
            <div className="text-4xl font-bold text-yellow-400 mb-2">$500k+</div>
            <div className="text-gray-300">Revenue Generated</div>
          </div>
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/25">
            <div className="text-4xl font-bold text-yellow-400 mb-2">93%</div>
            <div className="text-gray-300">Success Rate</div>
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
            JOIN THESE SUCCESS STORIES
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Start building your newsletter revenue machine today
          </p>
        </div>

        {/* Revenue Hero Section */}
        <div className="mt-8 text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            Turn Your Newsletter Into a <span className="text-yellow-400">$120K+/Year</span> Revenue Machine
          </h1>
          
          {/* Subheadline */}
          <p className="text-gray-300 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
            The exact system 250+ creators used to build 6-figure newsletter businesses
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial4; 