"use client";

import { useEffect, useCallback } from "react";

interface CalendlyModalProps {
  url?: string;
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

// Load Calendly scripts once
let scriptsLoaded = false;

function loadCalendlyScripts(): Promise<void> {
  return new Promise((resolve) => {
    if (scriptsLoaded && window.Calendly) {
      resolve();
      return;
    }

    // Load CSS
    const existingCSS = document.querySelector(
      'link[href="https://assets.calendly.com/assets/external/widget.css"]'
    );
    if (!existingCSS) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // Load JS
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        scriptsLoaded = true;
        resolve();
      };
      document.head.appendChild(script);
    } else {
      scriptsLoaded = true;
      resolve();
    }
  });
}

export function useCalendlyModal(url: string = "https://calendly.com/austinmander/ai-audit") {
  const openCalendly = useCallback(async () => {
    await loadCalendlyScripts();

    // Wait a bit for Calendly to initialize
    const waitForCalendly = () => {
      return new Promise<void>((resolve) => {
        if (window.Calendly) {
          resolve();
        } else {
          const check = setInterval(() => {
            if (window.Calendly) {
              clearInterval(check);
              resolve();
            }
          }, 50);
          setTimeout(() => clearInterval(check), 5000);
        }
      });
    };

    await waitForCalendly();

    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: `${url}?hide_gdpr_banner=1&background_color=0a0a0f&text_color=ffffff&primary_color=06b6d4`,
      });
    }
  }, [url]);

  return { openCalendly };
}

// Preload scripts on component mount
export function CalendlyPreload() {
  useEffect(() => {
    loadCalendlyScripts();
  }, []);

  return null;
}

// Button component that opens Calendly modal
interface CalendlyButtonProps extends CalendlyModalProps {
  children: React.ReactNode;
  className?: string;
}

export function CalendlyButton({
  url = "https://calendly.com/austinmander/ai-audit",
  children,
  className = "",
}: CalendlyButtonProps) {
  const { openCalendly } = useCalendlyModal(url);

  return (
    <button
      onClick={openCalendly}
      className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a] ${className}`}
      type="button"
      aria-label="Book a discovery call - opens Calendly scheduling"
    >
      {children}
    </button>
  );
}
