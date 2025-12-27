"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

const recentBookings = [
  { name: "Sarah", company: "Creative Agency", location: "London", time: "2 hours ago" },
  { name: "James", company: "Marketing Consultancy", location: "Manchester", time: "5 hours ago" },
  { name: "Emma", company: "Design Studio", location: "Bristol", time: "Yesterday" },
  { name: "Michael", company: "Tech Consultancy", location: "Edinburgh", time: "2 days ago" },
];

export function SocialProofNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show first notification after 8 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(initialTimer);
  }, [dismissed]);

  useEffect(() => {
    if (!isVisible || dismissed) return;

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Show next notification after hiding
    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % recentBookings.length);
      setIsVisible(true);
    }, 25000); // Show every 25 seconds

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, currentIndex, dismissed]);

  const booking = recentBookings[currentIndex];

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm"
        >
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-sm">
            {/* Close button */}
            <button
              onClick={() => setDismissed(true)}
              className="absolute right-2 top-2 rounded-full p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Dismiss"
            >
              <X className="h-3 w-3" />
            </button>

            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 rounded-full bg-emerald-500/20 p-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pr-4">
                <p className="text-sm font-medium text-white">
                  {booking.name} from {booking.company}
                </p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Booked a free AI audit
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {booking.location} · {booking.time}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Animated counter for stats
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const incrementTime = (duration * 1000) / end;

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
              clearInterval(timer);
            }
          }, incrementTime);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${value}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span id={`counter-${value}`} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

// Floating badge for credibility
export function CredibilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed right-6 top-6 z-40 hidden lg:block"
    >
      <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-4 py-2 backdrop-blur-sm">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-cyan-400 to-blue-500"
              style={{ opacity: 1 - i * 0.2 }}
            />
          ))}
        </div>
        <span className="text-xs text-zinc-400">
          <span className="font-semibold text-white">12+</span> audits this month
        </span>
      </div>
    </motion.div>
  );
}
