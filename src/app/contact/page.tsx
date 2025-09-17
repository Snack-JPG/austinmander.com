import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "./contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Austin Mander",
  description:
    "Get in touch about collaboration, consulting, or ambitious projects.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <div className="container px-4 py-12">
          <div className="mx-auto max-w-4xl space-y-16">
            {/* Header */}
            <SectionHeader
              title="Let's build something ambitious"
              subtitle="I prefer shipping demos over slides. Have a gnarly technical challenge or need AI systems that actually work? Let's talk."
            />

            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
