import { publicEnv } from './env';

export const siteConfig = {
  name: "Austin Mander",
  title: "Austin Mander — Stop Guessing. Start Steering.",
  description:
    "I help transformation leaders surface hidden risks 3–8 weeks earlier and recover leadership hours with Change Radar. The AI consultant who built the solution.",
  url: publicEnv.siteUrl,
  ogImage: `${publicEnv.siteUrl}/og-image.png`,
  links: {
    linkedin: "https://linkedin.com/in/austinmander",
    github: "https://github.com/austinmander",
    email: "austin@austinmander.com",
  },
  pricing: {
    hourlyRate: publicEnv.hourlyRate,
    pilotPrice: publicEnv.pilotPrice,
  },
  features: publicEnv.features,
  calendly: {
    url: "https://calendly.com/austinmander/discovery",
  },
};

export const heroContent = {
  headline: "Stop Guessing. Start Steering.",
  subheadline:
    "I help transformation leaders surface hidden risks 3–8 weeks earlier and recover leadership hours with Change Radar — AI-driven intelligence delivered in a 2-week proof.",
  primaryCta: "Get £10k QuickWin",
  secondaryCta: "See Change Radar Demo",
  valueBullets: [
    "Surface risks 3-8 weeks before they hit",
    "Recover 8+ leadership hours per week",
    "2-week proof of concept delivery",
    "Built the solution, not just the strategy",
  ],
};

export const servicesContent = {
  headline: "Three Ways to Work Together",
  services: [
    {
      title: "Change Radar QuickWin™",
      description: "2-week proof of concept with immediate risk intelligence",
      price: "£10,000 fixed",
    },
    {
      title: "Full Implementation",
      description: "Complete transformation intelligence platform deployment",
      price: "£45k - £120k",
    },
    {
      title: "Strategic Retainer",
      description: "Ongoing advisory with continuous product evolution",
      price: "£7k - £20k/month",
    },
  ],
};

export const changeRadarFeatures = [
  "Real-time risk prediction across all programs",
  "Natural language insights - no complex dashboards",
  "Integration with existing PM tools (Jira, Monday, etc.)",
  "Weekly leadership summaries with actionable recommendations",
  "Historical pattern analysis for better planning",
];

export const caseStudyMetrics = {
  timeSaved: "7 hours/week per leader",
  decisionSpeed: "30% faster decisions",
  riskReduction: "45% fewer program delays",
  roiMultiple: "3.2x ROI in 6 months",
};