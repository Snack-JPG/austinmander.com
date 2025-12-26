"use client";

import { HeroV2 } from "@/components/v2/HeroV2";
import { ProblemSection } from "@/components/v2/ProblemSection";
import { ServicesCards } from "@/components/v2/ServicesCards";
import { ProofSection } from "@/components/v2/ProofSection";
import { HowItWorks } from "@/components/v2/HowItWorks";
import { FAQV2 } from "@/components/v2/FAQV2";
import { FinalCTA } from "@/components/v2/FinalCTA";
import { FooterV2 } from "@/components/v2/FooterV2";

export default function V2Page() {
  return (
    <main className="overflow-x-hidden">
      <HeroV2 />
      <ProblemSection />
      <ServicesCards />
      <ProofSection />
      <HowItWorks />
      <FAQV2 />
      <FinalCTA />
      <FooterV2 />
    </main>
  );
}
