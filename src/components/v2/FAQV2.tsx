"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What kind of tasks can you automate?",
    answer:
      "Anything repetitive and rule-based. Common examples: email responses, report generation, data transfer between tools, client onboarding, invoice processing, status updates, and document creation. If you do it the same way every time, it can probably be automated.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Single automations: 1-2 weeks. Full systems: 4-8 weeks. I'll give you a specific timeline after the audit.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No. I build systems that non-technical people can use and maintain. You'll get documentation and training.",
  },
  {
    question: "What if I'm not sure what to automate?",
    answer:
      "That's what the free audit is for. Most people know they're wasting time but aren't sure where to start. I'll identify the opportunities.",
  },
  {
    question: "Why should I hire you instead of figuring it out myself?",
    answer:
      "You could. But the 20 hours you'd spend learning and implementing is 20 hours not spent on clients. I've already done the learning. You get the result without the ramp-up.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-zinc-800 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-cyan-400"
      >
        <span className="pr-4 text-lg font-medium text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-zinc-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-cyan-400" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 leading-relaxed text-zinc-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
