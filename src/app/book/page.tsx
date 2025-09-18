"use client";

import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle, 
  Target,
  Zap,
  Brain,
  Users,
  TrendingUp,
  MessageSquare,
  Shield,
  ChartBar
} from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/config";

const meetingTypes = [
  {
    id: "discovery",
    title: "Discovery Call",
    duration: "30 minutes",
    description: "Explore how AI can transform your organisation",
    icon: Brain,
    highlights: [
      "Discuss your challenges and goals",
      "Identify quick wins and strategic opportunities",
      "Get personalised recommendations",
      "No sales pressure"
    ],
    ideal: "Leaders exploring AI transformation",
    color: "teal"
  },
  {
    id: "demo",
    title: "Change Radar Demo",
    duration: "45 minutes",
    description: "See predictive intelligence in action",
    icon: Zap,
    highlights: [
      "Live demonstration of Change Radar",
      "Use cases for your industry",
      "ROI projections",
      "Implementation timeline"
    ],
    ideal: "Organisations with active transformation programs",
    color: "blue"
  },
  {
    id: "consultation",
    title: "Strategic Consultation",
    duration: "60 minutes",
    description: "Deep dive into your AI strategy",
    icon: Target,
    highlights: [
      "Comprehensive assessment",
      "Roadmap development",
      "Budget and resource planning",
      "Risk mitigation strategies"
    ],
    ideal: "Executives ready to move forward",
    color: "purple"
  }
];

const benefits = [
  {
    icon: CheckCircle,
    title: "No Obligation",
    description: "Free consultation with no strings attached"
  },
  {
    icon: Shield,
    title: "Confidential",
    description: "Your information is kept strictly confidential"
  },
  {
    icon: TrendingUp,
    title: "Actionable Insights",
    description: "Leave with concrete next steps"
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "15+ years of transformation experience"
  }
];

const faqs = [
  {
    question: "What should I prepare for the call?",
    answer: "Nothing required, but having a brief overview of your current challenges and transformation initiatives helps make the conversation more productive."
  },
  {
    question: "Who should be on the call?",
    answer: "Ideally, someone with decision-making authority and understanding of your transformation programs. You're welcome to bring team members."
  },
  {
    question: "What happens after the call?",
    answer: "You'll receive a summary of our discussion with recommended next steps. There's no obligation to proceed, but I'm here if you need help."
  },
  {
    question: "Can we sign an NDA first?",
    answer: "Absolutely. I'm happy to sign your NDA before our call. Just send it over when you book."
  }
];

export default function BookPage() {
  const [selectedType, setSelectedType] = useState("discovery");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would integrate with Calendly or another booking system
    window.open(siteConfig.calendly.url, '_blank');
  };

  const selectedMeeting = meetingTypes.find(m => m.id === selectedType)!;
  const Icon = selectedMeeting.icon;

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal/5 dark:from-slate-900 dark:via-slate-800 dark:to-teal/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy dark:text-white mb-6">
                Let's Explore Your AI Transformation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Book a free consultation to discuss how AI can save your leaders time, 
                reduce risk, and deliver predictable change.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Video className="h-5 w-5" />
                  <span>Video call via Teams/Zoom</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>30-60 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span>Usually within 48 hours</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Meeting Type Selection */}
                <div className="lg:col-span-1">
                  <h2 className="text-xl font-semibold mb-4">1. Select Meeting Type</h2>
                  <div className="space-y-3">
                    {meetingTypes.map((type) => {
                      const TypeIcon = type.icon;
                      return (
                        <Card 
                          key={type.id}
                          className={`p-4 cursor-pointer transition-all ${
                            selectedType === type.id 
                              ? 'border-teal shadow-lg' 
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedType(type.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`h-10 w-10 rounded-lg bg-${type.color}/10 flex items-center justify-center flex-shrink-0`}>
                              <TypeIcon className={`h-5 w-5 text-${type.color}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{type.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {type.duration}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {type.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Meeting Details & Form */}
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">2. Meeting Details</h2>
                  
                  <Card className="p-6 mb-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="h-12 w-12 rounded-lg bg-teal/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-teal" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2">{selectedMeeting.title}</h3>
                        <p className="text-muted-foreground mb-1">{selectedMeeting.description}</p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Ideal for:</strong> {selectedMeeting.ideal}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3">What we'll cover:</h4>
                      <ul className="space-y-2">
                        {selectedMeeting.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-teal mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Work Email *
                          </label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Company *
                          </label>
                          <Input
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            placeholder="Acme Corp"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Role *
                          </label>
                          <Input
                            required
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            placeholder="CTO"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          What would you like to discuss? (Optional)
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Tell me about your current challenges or transformation initiatives..."
                          rows={4}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-teal hover:bg-teal/90">
                        <Calendar className="mr-2 h-5 w-5" />
                        Schedule {selectedMeeting.title}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By booking, you agree to our <a href="/privacy" className="underline">privacy policy</a>. 
                        We'll send a calendar invite and reminder. No spam, ever.
                      </p>
                    </form>
                  </Card>

                  {/* Alternative Booking */}
                  <Card className="p-6 bg-slate-50 dark:bg-slate-800">
                    <h3 className="font-semibold mb-3">Prefer to Connect Directly?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      If you'd rather skip the form, feel free to reach out directly:
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>Email:</strong> {siteConfig.links.email}
                      </p>
                      <p className="text-sm">
                        <strong>LinkedIn:</strong>{" "}
                        <a href={siteConfig.links.linkedin} className="text-teal hover:underline">
                          Connect on LinkedIn
                        </a>
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-12">
                Why Book a Consultation?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                        <BenefitIcon className="h-5 w-5 text-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 text-center bg-teal/5 border-teal/20">
                <MessageSquare className="h-10 w-10 text-teal mx-auto mb-4" />
                <blockquote className="text-lg italic mb-4">
                  "The discovery call exceeded my expectations. Austin quickly understood our challenges 
                  and provided actionable insights we could implement immediately. No sales pitch, 
                  just genuine expertise and practical advice."
                </blockquote>
                <footer>
                  <strong>David Richardson</strong>
                  <p className="text-sm text-muted-foreground">Chief Digital Officer, Global Logistics Firm</p>
                </footer>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}