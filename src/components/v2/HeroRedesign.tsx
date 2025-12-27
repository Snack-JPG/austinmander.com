"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CalendlyButton, CalendlyPreload } from "./CalendlyModal";

const CALENDLY_URL = "https://calendly.com/austinmander/ai-audit";

export function HeroRedesign() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 py-20 lg:px-12">
      <CalendlyPreload />

      {/* Clean background */}
      <div className="pointer-events-none absolute inset-0 bg-[#0a0a0f]" />

      {/* Subtle grid - very minimal */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl">
        {/* Main content - centered, clean */}
        <div className="text-center">
          {/* Name and title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Austin Mander
            </h1>
            <p className="mt-3 font-[family-name:var(--font-jetbrains)] text-sm font-medium uppercase tracking-widest text-cyan-400">
              AI Engineer
            </p>
          </motion.div>

          {/* Main value proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <p className="text-xl leading-relaxed text-zinc-300 sm:text-2xl">
              I build AI systems that solve real problems.
            </p>
            <p className="mt-4 text-lg text-zinc-500">
              Internal tools. Automations. Products.
              <br className="hidden sm:block" />
              If it should be smarter, I can probably make it smarter.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10"
          >
            <CalendlyButton
              url={CALENDLY_URL}
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-100"
            >
              <span>Book a Call</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </CalendlyButton>
            <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-sm text-zinc-600">
              30 minutes · No obligation
            </p>
          </motion.div>

          {/* Currently building - subtle credibility */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 border-t border-zinc-800 pt-8"
          >
            <p className="text-sm text-zinc-600">
              Currently building{" "}
              <span className="text-zinc-400">Change Radar</span>
              {" "}— AI-powered project intelligence
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
