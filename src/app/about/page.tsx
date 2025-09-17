import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/ui/card";
import { Award, Users, Target, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Austin Mander - AI Consultant and Product Creator",
};

const achievements = [
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "Leading transformations across multiple industries",
  },
  {
    icon: Users,
    title: "50+ Projects Delivered",
    description: "From startups to Fortune 500 companies",
  },
  {
    icon: Target,
    title: "£2M+ Value Created",
    description: "Measurable ROI for every engagement",
  },
  {
    icon: Briefcase,
    title: "Change Radar Founder",
    description: "Building AI products that solve real problems",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-6">
                About Austin Mander
              </h1>
              <p className="text-xl text-muted-foreground">
                AI Consultant, Product Creator, and Transformation Leader
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert mx-auto">
                <p>
                  I&apos;m Austin Mander, an AI consultant and product creator with over 15 years of experience leading digital transformations. I help organisations use AI to save leaders time, reduce risk, and deliver predictable change.
                </p>
                
                <h2>My Journey</h2>
                <p>
                  My career has taken me from software engineering to executive advisory roles, always focused on one thing: using technology to solve real business problems. I&apos;ve led transformations at companies ranging from nimble startups to Fortune 500 enterprises.
                </p>
                
                <p>
                  In 2023, I founded Change Radar after seeing too many transformation programs fail due to lack of predictive intelligence. The product now helps organisations anticipate risks before they become problems, saving leaders hours each week and dramatically improving project success rates.
                </p>

                <h2>My Approach</h2>
                <p>
                  I believe in pragmatic AI implementation - no black boxes, no buzzwords, just clear value delivery. Every engagement starts with understanding your specific challenges and ends with measurable results. I combine strategic consulting with hands-on product development to ensure ideas become reality.
                </p>

                <h2>What Sets Me Apart</h2>
                <ul>
                  <li><strong>Practitioner, not theorist:</strong> I build real AI products that solve real problems</li>
                  <li><strong>Results-focused:</strong> Every engagement has clear metrics and deliverables</li>
                  <li><strong>Full-stack capability:</strong> From strategy to implementation, I can execute end-to-end</li>
                  <li><strong>Proven track record:</strong> £2M+ in value created across 50+ projects</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {achievements.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="p-6 text-center">
                      <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-teal/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-teal" />
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}