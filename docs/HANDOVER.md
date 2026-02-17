# Website Build Handover - austinmander.com

> **For the next Claude session:** This document contains everything you need to build Austin's personal website. Read this fully before starting.

---

## The Task

Build a personal website for Austin Mander at `/Users/austin/Desktop/austinmander.com`.

**Requirements:**
- Modern, minimal, fast
- Mobile-first responsive
- Single page (sections, not multiple pages)
- Easy to update
- Deploy-ready for Vercel

---

## About Austin

**Who he is:**
- 21 years old, from Birmingham UK
- Gap year from law at University of Birmingham
- Built a 543,000 line enterprise SaaS (PulseAI) using AI-assisted development
- No traditional coding background (learned to direct AI to build)
- Now helps businesses integrate AI practically

**What he does:**
- AI Integration Consulting (audits, implementations)
- Training non-technical teams to automate their work
- Building products for professional services firms

**His positioning:**
> "I help companies integrate AI—without the guesswork. Everyone will figure out AI eventually. I help you get there faster."

**Voice traits:**
- Direct, not aggressive
- Confident, not arrogant
- Technical, not jargon-heavy
- Proof-first, not humble-brag
- Young energy, not naive

**Anti-patterns (never use):**
- "Let's dive in"
- "Game-changer"
- "At the end of the day"
- Excessive emojis
- Corporate speak
- Hedged opinions

---

## The Offers

### 1. AI Integration Audit (Entry Point)
- **Price:** £1,500
- **Duration:** One week
- **Deliverable:** Prioritized opportunities, ROI calculations, quick wins, roadmap
- **For:** Companies that don't know where to start

### 2. WorkPilot (Training Program)
- **What:** 4-week program teaching teams to automate their own work
- **Price:** £5,000-8,000 (program) + £500/month (ongoing)
- **For:** Operations teams doing repetitive work
- **Tagline:** "Your team builds automation. We teach them how."

### 3. Done-For-You Automation
- **What:** Custom automation builds (like ChaseIQ for accounting firms)
- **Price:** £3,000-10,000+ depending on scope
- **Model:** Managed implementation (their infrastructure, you maintain)
- **For:** Companies that want results, not skills

### 4. Fractional AI Lead
- **Price:** £3,000-5,000/month
- **What:** Ongoing AI strategy, implementation, training, tool evaluation
- **For:** Companies that need AI leadership but can't hire full-time

---

## Proof Points

**PulseAI / Change Radar:**
- 543,000 lines of production code
- Built in 5 months
- Multi-tenant architecture with Row-Level Security
- 8-engine AI orchestration
- SOC 2-compliant audit logging
- 85+ database migrations
- AES-256-GCM field-level encryption

**The Story:**
> "3 years ago, I couldn't write a line of code. 5 months later, I'd built 543,000 lines of enterprise AI software."

---

## Website Structure

### Sections (in order)

1. **Hero**
   - Headline + subheadline
   - Brief credibility hook (543K lines)
   - Primary CTA: Book a call

2. **The Problem**
   - Manual work is killing productivity
   - "Too small to build custom software for" - equation just flipped
   - Tangible example (file renaming = 8 hours/day)

3. **What I Do**
   - Overview statement
   - 3-4 service cards (Audit, WorkPilot, Done-For-You, Fractional)

4. **Proof**
   - PulseAI showcase
   - Stats that impress (543K lines, 5 months, etc.)
   - Screenshot if available

5. **How It Works**
   - 3 steps: Talk → Audit → Fix
   - Simple, no pressure

6. **Who This Is For / Not For**
   - Qualify the visitor
   - Honest about fit

7. **About**
   - Brief personal story
   - Photo
   - Why he's different (not traditional dev path)

8. **FAQ**
   - Common objections handled

9. **Final CTA**
   - Book a call
   - Email alternative

10. **Footer**
    - Contact info
    - LinkedIn
    - © 2026

---

## Existing Copy

The full copy is at: `/Users/austin/Desktop/GenWealth/Projects/Templates/website-copy.md`

**Key sections to use/adapt:**

### Hero
```
I help companies integrate AI—without the guesswork.

3 years ago, I couldn't write a line of code.
5 months later, I'd built 543,000 lines of enterprise AI software.

Now I help teams skip the months of fumbling and get to
"this changes everything" in days.

[Book a Free Call]
```

### The Tangible Example
```
Your team manually renames files from emails. Every day.
30 seconds each time.

50 employees. 20 times a day.
That's 8 hours of human time on a task AI does in 2 seconds.

8 hours. Every single day. On one task.

I'll find fifty more like it.
```

### How It Works
```
1. We talk
   15 minutes. Free. You tell me what's not working.
   I'll tell you honestly if I can help.

2. I audit
   One week. I find every opportunity and build your roadmap.
   You'll know exactly what's worth doing.

3. We fix it
   Training, building, or ongoing support.
   Whatever actually fits your situation.

No long sales process. No pressure.
If it's not a fit, I'll tell you.
```

---

## Design Direction

### Style
- Minimal, lots of white space
- Dark text on light background
- One accent color (suggest: deep blue or teal)
- Modern sans-serif font (Inter, Geist, or similar)
- Professional but approachable (not corporate)

### Inspiration
- Linear.app (clean, developer-focused)
- Vercel.com (minimal, fast)
- Cal.com (friendly, clear)

### Key Principles
- Fast loading (no heavy images/animations)
- Scannable (clear hierarchy)
- Mobile-first (most visitors will be on phone from LinkedIn)
- CTA buttons prominent
- Easy to read (good line length, spacing)

### No:
- Parallax scrolling
- Heavy animations
- Stock photos
- Gradient overload
- Cookie banners (if possible)

---

## Tech Stack Recommendation

### Option A: Next.js (Recommended)
```
/austinmander.com
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Layout with metadata
│   └── globals.css       # Styles
├── components/
│   ├── Hero.tsx
│   ├── Problem.tsx
│   ├── Services.tsx
│   ├── Proof.tsx
│   ├── HowItWorks.tsx
│   ├── WhoFor.tsx
│   ├── About.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── public/
│   ├── austin.jpg        # Photo
│   └── pulseai.png       # Screenshot
├── package.json
├── tailwind.config.js
└── next.config.js
```

**Why Next.js:**
- Fast (static generation)
- Easy to deploy on Vercel
- Austin knows it (from PulseAI)
- Can add pages later if needed

### Styling: Tailwind CSS
- Utility-first, fast to build
- Responsive built-in
- Consistent spacing/colors

### Deployment: Vercel
- Connect to GitHub
- Auto-deploy on push
- Custom domain easy

---

## Components to Build

### Hero
- Full viewport height (or close)
- Headline + subheadline
- CTA button
- Maybe subtle background element

### ServiceCard
- Icon or visual
- Title
- Description
- Price
- "Learn more" or CTA

### ProofSection
- Big stats (543K, 5 months, etc.)
- Screenshot of PulseAI
- Brief description

### Step (for How It Works)
- Number
- Title
- Description
- Simple layout

### FAQItem
- Expandable/collapsible
- Question + answer

### CTASection
- Headline
- Button
- Email fallback

---

## CTA Destinations

- **Primary:** Calendly link (15-min discovery call)
- **Email:** austin@austinmander.com
- **LinkedIn:** linkedin.com/in/austinmander

---

## Assets Needed

1. **Photo of Austin** - Professional but approachable headshot
2. **PulseAI screenshot** - Dashboard showing the product
3. **Favicon** - Simple "AM" or similar
4. **OG Image** - For social sharing (1200x630)

If these don't exist, use placeholders and note what's needed.

---

## SEO Metadata

```
Title: Austin Mander | AI Integration for Growing Businesses

Description: I help companies integrate AI without the guesswork. From audits to implementation to training—skip the fumbling and get results in weeks, not months.

Keywords: AI consultant, AI integration, business automation, AI training, fractional AI lead, UK
```

---

## What Success Looks Like

After this session:
- [ ] Website is built and runs locally
- [ ] All sections are implemented with real copy
- [ ] Mobile responsive
- [ ] Ready to deploy to Vercel
- [ ] Clear instructions for Austin to add photo/screenshots
- [ ] Calendly integration ready (just needs link)

---

## File Locations for Reference

- Website copy: `/Users/austin/Desktop/GenWealth/Projects/Templates/website-copy.md`
- Voice guide: `/Users/austin/Desktop/GenWealth/Content/Voice/austin-voice-guide.md`
- WorkPilot offer: `/Users/austin/Desktop/GenWealth/Projects/WorkPilot-Offer.md`
- ChaseIQ PRD: `/Users/austin/Desktop/GenWealth/Projects/ChaseIQ/PRD.md`
- 12-week plan: `/Users/austin/Desktop/GenWealth/12-Week-Plan.md`

---

## Questions for Austin (If Unclear)

1. Do you have a headshot photo ready?
2. Do you have a PulseAI screenshot?
3. What's your Calendly link?
4. Preferred accent color?
5. Any sections to skip for MVP?

---

## Start Command

```bash
cd /Users/austin/Desktop/austinmander.com
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

Then build out the components section by section.

---

> **Remember:** This is Austin's personal brand site. It should feel like HIM - direct, confident, proof-first. Not a generic consulting template. Read the voice guide before writing any copy.
