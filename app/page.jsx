import Link from "next/link";
import { projects } from "./lib/projects";

const stats = [
  { value: "$9K", label: "first client contract", note: "Built the demo overnight. Closed on first call." },
  { value: "550K", label: "lines in production", note: "Largest build: enterprise PMO platform, solo." },
  { value: "24", label: "public repositories", note: "Production code. All public." },
  { value: "<1 week", label: "average build time", note: "Most projects go from zero to deployed in days." },
];

const services = [
  { name: "AI Agents & Automation", desc: "Systems that handle repetitive knowledge work — chasing documents, processing emails, updating CRMs, running reports. Connected to your existing tools." },
  { name: "Full-Stack AI Applications", desc: "End-to-end builds. Frontend, backend, AI layer, deployment. From idea to production, usually in weeks." },
  { name: "Tool Integration (MCP)", desc: "Connect your AI to the software you already use. CRM, email, calendar, billing — one interface, natural language." },
  { name: "AI Strategy & Implementation", desc: "Figure out where AI actually saves you time, then build it. No slide decks. Working systems." },
];

const stack = {
  Languages: ["TypeScript", "Python", "Rust", "SQL", "Bash"],
  Frontend: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
  Backend: ["FastAPI", "Node.js", "Express", "PostgreSQL", "Redis", "SQLite"],
  "AI/ML": [
    "LangChain",
    "LangGraph",
    "LangSmith",
    "OpenAI API",
    "Claude API",
    "Anthropic",
    "ChromaDB",
    "pgvector",
    "RAG",
    "MCP Protocol",
    "OpenClaw",
    "Multi-Agent Systems",
  ],
  Infrastructure: ["Docker", "Vercel", "AWS", "GitHub Actions", "CI/CD"],
  Tools: ["Git", "Linux", "OpenClaw", "Himalaya"],
};

const aiEmployeeFlow = [
  { title: "Business Context", text: "Your SOPs, processes, and knowledge", accent: "cyan" },
  { title: "AI System", text: "Reasons through tasks, executes actions", accent: "amber" },
  { title: "Tool Layer", text: "Connected to CRM, email, docs, billing", accent: "cyan" },
  { title: "Human Oversight", text: "You approve what matters", accent: "amber" },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Austin Mander",
  url: "https://austinmander.com",
  email: "mailto:austinmander04@gmail.com",
  jobTitle: "AI Engineer",
  description:
    "UK-based AI engineer building production AI systems, automation, and full-stack applications for businesses.",
  sameAs: ["https://github.com/Snack-JPG"],
};

function StatCard({ value, label, note }) {
  return (
    <article className="panel reveal">
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
      <p className="stat-note">{note}</p>
    </article>
  );
}

function ProjectMockup({ title, label, large = false }) {
  return (
    <div
      className={`browser-mockup ${large ? "browser-mockup--large" : ""}`}
      aria-hidden="true"
    >
      <div className="browser-mockup__frame">
        <span />
        <span />
        <span />
      </div>
      <div className="browser-mockup__screen">
        <div className="browser-mockup__glow" />
        <p className="browser-mockup__label">{label}</p>
        <h3 className="browser-mockup__title">{title}</h3>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`panel project-card reveal ${project.featured ? "project-card--featured" : ""}`}>
      <div className="project-line" />
      <ProjectMockup
        title={project.title}
        label={project.screenshotLabel}
      />
      <div className="project-head">
        <div>
          <p className="eyebrow">{project.featured ? "Flagship" : "Case Study"}</p>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-summary">{project.summary}</p>
        </div>
        {project.repo.type === "private" ? (
          <span className="pill-link pill-link--private">{project.repo.label}</span>
        ) : (
          <Link
            href={project.repo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-link"
          >
            {project.repo.label}
          </Link>
        )}
      </div>
      <div className="badge-list">
        {project.tech.map((item) => (
          <span
            key={`${project.title}-${item}`}
            className="badge"
          >
            {item}
          </span>
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="case-study-link"
        aria-label={`View ${project.title} case study`}
      >
        View Case Study <span aria-hidden="true">{"->"}</span>
      </Link>
    </article>
  );
}

export default function Home() {
  return (
    <main
      id="main-content"
      className="page-shell"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <section
        id="top"
        className="hero-grid"
      >
        <article className="hero-card reveal">
          <div className="hero-glow" />
          <div className="hero-content hero-content--split">
            <div className="hero-copy">
              <span className="eyebrow">Austin Mander · AI Engineer</span>
              <h1 className="hero-title">I build AI systems that do the work.</h1>
              <p className="hero-text">
                Not chatbots. Not demos. Production systems that connect to your tools and run your operations without babysitting.
              </p>
            </div>

            <div className="hero-aside">
              <div
                className="headshot-placeholder"
                aria-hidden="true"
              >
                <span>AM</span>
              </div>
              <p className="hero-aside-text">UK-based · Taking on projects</p>
            </div>

            <div className="hero-actions">
              <Link
                href="#contact"
                className="cta-primary"
              >
                Work with me
              </Link>
              <Link
                href="#projects"
                className="cta-secondary"
              >
                Browse case studies
              </Link>
              <Link
                href="https://github.com/Snack-JPG"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
                aria-label="View Austin Mander on GitHub"
              >
                GitHub / Snack-JPG
              </Link>
            </div>
          </div>
        </article>

        <div className="stat-grid stat-grid--top">
          {stats.slice(0, 2).map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              note={stat.note}
            />
          ))}
        </div>
      </section>

      <section className="mid-grid">
        <article className="panel reveal">
          <p className="eyebrow">About</p>
          <p className="section-highlight">Two years of law at university, then I chose to build software full-time. Shipped a 550K-line enterprise platform solo in 8 months. First week freelancing: built a working demo overnight, closed a $9K contract on the first call. Now I build AI systems that replace manual workflows for businesses.</p>
        </article>

        <article
          id="services"
          className="panel reveal"
        >
          <p className="eyebrow">Services</p>
          <ul className="service-grid">
            {services.map((service) => (
              <li
                key={service.name}
                className="service-tile"
              >
                <strong>{service.name}</strong>
                <span className="service-desc">{service.desc}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="stat-grid">
          {stats.slice(2).map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              note={stat.note}
            />
          ))}
        </div>
      </section>

      <section className="panel quote-panel reveal">
        <blockquote className="quote-block">
          <p className="quote-text">&ldquo;Every company needs an AI agent strategy. This is as big as HTML.&rdquo;</p>
          <cite className="quote-cite">— Jensen Huang, NVIDIA GTC 2026</cite>
        </blockquote>
      </section>

      <section className="panel ai-system-panel reveal">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title">Your tools. Your data. One AI that ties it together.</h2>
        </div>
        <div className="ai-system-diagram">
          <div className="ai-system-column">
            <div className="diagram-card diagram-card--knowledge">
              <p className="diagram-kicker">Context</p>
              <h3>Business memory</h3>
            </div>
            <div className="diagram-card diagram-card--human">
              <p className="diagram-kicker">Control</p>
              <h3>Human approval</h3>
            </div>
          </div>

          <div className="diagram-core">
            <div className="diagram-core__pulse" />
            <div className="diagram-card diagram-card--agent">
              <p className="diagram-kicker">Core</p>
              <h3>AI Employee</h3>
            </div>
          </div>

          <div className="ai-system-column">
            <div className="diagram-card diagram-card--tools">
              <p className="diagram-kicker">Tools</p>
              <h3>CRM · Email · Docs · Billing</h3>
            </div>
            <div className="diagram-card diagram-card--ops">
              <p className="diagram-kicker">Output</p>
              <h3>Work gets done</h3>
            </div>
          </div>

          <div className="diagram-lines" aria-hidden="true">
            <span className="diagram-line diagram-line--left-top" />
            <span className="diagram-line diagram-line--left-bottom" />
            <span className="diagram-line diagram-line--right-top" />
            <span className="diagram-line diagram-line--right-bottom" />
          </div>
        </div>
        <ul className="ai-system-footer">
          {aiEmployeeFlow.map((item) => (
            <li
              key={item.title}
              className={`system-pill system-pill--${item.accent}`}
            >
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="projects"
        className="section-stack"
      >
        <div className="section-heading reveal">
          <p className="eyebrow">Projects</p>
          <h2 className="section-title">Things I&apos;ve shipped.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>
      </section>

      <section
        id="stack"
        className="panel reveal"
      >
        <p className="eyebrow">Tech Stack</p>
        <div className="stack-grid">
          {Object.entries(stack).map(([group, items]) => (
            <div
              key={group}
              className="stack-card"
            >
              <h3 className="stack-title">{group}</h3>
              <div className="badge-list">
                {items.map((item) => (
                  <span
                    key={`${group}-${item}`}
                    className="badge"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="panel contact-panel reveal"
      >
        <div className="contact-glow" />
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title">Got a workflow that needs fixing?</h2>
          </div>
          <div className="contact-links">
            <Link
              href="mailto:austinmander04@gmail.com"
              className="contact-link"
            >
              austinmander04@gmail.com
            </Link>
            <Link
              href="https://github.com/Snack-JPG"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label="Open Austin Mander GitHub profile"
            >
              github.com/Snack-JPG
            </Link>
            <span className="contact-link contact-link--muted">UK-based · Available for freelance and consulting</span>
            <Link
              href="mailto:austinmander04@gmail.com?subject=Work%20with%20Austin%20Mander"
              className="cta-primary"
            >
              Work with me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
