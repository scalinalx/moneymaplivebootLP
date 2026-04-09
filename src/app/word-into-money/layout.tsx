import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Word Into Money — $97 Copywriting Workshop | Ana Calin',
    description: 'The 60-minute copywriting workshop that turns newsletter writers into paid professionals. Learn the exact frameworks to convert readers into buyers.',
    openGraph: {
        title: 'Word Into Money — Copywriting Workshop',
        description: 'Turn your words into income. The copywriting frameworks that generated $1.2M+ for newsletter writers.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Word Into Money — Copywriting Workshop',
        description: 'Turn your words into income. $97 workshop by Ana Calin.',
    },
};

export default function WordIntoMoneyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
