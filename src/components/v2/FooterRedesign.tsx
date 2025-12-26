"use client";

import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";

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
    name: "Email",
    href: "mailto:austin@austinmander.com",
    icon: Mail,
  },
];

export function FooterRedesign() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0a0a0f] px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Name and location */}
          <div className="text-center sm:text-left">
            <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white">
              Austin Mander
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              AI Engineer · London, UK
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-800 hover:text-white"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-zinc-800 pt-8 text-center">
          <p className="text-sm text-zinc-700">
            © {new Date().getFullYear()} Austin Mander. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
