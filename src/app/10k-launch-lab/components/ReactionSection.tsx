import React from 'react';

export const ReactionSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-12 px-4 md:px-8 flex justify-center">
            <div className="w-full max-w-lg mx-auto transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-[#f2f4f6] p-8 md:p-10 rounded-[2rem] rounded-tr-none shadow-hard text-center border-2 border-black">
                    <p className="font-poppins text-xl md:text-3xl font-bold leading-snug text-black mb-2 uppercase">
                        SHUT. THE. FRONT.<br />DOOR. 🙀🙀🙀🙀
                    </p>
                    <p className="text-2xl md:text-3xl">
                        🔥🔥🔥🔥🔥🔥🔥🔥
                    </p>
                </div>
            </div>
        </section>
    );
};
