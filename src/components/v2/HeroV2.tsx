"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { CalendlyButton, CalendlyPreload } from "./CalendlyModal";

const RadarElement = dynamic(() => import("./RadarElement"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
    </div>
  ),
});

const CALENDLY_URL = "https://calendly.com/austinmander/ai-audit";

export function HeroV2() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-20 lg:px-12">
      {/* Preload Calendly scripts */}
      <CalendlyPreload />

      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0a0a0f] to-[#0f172a]" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            AI Automation for{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Agencies & Consultancies
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg leading-relaxed text-zinc-400 sm:text-xl lg:max-w-xl"
          >
            Stop wasting hours on repetitive work. Proposals, reports, client updates,
            data entry — I&apos;ll automate it so you can focus on what actually matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <CalendlyButton
              url={CALENDLY_URL}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
            >
              <span className="relative z-10">Book Your Free AI Audit</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </CalendlyButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 font-[family-name:var(--font-jetbrains)] text-sm text-zinc-500"
          >
            15 minutes. No pitch. Just actionable insights.
          </motion.p>
        </div>

        {/* 3D Radar Element */}
        <div className="h-[350px] w-full flex-1 sm:h-[400px] lg:h-[500px]">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
              </div>
            }
          >
            <RadarElement />
          </Suspense>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 transition-colors hover:text-cyan-400"
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
