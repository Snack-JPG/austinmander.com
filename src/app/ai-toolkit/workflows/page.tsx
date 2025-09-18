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
  Zap,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle,
  ArrowDown,
  Settings,
  Play,
  TrendingUp,
  Users,
  Mail,
  FileText,
  BarChart3,
  MessageSquare,
  Calendar,
  Shield,
  Target,
  Cpu,
  Download
} from "lucide-react";
import { useState } from "react";

interface Workflow {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: any;
  timeToImplement: string;
  timeSaved: string;
  cost: string;
  complexity: "beginner" | "intermediate" | "advanced";
  tools: string[];
  steps: {
    title: string;
    description: string;
    tool?: string;
    duration?: string;
  }[];
  roi: string;
  businessValue: string[];
  realExample: {
    company: string;
    problem: string;
    result: string;
  };
}

const workflows: Workflow[] = [
  {
    id: "meeting-intelligence",
    title: "Meeting Minutes to Action Items",
    description: "Automatically extract action items, decisions, and follow-ups from any meeting recording",
    category: "Productivity",
    icon: MessageSquare,
    timeToImplement: "2 hours",
    timeSaved: "3 hours/week",
    cost: "£30/month",
    complexity: "beginner",
    tools: ["Otter.ai", "Make.com", "Claude API", "Notion"],
    steps: [
      {
        title: "Setup Otter.ai Recording",
        description: "Configure Otter.ai to auto-join meetings and generate transcripts",
        tool: "Otter.ai",
        duration: "15 min"
      },
      {
        title: "Create Make.com Automation",
        description: "Build workflow to trigger when new transcript is available",
        tool: "Make.com",
        duration: "30 min"
      },
      {
        title: "AI Processing Script",
        description: "Send transcript to Claude to extract actions, decisions, concerns",
        tool: "Claude API",
        duration: "45 min"
      },
      {
        title: "Output to Systems",
        description: "Auto-create tasks in project management tool and send summary",
        tool: "Notion/Asana",
        duration: "30 min"
      }
    ],
    roi: "300% in first month",
    businessValue: [
      "Never lose track of commitments",
      "Reduce meeting follow-up time by 80%",
      "Improve accountability across teams",
      "Create searchable meeting intelligence"
    ],
    realExample: {
      company: "TechScale (Series B Startup)",
      problem: "CEO spent 4 hours/week chasing action items from leadership meetings",
      result: "Reduced to 30 minutes/week with 95% action completion rate"
    }
  },
  
  {
    id: "customer-intelligence",
    title: "Customer Health Score Automation",
    description: "Monitor customer communications for churn risk and expansion opportunities",
    category: "Sales & Customer Success",
    icon: Users,
    timeToImplement: "4 hours",
    timeSaved: "8 hours/week",
    cost: "£75/month",
    complexity: "intermediate",
    tools: ["HubSpot", "Zapier", "GPT-4", "Slack"],
    steps: [
      {
        title: "Connect Data Sources",
        description: "Integrate CRM, support tickets, and email communications",
        tool: "Zapier",
        duration: "60 min"
      },
      {
        title: "Build AI Analysis Engine",
        description: "Create GPT-4 workflow to analyse sentiment and extract signals",
        tool: "GPT-4 API",
        duration: "90 min"
      },
      {
        title: "Risk Scoring Algorithm",
        description: "Develop scoring system based on communication patterns",
        tool: "Custom Script",
        duration: "60 min"
      },
      {
        title: "Alert System Setup",
        description: "Configure real-time alerts for CSM team via Slack",
        tool: "Slack API",
        duration: "30 min"
      }
    ],
    roi: "480% in 6 months",
    businessValue: [
      "Reduce churn by 25%",
      "Identify upsell opportunities 3x faster",
      "Proactive customer outreach",
      "Improve NPS by 15 points"
    ],
    realExample: {
      company: "DataFlow (B2B SaaS, £2M ARR)",
      problem: "Missing churn signals until exit interviews",
      result: "Prevented £180K in churn, identified £300K in expansion opportunities"
    }
  },

  {
    id: "executive-briefing",
    title: "Daily Executive Briefing",
    description: "Auto-generate personalized daily brief from multiple data sources",
    category: "Executive Intelligence",
    icon: BarChart3,
    timeToImplement: "3 hours",
    timeSaved: "5 hours/week",
    cost: "£50/month",
    complexity: "intermediate",
    tools: ["Google Sheets", "Claude API", "Gmail", "News APIs"],
    steps: [
      {
        title: "Data Source Integration",
        description: "Connect KPI dashboards, news feeds, calendar, and team updates",
        tool: "Multiple APIs",
        duration: "90 min"
      },
      {
        title: "AI Briefing Engine",
        description: "Build Claude workflow to synthesize information into executive summary",
        tool: "Claude API",
        duration: "60 min"
      },
      {
        title: "Personalization Layer",
        description: "Customize content based on executive priorities and calendar",
        tool: "Custom Logic",
        duration: "30 min"
      }
    ],
    roi: "250% within 3 months",
    businessValue: [
      "Stay informed without information overload",
      "Make faster, data-driven decisions",
      "Spot trends before competitors",
      "Optimize time allocation"
    ],
    realExample: {
      company: "Global Bank (Managing Director level)",
      problem: "Spending 90 minutes/day reading reports and news",
      result: "Reduced to 15 minutes with better decision quality"
    }
  },

  {
    id: "contract-intelligence",
    title: "Contract Risk Analyser",
    description: "Automatically scan contracts for risks, unusual terms, and opportunities",
    category: "Legal & Compliance",
    icon: Shield,
    timeToImplement: "3 hours",
    timeSaved: "6 hours/week",
    cost: "£40/month",
    complexity: "advanced",
    tools: ["Claude API", "DocuSign", "Slack", "Legal Database"],
    steps: [
      {
        title: "Contract Ingestion Setup",
        description: "Auto-detect new contracts from email and document systems",
        tool: "Email/DocuSign API",
        duration: "45 min"
      },
      {
        title: "AI Risk Analysis Engine",
        description: "Train Claude to identify unusual terms, risks, and opportunities",
        tool: "Claude API",
        duration: "120 min"
      },
      {
        title: "Risk Scoring & Alerts",
        description: "Create scoring system and alert thresholds for legal team",
        tool: "Custom Logic",
        duration: "30 min"
      },
      {
        title: "Reporting Dashboard",
        description: "Build executive dashboard showing contract portfolio risks",
        tool: "Google Sheets/BI",
        duration: "15 min"
      }
    ],
    roi: "420% in first year",
    businessValue: [
      "Catch risky terms before signing",
      "Standardize contract review process",
      "Reduce legal review time by 60%",
      "Improve negotiation outcomes"
    ],
    realExample: {
      company: "Manufacturing Company (£50M revenue)",
      problem: "Legal team bottleneck causing deal delays",
      result: "Reduced review time from 3 days to 6 hours, prevented 2 risky deals"
    }
  },

  {
    id: "competitor-monitoring",
    title: "Competitive Intelligence Radar",
    description: "Monitor competitors across web, social, job posts, and patents automatically",
    category: "Strategy & Intelligence",
    icon: Target,
    timeToImplement: "4 hours",
    timeSaved: "10 hours/week",
    cost: "£80/month",
    complexity: "advanced",
    tools: ["Perplexity API", "Google Alerts", "LinkedIn API", "Make.com"],
    steps: [
      {
        title: "Multi-Source Monitoring",
        description: "Set up monitoring across news, social media, job boards, patents",
        tool: "Various APIs",
        duration: "120 min"
      },
      {
        title: "AI Signal Processing",
        description: "Use Perplexity to analyse and extract strategic insights",
        tool: "Perplexity API",
        duration: "90 min"
      },
      {
        title: "Intelligence Synthesis",
        description: "Generate weekly strategic briefings with actionable insights",
        tool: "Claude API",
        duration: "30 min"
      }
    ],
    roi: "200% in strategic advantage",
    businessValue: [
      "Early warning of competitive moves",
      "Identify market opportunities",
      "Inform strategic planning",
      "Reduce strategic surprises"
    ],
    realExample: {
      company: "B2B Software Company",
      problem: "Competitors launching features first",
      result: "Detected 3 competitive moves 8 weeks early, adjusted roadmap to maintain lead"
    }
  },

  {
    id: "expense-optimizer",
    title: "Smart Expense Analysis",
    description: "Automatically categorize, flag anomalies, and optimize company spending",
    category: "Finance & Operations",
    icon: DollarSign,
    timeToImplement: "2 hours",
    timeSaved: "4 hours/week",
    cost: "£25/month",
    complexity: "beginner",
    tools: ["Xero/QuickBooks", "Claude API", "Google Sheets"],
    steps: [
      {
        title: "Expense Data Import",
        description: "Connect accounting system and credit card feeds",
        tool: "Xero API",
        duration: "30 min"
      },
      {
        title: "AI Categorization",
        description: "Use Claude to intelligently categorize and flag unusual expenses",
        tool: "Claude API",
        duration: "60 min"
      },
      {
        title: "Optimization Engine",
        description: "Identify savings opportunities and policy violations",
        tool: "Custom Logic",
        duration: "30 min"
      }
    ],
    roi: "150% in cost savings",
    businessValue: [
      "Automated expense categorization",
      "Catch policy violations in real-time",
      "Identify cost optimization opportunities",
      "Reduce manual finance work"
    ],
    realExample: {
      company: "Professional Services Firm",
      problem: "Manual expense review taking 6 hours/week",
      result: "Reduced to 30 minutes, found £15K annual savings"
    }
  }
];

const categories = Array.from(new Set(workflows.map(w => w.category)));

export default function WorkflowsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const filteredWorkflows = selectedCategory 
    ? workflows.filter(w => w.category === selectedCategory)
    : workflows;

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-500/20 text-blue-200 border-blue-500/30 px-4 py-2">
                <Zap className="h-4 w-4 mr-2 inline" />
                Automation Workflows
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                10 AI Workflows That Run on Autopilot
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Step-by-step automation recipes that save 20+ hours per week. 
                Copy these exact workflows used by 500+ companies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => document.getElementById('workflows')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Browse Workflows
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/30 hover:bg-white/20 text-white"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download All Workflows
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-300">20+</p>
                  <p className="text-sm text-slate-400">Hours Saved/Week</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-300">£50K+</p>
                  <p className="text-sm text-slate-400">Annual Value</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-300">98%</p>
                  <p className="text-sm text-slate-400">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflows Section */}
        <section id="workflows" className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready-to-Deploy Workflows
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Each workflow includes step-by-step setup guide, tool recommendations, and ROI projections
                </p>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant={selectedCategory === null ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 ${
                      selectedCategory === null ? 'bg-blue-600' : 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </Badge>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer px-4 py-2 ${
                        selectedCategory === category ? 'bg-blue-600' : 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Workflow Cards */}
              <div className="space-y-8">
                {filteredWorkflows.map((workflow) => {
                  const Icon = workflow.icon;
                  return (
                    <Card key={workflow.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold mb-2">{workflow.title}</h3>
                              <p className="text-muted-foreground mb-3">{workflow.description}</p>
                              <div className="flex items-center gap-4">
                                <Badge variant="secondary">{workflow.category}</Badge>
                                <Badge variant="outline">{workflow.complexity}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                              <span className="text-sm font-medium">Time Saved</span>
                            </div>
                            <p className="text-lg font-bold text-green-600">{workflow.timeSaved}</p>
                          </div>
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <Clock className="h-4 w-4 text-blue-600 mr-1" />
                              <span className="text-sm font-medium">Setup Time</span>
                            </div>
                            <p className="text-lg font-bold text-blue-600">{workflow.timeToImplement}</p>
                          </div>
                          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <DollarSign className="h-4 w-4 text-purple-600 mr-1" />
                              <span className="text-sm font-medium">Monthly Cost</span>
                            </div>
                            <p className="text-lg font-bold text-purple-600">{workflow.cost}</p>
                          </div>
                          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <Target className="h-4 w-4 text-orange-600 mr-1" />
                              <span className="text-sm font-medium">ROI</span>
                            </div>
                            <p className="text-lg font-bold text-orange-600">{workflow.roi}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Implementation Steps */}
                          <div>
                            <h4 className="font-semibold mb-4 flex items-center">
                              <Settings className="h-5 w-5 mr-2" />
                              Implementation Steps
                            </h4>
                            <div className="space-y-3">
                              {workflow.steps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-medium text-blue-600">{idx + 1}</span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{step.title}</p>
                                    <p className="text-xs text-muted-foreground">{step.description}</p>
                                    {step.tool && (
                                      <Badge variant="outline" className="text-xs mt-1">
                                        {step.tool}
                                      </Badge>
                                    )}
                                  </div>
                                  {step.duration && (
                                    <span className="text-xs text-muted-foreground">{step.duration}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Business Value & Real Example */}
                          <div>
                            <h4 className="font-semibold mb-4">Business Value</h4>
                            <ul className="space-y-2 mb-6">
                              {workflow.businessValue.map((value, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                                  {value}
                                </li>
                              ))}
                            </ul>

                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                              <h5 className="font-medium text-sm mb-2">Real Implementation Example</h5>
                              <p className="text-xs text-muted-foreground mb-1">
                                <strong>{workflow.realExample.company}</strong>
                              </p>
                              <p className="text-xs text-muted-foreground mb-2">
                                <em>Problem:</em> {workflow.realExample.problem}
                              </p>
                              <p className="text-xs text-green-700 dark:text-green-400">
                                <em>Result:</em> {workflow.realExample.result}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Tools Required */}
                        <div className="mt-6 pt-6 border-t">
                          <h5 className="font-medium text-sm mb-3">Tools Required:</h5>
                          <div className="flex flex-wrap gap-2">
                            {workflow.tools.map((tool, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-6 flex gap-3">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Download className="h-4 w-4 mr-2" />
                            Get Setup Guide
                          </Button>
                          <Button variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Get Help Implementing
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800 border-blue-200 dark:border-blue-800">
                <h2 className="text-2xl font-bold mb-4">
                  Get All Workflow Templates
                </h2>
                <p className="text-muted-foreground mb-6">
                  Complete setup guides, tool configurations, and troubleshooting tips. 
                  Plus monthly workflow updates.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Download Templates
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  We'll also send you weekly automation insights. Unsubscribe anytime.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <CTA 
          title="Need Custom Workflows for Your Organisation?"
          description="I build bespoke automation workflows tailored to your specific processes and systems."
          primaryText="Book Automation Call"
          primaryHref="/book"
          secondaryText="Learn About Consulting"
          secondaryHref="/consulting"
        />
      </main>
      <Footer />
    </>
  );
}