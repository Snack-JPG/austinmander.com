"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, FileText, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Calendar,
    title: "Book Your Free Audit",
    description:
      "15 minutes to understand your workflows and identify the biggest opportunities.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Get Your Automation Plan",
    description:
      "I'll map out exactly what to automate, how long it takes, and what it costs. No obligation.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Reclaim Your Time",
    description:
      "I build it, you approve it, and you stop doing work that doesn't need you.",
  },
];

export function HowItWorks() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
            How It Works
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-zinc-700 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connecting line - mobile */}
                {index < steps.length - 1 && (
                  <div className="absolute bottom-0 left-1/2 h-8 w-px -translate-x-1/2 translate-y-full bg-gradient-to-b from-zinc-700 to-transparent lg:hidden" />
                )}

                <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center transition-all duration-300 hover:border-zinc-700">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="rounded-full border border-cyan-500/30 bg-zinc-900 px-4 py-1">
                      <span className="font-[family-name:var(--font-jetbrains)] text-sm font-medium text-cyan-400">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mx-auto mb-4 mt-4 inline-flex rounded-xl bg-cyan-500/10 p-4 text-cyan-400">
                    <step.icon className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
