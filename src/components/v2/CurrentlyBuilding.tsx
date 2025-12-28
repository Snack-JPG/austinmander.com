"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Check, MessageSquare, FileText } from "lucide-react";

// Dynamically import the 3D radar
const RadarElement = dynamic(() => import("./RadarElement"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
    </div>
  ),
});

const features = [
  "AI-powered risk detection across all projects",
  "One-click executive summaries & board-ready reports",
  "Portfolio health dashboard with 20+ project visibility",
  "Connects to Jira, Monday, Slack — single source of truth",
  "Scheduled reports sent automatically to stakeholders",
  "Natural language queries: ask questions, get answers",
];

const connectorTools = [
  {
    name: "Meeting Intelligence",
    description: "Transcripts → actions, decisions, risks",
    href: "/meeting-intel",
    icon: MessageSquare,
    color: "cyan",
  },
  {
    name: "Document Intelligence",
    description: "Contracts & docs → structured data",
    href: "/document-intel",
    icon: FileText,
    color: "emerald",
  },
];

export function CurrentlyBuilding() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0a0a0f] px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Radar visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 h-[300px] sm:h-[350px] lg:order-1 lg:h-[450px]"
          >
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
                </div>
              }
            >
              <RadarElement />
            </Suspense>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <p className="font-[family-name:var(--font-jetbrains)] text-sm font-medium uppercase tracking-widest text-cyan-400">
              The Product Ecosystem
            </p>

            <h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
              Change Radar
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Project intelligence for leaders who are tired of compiling status reports
              and discovering risks too late.
            </p>

            {/* Feature list */}
            <ul className="mt-8 space-y-3">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500" />
                  <span className="text-zinc-300">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex items-center gap-6"
            >
              <Link
                href="/change-radar"
                className="group inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-zinc-900 transition-colors hover:bg-cyan-400"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="font-[family-name:var(--font-jetbrains)] text-sm text-zinc-600">
                In Development
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Connector Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20"
        >
          <p className="mb-6 text-center font-[family-name:var(--font-jetbrains)] text-sm font-medium uppercase tracking-widest text-zinc-500">
            Tools that feed into Change Radar
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {connectorTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      tool.color === "cyan"
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-zinc-500">{tool.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-zinc-400" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
