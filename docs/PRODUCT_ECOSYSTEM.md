# Product Ecosystem

The vision for how Change Radar and supporting tools work together as an integrated platform.

---

## The Core Insight

Project intelligence isn't one tool. It's an ecosystem.

Information about projects lives everywhere:
- Meetings
- Documents
- Emails
- Chat messages
- Code commits
- Calendars

**Change Radar becomes the brain. The other tools become the senses.**

---

## Architecture

```
                         ┌─────────────────────────────────────┐
                         │                                     │
                         │           CHANGE RADAR              │
                         │        (Intelligence Hub)           │
                         │                                     │
                         │  ┌─────────────────────────────┐   │
                         │  │ Unified Project View        │   │
                         │  │                             │   │
                         │  │ • Health scores             │   │
                         │  │ • Risk register             │   │
                         │  │ • Decision log              │   │
                         │  │ • Action tracker            │   │
                         │  │ • Timeline                  │   │
                         │  │ • Resource view             │   │
                         │  └─────────────────────────────┘   │
                         │                                     │
                         └──────────────────┬──────────────────┘
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
                    ▼                       ▼                       ▼
          ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
          │                 │    │                 │    │                 │
          │    Meeting      │    │    Document     │    │     Future      │
          │  Intelligence   │    │  Intelligence   │    │   Connectors    │
          │                 │    │                 │    │                 │
          │  Transcripts →  │    │  PDFs/Docs →    │    │  • Email        │
          │  • Actions      │    │  • Key dates    │    │  • Slack        │
          │  • Decisions    │    │  • Risks        │    │  • Jira         │
          │  • Risks        │    │  • Obligations  │    │  • GitHub       │
          │  • Follow-ups   │    │  • Entities     │    │  • Calendar     │
          │                 │    │                 │    │                 │
          └─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## The Products

### Change Radar (The Hub)
**Status:** In development

The central intelligence platform for project leaders.

**Core capabilities:**
- Multi-project portfolio dashboard
- AI-powered risk detection
- Health scoring across projects
- Executive reporting (one-click)
- Natural language queries

**Value:** See what's actually happening, not what people say is happening.

---

### Meeting Intelligence (Connector 1)
**Status:** Planned — 4-day build

Turns meeting transcripts into structured project data.

**Standalone value:**
- Upload any transcript
- Get summary, actions, decisions, risks
- Copy/export results

**Connected value:**
- "Send to Change Radar" button
- Actions become tracked items
- Risks feed the risk register
- Decisions logged with context

**Dogfooding use:** Process your own standups, client calls, strategy sessions.

---

### Document Intelligence (Connector 2)
**Status:** In progress

Extracts structured data from messy documents.

**Standalone value:**
- Upload contracts, reports, briefs
- Get key dates, obligations, entities
- Query documents in natural language

**Connected value:**
- Contract deadlines → Project timeline
- Identified risks → Risk register
- Key stakeholders → Resource view

**Dogfooding use:** Process client contracts, SOWs, project briefs.

---

### Future Connectors

| Connector | Input | Extracts | Change Radar Feed |
|-----------|-------|----------|-------------------|
| Email Intel | Email threads | Decisions, commitments, blockers | Action items, risks |
| Slack Intel | Channel history | Key discussions, decisions | Decision log |
| Jira/Linear | Issue updates | Status changes, blockers | Timeline, risks |
| GitHub | PRs, commits | Progress, technical risks | Timeline |
| Calendar | Events | Milestones, deadlines | Timeline |

Each connector works standalone but multiplies value when connected.

---

## Data Flow

### Standalone Mode
```
User → Tool → Structured Output → User copies/exports
```

### Connected Mode
```
User → Tool → Structured Output → Change Radar API → Project enriched
```

### The Magic
```
Multiple sources → Change Radar → Correlated insights

"The standup mentioned 'API delay' (Meeting Intel)
 The contract has a March 15 deadline (Doc Intel)
 There's a dependency on that API (Jira)

 ALERT: High risk of missing contractual deadline"
```

---

## Shared Data Model

All connectors output to a common format:

```typescript
interface ChangeRadarImport {
  // Source identification
  source: 'meeting-intel' | 'doc-intel' | 'email-intel' | 'manual';
  source_id: string;           // Original file/meeting ID
  processed_at: string;        // ISO timestamp

  // Optional project linking
  project_id?: string;         // If known
  project_hint?: string;       // For AI matching

  // Extracted data (all optional)
  summary?: string;

  risks?: {
    description: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
    source_quote?: string;     // Original text that triggered
  }[];

  actions?: {
    task: string;
    owner?: string;
    due_date?: string;
    priority?: 'low' | 'medium' | 'high';
  }[];

  decisions?: {
    decision: string;
    made_by?: string;
    date?: string;
    context?: string;
  }[];

  timeline_events?: {
    event: string;
    date: string;
    type: 'milestone' | 'deadline' | 'meeting' | 'delivery';
  }[];

  entities?: {
    name: string;
    type: 'person' | 'company' | 'project' | 'product';
    role?: string;
  }[];
}
```

---

## Competitive Positioning

### vs. Point Solutions (Otter, Fireflies, etc.)
They do one thing. We connect everything.

"Otter gives you a transcript. We give you project intelligence."

### vs. Enterprise Platforms (Monday, Asana, etc.)
They require manual input. We extract automatically.

"Stop updating status. Let AI read what's already happening."

### vs. Generic AI (ChatGPT, Claude direct)
They're general purpose. We're purpose-built.

"You could paste a transcript into ChatGPT. Or you could have a system that does it automatically, tracks it, and connects it to your projects."

---

## Go-to-Market Sequence

### Phase 1: Individual Tools (Now)
- Build Meeting Intelligence
- Build Document Intelligence
- Each works standalone
- Free to use, builds audience
- Content: "I built X" posts

### Phase 2: Light Integration (Month 2-3)
- "Export to Change Radar" buttons
- Manual linking
- Change Radar in beta with early users
- Content: "Here's how they connect" posts

### Phase 3: Automatic Connection (Month 4+)
- Change Radar auto-ingests from connectors
- AI matches to projects
- Unified dashboard
- Content: "The ecosystem in action" posts

### Phase 4: Platform (Month 6+)
- API for third-party connectors
- Marketplace potential
- Enterprise features
- Content: Case studies, enterprise wins

---

## LinkedIn Narrative Arc

### Current
"I build AI systems that solve real problems."

### Phase 1
"I'm building a suite of AI tools for project intelligence."

### Phase 2
"Here's how Meeting Intelligence feeds into Change Radar..."

### Phase 3
"The ecosystem is working. Here's what it looks like when AI actually understands your projects."

### Long-term
"We're building the intelligence layer for how work gets done."

---

## Dogfooding Plan

Use your own tools daily:

| Activity | Tool | Feeds Into |
|----------|------|------------|
| Client calls | Meeting Intelligence | Change Radar projects |
| Contract review | Document Intelligence | Timeline, risks |
| Daily standups | Meeting Intelligence | Action tracking |
| Strategy sessions | Meeting Intelligence | Decision log |
| SOW creation | Document Intelligence | Deliverable tracking |

**The story:** "I use these tools to run my own business. They work."

---

## Success Metrics

### Tool-Level
- Meeting Intelligence: Transcripts processed/week
- Document Intelligence: Documents processed/week
- Each tool: Users, return rate, shares

### Ecosystem-Level
- % of users connecting to Change Radar
- Cross-tool usage (uses 2+ tools)
- Change Radar enrichment rate (% auto vs manual)

### Business-Level
- Consulting leads from tool users
- Change Radar pilot signups
- Revenue (eventually)

---

## The Vision

**Short-term:** Useful standalone tools that showcase AI capabilities.

**Medium-term:** Connected ecosystem that's greater than the sum of parts.

**Long-term:** The default way project leaders understand what's happening.

```
"Change Radar isn't a tool. It's where project intelligence lives."
```

---

*Created: December 2024*
*Status: Ecosystem taking shape*
