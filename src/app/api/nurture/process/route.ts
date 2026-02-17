import { NextRequest, NextResponse } from "next/server";
import { processNurtureSequences, getNurtureAnalytics } from "@/lib/nurture-sequences";
import { logger } from "@/lib/logger";

// This endpoint processes all nurture sequences
// Should be called by a cron job (Vercel Cron, GitHub Actions, etc.)
export async function POST(request: NextRequest) {
  try {
    // Verify the request is authorized (basic API key check)
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET || 'development-secret'}`;
    
    if (authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    logger.info('Starting nurture sequence processing');
    
    const startTime = Date.now();
    await processNurtureSequences();
    const processingTime = Date.now() - startTime;
    
    const analytics = getNurtureAnalytics();
    
    logger.info('Nurture sequence processing completed', {
      processingTime,
      analytics
    });

    return NextResponse.json({
      success: true,
      message: "Nurture sequences processed successfully",
      processingTime,
      analytics
    });
  } catch (error) {
    logger.error("Nurture sequence processing failed", error);
    
    return NextResponse.json(
      { error: "Failed to process nurture sequences" },
      { status: 500 }
    );
  }
}

// GET endpoint for analytics (development/monitoring)
export async function GET(request: NextRequest) {
  try {
    const analytics = getNurtureAnalytics();
    
    return NextResponse.json({
      success: true,
      analytics
    });
  } catch (error) {
    logger.error("Failed to get nurture analytics", error);
    
    return NextResponse.json(
      { error: "Failed to get analytics" },
      { status: 500 }
    );
  }
}