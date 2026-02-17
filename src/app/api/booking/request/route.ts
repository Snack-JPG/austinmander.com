import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimiters } from "@/lib/rate-limit-redis";
import { createBookingRequest, BOOKING_TYPES } from "@/lib/booking";
import { logger } from "@/lib/logger";

// Validation schema for booking requests
const bookingRequestSchema = z.object({
  bookingType: z.enum(['quickwin', 'demo', 'strategy', 'implementation']),
  userName: z.string().min(2, "Name must be at least 2 characters").max(100),
  userEmail: z.string().email("Invalid email address"),
  userCompany: z.string().max(100).optional(),
  userRole: z.string().max(100).optional(),
  userPhone: z.string().max(20).optional(),
  responses: z.record(z.union([z.string(), z.array(z.string())])),
  preferredTimes: z.array(z.string()).optional(),
  source: z.string().default('website'),
  leadScore: z.number().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for booking requests
    const rateLimitResult = await rateLimiters.contact.check(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: "Too many booking requests. Please try again later.",
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
    const validationResult = bookingRequestSchema.safeParse(body);
    
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

    const bookingData = validationResult.data;

    // Validate booking type exists
    const bookingType = BOOKING_TYPES[bookingData.bookingType];
    if (!bookingType) {
      return NextResponse.json(
        { error: "Invalid booking type" },
        { status: 400 }
      );
    }

    // Validate required responses for booking type
    const missingResponses = bookingType.qualificationQuestions
      .filter(q => q.required)
      .filter(q => !bookingData.responses[q.id] || bookingData.responses[q.id] === '');

    if (missingResponses.length > 0) {
      return NextResponse.json(
        { 
          error: "Missing required responses",
          missingFields: missingResponses.map(q => q.id)
        },
        { status: 400 }
      );
    }

    // Create booking request
    const result = await createBookingRequest(bookingData);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create booking request" },
        { status: 500 }
      );
    }

    // Track conversion analytics
    import('@/lib/analytics').then(({ trackConversion, identifyUser }) => {
      // Track booking conversion based on type
      if (bookingData.bookingType === 'quickwin') {
        trackConversion.quickWinInquiry('booking_form');
      } else if (bookingData.bookingType === 'demo') {
        trackConversion.demoRequest();
      } else {
        trackConversion.servicesInquiry(bookingData.bookingType);
      }

      // Identify user for better tracking
      identifyUser({
        email: bookingData.userEmail,
        userType: 'qualified_lead',
        industry: bookingData.userCompany || undefined,
        companySize: bookingData.responses.organization_size as string || undefined
      });
    }).catch(error => {
      logger.error('Failed to track booking analytics', error);
    });

    logger.info('Booking request processed successfully', {
      bookingId: result.bookingId,
      bookingType: bookingData.bookingType,
      userEmail: bookingData.userEmail,
      userCompany: bookingData.userCompany
    });

    return NextResponse.json({
      success: true,
      message: `Your ${bookingType.name} request has been submitted successfully!`,
      bookingId: result.bookingId,
      calendlyUrl: result.calendlyUrl,
      bookingType: {
        name: bookingType.name,
        duration: bookingType.duration,
        description: bookingType.description
      }
    });
  } catch (error) {
    logger.error("Booking request error", error);
    
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve booking types and their questions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingTypeId = searchParams.get('type') as keyof typeof BOOKING_TYPES;

    if (bookingTypeId && BOOKING_TYPES[bookingTypeId]) {
      // Return specific booking type details
      const bookingType = BOOKING_TYPES[bookingTypeId];
      return NextResponse.json({
        success: true,
        bookingType: {
          id: bookingType.id,
          name: bookingType.name,
          duration: bookingType.duration,
          description: bookingType.description,
          price: bookingType.price,
          targetAudience: bookingType.targetAudience,
          qualificationQuestions: bookingType.qualificationQuestions,
          prepMaterials: bookingType.prepMaterials
        }
      });
    } else {
      // Return all booking types summary
      const bookingTypes = Object.values(BOOKING_TYPES).map(bt => ({
        id: bt.id,
        name: bt.name,
        duration: bt.duration,
        description: bt.description,
        price: bt.price,
        targetAudience: bt.targetAudience
      }));

      return NextResponse.json({
        success: true,
        bookingTypes
      });
    }
  } catch (error) {
    logger.error("Failed to get booking types", error);
    
    return NextResponse.json(
      { error: "Failed to retrieve booking information" },
      { status: 500 }
    );
  }
}