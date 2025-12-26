"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Radio,
  Clock,
  AlertTriangle,
  Eye,
  FileText,
  Users,
  TrendingUp
} from "lucide-react";

const problems = [
  {
    icon: Clock,
    problem: "Hours compiling status reports",
    solution: "One-click executive summaries, board-ready PDFs",
  },
  {
    icon: AlertTriangle,
    problem: "Risks found too late",
    solution: "AI detects problems before they escalate",
  },
  {
    icon: Eye,
    problem: "No visibility across projects",
    solution: "Portfolio dashboard with health scores for 20+ projects",
  },
  {
    icon: Users,
    problem: "Resource conflicts discovered last minute",
    solution: "Automatic warnings when people are over-allocated",
  },
  {
    icon: TrendingUp,
    problem: "Leaders always chasing for updates",
    solution: "Scheduled reports sent automatically",
  },
  {
    icon: FileText,
    problem: "Data scattered across tools",
    solution: "Connects to Jira, Monday, Slack — single source of truth",
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

        {/* Change Radar header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex items-center justify-center gap-4"
        >
          <div className="inline-flex rounded-xl bg-cyan-500/10 p-3">
            <Radio className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white md:text-3xl">
              Change Radar
            </h3>
            <p className="text-zinc-500">
              AI-powered project intelligence
            </p>
          </div>
        </motion.div>

        {/* Problem → Solution grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4 md:grid-cols-2"
        >
          {problems.map((item, index) => (
            <div
              key={index}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-zinc-800 p-2 text-zinc-500 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-zinc-600 line-through decoration-zinc-700">
                    {item.problem}
                  </p>
                  <p className="mt-1 text-zinc-300">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="font-[family-name:var(--font-jetbrains)] text-sm text-zinc-600">
            Launching soon · Built for transformation leaders
          </p>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
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
