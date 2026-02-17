import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://austinmander.com"),
  title: {
    default: "Austin Mander — Dropped Out of Law, Built 550K Lines of Code",
    template: "%s | Austin Mander",
  },
  description:
    "21-year-old developer who built a 550,000-line enterprise SaaS solo. 8 AI engines. Presented to the CIO of Allianz. No degree, no team, just shipping.",
  keywords: [
    "Austin Mander",
    "full stack developer",
    "Next.js",
    "TypeScript",
    "AI engineer",
    "software developer UK",
    "AI consulting",
  ],
  authors: [{ name: "Austin Mander" }],
  creator: "Austin Mander",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://austinmander.com",
    siteName: "Austin Mander",
    title: "Austin Mander — Dropped Out of Law, Built 550K Lines of Code",
    description:
      "21-year-old developer who built a 550,000-line enterprise SaaS solo. 8 AI engines. Presented to the CIO of Allianz.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Austin Mander — 21-year-old developer. 550K lines of TypeScript. 8 AI engines. No degree, no team.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin Mander — Dropped Out of Law, Built 550K Lines of Code",
    description:
      "21-year-old developer who built a 550,000-line enterprise SaaS solo. 8 AI engines. Presented to the CIO of Allianz.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-[#0a0a0a] font-sans text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
