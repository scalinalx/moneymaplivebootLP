'use client';

import { OfferGeniusPasswordGate } from '@/components/offer-genius/OfferGeniusPasswordGate';
import OfferGeniusApp from '@/components/offer-genius/OfferGeniusApp';

export default function AnaOfferGeniusPage() {
    const handleReset = () => {
        sessionStorage.removeItem('offer_genius_auth');
        window.location.reload();
    };

    return (
        <OfferGeniusPasswordGate>
            <OfferGeniusApp onReset={handleReset} />
        </OfferGeniusPasswordGate>
    );
}
