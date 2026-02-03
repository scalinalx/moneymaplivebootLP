import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
    title: 'Launch Your Offer in 30 Days | The 10k Launch Lab',
    description: '30-Day Implementation Program to build your system, launch your offer, and hit your first $5k-$10k month. Enrollment closes Feb 7th.',
    openGraph: {
        title: 'Launch Your Offer in 30 Days | The 10k Launch Lab',
        description: '30-Day Implementation Program to build your system, launch your offer, and hit your first $5k-$10k month. Enrollment closes Feb 7th.',
        type: 'website',
        url: '/10k-launch-lab',
        siteName: 'How We Grow',
        locale: 'en_US',
        images: [
            {
                url: '/imgs/10k-launch-lab/hero-1.jpeg',
                width: 1200,
                height: 630,
                alt: '10k Launch Lab Program',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Launch Your Offer in 30 Days | The 10k Launch Lab',
        description: '30-Day Implementation Program to build your system, launch your offer, and hit your first $5k-$10k month. Enrollment closes Feb 7th.',
        images: ['/imgs/10k-launch-lab/hero-1.jpeg'],
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="launch-lab-wrapper min-h-screen">
            {children}
        </div>
    );
}
