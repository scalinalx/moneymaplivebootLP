import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-12 px-6 border-t-8 border-brand-neon">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="font-poppins font-bold text-xl uppercase tracking-widest mb-2">How We Grow</h3>
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
                </div>

                <div className="flex gap-6 text-sm font-medium text-gray-300">
                    <a href="#" className="hover:text-brand-neon transition-colors">Terms</a>
                    <a href="#" className="hover:text-brand-neon transition-colors">Privacy</a>
                    <a href="#" className="hover:text-brand-neon transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
};
