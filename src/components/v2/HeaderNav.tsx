"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalendlyButton } from "./CalendlyModal";

const CALENDLY_URL = "https://calendly.com/austinmander/discovery-call";

const navItems = [
  { name: "How it works", href: "#how-it-works" },
  { name: "Proof", href: "#proof" },
  { name: "About", href: "#about" },
  { name: "FAQ", href: "#faq" },
];

export function HeaderNav() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const mobileMenuId = "mobile-menu";

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Set focus to the section for accessibility
      (element as HTMLElement).focus({ preventScroll: true });
    }
  };

  return (
    <>
      <motion.header
        role="banner"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b border-zinc-800/50 bg-[#0f172a]/95 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav aria-label="Main navigation" className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Austin Mander - scroll to top"
              className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white transition-colors hover:text-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
            >
              Austin Mander
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden items-center gap-8 md:flex" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm font-medium text-zinc-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Desktop Social + CTA */}
            <div className="hidden items-center gap-4 md:flex">
              {/* Social Links */}
              <div className="flex items-center gap-1">
                <a
                  href="https://linkedin.com/in/austin-mander"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/Snack-JPG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <CalendlyButton
                url={CALENDLY_URL}
                className="group inline-flex items-center gap-2 border border-white bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:bg-transparent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
              >
                <span>Book a Call</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </CalendlyButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-zinc-400 transition-colors hover:text-white md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuId}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id={mobileMenuId}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0f172a] md:hidden"
          >
            <div className="flex h-full flex-col px-6 pt-20">
              <nav aria-label="Mobile navigation" className="flex-1 space-y-1">
                <ul role="list">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full border-b border-zinc-800/50 py-4 text-left text-lg font-medium text-zinc-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
                      >
                        {item.name}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-zinc-800/50 py-6">
                <CalendlyButton
                  url={CALENDLY_URL}
                  className="group flex w-full items-center justify-center gap-2 border border-white bg-white px-6 py-4 text-base font-semibold text-zinc-900 transition-all duration-300 hover:bg-transparent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
                >
                  <span>Book a Discovery Call</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </CalendlyButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
