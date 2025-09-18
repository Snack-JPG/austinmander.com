import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Brain, 
  Zap, 
  Users, 
  ChartBar, 
  Target, 
  Shield,
  Clock,
  TrendingUp,
  CheckCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Consulting Services",
  description: "Strategic AI consulting services to transform your organisation. From strategy to implementation, delivered by an expert with 15+ years experience.",
};

const services = [
  {
    title: "AI Strategy & Roadmap",
    icon: Brain,
    price: "£300/hour",
    duration: "2-4 weeks",
    description: "Define your AI vision and build a pragmatic roadmap for implementation",
    deliverables: [
      "AI maturity assessment",
      "Opportunity identification matrix",
      "90-day implementation roadmap",
      "Skills gap analysis",
      "ROI projections"
    ],
    ideal: "Organisations starting their AI journey"
  },
  {
    title: "Change Radar Pilot",
    icon: Zap,
    price: "£15,000 fixed",
    duration: "6 weeks",
    description: "Deploy predictive intelligence for your transformation programs",
    deliverables: [
      "Custom risk prediction models",
      "Integration with existing tools",
      "Leadership dashboards",
      "Team training",
      "Success metrics framework"
    ],
    ideal: "Companies running complex transformations"
  },
  {
    title: "AI Product Development",
    icon: Users,
    price: "From £50,000",
    duration: "3-6 months",
    description: "Build custom AI-powered tools tailored to your specific needs",
    deliverables: [
      "Full product development",
      "User research & design",
      "MVP to production deployment",
      "Team enablement",
      "Ongoing support"
    ],
    ideal: "Organisations needing bespoke solutions"
  },
  {
    title: "Executive AI Advisory",
    icon: Target,
    price: "£5,000/month",
    duration: "Ongoing",
    description: "On-demand strategic guidance for leadership teams",
    deliverables: [
      "Monthly strategy sessions",
      "Vendor evaluation support",
      "Risk assessment",
      "Board presentation support",
      "24/7 advisory access"
    ],
    ideal: "C-suite executives and boards"
  }
];

const process = [
  {
    step: 1,
    title: "Discovery",
    description: "We start with understanding your unique challenges, goals, and constraints"
  },
  {
    step: 2,
    title: "Design",
    description: "Co-create a solution that fits your culture, technology, and timeline"
  },
  {
    step: 3,
    title: "Deliver",
    description: "Implement with clear milestones, regular communication, and measurable outcomes"
  },
  {
    step: 4,
    title: "Sustain",
    description: "Ensure long-term success with knowledge transfer and ongoing support"
  }
];

const differentiators = [
  {
    icon: Clock,
    title: "Speed to Value",
    description: "First results in 2 weeks, not months"
  },
  {
    icon: Shield,
    title: "Risk-Free Pilot",
    description: "30-day money-back guarantee"
  },
  {
    icon: TrendingUp,
    title: "Proven ROI",
    description: "Average 3.2x return in 6 months"
  },
  {
    icon: ChartBar,
    title: "Data-Driven",
    description: "Every recommendation backed by evidence"
  }
];

export default function ConsultingPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal/5 dark:from-slate-900 dark:via-slate-800 dark:to-teal/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy dark:text-white mb-6">
                AI Consulting That Delivers Results, Not Reports
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Transform your organisation with pragmatic AI implementation. 
                No buzzwords, no black boxes — just measurable value in weeks, not years.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-teal hover:bg-teal/90">
                  <Link href="/book">Book Free Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                Consulting Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the engagement model that fits your needs and timeline
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-lg bg-teal/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-teal" />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-navy dark:text-white">
                          {service.price}
                        </p>
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    
                    <div className="mb-4">
                      <p className="font-medium mb-2">Deliverables:</p>
                      <ul className="space-y-1">
                        {service.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-start text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-teal mt-0.5 mr-2 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <p className="text-sm text-muted-foreground italic mb-4">
                      Ideal for: {service.ideal}
                    </p>
                    
                    <Button asChild className="w-full">
                      <Link href="/book">Get Started</Link>
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                How We Work Together
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A proven methodology that ensures successful outcomes
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {process.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-teal/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-teal">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                Why Work With Austin
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                What sets this consultancy apart from the rest
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="p-6 text-center">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-teal/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-teal" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-navy dark:text-white mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    How quickly can we see results?
                  </h3>
                  <p className="text-muted-foreground">
                    Most clients see initial value within 2 weeks. Our Change Radar pilot 
                    delivers working predictive models in 6 weeks, and strategic engagements 
                    produce actionable roadmaps in 2-4 weeks.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Do you work with our existing technology?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes. We integrate with your current tech stack including Jira, Monday.com, 
                    Salesforce, Microsoft 365, and most enterprise platforms. No rip-and-replace 
                    required.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    What industries do you specialise in?
                  </h3>
                  <p className="text-muted-foreground">
                    While industry-agnostic, we have deep experience in financial services, 
                    healthcare, retail, and technology sectors. Our methods adapt to any 
                    knowledge-work environment.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    What size companies do you work with?
                  </h3>
                  <p className="text-muted-foreground">
                    We work with organisations from £50M to £5B in revenue. The sweet spot is 
                    200-5,000 employees where transformation complexity justifies AI-powered 
                    intelligence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTA 
          title="Ready to Transform with AI?"
          description="Book a free 30-minute consultation to explore how AI can deliver measurable value to your organisation."
          primaryText="Book Consultation"
          primaryHref="/book"
          secondaryText="Download Service Guide"
          secondaryHref="/resources"
        />
      </main>
      <Footer />
    </>
  );
}