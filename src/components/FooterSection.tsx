import React from 'react';
import { Mail, Shield, Users, Award, ExternalLink } from 'lucide-react';

const FooterSection = () => {
  return (
    <div className="relative">
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">NM</span>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Newsletter</div>
                  <div className="text-yellow-400 font-bold text-lg">Money Map</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                The proven system that helps newsletter creators build $120K+/year businesses. Join 300+ successful students who've transformed their newsletters into revenue machines.
              </p>
              
              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-xs">SSL Secured & Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-xs">300+ Success Stories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-xs">12 Substack Bestsellers</span>
                </div>
              </div>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                    Getting Started Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                    Community Access
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                    Anti-Spam Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* CTA Column */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Ready to Start?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Join 300+ newsletter creators who've built profitable businesses with our proven system.
              </p>
              <button 
                onClick={() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl shadow-lg mb-4"
              >
                <Mail className="w-4 h-4" />
                GET INSTANT ACCESS
              </button>
              
              <div className="text-center">
                <span className="text-gray-400 text-xs">⭐ 93% Success Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 Newsletter Money Map. All rights reserved. Results may vary.
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-gray-400 text-xs">
                  💰 <span className="text-green-400 font-medium">$500K+</span> Generated by Students
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">POWERED BY</span>
                  <a 
                    href="https://substack.com/@howwegrowtoday" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 text-xs font-semibold flex items-center gap-1"
                  >
                    How We Grow
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Trust Bar */}
        <div className="bg-black/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-xs">Secure SSL Encryption</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-xs">Trusted by 300+ Newsletter Creators</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-xs">Proven by 12 Substack Bestsellers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection; 
