"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CalendlyButton, CalendlyPreload } from "./CalendlyModal";

const CALENDLY_URL = "https://calendly.com/austinmander/discovery-call";

export function HeroRedesign() {
  return (
    <section className="relative min-h-screen px-6 pb-20 pt-24 lg:px-12 lg:pt-32">
      <CalendlyPreload />

      {/* Clean background */}
      <div className="pointer-events-none absolute inset-0 bg-[#0f172a]" aria-hidden="true" />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Subtle horizontal lines - editorial feel */}
        <div className="absolute inset-0 opacity-[0.02]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-white"
              style={{ top: `${(i + 1) * 5}%` }}
            />
          ))}
        </div>

        {/* Large geometric accent - top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -right-32 -top-32 h-96 w-96"
        >
          <div className="absolute inset-0 rounded-full border border-zinc-800/50" />
          <div className="absolute inset-8 rounded-full border border-zinc-800/30" />
          <div className="absolute inset-16 rounded-full border border-zinc-800/20" />
          <div className="absolute inset-24 rounded-full bg-gradient-to-br from-zinc-800/10 to-transparent" />
        </motion.div>

        {/* Floating dots - scattered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute inset-0"
        >
          <div className="absolute right-1/4 top-1/4 h-1 w-1 rounded-full bg-zinc-600" />
          <div className="absolute right-1/3 top-1/3 h-1.5 w-1.5 rounded-full bg-zinc-700" />
          <div className="absolute right-1/5 top-2/3 h-1 w-1 rounded-full bg-zinc-600" />
          <div className="absolute left-1/4 bottom-1/4 h-1 w-1 rounded-full bg-zinc-700" />
        </motion.div>

        {/* Corner accent lines */}
        <div className="absolute left-0 top-0 h-32 w-px bg-gradient-to-b from-zinc-700 to-transparent" />
        <div className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-zinc-700 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Main content */}
        <div className="max-w-3xl">
          {/* The headline - large, bold, direct */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Your team spends 40% of their time on work AI could do.
          </motion.h1>

          {/* Subheadline - the problem and solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl space-y-4"
          >
            <p className="text-lg leading-relaxed text-zinc-400 sm:text-xl">
              Status reports. Document wrangling. Chasing updates. Your consultants
              do expensive work — they shouldn&apos;t be doing expensive admin.
            </p>
            <p className="text-lg leading-relaxed text-zinc-300 sm:text-xl">
              I fix that. Your team learns to automate their own workflows. You get
              the systems that need an expert built.{" "}
              <span className="text-white">In 6 months, you won&apos;t need me.</span>
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <CalendlyButton
              url={CALENDLY_URL}
              className="group inline-flex items-center gap-3 rounded-none border border-white bg-white px-8 py-4 text-base font-semibold text-zinc-900 transition-all duration-300 hover:bg-transparent hover:text-white focus-visible:ring-offset-[#0f172a]"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </CalendlyButton>
            <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-sm text-zinc-400">
              30 minutes · No pitch · We figure out if I can help
            </p>
          </motion.div>
        </div>

        {/* Bottom section with stats and credibility */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 flex flex-col gap-8 border-t border-zinc-800/50 pt-8 sm:flex-row sm:items-end sm:justify-between"
        >
          {/* Stat blocks */}
          <div className="flex gap-8">
            <div className="border-l border-zinc-800 pl-4">
              <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">40%</p>
              <p className="text-xs text-zinc-400">time saved on admin</p>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">6mo</p>
              <p className="text-xs text-zinc-400">to self-sufficiency</p>
            </div>
          </div>

          {/* Credibility line */}
          <div className="sm:text-right">
            <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-zinc-400">
              Currently building
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              <span className="text-zinc-300">Change Radar</span> — project intelligence for PMOs
            </p>
            <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-xs text-zinc-400">
              550,000 lines of production code
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
