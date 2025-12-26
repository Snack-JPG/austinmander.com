"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Mail } from "lucide-react";
import { CalendlyEmbed } from "./CalendlyEmbed";
import { CalendlyButton } from "./CalendlyModal";

const CALENDLY_URL = "https://calendly.com/austinmander/ai-audit";

export function FinalCTA() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-cyan-500/10" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
        >
          Let&apos;s find your{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            10 hours.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl"
        >
          Book a free 15-minute audit. I&apos;ll show you exactly where AI can save you
          time — no pitch, no pressure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <CalendlyButton
            url={CALENDLY_URL}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 text-xl font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
          >
            <span className="relative z-10">Book Your Free AI Audit</span>
            <ArrowRight className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </CalendlyButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <a
            href="mailto:austin@austinmander.com"
            className="inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-cyan-400"
          >
            <Mail className="h-4 w-4" />
            <span>Prefer email? austin@austinmander.com</span>
          </a>
        </motion.div>

        {/* Calendly Inline Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <p className="mb-4 text-sm text-zinc-500">
            Or book directly below:
          </p>
          <CalendlyEmbed url={CALENDLY_URL} height="700px" />
        </motion.div>
      </div>
    </section>
  );
}
