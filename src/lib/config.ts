export const siteConfig = {
  name: "Austin Mander",
  title: "Austin Mander — AI Consultant & Product Creator",
  description:
    "I help organisations use AI to save leaders time, reduce risk, and deliver predictable change. Founder of Change Radar — predictive intelligence for transformation.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://austinmander.com",
  ogImage: "https://austinmander.com/og-image.png",
  links: {
    linkedin: "https://linkedin.com/in/austinmander",
    github: "https://github.com/austinmander",
    email: "austin@austinmander.com",
  },
  pricing: {
    hourlyRate: Number(process.env.NEXT_PUBLIC_HOURLY_RATE) || 300,
    pilotPrice: Number(process.env.NEXT_PUBLIC_PILOT_PRICE) || 15000,
  },
  features: {
    sowGenerator: process.env.ENABLE_SOW_GENERATOR === "true",
    roiCalculator: process.env.ENABLE_ROI_CALCULATOR === "true",
    booking: process.env.ENABLE_BOOKING === "true",
  },
  calendly: {
    url: "https://calendly.com/austinmander/discovery",
  },
};

export const heroContent = {
  headline: "Austin Mander — AI Consultant & Product Creator",
  subheadline:
    "I help organisations use AI to save leaders time, reduce risk, and deliver predictable change. Founder of Change Radar — predictive intelligence for transformation.",
  primaryCta: "Book 30-min discovery",
  secondaryCta: "Download pilot SOW",
  valueBullets: [
    "Time back for leaders — recover 8+ hours / week",
    "Predictive intelligence for program risk",
    "Explainable insights — no black boxes",
    "Consultancy + product = fast proof & long-term scale",
  ],
};

export const servicesContent = {
  headline: "Services",
  services: [
    {
      title: "AI Strategy & Playbooks",
      description: "Strategic guidance for AI adoption and implementation",
      price: "£300/hr",
    },
    {
      title: "Change Radar Pilot",
      description: "Predictive intelligence for your transformation program",
      price: "£15,000 fixed",
    },
    {
      title: "AI Product Development",
      description: "Custom AI-assisted tool development for your organization",
      price: "Engagement on request",
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