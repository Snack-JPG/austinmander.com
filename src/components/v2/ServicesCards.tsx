"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Cog, Layers, ArrowRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/austinmander/ai-audit";

const services = [
  {
    icon: Zap,
    title: "AI Workflow Audit",
    description: [
      "15-minute call to map your biggest time drains",
      "Walk away with 3 specific automations you could implement",
      "Free — no strings attached",
    ],
    price: "Free",
    featured: true,
  },
  {
    icon: Cog,
    title: "Single Automation Build",
    description: [
      "One workflow, fully automated",
      "Email sequences, report generation, data sync — you name it",
      "Documentation and training included",
    ],
    price: "From £750",
    featured: false,
  },
  {
    icon: Layers,
    title: "Full Automation System",
    description: [
      "Complete infrastructure for your business",
      "Multiple workflows, integrations, AI assistants",
      "Ongoing support included",
    ],
    price: "From £2,500",
    featured: false,
  },
];

export function ServicesCards() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
            What I Do
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 ${
                service.featured
                  ? "border-cyan-500/50 bg-gradient-to-b from-cyan-500/10 to-transparent"
                  : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
              }`}
            >
              {service.featured && (
                <div className="absolute right-4 top-4">
                  <span className="font-[family-name:var(--font-jetbrains)] text-xs font-medium uppercase tracking-wider text-cyan-400">
                    Start Here
                  </span>
                </div>
              )}

              <div
                className={`mb-4 inline-flex rounded-xl p-3 ${
                  service.featured
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                <service.icon className="h-6 w-6" />
              </div>

              <h3 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
                {service.title}
              </h3>

              <ul className="mb-6 space-y-3">
                {service.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-400">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p
                  className={`mb-4 font-[family-name:var(--font-jetbrains)] text-lg font-semibold ${
                    service.featured ? "text-cyan-400" : "text-white"
                  }`}
                >
                  {service.price}
                </p>

                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    service.featured
                      ? "bg-cyan-500 text-zinc-900 hover:bg-cyan-400"
                      : "bg-zinc-800 text-white hover:bg-zinc-700"
                  }`}
                >
                  Book Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
