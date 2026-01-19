import React from 'react';
import Image from 'next/image';

const ResultsGallery = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl font-bold mb-2">Real Results from Our Students</h2>
        <p className="text-gray-400">See the actual growth and revenue numbers from our community</p>
      </div>
      <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
              alt="Growth Chart"
              className="rounded-lg object-cover w-full h-full"
              width={320}
              height={180}
            />
          </div>
          <h3 className="text-white font-semibold mb-2">Tech Weekly Insights</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Subscriber Growth</span>
              <span className="text-green-400">+9,755</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time Period</span>
              <span className="text-white">3 months</span>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <Image
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
              alt="Revenue Chart"
              className="rounded-lg object-cover w-full h-full"
              width={320}
              height={180}
            />
          </div>
          <h3 className="text-white font-semibold mb-2">Alpha Driven Portfolio</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Monthly Revenue</span>
              <span className="text-green-400">$2,500+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time Period</span>
              <span className="text-white">7 weeks</span>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <Image
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
              alt="Creator Economy Desk"
              className="rounded-lg object-cover w-full h-full"
              width={320}
              height={180}
            />
          </div>
          <h3 className="text-white font-semibold mb-2">Creator Economy Weekly</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Open Rate</span>
              <span className="text-green-400">68%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time Period</span>
              <span className="text-white">2 months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsGallery; 