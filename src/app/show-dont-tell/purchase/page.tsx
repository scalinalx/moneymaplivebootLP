import { Metadata } from 'next';
import PurchaseApp from '@/components/show-dont-tell/PurchaseApp';

export const metadata: Metadata = {
    title: 'Purchase Access | Show Don\'t Tell',
    description: 'Purchase credits for the Show Don\'t Tell Thumbnail Generator.',
};

export default function PurchasePage() {
    return <PurchaseApp />;
}
