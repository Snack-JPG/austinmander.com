import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimiters } from "@/lib/rate-limit-redis";
import { sendContactEmail } from "@/lib/email";
import { createLead } from "@/lib/database";
import { isEmailConfigured } from "@/lib/env";
import { logger } from "@/lib/logger";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimiters.contact.check(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          }
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Validation failed",
          issues: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Calculate lead score
    const leadScore = calculateLeadScore(formData);

    // Store lead in database (works even without database config)
    const leadResult = await createLead({
      ...formData,
      score: leadScore,
      status: 'new',
    });

    if (!leadResult.success && 'error' in leadResult) {
      logger.error('Failed to store lead', undefined, { error: leadResult.error });
    }

    // Send emails if configured
    let emailResults: Awaited<ReturnType<typeof sendContactEmail>> | null = null;
    if (isEmailConfigured()) {
      try {
        emailResults = await sendContactEmail(formData);
        if (!emailResults.ownerEmail.success) {
          logger.error('Failed to send owner email', undefined, { error: emailResults.ownerEmail.error });
        }
        if (!emailResults.senderEmail.success) {
          logger.error('Failed to send confirmation email', undefined, { error: emailResults.senderEmail.error });
        }
      } catch (emailError) {
        logger.error('Email sending error', emailError);
        // Don't fail the request if email fails - we have the lead stored
      }
    } else {
      logger.warn('Email not configured - lead stored locally only');
    }

    // Log high-value leads
    if (leadScore >= 70) {
      logger.important(`🔥 HIGH-VALUE LEAD: ${formData.name} (${formData.email})`, { 
        score: leadScore,
        email: formData.email,
        company: formData.company 
      });
    }

    return NextResponse.json({ 
      success: true,
      message: "Thank you for contacting us. We'll be in touch soon!",
      leadId: leadResult.data?.id,
      emailSent: Boolean(emailResults?.ownerEmail?.success),
    });
  } catch (error) {
    logger.error("Contact form error", error);
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Lead scoring function
function calculateLeadScore(data: z.infer<typeof contactSchema>): number {
  let score = 0;
  
  // Company provided (20 points)
  if (data.company) score += 20;
  
  // Role provided (15 points)
  if (data.role) score += 15;
  
  // C-level or VP role (additional 15 points)
  if (data.role && /\b(ceo|cto|cfo|coo|cmo|vp|vice president|director|head of)\b/i.test(data.role)) {
    score += 15;
  }
  
  // Message length (up to 20 points)
  const messageLength = data.message.length;
  if (messageLength > 500) score += 20;
  else if (messageLength > 200) score += 10;
  else if (messageLength > 50) score += 5;
  
  // High-intent keywords (up to 30 points)
  const highIntentKeywords = ['pilot', 'budget', 'timeline', 'urgent', 'asap', 'procurement', 'rfp'];
  const mediumIntentKeywords = ['transformation', 'ai', 'change radar', 'consultation', 'project', 'enterprise'];
  const lowerMessage = data.message.toLowerCase();
  
  highIntentKeywords.forEach(keyword => {
    if (lowerMessage.includes(keyword)) score += 5;
  });
  
  mediumIntentKeywords.forEach(keyword => {
    if (lowerMessage.includes(keyword)) score += 2;
  });
  
  return Math.min(score, 100);
}
