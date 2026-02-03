import React from 'react';
import { Button } from './Button';
import { Sparkles } from 'lucide-react';

export const WorkshopDiveSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center">

            {/* 1. Top Text Block */}
            <div className="max-w-3xl w-full mx-auto space-y-6 mb-12 font-poppins text-lg md:text-xl text-black leading-relaxed">
                <p>This isn't hard.</p>
                <p>This isn't time consuming.</p>
                <p>This isn't expensive.</p>

                <p className="font-bold pt-4">But it is:</p>

                <div className="space-y-4 pl-2">
                    <div className="flex items-center gap-3">
                        <Sparkles className="text-[#ff4d4d] w-5 h-5 fill-[#ff4d4d]" />
                        <span className="font-bold">Intentional</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Sparkles className="text-[#ff4d4d] w-5 h-5 fill-[#ff4d4d]" />
                        <span className="font-bold">Strategic</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Sparkles className="text-[#ff4d4d] w-5 h-5 fill-[#ff4d4d]" />
                        <span className="font-bold">Emotional</span>
                    </div>
                </div>

                <p className="pt-8">
                    The world doesn't need more basic, boring, and generic.
                </p>
                <p>
                    It needs brands that shape culture, spark conversations, and drive obsession.
                </p>
                <p>
                    My intuitive, yet strategic approach to brand building will have people sending you messages like:
                </p>
            </div>

            {/* 2. Chat Bubble Visual */}
            <div className="w-full max-w-lg mx-auto mb-16 flex justify-center">
                <div className="bg-[#f2f4f6] p-8 md:p-10 rounded-[2rem] rounded-tl-none shadow-sm text-center">
                    <p className="font-poppins text-xl md:text-2xl font-medium leading-snug text-black mb-2">
                        SHUT. THE. FRONT.<br />DOOR. 🙀🙀🙀🙀🙀
                    </p>
                    <p className="text-xl md:text-2xl">
                        🙀🙀🙀🔥🔥🔥🔥🔥🔥🔥🔥
                    </p>
                </div>
            </div>

            {/* 3. Dive Into List */}
            <div className="max-w-3xl w-full mx-auto mb-16">
                <p className="font-poppins text-lg md:text-xl text-black mb-8">
                    The <span className="italic">$10k</span> Launch Lab will dive into:
                </p>
                <ul className="space-y-4 font-poppins text-base md:text-lg text-black list-disc pl-6 marker:text-black">
                    <li>the anatomy of brand obsession</li>
                    <li>why some brands stand out, while others fall flat</li>
                    <li>the connection between your brand and making sales</li>
                    <li>what to focus on in today's attention economy</li>
                    <li>how to craft polarizing hooks, and nail your messaging</li>
                    <li>and why even in branding, we "eat with our eyes first"</li>
                </ul>
            </div>

            {/* 4. CTA */}
            <div className="w-full flex justify-center pb-8">
                <Button className="mx-auto px-10 py-5 bg-brand-neon hover:bg-[#e6e200] border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">I'm ready to stand out!</span>
                        <span className="text-xs font-medium normal-case">$597 - The <span className="italic">$10k</span> Launch Lab</span>
                    </div>
                </Button>
            </div>

        </section>
    );
};
