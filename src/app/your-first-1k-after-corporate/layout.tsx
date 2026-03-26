import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your First $1K After Corporate — Live Workshop with Ana Calin",
  description:
    "Join Ana Calin\u2019s live workshop and learn the exact 90-day system she used to go from corporate burnout to $119K/month online. Make your first $1,000 after corporate \u2014 no audience, no website, no experience needed.",
  keywords: [
    "make money after corporate",
    "first 1K online",
    "quit corporate job",
    "newsletter monetization",
    "side hustle for corporate women",
    "Ana Calin workshop",
    "substack bestseller",
    "corporate to entrepreneur",
    "online income after corporate",
    "how to start a newsletter",
    "90 day sprint",
    "career change workshop",
  ],
  openGraph: {
    title: "Your First $1K After Corporate — Live Workshop",
    description:
      "The exact 90-day system to make your first $1,000 online. From a Forbes marketing leader who went from corporate burnout to $119K/month. Live workshop + replay included.",
    type: "website",
    url: "/your-first-1k-after-corporate",
    siteName: "Build To Profit",
    images: [
      {
        url: "/imgs/your-first-1k-after-corporate/hero1.jpeg",
        width: 1376,
        height: 768,
        alt: "Your First $1K After Corporate — Live Workshop with Ana Calin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your First $1K After Corporate — Live Workshop",
    description:
      "The exact 90-day system to make your first $1,000 online. From a Forbes marketing leader who went from corporate burnout to $119K/month.",
    images: ["/imgs/your-first-1k-after-corporate/hero1.jpeg"],
    site: "@howwegrow",
    creator: "how we grow",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
