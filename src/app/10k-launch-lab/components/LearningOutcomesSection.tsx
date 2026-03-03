import React from 'react';
import { Button } from './Button';
import { FileText, Video, Users, MessageCircle } from 'lucide-react';

export const LearningOutcomesSection: React.FC = () => {
    const scrollToCheckout = () => {
        const element = document.getElementById('checkout');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center border-t border-gray-100">

            {/* Bundle Mockup Visual */}
            <div className="w-full max-w-5xl mx-auto mb-20 relative flex items-center justify-center px-4">
                <img
                    src="/imgs/10k-launch-lab/d5.webp"
                    alt="10k Launch Lab Program Breakdown"
                    className="w-full h-auto rounded-3xl shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
                    onClick={scrollToCheckout}
                />
            </div>

            {/* Features Grid */}
            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 px-2">

                {/* 1. Templates */}
                <div className="bg-gray-50 border border-gray-100 p-8 rounded-lg shadow-sm hover:shadow-2xl transition-shadow">
                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                        <FileText className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="font-display font-black text-2xl uppercase mb-4">📝 Fill-in-the-Blank Templates</h3>
                    <p className="font-poppins text-gray-600 mb-4">You're never starting from a blank page. Every asset is templated:</p>
                    <ul className="space-y-2 font-poppins text-sm md:text-base text-black">
                        <li>✅ 3 x Sales Page Template</li>
                        <li>✅ Sales-Email Launch Sequence</li>
                        <li>✅ Pricing Calculator</li>
                        <li>✅ Launch Timeline</li>
                        <li>✅ FAQ Section</li>
                        <li>✅ Guarantee Builder</li>
                        <li>✅ Objection Response Scripts</li>
                    </ul>
                    <p className="font-bold mt-4 italic">Just fill in the blanks. No copywriting required.</p>
                </div>

                {/* 2. Walkthroughs */}
                <div className="bg-gray-50 border border-gray-100 p-8 rounded-lg shadow-sm hover:shadow-2xl transition-shadow">
                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                        <Video className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="font-display font-black text-2xl uppercase mb-4">🎥 50+ Walkthrough Videos</h3>
                    <p className="font-poppins text-gray-600 mb-4">Every technical step has a screen-recording video.</p>
                    <p className="font-bold mb-2">No more:</p>
                    <ul className="space-y-2 font-poppins text-sm md:text-base text-gray-500 mb-4 pl-4 list-disc">
                        <li>Googling "how to set up Stripe"</li>
                        <li>Watching 12 conflicting YouTube tutorials</li>
                        <li>Getting stuck and giving up</li>
                    </ul>
                    <p className="font-bold">Instead: "Click here. Paste this. Hit this button. You're done."</p>
                </div>

                {/* 3. Live Calls */}
                <div className="bg-gray-50 border border-gray-100 p-8 rounded-lg shadow-sm hover:shadow-2xl transition-shadow">
                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                        <Users className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="font-display font-black text-2xl uppercase mb-4">📞 4 Live Weekly Calls</h3>
                    <p className="font-poppins text-gray-600 mb-4 font-bold">Mondays, 12 PM EST, 60 min each.</p>
                    <ul className="space-y-2 font-poppins text-sm md:text-base text-black mb-4">
                        <li>• I review 3-5 people's work LIVE</li>
                        <li>• Everyone learns from each other's mistakes</li>
                        <li>• Real-time troubleshooting</li>
                        <li>• Q&A for your specific situation</li>
                    </ul>
                    <p className="text-sm italic text-gray-500">Can't attend live? Recording in your inbox within 2 hours.</p>
                </div>

                {/* 4. Community */}
                <div className="bg-gray-50 border border-gray-100 p-8 rounded-lg shadow-sm hover:shadow-2xl transition-shadow">
                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                        <MessageCircle className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="font-display font-black text-2xl uppercase mb-4">💬 Teachable Community</h3>
                    <p className="font-poppins text-gray-600 mb-4 font-bold">24-Hour Support. You're not doing this alone.</p>
                    <ul className="space-y-2 font-poppins text-sm md:text-base text-black mb-4">
                        <li>• Post daily progress</li>
                        <li>• Ask questions (answered within 24 hours)</li>
                        <li>• Get feedback on your work</li>
                        <li>• Celebrate wins together</li>
                    </ul>
                    <p className="font-bold mt-4">It's like having a team... without hiring a team.</p>
                </div>

            </div>

            {/* CTA Button */}
            <div className="w-full flex justify-center pb-8">
                <Button
                    onClick={scrollToCheckout}
                    className="mx-auto px-10 py-3.5 bg-[#d81159] hover:bg-[#b30e4a] text-white border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">OK, ANA, LET’S POSITION MY OFFER RIGHT</span>
                    </div>
                </Button>
            </div>

        </section>
    );
};
