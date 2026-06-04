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
    // Anton / Montserrat / Lato / Lora load globally in globals.css. Instrument Sans
    // is loaded here just for this route (used by the "Your win goes here" card).
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
            {children}
        </>
    );
}
