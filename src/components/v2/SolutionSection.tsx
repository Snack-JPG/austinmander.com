"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Target, TrendingUp } from "lucide-react";

export function SolutionSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative bg-[#0f172a] px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left accent line */}
        <div className="absolute left-12 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent lg:block" />

        {/* Animated checkmark/tick graphic */}
        <motion.svg
          initial={{ opacity: 0, pathLength: 0 }}
          animate={inView ? { opacity: 0.05, pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute right-12 top-1/2 h-64 w-64 -translate-y-1/2"
          viewBox="0 0 100 100"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
        >
          <motion.path
            d="M20 50 L40 70 L80 30"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </motion.svg>

        {/* Dot pattern - sparse */}
        <div className="absolute bottom-0 right-0 h-64 w-64 opacity-[0.03]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={{
                left: `${20 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="lg:pl-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              I make AI stick.
            </h2>
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl space-y-6"
          >
            <p className="text-lg leading-relaxed text-zinc-400">
              I don&apos;t sell you a chatbot and disappear. I build the
              infrastructure, train your team, and leave you self-sufficient.
            </p>
          </motion.div>

          {/* Three pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid gap-6 sm:grid-cols-3"
          >
            {[
              { icon: Target, label: "Build", desc: "Infrastructure that works" },
              { icon: Zap, label: "Train", desc: "Your team to use it" },
              { icon: TrendingUp, label: "Leave", desc: "You self-sufficient" },
            ].map((item, i) => (
              <div key={item.label} className="group flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-zinc-800/50 p-2 transition-colors group-hover:bg-zinc-800">
                  <item.icon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-white" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* The difference - highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 border-l-2 border-white/20 pl-6"
          >
            <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-zinc-400">
              The difference
            </p>
            <p className="mt-4 text-lg leading-relaxed text-zinc-300">
              Most AI consultants want you dependent on them.{" "}
              <span className="text-white">I want you to not need me.</span>
            </p>
            <p className="mt-4 text-zinc-400">
              Train your people to fish, build the systems that need an expert,
              then get out of the way.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
