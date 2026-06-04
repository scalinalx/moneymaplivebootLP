import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How To Create The One Digital Product That Sells",
    description:
        "Turn what you already know, plus what your audience actually wants, into one signature offer worth building. A 90-minute live workshop with Ana Calin.",
    openGraph: {
        title: "How To Create The One Digital Product That Sells",
        description:
            "Turn what you already know, plus what your audience actually wants, into one signature offer worth building. A 90-minute live workshop with Ana Calin.",
        url: "/create-viral-digital-product",
        siteName: "How We Grow",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "How To Create The One Digital Product That Sells",
        description:
            "Turn what you already know, plus what your audience actually wants, into one signature offer worth building.",
        creator: "@howwegrow",
    },
};

export default function CreateViralDigitalProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fonts (Anton / Montserrat / Lato / Lora) are loaded globally in globals.css,
    // matching the how-to-hit-10k design system this page mirrors.
    return <>{children}</>;
}
