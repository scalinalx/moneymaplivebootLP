import React from 'react';

export const LynsaySpotlight: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#E0F7FA]">
            <div className="max-w-[1200px] w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

                {/* Left Content: Headline & CTA */}
                <div className="flex-1 text-center md:text-left order-2 md:order-1">
                    <h2 className="font-lora text-3xl md:text-4xl lg:text-[42px] text-[#333333] leading-tight mb-8">
                        My student David followed this framework and <span className="font-bold text-[rgb(56,170,185)] border-b-4 border-[rgb(56,170,185)]/30">made $7,486 in just one week!</span>
                    </h2>
                    <button
                        onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-2xl py-4 px-8 md:px-10 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide"
                    >
                        ACTIVATE THE 10K LAB FRAMEWORK
                    </button>
                </div>

                {/* Right Content: Social Proof Card */}
                <div className="flex-1 w-full max-w-[600px] order-1 md:order-2">
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
                        {/* Social Header */}
                        <div className="p-6 pb-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center font-bold text-blue-600">
                                    D
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold font-lato text-gray-900 text-lg">David K.</h4>
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200 flex items-center gap-1 font-bold">
                                            Top contributor
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-lato">1 day ago • 🌍</p>
                                </div>
                                <div className="text-gray-400 font-bold text-xl pb-4">...</div>
                            </div>

                            <h5 className="font-bold text-lg mb-2 text-gray-900 font-lato">My mind is truly blown!</h5>
                            <p className="font-lato text-gray-800 text-[15px] leading-relaxed mb-6">
                                I made $7,486 this week with a tiny list of only 489 subscribers. I didn't have to spend a dime on ads or change my offer. <br /><br />
                                The difference was entirely the positioning and the launch sequence. Thanks so much <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Ana Calin</span> for the framework!
                            </p>
                        </div>

                        {/* Table Mockup */}
                        <div className="bg-gray-50 border-t border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[400px]">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-[10px] text-gray-400 font-bold uppercase tracking-wider bg-gray-50">
                                            <th className="p-3 pl-6 font-medium"># Items</th>
                                            <th className="p-3 font-medium">Total</th>
                                            <th className="p-3 font-medium">Coupon</th>
                                            <th className="p-3 font-medium">Payment Method</th>
                                            <th className="p-3 pr-6 text-right font-medium">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs text-gray-600 font-lato">
                                        {[
                                            { total: '$497.00', method: 'Stripe' },
                                            { total: '$995.00', method: 'Stripe' },
                                            { total: '$297.00', method: 'PayPal' },
                                            { total: '$497.00', method: 'Stripe' },
                                        ].map((row, i) => (
                                            <tr key={i} className="border-b border-gray-100 bg-white">
                                                <td className="p-3 pl-6 text-gray-400 italic">1 Item</td>
                                                <td className="p-3 font-bold text-gray-800 text-sm">{row.total}</td>
                                                <td className="p-3 text-gray-500">FAST10</td>
                                                <td className="p-3 text-gray-500">{row.method}</td>
                                                <td className="p-3 pr-6 text-right text-green-600 font-bold bg-green-50/50">Sale</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
