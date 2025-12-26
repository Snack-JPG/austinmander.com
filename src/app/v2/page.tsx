"use client";

import { HeroRedesign } from "@/components/v2/HeroRedesign";
import { WhatIBuild } from "@/components/v2/WhatIBuild";
import { CurrentlyBuilding } from "@/components/v2/CurrentlyBuilding";
import { HowItWorksRedesign } from "@/components/v2/HowItWorksRedesign";
import { FAQRedesign } from "@/components/v2/FAQRedesign";
import { FinalCTARedesign } from "@/components/v2/FinalCTARedesign";
import { FooterRedesign } from "@/components/v2/FooterRedesign";

export default function V2Page() {
  return (
    <main className="overflow-x-hidden bg-[#0a0a0f]">
      <HeroRedesign />
      <WhatIBuild />
      <CurrentlyBuilding />
      <HowItWorksRedesign />
      <FAQRedesign />
      <FinalCTARedesign />
      <FooterRedesign />
    </main>
  );
}
