import React from 'react';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Heart, MessageSquare } from 'lucide-react';

export const WinsSection: React.FC = () => {
    return (
        <section className="w-full bg-gray-50 py-20 px-4 md:px-8 border-t border-gray-200">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="font-poppins font-bold text-3xl md:text-4xl text-black uppercase mb-4">Client Wins</h2>
                <p className="text-gray-600">See what happens when you do things differently.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Card 1: Purple Background */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="p-3 flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Jen" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm text-black">Jen Wah</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">June 7 at 2:39 PM · <span className="opacity-60">👥</span></p>
                        </div>
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="bg-[#bd00ff] aspect-square flex items-center justify-center p-6 text-center">
                        <p className="font-bold text-white text-2xl md:text-3xl">
                            Sold my first $10K program!
                            <br />
                            <span className="underline decoration-2">#wins</span>
                        </p>
                    </div>
                    <div className="p-3 border-t border-gray-100">
                        <div className="flex justify-between text-gray-500 text-xs mb-3">
                            <div className="flex items-center gap-1">
                                <div className="flex -space-x-1">
                                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white"><Heart className="w-2 h-2 text-white fill-white" /></div>
                                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white"><ThumbsUp className="w-2 h-2 text-white fill-white" /></div>
                                </div>
                                <span>You, Rene-Team Ana and 20 others</span>
                            </div>
                            <span>13 Comments</span>
                        </div>
                        <div className="flex pt-2 border-t border-gray-100">
                            <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-1 rounded">
                                <ThumbsUp className="w-4 h-4" /> <span className="text-sm font-medium">Like</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-1 rounded">
                                <MessageSquare className="w-4 h-4" /> <span className="text-sm font-medium">Comment</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 2: Text Update */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="p-3 flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1554721299-e466cb950005?auto=format&fit=crop&w=100&q=80" alt="Emma" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm text-black">Emma Hague</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">Yesterday at 9:18 AM · <span className="opacity-60">👥</span></p>
                        </div>
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="px-4 py-2 text-black text-sm md:text-base space-y-3 flex-1">
                        <p>UPDATE: 3 calls booked now.🤩</p>
                        <p><span className="text-blue-600">#win</span> Just closed my first $10,000 PIF client and another sales call booked for tomorrow.x</p>
                        <p>Woot woot!!😍😍🎉🎉</p>
                    </div>
                    <div className="p-3 border-t border-gray-100 mt-4">
                        <div className="flex justify-between text-gray-500 text-xs mb-3">
                            <div className="flex items-center gap-1">
                                <div className="flex -space-x-1">
                                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white"><Heart className="w-2 h-2 text-white fill-white" /></div>
                                    <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center border border-white"><span className="text-[8px]">😮</span></div>
                                </div>
                                <span>You, Jannie Almond, Rene-Team Ana and 27 others</span>
                            </div>
                            <span>43 Comments</span>
                        </div>
                        <div className="flex pt-2 border-t border-gray-100">
                            <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-1 rounded">
                                <span className="text-lg">😮</span> <span className="text-sm font-medium text-yellow-600">Wow</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-1 rounded">
                                <MessageSquare className="w-4 h-4" /> <span className="text-sm font-medium">Comment</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-1 rounded">
                                <Share2 className="w-4 h-4" /> <span className="text-sm font-medium">Send</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 3: Group Post */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="p-3 flex gap-3 items-start">
                        <div className="w-10 h-10 rounded-lg bg-blue-500 overflow-hidden flex-shrink-0 relative">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=100&q=80" alt="Group" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border border-white overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=50&q=80" alt="Sonia" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-black truncate">The $10k Launch Lab | VIP Lounge with Ana...</p>
                            <p className="text-xs text-gray-500">Sonia Coccimiglio · Aug 4 · <span className="opacity-60">👥</span></p>
                        </div>
                        <MoreHorizontal className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                    <div className="px-4 py-2 text-black text-sm md:text-base space-y-3 flex-1">
                        <p>
                            SOOOO... big big news today and celebrating my third client close at $15,200 🙏🏻 <span className="bg-pink-100 px-0.5">I am almost at $20k since starting this program in July and applying myself to focusing on getting clients</span> versus all the other stuff. Thank you everyone for inspiring me every single day when I check this group. All of your input, questions and replies are not overlooked. I am so happy to be part of this group and continue this journey as an entrepreneur alongside all of you. ❤️❤️❤️
                        </p>
                    </div>
                    <div className="p-3 border-t border-gray-100 mt-4">
                        <div className="flex justify-between text-gray-500 text-xs mb-3">
                            <div className="flex items-center gap-1">
                                <div className="flex -space-x-1">
                                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white"><Heart className="w-2 h-2 text-white fill-white" /></div>
                                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white"><ThumbsUp className="w-2 h-2 text-white fill-white" /></div>
                                </div>
                                <span>John Girone and 67 others</span>
                            </div>
                        </div>
                        <div className="flex pt-2 border-t border-gray-100">
                            <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-1 rounded">
                                <ThumbsUp className="w-4 h-4" /> <span className="text-sm font-medium">Like</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-1 rounded">
                                <MessageSquare className="w-4 h-4" /> <span className="text-sm font-medium">Comment</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
