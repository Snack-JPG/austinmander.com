"use client";

import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  FileText, 
  Calculator, 
  BookOpen, 
  CheckCircle,
  TrendingUp,
  Zap,
  Brain,
  Target,
  Users,
  Shield,
  ChartBar,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

const resources = [
  {
    id: "1",
    title: "AI Transformation Playbook",
    description: "Step-by-step guide to implementing AI in your organisation",
    category: "Guide",
    icon: BookOpen,
    pages: 45,
    format: "PDF",
    highlights: [
      "90-day implementation roadmap",
      "Change management templates",
      "ROI calculation framework",
      "Risk mitigation strategies"
    ],
    cta: "Download Playbook",
    featured: true
  },
  {
    id: "2",
    title: "Change Radar ROI Calculator",
    description: "Calculate the potential ROI of predictive intelligence for your programs",
    category: "Tool",
    icon: Calculator,
    pages: null,
    format: "Excel",
    highlights: [
      "Customisable for your industry",
      "3-year projection model",
      "Sensitivity analysis",
      "Board-ready outputs"
    ],
    cta: "Get Calculator",
    featured: true
  },
  {
    id: "3",
    title: "AI Readiness Assessment",
    description: "Evaluate your organisation's readiness for AI transformation",
    category: "Assessment",
    icon: Target,
    pages: 15,
    format: "Interactive",
    highlights: [
      "20-minute assessment",
      "Instant scoring",
      "Personalised recommendations",
      "Benchmark comparisons"
    ],
    cta: "Start Assessment",
    featured: false
  },
  {
    id: "4",
    title: "Executive's Guide to AI",
    description: "Cut through the hype with this practical guide for leaders",
    category: "White Paper",
    icon: Brain,
    pages: 25,
    format: "PDF",
    highlights: [
      "Vendor evaluation criteria",
      "Common pitfalls to avoid",
      "Investment framework",
      "Success metrics"
    ],
    cta: "Download Guide",
    featured: false
  },
  {
    id: "5",
    title: "Pilot SOW Template",
    description: "Ready-to-use statement of work for AI pilot projects",
    category: "Template",
    icon: FileText,
    pages: 12,
    format: "Word",
    highlights: [
      "Legal-approved language",
      "Clear deliverables",
      "Risk allocation",
      "Payment terms"
    ],
    cta: "Get Template",
    featured: false
  },
  {
    id: "6",
    title: "Transformation Risk Checklist",
    description: "Comprehensive checklist to identify and mitigate program risks",
    category: "Checklist",
    icon: Shield,
    pages: 8,
    format: "PDF",
    highlights: [
      "150+ risk indicators",
      "Mitigation strategies",
      "Early warning signals",
      "Action plans"
    ],
    cta: "Download Checklist",
    featured: false
  }
];

const categories = Array.from(new Set(resources.map(r => r.category)));

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredResources = selectedCategory 
    ? resources.filter(r => r.category === selectedCategory)
    : resources;

  const handleDownload = (resourceId: string) => {
    if (!email) {
      alert("Please enter your email to download resources");
      return;
    }
    
    setDownloadingId(resourceId);
    // Simulate download
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Download link sent to ${email}`);
    }, 2000);
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal/5 dark:from-slate-900 dark:via-slate-800 dark:to-teal/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy dark:text-white mb-6">
                Free AI Transformation Resources
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Practical tools, templates, and guides to accelerate your AI journey. 
                No fluff, just actionable resources that deliver results.
              </p>
              
              {/* Email Capture */}
              <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                <p className="text-sm font-semibold mb-3">
                  Enter your email to access all resources:
                </p>
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-teal hover:bg-teal/90">
                    Unlock Resources
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  We'll also send you weekly AI insights. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-teal" />
                  Most Popular Resources
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {resources.filter(r => r.featured).map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <Card key={resource.id} className="p-8 hover:shadow-xl transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-12 w-12 rounded-lg bg-teal/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-teal" />
                        </div>
                        <Badge>{resource.category}</Badge>
                      </div>
                      
                      <h3 className="text-2xl font-semibold mb-3">{resource.title}</h3>
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        {resource.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-teal mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {resource.pages && (
                            <span>{resource.pages} pages</span>
                          )}
                          <span>{resource.format}</span>
                        </div>
                        <Button 
                          onClick={() => handleDownload(resource.id)}
                          disabled={downloadingId === resource.id}
                          className="bg-teal hover:bg-teal/90"
                        >
                          {downloadingId === resource.id ? "Sending..." : resource.cta}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* All Resources */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">All Resources</h2>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === null ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedCategory === null ? 'bg-teal' : 'hover:bg-teal/10'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Resources
                  </Badge>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedCategory === category ? 'bg-teal' : 'hover:bg-teal/10'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-10 w-10 rounded-lg bg-teal/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-teal" />
                        </div>
                        <Badge variant="outline">{resource.category}</Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {resource.pages && `${resource.pages} pages • `}
                          {resource.format}
                        </div>
                        <Button 
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(resource.id)}
                          disabled={downloadingId === resource.id}
                        >
                          {downloadingId === resource.id ? "..." : "Download"}
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Custom Resources */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="p-12 bg-gradient-to-br from-navy to-slate-800 text-white">
                <Zap className="h-12 w-12 mx-auto mb-4 text-teal" />
                <h2 className="text-3xl font-bold mb-4">
                  Need Something Custom?
                </h2>
                <p className="text-lg mb-8 text-slate-200">
                  Get tailored resources for your specific industry and use case. 
                  Our team can create custom playbooks, assessments, and tools designed 
                  for your unique transformation challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-teal hover:bg-teal/90">
                    <Link href="/book">
                      Request Custom Resources
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20">
                    <Link href="/consulting">
                      Learn About Services
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-8">Trusted by Leaders Worldwide</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="text-4xl font-bold text-teal mb-2">50,000+</p>
                  <p className="text-muted-foreground">Downloads</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-teal mb-2">4.8/5</p>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-teal mb-2">120+</p>
                  <p className="text-muted-foreground">Countries</p>
                </div>
              </div>
              
              <div className="mt-12 space-y-4 max-w-2xl mx-auto">
                <Card className="p-4">
                  <p className="italic text-muted-foreground mb-2">
                    "The AI Transformation Playbook saved us months of planning. Clear, actionable, and immediately useful."
                  </p>
                  <p className="text-sm font-semibold">— Sarah K., CTO, FinTech Startup</p>
                </Card>
                
                <Card className="p-4">
                  <p className="italic text-muted-foreground mb-2">
                    "The ROI Calculator helped us build a bulletproof business case. Board approved our AI initiative in one meeting."
                  </p>
                  <p className="text-sm font-semibold">— Michael L., VP Innovation, Global Retailer</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <CTA 
          title="Ready to Go Beyond Templates?"
          description="Get expert guidance to turn these resources into real transformation."
          primaryText="Book Consultation"
          primaryHref="/book"
          secondaryText="Explore Services"
          secondaryHref="/consulting"
        />
      </main>
      <Footer />
    </>
  );
}