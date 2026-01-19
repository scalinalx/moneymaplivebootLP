import React from 'react';
import TESTIMONIALS_DATA from '@/data/testimonials.json';

export default function InlineHeroTestimonials() {
    const testimonials = TESTIMONIALS_DATA.slice(15, 18);

    return (
        <section className="py-4 bg-transparent sm:py-6 lg:py-8">
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
                <div className="mx-auto w-[95vw] px-0">
                    <div className="flex flex-col items-center">
                        <div className="relative mt-3 md:mt-6 md:order-2">
                            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6 -z-10 pointer-events-none">
                                <div className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter" style={{ background: 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)' }}></div>
                            </div>

                            <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10 w-full mx-auto">
                                {testimonials.map((t, i) => (
                                    <div key={i} className="flex flex-col overflow-hidden shadow-xl">
                                        <div className="flex flex-col justify-between flex-1 p-6 bg-white rounded-lg w-[90%] mx-auto lg:py-8 lg:px-7">
                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, starI) => (
                                                        <svg key={starI} className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>

                                                <blockquote className="flex-1 mt-8">
                                                    <p className="text-lg leading-relaxed text-gray-900 font-pj">“{t.Text}”</p>
                                                </blockquote>
                                            </div>

                                            <div className="flex items-center mt-8">
                                                {t.AvatarURL ? (
                                                    <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src={t.AvatarURL} alt={t.Name} />
                                                ) : (
                                                    <div className="w-11 h-11 rounded-full bg-brand-lime flex items-center justify-center text-brand-950 font-bold text-sm">
                                                        {t.Name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                    </div>
                                                )}
                                                <div className="ml-4 text-left">
                                                    <p className="text-base font-bold text-gray-900 font-pj">{t.Name}</p>
                                                    <p className="mt-0.5 text-sm font-pj text-gray-600">{t.additionalinfo.split(';')[0]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
