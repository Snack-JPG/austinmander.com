export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  duration: string;
  services: string[];
  image?: string;
  featured: boolean;
  publishedAt: string;
  fullContent: {
    background: string;
    challenge: string;
    approach: string;
    implementation: string;
    results: string;
    keyLearnings: string[];
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "global-bank-transformation",
    title: "Global Bank Reduces Project Overruns by 62%",
    client: "Global Investment Bank",
    industry: "Financial Services",
    challenge: "Managing 47 concurrent transformation programs with £2.3B at risk",
    solution: "Deployed Change Radar across entire portfolio to predict and prevent failures",
    results: [
      {
        metric: "62%",
        value: "62%",
        description: "Reduction in project overruns"
      },
      {
        metric: "£18M",
        value: "£18M",
        description: "Saved in 12 months"
      },
      {
        metric: "8 hours",
        value: "8 hours",
        description: "Weekly time saved per executive"
      },
      {
        metric: "94%",
        value: "94%",
        description: "On-time delivery rate"
      }
    ],
    testimonial: {
      quote: "Change Radar transformed how we manage our portfolio. We now see risks weeks in advance and can take corrective action before they impact delivery. It's been a game-changer for our transformation office.",
      author: "Sarah Mitchell",
      role: "Chief Transformation Officer"
    },
    duration: "12 months",
    services: ["Change Radar Enterprise", "Executive Advisory", "Custom Integration"],
    featured: true,
    publishedAt: "2024-10-15",
    fullContent: {
      background: "One of Europe's largest investment banks was managing 47 transformation programs simultaneously, with a combined budget of £2.3B. Their existing PMO processes were struggling to maintain visibility across the portfolio, resulting in frequent surprises, budget overruns, and delayed deliveries. Executive leadership was spending 40% of their time in status meetings, yet still lacked the predictive insights needed to prevent failures.",
      challenge: "The bank faced several critical challenges: \n\n1. **Lack of early warning signals** - Problems only surfaced when it was too late to prevent impact\n2. **Information overload** - Executives were drowning in reports but lacking actionable insights\n3. **Siloed programs** - No learning or pattern recognition across different transformations\n4. **Resource conflicts** - Unable to predict and prevent resource bottlenecks across programs\n5. **Stakeholder fatigue** - Teams spending more time reporting than delivering",
      approach: "We implemented a three-phase approach:\n\n**Phase 1: Discovery & Integration (Weeks 1-2)**\n- Integrated Change Radar with Jira, ServiceNow, and Microsoft Project\n- Analysed 3 years of historical program data\n- Configured custom risk models for financial services\n\n**Phase 2: Pilot & Refinement (Weeks 3-8)**\n- Started with 5 highest-risk programs\n- Weekly executive insights sessions\n- Refined prediction models based on bank's specific patterns\n\n**Phase 3: Full Deployment (Weeks 9-12)**\n- Rolled out across all 47 programs\n- Established automated reporting cadence\n- Trained 200+ project managers and executives",
      implementation: "The implementation focused on zero disruption to existing workflows. Change Radar seamlessly integrated with the bank's technology stack, automatically ingesting data from multiple sources. We configured custom dashboards for different stakeholder groups - from C-suite executives needing portfolio-level insights to project managers requiring tactical alerts. The AI models were trained on the bank's historical data, learning their unique risk patterns and cultural factors that impact delivery success.",
      results: "The impact exceeded all expectations:\n\n**Quantitative Results:**\n- 62% reduction in project overruns within 6 months\n- £18M saved through early risk intervention\n- 8 hours per week saved for each executive\n- 94% on-time delivery rate (up from 58%)\n- 73% reduction in emergency escalations\n\n**Qualitative Benefits:**\n- Transformed executive confidence in portfolio delivery\n- Created data-driven decision culture\n- Improved team morale through reduced firefighting\n- Enhanced regulatory compliance through better predictability\n- Strengthened vendor relationships through proactive issue resolution",
      keyLearnings: [
        "Early adoption by senior executives accelerated organisation-wide acceptance",
        "Starting with highest-risk programs demonstrated immediate value",
        "Integration with existing tools was critical for user adoption",
        "Weekly insight sessions created rhythm of proactive intervention",
        "Historical data analysis revealed surprising patterns previously invisible",
        "Customising models for financial services context improved accuracy by 40%"
      ]
    }
  },
  {
    id: "2",
    slug: "retail-chain-ai-transformation",
    title: "Retail Chain Saves £2.3M with AI-Powered Insights",
    client: "National Retail Chain",
    industry: "Retail",
    challenge: "Digital transformation across 500 stores with complex stakeholder landscape",
    solution: "AI strategy and Change Radar implementation for predictive program management",
    results: [
      {
        metric: "£2.3M",
        value: "£2.3M",
        description: "Saved in 6 months"
      },
      {
        metric: "45%",
        value: "45%",
        description: "Faster rollout across stores"
      },
      {
        metric: "87%",
        value: "87%",
        description: "Stakeholder satisfaction"
      },
      {
        metric: "3.8x",
        value: "3.8x",
        description: "ROI in first year"
      }
    ],
    testimonial: {
      quote: "Austin's approach was refreshingly practical. No buzzwords or complexity - just clear value delivered quickly. The combination of strategic guidance and Change Radar technology enabled us to achieve what seemed impossible.",
      author: "Michael Chen",
      role: "Head of Digital Transformation"
    },
    duration: "6 months",
    services: ["AI Strategy", "Change Radar Pilot", "Training & Enablement"],
    featured: true,
    publishedAt: "2024-09-20",
    fullContent: {
      background: "A leading UK retail chain with 500+ stores was undertaking a massive digital transformation to compete with online-first competitors. The program involved new POS systems, inventory management AI, customer analytics platforms, and omnichannel fulfillment capabilities. With hundreds of stakeholders across stores, regions, and head office, coordination was becoming impossible.",
      challenge: "The retailer faced unique sector challenges:\n\n1. **Geographic complexity** - Rolling out changes across 500 locations with varying local conditions\n2. **Change resistance** - Store managers skeptical of head office initiatives\n3. **Seasonal pressures** - Transformation competing with peak trading periods\n4. **Technical debt** - Legacy systems creating unexpected integration challenges\n5. **Skill gaps** - Store staff needing extensive retraining",
      approach: "We designed a retail-specific transformation approach:\n\n**Week 1-2: Rapid Assessment**\n- Analysed failed previous initiatives to identify patterns\n- Mapped stakeholder influence and resistance points\n- Prioritised quick wins for credibility\n\n**Week 3-6: Pilot Region**\n- Selected North West region (50 stores) for pilot\n- Deployed Change Radar for predictive insights\n- Created store manager champion network\n\n**Week 7-24: National Rollout**\n- Phased deployment based on risk predictions\n- Weekly regional leadership briefings\n- Real-time adjustment based on AI insights",
      implementation: "Implementation balanced technology with change management. Change Radar provided predictive insights about which stores would struggle, allowing proactive support. We created a 'Store Success Score' combining multiple factors - from manager engagement to local market conditions - predicting implementation success with 89% accuracy. This allowed the transformation team to focus resources where needed most, preventing failures before they occurred.",
      results: "The transformation exceeded targets:\n\n**Financial Impact:**\n- £2.3M saved through optimised rollout sequencing\n- 45% reduction in implementation time\n- 60% decrease in post-launch support costs\n- 3.8x ROI within first year\n\n**Operational Excellence:**\n- 87% first-time-right implementations\n- 91% store manager satisfaction\n- 50% reduction in help desk tickets\n- 100% on-time for Christmas trading\n\n**Strategic Outcomes:**\n- Successful foundation for future innovations\n- Created data-driven transformation culture\n- Built internal capability for continuous change\n- Strengthened competitive position",
      keyLearnings: [
        "Predicting store-level success factors was crucial for resource allocation",
        "Early engagement of skeptical store managers prevented later resistance",
        "Phased regional approach allowed continuous learning and refinement",
        "AI insights about seasonal impacts optimised rollout timing",
        "Creating visible quick wins built momentum across the organisation",
        "Combining technology with human change management multiplied impact"
      ]
    }
  },
  {
    id: "3",
    slug: "tech-startup-scaling",
    title: "Tech Startup Scales from 50 to 500 Employees with AI",
    client: "B2B SaaS Platform",
    industry: "Technology",
    challenge: "Scaling operations 10x while maintaining culture and delivery quality",
    solution: "AI-powered operational intelligence and automated scaling playbooks",
    results: [
      {
        metric: "10x",
        value: "10x",
        description: "Scaling achieved in 18 months"
      },
      {
        metric: "92%",
        value: "92%",
        description: "Employee satisfaction maintained"
      },
      {
        metric: "73%",
        value: "73%",
        description: "Reduction in operational costs"
      },
      {
        metric: "0",
        value: "0",
        description: "Major delivery failures during scaling"
      }
    ],
    testimonial: {
      quote: "Most consultants would have thrown people at our scaling challenges. Austin gave us AI systems that scaled infinitely. We grew 10x without losing what made us special.",
      author: "Emma Thompson",
      role: "Founder & CEO"
    },
    duration: "18 months",
    services: ["AI Product Development", "Change Radar", "Executive Advisory"],
    featured: true,
    publishedAt: "2024-08-10",
    fullContent: {
      background: "A rapidly growing B2B SaaS platform had just closed Series B funding and needed to scale from 50 to 500 employees in 18 months. The company had strong product-market fit but lacked the operational infrastructure to scale without losing their innovative culture and delivery quality. Previous attempts at implementing traditional enterprise processes had been rejected by the team.",
      challenge: "Scaling presented existential challenges:\n\n1. **Cultural dilution** - Risk of losing startup agility and innovation\n2. **Process overhead** - Need for structure without bureaucracy\n3. **Quality maintenance** - Scaling delivery without compromising standards\n4. **Knowledge transfer** - Onboarding 450 people without productivity loss\n5. **Decision bottlenecks** - Founders becoming blockers as organisation grew",
      approach: "We created an AI-first scaling strategy:\n\n**Month 1-3: Foundation**\n- Built AI-powered knowledge base from existing documentation\n- Created automated onboarding assistant\n- Developed predictive hiring success models\n\n**Month 4-9: Intelligent Operations**\n- Deployed Change Radar for engineering projects\n- Built custom AI tools for automated decision routing\n- Created culture monitoring dashboard\n\n**Month 10-18: Accelerated Scaling**\n- AI-assisted team formation based on skill matching\n- Predictive capacity planning\n- Automated operational intelligence",
      implementation: "Instead of traditional consulting, we built AI systems that learned and evolved with the company. The knowledge base AI ingested every document, Slack conversation, and decision, making institutional knowledge instantly accessible to new hires. Change Radar predicted engineering bottlenecks before they impacted customers. Custom AI tools automated routine decisions while escalating complex ones. This allowed the company to scale operations without scaling overhead.",
      results: "The scaling exceeded all benchmarks:\n\n**Growth Metrics:**\n- Successfully scaled from 50 to 500 employees\n- Maintained 92% employee satisfaction throughout\n- Achieved 73% reduction in operational cost per employee\n- Zero major delivery failures during hypergrowth\n\n**Operational Impact:**\n- 80% reduction in onboarding time\n- 65% decrease in meeting hours\n- 90% of routine decisions automated\n- 3x improvement in delivery velocity\n\n**Cultural Preservation:**\n- Innovation index increased 15%\n- Decision speed improved despite 10x size\n- Maintained startup agility at scale\n- Created sustainable growth foundation",
      keyLearnings: [
        "AI systems scale better than processes for hypergrowth companies",
        "Capturing knowledge continuously prevents brain drain during scaling",
        "Predictive insights prevent problems rather than solving them",
        "Cultural metrics are as important as operational ones",
        "Automation should enhance human decision-making, not replace it",
        "Starting AI implementation early compounds benefits during growth"
      ]
    }
  }
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter(study => study.featured);
}