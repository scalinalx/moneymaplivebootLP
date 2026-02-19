import React from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Hero } from './components/Hero';
import { UrgencyBadge } from './components/UrgencyBadge';
import { SocialProofSection } from './components/SocialProofSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { MagnetismSection } from './components/MagnetismSection';
import { NotDoingSection } from './components/NotDoingSection';
import { LearningOutcomesSection } from './components/LearningOutcomesSection';
import { DeepDiveSection } from './components/DeepDiveSection';
import { WorkshopDiveSection } from './components/WorkshopDiveSection';
import { IncludedSection } from './components/IncludedSection';
import { ReactionSection } from './components/ReactionSection';
import { BioSection } from './components/BioSection';
import { DontTakeOurWordSection } from './components/DontTakeOurWordSection';
import { WinsSection } from './components/WinsSection';
import { LaunchLabWaitlistForm } from './components/LaunchLabWaitlistForm';
import { Footer } from './components/Footer';
import { PurchaseNotification } from './components/PurchaseNotification';

const App: React.FC = () => {
    return (
        <main className="min-h-screen w-full bg-white text-black overflow-x-hidden selection:bg-brand-neon selection:text-black">
            <AnnouncementBar />
            {/* Spacer to prevent fixed bar from covering hero on load */}
            <div className="h-[46px] md:h-[60px]"></div>
            <Hero />
            <UrgencyBadge />
            {/* <SocialProofSection /> */}
            <ProblemSolutionSection />
            <MagnetismSection />
            <NotDoingSection />
            <IncludedSection />
            <ReactionSection />
            <LearningOutcomesSection />
            <WorkshopDiveSection />
            <BioSection />
            <DontTakeOurWordSection />
            <DeepDiveSection />
            <WinsSection />
            <section className="py-20 bg-gray-50 flex justify-center px-6">
                <LaunchLabWaitlistForm />
            </section>
            <Footer />
            <PurchaseNotification />
        </main>
    );
};

export default App;
