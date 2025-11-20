'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';

const JoinVSLPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="group relative w-full aspect-[9/16] min-h-[360px] cursor-pointer overflow-hidden border border-brand-800 bg-brand-900 shadow-2xl transition-colors duration-500 hover:border-brand-lime"
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {!isPlaying ? (
        <>
          <div className="absolute inset-0 bg-[url('/podcast1.png')] bg-cover bg-center opacity-70 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-brand-950/25 to-transparent" />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end p-6 text-center pb-10">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-brand-lime blur-xl opacity-20" />
              <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-lime transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-8 w-8 text-brand-950" />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-display font-bold uppercase tracking-wider text-white">
              Watch The Trailer
            </h3>
            <p className="font-mono text-xs text-brand-grey">ANA CALIN • 03:42</p>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-black">
          <p className="font-mono text-brand-grey animate-pulse">
            LOADING VIDEO STREAM...
          </p>
        </div>
      )}
    </div>
  );
};

export default JoinVSLPlayer;
