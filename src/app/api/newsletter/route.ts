import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimiters } from "@/lib/rate-limit-redis";
import { subscribeToNewsletter, unsubscribeFromNewsletter } from "@/lib/database";
import { sendEmail } from "@/lib/email";
import { env, isEmailConfigured, isDatabaseConfigured } from "@/lib/env";

const subscribeSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  name: z.string().max(100).optional(),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimiters.newsletter.check(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: "Too many subscription attempts. Please try again later.",
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = subscribeSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Invalid email address",
          issues: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const { email, name, source } = validationResult.data;

    // Subscribe to newsletter (stores in database or local file)
    const subscribeResult = await subscribeToNewsletter(email, name);
    
    if (!subscribeResult.success) {
      if ('error' in subscribeResult && subscribeResult.error === 'Already subscribed') {
        return NextResponse.json(
          { 
            success: false,
            message: "You're already subscribed to our newsletter!"
          },
          { status: 200 }
        );
      }
      throw new Error('error' in subscribeResult ? subscribeResult.error : 'Failed to subscribe');
    }

    // Send notification email to owner
    if (isEmailConfigured()) {
      try {
        await sendEmail({
          from: env.EMAIL_FROM,
          to: env.EMAIL_TO,
          subject: `New newsletter subscriber: ${email}`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
                New Newsletter Subscription
              </h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Email:</strong> ${email}</p>
                ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
                ${source ? `<p><strong>Source:</strong> ${source}</p>` : ''}
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #065f46; font-size: 14px;">
                  📧 Subscriber added to database ${!isDatabaseConfigured() ? '(local file)' : ''}
                </p>
              </div>
            </div>
          `,
        });

        // Send welcome email to subscriber
        await sendEmail({
          from: env.EMAIL_FROM,
          to: email,
          subject: "Welcome to the Austin Mander Newsletter! 🎉",
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
                Welcome to the Newsletter${name ? `, ${name}` : ''}!
              </h1>
              
              <p style="color: #374151; line-height: 1.6; font-size: 16px;">
                Thank you for joining 5,000+ executives who receive weekly insights on AI transformation.
              </p>
              
              <h2 style="color: #0f172a; margin-top: 30px;">What to Expect</h2>
              <ul style="color: #374151; line-height: 1.8;">
                <li><strong>Weekly insights</strong> on AI transformation and change management</li>
                <li><strong>Case studies</strong> from successful implementations</li>
                <li><strong>Practical tools</strong> and frameworks you can use immediately</li>
                <li><strong>Early access</strong> to new resources and tools</li>
              </ul>
              
              <h2 style="color: #0f172a; margin-top: 30px;">Popular Resources</h2>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 10px 0;">
                  📊 <a href="https://austinmander.com/resources/roi-calculator" style="color: #10b981; text-decoration: none;">
                    AI ROI Calculator
                  </a> - Calculate your potential AI transformation ROI
                </p>
                <p style="margin: 10px 0;">
                  📝 <a href="https://austinmander.com/resources/sow-generator" style="color: #10b981; text-decoration: none;">
                    SOW Generator
                  </a> - Generate a pilot statement of work
                </p>
                <p style="margin: 10px 0;">
                  📚 <a href="https://austinmander.com/blog" style="color: #10b981; text-decoration: none;">
                    Latest Articles
                  </a> - Deep dives on AI transformation
                </p>
              </div>
              
              <div style="margin-top: 40px; padding: 20px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
                <p style="margin: 0; color: #065f46;">
                  <strong>Next newsletter:</strong> Tuesday at 9 AM GMT<br>
                  <strong>Topic:</strong> "The Hidden Costs of AI Implementation (And How to Avoid Them)"
                </p>
              </div>
              
              <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px;">
                  Questions? Reply to this email anytime.<br>
                  Want to unsubscribe? <a href="https://austinmander.com/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #6b7280; text-decoration: underline;">Click here</a>
                </p>
                <p style="color: #6b7280; font-size: 14px; margin-top: 10px;">
                  — Austin Mander<br>
                  <a href="https://austinmander.com" style="color: #10b981;">austinmander.com</a> | 
                  <a href="https://linkedin.com/in/austinmander" style="color: #10b981;">LinkedIn</a>
                </p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Newsletter emails failed:', emailError);
        // Don't fail the subscription if email fails
      }
    }

    // Log the subscription
    console.log(`📧 New newsletter subscriber: ${email}${name ? ` (${name})` : ''}${source ? ` from ${source}` : ''}`);

    return NextResponse.json({ 
      success: true,
      message: "Successfully subscribed! Check your email for a welcome message.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // In production, verify the token to prevent unauthorized unsubscribes
    // For now, we'll just process the unsubscribe
    
    const result = await unsubscribeFromNewsletter(email);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to unsubscribe" },
        { status: 500 }
      );
    }

    console.log(`📧 Newsletter unsubscribe: ${email}`);

    return NextResponse.json({ 
      success: true,
      message: "You've been unsubscribed from the newsletter."
    });
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}