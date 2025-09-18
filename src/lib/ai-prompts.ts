export interface AIPrompt {
  id: string;
  category: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeToValue: string;
  problem: string;
  systemPrompt: string;
  userPromptTemplate: string;
  exampleInput?: string;
  expectedOutput: string;
  businessValue: string[];
  implementationTips: string[];
  commonMistakes: string[];
  tools: string[];
  tags: string[];
  isFree: boolean;
}

export const promptCategories = [
  "Executive & Strategy",
  "Project Management",
  "Risk & Compliance", 
  "Meetings & Communication",
  "Data & Analytics",
  "Customer & Sales",
  "Operations & Process",
  "Innovation & R&D",
  "Finance & Budgeting",
  "HR & Team Management"
];

export const aiPrompts: AIPrompt[] = [
  {
    id: "exec-board-brief",
    category: "Executive & Strategy",
    title: "5-Minute Board Report Generator",
    description: "Transform messy project updates into crisp 3-slide executive summaries that board members actually read",
    difficulty: "intermediate",
    timeToValue: "5 minutes",
    problem: "Board members receive 50+ page reports but need 3-slide summaries. Creating these manually takes 2-3 hours and often misses critical insights.",
    systemPrompt: `You are an expert executive communication specialist who has prepared board presentations for FTSE 100 companies. You excel at:
- Extracting signal from noise
- Identifying hidden risks before they become visible
- Presenting complex information in simple terms
- Focusing on decisions, not just updates
- Using precise business language

Your output must be immediately usable in board presentations without editing.`,
    userPromptTemplate: `Analyse this project update and create a 3-slide executive summary.

PROJECT UPDATE:
[paste your raw project status, emails, team updates, or any combination of inputs here]

CONTEXT (optional):
- Board's main concerns: [e.g., timeline, budget, compliance]
- Previous commitments made: [what you promised last time]
- Strategic importance: [why this matters]

Create exactly 3 slides following this structure:

SLIDE 1 - STATUS AT A GLANCE
- One-line status (use RAG rating: Green/Amber/Red)
- Top 3 risks with:
  * Risk description (15 words max)
  * Impact if realised (financial/timeline/strategic)
  * Owner name and mitigation status
  * Likelihood (L/M/H) and Impact (L/M/H)

SLIDE 2 - DECISIONS REQUIRED
List 3-5 specific decisions needed from the board:
- Decision required (one sentence)
- Context (why now?)
- Recommendation
- Deadline for decision
- Impact of delay

SLIDE 3 - ASK & NEXT STEPS  
- One clear ask from the board (15 words max)
- 2-3 concrete next steps with dates
- Success metrics for next review

Output in this JSON format for easy copying:
{
  "slide1": {
    "status_line": "",
    "rag_rating": "",
    "risks": [
      {
        "description": "",
        "impact": "",
        "owner": "",
        "mitigation_status": "",
        "likelihood": "",
        "severity": ""
      }
    ]
  },
  "slide2": {
    "decisions": [
      {
        "decision_required": "",
        "context": "",
        "recommendation": "",
        "deadline": "",
        "delay_impact": ""
      }
    ]
  },
  "slide3": {
    "board_ask": "",
    "next_steps": [
      {
        "action": "",
        "date": "",
        "owner": ""
      }
    ],
    "success_metrics": []
  },
  "appendix_flags": [] // Any items requiring detailed discussion
}`,
    exampleInput: "Project Alpha Status: Development 70% complete, 2 weeks behind schedule due to API integration issues. Budget spent £1.2M of £1.5M. Team morale low after key developer resigned. Customer getting nervous about delivery date. Compliance review pending. New requirement from legal about data residency.",
    expectedOutput: "3 slides with: Amber status + top risks owned, 2 decisions on budget/timeline, clear ask for 2-week extension approval",
    businessValue: [
      "Save 2-3 hours per board report",
      "Never miss critical risks in updates",
      "Consistent reporting format across portfolio",
      "Board members get exactly what they need",
      "Reduce follow-up questions by 80%"
    ],
    implementationTips: [
      "Run this on Monday morning with all weekend updates",
      "Keep a 'context file' with board's ongoing concerns",
      "Use output as starting point, then add specific numbers",
      "Share with team before board meeting for validation",
      "Archive outputs to show progress over time"
    ],
    commonMistakes: [
      "Including too much technical detail",
      "Forgetting to specify RAG status criteria",
      "Missing the 'so what' for each risk",
      "Not being specific about decision deadlines"
    ],
    tools: ["Claude 3.5", "GPT-4", "Gemini Pro"],
    tags: ["executive", "board", "reporting", "summary"],
    isFree: true
  },
  
  {
    id: "hidden-risk-detector",
    category: "Risk & Compliance",
    title: "Hidden Risk Pattern Detector",
    description: "Uncover risks that aren't explicitly stated but are hiding in communication patterns, timeline shifts, and resource changes",
    difficulty: "advanced",
    timeToValue: "10 minutes",
    problem: "70% of project failures come from risks that were visible in retrospect but never explicitly flagged. Traditional risk registers miss subtle patterns.",
    systemPrompt: `You are a forensic risk analyst who specialises in detecting early warning signals that humans miss. You've analysed 1000+ failed projects and identified patterns that predict failure 6-8 weeks before they materialise.

You look for:
- Linguistic patterns (hedging, uncertainty, blame-shifting)
- Timeline patterns (small slips that compound)
- Resource patterns (key people becoming "busy")
- Communication patterns (frequency changes, cc lists growing)
- Dependency patterns (hidden connections between workstreams)
- Stakeholder patterns (sentiment shifts, meeting avoidance)

Be specific, evidence-based, and actionable. No generic risks.`,
    userPromptTemplate: `Analyse these inputs for hidden risks not explicitly mentioned.

INPUTS:
[Paste any combination of: project updates, emails, meeting notes, Slack messages, JIRA tickets, timesheets]

TIME CONTEXT:
Current date: [date]
Project start: [date]
Planned end: [date]
Last milestone: [what and when]

TEAM CONTEXT:
Team size: [number]
Key dependencies: [list external teams/systems]
Recent changes: [any personnel or scope changes]

Identify 5-7 hidden risks using this framework:

For each risk:
1. RISK PATTERN DETECTED
   - Specific pattern observed (with evidence quotes)
   - Pattern type (timeline/resource/communication/technical/stakeholder)
   - Confidence level (Low/Medium/High)

2. RISK PROJECTION
   - What will happen if unaddressed
   - Estimated time until impact (weeks)
   - Cascade effects on other workstreams

3. EARLY WARNING INDICATORS
   - 3 signals to monitor weekly
   - Threshold for escalation
   - Data sources to check

4. IMMEDIATE MITIGATION
   - One action to take this week
   - Owner recommendation
   - Success criteria

5. EVIDENCE TRAIL
   - Direct quotes showing the pattern
   - Frequency of pattern (how often observed)
   - Comparison to baseline (what's changed)

Output format:
{
  "risk_analysis": {
    "scan_date": "",
    "confidence_score": "", // overall confidence in analysis
    "hidden_risks": [
      {
        "risk_id": "",
        "pattern_type": "",
        "risk_statement": "", // one sentence
        "confidence": "",
        "weeks_to_impact": "",
        "severity_if_realised": "", // 1-5 scale
        "evidence": {
          "quotes": [],
          "frequency": "",
          "baseline_deviation": ""
        },
        "early_warnings": [
          {
            "indicator": "",
            "threshold": "",
            "check_method": ""
          }
        ],
        "mitigation": {
          "immediate_action": "",
          "owner": "",
          "success_criteria": ""
        },
        "cascade_risks": [] // other risks this could trigger
      }
    ],
    "pattern_summary": {
      "communication_health": "", // declining/stable/improving
      "timeline_confidence": "", // percentage
      "resource_stability": "", // high/medium/low
      "stakeholder_alignment": "" // aligned/diverging/conflicted
    }
  }
}`,
    expectedOutput: "5-7 specific hidden risks with evidence quotes, early warning indicators, and actionable mitigations",
    businessValue: [
      "Catch risks 6-8 weeks before they materialise",
      "Reduce project failure rate by 40%",
      "Save £100K+ per prevented failure",
      "Build reputation for 'seeing around corners'",
      "Data-driven risk discussions vs gut feel"
    ],
    implementationTips: [
      "Run weekly on all project communications",
      "Compare outputs week-over-week to spot trends",
      "Share patterns (not names) across portfolio",
      "Create risk pattern library for your organisation",
      "Validate detected risks in 1-on-1s before escalating"
    ],
    commonMistakes: [
      "Only analysing formal status reports",
      "Ignoring Slack/email for 'informal' signals",
      "Not tracking if predicted risks materialise",
      "Being too generic in risk descriptions"
    ],
    tools: ["Claude 3.5 Sonnet", "GPT-4o", "Gemini 1.5 Pro"],
    tags: ["risk", "prediction", "analysis", "early-warning"],
    isFree: true
  },

  {
    id: "meeting-intelligence",
    category: "Meetings & Communication",
    title: "Meeting Intelligence Extractor",
    description: "Transform chaotic meeting transcripts into structured intelligence: decisions, conflicts, commitments, and hidden concerns",
    difficulty: "beginner",
    timeToValue: "3 minutes",
    problem: "Average executive spends 23 hours/week in meetings but only 20% of decisions and actions are properly captured. Critical context is lost.",
    systemPrompt: `You are a meeting intelligence analyst who can extract signal from noise in any meeting transcript. You understand corporate dynamics, can read between the lines, and never miss commitments that people make in passing.

You track:
- Explicit decisions and implicit agreements
- Conflicts and tensions (even when polite)
- Commitments and their conditions
- Concerns that aren't fully voiced
- Power dynamics and influence patterns
- Information gaps and assumptions

Be specific about WHO said WHAT and WHEN.`,
    userPromptTemplate: `Extract comprehensive intelligence from this meeting.

MEETING TRANSCRIPT/NOTES:
[Paste transcript from Teams/Zoom/Otter.ai or rough notes]

MEETING CONTEXT:
Date: [date]
Purpose: [why was this meeting called]
Attendees: [names and roles]
Pre-read: [any context shared before]

Extract the following intelligence:

1. DECISIONS MADE
   - Decision statement (precise wording)
   - Decision maker (who had final say)
   - Dissenting views (if any)
   - Conditions/dependencies
   - Review date

2. ACTION ITEMS
   - Action (specific and measurable)
   - Owner (single person)
   - Due date (explicit or inferred)
   - Dependencies
   - Success criteria
   - Priority (P0/P1/P2)

3. COMMITMENTS & PROMISES
   - What was promised (exact words)
   - Who promised to whom
   - Conditions attached
   - Confidence level (firm/tentative/exploratory)

4. CONFLICTS & TENSIONS
   - Issue (what's the real disagreement)
   - Parties involved
   - Underlying cause
   - Resolution status
   - Risk if unresolved

5. UNSPOKEN CONCERNS
   - Concern detected (reading between lines)
   - Evidence (what suggests this)
   - Person likely holding concern
   - Impact if not addressed

6. INFORMATION GAPS
   - Questions raised but not answered
   - Assumptions made without validation
   - Data requested
   - WHO will provide by WHEN

7. FOLLOW-UP REQUIRED
   - Topic needing separate discussion
   - Participants needed
   - Urgency
   - Prep required

8. POWER DYNAMICS OBSERVED
   - Who drove agenda
   - Whose opinions carried weight
   - Who was interrupted/ignored
   - Alliance patterns

Output format:
{
  "meeting_intelligence": {
    "meeting_id": "",
    "duration_minutes": "",
    "productivity_score": "", // 1-10 based on decisions/actions vs time
    "decisions": [...],
    "actions": [...],
    "commitments": [...],
    "conflicts": [...],
    "unspoken_concerns": [...],
    "info_gaps": [...],
    "follow_ups": [...],
    "dynamics": {...},
    "key_quotes": [...], // important verbatim statements
    "next_meeting_needed": true/false,
    "suggested_attendees_for_next": []
  }
}`,
    expectedOutput: "Structured JSON with all decisions, actions, conflicts, and hidden dynamics extracted and assigned",
    businessValue: [
      "Never lose track of commitments made",
      "Surface conflicts before they explode",
      "Reduce meeting follow-ups by 60%",
      "Create audit trail of decisions",
      "Identify meeting productivity issues"
    ],
    implementationTips: [
      "Use Otter.ai or Teams transcription for input",
      "Run immediately after meeting while context fresh",
      "Share output with attendees for validation",
      "Track completion rate of extracted actions",
      "Build meeting quality metrics over time"
    ],
    commonMistakes: [
      "Not capturing who exactly said what",
      "Missing tentative commitments",
      "Ignoring non-verbal cues in notes",
      "Being too diplomatic about conflicts"
    ],
    tools: ["Claude 3.5", "GPT-4", "Gemini Pro"],
    tags: ["meetings", "productivity", "decisions", "actions"],
    isFree: true
  },

  {
    id: "resource-optimizer",
    category: "Operations & Process",
    title: "Resource Allocation Optimizer",
    description: "Identify resource conflicts, underutilisation, and optimal reallocation across your portfolio",
    difficulty: "intermediate",
    timeToValue: "15 minutes",
    problem: "Resource conflicts cause 35% of project delays but aren't visible until too late. Teams are either burned out or underutilised with no middle ground.",
    systemPrompt: `You are a resource optimisation specialist who can see patterns in allocation that others miss. You understand that official allocation rarely matches reality and can infer actual utilisation from various signals.

You consider:
- Official allocation vs actual work patterns
- Hidden work (meetings, context switching, admin)
- Skill match vs task requirements
- Team dynamics and productivity multipliers
- Burnout indicators
- Learning curve effects
- Geographic and timezone implications

Provide specific, actionable recommendations.`,
    userPromptTemplate: `Analyse resource allocation and identify optimisations.

CURRENT ALLOCATION DATA:
[Paste data in any format: spreadsheet, project plans, team lists, JIRA assignments]

Format example:
- Person: Role | Projects (% allocation) | Skills | Location
- Project: Timeline | Required skills | Priority

CONSTRAINTS:
- Immovable deadlines: [list any fixed dates]
- Protected resources: [people who can't be moved]
- Budget limits: [if any]
- Skill requirements: [specialised needs]

Analyse and provide:

1. CONFLICT DETECTION
   - Person/team overallocated (>85% when including overhead)
   - Specific conflict dates
   - Impact if unresolved
   - Recommended resolution

2. UNDERUTILISATION OPPORTUNITIES
   - People/teams under 60% allocated
   - Skills being wasted
   - Potential reassignments
   - Value unlock potential

3. OPTIMISATION RECOMMENDATIONS
   For each recommendation:
   - Current state problem
   - Proposed change (specific)
   - Benefits (time/cost/quality)
   - Risks and mitigations
   - Implementation steps

4. BURNOUT RISK ASSESSMENT
   - High-risk individuals/teams
   - Warning indicators observed
   - Preventive actions
   - Sustainable allocation model

5. SKILL GAP ANALYSIS
   - Missing skills for planned work
   - Training opportunities
   - Hiring needs
   - External resource requirements

6. ALLOCATION SCENARIOS
   Provide 3 scenarios:
   - Aggressive (fastest delivery)
   - Balanced (sustainable pace)
   - Conservative (highest quality)

Output format:
{
  "analysis_date": "",
  "portfolio_health": "", // red/amber/green
  "conflicts": [
    {
      "resource": "",
      "conflict_period": "",
      "projects_affected": [],
      "overallocation_percentage": "",
      "resolution_options": [],
      "recommended_action": ""
    }
  ],
  "underutilised": [...],
  "optimisations": [
    {
      "change_description": "",
      "resources_affected": [],
      "projects_impacted": [],
      "benefit_hours_week": "",
      "benefit_cost": "",
      "implementation_complexity": "", // low/medium/high
      "recommended_timing": ""
    }
  ],
  "burnout_risks": [...],
  "skill_gaps": [...],
  "scenarios": {...},
  "executive_summary": "", // 3-sentence summary
  "immediate_actions": [] // top 3 things to do this week
}`,
    expectedOutput: "Specific resource conflicts, underutilisation opportunities, and 3-5 concrete optimisation moves with quantified benefits",
    businessValue: [
      "Prevent 30% of project delays",
      "Improve utilisation by 20%",
      "Reduce burnout-related turnover",
      "Save 15% on external resources",
      "Increase project throughput by 25%"
    ],
    implementationTips: [
      "Run monthly for portfolio review",
      "Include 20% buffer for hidden work",
      "Validate with team leads before implementing",
      "Track predicted vs actual conflicts",
      "Build historical utilisation patterns"
    ],
    commonMistakes: [
      "Ignoring meeting and admin overhead",
      "Not considering skill learning curves",
      "Over-optimising without flexibility buffer",
      "Missing team dynamics impacts"
    ],
    tools: ["Claude 3.5", "GPT-4", "Gemini Pro"],
    tags: ["resources", "allocation", "optimization", "capacity"],
    isFree: true
  },

  {
    id: "competitor-intelligence",
    category: "Executive & Strategy",
    title: "Competitor Intelligence Brief",
    description: "Generate actionable competitive intelligence from scattered inputs: news, earnings, social, job posts, patents",
    difficulty: "intermediate",
    timeToValue: "10 minutes",
    problem: "Competitive intelligence takes days to compile and often misses weak signals. By the time you react, competitors have 3-month head start.",
    systemPrompt: `You are a competitive intelligence analyst for Fortune 500 companies. You can extract strategic signals from any source and predict competitor moves 3-6 months out.

You analyse:
- Strategic intent from small moves
- Resource allocation from hiring patterns
- Technology direction from patents/papers
- Market focus from marketing spend
- Weakness indicators from employee sentiment
- Partnership strategies from announcements
- Financial health from subtle indicators

Provide actionable intelligence, not just information.`,
    userPromptTemplate: `Generate strategic competitive intelligence brief.

COMPETITOR: [Company name]
YOUR COMPANY: [Your company name]
SECTOR: [Industry/market]

INPUTS AVAILABLE:
[Paste any/all of the following:]
- Recent news articles
- Earnings transcripts
- Job postings
- LinkedIn activity
- Patent filings
- Product updates
- Customer reviews
- Employee Glassdoor reviews
- Conference presentations
- Social media posts
- Press releases
- Partner announcements

STRATEGIC CONTEXT:
- Your current strategy: [brief description]
- Key battlegrounds: [where you compete]
- Your advantages: [what you do better]
- Your vulnerabilities: [where they could hurt you]

Generate intelligence report:

1. STRATEGIC MOVES DETECTED
   - Move identified (specific)
   - Evidence supporting
   - Likely timeline
   - Threat level (1-5)
   - Recommended response

2. CAPABILITY DEVELOPMENTS
   - New capabilities building
   - Hiring patterns suggesting direction
   - Technology investments
   - Timeline to deployment
   - Counter-strategy options

3. WEAKNESS INDICATORS
   - Vulnerabilities detected
   - Evidence
   - Window of opportunity
   - Exploitation strategy
   - Risks of action

4. CUSTOMER/MARKET SIGNALS
   - Customer sentiment shifts
   - Market segment focus changes
   - Pricing strategy indicators
   - Channel strategy evolution

5. PREDICTED NEXT MOVES
   - Next 3 months (high confidence)
   - Next 6 months (medium confidence)
   - Next 12 months (directional)
   - Wild cards to monitor

6. RECOMMENDED ACTIONS
   - Immediate defensive moves
   - Offensive opportunities
   - Intelligence gaps to fill
   - Monitoring triggers to set

Output format:
{
  "intelligence_brief": {
    "competitor": "",
    "assessment_date": "",
    "threat_level": "", // 1-5
    "opportunity_level": "", // 1-5
    "strategic_moves": [...],
    "capabilities": [...],
    "weaknesses": [...],
    "market_signals": [...],
    "predictions": {
      "3_month": [...],
      "6_month": [...],
      "12_month": [...],
      "wild_cards": [...]
    },
    "recommendations": {
      "defensive": [...],
      "offensive": [...],
      "intelligence_gaps": [...],
      "monitoring_plan": [...]
    },
    "executive_summary": "", // 3 bullet points
    "confidence_score": "", // overall confidence in assessment
  }
}`,
    expectedOutput: "Specific competitive moves detected, weakness identified, and 3-5 concrete response recommendations",
    businessValue: [
      "3-6 month competitive early warning",
      "Identify competitor weaknesses to exploit",
      "Prevent competitive surprises",
      "Focus resources on real threats",
      "Turn reactive to proactive strategy"
    ],
    implementationTips: [
      "Set up Google Alerts for competitor news",
      "Check LinkedIn weekly for hiring patterns",
      "Monitor patent filings monthly",
      "Track their job postings for strategy hints",
      "Combine with customer win/loss analysis"
    ],
    commonMistakes: [
      "Focusing only on public announcements",
      "Missing signals in hiring patterns",
      "Not connecting dots across sources",
      "Being too conservative in predictions"
    ],
    tools: ["Claude 3.5", "GPT-4o", "Perplexity"],
    tags: ["competitive", "intelligence", "strategy", "analysis"],
    isFree: false
  },

  {
    id: "stakeholder-mapper",
    category: "Executive & Strategy",
    title: "Stakeholder Dynamics Mapper",
    description: "Map influence networks, hidden agendas, and coalition opportunities from communication patterns",
    difficulty: "advanced",
    timeToValue: "20 minutes",
    problem: "Project success depends on stakeholder alignment but true influence networks and agendas are invisible until too late.",
    systemPrompt: `You are an organisational dynamics expert who can map power structures and predict stakeholder behaviour. You understand that official org charts rarely reflect real influence.

You identify:
- True influence networks vs formal hierarchy
- Hidden agendas and personal motivations
- Coalition opportunities and blockers
- Communication patterns revealing alliances
- Sentiment trajectories over time
- Intervention points for maximum impact

Be tactful but truthful about politics.`,
    userPromptTemplate: `Map stakeholder dynamics and recommend engagement strategy.

STAKEHOLDER DATA:
[Provide any combination of:]
- Email threads showing interactions
- Meeting attendance patterns
- Decision histories
- Org chart with roles
- Project RACI matrices
- Feedback/review comments
- Slack/Teams interactions
- CC patterns on emails

PROJECT CONTEXT:
- Initiative: [what you're trying to achieve]
- Current phase: [where you are]
- Key decisions ahead: [what needs approval]
- Past blockers: [what's been difficult]

POLITICAL CONTEXT:
- Recent org changes: [restructures, new hires]
- Budget climate: [expanding/cutting]
- Strategic priorities: [what company cares about]
- Recent wins/failures: [context affecting mood]

Provide analysis:

1. INFLUENCE MAP
   - Power holders (formal and informal)
   - Influence score (1-10)
   - Source of influence
   - Agenda/motivation
   - Relationship network

2. STAKEHOLDER SEGMENTS
   Champions:
   - Who and why
   - How to maintain support
   
   Skeptics:
   - Who and concerns
   - Conversion strategy
   
   Blockers:
   - Who and why
   - Neutralisation approach
   
   Swing votes:
   - Who and what they care about
   - Winning strategy

3. HIDDEN DYNAMICS
   - Unofficial alliances detected
   - Personal agendas affecting project
   - Historical conflicts influencing present
   - External pressures not discussed

4. COMMUNICATION ANALYSIS
   - Who talks to whom (frequency)
   - Information brokers
   - Isolated stakeholders
   - Communication bottlenecks

5. ENGAGEMENT STRATEGY
   For each stakeholder:
   - Current sentiment (-5 to +5)
   - Target sentiment
   - Engagement approach
   - Key messages
   - Messenger (who should engage)
   - Timing

6. COALITION BUILDING
   - Natural alliances to form
   - Bridge builders to engage
   - Sequence of engagement
   - Quick wins to build momentum

7. RISK SCENARIOS
   - If champion leaves
   - If blocker escalates
   - If budget cuts
   - Mitigation plans

Output format:
{
  "stakeholder_analysis": {
    "date": "",
    "project_political_health": "", // green/amber/red
    "influence_map": [...],
    "segments": {...},
    "hidden_dynamics": [...],
    "communication_patterns": {...},
    "engagement_plan": [...],
    "coalition_strategy": {...},
    "risk_scenarios": [...],
    "30_day_actions": [...], // specific engagement actions
    "success_probability": "", // percentage
    "critical_relationships": [] // top 3 to manage
  }
}`,
    expectedOutput: "Influence network map, hidden dynamics identified, specific engagement plan for each stakeholder segment",
    businessValue: [
      "Increase project approval rate by 40%",
      "Reduce political delays by 50%",
      "Build winning coalitions faster",
      "Prevent surprise opposition",
      "Navigate org politics successfully"
    ],
    implementationTips: [
      "Update after any org change",
      "Validate insights with trusted allies",
      "Track sentiment changes weekly",
      "Document successful strategies",
      "Keep analysis confidential"
    ],
    commonMistakes: [
      "Relying only on org chart",
      "Ignoring informal influencers",
      "Underestimating personal agendas",
      "Being too direct with blockers"
    ],
    tools: ["Claude 3.5 Sonnet", "GPT-4"],
    tags: ["stakeholder", "politics", "influence", "engagement"],
    isFree: false
  },

  {
    id: "decision-velocity",
    category: "Executive & Strategy",
    title: "Decision Velocity Accelerator",
    description: "Transform complex decisions into structured choices with clear recommendations in minutes",
    difficulty: "intermediate",
    timeToValue: "10 minutes",
    problem: "Critical decisions take weeks of meetings and still feel uncertain. Meanwhile, opportunity windows close and costs mount.",
    systemPrompt: `You are a decision scientist who helps executives make complex decisions quickly and confidently. You structure messy problems into clear choices with quantified tradeoffs.

You excel at:
- Framing decisions correctly
- Identifying hidden options
- Quantifying intangible factors
- Revealing cognitive biases
- Structuring for group decision-making
- Creating reversible vs irreversible clarity

Always push for specificity and measurability.`,
    userPromptTemplate: `Structure this decision for rapid, confident resolution.

DECISION CONTEXT:
Situation: [describe the situation requiring decision]
Decision needed by: [date]
Decision maker(s): [who has final say]
Stakeholders affected: [who cares about outcome]

CURRENT OPTIONS CONSIDERED:
[List options being discussed, even if incomplete]

CONSTRAINTS:
- Budget: [available funds]
- Timeline: [deadlines]
- Resources: [people/tech available]
- Politics: [what's politically feasible]
- Compliance: [regulatory constraints]

DATA AVAILABLE:
[Paste any relevant data, analysis, opinions, emails]

STRATEGIC CONTEXT:
- Company priorities: [top 3]
- Risk appetite: [conservative/moderate/aggressive]
- Recent similar decisions: [precedents]

Structure this decision:

1. DECISION REFRAME
   - Real question being asked
   - Root problem (vs symptoms)
   - Success criteria (measurable)
   - Type: Reversible/Irreversible

2. COMPLETE OPTION SET
   - Options already identified
   - Hidden options discovered
   - "Do nothing" scenario
   - Hybrid possibilities
   - Staged/pilot approaches

3. EVALUATION CRITERIA
   Weighted criteria:
   - Criterion 1 (weight %)
   - Criterion 2 (weight %)
   - [Add relevant criteria]
   Total = 100%

4. OPTION SCORING
   For each option:
   - Score per criterion (1-10)
   - Weighted total
   - Confidence level
   - Key assumptions

5. RISK ANALYSIS
   Per option:
   - Worst case scenario
   - Probability
   - Mitigation available
   - Recovery options

6. SECOND-ORDER EFFECTS
   - What this decision enables/prevents
   - Precedent being set
   - Organisational signals
   - Market perception

7. RECOMMENDATION
   - Recommended option
   - Why (3 bullets)
   - Implementation quick wins
   - Success metrics
   - Review triggers

8. DECISION PACKAGE
   - One-page visual summary
   - Pre-meeting read (bullets)
   - Discussion questions
   - Meeting agenda (30 min)

Output format:
{
  "decision_framework": {
    "decision_id": "",
    "reframed_question": "",
    "decision_type": "", // reversible/irreversible
    "urgency": "", // high/medium/low
    "options": [
      {
        "name": "",
        "description": "",
        "weighted_score": "",
        "confidence": "",
        "cost": "",
        "timeline": "",
        "risk_level": ""
      }
    ],
    "recommendation": {
      "choice": "",
      "rationale": [...],
      "implementation_week1": [...],
      "success_metrics": [...],
      "review_date": ""
    },
    "visual_summary": "", // description of 1-page visual
    "meeting_plan": {
      "pre_read": [...],
      "agenda": [...],
      "discussion_questions": [...]
    }
  }
}`,
    expectedOutput: "Complete decision framework with all options scored, clear recommendation, and ready-to-use meeting materials",
    businessValue: [
      "Reduce decision time from weeks to days",
      "Increase decision quality and confidence",
      "Create decision audit trail",
      "Reduce decision reversal rate",
      "Free up 5+ hours per week"
    ],
    implementationTips: [
      "Use for any decision taking >3 meetings",
      "Include contrarian options deliberately",
      "Score options independently before discussing",
      "Document assumptions for future review",
      "Track decision outcomes to improve framework"
    ],
    commonMistakes: [
      "Not including 'do nothing' option",
      "Using too many criteria (keep to 5-7)",
      "Not quantifying intangible factors",
      "Ignoring political feasibility"
    ],
    tools: ["Claude 3.5", "GPT-4", "Gemini Pro"],
    tags: ["decision", "strategy", "framework", "acceleration"],
    isFree: false
  },

  {
    id: "customer-intelligence",
    category: "Customer & Sales",
    title: "Customer Intelligence Deep Dive",
    description: "Extract actionable insights from customer interactions to predict churn, identify upsell opportunities, and improve satisfaction",
    difficulty: "intermediate",
    timeToValue: "15 minutes",
    problem: "Customer data is scattered across calls, emails, tickets, and surveys. By the time patterns are obvious, customers have already churned.",
    systemPrompt: `You are a customer intelligence analyst who can predict customer behaviour from subtle signals. You've analysed thousands of customer journeys and know the early warning signs.

You detect:
- Churn risk indicators (2-3 months early)
- Upsell readiness signals
- Satisfaction trajectory changes
- Feature request patterns
- Support cost drivers
- Advocacy potential
- Competitive threats mentioned

Be specific and actionable, not generic.`,
    userPromptTemplate: `Analyse customer data for actionable intelligence.

CUSTOMER DATA:
[Paste any combination of:]
- Support tickets
- Call transcripts
- Email threads
- Survey responses
- Usage analytics
- Payment history
- Feature requests
- Sales notes (CRM)
- Meeting notes
- Social media mentions

CUSTOMER CONTEXT:
- Customer name: [company]
- Segment: [enterprise/mid-market/SMB]
- Contract value: [annual value]
- Tenure: [months as customer]
- Key stakeholders: [names/roles]
- Recent changes: [new personnel, merger, etc]

BUSINESS CONTEXT:
- Your product: [what you sell]
- Competition: [alternatives they could use]
- Success metrics: [what matters to you]

Extract intelligence:

1. HEALTH SCORE CALCULATION
   - Overall health (0-100)
   - Component scores:
     * Usage health
     * Engagement health
     * Sentiment health
     * Relationship health
     * Value realisation
   - Trajectory (improving/stable/declining)

2. CHURN RISK ASSESSMENT
   - Risk level (low/medium/high)
   - Specific indicators detected
   - Estimated time to churn
   - Root cause hypothesis
   - Intervention strategy

3. EXPANSION OPPORTUNITIES
   - Upsell readiness (0-100)
   - Specific opportunities identified
   - Buying signals detected
   - Recommended approach
   - Optimal timing

4. SATISFACTION DRIVERS
   - Top 3 satisfaction drivers
   - Top 3 frustration points
   - Feature requests (prioritised)
   - Support pain points
   - Competitive mentions

5. STAKEHOLDER ANALYSIS
   - Champion status (strong/weak/none)
   - Influencer sentiment
   - Decision maker engagement
   - User adoption patterns
   - Political dynamics

6. ACTION PLAN
   Next 30 days:
   - Retention actions (if at risk)
   - Expansion actions (if opportunity)
   - Relationship actions
   - Product actions
   - Success metrics

7. CONVERSATION STARTERS
   - 3 value-add topics to discuss
   - Questions to uncover needs
   - Success stories to share
   - ROI proof points

Output format:
{
  "customer_intelligence": {
    "account": "",
    "analysis_date": "",
    "health_score": {
      "overall": "",
      "components": {...},
      "trajectory": "",
      "confidence": ""
    },
    "churn_risk": {...},
    "expansion": {...},
    "satisfaction": {...},
    "stakeholders": {...},
    "action_plan": {
      "immediate": [...],
      "week_1": [...],
      "month_1": [...],
      "success_metrics": [...]
    },
    "talk_track": {
      "value_topics": [...],
      "discovery_questions": [...],
      "proof_points": [...]
    },
    "executive_summary": "" // 3 bullets for leadership
  }
}`,
    expectedOutput: "Customer health score, specific churn risks or expansion opportunities, and concrete 30-day action plan",
    businessValue: [
      "Reduce churn by 25%",
      "Increase expansion revenue 30%",
      "Improve NPS by 15 points",
      "Reduce support costs 20%",
      "Identify advocates for references"
    ],
    implementationTips: [
      "Run monthly for top 20% of customers",
      "Run immediately after QBRs",
      "Share insights with customer success team",
      "Track prediction accuracy",
      "Build customer intelligence database"
    ],
    commonMistakes: [
      "Ignoring subtle sentiment shifts",
      "Missing cross-functional signals",
      "Not connecting usage to value",
      "Being reactive vs predictive"
    ],
    tools: ["Claude 3.5", "GPT-4", "Gemini Pro"],
    tags: ["customer", "retention", "upsell", "satisfaction"],
    isFree: false
  },

  {
    id: "process-optimizer",
    category: "Operations & Process",
    title: "Process Waste Eliminator",
    description: "Identify and quantify waste in any business process, with specific optimization recommendations",
    difficulty: "intermediate",
    timeToValue: "20 minutes",
    problem: "Processes accumulate waste over time but it's invisible until someone maps it. Most processes have 40-60% waste that could be eliminated.",
    systemPrompt: `You are a process optimization expert trained in Lean, Six Sigma, and Theory of Constraints. You can identify waste in any process and quantify the improvement opportunity.

You identify:
- The 8 wastes (DOWNTIME)
- Bottlenecks and constraints
- Automation opportunities
- Handoff inefficiencies
- Rework patterns
- Waiting time
- Unnecessary approvals
- Technology gaps

Provide specific, implementable improvements with ROI.`,
    userPromptTemplate: `Analyse this process for waste and optimization opportunities.

PROCESS DESCRIPTION:
Process name: [e.g., "Invoice approval", "Customer onboarding"]
Process owner: [department/role]
Frequency: [times per day/week/month]
Current cycle time: [end-to-end duration]
Volume: [items processed per period]

CURRENT PROCESS STEPS:
[List steps either as numbered list or paste process documentation]
Example:
1. Request received via email
2. Manual data entry to system
3. Manager approval (email)
4. Finance review
5. Senior approval if >£10k
6. Processing
7. Confirmation sent

PAIN POINTS:
[Describe known issues, complaints, delays]

SYSTEMS USED:
[List all software, tools, spreadsheets involved]

TEAM INVOLVED:
[Roles and approximate time spent]

Analyse for:

1. WASTE IDENTIFICATION
   For each type of waste found:
   - Waste type (from DOWNTIME)
   - Where it occurs (specific step)
   - Time impact (hours/week)
   - Cost impact (£/year)
   - Root cause

2. BOTTLENECK ANALYSIS
   - Primary constraint location
   - Throughput impact
   - Queue size typically
   - Resolution options

3. AUTOMATION OPPORTUNITIES
   - Steps that could be automated
   - Technology required
   - Implementation complexity
   - Time savings
   - ROI calculation

4. PROCESS REDESIGN
   Current state:
   - Steps: X
   - Cycle time: Y
   - Touch points: Z
   
   Future state:
   - Steps: X-n
   - Cycle time: Y-m
   - Touch points: Z-p
   - Improvements: [specific changes]

5. QUICK WINS
   - Changes implementable this week
   - No/low cost improvements
   - Expected impact

6. TRANSFORMATION ROADMAP
   Phase 1 (Month 1):
   - Actions
   - Investment
   - Savings
   
   Phase 2 (Months 2-3):
   - Actions
   - Investment
   - Savings
   
   Phase 3 (Months 4-6):
   - Actions
   - Investment
   - Savings

7. METRICS FRAMEWORK
   - Current baseline metrics
   - Target metrics
   - Measurement method
   - Review frequency

Output format:
{
  "process_analysis": {
    "process_name": "",
    "analysis_date": "",
    "efficiency_score": "", // percentage of value-add time
    "waste_identified": [
      {
        "waste_type": "",
        "location": "",
        "time_impact_hours_week": "",
        "cost_impact_annual": "",
        "elimination_strategy": ""
      }
    ],
    "bottlenecks": [...],
    "automation_opportunities": [...],
    "redesign": {
      "current_state": {...},
      "future_state": {...},
      "benefits": {...}
    },
    "quick_wins": [...],
    "roadmap": {...},
    "metrics": {...},
    "roi_summary": {
      "total_investment": "",
      "annual_savings": "",
      "payback_months": "",
      "efficiency_gain": ""
    }
  }
}`,
    expectedOutput: "Specific waste identification with hours/cost impact, 3-5 quick wins, and phased optimization roadmap with ROI",
    businessValue: [
      "Reduce process time by 40-60%",
      "Cut processing costs by 30%",
      "Improve quality/accuracy by 50%",
      "Increase capacity without hiring",
      "Improve employee satisfaction"
    ],
    implementationTips: [
      "Start with highest-volume processes",
      "Involve process participants in analysis",
      "Implement quick wins immediately for buy-in",
      "Measure baseline before changes",
      "Document new process thoroughly"
    ],
    commonMistakes: [
      "Optimizing before eliminating",
      "Ignoring change management",
      "Not measuring actual vs perceived time",
      "Automating broken processes"
    ],
    tools: ["Claude 3.5", "GPT-4", "Gemini Pro"],
    tags: ["process", "optimization", "efficiency", "automation"],
    isFree: false
  },

  {
    id: "budget-optimizer",
    category: "Finance & Budgeting",
    title: "Budget Allocation Optimizer",
    description: "Find hidden money in your budget and optimally reallocate for maximum ROI",
    difficulty: "intermediate",
    timeToValue: "15 minutes",
    problem: "Budgets are allocated based on last year plus inflation, not ROI. Most organisations have 20-30% misallocated spend that could generate higher returns.",
    systemPrompt: `You are a financial strategist who specialises in zero-based budgeting and ROI optimization. You can identify low-return spending and high-potential investment opportunities.

You analyse:
- ROI by category and initiative
- Fixed vs variable cost opportunities
- Strategic alignment of spending
- Risk-adjusted returns
- Quick wins vs long-term investments
- Opportunity costs
- Synergies between investments

Provide specific reallocation recommendations with projected returns.`,
    userPromptTemplate: `Analyse budget allocation and identify optimization opportunities.

CURRENT BUDGET:
[Paste budget data in any format - spreadsheet, P&L, department budgets]

Example format:
- Category: Current Allocation | YoY Growth | ROI/Metrics
- Marketing: £2M | +10% | 3x ROI
- Technology: £5M | +5% | Unknown
- Operations: £8M | +3% | Cost per transaction £2

STRATEGIC CONTEXT:
- Company priorities: [e.g., growth, efficiency, innovation]
- Growth target: [percentage]
- Margin target: [percentage]
- Risk tolerance: [conservative/moderate/aggressive]

CONSTRAINTS:
- Fixed costs: [items that can't be cut]
- Committed spending: [contracts, etc.]
- Regulatory requirements: [compliance spending]
- Political considerations: [protected areas]

PERFORMANCE DATA:
[Any data on ROI, performance metrics, benchmarks]

Provide analysis:

1. SPENDING EFFECTIVENESS
   By category:
   - Current ROI (calculated or estimated)
   - Benchmark comparison
   - Efficiency score (1-10)
   - Strategic alignment (1-10)
   - Recommendation (increase/maintain/decrease)

2. HIDDEN MONEY FINDER
   - Low/no value spending identified
   - Duplicate spending across departments
   - Overpriced vendors/contracts
   - Unnecessary complexity costs
   - Total recoverable: £

3. REALLOCATION OPPORTUNITIES
   For each opportunity:
   - From: [category reducing]
   - To: [category increasing]
   - Amount: £
   - Expected ROI improvement
   - Risk level
   - Implementation timeline

4. QUICK WINS (This Quarter)
   - Immediate cuts (no impact)
   - Vendor renegotiations
   - Process eliminations
   - Tool consolidations
   - Total savings: £

5. STRATEGIC REALLOCATIONS
   - Innovation investments needed
   - Growth accelerators underfunded
   - Risk mitigation gaps
   - Capability building needs

6. SCENARIO MODELING
   Conservative scenario:
   - Changes
   - Impact
   
   Moderate scenario:
   - Changes
   - Impact
   
   Aggressive scenario:
   - Changes
   - Impact

7. IMPLEMENTATION ROADMAP
   Month 1:
   - Actions
   - Savings/investments
   
   Quarter 1:
   - Actions
   - Savings/investments
   
   Year 1:
   - Actions
   - Savings/investments

Output format:
{
  "budget_analysis": {
    "total_budget": "",
    "optimization_potential": "", // percentage that could be better allocated
    "effectiveness_score": "", // overall 1-10
    "spending_effectiveness": [...],
    "hidden_money": {
      "items": [...],
      "total_recoverable": ""
    },
    "reallocations": [...],
    "quick_wins": [...],
    "strategic_moves": [...],
    "scenarios": {...},
    "roadmap": {...},
    "expected_impact": {
      "cost_savings": "",
      "roi_improvement": "",
      "strategic_alignment_score": ""
    }
  }
}`,
    expectedOutput: "Specific spending cuts and reallocations with ROI projections, £X quick wins, and implementation roadmap",
    businessValue: [
      "Find 10-20% budget to reallocate",
      "Improve overall ROI by 30%",
      "Align spending with strategy",
      "Fund innovation without increasing budget",
      "Create financial flexibility"
    ],
    implementationTips: [
      "Start with discretionary spending",
      "Benchmark against industry standards",
      "Include frontline staff in identifying waste",
      "Phase changes to manage risk",
      "Track actual vs projected savings"
    ],
    commonMistakes: [
      "Cutting muscle not fat",
      "Ignoring hidden costs of cuts",
      "Not considering morale impact",
      "Under-investing in future capabilities"
    ],
    tools: ["Claude 3.5", "GPT-4", "Gemini Pro"],
    tags: ["budget", "finance", "ROI", "optimization"],
    isFree: false
  },

  {
    id: "team-performance",
    category: "HR & Team Management",
    title: "Team Performance Decoder",
    description: "Diagnose team performance issues and generate specific interventions to improve productivity and morale",
    difficulty: "intermediate",
    timeToValue: "15 minutes",
    problem: "Team performance issues are usually diagnosed after they've become critical. Managers lack tools to identify root causes and design targeted interventions.",
    systemPrompt: `You are an organizational psychologist and team performance expert. You can diagnose team dysfunction from various signals and design evidence-based interventions.

You analyse:
- Communication patterns
- Delivery patterns
- Engagement indicators
- Skill gaps and mismatches
- Leadership effectiveness
- Team dynamics and psychological safety
- Process and tool friction
- Environmental factors

Provide specific, actionable interventions with expected impact.`,
    userPromptTemplate: `Diagnose team performance and recommend interventions.

TEAM CONTEXT:
- Team name/function: [e.g., Product Development]
- Size: [number of people]
- Manager: [name/tenure]
- Formation: [how long together]
- Location: [remote/hybrid/office]

PERFORMANCE DATA:
[Provide any available data:]
- Delivery metrics (velocity, quality, deadlines)
- Engagement scores
- Turnover rates
- 360 feedback
- Sprint retrospectives
- Pulse survey results
- 1-on-1 notes

OBSERVED SYMPTOMS:
[Describe what you're seeing:]
- Missed deadlines
- Quality issues
- Low morale signals
- Conflicts
- Communication breakdowns
- Lack of innovation

RECENT CHANGES:
- Team changes: [joiners/leavers]
- Org changes: [restructures]
- Process changes: [new tools/methods]
- External pressures: [market/competition]

Provide diagnosis:

1. PERFORMANCE ASSESSMENT
   Score each dimension (1-10):
   - Delivery performance
   - Quality performance
   - Innovation performance
   - Collaboration effectiveness
   - Morale/engagement
   - Leadership effectiveness
   Overall health: [Critical/Poor/Fair/Good/Excellent]

2. ROOT CAUSE ANALYSIS
   For each performance issue:
   - Symptom observed
   - Root cause identified
   - Evidence supporting
   - Impact if unaddressed
   - Confidence level

3. TEAM DYNAMICS ASSESSMENT
   - Psychological safety level
   - Trust indicators
   - Communication patterns
   - Conflict style
   - Decision-making process
   - Role clarity

4. CAPABILITY ANALYSIS
   - Skills present vs needed
   - Experience gaps
   - Training needs
   - Coaching opportunities
   - Hiring needs

5. INTERVENTION PLAN
   For each intervention:
   - Intervention description
   - Target problem
   - Implementation steps
   - Timeline
   - Success metrics
   - Risk factors

6. QUICK WINS (This Week)
   - Immediate morale boosters
   - Process fixes
   - Communication improvements
   - Recognition opportunities

7. 90-DAY TRANSFORMATION
   Month 1:
   - Focus area
   - Key interventions
   - Expected improvements
   
   Month 2:
   - Focus area
   - Key interventions
   - Expected improvements
   
   Month 3:
   - Focus area
   - Key interventions
   - Expected improvements

8. LEADERSHIP ACTIONS
   - Manager behaviours to change
   - Team rituals to introduce
   - Communication adjustments
   - Recognition strategies

Output format:
{
  "team_diagnosis": {
    "team_name": "",
    "assessment_date": "",
    "overall_health": "",
    "performance_scores": {...},
    "root_causes": [...],
    "team_dynamics": {...},
    "capability_gaps": [...],
    "interventions": [...],
    "quick_wins": [...],
    "transformation_plan": {...},
    "leadership_actions": [...],
    "success_probability": "", // percentage
    "critical_first_step": "" // single most important action
  }
}`,
    expectedOutput: "Root causes identified, team dynamics assessed, 5-7 specific interventions with 90-day transformation plan",
    businessValue: [
      "Improve team productivity by 30%",
      "Reduce turnover by 40%",
      "Increase engagement scores by 20 points",
      "Accelerate delivery by 25%",
      "Build high-performing team culture"
    ],
    implementationTips: [
      "Share diagnosis with team for validation",
      "Start with quick wins for momentum",
      "Involve team in solution design",
      "Track leading indicators weekly",
      "Adjust based on what's working"
    ],
    commonMistakes: [
      "Treating symptoms not causes",
      "Ignoring team input",
      "Too many simultaneous changes",
      "Not addressing leadership issues"
    ],
    tools: ["Claude 3.5", "GPT-4", "Gemini Pro"],
    tags: ["team", "performance", "management", "culture"],
    isFree: false
  }
];

export function getPromptsByCategory(category: string): AIPrompt[] {
  return aiPrompts.filter(prompt => prompt.category === category);
}

export function getFreePrompts(): AIPrompt[] {
  return aiPrompts.filter(prompt => prompt.isFree);
}

export function getPromptBySlug(slug: string): AIPrompt | undefined {
  return aiPrompts.find(prompt => prompt.id === slug);
}