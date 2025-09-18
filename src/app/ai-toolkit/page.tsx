"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sparkles,
  Clock,
  TrendingUp,
  Shield,
  Users,
  Brain,
  Zap,
  Target,
  ChartBar,
  MessageSquare,
  Download,
  ArrowRight,
  CheckCircle,
  Star,
  Lock,
  Unlock,
  Copy,
  BookOpen,
  Settings
} from "lucide-react";
import { aiPrompts, promptCategories, getFreePrompts } from "@/lib/ai-prompts";

const categoryIcons: Record<string, any> = {
  "Executive & Strategy": Brain,
  "Project Management": Target,
  "Risk & Compliance": Shield,
  "Meetings & Communication": MessageSquare,
  "Data & Analytics": ChartBar,
  "Customer & Sales": Users,
  "Operations & Process": Zap,
  "Innovation & R&D": Sparkles,
  "Finance & Budgeting": TrendingUp,
  "HR & Team Management": Users
};

const stats = [
  { label: "Ready-to-Use Prompts", value: "50+" },
  { label: "Time Saved Per Week", value: "10+ hrs" },
  { label: "Average ROI", value: "320%" },
  { label: "Companies Using", value: "500+" }
];

const testimonials = [
  {
    quote: "These prompts saved me 15 hours in my first week. The board report generator alone is worth gold.",
    author: "Sarah Chen",
    role: "COO, TechScale",
    rating: 5
  },
  {
    quote: "Finally, AI prompts that actually work in the real world. No fluff, just results.",
    author: "Marcus Williams",
    role: "VP Engineering, DataFlow",
    rating: 5
  }
];

export default function AIToolkitPage() {
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const freePrompts = getFreePrompts();
  const displayPrompts = selectedCategory 
    ? aiPrompts.filter(p => p.category === selectedCategory)
    : aiPrompts;

  const handleCopyPrompt = (promptId: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(promptId);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const handleDownloadPlaybook = () => {
    if (!email) {
      setShowEmailCapture(true);
      return;
    }
    // In production, this would trigger email capture and download
    alert(`Playbook will be sent to ${email}`);
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal/5 dark:from-slate-900 dark:via-slate-800 dark:to-teal/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-6 bg-teal/10 text-teal-700 dark:text-teal-300 border-teal/30 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2 inline" />
                AI Toolkit — Free Resources
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-navy dark:text-white">
                50 AI Prompts That Save 10+ Hours Every Week
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                The exact prompts I charge £5,000 to implement at Fortune 500 companies. 
                <span className="text-teal dark:text-teal-400 font-semibold"> Steal them all. Seriously.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-teal hover:bg-teal/90"
                  onClick={() => document.getElementById('prompts')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Unlock className="mr-2 h-5 w-5" />
                  Browse Free Prompts
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-navy/30 hover:bg-navy/5 dark:border-white/30 dark:hover:bg-white/10"
                  onClick={handleDownloadPlaybook}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Full Playbook (PDF)
                </Button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-navy/5 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-3xl font-bold text-teal dark:text-teal-400">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why These Prompts Are Different</h2>
                <p className="text-lg text-muted-foreground">
                  Most AI prompts are generic garbage. These are battle-tested in real companies, solving real problems.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-teal/10 dark:bg-teal/20 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-teal dark:text-teal-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Hyper-Specific</h3>
                  <p className="text-sm text-muted-foreground">
                    Not "write a report". Instead: "Transform project chaos into 3-slide board summary in 5 minutes"
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-teal/10 dark:bg-teal/20 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-teal dark:text-teal-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Time-Valued</h3>
                  <p className="text-sm text-muted-foreground">
                    Every prompt shows exactly how much time it saves. Most save 2-3 hours per use.
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-teal/10 dark:bg-teal/20 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-teal dark:text-teal-400" />
                  </div>
                  <h3 className="font-semibold mb-2">ROI-Proven</h3>
                  <p className="text-sm text-muted-foreground">
                    Used by 500+ companies with average 320% ROI. These aren't experiments, they're proven.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Prompts Section */}
        <section id="prompts" className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The Prompt Library
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {freePrompts.length} free prompts to try now. Full library of 50+ in the downloadable playbook.
                </p>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant={selectedCategory === null ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 ${
                      selectedCategory === null ? 'bg-teal hover:bg-teal/90' : 'hover:bg-teal/10 dark:hover:bg-teal/20'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </Badge>
                  {promptCategories.map((category) => {
                    const Icon = categoryIcons[category];
                    return (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 ${
                          selectedCategory === category ? 'bg-teal hover:bg-teal/90' : 'hover:bg-teal/10 dark:hover:bg-teal/20'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {category}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Prompt Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {displayPrompts.slice(0, 10).map((prompt) => {
                  const CategoryIcon = categoryIcons[prompt.category] || Brain;
                  return (
                    <Card key={prompt.id} className="relative overflow-hidden hover:shadow-xl transition-shadow">
                      {!prompt.isFree && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                            <Lock className="h-3 w-3 mr-1" />
                            Pro
                          </Badge>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-teal/10 dark:bg-teal/20 flex items-center justify-center">
                              <CategoryIcon className="h-5 w-5 text-teal dark:text-teal-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{prompt.title}</h3>
                              <p className="text-sm text-muted-foreground">{prompt.category}</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {prompt.description}
                        </p>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-teal dark:text-teal-400" />
                            <span className="font-medium">Time to value:</span>
                            <span className="text-muted-foreground">{prompt.timeToValue}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Target className="h-4 w-4 text-teal dark:text-teal-400" />
                            <span className="font-medium">Difficulty:</span>
                            <Badge variant="outline" className="text-xs">
                              {prompt.difficulty}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {prompt.tools.map((tool, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-sm font-medium mb-2">Business Value:</p>
                          <ul className="space-y-1">
                            {prompt.businessValue.slice(0, 2).map((value, idx) => (
                              <li key={idx} className="flex items-start text-xs text-muted-foreground">
                                <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                                {value}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 flex gap-2">
                          {prompt.isFree ? (
                            <>
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleCopyPrompt(prompt.id, prompt.systemPrompt + "\n\n" + prompt.userPromptTemplate)}
                              >
                                {copiedPrompt === prompt.id ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy Prompt
                                  </>
                                )}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                asChild
                              >
                                <Link href={`/ai-toolkit/prompts/${prompt.id}`}>
                                  View Details
                                  <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                              </Button>
                            </>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="w-full"
                              onClick={handleDownloadPlaybook}
                            >
                              <Lock className="h-4 w-4 mr-2" />
                              Unlock in Full Playbook
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Load More / CTA */}
              <div className="mt-12 text-center">
                <Card className="p-8 bg-gradient-to-br from-teal/5 to-white dark:from-teal/10 dark:to-slate-800 border-teal/20 dark:border-teal/30">
                  <h3 className="text-2xl font-bold mb-4">
                    Get All 50+ Prompts in the Complete Playbook
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Includes implementation guides, ROI calculators, case studies, and weekly prompt updates. 
                    The same playbook I use with enterprise clients.
                  </p>
                  
                  {showEmailCapture ? (
                    <div className="max-w-md mx-auto">
                      <div className="flex gap-3 mb-4">
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          onClick={handleDownloadPlaybook}
                          className="bg-teal hover:bg-teal/90"
                        >
                          Send Playbook
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        We'll also send you weekly AI insights. Unsubscribe anytime.
                      </p>
                    </div>
                  ) : (
                    <Button 
                      size="lg" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setShowEmailCapture(true)}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Complete AI Playbook (Free)
                    </Button>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-12">
                What Leaders Are Saying
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Resources */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-12">
                Complete AI Transformation Toolkit
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Automation Workflows</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    10 ready-to-implement workflows that run on autopilot
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/ai-toolkit/workflows">
                      Explore Workflows
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Settings className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Curated AI Tools</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    No-BS reviews of 50+ AI tools with real costs & ROI
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/ai-toolkit/tools">
                      View Tool Reviews
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Implementation Guides</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Step-by-step guides to deploy AI across your org
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/resources">
                      Access Guides
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <CTA 
          title="Want Help Implementing These at Scale?"
          description="I help organisations deploy these prompts company-wide with training, customisation, and success tracking."
          primaryText="Book Implementation Call"
          primaryHref="/book"
          secondaryText="Learn About Consulting"
          secondaryHref="/consulting"
        />
      </main>
      <Footer />
    </>
  );
}