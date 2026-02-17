import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimiters } from "@/lib/rate-limit-redis";
import { sendEmail } from "@/lib/email";
import { env, isEmailConfigured } from "@/lib/env";
import { logger } from "@/lib/logger";
import { triggerDemoNurture } from "@/lib/nurture-sequences";

// Validation schema for demo requests
const demoRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  useCase: z.string().max(500).optional(),
  preferredTime: z.string().optional(),
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
    const validationResult = demoRequestSchema.safeParse(body);
    
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

    // Send notification email to owner
    if (isEmailConfigured()) {
      try {
        const ownerEmailHtml = `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
              🎯 NEW CHANGE RADAR DEMO REQUEST
            </h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
              ${formData.role ? `<p><strong>Role:</strong> ${formData.role}</p>` : ''}
              ${formData.preferredTime ? `<p><strong>Preferred Time:</strong> ${formData.preferredTime}</p>` : ''}
            </div>
            
            ${formData.useCase ? `
              <div style="background: white; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h3 style="color: #374151; margin-top: 0;">Use Case:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${formData.useCase}</p>
              </div>
            ` : ''}
            
            <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #065f46; font-size: 14px;">
                📧 Reply directly to this email to coordinate the demo with ${formData.name}
              </p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #78350f; font-size: 14px;">
                <strong>High-Intent Lead:</strong> Demo requests typically convert to paid engagements within 2 weeks.
              </p>
            </div>
          </div>
        `;

        await sendEmail({
          from: env.EMAIL_FROM,
          to: env.EMAIL_TO,
          replyTo: formData.email,
          subject: `[HIGH PRIORITY] Change Radar Demo Request from ${formData.name}${formData.company ? ` at ${formData.company}` : ''}`,
          html: ownerEmailHtml,
        });

        // Send immediate response to requester
        const senderEmailHtml = `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0f172a;">Demo Request Received, ${formData.name}!</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              Thank you for requesting a Change Radar demo. I'll personally reach out within 24 hours to schedule your personalized demonstration.
            </p>
            
            <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
              <h3 style="color: #065f46; margin: 0 0 15px 0;">What to Expect in Your Demo:</h3>
              <ul style="color: #065f46; margin: 0; padding-left: 20px;">
                <li>Live walkthrough of Change Radar's risk intelligence dashboard</li>
                <li>Real case study data from similar transformations</li>
                <li>Customized discussion of your specific use case</li>
                <li>Q&A about implementation in your environment</li>
                <li>Next steps including QuickWin pilot options</li>
              </ul>
            </div>
            
            <p style="color: #374151; line-height: 1.6;">
              In the meantime, you might find these resources helpful:
            </p>
            
            <ul style="color: #374151; line-height: 1.8;">
              <li><a href="https://austinmander.com/case-studies" style="color: #10b981;">Case studies from similar transformations</a></li>
              <li><a href="https://austinmander.com/resources/roi-calculator" style="color: #10b981;">Calculate your potential ROI</a></li>
              <li><a href="https://austinmander.com/blog/building-change-radar" style="color: #10b981;">How I built Change Radar</a></li>
            </ul>
            
            <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                This is an automated confirmation. I'll follow up personally to schedule your demo.
              </p>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px;">
                — Austin Mander<br>
                <a href="https://austinmander.com" style="color: #10b981;">austinmander.com</a><br>
                <a href="https://linkedin.com/in/austinmander" style="color: #10b981;">LinkedIn</a>
              </p>
            </div>
          </div>
        `;

        await sendEmail({
          from: env.EMAIL_FROM,
          to: formData.email,
          subject: `Your Change Radar demo is being scheduled, ${formData.name}`,
          html: senderEmailHtml,
        });

      } catch (emailError) {
        logger.error('Demo request emails failed', emailError);
        // Don't fail the request if email fails
      }
    }

    // Trigger demo nurture sequence
    try {
      await triggerDemoNurture(
        formData.email,
        formData.name,
        formData.company,
        'demo_request'
      );
      logger.info('Demo nurture sequence triggered', {
        email: formData.email,
        company: formData.company
      });
    } catch (nurtureError) {
      logger.error('Failed to trigger demo nurture sequence', nurtureError, {
        email: formData.email
      });
      // Don't fail the demo request if nurture fails
    }

    // Log high-value demo request
    logger.important(`🎯 DEMO REQUEST: ${formData.name} (${formData.email})`, { 
      email: formData.email,
      company: formData.company,
      role: formData.role
    });

    return NextResponse.json({ 
      success: true,
      message: "Demo request received! I'll contact you within 24 hours to schedule your personalized demonstration.",
    });
  } catch (error) {
    logger.error("Demo request error", error);
    
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}