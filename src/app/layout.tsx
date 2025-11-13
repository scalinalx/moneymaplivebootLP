import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Build To Profit - How to Monetize Your Newsletter & Build 6-Figure Income",
  description: "Build To Profit helps newsletter creators monetize—land brand deals, productize, and scale toward 6‑figure income with live sessions, templates, and proven playbooks.",
  icons: {
    icon: '/imgs/hwg-icon.webp',
    shortcut: '/imgs/hwg-icon.webp',
    apple: '/imgs/hwg-icon.webp',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Build To Profit - How to Monetize Your Newsletter & Build 6-Figure Income",
    description: "Build To Profit helps newsletter creators monetize—land brand deals, productize, and scale toward 6‑figure income with live sessions, templates, and proven playbooks.",
    siteName: 'Build To Profit',
    type: 'website',
    url: '/',
    images: [
      {
        url: '/imgs/heroimgs/he2.webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Build To Profit - How to Monetize Your Newsletter & Build 6-Figure Income",
    description: "Build To Profit helps newsletter creators monetize—land brand deals, productize, and scale toward 6‑figure income with live sessions, templates, and proven playbooks.",
    images: ['/imgs/heroimgs/he2.webp'],
    site: '@howwegrow',
    creator: 'how we grow',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CC592MQH07"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'G-CC592MQH07', { page_path: window.location.pathname });
          `}
        </Script>
        <Script src="https://r.wdfl.co/rw.js" data-rewardful="68083c" />
        <Script id="rewardful-queue" strategy="beforeInteractive">
          {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
        </Script>
      </body>
    </html>
  );
}
