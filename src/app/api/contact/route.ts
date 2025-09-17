import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-build");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Austin Mander <noreply@austinmander.com>",
      to: ["hello@austinmander.com"],
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              📧 Reply directly to this email to respond to ${name} at ${email}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Send confirmation email to sender
    await resend.emails.send({
      from: "Austin Mander <noreply@austinmander.com>",
      to: [email],
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Thanks for reaching out, ${name}!</h2>
          
          <p style="color: #374151; line-height: 1.6;">
            I've received your message and will get back to you within 24 hours. 
            In the meantime, feel free to check out my latest projects at 
            <a href="https://austinmander.com/work" style="color: #10b981;">austinmander.com/work</a>.
          </p>
          
          <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This is an automated confirmation. If you didn't send this message, 
              please ignore this email.
            </p>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px;">
              — Austin Mander<br>
              <a href="https://austinmander.com" style="color: #10b981;">austinmander.com</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
