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
  Clock,
  Users,
  AlertTriangle,
  Mail,
  Calendar,
  Copy,
  Upload,
  Zap,
  ArrowRight,
  MessageSquare,
  ListChecks,
  Target,
} from "lucide-react";

const outputs = [
  {
    icon: FileText,
    title: "Executive Summary",
    description:
      "2-3 sentence overview of what was discussed, decided, and what happens next.",
  },
  {
    icon: ListChecks,
    title: "Action Items",
    description:
      "Every action extracted with owner, due date, and priority. No more lost tasks.",
  },
  {
    icon: Target,
    title: "Decisions Made",
    description:
      "Clear record of what was decided and by whom. Never debate the same thing twice.",
  },
  {
    icon: AlertTriangle,
    title: "Risks & Blockers",
    description:
      "Issues mentioned in passing get flagged before they become problems.",
  },
  {
    icon: Mail,
    title: "Follow-up Email Draft",
    description:
      "Ready-to-send email summarising the meeting. Just review and hit send.",
  },
  {
    icon: Calendar,
    title: "Calendar Events",
    description:
      "Suggested calendar entries for follow-ups and deadlines mentioned.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Upload or Paste",
    description:
      "Drop your transcript file (TXT, VTT, SRT) or paste the text directly. We support transcripts from any source.",
  },
  {
    step: "02",
    title: "AI Processes",
    description:
      "Our AI reads the entire transcript, understanding context, speakers, and nuance. Takes about 30 seconds.",
  },
  {
    step: "03",
    title: "Get Results",
    description:
      "Structured outputs appear instantly. Copy individual sections, download as markdown, or send to Change Radar.",
  },
];

const transcriptSources = [
  { name: "Zoom", description: "Enable transcription in settings" },
  { name: "Teams", description: "Download transcript from meeting" },
  { name: "Google Meet", description: "Turn on captions, download after" },
  { name: "Meetily", description: "Local, private transcription" },
  { name: "tl;dv", description: "Free, works with all platforms" },
  { name: "Tactiq", description: "Chrome extension, no bot" },
];

const faqs = [
  {
    question: "Do you record meetings?",
    answer:
      "No. We don't record anything. You bring us the transcript from whatever tool you use. We just process the text.",
  },
  {
    question: "What transcript formats work?",
    answer:
      "Plain text (.txt), WebVTT (.vtt), SRT subtitles (.srt), or just paste the text directly. If you can read it, we can process it.",
  },
  {
    question: "How accurate are the action items?",
    answer:
      "Very accurate for explicit actions ('John will do X by Friday'). Less certain actions are flagged as potential items for you to confirm.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your transcripts are processed and then deleted. We don't store meeting content. We don't train on your data.",
  },
  {
    question: "Can this connect to Change Radar?",
    answer:
      "Yes. There's a 'Send to Change Radar' button that pushes actions, decisions, and risks directly to your project. Coming soon.",
  },
];

export default function MeetingIntelPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy via-slate-800 to-cyan-900/30 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 border-cyan-400/30 bg-cyan-500/20 text-cyan-300">
                Free Tool · No Sign-up Required
              </Badge>
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Meeting Intelligence
              </h1>
              <p className="mb-4 text-xl text-slate-200 md:text-2xl">
                Upload a transcript. Get structured actions in seconds.
              </p>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
                The meeting is never the hard part. It&apos;s remembering what
                was decided. Let AI extract summaries, action items, decisions,
                and follow-ups automatically.
              </p>
              <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-400"
                >
                  <Link href="#try-it">
                    <Upload className="mr-2 h-5 w-5" />
                    Try It Now
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
              <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-cyan-400">30s</p>
                  <p className="text-sm text-slate-300">Processing time</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-cyan-400">6</p>
                  <p className="text-sm text-slate-300">Output types</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-cyan-400">Free</p>
                  <p className="text-sm text-slate-300">No credit card</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="bg-white py-16 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white md:text-4xl">
                What You Get From Every Meeting
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                One transcript in. Six structured outputs out.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {outputs.map((output, index) => {
                const Icon = output.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="mb-4 flex items-start">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                        <Icon className="h-5 w-5 text-cyan-500" />
                      </div>
                      <h3 className="text-lg font-semibold">{output.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{output.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="bg-slate-50 py-16 dark:bg-slate-800"
        >
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white md:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                From transcript to action items in three steps
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="space-y-8">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500 font-mono text-lg font-bold text-white">
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

        {/* Try It Section (Placeholder) */}
        <section id="try-it" className="bg-white py-16 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white md:text-4xl">
                  Try It Now
                </h2>
                <p className="text-lg text-muted-foreground">
                  Paste a meeting transcript below to see it in action
                </p>
              </div>

              <Card className="p-8">
                <div className="mb-6 rounded-lg border-2 border-dashed border-slate-300 p-8 text-center dark:border-slate-600">
                  <Upload className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                  <p className="mb-2 text-lg font-medium">
                    Drop your transcript here
                  </p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Supports .txt, .vtt, .srt files
                  </p>
                  <Button variant="outline">Or click to browse</Button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground dark:bg-slate-900">
                      Or paste text
                    </span>
                  </div>
                </div>

                <textarea
                  className="min-h-[200px] w-full rounded-lg border border-slate-300 p-4 text-sm dark:border-slate-600 dark:bg-slate-800"
                  placeholder="Paste your meeting transcript here..."
                />

                <div className="mt-6 flex justify-center">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400">
                    <Zap className="mr-2 h-5 w-5" />
                    Process Transcript
                  </Button>
                </div>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Coming soon. Join the waitlist to be notified at launch.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Transcript Sources */}
        <section className="bg-slate-50 py-16 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white md:text-4xl">
                Where to Get Transcripts
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                We process any transcript. Here&apos;s how to get them from
                popular tools.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-3">
              {transcriptSources.map((source, index) => (
                <Card key={index} className="p-4">
                  <h3 className="font-semibold">{source.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {source.description}
                  </p>
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
                  <Badge className="mb-4 border-cyan-400/30 bg-cyan-500/10 text-cyan-600">
                    Part of the Ecosystem
                  </Badge>
                  <h2 className="mb-4 text-3xl font-bold text-navy dark:text-white">
                    Feeds Into Change Radar
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    Meeting Intelligence isn&apos;t just a standalone tool.
                    With one click, push your extracted data to Change Radar:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500" />
                      <span>Action items become tracked tasks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500" />
                      <span>Risks feed the project risk register</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500" />
                      <span>Decisions logged with full context</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500" />
                      <span>Everything linked to the right project</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-8">
                  <div className="space-y-4 text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-cyan-500" />
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

        {/* FAQs */}
        <section className="bg-slate-50 py-16 dark:bg-slate-800">
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
          title="Ready to Stop Losing Meeting Insights?"
          description="Join the waitlist for Meeting Intelligence. Be the first to know when it launches."
          primaryText="Join Waitlist"
          primaryHref="/contact"
          secondaryText="Learn About Change Radar"
          secondaryHref="/change-radar"
        />
      </main>
      <Footer />
    </>
  );
}
