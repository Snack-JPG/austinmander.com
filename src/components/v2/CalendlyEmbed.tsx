"use client";

import { useEffect, useRef } from "react";

interface CalendlyEmbedProps {
  url?: string;
  height?: string;
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      closePopupWidget: () => void;
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

export function CalendlyEmbed({
  url = "https://calendly.com/austinmander/ai-audit",
  height = "700px",
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Load Calendly script if not already loaded
    if (!scriptLoaded.current) {
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.head.appendChild(script);
      }

      // Load Calendly CSS
      const existingCSS = document.querySelector(
        'link[href="https://assets.calendly.com/assets/external/widget.css"]'
      );

      if (!existingCSS) {
        const link = document.createElement("link");
        link.href = "https://assets.calendly.com/assets/external/widget.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }

      scriptLoaded.current = true;
    }

    // Initialize widget when script is ready
    const initWidget = () => {
      if (window.Calendly && containerRef.current) {
        // Clear any existing content
        containerRef.current.innerHTML = "";

        window.Calendly.initInlineWidget({
          url: `${url}?hide_gdpr_banner=1&background_color=0a0a0f&text_color=ffffff&primary_color=06b6d4`,
          parentElement: containerRef.current,
        });
      }
    };

    // Check if Calendly is already loaded
    if (window.Calendly) {
      initWidget();
    } else {
      // Wait for script to load
      const checkCalendly = setInterval(() => {
        if (window.Calendly) {
          clearInterval(checkCalendly);
          initWidget();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkCalendly), 10000);

      return () => clearInterval(checkCalendly);
    }
  }, [url]);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80">
      <div
        ref={containerRef}
        style={{ minHeight: height }}
        className="calendly-inline-widget"
      />
    </div>
  );
}
