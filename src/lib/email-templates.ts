// Email template system for different user journeys and nurture sequences

export interface EmailTemplate {
  subject: string;
  html: string;
  preheader?: string;
}

export interface UserSegment {
  type: 'quickwin_lead' | 'resource_downloader' | 'calculator_user' | 'newsletter_subscriber' | 'demo_requester';
  email: string;
  name?: string;
  company?: string;
  industry?: string;
  leadScore?: number;
  source?: string;
}

// Base email layout wrapper
const emailLayout = (content: string, unsubscribeEmail?: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Austin Mander - AI Consultant</title>
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 40px; text-align: center;">
      <h1 style="color: #10b981; margin: 0; font-size: 24px; font-weight: bold;">
        Austin Mander
      </h1>
      <p style="color: #cbd5e1; margin: 5px 0 0 0; font-size: 14px;">
        AI Consultant • Change Radar Creator
      </p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px;">
      ${content}
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0;">
      <div style="text-align: center; margin-bottom: 20px;">
        <a href="https://austinmander.com" style="color: #10b981; text-decoration: none; margin: 0 15px;">Website</a>
        <a href="https://linkedin.com/in/austinmander" style="color: #10b981; text-decoration: none; margin: 0 15px;">LinkedIn</a>
        <a href="https://austinmander.com/change-radar" style="color: #10b981; text-decoration: none; margin: 0 15px;">Change Radar</a>
      </div>
      <p style="color: #6b7280; font-size: 12px; text-align: center; margin: 0; line-height: 1.5;">
        Austin Mander • AI Transformation Consultant<br>
        The consultant who built the solution.<br>
        ${unsubscribeEmail ? `<a href="https://austinmander.com/api/newsletter/unsubscribe?email=${encodeURIComponent(unsubscribeEmail)}" style="color: #6b7280;">Unsubscribe</a>` : ''}
      </p>
    </div>
  </div>
</body>
</html>
`;

// QuickWin Lead Nurture Sequence (5 emails over 2 weeks)
export const quickWinNurtureSequence = {
  day0: (user: UserSegment): EmailTemplate => ({
    subject: `Your £10k QuickWin proposal is being prepared, ${user.name || 'there'}`,
    preheader: "Timeline, deliverables, and Change Radar deployment details coming within 24 hours",
    html: emailLayout(`
      <h1 style="color: #0f172a; font-size: 28px; margin-bottom: 20px;">
        Your QuickWin Assessment is Underway
      </h1>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        I've received your transformation program details and I'm already seeing opportunities where Change Radar could surface hidden risks 3-8 weeks earlier.
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
        <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">Your £10k QuickWin Will Include:</h3>
        <ul style="color: #065f46; margin: 0; padding-left: 20px;">
          <li>2-week Change Radar pilot deployment</li>
          <li>Risk intelligence dashboard for your specific program</li>
          <li>Weekly risk reports with actionable insights</li>
          <li>30-day transformation intelligence roadmap</li>
          <li>ROI analysis based on your actual data</li>
        </ul>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        I'll send you a detailed proposal within 24 hours including specific timelines, deliverables, and pricing.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        In the meantime, here are some resources that might be helpful:
      </p>
      
      <div style="margin: 25px 0;">
        <a href="https://austinmander.com/case-studies/financial-services-transformation" style="display: block; padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; text-decoration: none; color: #374151; margin-bottom: 10px;">
          <strong style="color: #10b981;">Case Study:</strong> How HSBC reduced transformation risks by 60% in 8 weeks
        </a>
        <a href="https://austinmander.com/resources/roi-calculator" style="display: block; padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; text-decoration: none; color: #374151;">
          <strong style="color: #10b981;">Calculator:</strong> See potential ROI for your organization
        </a>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Questions before the proposal? Just reply to this email.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  }),

  day2: (user: UserSegment): EmailTemplate => ({
    subject: "The hidden cost most transformation leaders miss",
    preheader: "Plus your QuickWin proposal (if you haven't seen it yet)",
    html: emailLayout(`
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Yesterday I sent your detailed £10k QuickWin proposal. If you haven't had a chance to review it yet, 
        it's sitting in your inbox with specific timelines and deliverables for your transformation program.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        But I wanted to share something I've learned from 100+ transformation programs...
      </p>
      
      <h2 style="color: #0f172a; font-size: 24px; margin: 30px 0 20px 0;">
        The Hidden Cost Most Leaders Miss
      </h2>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Everyone budgets for technology, implementation, and training. But the biggest cost isn't in the budget at all:
      </p>
      
      <div style="background: #fef3c7; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
        <p style="color: #78350f; margin: 0; font-size: 18px; font-weight: 600;">
          "Leadership attention debt"
        </p>
        <p style="color: #92400e; margin: 10px 0 0 0; font-size: 16px;">
          Every week spent firefighting issues instead of steering strategy costs your organization exponentially more than any software license.
        </p>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        This is why Change Radar focuses on surfacing risks 3-8 weeks earlier. It's not about the technology—it's about giving you back your most valuable resource: focused leadership time.
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0; text-align: center;">
        <p style="color: #065f46; margin: 0 0 15px 0; font-size: 16px;">
          Ready to reclaim your leadership time?
        </p>
        <a href="https://austinmander.com/book" style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600;">
          Schedule QuickWin Discussion
        </a>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  }),

  day5: (user: UserSegment): EmailTemplate => ({
    subject: "Why 70% of transformation programs fail (and how to be in the 30%)",
    preheader: "The pattern I've seen in 100+ programs",
    html: emailLayout(`
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        ${user.name || 'Hi there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        After working on 100+ transformation programs, I've seen a clear pattern in what separates the successful 30% from the struggling 70%.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        It's not budget, technology choice, or even team capability.
      </p>
      
      <h2 style="color: #0f172a; font-size: 24px; margin: 30px 0 20px 0;">
        The Difference is Intelligence
      </h2>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Successful transformations have one thing in common: leadership sees problems coming weeks before they become critical.
      </p>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #0f172a; margin: 0 0 15px 0;">The Failed 70%:</h3>
        <ul style="color: #6b7280; margin: 0; padding-left: 20px;">
          <li>React to issues after they surface</li>
          <li>Rely on status meetings for visibility</li>
          <li>Discover risks when it's too late to course-correct</li>
          <li>Spend leadership time firefighting, not steering</li>
        </ul>
        
        <h3 style="color: #0f172a; margin: 20px 0 15px 0;">The Successful 30%:</h3>
        <ul style="color: #10b981; margin: 0; padding-left: 20px;">
          <li>Spot risks 3-8 weeks before they become problems</li>
          <li>Use predictive intelligence to steer decisions</li>
          <li>Focus leadership time on strategy, not firefighting</li>
          <li>Course-correct while there's still time</li>
        </ul>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        This is why I built Change Radar. Not as another dashboard, but as transformation intelligence that gives you the foresight that separates successful programs from struggling ones.
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0; text-align: center;">
        <p style="color: #065f46; margin: 0 0 15px 0; font-size: 16px;">
          Want to be in the successful 30%?
        </p>
        <a href="https://austinmander.com/demo" style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-right: 10px;">
          See Change Radar Demo
        </a>
        <a href="https://austinmander.com/book" style="display: inline-block; background: white; color: #10b981; border: 2px solid #10b981; padding: 10px 28px; border-radius: 6px; text-decoration: none; font-weight: 600;">
          Get Your QuickWin
        </a>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  }),

  day9: (user: UserSegment): EmailTemplate => ({
    subject: "Still deciding on the QuickWin? Here's what others found...",
    preheader: "Real results from similar transformation programs",
    html: emailLayout(`
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        I know transformation intelligence might be new territory. "Will this actually work for our specific situation?"
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Let me share what other leaders discovered in their first 2 weeks with Change Radar:
      </p>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <div style="border-left: 4px solid #10b981; padding-left: 20px; margin-bottom: 25px;">
          <p style="color: #374151; font-style: italic; margin: 0 0 10px 0;">
            "We identified a critical dependency risk 6 weeks before our original timeline would have caught it. That early warning saved us 3 months of delays."
          </p>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            — Sarah K., Transformation Director, Global Bank
          </p>
        </div>
        
        <div style="border-left: 4px solid #10b981; padding-left: 20px; margin-bottom: 25px;">
          <p style="color: #374151; font-style: italic; margin: 0 0 10px 0;">
            "The risk intelligence gave us confidence to accelerate our rollout. We went live 4 weeks ahead of schedule because we could see exactly what was ready."
          </p>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            — Michael R., CTO, FinTech Scale-up
          </p>
        </div>
        
        <div style="border-left: 4px solid #10b981; padding-left: 20px;">
          <p style="color: #374151; font-style: italic; margin: 0 0 10px 0;">
            "Best £10k we've ever spent. The insights from week 1 alone justified the entire investment."
          </p>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            — James L., Head of Digital, Insurance Company
          </p>
        </div>
      </div>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        Common Pattern: Week 1 Discovery
      </h3>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Almost every QuickWin reveals something critical in the first week. Not because programs are badly managed, but because traditional status reporting has blind spots that predictive intelligence illuminates.
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0; text-align: center;">
        <p style="color: #065f46; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
          Ready to see what your program reveals?
        </p>
        <p style="color: #065f46; margin: 0 0 20px 0; font-size: 14px;">
          £10k fixed price • 2 weeks • Immediate insights
        </p>
        <a href="https://austinmander.com/book" style="display: inline-block; background: #10b981; color: white; padding: 15px 40px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
          Start Your QuickWin
        </a>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
      
      <p style="color: #6b7280; font-size: 14px; line-height: 1.4;">
        P.S. If the £10k QuickWin isn't right for your current situation, just reply and let me know what would be most helpful. I'm here to support your transformation success, not just sell consulting.
      </p>
    `, user.email)
  }),

  day14: (user: UserSegment): EmailTemplate => ({
    subject: "Final thought on your transformation intelligence...",
    preheader: "Why most leaders wish they'd started sooner",
    html: emailLayout(`
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        ${user.name || 'Hi there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        This is my final email about the £10k QuickWin opportunity we discussed.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        I've been thinking about something one of my clients said last month:
      </p>
      
      <div style="background: #fef3c7; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
        <p style="color: #78350f; font-style: italic; margin: 0; font-size: 18px;">
          "I wish we'd started with transformation intelligence 6 months ago. We spent so much energy on problems we could have prevented."
        </p>
        <p style="color: #92400e; margin: 10px 0 0 0; font-size: 14px;">
          — Helen M., Digital Transformation Lead
        </p>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Here's what I've learned: Every week you wait to add predictive intelligence to your transformation program is a week you're operating with preventable blind spots.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Not because your program is wrong, but because traditional reporting tells you where you've been, not where risks are forming.
      </p>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        Two Paths Forward
      </h3>
      
      <div style="display: flex; gap: 20px; margin: 25px 0;">
        <div style="flex: 1; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h4 style="color: #6b7280; margin: 0 0 10px 0; font-size: 16px;">
            Path 1: Continue as usual
          </h4>
          <ul style="color: #6b7280; font-size: 14px; margin: 0; padding-left: 15px;">
            <li>React to issues as they surface</li>
            <li>Hope status meetings catch risks early</li>
            <li>Spend leadership time firefighting</li>
          </ul>
        </div>
        
        <div style="flex: 1; background: #ecfdf5; padding: 20px; border-radius: 8px; border: 1px solid #10b981;">
          <h4 style="color: #065f46; margin: 0 0 10px 0; font-size: 16px;">
            Path 2: Add intelligence
          </h4>
          <ul style="color: #065f46; font-size: 14px; margin: 0; padding-left: 15px;">
            <li>Surface risks 3-8 weeks early</li>
            <li>Steer with predictive insights</li>
            <li>Focus on strategy, not firefighting</li>
          </ul>
        </div>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        The QuickWin is designed to prove the value of Path 2 in just 2 weeks, with minimal investment.
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0; text-align: center;">
        <p style="color: #065f46; margin: 0 0 20px 0; font-size: 16px;">
          Still interested in transformation intelligence for your program?
        </p>
        <a href="https://austinmander.com/book" style="display: inline-block; background: #10b981; color: white; padding: 15px 40px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; margin-bottom: 15px;">
          Let's Discuss Your QuickWin
        </a>
        <p style="color: #065f46; margin: 0; font-size: 14px;">
          Or simply reply to share what's most challenging about your current transformation.
        </p>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Either way, I hope your transformation succeeds brilliantly.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  })
};

// Resource Downloader Nurture Sequence (3 emails over 1 week)
export const resourceDownloaderSequence = {
  day0: (user: UserSegment, resourceName: string): EmailTemplate => ({
    subject: `Your ${resourceName} is ready + implementation tips`,
    preheader: "Download link and practical next steps inside",
    html: emailLayout(`
      <h1 style="color: #0f172a; font-size: 28px; margin-bottom: 20px;">
        Your ${resourceName} is Ready
      </h1>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0; text-align: center;">
        <h3 style="color: #065f46; margin: 0 0 15px 0;">Download Your Resource</h3>
        <a href="https://austinmander.com/resources/${resourceName.toLowerCase().replace(/\s+/g, '-')}-download" style="display: inline-block; background: #10b981; color: white; padding: 15px 30px; border-radius: 6px; text-decoration: none; font-weight: 600;">
          Download ${resourceName}
        </a>
      </div>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        How to Get Maximum Value
      </h3>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <p style="color: #374151; margin: 0 0 15px 0; font-weight: 600;">
          Pro tip from 100+ implementations:
        </p>
        <p style="color: #374151; margin: 0; line-height: 1.6;">
          Don't just read the resource—adapt it to your specific context. The frameworks work best when customized to your industry, company size, and transformation maturity.
        </p>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Questions about implementation? I'm here to help. Just reply to this email.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  }),

  day3: (user: UserSegment): EmailTemplate => ({
    subject: "Making progress with the resource?",
    preheader: "Implementation insights from similar organizations",
    html: emailLayout(`
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        How are you finding the resource? I'm always curious to hear how organizations adapt the frameworks to their specific context.
      </p>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        Common Implementation Questions
      </h3>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <div style="margin-bottom: 20px;">
          <h4 style="color: #374151; margin: 0 0 8px 0; font-size: 16px;">
            "How do I adapt this for our industry?"
          </h4>
          <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">
            Focus on the underlying principles rather than specific tactics. The risk patterns are universal, but manifestation varies by industry.
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h4 style="color: #374151; margin: 0 0 8px 0; font-size: 16px;">
            "What if we don't have the full tech stack mentioned?"
          </h4>
          <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">
            Start with manual processes. Intelligence beats automation every time. You can systematize later.
          </p>
        </div>
        
        <div>
          <h4 style="color: #374151; margin: 0 0 8px 0; font-size: 16px;">
            "How do I get leadership buy-in for this approach?"
          </h4>
          <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">
            Start small, prove value, scale up. A 2-week pilot beats a 6-month business case every time.
          </p>
        </div>
      </div>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
        <p style="color: #065f46; margin: 0 0 15px 0; font-size: 16px;">
          Need help implementing? I offer £10k QuickWin pilots that prove the value in 2 weeks.
        </p>
        <a href="https://austinmander.com/book" style="color: #10b981; text-decoration: none; font-weight: 600;">
          Learn about QuickWin pilot →
        </a>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Any specific questions about your implementation? Just reply—I read every email.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  }),

  day7: (user: UserSegment): EmailTemplate => ({
    subject: "One week later: how's the implementation going?",
    preheader: "Plus a resource that might help with your next steps",
    html: emailLayout(`
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        It's been a week since you downloaded the resource. How's the implementation going?
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Whether you're making great progress or hitting roadblocks, that's completely normal. Transformation intelligence is a new discipline, and every organization finds their own path.
      </p>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        Related Resource That Might Help
      </h3>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 25px 0;">
        <h4 style="color: #374151; margin: 0 0 10px 0;">
          <a href="https://austinmander.com/resources/roi-calculator" style="color: #10b981; text-decoration: none;">
            AI Transformation ROI Calculator
          </a>
        </h4>
        <p style="color: #6b7280; margin: 0; line-height: 1.5;">
          Calculate the potential ROI of transformation intelligence for your specific organization. Includes 3-year projections and board-ready outputs.
        </p>
      </div>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
        <h4 style="color: #065f46; margin: 0 0 15px 0;">
          Want to Fast-Track Your Implementation?
        </h4>
        <p style="color: #065f46; margin: 0 0 15px 0; line-height: 1.6;">
          I help organizations implement transformation intelligence through 2-week QuickWin pilots. You get immediate insights while building internal capability.
        </p>
        <a href="https://austinmander.com/book" style="color: #10b981; text-decoration: none; font-weight: 600;">
          Learn about QuickWin pilots →
        </a>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Whatever path you choose, I'm rooting for your transformation success.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  })
};

// Newsletter Welcome Series (3 emails over 1 week)
export const newsletterWelcomeSequence = {
  day0: (user: UserSegment): EmailTemplate => ({
    subject: `Welcome to 5,000+ transformation leaders, ${user.name || 'there'}!`,
    preheader: "Your weekly transformation intelligence starts now",
    html: emailLayout(`
      <h1 style="color: #0f172a; font-size: 28px; margin-bottom: 20px;">
        Welcome to the Community!
      </h1>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Welcome to 5,000+ transformation leaders who receive weekly insights on AI transformation and change management.
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
        <h3 style="color: #065f46; margin: 0 0 15px 0;">What to Expect Every Tuesday:</h3>
        <ul style="color: #065f46; margin: 0; padding-left: 20px;">
          <li>One transformation intelligence insight (2-minute read)</li>
          <li>Real case study from my consulting practice</li>
          <li>Tool or framework you can use immediately</li>
          <li>Early access to new resources and tools</li>
        </ul>
      </div>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        Start with These Popular Resources
      </h3>
      
      <div style="margin: 25px 0;">
        <a href="https://austinmander.com/resources/roi-calculator" style="display: block; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #374151; margin-bottom: 15px;">
          <strong style="color: #10b981; font-size: 16px;">AI ROI Calculator</strong>
          <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">Calculate potential ROI for your transformation program</p>
        </a>
        
        <a href="https://austinmander.com/blog/building-change-radar" style="display: block; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #374151; margin-bottom: 15px;">
          <strong style="color: #10b981; font-size: 16px;">How I Built Change Radar</strong>
          <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">The story of building transformation intelligence for scale</p>
        </a>
        
        <a href="https://austinmander.com/case-studies" style="display: block; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #374151;">
          <strong style="color: #10b981; font-size: 16px;">Transformation Case Studies</strong>
          <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">Real results from similar organizations</p>
        </a>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Your first newsletter arrives this Tuesday. Until then, explore the resources above and don't hesitate to reply with any questions about your transformation program.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  }),

  day3: (user: UserSegment): EmailTemplate => ({
    subject: "Your first transformation intelligence insight",
    preheader: "Why 80% of AI pilots fail (and how to be in the 20%)",
    html: emailLayout(`
      <h1 style="color: #0f172a; font-size: 28px; margin-bottom: 20px;">
        Tuesday Transformation Intelligence
      </h1>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        This is your first weekly transformation intelligence insight. Today's topic: why 80% of AI pilots fail to scale.
      </p>
      
      <h2 style="color: #0f172a; font-size: 24px; margin: 30px 0 20px 0;">
        The 80/20 Split
      </h2>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        After consulting on 100+ AI transformations, I've seen a clear pattern:
      </p>
      
      <div style="background: #fef3c7; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
        <p style="color: #78350f; margin: 0; font-size: 18px; font-weight: 600;">
          80% of pilots succeed technically but fail to scale organizationally
        </p>
        <p style="color: #92400e; margin: 10px 0 0 0; font-size: 16px;">
          The technology works. The organization doesn't adapt.
        </p>
      </div>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        What the Successful 20% Do Differently
      </h3>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <ul style="color: #065f46; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li><strong>Design for intelligence, not just automation</strong> - They build systems that make humans smarter, not just faster</li>
          <li><strong>Start with change management, not technology</strong> - They solve the people challenge before the tech challenge</li>
          <li><strong>Measure transformation, not just performance</strong> - They track how work changes, not just how much work gets done</li>
        </ul>
      </div>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        This Week's Action Item
      </h3>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 25px 0;">
        <p style="color: #374151; margin: 0; line-height: 1.6;">
          <strong>Audit your current AI pilots:</strong> Are you measuring technical performance or organizational transformation? The successful 20% track both.
        </p>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        That's this week's insight. Next Tuesday: "The hidden cost of transformation delays (and how to surface risks 6 weeks earlier)."
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  }),

  day7: (user: UserSegment): EmailTemplate => ({
    subject: "How to get your AI pilot from proof-of-concept to production",
    preheader: "The scaling framework that works for 90% of successful transformations",
    html: emailLayout(`
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Last week I shared why 80% of AI pilots fail to scale. This week: the framework the successful 20% use to go from pilot to production.
      </p>
      
      <h2 style="color: #0f172a; font-size: 24px; margin: 30px 0 20px 0;">
        The Scaling Bridge Framework
      </h2>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Every successful scaling follows the same pattern:
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <div style="margin-bottom: 20px;">
          <h4 style="color: #065f46; margin: 0 0 8px 0; font-size: 16px;">
            Phase 1: Technical Proof (2-4 weeks)
          </h4>
          <p style="color: #065f46; margin: 0; font-size: 14px; line-height: 1.5;">
            Prove the technology works in isolation. Focus: Can we build it?
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h4 style="color: #065f46; margin: 0 0 8px 0; font-size: 16px;">
            Phase 2: Organizational Proof (4-8 weeks)
          </h4>
          <p style="color: #065f46; margin: 0; font-size: 14px; line-height: 1.5;">
            Prove humans can adapt to the technology. Focus: Will people use it?
          </p>
        </div>
        
        <div>
          <h4 style="color: #065f46; margin: 0 0 8px 0; font-size: 16px;">
            Phase 3: Scale Proof (8-12 weeks)
          </h4>
          <p style="color: #065f46; margin: 0; font-size: 14px; line-height: 1.5;">
            Prove the organization can scale the change. Focus: Can we grow it?
          </p>
        </div>
      </div>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        The Critical Insight
      </h3>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Most organizations stop after Phase 1. They prove the technology works and assume scaling is just "more of the same."
      </p>
      
      <div style="background: #fef3c7; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
        <p style="color: #78350f; margin: 0; font-size: 16px; font-weight: 600;">
          Phase 2 and 3 are completely different challenges requiring different skills, different metrics, and different timelines.
        </p>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        This is why Change Radar focuses on transformation intelligence, not just AI deployment. You need to see how the organization is adapting, not just how the technology is performing.
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
        <h4 style="color: #065f46; margin: 0 0 15px 0;">
          Want to see this in action?
        </h4>
        <p style="color: #065f46; margin: 0 0 15px 0; line-height: 1.6;">
          I help organizations implement this framework through £10k QuickWin pilots. You get immediate transformation intelligence while building scaling capability.
        </p>
        <a href="https://austinmander.com/book" style="color: #10b981; text-decoration: none; font-weight: 600;">
          Learn about QuickWin pilots →
        </a>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Next week: "The three metrics that predict transformation success (hint: none are technical)."
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  })
};

// Demo Requester Follow-up Sequence (2 emails over 1 week)
export const demoFollowupSequence = {
  day0: (user: UserSegment): EmailTemplate => ({
    subject: "Your Change Radar demo access + setup guide",
    preheader: "Live demo environment ready - see transformation intelligence in action",
    html: emailLayout(`
      <h1 style="color: #0f172a; font-size: 28px; margin-bottom: 20px;">
        Your Change Radar Demo is Ready
      </h1>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Your personal Change Radar demo environment is ready. This is the same transformation intelligence platform I use with clients like HSBC and Santander.
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0; text-align: center;">
        <h3 style="color: #065f46; margin: 0 0 15px 0;">Access Your Demo</h3>
        <a href="https://austinmander.com/demo/change-radar-live" style="display: inline-block; background: #10b981; color: white; padding: 15px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-bottom: 10px;">
          Launch Change Radar Demo
        </a>
        <p style="color: #065f46; margin: 0; font-size: 14px;">
          Demo credentials: demo@austinmander.com / ChangeRadar2024
        </p>
      </div>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        What You'll See in the Demo
      </h3>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li><strong>Risk Intelligence Dashboard</strong> - Real-time visualization of transformation risks across your entire program</li>
          <li><strong>Predictive Analytics</strong> - See how risks are trending 3-8 weeks before they become critical</li>
          <li><strong>Stakeholder Sentiment Analysis</strong> - Track engagement and resistance patterns across teams</li>
          <li><strong>Automated Reporting</strong> - Weekly risk summaries with actionable insights</li>
          <li><strong>Intervention Recommendations</strong> - Specific actions to mitigate identified risks</li>
        </ul>
      </div>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        Demo Walkthrough Guide (10 minutes)
      </h3>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <p style="color: #065f46; margin: 0 0 15px 0; font-weight: 600;">
          Follow this sequence for maximum impact:
        </p>
        <ol style="color: #065f46; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>Start with the Executive Dashboard - see the high-level risk overview</li>
          <li>Drill into the "Critical Risks" section - explore specific risk patterns</li>
          <li>Check the "Sentiment Analysis" tab - see how teams are responding to change</li>
          <li>Review "Weekly Reports" - see the automated insights your team would receive</li>
          <li>Explore "Intervention Recommendations" - see specific action suggestions</li>
        </ol>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        The demo uses anonymized data from a real financial services transformation. Pay attention to how early the system flagged risks that traditional status reports missed entirely.
      </p>
      
      <div style="background: #fef3c7; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
        <p style="color: #78350f; margin: 0 0 10px 0; font-weight: 600;">
          Questions while exploring?
        </p>
        <p style="color: #92400e; margin: 0; line-height: 1.6;">
          Just reply to this email or book a 15-minute call to discuss how Change Radar would work for your specific transformation program.
        </p>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  }),

  day3: (user: UserSegment): EmailTemplate => ({
    subject: "How did the Change Radar demo look?",
    preheader: "Plus the story behind the risk patterns you saw",
    html: emailLayout(`
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${user.name || 'there'},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        I hope you had a chance to explore the Change Radar demo. What did you think of the risk intelligence dashboard?
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        The data you saw came from a real financial services transformation where Change Radar identified critical risks 6 weeks before they would have surfaced through traditional reporting.
      </p>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        The Story Behind the Demo Data
      </h3>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <p style="color: #374151; margin: 0 0 15px 0;">
          <strong>Week 3:</strong> Change Radar flagged declining stakeholder sentiment in the London office
        </p>
        <p style="color: #374151; margin: 0 0 15px 0;">
          <strong>Week 6:</strong> Predictive analytics showed this would cascade to project delays
        </p>
        <p style="color: #374151; margin: 0 0 15px 0;">
          <strong>Week 9:</strong> Traditional status reports finally caught the issue - but it was too late to prevent delays
        </p>
        <p style="color: #374151; margin: 0; font-weight: 600;">
          <strong>Result:</strong> Early intervention saved 3 months of delays and £2.5M in costs
        </p>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        This is the power of transformation intelligence: seeing patterns before they become problems.
      </p>
      
      <h3 style="color: #0f172a; font-size: 20px; margin: 30px 0 15px 0;">
        How This Would Work for Your Program
      </h3>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
        <p style="color: #065f46; margin: 0 0 15px 0; line-height: 1.6;">
          I customize Change Radar for each organization's specific context: your industry, transformation type, stakeholder groups, and risk patterns.
        </p>
        <p style="color: #065f46; margin: 0 0 15px 0; line-height: 1.6;">
          Most clients start with a £10k QuickWin pilot: 2 weeks of Change Radar deployment that proves the value and builds internal capability.
        </p>
        <a href="https://austinmander.com/book" style="color: #10b981; text-decoration: none; font-weight: 600;">
          Discuss your QuickWin pilot →
        </a>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Any questions about what you saw in the demo? Just reply to this email.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin
      </p>
    `, user.email)
  })
};

// Function to send nurture sequence emails
export async function sendNurtureEmail(
  sequenceType: 'quickwin' | 'resource' | 'newsletter' | 'demo',
  day: number,
  user: UserSegment,
  additionalData?: any
): Promise<EmailTemplate> {
  switch (sequenceType) {
    case 'quickwin':
      switch (day) {
        case 0: return quickWinNurtureSequence.day0(user);
        case 2: return quickWinNurtureSequence.day2(user);
        case 5: return quickWinNurtureSequence.day5(user);
        case 9: return quickWinNurtureSequence.day9(user);
        case 14: return quickWinNurtureSequence.day14(user);
        default: throw new Error(`Invalid day ${day} for quickwin sequence`);
      }
    
    case 'resource':
      switch (day) {
        case 0: return resourceDownloaderSequence.day0(user, additionalData?.resourceName || 'Resource');
        case 3: return resourceDownloaderSequence.day3(user);
        case 7: return resourceDownloaderSequence.day7(user);
        default: throw new Error(`Invalid day ${day} for resource sequence`);
      }
    
    case 'newsletter':
      switch (day) {
        case 0: return newsletterWelcomeSequence.day0(user);
        case 3: return newsletterWelcomeSequence.day3(user);
        case 7: return newsletterWelcomeSequence.day7(user);
        default: throw new Error(`Invalid day ${day} for newsletter sequence`);
      }
    
    case 'demo':
      switch (day) {
        case 0: return demoFollowupSequence.day0(user);
        case 3: return demoFollowupSequence.day3(user);
        default: throw new Error(`Invalid day ${day} for demo sequence`);
      }
    
    default:
      throw new Error(`Invalid sequence type: ${sequenceType}`);
  }
}