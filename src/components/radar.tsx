"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface RadarProps {
  className?: string;
}

export function Radar({ className }: RadarProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="h-full w-full opacity-25"
      >
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background circles */}
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.1"
        />

        {/* Radar sweep */}
        <motion.path
          d="M 100 100 L 100 10 A 90 90 0 0 1 190 100 Z"
          fill="url(#radarGradient)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Center dot */}
        <circle cx="100" cy="100" r="3" fill="currentColor" opacity="0.8" />

        {/* Crosshairs */}
        <line
          x1="100"
          y1="10"
          x2="100"
          y2="190"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
        <line
          x1="10"
          y1="100"
          x2="190"
          y2="100"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}
