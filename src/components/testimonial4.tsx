import React, { useState, useRef } from 'react';

const Testimonial4 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Testimonial videos data with real video files (only 4 testimonials)
  const testimonials = [
    {
      id: 1,
      name: "Sarah",
      title: "Newsletter Creator",
      subscribers: "12K subscribers",
      revenue: "$3.2K/month",
      videoUrl: "/videos/clip1.mp4"
    },
    {
      id: 2,
      name: "Joanne",
      title: "Content Creator",
      subscribers: "8.5K subscribers",
      revenue: "$2.1K/month",
      videoUrl: "/videos/clip2.mp4"
    },
    {
      id: 3,
      name: "Emily",
      title: "Newsletter Creator",
      subscribers: "15K subscribers",
      revenue: "$4.8K/month",
      videoUrl: "/videos/clip3.mp4"
    },
    {
      id: 4,
      name: "Cindy",
      title: "Course Creator",
      subscribers: "22K subscribers",
      revenue: "$6.5K/month",
      videoUrl: "/videos/clip4.mp4"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
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
            Just take a look at what our <span className="text-yellow-400">300+</span> members are saying.
          </h2>
        </div>

        {/* Video Gallery */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Video Container */}
          <div className="relative bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-2xl mb-8">
            <div className="aspect-video rounded-xl overflow-hidden relative bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Video with Play Button Overlay */}
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  src={testimonials[currentSlide].videoUrl}
                  className="w-full h-full object-cover rounded-xl"
                  width={400}
                  height={300}
                  muted
                  playsInline
                  controls={isPlaying}
                  onPause={handlePause}
                  onEnded={handlePause}
                  preload="metadata"
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer" onClick={handlePlay}>
                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors duration-200 group">
                      <svg className="w-8 h-8 text-black ml-1 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
                {/* Creator Info Overlay - only show when not playing */}
                {!isPlaying && (
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
                )}
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
          <div className="mt-8 grid grid-cols-4 gap-4">
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
                <video
                  src={testimonial.videoUrl}
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                  muted
                  playsInline
                  controls={false}
                  preload="metadata"
                  style={{ pointerEvents: 'none' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/25">
          <div className="text-4xl font-bold text-yellow-400 mb-2">300+</div>
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
            The exact system 300+ creators used to build 6-figure newsletter businesses
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial4; 
