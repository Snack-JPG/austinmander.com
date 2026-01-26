"use client";

import { SkipLink } from "@/components/v2/SkipLink";
import { HeaderNav } from "@/components/v2/HeaderNav";
import { HeroRedesign } from "@/components/v2/HeroRedesign";
import { ProblemSection } from "@/components/v2/ProblemSection";
import { SolutionSection } from "@/components/v2/SolutionSection";
import { HowItWorksRedesign } from "@/components/v2/HowItWorksRedesign";
import { ProofSection } from "@/components/v2/ProofSection";
import { AboutSection } from "@/components/v2/AboutSection";
import { FAQRedesign } from "@/components/v2/FAQRedesign";
import { FinalCTARedesign } from "@/components/v2/FinalCTARedesign";
import { FooterRedesign } from "@/components/v2/FooterRedesign";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <HeaderNav />
      <main id="main-content" className="overflow-x-hidden bg-[#0a0a0f]">
        <HeroRedesign />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksRedesign />
        <ProofSection />
        <AboutSection />
        <FAQRedesign />
        <FinalCTARedesign />
      </main>
      <FooterRedesign />
    </>
  );
}
