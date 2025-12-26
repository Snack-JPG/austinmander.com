"use client";

import { Linkedin, Mail, Twitter } from "lucide-react";

export function FooterV2() {
  return (
    <footer className="border-t border-zinc-800 px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
              Austin Mander
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              AI Automation Consultant · Building Change Radar
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/austinmander"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-2.5 text-zinc-400 transition-all hover:border-zinc-700 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:austin@austinmander.com"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-2.5 text-zinc-400 transition-all hover:border-zinc-700 hover:text-white"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/austinmander"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-2.5 text-zinc-400 transition-all hover:border-zinc-700 hover:text-white"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-zinc-800 pt-8 text-center">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} Austin Mander. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
