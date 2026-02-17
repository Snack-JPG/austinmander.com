// Booking system with Calendly integration and smart recommendations

import { env, isEmailConfigured } from './env';
import { sendEmail } from './email';
import { logger } from './logger';

export interface BookingType {
  id: 'quickwin' | 'demo' | 'strategy' | 'implementation';
  name: string;
  duration: number; // minutes
  description: string;
  price?: string;
  calendlyUrl: string;
  targetAudience: string[];
  qualificationQuestions: BookingQuestion[];
  confirmationEmail: {
    subject: string;
    template: string;
  };
  prepMaterials: string[];
}

export interface BookingQuestion {
  id: string;
  type: 'text' | 'select' | 'textarea' | 'checkbox';
  question: string;
  options?: string[];
  required: boolean;
  helpText?: string;
}

export interface BookingRequest {
  bookingType: BookingType['id'];
  userEmail: string;
  userName: string;
  userCompany?: string;
  userRole?: string;
  userPhone?: string;
  responses: Record<string, string | string[]>;
  preferredTimes?: string[];
  source: string;
  leadScore?: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface BookingRecommendation {
  primaryBooking: BookingType['id'];
  alternativeBookings: BookingType['id'][];
  confidence: number;
  reasoning: string;
}

// Booking type definitions
export const BOOKING_TYPES: Record<BookingType['id'], BookingType> = {
  quickwin: {
    id: 'quickwin',
    name: '£10k QuickWin Consultation',
    duration: 30,
    description: 'Focused 30-minute session to design your transformation intelligence pilot. Walk away with a specific £10k QuickWin proposal.',
    price: '£10,000 pilot',
    calendlyUrl: `${env.CALENDLY_USER}/quickwin-consultation`,
    targetAudience: ['Transformation Leaders', 'CTOs', 'Programme Directors', 'Change Directors'],
    qualificationQuestions: [
      {
        id: 'transformation_type',
        type: 'select',
        question: 'What type of transformation are you leading?',
        options: ['Digital Transformation', 'AI Implementation', 'Agile Transformation', 'Cloud Migration', 'Business Process Re-engineering', 'Cultural Change', 'Other'],
        required: true
      },
      {
        id: 'program_size',
        type: 'select',
        question: 'What\'s the scope of your transformation program?',
        options: ['Department-level (10-50 people)', 'Division-level (50-200 people)', 'Enterprise-wide (200+ people)', 'Multi-company/Group-wide'],
        required: true
      },
      {
        id: 'timeline',
        type: 'select',
        question: 'What\'s your transformation timeline?',
        options: ['Already started (0-6 months in)', 'Starting soon (next 3 months)', 'Planning phase (3-6 months out)', 'Early exploration (6+ months out)'],
        required: true
      },
      {
        id: 'budget_authority',
        type: 'select',
        question: 'Do you have budget authority for pilot investments?',
        options: ['Yes, I can approve £10k pilots', 'Yes, with one approval level', 'Requires multiple approvals', 'Budget not yet confirmed'],
        required: true
      },
      {
        id: 'current_challenges',
        type: 'textarea',
        question: 'What\'s your biggest challenge with transformation visibility and risk management?',
        required: true,
        helpText: 'Be specific about what keeps you up at night regarding your program.'
      },
      {
        id: 'quickwin_outcome',
        type: 'textarea',
        question: 'What would make a £10k QuickWin pilot a huge success for you?',
        required: true,
        helpText: 'Think about specific outcomes, insights, or capabilities you need.'
      }
    ],
    confirmationEmail: {
      subject: 'Your £10k QuickWin consultation is confirmed',
      template: 'quickwin_confirmation'
    },
    prepMaterials: [
      'Current transformation program overview',
      'Key stakeholder map',
      'Main risk concerns and blind spots',
      'Success criteria for pilot phase'
    ]
  },

  demo: {
    id: 'demo',
    name: 'Change Radar Demo',
    duration: 30,
    description: 'See Change Radar in action with real transformation data. Understanding how transformation intelligence works in practice.',
    calendlyUrl: `${env.CALENDLY_USER}/change-radar-demo`,
    targetAudience: ['Technical Leaders', 'Product Managers', 'Analytics Teams', 'Innovation Directors'],
    qualificationQuestions: [
      {
        id: 'role_focus',
        type: 'select',
        question: 'What\'s your primary interest in Change Radar?',
        options: ['Understanding the technology', 'Evaluating for my organization', 'Learning about implementation', 'Competitive research', 'Academic interest'],
        required: true
      },
      {
        id: 'technical_background',
        type: 'select',
        question: 'What\'s your technical background?',
        options: ['Very technical (can implement)', 'Somewhat technical (can evaluate)', 'Business focused (need outcomes)', 'Non-technical (need concepts)'],
        required: true
      },
      {
        id: 'organization_stage',
        type: 'select',
        question: 'Where is your organization with transformation intelligence?',
        options: ['No current tools', 'Basic project dashboards', 'Advanced analytics in place', 'Looking to upgrade existing', 'Building internally'],
        required: true
      },
      {
        id: 'specific_interest',
        type: 'textarea',
        question: 'What specific aspects of Change Radar interest you most?',
        required: false,
        helpText: 'e.g., risk prediction, stakeholder sentiment, automated reporting, etc.'
      }
    ],
    confirmationEmail: {
      subject: 'Your Change Radar demo is confirmed',
      template: 'demo_confirmation'
    },
    prepMaterials: [
      'Current transformation tracking methods',
      'Specific use cases you want to explore',
      'Questions about technical integration'
    ]
  },

  strategy: {
    id: 'strategy',
    name: 'Strategy Consultation',
    duration: 60,
    description: 'Comprehensive discussion about your transformation strategy and how intelligence can accelerate success.',
    calendlyUrl: `${env.CALENDLY_USER}/strategy-consultation`,
    targetAudience: ['Executives', 'Strategy Leaders', 'Consultants', 'Board Members'],
    qualificationQuestions: [
      {
        id: 'consultation_goal',
        type: 'select',
        question: 'What\'s your main goal for this consultation?',
        options: ['Strategic planning advice', 'Transformation approach validation', 'Industry insights and benchmarking', 'Vendor evaluation guidance', 'Building internal capabilities'],
        required: true
      },
      {
        id: 'organization_size',
        type: 'select',
        question: 'What\'s your organization size?',
        options: ['Startup (1-50 employees)', 'Scale-up (50-200 employees)', 'Mid-market (200-1000 employees)', 'Enterprise (1000+ employees)', 'Consultant/Agency'],
        required: true
      },
      {
        id: 'transformation_stage',
        type: 'select',
        question: 'What stage are you in with transformation?',
        options: ['Just starting to think about it', 'Building the business case', 'Have approval, planning execution', 'Mid-transformation, facing challenges', 'Post-transformation, optimizing'],
        required: true
      },
      {
        id: 'key_questions',
        type: 'textarea',
        question: 'What are your key questions about transformation strategy?',
        required: false,
        helpText: 'What specific strategic challenges are you facing?'
      }
    ],
    confirmationEmail: {
      subject: 'Your strategy consultation is confirmed',
      template: 'strategy_confirmation'
    },
    prepMaterials: [
      'Current strategic context and goals',
      'Transformation history and lessons learned',
      'Key strategic questions and decisions ahead'
    ]
  },

  implementation: {
    id: 'implementation',
    name: 'Implementation Planning',
    duration: 60,
    description: 'Detailed planning session for implementing transformation intelligence in your specific context.',
    calendlyUrl: `${env.CALENDLY_USER}/implementation-planning`,
    targetAudience: ['Implementation Teams', 'Project Managers', 'Technical Leads', 'Change Managers'],
    qualificationQuestions: [
      {
        id: 'implementation_readiness',
        type: 'select',
        question: 'How ready are you to implement transformation intelligence?',
        options: ['Ready to start immediately', 'Ready in next 30 days', 'Ready in next 90 days', 'Still in planning phase'],
        required: true
      },
      {
        id: 'team_capacity',
        type: 'select',
        question: 'What\'s your implementation team capacity?',
        options: ['Dedicated team available', 'Part-time team resources', 'Need to build the team', 'Prefer external implementation'],
        required: true
      },
      {
        id: 'technical_environment',
        type: 'textarea',
        question: 'Describe your current technical environment and constraints',
        required: true,
        helpText: 'Include systems, data sources, security requirements, etc.'
      },
      {
        id: 'success_criteria',
        type: 'textarea',
        question: 'What does successful implementation look like for you?',
        required: true,
        helpText: 'Be specific about outcomes, metrics, and timelines.'
      }
    ],
    confirmationEmail: {
      subject: 'Your implementation planning session is confirmed',
      template: 'implementation_confirmation'
    },
    prepMaterials: [
      'Technical architecture documentation',
      'Data source inventory',
      'Stakeholder and change management plans',
      'Success metrics and KPIs'
    ]
  }
};

/**
 * Get smart booking recommendation based on user context
 */
export function getBookingRecommendation(context: {
  leadScore?: number;
  source?: string;
  userRole?: string;
  companySize?: string;
  previousInteractions?: string[];
  pageContext?: string;
  timeOnSite?: number;
}): BookingRecommendation {
  const { leadScore = 0, source, userRole, companySize, previousInteractions = [], pageContext, timeOnSite = 0 } = context;

  let primaryBooking: BookingType['id'] = 'strategy';
  let confidence = 0.5;
  let reasoning = 'Default strategy consultation for general interest';

  // High lead score suggests QuickWin readiness
  if (leadScore >= 70) {
    primaryBooking = 'quickwin';
    confidence = 0.9;
    reasoning = 'High lead score indicates QuickWin readiness';
  }
  // Medium-high lead score with product interest suggests demo
  else if (leadScore >= 50 && (source?.includes('demo') || pageContext?.includes('change-radar'))) {
    primaryBooking = 'demo';
    confidence = 0.8;
    reasoning = 'Medium-high lead score with product interest suggests demo';
  }
  // Senior role with budget authority suggests QuickWin potential
  else if (userRole && /\b(ceo|cto|cfo|director|vp|head of|chief)\b/i.test(userRole)) {
    if (leadScore >= 40) {
      primaryBooking = 'quickwin';
      confidence = 0.7;
      reasoning = 'Senior role with moderate engagement suggests QuickWin potential';
    } else {
      primaryBooking = 'strategy';
      confidence = 0.8;
      reasoning = 'Senior role suggests strategy consultation';
    }
  }
  // Enterprise company size with engagement suggests higher-value booking
  else if (companySize === 'enterprise' && leadScore >= 30) {
    primaryBooking = 'demo';
    confidence = 0.7;
    reasoning = 'Enterprise size with engagement suggests demo interest';
  }
  // Previous demo or QuickWin interest suggests implementation
  else if (previousInteractions.some(i => i.includes('demo') || i.includes('quickwin'))) {
    primaryBooking = 'implementation';
    confidence = 0.8;
    reasoning = 'Previous high-value interactions suggest implementation readiness';
  }
  // Technical/product context suggests demo
  else if (pageContext?.includes('demo') || pageContext?.includes('change-radar') || source?.includes('technical')) {
    primaryBooking = 'demo';
    confidence = 0.7;
    reasoning = 'Technical/product context suggests demo interest';
  }
  // High time on site suggests serious interest
  else if (timeOnSite > 300) { // 5+ minutes
    primaryBooking = leadScore >= 30 ? 'demo' : 'strategy';
    confidence = 0.6;
    reasoning = 'Extended engagement suggests serious interest';
  }

  // Determine alternative options
  const alternatives: BookingType['id'][] = [];
  if (primaryBooking !== 'quickwin') alternatives.push('quickwin');
  if (primaryBooking !== 'demo') alternatives.push('demo');
  if (primaryBooking !== 'strategy') alternatives.push('strategy');
  if (primaryBooking !== 'implementation') alternatives.push('implementation');

  return {
    primaryBooking,
    alternativeBookings: alternatives.slice(0, 2), // Top 2 alternatives
    confidence,
    reasoning
  };
}

/**
 * Create a booking request
 */
export async function createBookingRequest(request: BookingRequest): Promise<{
  success: boolean;
  bookingId?: string;
  calendlyUrl?: string;
  error?: string;
}> {
  try {
    const bookingType = BOOKING_TYPES[request.bookingType];
    if (!bookingType) {
      return { success: false, error: 'Invalid booking type' };
    }

    // Generate booking ID
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store booking request (in production, save to database)
    logger.info('Booking request created', {
      bookingId,
      bookingType: request.bookingType,
      userEmail: request.userEmail,
      userCompany: request.userCompany,
      leadScore: request.leadScore,
      source: request.source
    });

    // Send confirmation email if configured
    if (isEmailConfigured()) {
      try {
        await sendBookingConfirmationEmail(request, bookingId);
      } catch (emailError) {
        logger.error('Failed to send booking confirmation email', emailError);
        // Don't fail the booking if email fails
      }
    }

    // Track high-value bookings
    if (request.bookingType === 'quickwin') {
      logger.important(`🎯 QUICKWIN BOOKING: ${request.userName} (${request.userEmail})`, {
        bookingId,
        company: request.userCompany,
        leadScore: request.leadScore
      });
    }

    // Generate Calendly URL with pre-filled information
    const calendlyUrl = generateCalendlyUrl(bookingType, request);

    return {
      success: true,
      bookingId,
      calendlyUrl
    };
  } catch (error) {
    logger.error('Failed to create booking request', error);
    return { success: false, error: 'Failed to create booking request' };
  }
}

/**
 * Generate Calendly URL with pre-filled information
 */
function generateCalendlyUrl(bookingType: BookingType, request: BookingRequest): string {
  const baseUrl = `https://calendly.com/${bookingType.calendlyUrl}`;
  const params = new URLSearchParams();

  // Pre-fill Calendly form
  params.set('name', request.userName);
  params.set('email', request.userEmail);
  if (request.userCompany) params.set('a1', request.userCompany);
  if (request.userRole) params.set('a2', request.userRole);

  // Add custom parameters for tracking
  params.set('utm_source', request.utmSource || request.source);
  if (request.utmMedium) params.set('utm_medium', request.utmMedium);
  if (request.utmCampaign) params.set('utm_campaign', request.utmCampaign);

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Send booking confirmation email
 */
async function sendBookingConfirmationEmail(request: BookingRequest, bookingId: string): Promise<void> {
  const bookingType = BOOKING_TYPES[request.bookingType];
  
  const confirmationHtml = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
        Your ${bookingType.name} is Being Scheduled
      </h2>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${request.userName},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Thank you for requesting a ${bookingType.name}. You'll be redirected to select your preferred time slot.
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
        <h3 style="color: #065f46; margin: 0 0 15px 0;">Session Details:</h3>
        <ul style="color: #065f46; margin: 0; padding-left: 20px;">
          <li><strong>Duration:</strong> ${bookingType.duration} minutes</li>
          <li><strong>Format:</strong> Video call (Zoom link provided after booking)</li>
          <li><strong>Focus:</strong> ${bookingType.description}</li>
          ${bookingType.price ? `<li><strong>Investment:</strong> ${bookingType.price}</li>` : ''}
        </ul>
      </div>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #374151; margin: 0 0 15px 0;">To Prepare for Our Call:</h3>
        <ul style="color: #374151; margin: 0; padding-left: 20px;">
          ${bookingType.prepMaterials.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        I'll send additional preparation materials and the agenda 24 hours before our call.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Looking forward to our conversation!
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin Mander
      </p>
      
      <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          Booking Reference: ${bookingId}
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    from: env.EMAIL_FROM,
    to: request.userEmail,
    subject: bookingType.confirmationEmail.subject,
    html: confirmationHtml
  });
}

/**
 * Get booking analytics
 */
export function getBookingAnalytics(): {
  totalRequests: number;
  byType: Record<string, number>;
  bySource: Record<string, number>;
  conversionRates: Record<string, number>;
} {
  // In production, this would query the database
  // For now, return placeholder analytics
  return {
    totalRequests: 0,
    byType: {},
    bySource: {},
    conversionRates: {}
  };
}