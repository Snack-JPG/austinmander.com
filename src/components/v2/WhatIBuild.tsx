"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Cpu, Wrench, Workflow } from "lucide-react";

const offerings = [
  {
    icon: Cpu,
    title: "AI-Powered Products",
    description:
      "Full applications with AI at the core. RAG systems, batch processing, intelligent dashboards.",
    example: "Like Change Radar — project intelligence that reads your data and surfaces risks automatically.",
  },
  {
    icon: Wrench,
    title: "Internal Tools",
    description:
      "Custom tools built for your team's specific workflow. Document processors, reporting systems, knowledge bases.",
    example: "AI that understands your business context and actually helps, not generic chatbots.",
  },
  {
    icon: Workflow,
    title: "Automations & Systems",
    description:
      "Workflows that run in the background. Data pipelines, content systems, integration layers.",
    example: "Like my commit → Notion → LinkedIn system. Code changes become documented updates automatically.",
  },
];

export function WhatIBuild() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a0f] px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
            What I Build
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {offerings.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors duration-200 hover:border-zinc-700"
            >
              <div className="mb-5 inline-flex rounded-lg bg-zinc-800 p-3 text-zinc-400 transition-colors duration-200 group-hover:bg-cyan-500/10 group-hover:text-cyan-400">
                <item.icon className="h-6 w-6" />
              </div>

              <h3 className="mb-3 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="leading-relaxed text-zinc-500">
                {item.description}
              </p>

              {/* Example line */}
              <p className="mt-4 border-t border-zinc-800 pt-4 text-sm italic text-zinc-600">
                {item.example}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reassurance line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-500">
            Not sure what you need?{" "}
            <span className="text-zinc-400">That&apos;s fine.</span>
            <br />
            Book a call and we&apos;ll figure it out together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
