# Meeting Intelligence — Product Plan

Speed-focused build plan for an AI meeting processor that turns transcripts into actionable outputs.

---

## Product Overview

**Name:** Meeting Intelligence (working title)

**One-liner:** Upload a transcript, get structured actions in seconds.

**Input:** Meeting transcript (TXT, VTT, SRT, or paste)

**Outputs:**
- Executive summary
- Action items with owners
- Key decisions made
- Follow-up email drafts
- Calendar event suggestions
- Risk/blocker flags

---

## MVP Scope (Week 1)

### What We Build

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   [ Upload Transcript ]  or  [ Paste Text ]             │
│                                                         │
│   ─────────────────────────────────────────────────     │
│                                                         │
│   Processing...                                         │
│                                                         │
│   ─────────────────────────────────────────────────     │
│                                                         │
│   📋 Summary                                            │
│   30-min product sync. Discussed Q1 roadmap,            │
│   agreed on launch date, identified resource gap.       │
│                                                         │
│   ✅ Action Items                                        │
│   • @Sarah: Draft launch announcement (Due: Friday)     │
│   • @Mike: Confirm dev resources (Due: Tomorrow)        │
│   • @Austin: Set up tracking dashboard (Due: Next week) │
│                                                         │
│   📌 Decisions Made                                      │
│   • Launch date: March 15th                             │
│   • Budget approved for contractor                      │
│                                                         │
│   ⚠️ Risks Identified                                   │
│   • Dev team capacity unclear                           │
│   • Dependency on external API not confirmed            │
│                                                         │
│   📧 Follow-up Email  [Copy]                            │
│   📅 Calendar Events  [Add to Calendar]                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Tech Stack

| Component | Choice | Why |
|-----------|--------|-----|
| Frontend | Next.js | Already using, fast to build |
| AI | Claude API | Best at structured extraction |
| Storage | Supabase | Already set up |
| Auth | Optional for MVP | Can add later |

### Core Flow

```
1. User uploads/pastes transcript
2. Frontend sends to API route
3. API calls Claude with structured prompt
4. Claude returns JSON with all outputs
5. Frontend displays formatted results
6. User can copy/export each section
```

---

## MVP Features (Prioritized)

### P0 — Must Have
- [ ] Transcript upload (TXT, VTT, SRT)
- [ ] Paste transcript option
- [ ] Summary generation
- [ ] Action items extraction (with owners if mentioned)
- [ ] Copy to clipboard for each section
- [ ] Clean, minimal UI

### P1 — Should Have
- [ ] Decisions extraction
- [ ] Follow-up email draft
- [ ] Risk/blocker identification
- [ ] Download as markdown

### P2 — Nice to Have (Post-MVP)
- [ ] Calendar event generation (.ics download)
- [ ] Integration with Notion
- [ ] Integration with Linear/Jira
- [ ] Saved history
- [ ] Team workspace

---

## Prompt Engineering

### Main Prompt Structure

```
You are a meeting analyst. Given a transcript, extract:

1. SUMMARY (2-3 sentences, executive level)
2. ACTION_ITEMS (array of {task, owner, due_date, priority})
3. DECISIONS (array of decisions made)
4. RISKS (array of risks or blockers mentioned)
5. FOLLOW_UP_EMAIL (draft email summarizing meeting)

Rules:
- If owner not clear, mark as "Unassigned"
- If due date not mentioned, mark as "TBD"
- Be concise, use bullet points
- Flag anything that sounds like a risk or blocker

Transcript:
{transcript}

Respond in JSON format.
```

### Expected Output

```json
{
  "summary": "30-minute product sync discussing Q1 launch...",
  "action_items": [
    {
      "task": "Draft launch announcement",
      "owner": "Sarah",
      "due_date": "Friday",
      "priority": "high"
    }
  ],
  "decisions": [
    "Launch date confirmed: March 15th",
    "Budget approved for contractor"
  ],
  "risks": [
    "Dev team capacity not confirmed",
    "External API dependency unresolved"
  ],
  "follow_up_email": "Hi team,\n\nThanks for joining today's sync..."
}
```

---

## File Structure

```
src/
├── app/
│   ├── meeting-intel/
│   │   └── page.tsx          # Main UI
│   └── api/
│       └── process-meeting/
│           └── route.ts       # API endpoint
├── components/
│   └── meeting-intel/
│       ├── TranscriptUpload.tsx
│       ├── ResultsDisplay.tsx
│       ├── ActionItems.tsx
│       ├── Summary.tsx
│       └── FollowUpEmail.tsx
└── lib/
    └── meeting-processor.ts   # Claude prompt + parsing
```

---

## Build Schedule

### Day 1: Core Processing
- [ ] Create API route
- [ ] Write Claude prompt
- [ ] Test with sample transcripts
- [ ] Parse and validate JSON response

### Day 2: Frontend
- [ ] Upload component (drag & drop)
- [ ] Paste text area option
- [ ] Loading state
- [ ] Results display layout

### Day 3: Polish
- [ ] Copy to clipboard buttons
- [ ] Download as markdown
- [ ] Error handling
- [ ] Mobile responsive
- [ ] Deploy to /meeting-intel route

### Day 4: Content & Launch
- [ ] Write LinkedIn post about it
- [ ] Create demo video/GIF
- [ ] Add to "What I Build" examples
- [ ] Ship it

---

## Transcript Sources (Tell Users)

Recommend these free tools for getting transcripts:

1. **Meetily** — Local, private, outputs transcript files
2. **tl;dv** — Free, works with Teams/Zoom/Meet
3. **Tactiq** — Chrome extension, no bot
4. **Built-in options:**
   - Teams: Download transcript from meeting
   - Zoom: Enable transcription in settings
   - Meet: Turn on captions, download after

We process any transcript. We don't record.

---

## Positioning

### What This Is
"I built a tool that turns meeting transcripts into action items in 30 seconds."

### What This Isn't
- Not a recording tool
- Not a transcription tool
- Not a note-taking app

### The Value
"Your meeting happened. Now what? This tells you."

---

## LinkedIn Content Plan

### Post 1: Build Announcement
```
Building something this week:

A tool that takes meeting transcripts and extracts:
→ Summary (2 sentences)
→ Action items with owners
→ Decisions made
→ Risks identified
→ Follow-up email draft

Because the meeting is never the hard part.
It's remembering what was decided.

Will share when it's live.
```

### Post 2: Launch
```
Just shipped: Meeting Intelligence

Upload a transcript. Get structured actions in seconds.

What it extracts:
✓ Executive summary
✓ Action items with owners
✓ Decisions made
✓ Risks/blockers
✓ Follow-up email draft

Built in 3 days. No recording. No bot.
Just paste your transcript and go.

Try it: [link]
```

### Post 3: Technical Breakdown
```
How I built a meeting processor in 3 days:

The hard part isn't AI.
It's structured extraction.

Here's the prompt engineering that actually works...
[Thread with technical details]
```

---

## Future Iterations

### V2 (If Traction)
- User accounts + history
- Team workspaces
- Notion integration
- Slack integration

### V3 (If Paying Customers)
- Real-time processing (during meeting)
- Direct integration with Meetily
- Custom extraction templates
- API for developers

### Change Radar Tie-In
- Meeting risks feed into project risk register
- Action items sync to project tracker
- Decisions logged to decision register

---

## Success Metrics

### Week 1
- [ ] Tool is live and working
- [ ] 1 LinkedIn post published
- [ ] 10+ people try it

### Month 1
- [ ] 100+ transcripts processed
- [ ] 3+ people ask about custom/enterprise version
- [ ] Clear signal on whether to build further

---

## Resources Needed

- Claude API key (existing)
- ~$5-10 in API costs for MVP testing
- 4 days of focused build time
- Sample transcripts for testing

---

## Decision Log

| Decision | Rationale |
|----------|-----------|
| No recording/transcription | Focus on value-add, not plumbing |
| Claude over GPT | Better at structured extraction |
| No auth for MVP | Reduce friction, add later |
| Accept paste + upload | Maximum flexibility |
| Free to use | Build audience first |

---

*Created: December 2024*
*Target: Ship within 1 week*
*Status: Planning*
