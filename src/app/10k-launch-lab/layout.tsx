import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
    title: '10k Launch Lab | Build Your Made-To-Order Brand',
    description: 'The workshop that stops the scroll and sells for you.',
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
