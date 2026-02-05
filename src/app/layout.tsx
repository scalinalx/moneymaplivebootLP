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
  description: "Build To Profit helps newsletter creators monetize—land brand deals, productize, and scale toward 6‑figure income with recorded implementation sessions, templates, and proven playbooks.",
  icons: {
    icon: '/imgs/hwg-icon.webp',
    shortcut: '/imgs/hwg-icon.webp',
    apple: '/imgs/hwg-icon.webp',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Build To Profit - How to Monetize Your Newsletter & Build 6-Figure Income",
    description: "Build To Profit helps newsletter creators monetize—land brand deals, productize, and scale toward 6‑figure income with recorded implementation sessions, templates, and proven playbooks.",
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
    description: "Build To Profit helps newsletter creators monetize—land brand deals, productize, and scale toward 6‑figure income with recorded sessions, templates, and proven playbooks.",
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
      <head>
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '925153509944098');
            fbq('track', 'PageView');
            fbq('track', 'ViewContent');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=925153509944098&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Proof Pixel */}
        <Script
          src="https://cdn.useproof.com/proof.js?acc=NkPzIKspvWbApl6A6cwWSfOQ2U03"
          strategy="afterInteractive"
        />
      </head>
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
