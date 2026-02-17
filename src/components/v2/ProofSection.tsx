"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Database, BarChart3, MessageSquare, Clock, Code2 } from "lucide-react";

const features = [
  { icon: Database, text: "Multi-tenant SaaS architecture" },
  { icon: BarChart3, text: "8 AI engines with semantic caching" },
  { icon: Shield, text: "SOC 2-grade security (AES-256, audit logging)" },
  { icon: Clock, text: "Real-time portfolio dashboards" },
  { icon: MessageSquare, text: "Natural language queries across project data" },
];

export function ProofSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="proof"
      ref={ref}
      aria-labelledby="proof-title"
      tabIndex={-1}
      className="relative bg-[#0f172a] px-6 py-24 lg:px-12 lg:py-32 focus:outline-none"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Code-like decorative lines */}
        <div className="absolute left-6 top-24 hidden space-y-2 opacity-[0.03] lg:block">
          <div className="h-px w-32 bg-white" />
          <div className="h-px w-24 bg-white" />
          <div className="h-px w-40 bg-white" />
          <div className="h-px w-20 bg-white" />
        </div>

        {/* Corner geometric */}
        <div className="absolute bottom-0 right-0 h-64 w-64">
          <div className="absolute bottom-8 right-8 h-32 w-32 border border-zinc-800/30" />
          <div className="absolute bottom-12 right-12 h-32 w-32 border border-zinc-800/20" />
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2
            id="proof-title"
            className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl"
          >
            What I&apos;ve built
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left column - Change Radar info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-baseline gap-4">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                Change Radar
              </h3>
              <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-zinc-400">
                Hero proof
              </span>
            </div>

            <p className="mt-4 text-lg text-zinc-400">
              Enterprise project intelligence for PMOs managing 20+ projects.
            </p>

            {/* The big number with visual treatment */}
            <div className="mt-8 flex items-end gap-6">
              <div className="border-l-2 border-white/20 pl-6">
                <p className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold tabular-nums text-white">
                  550K
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  lines of production code
                </p>
              </div>
              {/* Mini visualization */}
              <div className="hidden pb-2 sm:flex sm:gap-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={inView ? { height: 8 + Math.random() * 32 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                    className="w-1.5 rounded-full bg-zinc-700"
                  />
                ))}
              </div>
            </div>

            {/* Feature list with icons */}
            <ul className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  className="flex items-center gap-3 text-zinc-400"
                >
                  <feature.icon className="h-4 w-4 flex-shrink-0 text-zinc-400" />
                  <span>{feature.text}</span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-8 font-[family-name:var(--font-jetbrains)] text-sm italic text-zinc-400">
              This is how I know what &quot;production-grade&quot; actually
              means.
            </p>
          </motion.div>

          {/* Right column - Preview placeholder + The Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Change Radar Preview Placeholder */}
            <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="mx-auto max-w-xs rounded bg-zinc-800 px-3 py-1">
                    <span className="font-[family-name:var(--font-jetbrains)] text-xs text-zinc-400">
                      change-radar.app
                    </span>
                  </div>
                </div>
              </div>

              {/* Placeholder content - will be replaced with actual screenshot */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
                {/* Skeleton UI */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="h-8 w-24 rounded bg-zinc-800/50" />
                    <div className="h-8 w-32 rounded bg-zinc-800/50" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 rounded bg-zinc-800/30" />
                    <div className="h-24 rounded bg-zinc-800/30" />
                    <div className="h-24 rounded bg-zinc-800/30" />
                  </div>
                  <div className="h-32 rounded bg-zinc-800/20" />
                </div>

                {/* Overlay text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Code2 className="mx-auto h-8 w-8 text-zinc-400" />
                    <p className="mt-2 font-[family-name:var(--font-jetbrains)] text-xs text-zinc-400">
                      Preview coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Approach */}
            <div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
                The Approach
              </h3>

              <div className="mt-4 space-y-4 text-zinc-400">
                <p className="leading-relaxed">
                  I don&apos;t write every line by hand — I direct AI to build,
                  then I validate, architect, and quality-control.
                </p>

                <p className="leading-relaxed">
                  This is how software gets built now. It&apos;s why I deliver in
                  weeks what used to take months.
                </p>

                <div className="border-l-2 border-white/20 pl-4">
                  <p className="text-zinc-300">
                    When you hire me, you get that same speed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
