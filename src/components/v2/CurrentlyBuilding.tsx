"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Radio, AlertTriangle, FileText, Plug } from "lucide-react";

const features = [
  {
    icon: Plug,
    text: "Connects to your existing tools",
  },
  {
    icon: AlertTriangle,
    text: "Flags risks before they become problems",
  },
  {
    icon: FileText,
    text: "Generates executive summaries automatically",
  },
];

const techStack = [
  "Claude",
  "OpenAI",
  "Python",
  "TypeScript",
  "Next.js",
  "Supabase",
  "PostgreSQL",
];

export function CurrentlyBuilding() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative bg-zinc-950 px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="font-[family-name:var(--font-jetbrains)] text-sm font-medium uppercase tracking-widest text-zinc-600">
            Currently Building
          </p>
        </motion.div>

        {/* Change Radar feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 md:p-12"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="inline-flex rounded-xl bg-cyan-500/10 p-4">
                <Radio className="h-8 w-8 text-cyan-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white md:text-3xl">
                Change Radar
              </h3>
              <p className="mt-3 text-lg text-zinc-400">
                AI-powered project intelligence for transformation programs.
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-zinc-500"
                  >
                    <feature.icon className="h-4 w-4 text-cyan-500" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-sm text-zinc-600">
                In development · Early access coming soon
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 border-t border-zinc-800 pt-12"
        >
          <p className="mb-6 text-center font-[family-name:var(--font-jetbrains)] text-sm font-medium uppercase tracking-widest text-zinc-600">
            Tools I Work With
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
