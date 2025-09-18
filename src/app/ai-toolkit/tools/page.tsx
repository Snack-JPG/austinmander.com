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
  Star,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  X,
  ExternalLink,
  Filter,
  Search,
  Settings,
  Brain,
  MessageSquare,
  FileText,
  Image,
  Code,
  BarChart3,
  Zap,
  Shield
} from "lucide-react";
import { useState } from "react";

interface AITool {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  pricing: {
    free: boolean;
    starter: string;
    business: string;
    enterprise: string;
  };
  rating: number;
  pros: string[];
  cons: string[];
  bestFor: string[];
  notFor: string[];
  realCost: string;
  hiddenCosts: string[];
  timeToValue: string;
  learningCurve: "Easy" | "Medium" | "Steep";
  dataPrivacy: "Excellent" | "Good" | "Concerning";
  reliability: number; // 1-10
  support: "Excellent" | "Good" | "Poor";
  verdict: string;
  alternatives: string[];
  trend: "rising" | "stable" | "declining";
  lastReviewed: string;
  companySize: string[];
  integrations: string[];
  dealBreakers: string[];
}

const tools: AITool[] = [
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    category: "General AI",
    description: "Anthropic's flagship model for complex reasoning, coding, and analysis",
    icon: Brain,
    pricing: {
      free: true,
      starter: "£18/month",
      business: "£165/month per user", 
      enterprise: "Custom"
    },
    rating: 9.2,
    pros: [
      "Superior reasoning and analysis",
      "Excellent at following complex instructions",
      "Strong coding capabilities",
      "200K context window",
      "Constitutional AI safety"
    ],
    cons: [
      "More expensive than GPT-4",
      "Slower response times",
      "Limited image generation",
      "Smaller ecosystem than OpenAI"
    ],
    bestFor: [
      "Complex business analysis",
      "Code review and generation", 
      "Legal document analysis",
      "Strategic planning"
    ],
    notFor: [
      "Simple customer service",
      "High-volume API usage",
      "Image generation tasks",
      "Budget-conscious startups"
    ],
    realCost: "£200-500/month for serious business use",
    hiddenCosts: [
      "API costs scale quickly with heavy usage",
      "Need Claude Pro for teams",
      "Training costs for complex prompts"
    ],
    timeToValue: "1-2 days",
    learningCurve: "Medium",
    dataPrivacy: "Excellent",
    reliability: 9,
    support: "Good",
    verdict: "Best choice for high-stakes business decisions and complex analysis. Worth the premium for quality.",
    alternatives: ["GPT-4", "Gemini Pro", "Perplexity"],
    trend: "rising",
    lastReviewed: "November 2024",
    companySize: ["Scale-up", "Enterprise"],
    integrations: ["Make.com", "Zapier", "Custom API"],
    dealBreakers: ["High API costs for volume usage", "No native image generation"]
  },

  {
    id: "gpt-4o",
    name: "GPT-4o",
    category: "General AI",
    description: "OpenAI's multimodal model with vision, voice, and reasoning",
    icon: Brain,
    pricing: {
      free: true,
      starter: "£16/month",
      business: "£22/month per user",
      enterprise: "Custom"
    },
    rating: 8.8,
    pros: [
      "Best ecosystem and integrations",
      "Multimodal (text, image, voice)",
      "Fastest response times", 
      "Massive developer community",
      "GPTs for custom applications"
    ],
    cons: [
      "Inconsistent quality on complex tasks",
      "Data privacy concerns",
      "Frequent model updates break prompts",
      "Sometimes overconfident/wrong"
    ],
    bestFor: [
      "Rapid prototyping",
      "Customer service chatbots",
      "Content generation",
      "Image analysis"
    ],
    notFor: [
      "Mission-critical decisions",
      "Highly regulated industries",
      "Complex legal analysis",
      "Financial modeling"
    ],
    realCost: "£150-400/month for business use",
    hiddenCosts: [
      "Premium features in ChatGPT Plus",
      "API rate limits require paid tiers",
      "Image processing costs extra"
    ],
    timeToValue: "Same day",
    learningCurve: "Easy",
    dataPrivacy: "Concerning",
    reliability: 7,
    support: "Poor",
    verdict: "Great for getting started and general use, but think twice for sensitive business applications.",
    alternatives: ["Claude 3.5", "Gemini Pro", "Llama 3"],
    trend: "stable",
    lastReviewed: "November 2024",
    companySize: ["Startup", "Scale-up", "Enterprise"],
    integrations: ["Everything"],
    dealBreakers: ["Data goes to OpenAI for training", "Unreliable for complex reasoning"]
  },

  {
    id: "perplexity-pro",
    name: "Perplexity Pro",
    category: "Research & Analysis",
    description: "AI-powered research tool with real-time web access",
    icon: Search,
    pricing: {
      free: true,
      starter: "£16/month",
      business: "£32/month per user",
      enterprise: "Custom"
    },
    rating: 8.5,
    pros: [
      "Real-time web search integration",
      "Excellent source citations",
      "Fast competitive research",
      "Multiple model access",
      "Clean, focused interface"
    ],
    cons: [
      "Limited customization",
      "Can miss nuanced queries",
      "Not great for creative tasks",
      "Search quality varies by topic"
    ],
    bestFor: [
      "Market research",
      "Competitive intelligence",
      "Due diligence",
      "News summarization"
    ],
    notFor: [
      "Creative writing",
      "Code generation",
      "Internal document analysis",
      "Historical research (pre-2023)"
    ],
    realCost: "£20-50/month per power user",
    hiddenCosts: [
      "Limited queries on free plan",
      "Need multiple seats for teams",
      "Enterprise features require custom plan"
    ],
    timeToValue: "Same day",
    learningCurve: "Easy",
    dataPrivacy: "Good",
    reliability: 8,
    support: "Good",
    verdict: "Essential tool for any research-heavy role. Replaces hours of manual Googling.",
    alternatives: ["Claude with browsing", "Copilot", "You.com"],
    trend: "rising",
    lastReviewed: "November 2024",
    companySize: ["Startup", "Scale-up", "Enterprise"],
    integrations: ["API", "Browser extension"],
    dealBreakers: ["No internal document search", "Limited offline capabilities"]
  },

  {
    id: "notion-ai",
    name: "Notion AI",
    category: "Productivity",
    description: "AI writing assistant built into Notion workspace",
    icon: FileText,
    pricing: {
      free: false,
      starter: "£8/month per user",
      business: "£12/month per user",
      enterprise: "Custom"
    },
    rating: 7.8,
    pros: [
      "Seamless Notion integration",
      "Context-aware suggestions",
      "Good for team collaboration",
      "Reasonable pricing",
      "Familiar interface"
    ],
    cons: [
      "Limited compared to dedicated AI tools",
      "Requires Notion adoption",
      "Slow response times",
      "Basic AI capabilities"
    ],
    bestFor: [
      "Teams already using Notion",
      "Meeting notes enhancement",
      "Document drafting",
      "Content planning"
    ],
    notFor: [
      "Complex analysis tasks",
      "Code generation",
      "Advanced reasoning",
      "Non-Notion users"
    ],
    realCost: "£10-15/month per user (including Notion)",
    hiddenCosts: [
      "Need Notion subscription",
      "Limited AI queries per month",
      "Advanced features require higher tiers"
    ],
    timeToValue: "1 week",
    learningCurve: "Easy",
    dataPrivacy: "Good",
    reliability: 7,
    support: "Good",
    verdict: "Solid choice if you're already a Notion user, but dedicated AI tools offer more power.",
    alternatives: ["Claude", "GPT-4", "Copilot"],
    trend: "stable",
    lastReviewed: "November 2024",
    companySize: ["Startup", "Scale-up"],
    integrations: ["Notion ecosystem"],
    dealBreakers: ["Must use Notion", "Limited AI capabilities"]
  },

  {
    id: "cursor",
    name: "Cursor",
    category: "Development",
    description: "AI-first code editor with context-aware assistance",
    icon: Code,
    pricing: {
      free: true,
      starter: "£16/month",
      business: "£32/month per developer",
      enterprise: "Custom"
    },
    rating: 9.1,
    pros: [
      "Excellent code understanding",
      "Natural language to code",
      "Codebase-wide context",
      "Fast performance",
      "VSCode compatible"
    ],
    cons: [
      "Limited to coding tasks",
      "Learning curve for non-devs",
      "Subscription required for teams",
      "Still in rapid development"
    ],
    bestFor: [
      "Software development",
      "Code reviews",
      "Learning new languages",
      "Rapid prototyping"
    ],
    notFor: [
      "Non-technical users",
      "Business analysis",
      "Content creation",
      "Data analysis"
    ],
    realCost: "£30-50/month per developer",
    hiddenCosts: [
      "Learning time for max effectiveness",
      "May need additional AI subscriptions",
      "GPU costs for local models"
    ],
    timeToValue: "1-2 weeks",
    learningCurve: "Medium",
    dataPrivacy: "Good",
    reliability: 9,
    support: "Good",
    verdict: "Game-changer for developers. Significantly improves coding speed and quality.",
    alternatives: ["GitHub Copilot", "Codeium", "Replit"],
    trend: "rising",
    lastReviewed: "November 2024",
    companySize: ["Startup", "Scale-up", "Enterprise"],
    integrations: ["Git", "Terminal", "Extensions"],
    dealBreakers: ["Requires coding knowledge", "Subscription for advanced features"]
  },

  {
    id: "otter-ai",
    name: "Otter.ai",
    category: "Meetings",
    description: "AI meeting transcription and summarization",
    icon: MessageSquare,
    pricing: {
      free: true,
      starter: "£7/month",
      business: "£13/month per user",
      enterprise: "Custom"
    },
    rating: 8.3,
    pros: [
      "Excellent transcription accuracy",
      "Auto-joins meetings",
      "Good integration with calendars",
      "Speaker identification",
      "Reasonable pricing"
    ],
    cons: [
      "Limited AI analysis features",
      "Basic summary quality",
      "No advanced integrations",
      "Struggles with accents"
    ],
    bestFor: [
      "Meeting transcription",
      "Interview recording",
      "Lecture notes",
      "Compliance recording"
    ],
    notFor: [
      "Complex meeting analysis",
      "Action item extraction",
      "Multi-language meetings",
      "Highly sensitive discussions"
    ],
    realCost: "£15-25/month per heavy user",
    hiddenCosts: [
      "Storage costs for long recordings",
      "Advanced features require higher tiers",
      "Export limitations on free plan"
    ],
    timeToValue: "Same day",
    learningCurve: "Easy",
    dataPrivacy: "Good",
    reliability: 8,
    support: "Good",
    verdict: "Solid transcription tool but pair with Claude/GPT for better meeting analysis.",
    alternatives: ["Fathom", "Fireflies", "Grain"],
    trend: "stable",
    lastReviewed: "November 2024",
    companySize: ["Startup", "Scale-up", "Enterprise"],
    integrations: ["Zoom", "Teams", "Google Meet", "Calendars"],
    dealBreakers: ["Limited AI analysis", "Accuracy issues with non-native speakers"]
  },

  {
    id: "midjourney",
    name: "Midjourney",
    category: "Image Generation",
    description: "AI image generation via Discord interface",
    icon: Image,
    pricing: {
      free: false,
      starter: "£8/month",
      business: "£24/month",
      enterprise: "£48/month"
    },
    rating: 8.7,
    pros: [
      "Highest quality image output",
      "Artistic and creative results",
      "Strong community",
      "Regular model updates",
      "Excellent for marketing materials"
    ],
    cons: [
      "Discord-only interface (clunky)",
      "No API access",
      "Limited commercial licensing",
      "Expensive for high volume",
      "Learning curve for prompts"
    ],
    bestFor: [
      "Marketing visuals",
      "Concept art",
      "Social media content",
      "Presentations"
    ],
    notFor: [
      "Product photography",
      "Technical diagrams",
      "High-volume generation",
      "Enterprise workflows"
    ],
    realCost: "£30-100/month for business use",
    hiddenCosts: [
      "Higher tiers for commercial use",
      "Fast generation costs extra",
      "Need multiple accounts for teams"
    ],
    timeToValue: "1-3 days",
    learningCurve: "Medium",
    dataPrivacy: "Concerning",
    reliability: 8,
    support: "Poor",
    verdict: "Best image quality but terrible user experience. Consider alternatives for business use.",
    alternatives: ["DALL-E 3", "Stable Diffusion", "Adobe Firefly"],
    trend: "declining",
    lastReviewed: "November 2024",
    companySize: ["Startup", "Scale-up"],
    integrations: ["Discord only"],
    dealBreakers: ["Discord interface", "No API", "Public by default"]
  },

  {
    id: "make-com",
    name: "Make.com",
    category: "Automation",
    description: "Visual automation platform with AI integrations",
    icon: Zap,
    pricing: {
      free: true,
      starter: "£8/month",
      business: "£14/month",
      enterprise: "Custom"
    },
    rating: 8.6,
    pros: [
      "Visual workflow builder",
      "Extensive app integrations",
      "AI tool connections",
      "Good error handling",
      "Reasonable pricing"
    ],
    cons: [
      "Steep learning curve",
      "Complex pricing model",
      "Limited mobile access",
      "Can be slow with large workflows"
    ],
    bestFor: [
      "Business process automation",
      "AI workflow orchestration",
      "Data synchronization",
      "Complex integrations"
    ],
    notFor: [
      "Simple automations",
      "Non-technical users",
      "Real-time processing",
      "High-frequency triggers"
    ],
    realCost: "£50-200/month for serious automation",
    hiddenCosts: [
      "Operations usage overage",
      "Premium app connections",
      "Additional team members",
      "Storage costs"
    ],
    timeToValue: "1-2 weeks",
    learningCurve: "Steep",
    dataPrivacy: "Good",
    reliability: 8,
    support: "Good",
    verdict: "Powerful automation platform but requires technical expertise. Great for complex AI workflows.",
    alternatives: ["Zapier", "Power Automate", "n8n"],
    trend: "rising",
    lastReviewed: "November 2024",
    companySize: ["Scale-up", "Enterprise"],
    integrations: ["1000+ apps"],
    dealBreakers: ["Technical complexity", "Operation limits on cheaper plans"]
  }
];

const categories = Array.from(new Set(tools.map(t => t.category)));

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "price" | "name">("rating");

  const filteredTools = tools
    .filter(tool => {
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.pricing.starter.localeCompare(b.pricing.starter);
        default:
          return 0;
      }
    });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "rising":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-slate-400" />;
    }
  };

  const getPrivacyColor = (privacy: string) => {
    switch (privacy) {
      case "Excellent":
        return "text-green-600";
      case "Good":
        return "text-blue-600";
      default:
        return "text-orange-600";
    }
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-6 bg-green-500/20 text-green-200 border-green-500/30 px-4 py-2">
                <Settings className="h-4 w-4 mr-2 inline" />
                No-BS Tool Reviews
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                AI Tools That Actually Work
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Honest reviews with real costs, hidden fees, and what vendors won't tell you. 
                I've tested 200+ tools so you don't have to.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <div className="relative max-w-md mx-auto sm:mx-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-white/10 border-white/30 placeholder-slate-400 text-white"
                  />
                </div>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/30 hover:bg-white/20 text-white"
                >
                  Download Tool Comparison Sheet
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-300">200+</p>
                  <p className="text-sm text-slate-400">Tools Tested</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-300">£50K+</p>
                  <p className="text-sm text-slate-400">Spent Testing</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-300">Monthly</p>
                  <p className="text-sm text-slate-400">Reviews Updated</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Tools */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter by:</span>
                </div>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === null ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-1 ${
                      selectedCategory === null ? 'bg-green-600' : 'hover:bg-green-100 dark:hover:bg-green-900/30'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </Badge>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer px-3 py-1 ${
                        selectedCategory === category ? 'bg-green-600' : 'hover:bg-green-100 dark:hover:bg-green-900/30'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* Sort */}
                <div className="ml-auto">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm border rounded px-3 py-1"
                  >
                    <option value="rating">Sort by Rating</option>
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                  </select>
                </div>
              </div>

              {/* Tool Cards */}
              <div className="space-y-8">
                {filteredTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card key={tool.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold">{tool.name}</h3>
                                <div className="flex items-center gap-1">
                                  {getTrendIcon(tool.trend)}
                                </div>
                                <Badge variant="secondary">{tool.category}</Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">{tool.description}</p>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${
                                        i < Math.floor(tool.rating) 
                                          ? 'fill-yellow-400 text-yellow-400' 
                                          : 'text-slate-300'
                                      }`} 
                                    />
                                  ))}
                                  <span className="ml-2 text-sm font-medium">{tool.rating}/10</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  Updated {tool.lastReviewed}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                          {/* Pricing & Key Info */}
                          <div>
                            <h4 className="font-semibold mb-3">Pricing & Costs</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Free tier:</span>
                                <span>{tool.pricing.free ? "Yes" : "No"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Starter:</span>
                                <span>{tool.pricing.starter}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Business:</span>
                                <span>{tool.pricing.business}</span>
                              </div>
                              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-xs">
                                <strong>Real cost:</strong> {tool.realCost}
                              </div>
                            </div>

                            <div className="mt-4">
                              <h5 className="font-medium text-sm mb-2">Key Metrics</h5>
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span>Time to value:</span>
                                  <span>{tool.timeToValue}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Learning curve:</span>
                                  <span>{tool.learningCurve}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Data privacy:</span>
                                  <span className={getPrivacyColor(tool.dataPrivacy)}>
                                    {tool.dataPrivacy}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Reliability:</span>
                                  <span>{tool.reliability}/10</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Pros & Cons */}
                          <div>
                            <div className="mb-4">
                              <h4 className="font-semibold mb-2 text-green-600">Pros</h4>
                              <ul className="space-y-1">
                                {tool.pros.slice(0, 4).map((pro, idx) => (
                                  <li key={idx} className="flex items-start text-sm">
                                    <CheckCircle className="h-3 w-3 text-green-600 mt-1 mr-2 flex-shrink-0" />
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2 text-red-600">Cons</h4>
                              <ul className="space-y-1">
                                {tool.cons.slice(0, 4).map((con, idx) => (
                                  <li key={idx} className="flex items-start text-sm">
                                    <X className="h-3 w-3 text-red-600 mt-1 mr-2 flex-shrink-0" />
                                    {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Best For & Deal Breakers */}
                          <div>
                            <div className="mb-4">
                              <h4 className="font-semibold mb-2">Best For</h4>
                              <ul className="space-y-1">
                                {tool.bestFor.map((use, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground">
                                    • {use}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {tool.dealBreakers.length > 0 && (
                              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                                <h5 className="font-medium text-red-700 dark:text-red-400 text-sm mb-1">
                                  Deal Breakers
                                </h5>
                                <ul className="space-y-1">
                                  {tool.dealBreakers.map((breaker, idx) => (
                                    <li key={idx} className="text-xs text-red-600 dark:text-red-400">
                                      <AlertTriangle className="h-3 w-3 inline mr-1" />
                                      {breaker}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {tool.hiddenCosts.length > 0 && (
                              <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                                <h5 className="font-medium text-yellow-700 dark:text-yellow-400 text-sm mb-1">
                                  Hidden Costs
                                </h5>
                                <ul className="space-y-1">
                                  {tool.hiddenCosts.map((cost, idx) => (
                                    <li key={idx} className="text-xs text-yellow-700 dark:text-yellow-400">
                                      • {cost}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Verdict & Actions */}
                        <div className="mt-6 pt-6 border-t">
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Bottom Line</h4>
                            <p className="text-sm text-muted-foreground italic">"{tool.verdict}"</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-sm mb-1">Alternatives to Consider:</h5>
                              <div className="flex flex-wrap gap-1">
                                {tool.alternatives.map((alt, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {alt}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visit Website
                              </Button>
                              <Button size="sm">
                                Get Implementation Guide
                              </Button>
                            </div>
                          </div>
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
              <Card className="p-8 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-800 border-green-200 dark:border-green-800">
                <h2 className="text-2xl font-bold mb-4">
                  Get the Complete Tool Comparison Sheet
                </h2>
                <p className="text-muted-foreground mb-6">
                  Detailed comparison of 50+ AI tools with pricing, pros/cons, and implementation guides. 
                  Updated monthly with new reviews.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1"
                  />
                  <Button className="bg-green-600 hover:bg-green-700">
                    Download Comparison
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  We'll also send you weekly tool reviews and industry updates.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <CTA 
          title="Need Help Choosing the Right Tools?"
          description="I'll audit your current tools and recommend the optimal AI stack for your specific needs and budget."
          primaryText="Book Tool Audit"
          primaryHref="/book"
          secondaryText="Learn About Consulting"
          secondaryHref="/consulting"
        />
      </main>
      <Footer />
    </>
  );
}