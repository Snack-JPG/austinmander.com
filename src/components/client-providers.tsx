"use client";

import { BehaviorTrackingProvider } from "@/components/behavior-tracking";
import { SmartCTAWrapper } from "@/components/smart-cta-wrapper";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <BehaviorTrackingProvider>
      <SmartCTAWrapper>
        {children}
      </SmartCTAWrapper>
    </BehaviorTrackingProvider>
  );
}