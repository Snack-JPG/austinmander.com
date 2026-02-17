# austinmander.com - Website Specification

## Overview

**Purpose:** Personal brand website for LinkedIn and consulting lead generation.
**Positioning:** "I build AI systems that actually work."
**Target:** Non-technical business decision-makers looking for AI help.
**Launch Target:** Before first LinkedIn post (Week 1)

---

## Design Direction

### Philosophy
```
Builder aesthetic, not marketing aesthetic.

- Clean, fast, minimal
- Substance over style
- Real screenshots, not stock images
- Proof-first design
- Mobile-first (decision makers scroll on phones)
```

### Visual Style
- **Mode:** Dark mode preferred (feels technical/builder)
- **Typography:** Monospace for headings (builder vibe), clean sans-serif for body
- **Colors:**
  - Background: Near-black (#0a0a0a) or dark gray (#111)
  - Text: White/light gray
  - Accent: Subtle blue or green (not aggressive)
- **Spacing:** Generous whitespace, not cramped
- **Images:** Real screenshots of PulseAI, authentic photos

### Inspiration
- linear.app (clean, confident)
- vercel.com (developer-focused but accessible)
- Minimal portfolio sites

---

## Site Structure

```
austinmander.com/
├── / (Homepage)           ← Hero + proof + work preview + CTA
├── /work                  ← Projects + case studies
├── /about                 ← Your story
├── /services              ← What you offer
└── /contact               ← Calendly + email
```

**Keep it simple.** 5 pages maximum for launch.

---

## Page Specifications

### 1. Homepage (/)

#### Section: Hero
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  I build AI systems                                         │
│  that actually work.                                        │
│                                                             │
│  21 years old. No traditional coding background.            │
│  543,000 lines of production software shipped.              │
│                                                             │
│  I help businesses figure out what AI can actually do       │
│  for them—and what it can't.                                │
│                                                             │
│  [See my work]  [Let's talk]                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Requirements:**
- Large, bold headline
- Subtext with key proof points
- Two CTA buttons (primary: See my work, secondary: Let's talk)
- Clean, no clutter

#### Section: Proof Strip
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   543K+         85+            19             2             │
│   Lines of     Database       PRs in       Products        │
│   Code         Migrations     2 Weeks      Shipped         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Requirements:**
- Horizontal strip below hero
- 4 key metrics
- Numbers should be prominent
- Labels below in smaller text

#### Section: What I Do
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  I build AI that does things,                               │
│  not just answers questions.                                │
│                                                             │
│  → AI integration that fits your actual workflow            │
│  → Automation that saves hours, not minutes                 │
│  → Custom tools that solve your specific problems           │
│  → Honest assessments of what's possible vs marketing       │
│                                                             │
│  Most AI advice is hype. I build things that work.          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Requirements:**
- Clear value propositions
- Bullet points with arrows
- Contrarian positioning statement

#### Section: Featured Project
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Currently Building                                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  [Screenshot of PulseAI dashboard]                  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  CHANGE RADAR                                               │
│  AI-Powered Project Intelligence                            │
│                                                             │
│  Helps teams track projects, spot risks early, and          │
│  generate reports automatically.                            │
│                                                             │
│  543K lines • Enterprise security • AI that takes action    │
│                                                             │
│  [Learn more →]                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Requirements:**
- Real screenshot of PulseAI (blur sensitive data if needed)
- Project name and description
- Key stats
- Link to /work

#### Section: CTA
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Want AI that actually works for your business?             │
│                                                             │
│  I help companies cut through the hype and build            │
│  systems that save real time and money.                     │
│                                                             │
│  [Book a call]                                              │
│                                                             │
│  or email austin@genflow.systems                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Requirements:**
- Simple, direct CTA
- Book a call button (links to Calendly)
- Email fallback

---

### 2. Work Page (/work)

#### Header
```
What I've Built

I don't just talk about AI. I ship it.
```

#### Project: Change Radar (Primary)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Large screenshot of PulseAI]                              │
│                                                             │
│  CHANGE RADAR                                               │
│  AI-Powered Project Intelligence                            │
│                                                             │
│  Enterprise PMO platform that helps teams track projects,   │
│  spot risks, and generate reports automatically.            │
│                                                             │
│  What it does:                                              │
│  → Tracks projects across entire organisations              │
│  → Spots problems before they become expensive              │
│  → Generates board-ready reports in seconds                 │
│  → AI that takes action, not just answers                   │
│                                                             │
│  The numbers:                                               │
│  → 543K lines of TypeScript                                 │
│  → 85+ database migrations                                  │
│  → 4 specialist AI agents                                   │
│  → Enterprise-grade security                                │
│                                                             │
│  Status: Launching 2026                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Project: SAP Automation
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  SAP AUTOMATION                                             │
│  RPA for Manufacturing                                      │
│                                                             │
│  Automated work order scanning and attachment to sales      │
│  orders for a manufacturing company.                        │
│                                                             │
│  Results:                                                   │
│  → 6+ hours saved per week                                  │
│  → Zero manual data entry errors                            │
│  → Runs automatically, no babysitting                       │
│                                                             │
│  Built with UiPath + SAP integration                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Project: Client Work (Placeholder)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  CLIENT PROJECTS                                            │
│  AI Integration & Automation                                │
│                                                             │
│  Various automation and AI integration projects for         │
│  businesses. Details available on request.                  │
│                                                             │
│  [Get in touch to learn more]                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 3. About Page (/about)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Photo of Austin - authentic, not corporate]               │
│                                                             │
│  I'm Austin.                                                │
│                                                             │
│  I'm 21. I took a gap year from law school at Birmingham    │
│  to build AI systems and businesses.                        │
│                                                             │
│  Last year I shipped 543,000 lines of production            │
│  software—without a traditional coding background.          │
│  I learned to direct AI instead of learning to type code.   │
│                                                             │
│  ─────────────────────────────────────────────────          │
│                                                             │
│  What I believe:                                            │
│                                                             │
│  → Building beats talking. I'd rather show you working      │
│    software than a slide deck.                              │
│                                                             │
│  → Most AI is hype. The 10% that actually works can         │
│    transform how you operate. I focus on that 10%.          │
│                                                             │
│  → The bottleneck isn't typing speed, it's thinking speed.  │
│    AI handles the implementation. I handle the decisions.   │
│                                                             │
│  → Young isn't a disadvantage. It means no legacy           │
│    thinking, no "that's how it's always been done."         │
│                                                             │
│  ─────────────────────────────────────────────────          │
│                                                             │
│  Currently:                                                 │
│  → Building Change Radar (AI-powered project intelligence)  │
│  → Running GenFlow Systems (AI consulting)                  │
│  → Sharing what I learn on LinkedIn                         │
│                                                             │
│  ─────────────────────────────────────────────────          │
│                                                             │
│  Want to work together?                                     │
│                                                             │
│  [Let's talk]                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4. Services Page (/services)

#### Header
```
How I Can Help

I help businesses use AI that actually works.
No hype. No buzzwords. Just systems that save time and money.
```

#### Service Cards
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  AI INTEGRATION                                             │
│                                                             │
│  Connect AI to your existing workflows. Not a chatbot       │
│  bolted on—AI that actually does things in your systems.    │
│                                                             │
│  → Document processing and analysis                         │
│  → Automated reporting and insights                         │
│  → Smart search across your data                            │
│  → Custom AI assistants for your team                       │
│                                                             │
│  Typical outcome: 5-20 hours saved per week                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PROCESS AUTOMATION                                         │
│                                                             │
│  Eliminate the repetitive work that drains your team.       │
│  I find the bottlenecks and automate them.                  │
│                                                             │
│  → Data entry and transfer between systems                  │
│  → Report generation and distribution                       │
│  → Email processing and routing                             │
│  → Approval workflows                                       │
│                                                             │
│  Typical outcome: 80% reduction in manual work              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CUSTOM SOFTWARE                                            │
│                                                             │
│  Need something built? I ship fast.                         │
│  MVPs in weeks, not months.                                 │
│                                                             │
│  → Internal tools and dashboards                            │
│  → Customer-facing applications                             │
│  → AI-powered features for existing products                │
│                                                             │
│  Typical timeline: 2-6 weeks for MVP                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  AI AUDIT                                                   │
│                                                             │
│  Not sure where AI can help? I'll tell you.                 │
│  And I'll tell you where it can't.                          │
│                                                             │
│  → Review your current workflows                            │
│  → Identify automation opportunities                        │
│  → Honest assessment of what's possible                     │
│  → Prioritized roadmap                                      │
│                                                             │
│  Outcome: Clear plan, no BS                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Process Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  How It Works                                               │
│                                                             │
│  1. We talk         You tell me the problem                 │
│  2. I assess        Is this something AI can help with?     │
│  3. Proposal        Clear scope, timeline, and price        │
│  4. Build           Working software, not slide decks       │
│  5. Support         I don't disappear after delivery        │
│                                                             │
│  [Book a call]                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 5. Contact Page (/contact)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Let's Talk                                                 │
│                                                             │
│  Got a project in mind? Not sure if AI can help?            │
│  Just want to chat? Happy to talk.                          │
│                                                             │
│  ─────────────────────────────────────────────────          │
│                                                             │
│  Book a call                                                │
│                                                             │
│  [Calendly embed - 15 min intro call]                       │
│                                                             │
│  ─────────────────────────────────────────────────          │
│                                                             │
│  Or email me                                                │
│                                                             │
│  austin@genflow.systems                                     │
│                                                             │
│  ─────────────────────────────────────────────────          │
│                                                             │
│  Connect on LinkedIn                                        │
│                                                             │
│  linkedin.com/in/austin-mander                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Navigation

### Desktop
```
[Austin Mander]                    Work   About   Services   [Let's Talk]
```

### Mobile
```
[Austin Mander]                                              [☰]

Menu:
- Work
- About
- Services
- Contact
```

---

## Footer

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Austin Mander                                              │
│  I build AI systems that actually work.                     │
│                                                             │
│  ─────────────────────────────────────────────────          │
│                                                             │
│  austin@genflow.systems                                     │
│  linkedin.com/in/austin-mander                              │
│                                                             │
│  ─────────────────────────────────────────────────          │
│                                                             │
│  Delivered through GenFlow Systems Ltd                      │
│                                                             │
│  © 2026                                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Requirements

### Stack (Keep Existing)
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Vercel deployment

### Simplifications for Launch
- **Remove:** Supabase database (not needed for static site)
- **Remove:** Complex API routes
- **Remove:** Newsletter, lead capture forms (use email/Calendly instead)
- **Keep:** Simple, fast, static pages

### Performance Targets
- Lighthouse score: 95+
- First Contentful Paint: <1s
- Total page size: <500KB

### SEO
- Title: "Austin Mander - AI Systems Builder"
- Description: "I build AI systems that actually work. 543K lines of production software shipped. Helping businesses use AI that saves real time and money."
- OG Image: Design a simple card with headline + photo

---

## Assets Needed

### Images
- [ ] Professional photo of Austin (for About page + OG image)
- [ ] Screenshot of PulseAI dashboard (for Work page + Homepage)
- [ ] Optional: Screenshot of code editor with PulseAI open

### Integrations
- [ ] Calendly link (15-min intro call)
- [ ] Email: austin@genflow.systems

---

## Launch Checklist

### Must Have (Before First Post)
- [ ] Homepage complete
- [ ] About page complete
- [ ] Work page with PulseAI
- [ ] Contact page with Calendly
- [ ] Mobile responsive
- [ ] Fast loading (<2s)
- [ ] Deployed to Vercel

### Nice to Have (Can Add Later)
- [ ] Services page
- [ ] Blog/Writing section
- [ ] Analytics (Plausible/Fathom)
- [ ] More case studies

---

## Copy Document Reference

All text content is in `/docs/WEBSITE_COPY.md`
