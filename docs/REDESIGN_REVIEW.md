# Redesign Review & Recommendations

## What Was Built

Complete redesign of /v2 with:
- Clean, minimal Hero with single CTA
- "What I Build" section (no prices)
- "Currently Building" section featuring Change Radar
- Simplified "How It Works" process
- Conversational FAQ
- Clear final CTA with email fallback
- Minimal footer

**Removed:**
- Cursor glow effect
- Scroll progress indicator
- Fake social proof notifications
- Multiple competing CTAs
- Service prices
- "Agency" specific language
- Zapier comparisons

---

## Strengths of New Design

1. **Clearer positioning** — "I build AI systems that solve real problems" is direct and memorable

2. **Conversation-first** — No prices means visitors must book a call, enabling proper scoping

3. **Credibility through building** — Change Radar shows you ship, not just talk

4. **Honest tone** — "If I can't help, I'll say so" builds trust

5. **Reduced friction** — Single CTA type throughout (Book a Call)

6. **Mobile-friendly** — Clean stacking, no complex animations

---

## Weaknesses & Things to Address

### 1. No Photo/Face
**Issue:** Personal brand sites convert better with a photo. People want to see who they're booking with.

**Recommendation:** Add a professional headshot to the Hero section. Left side of text, or above on mobile.

**Copy change needed:** None, just add image component.

---

### 2. No Social Proof Yet
**Issue:** No testimonials, no client logos. This is fine for now, but becomes a weakness as you grow.

**Recommendation:**
- For now: Use LinkedIn testimonials if any exist
- Later: Add a simple "People I've helped" section with real quotes
- Even later: Add client logos if permitted

**Priority:** Low for launch, high for iteration

---

### 3. Change Radar Could Be Stronger
**Issue:** "In development" may reduce credibility. No visual/screenshot.

**Recommendations:**
- Add a screenshot or mockup when available
- Change to "In beta" or "Taking early access signups" when ready
- Consider a waitlist CTA for Change Radar specifically

---

### 4. FAQ Could Handle Pricing Objection Better
**Current copy:**
> "It depends on what you need. Simple automations start lower, complex products cost more."

**Potential issue:** Some visitors want a ballpark before booking.

**Alternative copy:**
> "Projects typically range from £2,000 for a focused automation to £15,000+ for complex products. But I'd rather understand your problem first than quote blind. That's what the call is for."

**Tradeoff:** More specific = some may self-filter out. But also reduces tire-kickers.

**Recommendation:** Test current version first. If you get too many "what's the price" questions on calls, update.

---

### 5. No LinkedIn Tie-In
**Issue:** Your LinkedIn strategy drives traffic here, but the site doesn't reinforce the connection.

**Recommendations:**
- Consider adding "Follow my AI builds on LinkedIn" somewhere
- Or a subtle "As seen on LinkedIn" if your posts get traction
- Link to LinkedIn prominently in footer (already done)

---

### 6. "What I Build" Cards Could Be More Specific
**Current:** Generic descriptions (AI-Powered Products, Internal Tools, Automations)

**Alternative approach:** Show examples

```
AI-Powered Products
Like Change Radar — full applications with AI at the core.

Internal Tools
Document processors. Reporting dashboards.
Custom tools your team actually uses.

Automations & Systems
Commit tracking → Notion → LinkedIn drafts.
The boring stuff, handled automatically.
```

**Tradeoff:** More specific = more memorable, but also more limiting.

**Recommendation:** Keep generic for now, but add "Example:" lines as you complete projects.

---

### 7. Missing Meta/OG Tags
**Issue:** The layout.tsx may need updating for proper social sharing previews.

**Recommendation:** Ensure the v2/layout.tsx has:
- Proper title: "Austin Mander — AI Engineer"
- Description: "I build AI systems that solve real problems."
- OG image for social sharing

---

### 8. Mobile Experience Not Tested
**Issue:** Built for desktop-first, mobile layout untested.

**Recommendation:** Before launch:
- Test on real iPhone/Android
- Check CTA button tap targets (should be 48px+)
- Verify text is readable without zooming
- Check Calendly modal works on mobile

---

## Copy Refinements to Consider

### Hero — Alternative Opening
Current:
> I build AI systems that solve real problems.

Alternatives to test:
> I build the AI systems that make your business smarter.
> I build AI that actually works in production.
> I turn "this should be automated" into "this just works."

### "Currently building" Line
Current:
> Currently building Change Radar — AI-powered project intelligence

If you want more intrigue:
> Currently building Change Radar — shipping soon

If you want more clarity:
> Currently building Change Radar — AI that tells leaders what's actually happening in their projects

---

## Priority Order for Fixes

### Before Launch (High Priority)
1. Add your photo to Hero
2. Test mobile experience
3. Verify Calendly integration works
4. Check meta tags

### After Launch (Iterate Based on Data)
1. Add testimonials as you get them
2. Update Change Radar section when more is built
3. Refine copy based on call conversations
4. A/B test different headlines if traffic allows

### Future (When You Have More Proof)
1. Client logos section
2. Case studies
3. Results/metrics section

---

## Final Verdict

**The redesign is solid and ready to ship** with the following conditions:

1. Add your photo (critical for personal brand)
2. Quick mobile test
3. Verify meta tags

The copy is honest, the structure is clean, and the flow leads naturally to booking a call. The weaknesses are mostly "things to add later" rather than "things that are broken."

Ship it. Iterate based on real feedback.

---

*Review completed: December 2024*
