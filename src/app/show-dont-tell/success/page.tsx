import { Metadata } from 'next';
import SuccessApp from '@/components/show-dont-tell/SuccessApp';

export const metadata: Metadata = {
    title: 'Payment Successful | Show Don\'t Tell',
    description: 'Your payment was successful.',
};

export default function SuccessPage() {
    return <SuccessApp />;
}
