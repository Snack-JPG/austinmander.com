"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: "cost",
    question: "What does this cost?",
    answer:
      "It depends on what you need. AI audit is £1,500. Training starts at £1,500 for a half-day session. Build projects range from £5-20K depending on scope. We figure it out on the call — no surprises in the proposal.",
  },
  {
    id: "technical",
    question: "I'm not technical. Will I understand what you're building?",
    answer:
      "Yes. I explain everything in plain English. You'll always know what's happening and why. If I can't explain it simply, I don't understand it well enough.",
  },
  {
    id: "different",
    question: "How is this different from the AI workshops we've seen?",
    answer:
      "Most AI training is generic prompting tips with no follow-through. I build actual infrastructure (your knowledge in a system AI can query) and train your team on their workflows, not hypotheticals. And I stick around to make sure it works.",
  },
  {
    id: "doesnt-work",
    question: "What if we try this and it doesn't work?",
    answer:
      "We define success criteria before starting. If something isn't delivering, we fix it. I don't take your money and disappear.",
  },
  {
    id: "trust",
    question: "You're 21. Why should I trust you?",
    answer:
      "I've shipped 550K lines of production AI software. I'll show you the work before you pay anything. And if I can't help, I'll tell you on the first call — I'd rather say no than waste your time.",
  },
  {
    id: "obsolete",
    question: "What if AI changes and our setup becomes obsolete?",
    answer:
      "That's what ongoing support is for. AI will keep evolving — I keep your setup current. Claude 3 → Claude 4 → whatever's next. You don't need to track it; I do.",
  },
];

function FAQItem({
  id,
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  const headingId = `faq-heading-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b border-zinc-800"
    >
      <h3>
        <button
          id={headingId}
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between py-6 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
        >
          <span className="pr-8 text-base font-medium text-zinc-300 transition-colors group-hover:text-white sm:text-lg">
            {question}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 flex-shrink-0 text-zinc-400 transition-all duration-200 group-hover:text-zinc-400 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed text-zinc-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQRedesign() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="faq"
      ref={ref}
      aria-labelledby="faq-title"
      tabIndex={-1}
      className="relative bg-[#0f172a] px-6 py-24 lg:px-12 lg:py-32 focus:outline-none"
    >
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2
            id="faq-title"
            className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl"
          >
            Questions
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div role="list" aria-label="Frequently asked questions">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
