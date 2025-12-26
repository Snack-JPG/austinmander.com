"use client";

import { useEffect, useState } from "react";

const INEFFICIENCIES = [
  "Manual Data Entry",
  "Repetitive Emails",
  "Status Updates",
  "Report Compilation",
  "Client Onboarding",
  "Invoice Processing",
];

export function RadarFallback() {
  const [visibleLabels, setVisibleLabels] = useState<number[]>([]);

  useEffect(() => {
    // Cycle through showing different labels
    const interval = setInterval(() => {
      setVisibleLabels((prev) => {
        const next = [...prev];
        // Add a new random label
        const available = INEFFICIENCIES.map((_, i) => i).filter(
          (i) => !next.includes(i)
        );
        if (available.length > 0) {
          const randomIndex = Math.floor(Math.random() * available.length);
          next.push(available[randomIndex]);
        }
        // Keep only last 3 labels
        if (next.length > 3) {
          next.shift();
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Position labels around the radar
  const labelPositions = [
    { x: 75, y: 20, align: "left" },
    { x: 85, y: 45, align: "left" },
    { x: 80, y: 70, align: "left" },
    { x: 20, y: 25, align: "right" },
    { x: 15, y: 55, align: "right" },
    { x: 25, y: 80, align: "right" },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* SVG Radar */}
      <svg
        viewBox="0 0 100 100"
        className="h-full max-h-[400px] w-full max-w-[400px]"
        style={{ transform: "perspective(500px) rotateX(15deg)" }}
      >
        <defs>
          {/* Gradient for sweep */}
          <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Center glow */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric circles */}
        {[40, 32, 24, 16].map((r, i) => (
          <circle
            key={i}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.3"
            opacity={0.3 - i * 0.05}
          />
        ))}

        {/* Cross lines */}
        {[0, 45, 90, 135].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="50"
            x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
            y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
            stroke="#3b82f6"
            strokeWidth="0.2"
            opacity="0.2"
          />
        ))}
        {[0, 45, 90, 135].map((angle) => (
          <line
            key={`neg-${angle}`}
            x1="50"
            y1="50"
            x2={50 - 40 * Math.cos((angle * Math.PI) / 180)}
            y2={50 - 40 * Math.sin((angle * Math.PI) / 180)}
            stroke="#3b82f6"
            strokeWidth="0.2"
            opacity="0.2"
          />
        ))}

        {/* Animated sweep */}
        <g className="origin-center animate-spin" style={{ animationDuration: "8s" }}>
          {/* Sweep trail */}
          <path
            d="M 50 50 L 90 50 A 40 40 0 0 0 78.28 21.72 Z"
            fill="url(#sweepGradient)"
            opacity="0.3"
          />
          {/* Sweep line */}
          <line
            x1="50"
            y1="50"
            x2="90"
            y2="50"
            stroke="#06b6d4"
            strokeWidth="0.5"
            filter="url(#glow)"
          />
        </g>

        {/* Center glow */}
        <circle cx="50" cy="50" r="6" fill="url(#centerGlow)" />
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="#06b6d4"
          filter="url(#glow)"
        />
      </svg>

      {/* Floating labels */}
      {INEFFICIENCIES.map((label, i) => {
        const pos = labelPositions[i];
        const isVisible = visibleLabels.includes(i);

        return (
          <div
            key={i}
            className={`absolute flex items-center gap-2 transition-all duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `translateX(${pos.align === "right" ? "-100%" : "0"})`,
            }}
          >
            {pos.align === "right" && (
              <span className="font-[family-name:var(--font-jetbrains)] text-xs text-white sm:text-sm">
                {label}
              </span>
            )}
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            {pos.align === "left" && (
              <span className="font-[family-name:var(--font-jetbrains)] text-xs text-white sm:text-sm">
                {label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Check if WebGL is supported
export function isWebGLSupported(): boolean {
  if (typeof window === "undefined") return true; // SSR - assume supported

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return gl instanceof WebGLRenderingContext;
  } catch {
    return false;
  }
}
