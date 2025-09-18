"use client";

import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";
import { 
  Radar,
  TrendingUp,
  AlertTriangle,
  Clock,
  Users,
  ChartBar,
  Shield,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  BarChart3,
  Brain,
  Bell,
  Target
} from "lucide-react";

const features = [
  {
    icon: Radar,
    title: "Predictive Risk Intelligence",
    description: "AI-powered models predict program risks 4-6 weeks before they materialise, giving you time to intervene."
  },
  {
    icon: Brain,
    title: "Natural Language Insights",
    description: "Ask questions in plain English. Get instant answers about any aspect of your transformation."
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Receive contextual notifications when attention is needed, not constant noise."
  },
  {
    icon: ChartBar,
    title: "Pattern Recognition",
    description: "Learn from historical data to identify what worked and what didn't across all programs."
  },
  {
    icon: Users,
    title: "Stakeholder Alignment",
    description: "Automated sentiment analysis across teams highlights misalignment before it becomes conflict."
  },
  {
    icon: Target,
    title: "Success Prediction",
    description: "Know your probability of on-time, on-budget delivery at any point in the program."
  }
];

const benefits = [
  { metric: "8+ hours", description: "saved per leader per week" },
  { metric: "45%", description: "fewer program delays" },
  { metric: "30%", description: "faster decision-making" },
  { metric: "3.2x", description: "ROI in 6 months" }
];

const pricingTiers = [
  {
    name: "Pilot",
    price: "£15,000",
    duration: "6 weeks",
    description: "Prove value with one program",
    features: [
      "1 transformation program",
      "Up to 50 users",
      "Core risk predictions",
      "Weekly insights report",
      "Email support",
      "Success metrics dashboard"
    ],
    cta: "Start Pilot",
    highlighted: false
  },
  {
    name: "Enterprise",
    price: "£5,000",
    duration: "per month",
    description: "Scale across your portfolio",
    features: [
      "Unlimited programs",
      "Unlimited users",
      "Advanced ML models",
      "Real-time insights",
      "24/7 support",
      "Custom integrations",
      "Executive dashboards",
      "Quarterly reviews"
    ],
    cta: "Book Demo",
    highlighted: true
  },
  {
    name: "Transform",
    price: "Custom",
    duration: "annual",
    description: "Full transformation partnership",
    features: [
      "Everything in Enterprise",
      "Custom model training",
      "Dedicated success manager",
      "On-site workshops",
      "Board presentations",
      "Change management support",
      "ROI guarantee"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

const integrations = [
  "Jira", "Monday.com", "Asana", "Microsoft Project", 
  "Smartsheet", "Slack", "Teams", "ServiceNow"
];

const faqs = [
  {
    question: "How does Change Radar predict risks?",
    answer: "Change Radar uses machine learning models trained on thousands of transformation programs. It analyses patterns in project data, team communications, and historical outcomes to identify early warning signals of potential issues."
  },
  {
    question: "What data do you need from us?",
    answer: "We integrate with your existing project management tools and communication platforms. No manual data entry required. The system learns from your historical data and improves predictions over time."
  },
  {
    question: "How long does implementation take?",
    answer: "Initial setup takes 2-3 days. You'll see first insights within a week, and the full pilot runs for 6 weeks to demonstrate value across a complete program cycle."
  },
  {
    question: "Is our data secure?",
    answer: "Absolutely. Change Radar is SOC2 certified, GDPR compliant, and uses bank-level encryption. Your data never leaves your region, and we never share data between clients."
  },
  {
    question: "What if it doesn't work for us?",
    answer: "We offer a 30-day money-back guarantee. If you don't see value in the first month, we'll refund your pilot fee in full."
  }
];

const caseMetrics = [
  {
    company: "Global Bank",
    metric: "62%",
    description: "reduction in project overruns"
  },
  {
    company: "Retail Chain",
    metric: "£2.3M",
    description: "saved in 6 months"
  },
  {
    company: "Tech Firm",
    metric: "9 hours",
    description: "weekly time saved per exec"
  }
];

export default function ChangeRadarPage() {
  const [selectedTab, setSelectedTab] = useState("features");

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-navy via-slate-800 to-teal/20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-teal/20 text-teal border-teal/30">
                AI-Powered Transformation Intelligence
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Change Radar
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-slate-200">
                Predict and prevent transformation failure before it happens
              </p>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                The only AI platform that gives you predictive intelligence across all your transformation programs. 
                See risks 6 weeks early. Save 8+ hours per week. Deliver on time, every time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="bg-teal hover:bg-teal/90">
                  <Link href="/book">Book Demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20">
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl font-bold text-teal">{benefit.metric}</p>
                    <p className="text-sm text-slate-300">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold text-red-600 mb-4">The Problem</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">70% of transformations fail to deliver expected value</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Leaders spend 40% of time in status meetings</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Risks surface too late to prevent impact</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">No learning from past program failures</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-teal mb-4">The Solution</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">AI predicts risks 4-6 weeks before they occur</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Automated insights replace status meetings</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Proactive alerts enable early intervention</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Pattern recognition improves future planning</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                Intelligent Features That Drive Results
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every feature is designed to save time, reduce risk, and improve outcomes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="h-10 w-10 rounded-lg bg-teal/10 flex items-center justify-center mr-4">
                        <Icon className="h-5 w-5 text-teal" />
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                How Change Radar Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From setup to insights in days, not months
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-teal text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">Connect Your Tools</h3>
                    <p className="text-muted-foreground">
                      Integrate with your existing project management and communication platforms. 
                      No manual data entry, no disruption to workflows.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-teal text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">AI Analyses Patterns</h3>
                    <p className="text-muted-foreground">
                      Machine learning models analyse your data to identify risk patterns, 
                      stakeholder sentiment, and success indicators across all programs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-teal text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">Receive Predictive Insights</h3>
                    <p className="text-muted-foreground">
                      Get weekly reports, real-time alerts, and on-demand answers to any question 
                      about your transformation portfolio.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-teal text-white flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">Take Action Early</h3>
                    <p className="text-muted-foreground">
                      With 4-6 weeks advance warning of risks, you have time to intervene, 
                      adjust resources, and keep programs on track.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start with a pilot to prove value, then scale across your organisation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <Card 
                  key={index} 
                  className={`p-8 relative ${tier.highlighted ? 'border-teal shadow-xl' : ''}`}
                >
                  {tier.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal text-white">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-navy dark:text-white">{tier.price}</span>
                      <span className="text-muted-foreground ml-2">/{tier.duration}</span>
                    </div>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    className={`w-full ${tier.highlighted ? 'bg-teal hover:bg-teal/90' : ''}`}
                    variant={tier.highlighted ? 'default' : 'outline'}
                  >
                    <Link href="/book">{tier.cta}</Link>
                  </Button>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                All plans include: 30-day money-back guarantee • No setup fees • Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* Case Metrics */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                Proven Results Across Industries
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {caseMetrics.map((item, index) => (
                <Card key={index} className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                  <p className="text-4xl font-bold text-teal mb-2">{item.metric}</p>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href="/case-studies">
                  Read Full Case Studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                Works With Your Existing Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Seamless integration with the platforms you already use
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {integrations.map((integration, index) => (
                <Badge key={index} variant="secondary" className="px-6 py-3 text-base">
                  {integration}
                </Badge>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Don't see your tool? We add new integrations monthly. <Link href="/contact" className="text-teal hover:underline">Contact us</Link>
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-navy dark:text-white mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTA 
          title="See Change Radar in Action"
          description="Book a personalised demo to see how Change Radar can transform your organisation's delivery capability."
          primaryText="Book Demo"
          primaryHref="/book"
          secondaryText="Download Brochure"
          secondaryHref="/resources"
        />
      </main>
      <Footer />
    </>
  );
}