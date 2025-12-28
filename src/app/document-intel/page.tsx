"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  FileText,
  CheckCircle,
  Search,
  Calendar,
  Users,
  AlertTriangle,
  Upload,
  Zap,
  ArrowRight,
  FileSearch,
  Database,
  Shield,
  Clock,
  Building,
  Scale,
} from "lucide-react";

const capabilities = [
  {
    icon: FileSearch,
    title: "Structured Extraction",
    description:
      "Not just summaries. We pull out specific data: dates, obligations, parties, amounts, clauses.",
  },
  {
    icon: Search,
    title: "Natural Language Queries",
    description:
      "Ask questions about your documents in plain English. 'What are the payment terms?' 'When does the contract expire?'",
  },
  {
    icon: Database,
    title: "Batch Processing",
    description:
      "Process hundreds of documents at once. Same extraction template, consistent outputs.",
  },
  {
    icon: Shield,
    title: "Risk Identification",
    description:
      "AI flags potential risks, unusual clauses, and items that need human review.",
  },
  {
    icon: Clock,
    title: "Key Dates & Deadlines",
    description:
      "Every date mentioned is extracted and categorised. Never miss a renewal or deadline.",
  },
  {
    icon: Users,
    title: "Entity Recognition",
    description:
      "Automatically identify and link people, companies, projects, and products mentioned.",
  },
];

const documentTypes = [
  {
    icon: Scale,
    title: "Contracts & Agreements",
    examples: "MSAs, NDAs, SOWs, vendor contracts",
    extracts: "Terms, obligations, renewal dates, parties",
  },
  {
    icon: FileText,
    title: "Reports & Briefs",
    examples: "Project reports, consultant deliverables, research",
    extracts: "Key findings, recommendations, action items",
  },
  {
    icon: Building,
    title: "Company Documents",
    examples: "Policies, procedures, handbooks",
    extracts: "Rules, requirements, responsibilities",
  },
  {
    icon: Calendar,
    title: "Meeting Notes & Minutes",
    examples: "Board minutes, project notes, call summaries",
    extracts: "Decisions, action items, attendees",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Upload Documents",
    description:
      "Drop PDFs, Word docs, or text files. We handle the rest. Batch upload supported.",
  },
  {
    step: "02",
    title: "Choose What to Extract",
    description:
      "Use a preset template or define custom extraction fields. Tell us what you need.",
  },
  {
    step: "03",
    title: "Review Structured Output",
    description:
      "Get clean, structured data. Query it, export it, or send it to Change Radar.",
  },
];

const useCases = [
  {
    title: "Contract Review",
    before: "Lawyers spend hours reading each contract manually",
    after: "Key terms extracted in minutes, humans review flagged items only",
  },
  {
    title: "Due Diligence",
    before: "Weeks of document review during M&A",
    after: "Batch process hundreds of documents, surface risks automatically",
  },
  {
    title: "Project Onboarding",
    before: "Reading through old briefs and SOWs to understand context",
    after: "Ask questions, get answers with source references",
  },
];

const faqs = [
  {
    question: "What file types do you support?",
    answer:
      "PDF, Word (.docx), plain text, and RTF. We can also process scanned documents with OCR, though accuracy depends on scan quality.",
  },
  {
    question: "How many documents can I process at once?",
    answer:
      "Batch processing supports up to 500 documents per job. For larger volumes, we can set up dedicated processing.",
  },
  {
    question: "Is this just ChatGPT with documents?",
    answer:
      "No. We use purpose-built extraction pipelines with chunking, embeddings, and structured output schemas. It's engineered for accuracy and consistency, not just chat.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Documents are processed in memory and deleted after extraction. Structured outputs can be stored in your Change Radar account or exported. We never train on your data.",
  },
  {
    question: "Can I define custom extraction fields?",
    answer:
      "Yes. You can create extraction templates with any fields you need. 'Extract all indemnification clauses' or 'Find every mention of liability limits' — you define it.",
  },
];

export default function DocumentIntelPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy via-slate-800 to-emerald-900/30 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 border-emerald-400/30 bg-emerald-500/20 text-emerald-300">
                In Development · Early Access Available
              </Badge>
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Document Intelligence
              </h1>
              <p className="mb-4 text-xl text-slate-200 md:text-2xl">
                Turn messy documents into structured, queryable data.
              </p>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
                Upload contracts, reports, and briefs. Get key dates,
                obligations, risks, and entities extracted automatically. Ask
                questions in plain English.
              </p>
              <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-400"
                >
                  <Link href="/contact">
                    Request Early Access
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 hover:bg-white/20"
                >
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-400">500+</p>
                  <p className="text-sm text-slate-300">Pages per batch</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-400">90%</p>
                  <p className="text-sm text-slate-300">Time saved</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-400">Custom</p>
                  <p className="text-sm text-slate-300">Extraction templates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="bg-white py-16 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white md:text-4xl">
                More Than Just Summaries
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Purpose-built document processing that extracts exactly what you
                need.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="mb-4 flex items-start">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                        <Icon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <h3 className="text-lg font-semibold">
                        {capability.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground">
                      {capability.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Document Types */}
        <section className="bg-slate-50 py-16 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white md:text-4xl">
                Works With Any Document Type
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                From legal contracts to project briefs, we extract what matters.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {documentTypes.map((docType, index) => {
                const Icon = docType.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="mb-4 flex items-center">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                        <Icon className="h-6 w-6 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {docType.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {docType.examples}
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-700">
                      <p className="text-sm">
                        <span className="font-medium">Extracts:</span>{" "}
                        {docType.extracts}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="bg-white py-16 dark:bg-slate-900"
        >
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white md:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                From upload to insights in three steps
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="space-y-8">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 font-mono text-lg font-bold text-white">
                      {item.step}
                    </div>
                    <div className="ml-6">
                      <h3 className="mb-2 text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-slate-50 py-16 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white md:text-4xl">
                Real Use Cases
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                How teams are saving hours every week
              </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="border-b bg-red-50 p-6 dark:bg-red-950/20 md:border-b-0 md:border-r">
                      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-red-600">
                        Before
                      </p>
                      <h3 className="mb-2 font-semibold">{useCase.title}</h3>
                      <p className="text-muted-foreground">{useCase.before}</p>
                    </div>
                    <div className="bg-emerald-50 p-6 dark:bg-emerald-950/20">
                      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-600">
                        After
                      </p>
                      <h3 className="mb-2 font-semibold">{useCase.title}</h3>
                      <p className="text-muted-foreground">{useCase.after}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Connection to Change Radar */}
        <section className="bg-white py-16 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Badge className="mb-4 border-emerald-400/30 bg-emerald-500/10 text-emerald-600">
                    Part of the Ecosystem
                  </Badge>
                  <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white">
                    Feeds Into Change Radar
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    Document Intelligence isn&apos;t just a standalone tool.
                    Extracted data enriches your projects:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span>Contract deadlines → Project timeline</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span>Identified risks → Risk register</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span>Key stakeholders → Resource view</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span>Obligations → Action tracker</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-8">
                  <div className="space-y-4 text-center">
                    <FileText className="mx-auto h-12 w-12 text-emerald-500" />
                    <ArrowRight className="mx-auto h-6 w-6 text-slate-400" />
                    <div className="rounded-lg bg-white/50 p-4 dark:bg-slate-800/50">
                      <p className="font-semibold">Change Radar</p>
                      <p className="text-sm text-muted-foreground">
                        Project enriched automatically
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Differentiator */}
        <section className="bg-slate-50 py-16 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white md:text-4xl">
                  Not Just Another AI Wrapper
                </h2>
                <p className="text-lg text-muted-foreground">
                  Real engineering for real document processing
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Database className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="mb-2 font-semibold">Smart Chunking</h3>
                  <p className="text-sm text-muted-foreground">
                    Documents split intelligently to preserve context and
                    meaning across sections.
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Search className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="mb-2 font-semibold">Vector Embeddings</h3>
                  <p className="text-sm text-muted-foreground">
                    Semantic search finds relevant sections even when exact
                    words don&apos;t match.
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Zap className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="mb-2 font-semibold">Structured Schemas</h3>
                  <p className="text-sm text-muted-foreground">
                    Output matches your schema exactly. Consistent, validated,
                    ready to use.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white py-16 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-navy dark:text-white md:text-4xl">
                Questions
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="mb-3 text-lg font-semibold">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTA
          title="Ready to Stop Reading Every Document?"
          description="Request early access to Document Intelligence. Be first in line when we launch."
          primaryText="Request Early Access"
          primaryHref="/contact"
          secondaryText="Learn About Change Radar"
          secondaryHref="/change-radar"
        />
      </main>
      <Footer />
    </>
  );
}
