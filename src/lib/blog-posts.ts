export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "ai-transformation-avoiding-common-pitfalls",
    title: "The 7 Deadly Sins of AI Transformation (And How to Avoid Them)",
    excerpt: "Learn from the failures of others. Discover the most common mistakes organisations make when implementing AI and how to ensure your transformation succeeds.",
    content: `
# The 7 Deadly Sins of AI Transformation

After 15 years helping organisations implement AI, I've seen the same mistakes repeated countless times. The good news? They're entirely avoidable if you know what to watch for. Here are the seven deadly sins that kill AI transformations – and how to avoid them.

## 1. Starting with Technology, Not Problems

**The Sin:** Buying AI tools because they're trendy, then looking for problems to solve.

**The Reality:** I recently worked with a bank that spent £3M on an AI platform before defining use cases. Six months later, it was gathering dust.

**The Solution:** Start with your biggest business problems. Map them to AI capabilities. Only then select technology. Your problems should pull AI in, not have AI pushed onto them.

## 2. Ignoring the Human Element

**The Sin:** Focusing entirely on technical implementation while neglecting change management.

**The Reality:** 70% of AI failures are due to human factors, not technology. Your best algorithms are worthless if people won't use them.

**The Solution:** Invest equally in change management and technical development. Create champion networks. Show early wins. Make adoption feel like an upgrade, not a threat.

## 3. Black Box Syndrome

**The Sin:** Deploying AI systems that nobody understands or trusts.

**The Reality:** If executives can't explain how decisions are made, they won't stake their careers on AI recommendations.

**The Solution:** Prioritise explainability. Use glass-box models where possible. Create simple visualisations. Build trust through transparency.

## 4. Data Perfectionism Paralysis

**The Sin:** Waiting for perfect data before starting AI initiatives.

**The Reality:** Perfect data doesn't exist. Companies spending years on data preparation often find their business has moved on by the time they're "ready."

**The Solution:** Start with the data you have. Build incrementally. Use AI to actually improve data quality over time. Progress beats perfection.

## 5. Pilot Purgatory

**The Sin:** Running endless pilots without scaling successful ones.

**The Reality:** I've seen organisations with 50+ AI pilots but zero production deployments. Innovation theatre without impact.

**The Solution:** Design pilots with scale in mind. Set clear go/no-go criteria. Have funding and resources pre-approved for scaling winners. Kill failures fast.

## 6. Skills Gap Denial

**The Sin:** Assuming existing teams can handle AI without significant upskilling.

**The Reality:** AI requires new ways of thinking, not just new tools. Traditional IT skills aren't enough.

**The Solution:** Invest in comprehensive training. Hire AI natives to seed expertise. Partner with specialists for initial projects. Build capability systematically.

## 7. ROI Myopia

**The Sin:** Expecting immediate ROI and killing projects that don't deliver within quarters.

**The Reality:** Transformational AI value often takes 12-18 months to materialise. Quick wins are possible, but game-changers need time.

**The Solution:** Balance quick wins with strategic bets. Set realistic timelines. Measure leading indicators. Communicate the journey, not just destinations.

## The Path to AI Success

Avoiding these sins isn't about perfection – it's about awareness and intentional action. The organisations succeeding with AI aren't those without challenges; they're those who anticipate and address them proactively.

Start small but think big. Focus on problems that matter. Bring people along. Be transparent. Build capability. And most importantly, learn from others' mistakes so you don't have to repeat them.

## Ready to Transform?

If you're planning an AI transformation and want to avoid these pitfalls, let's talk. With the right approach, AI can deliver extraordinary value – without the extraordinary pain.

**Next Step:** Download our AI Transformation Checklist to assess your readiness and identify potential pitfalls before they become problems.
    `,
    author: {
      name: "Austin Mander",
      role: "AI Consultant & Founder"
    },
    category: "AI Strategy",
    tags: ["AI Transformation", "Change Management", "Digital Strategy", "Leadership"],
    publishedAt: "2024-10-25",
    readingTime: 7,
    featured: true
  },
  {
    id: "2",
    slug: "predictive-intelligence-transformation-programs",
    title: "Why Your Transformation Program Will Fail (And How AI Can Prevent It)",
    excerpt: "70% of transformations fail. But what if you could predict failure 6 weeks before it happens? Explore how predictive intelligence is revolutionising program management.",
    content: `
# Why Your Transformation Program Will Fail

Let me start with an uncomfortable truth: your transformation program is probably going to fail. 

Not because your team isn't capable. Not because your vision isn't clear. But because you're fighting with outdated tools in a modern battlefield.

## The Sobering Statistics

- 70% of transformation programs fail to deliver expected value
- Average budget overrun: 27%
- Average timeline slip: 45%
- Executive confidence in delivery: 23%

These aren't edge cases. This is the norm. And it's been the norm for decades.

## Why Traditional Program Management Fails

### 1. Rear-View Mirror Management

Traditional program management is like driving using only your rear-view mirror. By the time risks appear in your weekly status reports, they've already materialized. You're not preventing problems; you're documenting disasters.

### 2. Information Archaeology 

Program managers spend 60% of their time gathering status updates, creating reports, and running meetings. They're archaeologists, digging through layers of spreadsheets and slides to understand what happened last week.

### 3. The Optimism Bias

Every status report is green until suddenly it's red. Teams naturally underreport risks. Nobody wants to be the bearer of bad news. This creates a false sense of security until reality crashes the party.

### 4. Pattern Blindness

Every program generates thousands of data points. Hidden in that data are patterns that predict future failures. But human brains aren't equipped to spot these patterns across multiple workstreams, especially in real-time.

## Enter Predictive Intelligence

Imagine knowing six weeks in advance that your program will slip. Imagine identifying team burnout before it impacts delivery. Imagine predicting budget overruns while you still have time to course-correct.

This isn't science fiction. It's what AI-powered predictive intelligence delivers today.

### How It Works

**Step 1: Data Ingestion**
AI continuously analyses data from your existing tools – project management systems, communication platforms, code repositories, and more.

**Step 2: Pattern Recognition**
Machine learning models identify patterns that correlate with future failures. These patterns are often invisible to humans but obvious to algorithms.

**Step 3: Risk Prediction**
The system predicts specific risks 4-6 weeks before they materialise, with confidence scores and impact assessments.

**Step 4: Actionable Insights**
Instead of overwhelming dashboards, you get clear, contextual alerts: "Team A's velocity has dropped 30% over two sprints. Similar patterns have led to 3-week delays. Recommend immediate intervention."

## Real-World Impact

### Case Study: Global Bank
- **Before:** 58% on-time delivery rate
- **After:** 94% on-time delivery rate
- **Time to identify risks:** Reduced from 3 weeks to 3 days
- **Executive time in status meetings:** Reduced by 8 hours/week

### Case Study: Retail Transformation
- **Before:** £2.3M budget overrun projected
- **After:** Delivered £400K under budget
- **Risks prevented:** 47 major issues identified and resolved before impact
- **ROI:** 3.8x in first year

## The Five Predictions That Matter Most

### 1. Timeline Slippage
AI identifies early indicators like decreasing commit frequency, increasing meeting density, and communication sentiment shifts that predict delays weeks in advance.

### 2. Budget Overrun
By analysing burn rate patterns, resource allocation, and scope creep indicators, AI predicts budget issues while there's still time to adjust.

### 3. Quality Degradation
Increasing bug rates, declining code review thoroughness, and testing coverage drops all predict future quality issues.

### 4. Team Burnout
Communication patterns, work hours, and task completion rates reveal burnout risks before they impact delivery.

### 5. Stakeholder Misalignment
Sentiment analysis of communications and meeting attendance patterns predict stakeholder conflicts before they explode.

## Why This Changes Everything

### From Reactive to Proactive
Stop fighting fires. Prevent them from starting.

### From Gut Feel to Data-Driven
Make decisions based on evidence, not intuition.

### From Surprises to Predictability
Know what's coming and prepare accordingly.

### From Heroics to Systematic Success
Success becomes repeatable, not dependent on individual heroics.

## Implementation Without Disruption

The beauty of modern predictive intelligence is that it layers onto your existing tools and processes. No rip-and-replace. No massive change management. Just better insights from day one.

**Week 1:** Connect existing tools
**Week 2:** Baseline current state
**Week 3:** First predictions delivered
**Week 4-6:** Refine and prove value

## The Choice Is Yours

You can continue with traditional program management, accepting that 70% failure rate as "just how things are." Or you can embrace predictive intelligence and join the organisations delivering consistently successful transformations.

The technology exists. The ROI is proven. The only question is: how much longer will you accept preventable failures?

## Take Action

Don't let your transformation become another statistic. Book a consultation to explore how predictive intelligence can safeguard your program's success.

Remember: every day without predictive intelligence is another day closer to preventable failure.
    `,
    author: {
      name: "Austin Mander",
      role: "AI Consultant & Founder"
    },
    category: "Transformation",
    tags: ["Change Radar", "Program Management", "Predictive Analytics", "Risk Management"],
    publishedAt: "2024-10-18",
    readingTime: 9,
    featured: true
  },
  {
    id: "3",
    slug: "executives-guide-ai-implementation",
    title: "The Executive's Guide to AI: Cut Through the Hype, Deliver Real Value",
    excerpt: "A no-nonsense guide for executives who need to understand AI's real potential, avoid vendor BS, and make informed decisions that drive business value.",
    content: `
# The Executive's Guide to AI

If you're an executive trying to make sense of AI, you're probably drowning in buzzwords, vendor pitches, and contradictory advice. This guide cuts through the noise to give you what you actually need: clear insights to make informed decisions.

## The Reality Check

### What AI Actually Is
AI is sophisticated pattern recognition at scale. It excels at:
- Finding patterns humans miss
- Processing vast amounts of data quickly
- Making predictions based on historical patterns
- Automating complex but repetitive tasks

### What AI Is Not
- Magic that solves all problems
- A replacement for strategic thinking
- Infallible or unbiased
- A plug-and-play solution

## The Questions That Matter

### 1. "Should we be doing AI?"

**Wrong question.** The right question: "What expensive problems could pattern recognition at scale solve for us?"

If you're asking the first question, you're already behind. Your competitors are asking the second.

### 2. "How much should we invest?"

Start with pilot projects that can prove value in 6-8 weeks. Budget £50-150K for meaningful pilots. Only scale what works. This isn't about big bang transformations; it's about rapid, iterative value creation.

### 3. "Build, buy, or partner?"

- **Build:** Only if AI is your core differentiator
- **Buy:** For commodity use cases (chatbots, document processing)
- **Partner:** For strategic initiatives requiring deep expertise

Most organisations should partner first, buy second, build last.

## The Five Use Cases That Actually Work

### 1. Predictive Maintenance & Risk
- **What it does:** Predicts failures before they happen
- **Real value:** 20-50% reduction in downtime
- **Time to value:** 3-6 months

### 2. Intelligent Document Processing
- **What it does:** Extracts and processes information from documents
- **Real value:** 60-80% reduction in processing time
- **Time to value:** 2-4 months

### 3. Customer Intelligence
- **What it does:** Predicts customer behaviour and personalises experiences
- **Real value:** 15-25% increase in conversion rates
- **Time to value:** 3-4 months

### 4. Operational Optimization
- **What it does:** Optimises resource allocation and scheduling
- **Real value:** 10-30% efficiency improvement
- **Time to value:** 4-6 months

### 5. Fraud Detection & Compliance
- **What it does:** Identifies anomalies and suspicious patterns
- **Real value:** 40-60% reduction in false positives
- **Time to value:** 3-5 months

## The Vendor BS Detector

### Red Flags
- "Our AI can do anything"
- "No data preparation needed"
- "100% accuracy"
- "Immediate ROI"
- "No change management required"
- Unwillingness to start with pilots

### Green Flags
- Specific use case focus
- Clear data requirements
- Realistic timelines (months, not weeks)
- References in your industry
- Pilot-first approach
- Transparent about limitations

## The Hidden Costs Nobody Mentions

### Data Preparation: 40% of Total Cost
Your data is messier than you think. Budget significant time and resources for cleaning, structuring, and maintaining data quality.

### Change Management: 30% of Total Cost
People resist change. Budget for training, communication, and adoption support.

### Integration: 20% of Total Cost
AI doesn't exist in isolation. Budget for API development, system integration, and workflow redesign.

### Ongoing Optimisation: 10% Annual
AI models degrade. Budget for monitoring, retraining, and optimization.

## The Roadmap That Works

### Phase 1: Foundation (Months 1-3)
- Identify high-value use cases
- Assess data readiness
- Run 1-2 pilot projects
- Build initial expertise

### Phase 2: Expansion (Months 4-9)
- Scale successful pilots
- Add 3-5 new use cases
- Establish governance framework
- Build internal capability

### Phase 3: Integration (Months 10-18)
- Integrate AI into core processes
- Develop proprietary models
- Create competitive advantage
- Measure and optimise ROI

## The Governance Framework

### You Need Clear Policies On:
- Data usage and privacy
- Decision accountability
- Bias monitoring and mitigation
- Model explainability requirements
- Risk thresholds and escalation

### The Board Questions You'll Face:
1. "What if the AI makes a mistake?" - Have clear accountability chains
2. "How do we know it's not biased?" - Regular audits and monitoring
3. "What's our competitive advantage?" - Focus on proprietary data and use cases
4. "What's the ROI?" - Track leading and lagging indicators
5. "What are the risks?" - Have a comprehensive risk register

## The Metrics That Matter

### Leading Indicators
- Time to insight (reduction)
- Process cycle time (reduction)
- Data quality scores (improvement)
- User adoption rates (increase)

### Lagging Indicators
- Cost reduction achieved
- Revenue impact
- Error rate reduction
- Customer satisfaction improvement

## The Culture Shift Required

### From This:
- "That's how we've always done it"
- "The computer can't be trusted"
- "AI will take our jobs"
- "We need perfect data first"

### To This:
- "How could AI improve this?"
- "Trust but verify"
- "AI augments our capabilities"
- "Start with what we have"

## The Team You Need

### Core Team
- **Executive Sponsor:** You or a direct report
- **Program Lead:** Experienced transformation leader
- **Data Lead:** Understands your data landscape
- **Change Lead:** Drives adoption
- **Technical Lead:** Bridges business and technology

### Extended Team
- Subject matter experts from affected departments
- IT for integration support
- Legal for compliance
- Finance for ROI tracking
- HR for workforce impact

## The Decision Framework

### Green Light Criteria
✓ Clear problem with measurable impact
✓ Available data (even if imperfect)
✓ Executive sponsorship
✓ Defined success metrics
✓ Pilot budget approved

### Red Light Criteria
✗ Solution looking for a problem
✗ No data or data access
✗ Lack of executive buy-in
✗ Unclear success criteria
✗ Expecting immediate transformation

## The Uncomfortable Truths

1. **Your competitors are already doing this.** The question isn't if, but how fast you can catch up.

2. **Perfect is the enemy of good.** Start with 70% solutions and iterate.

3. **Culture eats strategy.** The best AI strategy fails without cultural change.

4. **This is a capability, not a project.** Plan for continuous investment and evolution.

5. **You can't outsource thinking.** Vendors provide tools; you provide strategy.

## Your Next Steps

### This Week
1. Identify your three most expensive problems
2. Assess which could benefit from pattern recognition at scale
3. Evaluate your data readiness for one use case

### This Month
1. Launch a pilot project
2. Assign an executive sponsor
3. Set clear success metrics
4. Communicate the vision

### This Quarter
1. Evaluate pilot results
2. Make scale/kill decision
3. Plan broader rollout
4. Build organisational capability

## The Bottom Line

AI is not optional anymore. It's not about whether you'll implement AI, but whether you'll do it well or poorly. The organisations that thrive will be those that:

- Start with real problems
- Move fast but thoughtfully
- Learn from failures
- Build capability systematically
- Maintain human judgment

The choice isn't between human and artificial intelligence. It's between organisations that combine both effectively and those that don't.

**Ready to move beyond the hype?** Book a consultation to develop your pragmatic AI strategy. No buzzwords, no BS, just clear path to value.
    `,
    author: {
      name: "Austin Mander",
      role: "AI Consultant & Founder"
    },
    category: "Leadership",
    tags: ["Executive Guide", "AI Strategy", "Digital Leadership", "ROI"],
    publishedAt: "2024-10-10",
    readingTime: 12,
    featured: true
  },
  {
    id: "4",
    slug: "roi-calculator-ai-transformation",
    title: "The Real ROI of AI: A Calculator and Framework for Executives",
    excerpt: "Stop guessing about AI ROI. Use this comprehensive framework and calculator to build a bulletproof business case for your AI initiatives.",
    content: `
# The Real ROI of AI: Beyond the Hype

Every vendor promises massive ROI from AI. Most can't prove it. This framework gives you the tools to calculate real, defensible ROI for your AI initiatives.

## The ROI Formula That Works

**Traditional ROI = (Gain from Investment - Cost of Investment) / Cost of Investment × 100**

For AI, we need a more nuanced approach:

**AI ROI = (Direct Savings + Productivity Gains + Revenue Impact + Risk Reduction - Total Costs) / Total Costs × 100**

Let's break down each component.

## Calculating Direct Savings

### Labor Cost Reduction
- Hours saved per process × Hourly rate × Frequency
- Example: Invoice processing
  - Before: 20 minutes per invoice
  - After: 2 minutes per invoice
  - Volume: 10,000 invoices/month
  - Rate: £50/hour
  - Monthly saving: £15,000

### Error Reduction
- Cost per error × Error rate reduction × Volume
- Example: Data entry errors
  - Error cost: £200 per error
  - Current rate: 5%
  - AI rate: 0.5%
  - Volume: 1,000 transactions/month
  - Monthly saving: £9,000

### Process Acceleration
- Value of time saved × Cycle time reduction
- Example: Loan approval
  - Current: 5 days
  - With AI: 1 day
  - Value per day: £1,000
  - Applications: 100/month
  - Monthly value: £400,000

## Measuring Productivity Gains

### Executive Time Savings
- Hours saved × Executive hourly value
- Example: Report generation
  - Weekly reports: 8 hours → 1 hour
  - Executive value: £500/hour
  - Weekly gain: £3,500
  - Annual gain: £182,000

### Decision Speed Improvement
- Value of faster decisions × Decision frequency
- Example: Pricing decisions
  - Speed improvement: 3 days → same day
  - Value per day: £5,000
  - Decisions/month: 20
  - Monthly gain: £300,000

## Quantifying Revenue Impact

### Conversion Rate Improvement
- (New rate - Old rate) × Volume × Average value
- Example: Sales conversion
  - Old rate: 2%
  - New rate: 2.5%
  - Leads: 10,000/month
  - Average value: £1,000
  - Monthly impact: £50,000

### Customer Retention
- Retention improvement × Customer lifetime value × Customer base
- Example: Churn prediction
  - Churn reduction: 2%
  - CLV: £10,000
  - Customers: 5,000
  - Annual impact: £1,000,000

### New Revenue Streams
- Revenue from AI-enabled products/services
- Example: Personalization engine
  - Upsell rate increase: 15%
  - Average upsell: £500
  - Customers: 1,000/month
  - Monthly revenue: £75,000

## Risk Reduction Value

### Compliance & Penalties
- Probability of event × Cost of event × Reduction rate
- Example: Regulatory fines
  - Annual fine risk: £2M
  - Probability: 10%
  - AI reduction: 70%
  - Annual value: £140,000

### Operational Risk
- Downtime cost × Incident reduction
- Example: System failures
  - Cost per hour: £50,000
  - Current: 10 hours/year
  - With AI: 2 hours/year
  - Annual saving: £400,000

## The True Cost Structure

### One-Time Costs
- Software licenses: £100,000
- Implementation: £150,000
- Integration: £50,000
- Initial training: £30,000
- **Total: £330,000**

### Recurring Costs (Annual)
- Software maintenance: £20,000
- Cloud infrastructure: £36,000
- Model retraining: £24,000
- Support staff: £60,000
- **Total: £140,000**

### Hidden Costs (Often Forgotten)
- Change management: 30% of implementation
- Data preparation: 40% of year 1 costs
- Ongoing optimization: 15% of annual costs
- Compliance/governance: £30,000/year

## Real-World ROI Examples

### Financial Services - Fraud Detection
- **Investment:** £500,000 (Year 1)
- **Annual savings:** £2.3M
- **ROI:** 360% (Year 1), 580% (3-year average)
- **Payback period:** 3 months

### Retail - Inventory Optimization
- **Investment:** £300,000 (Year 1)
- **Annual impact:** £1.1M
- **ROI:** 267% (Year 1), 420% (3-year average)
- **Payback period:** 4 months

### Healthcare - Diagnostic Assistance
- **Investment:** £750,000 (Year 1)
- **Annual impact:** £2.8M
- **ROI:** 273% (Year 1), 450% (3-year average)
- **Payback period:** 4 months

## The ROI Calculator Framework

### Step 1: Identify Value Drivers
- List all processes AI will impact
- Estimate current costs/metrics
- Project improvements (be conservative)

### Step 2: Calculate Benefits
- Direct savings: £_______
- Productivity gains: £_______
- Revenue impact: £_______
- Risk reduction: £_______
- **Total annual benefit: £_______**

### Step 3: Calculate Total Costs
- Year 1 costs: £_______
- Annual recurring: £_______
- Hidden costs: £_______
- **Total 3-year cost: £_______**

### Step 4: Compute ROI
- Year 1 ROI: _____%
- 3-year average ROI: _____%
- Payback period: ____ months
- NPV (10% discount): £_______

## Sensitivity Analysis

### Best Case (130% of base)
- Assumes optimal adoption
- All integrations work smoothly
- Higher than expected improvements

### Base Case (100%)
- Realistic expectations
- Normal adoption curve
- Some implementation challenges

### Worst Case (70% of base)
- Slow adoption
- Integration challenges
- Lower improvements

## Making the Business Case

### The Executive Presentation

**Slide 1: The Problem**
- Current state costs
- Competitive disadvantage
- Risk exposure

**Slide 2: The Solution**
- AI capabilities
- Specific use cases
- Implementation approach

**Slide 3: The Value**
- ROI calculation
- Payback period
- Risk mitigation

**Slide 4: The Plan**
- Pilot approach
- Timeline
- Success metrics

**Slide 5: The Ask**
- Investment required
- Resources needed
- Decision timeline

## Common ROI Pitfalls

### Overestimating Benefits
- Use conservative estimates
- Phase benefits over time
- Account for adoption curve

### Underestimating Costs
- Include all hidden costs
- Budget for overruns
- Plan for ongoing optimization

### Ignoring Time Value
- Use NPV for multi-year projects
- Consider opportunity cost
- Account for inflation

## The ROI Checklist

Before presenting your business case, ensure you have:

☐ Identified all cost components
☐ Validated benefit assumptions
☐ Included change management costs
☐ Performed sensitivity analysis
☐ Calculated payback period
☐ Considered alternative investments
☐ Aligned with strategic priorities
☐ Secured stakeholder buy-in
☐ Defined success metrics
☐ Planned for measurement

## Beyond Financial ROI

### Strategic Value (Not in ROI but Important)
- Competitive differentiation
- Market positioning
- Innovation capability
- Talent attraction
- Future optionality

### Operational Value
- Process standardization
- Quality improvement
- Scale enablement
- Knowledge capture
- Agility increase

## Your ROI Action Plan

### Week 1: Baseline
- Document current costs
- Identify improvement areas
- Gather benchmark data

### Week 2: Projection
- Model improvements
- Calculate benefits
- Estimate costs

### Week 3: Validation
- Stress test assumptions
- Perform sensitivity analysis
- Review with finance

### Week 4: Presentation
- Build business case
- Secure sponsorship
- Get approval

## The Bottom Line

AI ROI is real and measurable, but it requires rigorous analysis. Use this framework to build a bulletproof business case that will stand up to CFO scrutiny.

**Need help building your ROI case?** Download our comprehensive AI ROI Calculator spreadsheet, complete with templates, formulas, and industry benchmarks.

Remember: The question isn't whether AI has ROI, but whether you're calculating it correctly.
    `,
    author: {
      name: "Austin Mander",
      role: "AI Consultant & Founder"
    },
    category: "Strategy",
    tags: ["ROI", "Business Case", "Financial Planning", "AI Investment"],
    publishedAt: "2024-09-28",
    readingTime: 10,
    featured: false
  }
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

export function getCategories(): string[] {
  return Array.from(new Set(blogPosts.map(post => post.category)));
}

export function getTags(): string[] {
  const allTags = blogPosts.flatMap(post => post.tags);
  return Array.from(new Set(allTags));
}