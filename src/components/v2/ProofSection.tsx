"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Quote } from "lucide-react";
import { toolsWithIcons } from "./ToolLogos";

const testimonial = {
  quote:
    "Austin automated our weekly reporting and saved us 6 hours every week. The ROI was immediate.",
  author: "Agency Director",
  company: "Creative Agency",
};

export function ProofSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="relative px-6 py-24 lg:px-12 lg:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
              I don&apos;t just consult.{" "}
              <span className="text-cyan-400">I build.</span>
            </h2>

            <div className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-400">
              <p>
                While I help clients automate their businesses, I&apos;m also building my
                own AI software.
              </p>

              <p>
                <span className="font-semibold text-white">Change Radar</span> is an
                AI-powered project intelligence platform — it predicts delays,
                generates board reports, and surfaces insights your PM tool misses.
              </p>

              <p>
                Why does this matter to you? Because I&apos;m not someone who watched a
                YouTube tutorial and started calling myself an &ldquo;AI consultant.&rdquo; I
                architect and build production AI systems.
              </p>

              <p className="text-zinc-300">
                Your automation isn&apos;t a side project for me. It&apos;s the same craft I
                apply to my own products.
              </p>
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              href="https://linkedin.com/in/austinmander"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-cyan-400 transition-colors hover:text-cyan-300"
            >
              Follow the build
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* Change Radar Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Mock dashboard preview */}
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-4 font-[family-name:var(--font-jetbrains)] text-xs text-zinc-500">
                  change-radar.app
                </span>
              </div>

              {/* Mock dashboard content */}
              <div className="space-y-4">
                <div className="rounded-lg bg-zinc-800/50 p-4">
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Project Health
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-700">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-500 to-green-500" />
                    </div>
                    <span className="font-[family-name:var(--font-jetbrains)] text-sm text-cyan-400">
                      78%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-zinc-800/50 p-4">
                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Predicted Delays
                    </div>
                    <div className="mt-1 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-amber-400">
                      2
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-800/50 p-4">
                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      AI Insights
                    </div>
                    <div className="mt-1 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-cyan-400">
                      12
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-cyan-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-cyan-500/20 p-1.5">
                      <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Board Report Generated
                      </div>
                      <div className="text-xs text-zinc-400">
                        Q4 summary ready for review
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 rounded-lg border border-cyan-500/30 bg-zinc-900/90 px-4 py-2 backdrop-blur">
              <span className="font-[family-name:var(--font-jetbrains)] text-xs text-cyan-400">
                In Development
              </span>
            </div>
          </motion.div>
        </div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-zinc-500">
            Tools I work with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {toolsWithIcons.map((tool) => (
              <div
                key={tool.name}
                className={`group flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-400 transition-all duration-300 ${tool.hoverColor}`}
              >
                <tool.icon className="h-5 w-5" />
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
            <Quote className="mb-4 h-8 w-8 text-cyan-500/50" />
            <blockquote className="text-lg text-zinc-300 sm:text-xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-4 text-sm text-zinc-500">
              <span className="text-zinc-400">{testimonial.author}</span>
              {" · "}
              {testimonial.company}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
