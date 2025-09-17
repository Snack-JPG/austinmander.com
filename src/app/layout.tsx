import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://austinmander.com"),
  title: "Austin Mander - Building at unfair speed with AI",
  description:
    "I design, architect, and ship ambitious software by orchestrating AI systems end‑to‑end. Fewer meetings, more momentum.",
  keywords: [
    "Austin Mander",
    "AI",
    "Software Development",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Austin Mander" }],
  creator: "Austin Mander",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://austinmander.com",
    siteName: "Austin Mander",
    title: "Austin Mander - Building at unfair speed with AI",
    description:
      "I design, architect, and ship ambitious software by orchestrating AI systems end‑to‑end. Fewer meetings, more momentum.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@austinmander",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-emerald" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
