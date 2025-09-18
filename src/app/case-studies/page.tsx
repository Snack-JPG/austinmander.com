import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, Users, Target } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real-world AI transformation success stories. See how organisations achieved measurable results with our consulting and Change Radar platform.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal/5 dark:from-slate-900 dark:via-slate-800 dark:to-teal/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy dark:text-white mb-6">
                Real Results, Real Impact
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                See how leading organisations transformed their operations with AI consulting 
                and Change Radar's predictive intelligence.
              </p>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-teal">£40M+</p>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-teal">150+</p>
                  <p className="text-sm text-muted-foreground">Programs Transformed</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-teal">3.5x</p>
                  <p className="text-sm text-muted-foreground">Average ROI</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-teal">92%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-1 gap-12 max-w-4xl mx-auto">
              {caseStudies.map((study) => (
                <Card key={study.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <Badge variant="secondary" className="mb-3">
                          {study.industry}
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                          {study.title}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                          {study.client}
                        </p>
                      </div>
                      {study.featured && (
                        <Badge className="bg-teal text-white">Featured</Badge>
                      )}
                    </div>

                    {/* Challenge & Solution */}
                    <div className="mb-6">
                      <div className="mb-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">
                          Challenge
                        </h3>
                        <p className="text-base">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">
                          Solution
                        </h3>
                        <p className="text-base">{study.solution}</p>
                      </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {study.results.map((result, index) => (
                        <div key={index} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <p className="text-2xl font-bold text-teal">{result.value}</p>
                          <p className="text-xs text-muted-foreground">{result.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <blockquote className="border-l-4 border-teal pl-6 mb-6 italic text-muted-foreground">
                      "{study.testimonial.quote}"
                      <footer className="mt-2 not-italic">
                        <strong className="text-foreground">{study.testimonial.author}</strong>
                        <span className="text-sm"> — {study.testimonial.role}</span>
                      </footer>
                    </blockquote>

                    {/* Services & CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {study.services.map((service, index) => (
                          <Badge key={index} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild>
                        <Link href={`/case-studies/${study.slug}`}>
                          Read Full Story
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Breakdown */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                Success Across Industries
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI solutions adapt to any sector's unique challenges
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="p-6">
                <div className="h-12 w-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Financial Services</h3>
                <p className="text-muted-foreground mb-4">
                  Risk prediction, regulatory compliance, and portfolio management for banks and investment firms.
                </p>
                <Link href="/book" className="text-teal hover:underline font-medium">
                  Discuss your needs →
                </Link>
              </Card>

              <Card className="p-6">
                <div className="h-12 w-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Retail & E-commerce</h3>
                <p className="text-muted-foreground mb-4">
                  Digital transformation, inventory optimisation, and customer experience enhancement.
                </p>
                <Link href="/book" className="text-teal hover:underline font-medium">
                  Discuss your needs →
                </Link>
              </Card>

              <Card className="p-6">
                <div className="h-12 w-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Technology</h3>
                <p className="text-muted-foreground mb-4">
                  Scaling operations, product development acceleration, and engineering optimisation.
                </p>
                <Link href="/book" className="text-teal hover:underline font-medium">
                  Discuss your needs →
                </Link>
              </Card>
            </div>
          </div>
        </section>

        <CTA 
          title="Ready to Write Your Success Story?"
          description="Join these organisations in transforming with AI. Book a consultation to explore your potential."
          primaryText="Start Your Transformation"
          primaryHref="/book"
          secondaryText="Download Case Study Pack"
          secondaryHref="/resources"
        />
      </main>
      <Footer />
    </>
  );
}