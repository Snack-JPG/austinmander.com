import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-build");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Add to audience (you can replace this with your preferred email service)
    // For now, we'll just send a notification email
    const { error } = await resend.emails.send({
      from: "Austin Mander <noreply@austinmander.com>",
      to: ["hello@austinmander.com"],
      subject: "New newsletter subscription",
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            New Newsletter Subscription
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              📧 Add this email to your newsletter audience list
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to process subscription" },
        { status: 500 }
      );
    }

    // Send welcome email to subscriber
    await resend.emails.send({
      from: "Austin Mander <noreply@austinmander.com>",
      to: [email],
      subject: "Welcome to the ship log!",
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Welcome aboard! 🚀</h2>
          
          <p style="color: #374151; line-height: 1.6;">
            Thanks for subscribing to my newsletter. You'll get updates when I ship new projects, 
            experiments, and insights from building with AI systems.
          </p>
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #065f46;">What to expect:</h3>
            <ul style="color: #065f46; margin-bottom: 0;">
              <li>Behind-the-scenes build logs</li>
              <li>AI tool discoveries and workflows</li>
              <li>Early access to new projects</li>
              <li>No spam, just value</li>
            </ul>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            In the meantime, check out my latest projects at 
            <a href="https://austinmander.com/work" style="color: #10b981;">austinmander.com/work</a>
            or follow the ship log at 
            <a href="https://austinmander.com/log" style="color: #10b981;">austinmander.com/log</a>.
          </p>
          
          <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              — Austin Mander<br>
              <a href="https://austinmander.com" style="color: #10b981;">austinmander.com</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
