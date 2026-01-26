"use client";

import Link from "next/link";
import { Linkedin, Github, Twitter } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/austinmander",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/austinmander",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/austinmander",
    icon: Twitter,
  },
];

export function FooterRedesign() {
  return (
    <footer className="border-t border-zinc-800/50 bg-[#0a0a0f] px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Name */}
          <div className="text-center sm:text-left">
            <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
              Austin Mander
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              AI for Professional Services Firms
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-3 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} Austin Mander
          </p>
        </div>
      </div>
    </footer>
  );
}
