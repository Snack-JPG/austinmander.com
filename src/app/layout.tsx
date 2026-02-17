import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://austinmander.com"),
  title: {
    default: "Austin Mander — Full Stack Developer & AI Engineer",
    template: "%s | Austin Mander",
  },
  description:
    "21-year-old developer who built a 550,000-line enterprise SaaS solo. Next.js, TypeScript, AI. View projects and get in touch.",
  keywords: [
    "Austin Mander",
    "full stack developer",
    "Next.js",
    "TypeScript",
    "AI engineer",
    "Birmingham UK",
  ],
  authors: [{ name: "Austin Mander" }],
  creator: "Austin Mander",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://austinmander.com",
    siteName: "Austin Mander",
    title: "Austin Mander — Full Stack Developer & AI Engineer",
    description:
      "21-year-old developer who built a 550,000-line enterprise SaaS solo. Next.js, TypeScript, AI.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Austin Mander — Full Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin Mander — Full Stack Developer & AI Engineer",
    description:
      "21-year-old developer who built a 550,000-line enterprise SaaS solo. Next.js, TypeScript, AI.",
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
