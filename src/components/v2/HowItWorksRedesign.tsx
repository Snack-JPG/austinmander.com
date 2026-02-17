"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, GraduationCap, Wrench } from "lucide-react";
import { CalendlyButton } from "./CalendlyModal";
import { ProcessDiagram } from "./ProcessDiagram";

const CALENDLY_URL = "https://calendly.com/austinmander/discovery-call";

export function HowItWorksRedesign() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="how-it-works"
      ref={ref}
      aria-labelledby="how-it-works-title"
      tabIndex={-1}
      className="relative bg-slate-900 px-6 py-24 lg:px-12 lg:py-32 focus:outline-none"
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Corner accents */}
        <div className="absolute right-0 top-0 h-64 w-64 bg-gradient-to-bl from-zinc-800/30 to-transparent" />
        <div className="absolute bottom-0 left-0 h-64 w-64 bg-gradient-to-tr from-zinc-800/30 to-transparent" />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2
            id="how-it-works-title"
            className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl"
          >
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            A clear path from first call to AI-native team
          </p>
        </motion.div>

        {/* Visual Process Diagram */}
        <ProcessDiagram />

        {/* Detailed breakdown */}
        <div className="mt-20 space-y-16">
          {/* Step 1: Discovery Call */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16"
          >
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-zinc-400">
                Step 1
              </p>
              <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-white">
                Discovery Call
              </p>
              <p className="mt-1 text-sm text-zinc-400">Free · 30 minutes</p>
            </div>
            <div className="border-l border-zinc-800 pl-8">
              <p className="text-lg text-zinc-400">
                We talk about what&apos;s eating your team&apos;s time. I&apos;ll
                tell you honestly if I can help — and if I can&apos;t, I&apos;ll
                say so.
              </p>
              <CalendlyButton
                url={CALENDLY_URL}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-zinc-300"
              >
                <span>Book a Call</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CalendlyButton>
            </div>
          </motion.div>

          {/* Step 2: AI Audit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16"
          >
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-zinc-400">
                Step 2
              </p>
              <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-white">
                AI Audit
              </p>
              <p className="mt-1 text-sm text-zinc-400">£1,500 · 1-2 weeks</p>
            </div>
            <div className="border-l border-zinc-800 pl-8">
              <p className="text-lg text-zinc-400">
                I map your opportunities. What should be automated, what needs
                building, what your team can learn to handle themselves. You get a
                clear report — not a sales pitch.
              </p>
              <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-sm italic text-zinc-400">
                Audit fee credited if you proceed.
              </p>
            </div>
          </motion.div>

          {/* Step 3: Two Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16"
          >
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-zinc-400">
                Step 3
              </p>
              <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-white">
                Two Paths
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Train Your Team */}
              <div className="group relative overflow-hidden border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700">
                {/* Decorative corner */}
                <div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-bl from-zinc-800/50 to-transparent transition-opacity group-hover:opacity-100 opacity-0" />
                <div className="mb-4 inline-flex rounded-lg bg-zinc-800 p-3 transition-colors group-hover:bg-zinc-700">
                  <GraduationCap className="h-6 w-6 text-zinc-400 transition-colors group-hover:text-white" />
                </div>
                <h4 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
                  Train Your Team
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
                    Your people learn to automate their own workflows
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
                    Half-day to full-day sessions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
                    They become self-sufficient
                  </li>
                </ul>
                <p className="mt-4 border-t border-zinc-800 pt-4 text-sm font-medium text-zinc-300">
                  From £1,500
                </p>
              </div>

              {/* Build For You */}
              <div className="group relative overflow-hidden border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700">
                {/* Decorative corner */}
                <div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-bl from-zinc-800/50 to-transparent transition-opacity group-hover:opacity-100 opacity-0" />
                <div className="mb-4 inline-flex rounded-lg bg-zinc-800 p-3 transition-colors group-hover:bg-zinc-700">
                  <Wrench className="h-6 w-6 text-zinc-400 transition-colors group-hover:text-white" />
                </div>
                <h4 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
                  Build For You
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
                    I build the systems that need an expert
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
                    RAG systems, integrations, custom tools
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
                    2-8 week projects
                  </li>
                </ul>
                <p className="mt-4 border-t border-zinc-800 pt-4 text-sm font-medium text-zinc-300">
                  From £5,000
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 4: Ongoing Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16"
          >
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-zinc-400">
                Step 4
              </p>
              <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-white">
                Ongoing Support
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Optional · From £500/month
              </p>
            </div>
            <div className="border-l border-zinc-800 pl-8">
              <p className="text-lg text-zinc-400">
                AI evolves. I keep your setup current — new methods, new hires
                onboarded, quarterly reviews. You stay ahead without hiring an AI
                team.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
