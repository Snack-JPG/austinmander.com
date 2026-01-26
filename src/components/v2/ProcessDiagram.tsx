"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Phone,
  ClipboardCheck,
  GitBranch,
  Repeat,
  ArrowRight,
  Check,
} from "lucide-react";

const steps = [
  {
    icon: Phone,
    label: "Discovery Call",
    detail: "30 min · Free",
    description: "We identify what's costing you time",
  },
  {
    icon: ClipboardCheck,
    label: "AI Audit",
    detail: "1-2 weeks · £1,500",
    description: "I map your opportunities",
  },
  {
    icon: GitBranch,
    label: "Choose Your Path",
    detail: "Train or Build",
    description: "Self-sufficiency or expert systems",
  },
  {
    icon: Repeat,
    label: "Ongoing Support",
    detail: "Optional",
    description: "Stay current as AI evolves",
  },
];

export function ProcessDiagram() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="relative py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-zinc-800/20 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Connecting line - desktop */}
      <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 lg:block">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto h-px w-3/4 origin-left bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800"
        />
      </div>

      {/* Steps */}
      <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.1 + index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex flex-col items-center text-center"
          >
            {/* Step number - small accent */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-zinc-400">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Icon container */}
            <div className="relative mb-4 mt-4">
              {/* Outer ring */}
              <div className="absolute -inset-3 rounded-full border border-zinc-800 transition-colors duration-300 group-hover:border-zinc-700" />
              {/* Inner ring with gradient */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
              {/* Icon */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 transition-all duration-300 group-hover:bg-zinc-800">
                <step.icon className="h-6 w-6 text-zinc-400 transition-colors duration-300 group-hover:text-white" />
              </div>
              {/* Active dot indicator */}
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-zinc-700 transition-colors duration-300 group-hover:bg-white" />
            </div>

            {/* Label */}
            <h4 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-white">
              {step.label}
            </h4>

            {/* Detail */}
            <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-xs text-zinc-400">
              {step.detail}
            </p>

            {/* Description */}
            <p className="mt-2 text-sm text-zinc-400">{step.description}</p>

            {/* Arrow to next - desktop only */}
            {index < steps.length - 1 && (
              <div className="absolute -right-2 top-12 hidden text-zinc-400 lg:block xl:-right-0">
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom decoration - checkmarks */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400"
      >
        <span className="flex items-center gap-2">
          <Check className="h-4 w-4 text-zinc-400" />
          No commitment until audit
        </span>
        <span className="flex items-center gap-2">
          <Check className="h-4 w-4 text-zinc-400" />
          Audit fee credited if you proceed
        </span>
        <span className="flex items-center gap-2">
          <Check className="h-4 w-4 text-zinc-400" />
          Clear pricing upfront
        </span>
      </motion.div>
    </div>
  );
}
