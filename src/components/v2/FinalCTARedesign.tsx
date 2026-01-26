"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { CalendlyButton } from "./CalendlyModal";

const CALENDLY_URL = "https://calendly.com/austinmander/discovery-call";

export function FinalCTARedesign() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a0f] px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Top border accent */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* Large arrow graphic */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 0.03, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="absolute right-12 top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <ArrowRight className="h-64 w-64 stroke-[0.5]" />
        </motion.div>

        {/* Corner geometric */}
        <div className="absolute bottom-8 left-8 h-16 w-16 border-b border-l border-zinc-800/30" />
        <div className="absolute right-8 top-8 h-16 w-16 border-r border-t border-zinc-800/30" />

        {/* Floating dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-zinc-700" />
          <div className="absolute left-1/3 bottom-1/3 h-1.5 w-1.5 rounded-full bg-zinc-700" />
          <div className="absolute right-1/4 bottom-1/4 h-1 w-1 rounded-full bg-zinc-700" />
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Your team is already behind on AI.
            <br />
            <span className="text-zinc-400">Let&apos;s fix that.</span>
          </h2>

          {/* Body */}
          <div className="mt-8 max-w-xl space-y-4">
            <p className="text-lg text-zinc-400">
              One call. 30 minutes. We figure out if I can help.
            </p>
            <p className="text-zinc-400">
              If not, no hard feelings — you&apos;ll still leave with clarity on
              what to do next.
            </p>
          </div>

          {/* CTA with enhanced visual treatment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <CalendlyButton
              url={CALENDLY_URL}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-none border border-white bg-white px-8 py-4 text-base font-semibold text-zinc-900 transition-all duration-300 hover:bg-transparent hover:text-white"
            >
              <span className="relative z-10">Book a Discovery Call</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </CalendlyButton>
            <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-sm text-zinc-400">
              No pitch. No obligation. Just a conversation.
            </p>
          </motion.div>

          {/* Alternative contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 border-t border-zinc-800 pt-8"
          >
            <p className="text-zinc-400">
              Prefer email?{" "}
              <a
                href="mailto:austin@austinmander.com"
                className="text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
              >
                austin@austinmander.com
              </a>
            </p>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-6 text-xs text-zinc-400"
          >
            <span>No commitment required</span>
            <span>·</span>
            <span>Response within 24 hours</span>
            <span>·</span>
            <span>UK-based</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
