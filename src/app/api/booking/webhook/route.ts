import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { sendEmail } from "@/lib/email";
import { logger } from "@/lib/logger";
import { triggerDemoNurture, triggerQuickWinNurture } from "@/lib/nurture-sequences";

// Calendly webhook event types
interface CalendlyWebhookEvent {
  created_at: string;
  created_by: string;
  event: 'invitee.created' | 'invitee.canceled';
  payload: {
    event_type: {
      uuid: string;
      name: string;
      scheduling_url: string;
      duration: number;
    };
    invitee: {
      uuid: string;
      email: string;
      name: string;
      text_reminder_number?: string;
      timezone: string;
      created_at: string;
      canceled: boolean;
      cancellation?: {
        canceled_by: string;
        reason: string;
        created_at: string;
      };
    };
    event: {
      uuid: string;
      assigned_to: string[];
      extended_assigned_to: Array<{
        name: string;
        email: string;
        primary: boolean;
      }>;
      start_time: string;
      end_time: string;
      location?: {
        type: string;
        location?: string;
        join_url?: string;
      };
    };
    questions_and_answers?: Array<{
      question: string;
      answer: string;
      position: number;
    }>;
    questions_and_responses?: Array<{
      question: string;
      response: string;
      position: number;
    }>;
    tracking?: {
      utm_campaign?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_content?: string;
      utm_term?: string;
      salesforce_uuid?: string;
    };
    utm_parameters?: {
      utm_campaign?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_content?: string;
      utm_term?: string;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (if Calendly webhook secret is configured)
    const signature = request.headers.get('calendly-webhook-signature');
    const webhookSecret = env.CALENDLY_WEBHOOK_SECRET;
    
    if (webhookSecret && signature) {
      // In production, verify the webhook signature
      // const isValid = verifyCalendlySignature(body, signature, webhookSecret);
      // if (!isValid) {
      //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      // }
    }

    const webhookEvent: CalendlyWebhookEvent = await request.json();
    
    logger.info('Calendly webhook received', {
      event: webhookEvent.event,
      eventType: webhookEvent.payload.event_type.name,
      inviteeEmail: webhookEvent.payload.invitee.email,
      inviteeName: webhookEvent.payload.invitee.name
    });

    if (webhookEvent.event === 'invitee.created') {
      await handleBookingCreated(webhookEvent);
    } else if (webhookEvent.event === 'invitee.canceled') {
      await handleBookingCanceled(webhookEvent);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Calendly webhook error", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

async function handleBookingCreated(event: CalendlyWebhookEvent) {
  const { payload } = event;
  const { invitee, event: booking, event_type, tracking } = payload;

  // Determine booking type from event name or URL
  const bookingType = determineBookingType(event_type.name, event_type.scheduling_url);
  
  // Extract additional context from questions and answers
  const responses = extractResponses(payload.questions_and_answers || payload.questions_and_responses || []);
  
  try {
    // Send booking confirmation to owner
    await sendOwnerBookingNotification({
      bookingType,
      invitee,
      booking,
      eventType: event_type,
      responses,
      tracking: tracking || payload.utm_parameters
    });

    // Send preparation email to invitee
    await sendInviteePreparationEmail({
      bookingType,
      invitee,
      booking,
      eventType: event_type
    });

    // Trigger appropriate nurture sequence
    if (bookingType === 'quickwin') {
      await triggerQuickWinNurture(
        invitee.email,
        invitee.name,
        responses.company,
        90, // High lead score for confirmed bookings
        'booking_confirmed'
      );
    } else if (bookingType === 'demo') {
      await triggerDemoNurture(
        invitee.email,
        invitee.name,
        responses.company,
        'booking_confirmed'
      );
    }

    // Track high-value bookings
    if (bookingType === 'quickwin') {
      logger.important(`🎯 QUICKWIN BOOKING CONFIRMED: ${invitee.name} (${invitee.email})`, {
        bookingDate: booking.start_time,
        company: responses.company,
        eventUuid: booking.uuid
      });
    }

    // Track analytics
    import('@/lib/analytics').then(({ trackConversion, identifyUser }) => {
      if (bookingType === 'quickwin') {
        trackConversion.quickWinInquiry('booking_confirmed');
      } else if (bookingType === 'demo') {
        trackConversion.demoRequest();
      }

      identifyUser({
        email: invitee.email,
        userType: 'confirmed_booking',
        industry: responses.company
      });
    }).catch(error => {
      logger.error('Failed to track booking confirmation analytics', error);
    });

  } catch (error) {
    logger.error('Failed to process booking confirmation', error, {
      inviteeEmail: invitee.email,
      eventUuid: booking.uuid
    });
  }
}

async function handleBookingCanceled(event: CalendlyWebhookEvent) {
  const { payload } = event;
  const { invitee, event: booking } = payload;

  logger.info('Booking canceled', {
    inviteeEmail: invitee.email,
    inviteeName: invitee.name,
    eventUuid: booking.uuid,
    canceledBy: invitee.cancellation?.canceled_by,
    reason: invitee.cancellation?.reason
  });

  // Send cancellation notification to owner
  try {
    await sendEmail({
      from: env.EMAIL_FROM,
      to: env.EMAIL_TO,
      subject: `Booking canceled: ${invitee.name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Booking Canceled</h2>
          <p><strong>Name:</strong> ${invitee.name}</p>
          <p><strong>Email:</strong> ${invitee.email}</p>
          <p><strong>Canceled by:</strong> ${invitee.cancellation?.canceled_by || 'Unknown'}</p>
          ${invitee.cancellation?.reason ? `<p><strong>Reason:</strong> ${invitee.cancellation.reason}</p>` : ''}
          <p><strong>Original time:</strong> ${new Date(booking.start_time).toLocaleString()}</p>
        </div>
      `
    });
  } catch (error) {
    logger.error('Failed to send cancellation notification', error);
  }
}

function determineBookingType(eventName: string, schedulingUrl: string): string {
  const name = eventName.toLowerCase();
  const url = schedulingUrl.toLowerCase();

  if (name.includes('quickwin') || url.includes('quickwin')) {
    return 'quickwin';
  } else if (name.includes('demo') || url.includes('demo')) {
    return 'demo';
  } else if (name.includes('strategy') || url.includes('strategy')) {
    return 'strategy';
  } else if (name.includes('implementation') || url.includes('implementation')) {
    return 'implementation';
  }

  return 'general';
}

function extractResponses(qaArray: Array<{ question: string; answer?: string; response?: string }>): Record<string, string> {
  const responses: Record<string, string> = {};
  
  qaArray.forEach(qa => {
    const answer = qa.answer || qa.response || '';
    const question = qa.question.toLowerCase();
    
    if (question.includes('company')) {
      responses.company = answer;
    } else if (question.includes('role') || question.includes('title')) {
      responses.role = answer;
    } else if (question.includes('transformation') || question.includes('project')) {
      responses.transformationType = answer;
    }
  });

  return responses;
}

async function sendOwnerBookingNotification(params: {
  bookingType: string;
  invitee: CalendlyWebhookEvent['payload']['invitee'];
  booking: CalendlyWebhookEvent['payload']['event'];
  eventType: CalendlyWebhookEvent['payload']['event_type'];
  responses: Record<string, string>;
  tracking?: any;
}) {
  const { bookingType, invitee, booking, eventType, responses, tracking } = params;

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
        📅 NEW BOOKING CONFIRMED: ${eventType.name}
      </h2>
      
      <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
        <h3 style="color: #065f46; margin: 0 0 15px 0;">Meeting Details</h3>
        <p style="color: #065f46; margin: 5px 0;"><strong>Date & Time:</strong> ${new Date(booking.start_time).toLocaleString()}</p>
        <p style="color: #065f46; margin: 5px 0;"><strong>Duration:</strong> ${eventType.duration} minutes</p>
        <p style="color: #065f46; margin: 5px 0;"><strong>Type:</strong> ${bookingType.toUpperCase()}</p>
      </div>

      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin: 0 0 15px 0;">Attendee Information</h3>
        <p><strong>Name:</strong> ${invitee.name}</p>
        <p><strong>Email:</strong> ${invitee.email}</p>
        <p><strong>Timezone:</strong> ${invitee.timezone}</p>
        ${responses.company ? `<p><strong>Company:</strong> ${responses.company}</p>` : ''}
        ${responses.role ? `<p><strong>Role:</strong> ${responses.role}</p>` : ''}
        ${responses.transformationType ? `<p><strong>Transformation Type:</strong> ${responses.transformationType}</p>` : ''}
      </div>

      ${booking.location?.join_url ? `
        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin: 0 0 15px 0;">Meeting Link</h3>
          <p><a href="${booking.location.join_url}" style="color: #1e40af; text-decoration: none; font-weight: 600;">${booking.location.join_url}</a></p>
        </div>
      ` : ''}

      ${tracking ? `
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #78350f; margin: 0 0 15px 0;">Tracking Information</h3>
          ${tracking.utm_source ? `<p><strong>Source:</strong> ${tracking.utm_source}</p>` : ''}
          ${tracking.utm_medium ? `<p><strong>Medium:</strong> ${tracking.utm_medium}</p>` : ''}
          ${tracking.utm_campaign ? `<p><strong>Campaign:</strong> ${tracking.utm_campaign}</p>` : ''}
        </div>
      ` : ''}

      <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
        <p style="margin: 0; color: #065f46; font-size: 14px;">
          📧 Meeting details and preparation materials have been sent to ${invitee.email}
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    from: env.EMAIL_FROM,
    to: env.EMAIL_TO,
    subject: `Booking Confirmed: ${eventType.name} with ${invitee.name}`,
    html
  });
}

async function sendInviteePreparationEmail(params: {
  bookingType: string;
  invitee: CalendlyWebhookEvent['payload']['invitee'];
  booking: CalendlyWebhookEvent['payload']['event'];
  eventType: CalendlyWebhookEvent['payload']['event_type'];
}) {
  const { bookingType, invitee, booking, eventType } = params;

  const meetingDate = new Date(booking.start_time);
  const prepContent = getPreparationContent(bookingType);

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
        Your ${eventType.name} is Confirmed! 🎉
      </h2>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Hi ${invitee.name},
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Thank you for booking! I'm looking forward to our conversation about transformation intelligence.
      </p>
      
      <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
        <h3 style="color: #065f46; margin: 0 0 15px 0;">Meeting Details</h3>
        <p style="color: #065f46; margin: 5px 0;"><strong>Date:</strong> ${meetingDate.toLocaleDateString()}</p>
        <p style="color: #065f46; margin: 5px 0;"><strong>Time:</strong> ${meetingDate.toLocaleTimeString()} ${invitee.timezone}</p>
        <p style="color: #065f46; margin: 5px 0;"><strong>Duration:</strong> ${eventType.duration} minutes</p>
        ${booking.location?.join_url ? `<p style="color: #065f46; margin: 5px 0;"><strong>Meeting Link:</strong> <a href="${booking.location.join_url}" style="color: #065f46;">${booking.location.join_url}</a></p>` : ''}
      </div>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #374151; margin: 0 0 15px 0;">Agenda</h3>
        ${prepContent.agenda}
      </div>
      
      <div style="background: #fef3c7; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #78350f; margin: 0 0 15px 0;">To Prepare (Optional)</h3>
        ${prepContent.preparation}
      </div>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        I'll send a reminder with the meeting link 1 hour before our call.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Need to reschedule? Just reply to this email or use the Calendly link in your calendar invitation.
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Looking forward to our conversation!
      </p>
      
      <p style="color: #374151; line-height: 1.6; font-size: 16px;">
        Austin Mander
      </p>
    </div>
  `;

  await sendEmail({
    from: env.EMAIL_FROM,
    to: invitee.email,
    subject: `Your ${eventType.name} is confirmed - ${meetingDate.toLocaleDateString()}`,
    html
  });
}

function getPreparationContent(bookingType: string): { agenda: string; preparation: string } {
  switch (bookingType) {
    case 'quickwin':
      return {
        agenda: `
          <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Review your transformation program context (5 min)</li>
            <li>Identify specific risk blind spots and intelligence gaps (10 min)</li>
            <li>Design your £10k QuickWin pilot scope and deliverables (10 min)</li>
            <li>Outline implementation timeline and next steps (5 min)</li>
          </ul>
        `,
        preparation: `
          <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Current transformation timeline and key milestones</li>
            <li>Main stakeholder groups and their concerns</li>
            <li>Biggest risks or blind spots you're aware of</li>
            <li>Budget approval process for pilots</li>
          </ul>
        `
      };

    case 'demo':
      return {
        agenda: `
          <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Change Radar platform overview (10 min)</li>
            <li>Live demo with real transformation data (15 min)</li>
            <li>Q&A about your specific use case (5 min)</li>
          </ul>
        `,
        preparation: `
          <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Current transformation tracking methods</li>
            <li>Technical integration requirements</li>
            <li>Specific Change Radar features you want to see</li>
          </ul>
        `
      };

    case 'strategy':
      return {
        agenda: `
          <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Your transformation context and goals (15 min)</li>
            <li>Strategic challenges and opportunities (20 min)</li>
            <li>Recommendations and next steps (15 min)</li>
            <li>Resources and follow-up (10 min)</li>
          </ul>
        `,
        preparation: `
          <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Current strategic priorities and constraints</li>
            <li>Transformation history and lessons learned</li>
            <li>Key questions you want to explore</li>
          </ul>
        `
      };

    default:
      return {
        agenda: `
          <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Introductions and context setting</li>
            <li>Discussion of your specific needs</li>
            <li>Recommendations and next steps</li>
          </ul>
        `,
        preparation: `
          <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Key questions you want to discuss</li>
            <li>Current situation overview</li>
            <li>Goals and desired outcomes</li>
          </ul>
        `
      };
  }
}