import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Austin Mander",
  description:
    "Systems‑minded builder treating AI as leverage. Architect software like products, not projects.",
  openGraph: {
    title: "About - Austin Mander",
    description:
      "Systems‑minded builder treating AI as leverage. Architect software like products, not projects.",
    images: [
      {
        url: "/og?title=About Austin Mander&subtitle=Systems‑minded builder treating AI as leverage&type=about",
        width: 1200,
        height: 630,
        alt: "About Austin Mander",
      },
    ],
  },
};

const techStack = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Supabase",
  "Vercel",
  "Docker",
  "PostgreSQL",
  "Tailwind CSS",
  "Claude",
  "Cursor",
];

const principles = [
  {
    title: "Speed over perfection",
    description: "Ship fast, iterate faster. Perfect is the enemy of deployed.",
  },
  {
    title: "AI as force multiplier",
    description:
      "Don't replace humans—amplify them. AI handles the routine, I focus on the strategic.",
  },
  {
    title: "Products, not projects",
    description:
      "Build for longevity. Testable, maintainable, and actually useful in production.",
  },
  {
    title: "Fewer meetings, more momentum",
    description:
      "Async-first communication. Deep work over shallow coordination.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <div className="container px-4 py-12">
          <div className="mx-auto max-w-4xl space-y-16">
            {/* Header */}
            <SectionHeader
              title="Building at the intersection of AI and ambition"
              subtitle="I'm Austin, a systems‑minded builder who treats AI as leverage. I architect software like products, not projects: testable, repeatable, and shipped fast."
            />

            {/* Bio */}
            <div className="prose prose-lg max-w-none">
              <p className="text-text-weak leading-relaxed">
                Previously, I spent years in data, analytics, and PMO
                tooling—watching teams struggle with slow, manual processes. Now
                I build solutions that compound: systems that get smarter over
                time, workflows that eliminate friction, and tools that make the
                impossible feel routine.
              </p>

              <p className="text-text-weak leading-relaxed">
                My approach is simple: use AI to handle the repetitive work so
                humans can focus on the creative and strategic. Every project
                starts with the question: &ldquo;How can we make this 10x faster
                without breaking anything important?&rdquo;
              </p>
            </div>

            {/* Principles */}
            <div className="space-y-8">
              <h2 className="text-foreground text-2xl font-semibold">
                Philosophy
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {principles.map((principle, index) => (
                  <Card key={index} className="border-border/50 bg-card/30">
                    <CardContent className="p-6">
                      <h3 className="text-foreground mb-2 font-semibold">
                        {principle.title}
                      </h3>
                      <p className="text-text-weak text-sm">
                        {principle.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-6">
              <h2 className="text-foreground text-2xl font-semibold">
                Current Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Pill key={tech} variant="accent">
                    {tech}
                  </Pill>
                ))}
              </div>
              <p className="text-text-weak text-sm">
                Always evolving. I pick tools based on speed to ship, not hype
                cycles.
              </p>
            </div>

            {/* CTA */}
            <Card className="border-accent-primary/20 bg-accent-primary/5">
              <CardContent className="space-y-4 p-8 text-center">
                <h2 className="text-foreground text-2xl font-semibold">
                  Have a gnarly idea?
                </h2>
                <p className="text-text-weak mx-auto max-w-2xl">
                  I prefer shipping demos over slides. If you have a stack that
                  needs force‑multiplying or an ambitious project that demands
                  speed, let&apos;s talk.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    asChild
                    className="bg-accent-primary hover:bg-accent-primary/90 text-white"
                  >
                    <a href="/contact" className="group">
                      <Mail className="mr-2 h-4 w-4" />
                      Get in touch
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/work">See the work →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
