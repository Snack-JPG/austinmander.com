"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { CalendlyButton } from "./CalendlyModal";

const CALENDLY_URL = "https://calendly.com/austinmander/ai-audit";

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
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
            Got a problem that should be automatable?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-500">
            Let&apos;s talk. 30 minutes. No obligation.
            <br />
            We&apos;ll figure out if I can help.
          </p>

          <div className="mt-10">
            <CalendlyButton
              url={CALENDLY_URL}
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-100"
            >
              <span>Book a Call</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </CalendlyButton>
          </div>

          <p className="mt-8 text-zinc-600">
            Or email me:{" "}
            <a
              href="mailto:austin@austinmander.com"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              austin@austinmander.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
