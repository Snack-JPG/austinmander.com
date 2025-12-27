"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    number: "01",
    title: "Book a call",
    description: "30 minutes. We talk about what you're trying to solve.",
  },
  {
    number: "02",
    title: "I'll tell you honestly",
    description: "If I can help, I'll explain how. If I can't, I'll say so.",
  },
  {
    number: "03",
    title: "We scope it together",
    description: "Clear deliverables. Clear timeline. No surprises.",
  },
  {
    number: "04",
    title: "I build it",
    description: "You get something that actually works.",
  },
];

export function HowItWorksRedesign() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a0f] px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
            How Working Together Works
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6"
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <span className="font-[family-name:var(--font-jetbrains)] text-sm font-medium text-cyan-500">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 border-b border-zinc-800 pb-8">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-zinc-500">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
