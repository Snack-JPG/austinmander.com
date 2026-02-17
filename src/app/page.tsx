import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowDown,
  ArrowRight,
  Pen,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { label: "Lines of Code", value: "550K+" },
  { label: "AI Engines Built", value: "8" },
  { label: "DB Migrations", value: "85+" },
  { label: "Age When I Started", value: "19" },
];

const projects = [
  {
    title: "Change Radar",
    tagline: "Enterprise project intelligence — built solo, end to end",
    description:
      "Multi-tenant PMO SaaS with 550K lines of TypeScript. 8 orchestrated AI engines handle risk analysis, automated reporting, and natural-language queries. 85+ database migrations, Row-Level Security, AES-256-GCM encryption, full CI/CD. Presented directly to the CIO of Allianz — youngest person in the room by 20 years.",
    metrics: ["550K LOC", "8 AI engines", "85+ migrations", "Multi-tenant"],
    tech: [
      "Next.js 15",
      "tRPC",
      "PostgreSQL",
      "Supabase",
      "OpenAI",
      "Claude",
      "Vercel",
    ],
    status: "In active development",
    link: null,
    hero: true,
  },
  {
    title: "chase.md",
    tagline: "AI-powered document chasing for accountancy practices",
    description:
      "Intelligent multi-channel escalation engine that chases clients for tax documents. Email → SMS → WhatsApp escalation with AI document recognition, magic-link client portal, and practice dashboard. Built from concept to working app in a single evening.",
    metrics: ["Built in one evening", "3-channel escalation"],
    tech: [
      "Next.js 15",
      "tRPC",
      "Drizzle ORM",
      "Clerk",
      "Resend",
      "Twilio",
      "R2",
    ],
    status: "MVP built",
    link: "https://github.com/Snack-JPG/chase.md",
    hero: false,
  },
  {
    title: "Team Playbook",
    tagline: "AI knowledge base for operations teams",
    description:
      "RAG-powered internal knowledge base for manufacturing. Upload company SOPs, search with natural language. Workers ask questions, get answers from company docs instead of bothering supervisors.",
    metrics: ["Semantic search", "RAG pipeline"],
    tech: [
      "Next.js",
      "Supabase",
      "OpenAI Embeddings",
      "pgvector",
    ],
    status: "Complete",
    link: null,
    hero: false,
  },
  {
    title: "TradeHub",
    tagline: "Automated websites for tradespeople",
    description:
      "End-to-end pipeline: scrape prospects from Google, generate bespoke websites, deploy automatically, cold-outreach with the finished site. Built the pipeline, ran the outreach, learned the sales lessons.",
    metrics: ["Full pipeline", "Auto-deploy"],
    tech: [
      "HTML/CSS",
      "Vercel",
      "Cloudflare",
      "Google Places API",
    ],
    status: "Live",
    link: "https://tradehub.directory",
    hero: false,
  },
];

const stack = [
  { category: "Languages", items: "TypeScript · JavaScript · Python · Rust · SQL" },
  { category: "Frontend", items: "React · Next.js 14/15 · Tailwind CSS · shadcn/ui" },
  { category: "Backend", items: "Node.js · tRPC · Drizzle ORM · Prisma · REST" },
  { category: "AI / ML", items: "OpenAI · Anthropic Claude · RAG · pgvector · Embeddings" },
  { category: "Database", items: "PostgreSQL · Supabase · Neon" },
  { category: "Infra", items: "Vercel · Cloudflare · AWS R2/S3 · Docker · GitHub Actions" },
  { category: "Auth", items: "Clerk · Supabase Auth · RLS · AES-256-GCM" },
  { category: "Integrations", items: "Stripe · Resend · Twilio · QStash · ElevenLabs" },
];

const now = [
  {
    emoji: "🔧",
    text: "Building chase.md — AI document chasing for accountants",
  },
  {
    emoji: "🎯",
    text: "Looking for my first full-time engineering role",
  },
  {
    emoji: "💼",
    text: "Running AI consulting engagements with professional services firms",
  },
  {
    emoji: "📚",
    text: "Deep-diving into Rust and systems programming",
  },
];

const writing = [
  {
    title: "Why I Dropped Out of Law to Write Code",
    url: "https://linkedin.com/in/austinmander",
    date: "Coming soon",
  },
  {
    title: "Building 550K Lines of Code Solo — What I Learned",
    url: "https://linkedin.com/in/austinmander",
    date: "Coming soon",
  },
  {
    title: "The Case for Junior Devs Who Ship",
    url: "https://linkedin.com/in/austinmander",
    date: "Coming soon",
  },
];

const services = [
  {
    title: "AI Audit",
    description:
      "I'll map your workflows, identify where AI actually helps (not where it's hype), and give you a concrete implementation plan.",
  },
  {
    title: "Custom Builds",
    description:
      "Need an internal tool, automation pipeline, or AI-powered feature? I'll build it. Fast. In production-grade TypeScript.",
  },
  {
    title: "Team Training",
    description:
      "Hands-on workshops to make your team AI-native. Not slides and theory — real tools, real workflows, real results.",
  },
];

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#stack" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/50 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 lg:px-8">
        <a href="#" className="font-semibold text-sm tracking-tight">
          AM
        </a>
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs text-neutral-400 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pt-28 pb-20 md:pt-36 lg:px-8" role="main">
        {/* Skip to content link for keyboard users */}
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:text-sm focus:font-medium"
        >
          Skip to projects
        </a>

        {/* ── Hero ── */}
        <section aria-label="Introduction" className="mb-24">
          <p className="mb-4 text-sm text-neutral-500 font-mono">
            Hi, I&apos;m Austin.
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
            I dropped out of law school to build software.
            <br />
            <span className="text-neutral-400">
              550K lines later, I&apos;m still going.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-neutral-400 leading-relaxed">
            21-year-old developer shipping production systems that most teams need 10
            people for. I build AI-powered enterprise tools, then help companies
            do the same.
          </p>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-neutral-800 p-3 text-center">
                <div className="text-xl font-bold font-mono">{s.value}</div>
                <div className="mt-1 text-xs text-neutral-500">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              See what I&apos;ve built <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="text-sm text-neutral-400 underline underline-offset-4 hover:text-white transition"
            >
              Work with me
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://github.com/Snack-JPG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/austinmander"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:austinmander04@gmail.com"
              className="text-neutral-500 hover:text-white transition"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </section>

        {/* ── Now ── */}
        <section aria-label="What I'm doing now" className="mb-24">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-neutral-500">
            Now
          </h2>
          <p className="mb-4 text-xs text-neutral-600 font-mono">
            Updated February 2025
          </p>
          <div className="space-y-3">
            {now.map((n, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-neutral-800 p-3 text-sm text-neutral-300"
              >
                <span className="shrink-0 text-base">{n.emoji}</span>
                <span>{n.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" aria-label="About" className="mb-24 scroll-mt-20">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-neutral-500">
            About
          </h2>
          <div className="space-y-4 text-neutral-300 leading-relaxed text-base lg:text-lg">
            <p>
              I started a Law degree at the University of Birmingham. Lasted a term.
              Realised I&apos;d rather build things than argue about them. Dropped out.
              Best decision I&apos;ve made.
            </p>
            <p>
              At 19, I started building Change Radar — what became a 550,000-line
              enterprise SaaS platform. No funding, no team, no CS degree. Just me,
              TypeScript, and an unreasonable amount of caffeine. I presented it to the
              CIO of Allianz. I was the youngest person in the room by two decades.
            </p>
            <p>
              Now I split my time between building my own products and helping
              professional services firms become AI-native. I don&apos;t give people
              chatbots and call it consulting — I teach teams to automate their own
              work, then get out of the way.
            </p>
            <p className="text-neutral-500 italic border-l-2 border-neutral-700 pl-4">
              Ship fast, learn by building, stay honest about what you don&apos;t know.
            </p>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" aria-label="Projects" className="mb-24 scroll-mt-20">
          <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-neutral-500">
            What I&apos;ve Built
          </h2>
          <div className="space-y-8">
            {projects.map((p) => (
              <article
                key={p.title}
                className={`group rounded-xl border p-6 transition hover:border-neutral-700 ${
                  p.hero
                    ? "border-neutral-700 bg-neutral-900/70"
                    : "border-neutral-800 bg-neutral-900/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-semibold ${p.hero ? "text-2xl" : "text-xl"}`}>
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-400">{p.tagline}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
                    {p.status}
                  </span>
                </div>

                {/* Metrics pills */}
                {p.metrics && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-neutral-700 px-2.5 py-0.5 text-xs font-mono text-neutral-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-sm lg:text-base text-neutral-300 leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-neutral-800 px-2.5 py-1 text-xs text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition"
                  >
                    View <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ── Stack ── */}
        <section id="stack" aria-label="Tech stack" className="mb-24 scroll-mt-20">
          <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-neutral-500">
            Stack
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((s) => (
              <div key={s.category} className="rounded-lg border border-neutral-800 p-4">
                <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {s.category}
                </h3>
                <p className="text-sm text-neutral-300">{s.items}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Writing ── */}
        <section id="writing" aria-label="Writing" className="mb-24 scroll-mt-20">
          <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-neutral-500">
            Writing
          </h2>
          <div className="space-y-4">
            {writing.map((w) => (
              <a
                key={w.title}
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-neutral-800 p-4 transition hover:border-neutral-700 group"
              >
                <div>
                  <h3 className="text-sm font-medium group-hover:text-white transition">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">{w.date}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-white transition" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-neutral-600">
            More writing coming soon. For now, find me on{" "}
            <a
              href="https://linkedin.com/in/austinmander"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-400 transition"
            >
              LinkedIn
            </a>
            .
          </p>
        </section>

        {/* ── Work With Me ── */}
        <section aria-label="Work with me" className="mb-24">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-neutral-500">
            Work With Me
          </h2>
          <p className="mb-6 text-neutral-300 leading-relaxed">
            I help professional services firms — accountancies, consultancies, agencies
            — become AI-native. Not hype. Not chatbots. Real automation that saves real
            hours.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-lg border border-neutral-800 p-4"
              >
                <h3 className="mb-2 text-sm font-semibold">{s.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
          <a
            href="mailto:austinmander04@gmail.com?subject=Consulting%20Enquiry"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        {/* ── Contact ── */}
        <section id="contact" aria-label="Contact" className="mb-20 scroll-mt-20">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-neutral-500">
            Contact
          </h2>
          <p className="mb-6 text-neutral-400">
            Building something? Hiring? Just want to chat? I&apos;m always up for a
            conversation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="mailto:austinmander04@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition"
            >
              <Mail className="h-4 w-4" /> austinmander04@gmail.com
            </a>
            <a
              href="https://github.com/Snack-JPG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/austinmander"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-neutral-800 pt-8 text-center text-xs text-neutral-600">
          © {new Date().getFullYear()} Austin Mander. Built with Next.js, deployed on
          Vercel.
        </footer>
      </main>
    </>
  );
}
