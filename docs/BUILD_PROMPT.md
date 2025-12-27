# Austin Mander Website Build Prompt

## Project Overview

Build a high-converting single-page website for austinmander.com - an AI automation consultancy targeting agency owners and consultancies. The site has one job: turn visitors into booked discovery calls.

**Core positioning:** "I don't just consult on AI automation - I build AI software. Currently developing Change Radar, an AI-powered project intelligence platform."

**Target audience:**

- Marketing/creative agency owners (5-30 employees)
- Consultancy founders
- Professional services firms
- Tech-adjacent business owners who know AI matters but don't have time to figure it out

**Desired action:** Book a free 15-minute AI workflow audit via Calendly

-----

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **3D:** React Three Fiber + Drei
- **Animations:** Framer Motion
- **Fonts:** Inter (body) + Space Grotesk or JetBrains Mono (headings/accents)
- **Deployment:** Vercel
- **Booking:** Calendly embed (URL to be provided)

-----

## Design Principles

### Visual Identity

- **Primary color:** Deep blue-black (#0a0a0f) background
- **Accent color:** Electric blue (#3b82f6) or cyan (#06b6d4) for CTAs and highlights
- **Secondary accent:** Subtle purple (#8b5cf6) for gradients
- **Text:** White (#ffffff) for headings, gray (#a1a1aa) for body
- **Style:** Dark, technical, premium - not generic SaaS template

### Design Rules

1. **No stock photos** - only custom 3D elements, icons, and screenshots
1. **Generous whitespace** - let elements breathe
1. **Subtle animations** - micro-interactions on hover, smooth scroll
1. **Mobile-first** - must work perfectly on mobile (50%+ of traffic)
1. **Fast** - no unnecessary dependencies, optimize 3D for performance
1. **No clutter** - every element must earn its place

### Typography

- Headings: Bold, large, high contrast
- Body: 18px minimum, comfortable line height (1.6)
- No walls of text - short paragraphs, scannable
- Strategic use of monospace for technical credibility

-----

## Page Structure

### Section 1: Hero (100vh)

**Layout:**

- Left side: Headline, subheadline, CTA button
- Right side: 3D radar element (see 3D specification below)
- On mobile: 3D element above, text below

**Content:**

```
Headline: AI Automation for Agencies & Consultancies

Subheadline: Stop wasting hours on repetitive work. Proposals, reports, client updates, data entry — I'll automate it so you can focus on what actually matters.

CTA Button: Book Your Free AI Audit →

Small text below CTA: "15 minutes. No pitch. Just actionable insights."
```

**Interactions:**

- CTA button: Subtle glow on hover, slight scale
- 3D element: Continuous animation, interactive on hover/mouse move
- Smooth scroll indicator at bottom

-----

### Section 2: Problem Statement

**Layout:** Centered text, max-width 700px

**Content:**

```
You didn't start your business to copy data between spreadsheets.

Or write the same status update emails every week. Or manually compile board reports. Or chase your team for updates that should just... exist.

Yet here you are. Doing work that doesn't need you, because setting up "automation" always felt like another project you don't have time for.

That's where I come in.
```

**Style:**

- First line larger, bolder
- Subtle fade-in on scroll
- Maybe a thin accent line or gradient border

-----

### Section 3: What I Do

**Layout:** Three cards in a row (stack on mobile)

**Content:**

```
Card 1: AI Workflow Audit
- 15-minute call to map your biggest time drains
- Walk away with 3 specific automations you could implement
- Free — no strings attached
[Book Now]

Card 2: Single Automation Build
- One workflow, fully automated
- Email sequences, report generation, data sync — you name it
- From £750
[Book Now]

Card 3: Full Automation System
- Complete infrastructure for your business
- Multiple workflows, integrations, AI assistants
- Ongoing support included
- From £2,500
[Book Now]
```

**Style:**

- Cards with subtle border, slight hover lift
- Icon or small illustration for each
- Price anchoring visible but not dominant
- All CTAs go to same Calendly (qualify on call)

-----

### Section 4: Proof / Credibility

**Layout:** Two columns - left text, right visual

**Content - Left:**

```
I don't just consult. I build.

While I help clients automate their businesses, I'm also building my own AI software.

Change Radar is an AI-powered project intelligence platform — it predicts delays, generates board reports, and surfaces insights your PM tool misses.

Why does this matter to you? Because I'm not someone who watched a YouTube tutorial and started calling myself an "AI consultant." I architect and build production AI systems.

Your automation isn't a side project for me. It's the same craft I apply to my own products.
```

**Content - Right:**

- Screenshot or 3D mockup of Change Radar interface
- Or: Animated mini-demo showing a report being generated
- Badge/link: "Follow the build →" (links to LinkedIn)

**Below - Trust Elements:**

```
Tools I work with:
[Logos: Claude/Anthropic, OpenAI, Notion, Make/Zapier, Slack, Google Workspace, Airtable, etc.]

What clients say:
[Testimonial placeholder - "Austin automated our weekly reporting and saved us 6 hours every week. The ROI was immediate." — Name, Agency]
(Note: Use placeholder, will add real testimonials later)
```

-----

### Section 5: How It Works

**Layout:** Three steps, horizontal with connecting line (vertical on mobile)

**Content:**

```
Step 1: Book Your Free Audit
15 minutes to understand your workflows and identify the biggest opportunities.

Step 2: Get Your Automation Plan
I'll map out exactly what to automate, how long it takes, and what it costs. No obligation.

Step 3: Reclaim Your Time
I build it, you approve it, and you stop doing work that doesn't need you.
```

**Style:**

- Numbered with accent color
- Simple icons or subtle animations
- Clean, not cluttered

-----

### Section 6: FAQ (Optional but recommended)

**Layout:** Accordion style, centered

**Content:**

```
Q: What kind of tasks can you automate?
A: Anything repetitive and rule-based. Common examples: email responses, report generation, data transfer between tools, client onboarding, invoice processing, status updates, and document creation. If you do it the same way every time, it can probably be automated.

Q: How long does a typical project take?
A: Single automations: 1-2 weeks. Full systems: 4-8 weeks. I'll give you a specific timeline after the audit.

Q: Do I need technical knowledge?
A: No. I build systems that non-technical people can use and maintain. You'll get documentation and training.

Q: What if I'm not sure what to automate?
A: That's what the free audit is for. Most people know they're wasting time but aren't sure where to start. I'll identify the opportunities.

Q: Why should I hire you instead of figuring it out myself?
A: You could. But the 20 hours you'd spend learning and implementing is 20 hours not spent on clients. I've already done the learning. You get the result without the ramp-up.
```

-----

### Section 7: Final CTA

**Layout:** Full-width, centered, strong visual emphasis

**Content:**

```
Let's find your 10 hours.

Book a free 15-minute audit. I'll show you exactly where AI can save you time — no pitch, no pressure.

[Book Your Free AI Audit]

Prefer email? austin@austinmander.com
```

**Style:**

- Gradient background or accent color block
- Large CTA button
- This section should feel like a destination

-----

### Footer

**Layout:** Simple, minimal

**Content:**

```
Austin Mander
AI Automation Consultant | Building Change Radar

[LinkedIn Icon] [Email Icon] [Maybe Twitter/X]

© 2025
```

-----

## 3D Element Specification: The Radar

### Concept

An animated 3D radar visualization that represents "scanning for inefficiencies" — ties to the name Mander (sounds like "Radar") and connects to Change Radar branding.

### Visual Description

- **Base:** Circular radar dish/grid, slightly tilted toward viewer (isometric-ish angle)
- **Sweep:** Rotating radar sweep line with glow/trail effect
- **Detections:** As the sweep passes, it "discovers" floating labels or nodes that appear and gently pulse
- **Labels:** Things like "Manual Data Entry," "Repetitive Emails," "Status Update Meetings," "Report Compilation" — representing inefficiencies being detected
- **Color scheme:** Dark base, cyan/blue sweep and glow, white/gray text labels
- **Particles:** Optional subtle particle field in background for depth

### Animation Behavior

1. **Idle state:** Continuous slow rotation of sweep (5-8 second full rotation)
1. **Detection events:** Every sweep reveals 1-2 "inefficiency" labels that fade in, pulse, then slowly fade out
1. **Mouse interaction:** Subtle tilt/parallax based on mouse position
1. **Mobile:** Reduce complexity, maybe static tilt with just sweep animation

### Technical Notes

- Use React Three Fiber with Drei helpers
- Keep polygon count low for performance
- Use shaders for glow effects if possible, otherwise post-processing
- Lazy load the 3D element, show simple gradient/placeholder during load
- Provide fallback for browsers without WebGL

### Reference Aesthetic

Think: Sci-fi movie interfaces, radar screens from flight simulators, cyberpunk UI — but clean and professional, not overdone.

-----

## Calendly Integration

- Embed Calendly inline in final CTA section
- Also have button CTAs throughout that open Calendly modal/popup
- Calendly URL: [TO BE PROVIDED]
- Style Calendly embed to match site (dark mode if possible)

-----

## SEO & Meta

```
Title: Austin Mander | AI Automation for Agencies & Consultancies

Description: Stop wasting hours on repetitive work. I help agencies and consultancies automate proposals, reports, client updates, and more. Book a free AI audit.

OG Image: Create a branded social share image with the 3D radar element
```

-----

## Performance Requirements

- Lighthouse score: 90+ on all metrics
- First contentful paint: < 1.5s
- 3D element must not block page load
- Lazy load below-fold sections
- Optimize all images (use Next.js Image component)

-----

## File Structure

```
/app
  /page.tsx (main page)
  /layout.tsx (metadata, fonts)
  /globals.css
/components
  /Hero.tsx
  /RadarElement.tsx (3D component)
  /ProblemSection.tsx
  /ServicesCards.tsx
  /ProofSection.tsx
  /HowItWorks.tsx
  /FAQ.tsx
  /FinalCTA.tsx
  /Footer.tsx
  /CalendlyButton.tsx
  /CalendlyEmbed.tsx
/lib
  /utils.ts
/public
  /images
  /fonts (if self-hosting)
```

-----

## Implementation Order

1. **Setup:** Next.js project, Tailwind config, fonts, color scheme
1. **Layout:** Basic page structure, responsive grid
1. **Hero section:** Text content, CTA button (without 3D first)
1. **3D Radar:** Build and integrate the radar element
1. **Remaining sections:** Problem, Services, Proof, How It Works, FAQ, CTA
1. **Calendly:** Integrate buttons and embed
1. **Animations:** Add Framer Motion scroll animations
1. **Polish:** Hover states, micro-interactions, mobile testing
1. **Performance:** Optimize, lazy load, test Lighthouse
1. **Deploy:** Vercel deployment, domain connection

-----

## Content Placeholders to Replace

- [ ] Calendly URL
- [ ] Real testimonials (use placeholder for now)
- [ ] Change Radar screenshot/demo (use mockup for now)
- [ ] Final tool logos
- [ ] Austin's professional photo (optional, for About or footer)

-----

## Success Criteria

The website is successful if:

1. A visitor understands what Austin does within 5 seconds
1. The 3D element makes them pause and think "this is different"
1. The value proposition is clear: save time on repetitive work
1. Booking a call feels low-risk (free, 15 minutes, no pitch)
1. The site loads fast and works perfectly on mobile
1. It looks premium and technical without being intimidating
1. A visitor who lands here from LinkedIn feels continuity with the brand

-----

## Additional Notes

- Austin is 21, but the site shouldn't emphasize or hide this — let the work speak
- The tone is confident and direct, not salesy or hype-y
- Technical credibility matters — the audience is smart, don't dumb it down
- This is v1 — design for easy iteration, we'll improve based on data

-----

## Questions for Austin Before Building

1. Calendly link?
1. Any existing brand assets (logo, specific colors)?
1. Do you have a Change Radar screenshot or should we create a mockup?
1. Email address for contact?
1. LinkedIn URL?
1. Any specific tools/logos you want to feature?
1. Preferred domain registrar/current setup?

-----

Build this website to convert. Every pixel should earn its place.
