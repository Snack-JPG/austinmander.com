"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Users, FileText, PoundSterling } from "lucide-react";

const painPoints = [
  {
    icon: Clock,
    text: "Status reports still take 4 hours every Friday",
  },
  {
    icon: Users,
    text: "New hires ask the same questions for months",
  },
  {
    icon: FileText,
    text: "Knowledge is trapped in 200 documents nobody reads",
  },
  {
    icon: PoundSterling,
    text: "Your £400/hour consultants are doing £15/hour admin",
  },
];

export function ProblemSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative bg-slate-900 px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Vertical line accent */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-zinc-800 via-zinc-700 to-transparent" />

        {/* Large X pattern - subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.02 } : {}}
          transition={{ duration: 1 }}
          className="absolute right-12 top-1/2 -translate-y-1/2"
        >
          <div className="h-64 w-px rotate-45 bg-white" />
          <div className="absolute left-0 top-0 h-64 w-px -rotate-45 bg-white" />
        </motion.div>

        {/* Floating shapes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute left-1/4 top-20 h-2 w-2 rotate-45 border border-zinc-800" />
          <div className="absolute right-1/3 bottom-32 h-3 w-3 rotate-45 border border-zinc-800" />
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left side - Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              You&apos;ve tried AI.
              <br />
              <span className="text-zinc-400">It didn&apos;t stick.</span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-zinc-400">
              Someone on your team uses ChatGPT. Someone else doesn&apos;t touch it.
              You bought Copilot licences that nobody opened.
            </p>

            {/* Visual indicator - adoption gap */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: "30%" } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-zinc-600"
                  />
                </div>
                <span className="text-xs text-zinc-400">Team adoption</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: "90%" } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-white"
                  />
                </div>
                <span className="text-xs text-zinc-400">Potential value</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Pain points with icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-zinc-400">
              Meanwhile
            </p>
            <ul className="space-y-4">
              {painPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-start gap-4 border-l-2 border-zinc-800 py-3 pl-4 transition-colors hover:border-zinc-600"
                >
                  <div className="flex-shrink-0 rounded bg-zinc-800/50 p-2 transition-colors group-hover:bg-zinc-800">
                    <point.icon className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-zinc-300" />
                  </div>
                  <span className="text-zinc-300 transition-colors group-hover:text-white">
                    {point.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom line - the real problem */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 border-t border-zinc-800 pt-8"
        >
          <p className="max-w-2xl text-lg text-zinc-400">
            The problem isn&apos;t AI. It&apos;s that nobody showed your team how to
            actually use it — for{" "}
            <span className="italic text-zinc-300">their</span> work, not generic
            &quot;prompting tips.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
