"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User } from "lucide-react";

export function AboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-title"
      tabIndex={-1}
      className="relative bg-slate-900 px-6 py-24 lg:px-12 lg:py-32 focus:outline-none"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle line accent */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-zinc-800 via-zinc-700 to-transparent" />

        {/* Geometric accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute right-12 top-24 hidden lg:block"
        >
          <div className="h-24 w-24 rounded-full border border-zinc-800/30" />
          <div className="absolute inset-4 rounded-full border border-zinc-800/20" />
        </motion.div>

        {/* Dot pattern */}
        <div className="absolute bottom-0 left-1/4 h-32 w-32 opacity-[0.02]">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={{
                left: `${(i % 3) * 40}%`,
                top: `${Math.floor(i / 3) * 40}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Left column - Header and photo placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="about-title"
              className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl"
            >
              Why me
            </h2>

            {/* Headshot placeholder */}
            <div className="mt-8 hidden lg:block">
              <div className="relative aspect-[3/4] w-48 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                {/* Placeholder content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800/50 to-zinc-900">
                  <User className="h-16 w-16 text-zinc-400" aria-hidden="true" />
                  <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-xs text-zinc-400">
                    Photo coming soon
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-zinc-700" />
              </div>

              {/* Caption */}
              <p className="mt-3 font-[family-name:var(--font-jetbrains)] text-xs text-zinc-400">
                Austin Mander
              </p>
            </div>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-zinc-300">
              I grew up building with AI. Not adapting to it — native to it.
            </p>

            <p className="text-lg leading-relaxed text-zinc-400">
              While most developers are still learning to work with these tools,
              I&apos;ve already shipped 550K lines of production code this way.
              It&apos;s not how I learned to build software. It&apos;s the only
              way I&apos;ve ever built software.
            </p>

            <p className="text-lg leading-relaxed text-zinc-300">
              You&apos;re not hiring someone who&apos;s adjusting. You&apos;re
              hiring someone who started here.
            </p>

            {/* Key stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-12 border-y border-zinc-800 py-6"
            >
              <div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                  550K
                </p>
                <p className="text-xs text-zinc-400">lines shipped</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                  AI
                </p>
                <p className="text-xs text-zinc-400">native</p>
              </div>
            </motion.div>

            <div className="border-l-2 border-white/20 pl-6 pt-2">
              <p className="text-lg leading-relaxed text-white">
                If you want someone who&apos;s adapting to AI, hire someone else.
              </p>
              <p className="mt-2 text-lg leading-relaxed text-zinc-300">
                If you want someone who&apos;s native to it, let&apos;s talk.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
