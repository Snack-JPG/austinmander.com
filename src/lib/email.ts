import { Resend } from 'resend';
import { env, isEmailConfigured } from './env';
import { logger } from './logger';

// Initialize Resend if configured
const resend = isEmailConfigured() ? new Resend(env.RESEND_API_KEY) : null;

export interface EmailData {
  to: string | string[];
  from: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  role?: string;
  message: string;
  source?: string;
}

export async function sendEmail(data: EmailData) {
  if (!resend) {
    logger.warn('Email not configured. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resend.emails.send(data);
    return { success: true, data: result };
  } catch (error) {
    logger.error('Email send error', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export async function sendContactEmail(formData: ContactFormData) {
  const { name, email, company, role, message, source } = formData;

  // Send notification to site owner
  const ownerEmailHtml = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${role ? `<p><strong>Role:</strong> ${role}</p>` : ''}
        ${source ? `<p><strong>Source:</strong> ${source}</p>` : ''}
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
      
      <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; color: #78350f; font-size: 14px;">
          <strong>Lead Score:</strong> ${calculateLeadScore(formData)}/100
        </p>
      </div>
    </div>
  `;

  const ownerEmail = await sendEmail({
    from: `${env.EMAIL_FROM}`,
    to: env.EMAIL_TO,
    replyTo: email,
    subject: `[HIGH PRIORITY] New contact from ${name}${company ? ` at ${company}` : ''}`,
    html: ownerEmailHtml,
  });

  // Send confirmation to sender
  const senderEmailHtml = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0f172a;">Thanks for reaching out, ${name}!</h2>
      
      <p style="color: #374151; line-height: 1.6;">
        I've received your message and will get back to you within 24 hours. 
      </p>
      
      <p style="color: #374151; line-height: 1.6;">
        In the meantime, you might find these resources helpful:
      </p>
      
      <ul style="color: #374151; line-height: 1.8;">
        <li><a href="https://austinmander.com/blog" style="color: #10b981;">Latest insights on AI transformation</a></li>
        <li><a href="https://austinmander.com/case-studies" style="color: #10b981;">Case studies from similar organisations</a></li>
        <li><a href="https://austinmander.com/change-radar" style="color: #10b981;">Learn about Change Radar</a></li>
      </ul>
      
      <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          This is an automated confirmation. If you didn't send this message, 
          please ignore this email.
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

  const senderEmail = await sendEmail({
    from: env.EMAIL_FROM,
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    html: senderEmailHtml,
  });

  return {
    ownerEmail,
    senderEmail,
  };
}

// Calculate lead score based on form data
function calculateLeadScore(data: ContactFormData): number {
  let score = 0;
  
  // Company provided (20 points)
  if (data.company) score += 20;
  
  // Role provided (15 points)
  if (data.role) score += 15;
  
  // Message length (up to 25 points)
  const messageLength = data.message.length;
  if (messageLength > 500) score += 25;
  else if (messageLength > 200) score += 15;
  else if (messageLength > 50) score += 5;
  
  // Keywords in message (up to 40 points)
  const keywords = ['transformation', 'ai', 'change radar', 'pilot', 'consultation', 'budget', 'timeline', 'project', 'enterprise'];
  const lowerMessage = data.message.toLowerCase();
  keywords.forEach(keyword => {
    if (lowerMessage.includes(keyword)) score += 5;
  });
  
  return Math.min(score, 100);
}