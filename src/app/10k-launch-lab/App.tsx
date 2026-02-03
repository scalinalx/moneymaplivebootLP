import React from 'react';
import { Hero } from './components/Hero';
import { SocialProofSection } from './components/SocialProofSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { MagnetismSection } from './components/MagnetismSection';
import { NotDoingSection } from './components/NotDoingSection';
import { LearningOutcomesSection } from './components/LearningOutcomesSection';
import { DeepDiveSection } from './components/DeepDiveSection';
import { WorkshopDiveSection } from './components/WorkshopDiveSection';
import { IncludedSection } from './components/IncludedSection';
import { BioSection } from './components/BioSection';
import { DontTakeOurWordSection } from './components/DontTakeOurWordSection';
import { WinsSection } from './components/WinsSection';
import { Footer } from './components/Footer';

const App: React.FC = () => {
    return (
        <main className="min-h-screen w-full bg-white text-black overflow-x-hidden selection:bg-brand-neon selection:text-black">
            <Hero />
            <SocialProofSection />
            <ProblemSolutionSection />
            <MagnetismSection />
            <NotDoingSection />
            <LearningOutcomesSection />
            <DeepDiveSection />
            <WorkshopDiveSection />
            <IncludedSection />
            <BioSection />
            <DontTakeOurWordSection />
            <WinsSection />
            <Footer />
        </main>
    );
};

export default App;
