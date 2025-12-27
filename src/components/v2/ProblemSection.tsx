"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function ProblemSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* Subtle gradient accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold leading-relaxed text-white sm:text-3xl lg:text-4xl"
        >
          You didn&apos;t start your business to copy data between spreadsheets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 space-y-4 text-lg leading-relaxed text-zinc-400 sm:text-xl"
        >
          <p>
            Or write the same status update emails every week. Or manually compile
            board reports. Or chase your team for updates that should just...{" "}
            <span className="text-zinc-300">exist.</span>
          </p>

          <p>
            Yet here you are. Doing work that doesn&apos;t need you, because setting up
            &ldquo;automation&rdquo; always felt like another project you don&apos;t have time for.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-xl font-medium text-cyan-400 sm:text-2xl"
        >
          That&apos;s where I come in.
        </motion.p>
      </div>
    </section>
  );
}
