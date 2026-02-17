import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowDown,
  ArrowRight,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Change Radar",
    tagline: "Enterprise project intelligence — 550K lines of TypeScript",
    description:
      "Multi-tenant PMO SaaS built entirely solo. 8 orchestrated AI engines for risk analysis, automated reporting, and natural language queries. 85+ database migrations, Row-Level Security, AES-256-GCM encryption, full CI/CD. Presented directly to the CIO of Allianz.",
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
    screenshot: null, // placeholder
  },
  {
    title: "chase.md",
    tagline: "AI-powered document chasing for accountancy practices",
    description:
      "Intelligent multi-channel escalation engine that chases clients for tax documents. Email → SMS → WhatsApp escalation with AI document recognition, magic-link client portal, and practice dashboard. Built from concept to working app in a single evening.",
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
  },
  {
    title: "Team Playbook",
    tagline: "AI knowledge base for operations teams",
    description:
      "RAG-powered internal knowledge base. Upload company SOPs, search with natural language. Built for manufacturing — workers ask questions, get answers from company docs instead of bothering supervisors.",
    tech: [
      "Next.js",
      "Supabase",
      "OpenAI Embeddings",
      "pgvector",
      "Semantic Search",
    ],
    status: "Complete",
    link: null,
  },
  {
    title: "TradeHub",
    tagline: "Automated websites for tradespeople",
    description:
      "End-to-end platform: scrape prospects from Google, generate bespoke websites, deploy automatically, cold-outreach with the finished site. Built the pipeline, ran the outreach, learned the sales lessons.",
    tech: [
      "HTML/CSS",
      "Vercel",
      "Cloudflare",
      "Google Places API",
      "Schema Markup",
    ],
    status: "Live",
    link: "https://tradehub.directory",
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

const timeline = [
  {
    year: "2023–Present",
    title: "Change Radar",
    desc: "Started building what became a 550K-line enterprise SaaS at 19. Solo. No funding, no team, no degree. Presented to the CIO of Allianz.",
  },
  {
    year: "2024–Present",
    title: "GenFlow Systems (AI Consulting)",
    desc: "Help professional services firms become AI-native. AI audits, team training, custom tool builds. My philosophy: teach them to fish, then leave.",
  },
  {
    year: "2025",
    title: "chase.md",
    desc: "Spotted a gap in accountancy tech. Built the MVP in an evening. AI-powered document chasing — solving a £945M industry problem.",
  },
  {
    year: "2024",
    title: "TradeHub",
    desc: "Built an automated website business for tradespeople. Learned cold calling, sales, and that building the product is the easy part.",
  },
  {
    year: "2024",
    title: "Team Playbook",
    desc: "RAG-powered knowledge base for manufacturing. Turned company SOPs into a searchable AI assistant.",
  },
  {
    year: "—",
    title: "University of Birmingham · Law",
    desc: "Started Law. Realised I'd rather build things. Dropped out. No regrets.",
  },
  {
    year: "—",
    title: "A-Level Computer Science · Grade A",
    desc: "Where it started.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:py-32">
      {/* ── Hero ── */}
      <section className="mb-32">
        <div className="mb-6 h-20 w-20 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 text-xs">
          {/* headshot placeholder */}
          AM
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Austin Mander
        </h1>
        <p className="mt-2 text-lg text-neutral-400">
          Full Stack Developer · Builder · AI Engineer
        </p>
        <p className="mt-6 max-w-xl text-neutral-300 leading-relaxed">
          I build production software that most teams need 10 people for.
          550,000 lines of TypeScript. No degree. No team. Just shipping.
        </p>
        <div className="mt-8 flex items-center gap-5">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200"
          >
            View Projects <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="text-sm text-neutral-400 underline underline-offset-4 hover:text-white transition"
          >
            Get in touch
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

      {/* ── About ── */}
      <section className="mb-32">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-neutral-500">
          About
        </h2>
        <div className="space-y-4 text-neutral-300 leading-relaxed">
          <p>
            I&apos;m 21 and I&apos;ve shipped more production code than most mid-career
            developers. Not because I&apos;m smarter — because I build relentlessly.
          </p>
          <p>
            I started Change Radar at 19. It&apos;s now a 550,000-line enterprise SaaS
            platform with 8 AI engines, multi-tenant architecture, and SOC 2-grade
            security. I built every line. Presented it to the CIO of Allianz. I was the
            youngest person in the room by 20 years.
          </p>
          <p>
            I didn&apos;t finish a CS degree. I dropped out of a Law course at the
            University of Birmingham when I realised I&apos;d rather build things than
            study them. Best decision I&apos;ve made.
          </p>
          <p>
            Now I build AI-powered products and help professional services firms become
            AI-native. My consulting practice works with accountancies, consultancies,
            and agencies — teaching teams to automate their own work, not just giving
            them a chatbot.
          </p>
          <p className="text-neutral-400 italic">
            Ship fast, learn by building, stay honest about what you don&apos;t know. The
            best way to prove you can build is to have already built it.
          </p>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="mb-32 scroll-mt-20">
        <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-neutral-500">
          What I&apos;ve Built
        </h2>
        <div className="space-y-12">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition hover:border-neutral-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{p.tagline}</p>
                </div>
                <span className="shrink-0 rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-400">
                  {p.status}
                </span>
              </div>
              {p.screenshot === null && p.title === "Change Radar" && (
                <div className="my-4 flex h-40 items-center justify-center rounded-lg border border-dashed border-neutral-700 text-sm text-neutral-600">
                  Screenshots coming soon
                </div>
              )}
              <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
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
      <section className="mb-32">
        <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-neutral-500">
          Stack
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
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

      {/* ── Experience / Timeline ── */}
      <section className="mb-32">
        <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-neutral-500">
          The Path
        </h2>
        <div className="space-y-8">
          {timeline.map((t, i) => (
            <div key={i} className="flex gap-6">
              <span className="mt-0.5 w-24 shrink-0 text-sm text-neutral-600 font-mono">
                {t.year}
              </span>
              <div>
                <h3 className="font-medium">{t.title}</h3>
                <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="mb-20 scroll-mt-20">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-neutral-500">
          Let&apos;s Talk
        </h2>
        <p className="mb-6 text-neutral-300">
          Building something interesting? Need a developer who ships? Want to make your
          team AI-native?
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
  );
}
