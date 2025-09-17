import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/Hero";
import { ServicesOverview } from "@/components/ServicesOverview";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <Hero />
        <ServicesOverview />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}