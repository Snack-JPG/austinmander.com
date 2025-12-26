import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Austin Mander | AI Automation for Agencies & Consultancies",
  description:
    "Stop wasting hours on repetitive work. I help agencies and consultancies automate proposals, reports, client updates, and more. Book a free AI audit.",
  openGraph: {
    title: "Austin Mander | AI Automation for Agencies & Consultancies",
    description:
      "Stop wasting hours on repetitive work. I help agencies and consultancies automate proposals, reports, client updates, and more. Book a free AI audit.",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/v2/og",
        width: 1200,
        height: 630,
        alt: "Austin Mander - AI Automation for Agencies & Consultancies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin Mander | AI Automation for Agencies & Consultancies",
    description:
      "Stop wasting hours on repetitive work. I help agencies and consultancies automate proposals, reports, client updates, and more.",
    images: ["/v2/og"],
  },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen bg-[#0a0a0f] text-white antialiased`}
    >
      {children}
    </div>
  );
}
