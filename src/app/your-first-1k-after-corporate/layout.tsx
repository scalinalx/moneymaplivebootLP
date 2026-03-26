import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your First $1K After Corporate — Ana Calin',
  description:
    'The exact playbook I used to replace my corporate salary — and how you can make your first $1,000 online in 90 days or less.',
  openGraph: {
    title: 'Your First $1K After Corporate — Ana Calin',
    description:
      'The exact playbook I used to replace my corporate salary — and how you can make your first $1,000 online in 90 days or less.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your First $1K After Corporate — Ana Calin',
    description:
      'The exact playbook I used to replace my corporate salary — and how you can make your first $1,000 online in 90 days or less.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
