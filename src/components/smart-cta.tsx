"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Target, 
  Star, 
  Settings, 
  Calendar, 
  ArrowRight, 
  Clock, 
  Users, 
  TrendingUp,
  Gift
} from 'lucide-react';
import { useBehaviorTracking, useCTARecommendation, useEventTracking } from './behavior-tracking';
import { ABTestCTA, CTA_TESTS } from './ab-testing';
import { BookingCTA, QuickWinCTA, DemoCTA, SmartBookingCTA } from './booking/booking-cta';
import { EmailCapture } from './email-capture';

interface SmartCTAProps {
  context: {
    page: string;
    position: 'hero' | 'sidebar' | 'inline' | 'footer' | 'floating' | 'exit';
    priority?: 'primary' | 'secondary' | 'tertiary';
  };
  className?: string;
  forceCTAType?: 'quickwin' | 'demo' | 'strategy' | 'newsletter' | 'resource';
  showAlternatives?: boolean;
  abTest?: boolean;
}

export function SmartCTA({ 
  context, 
  className = "",
  forceCTAType,
  showAlternatives = false,
  abTest = true 
}: SmartCTAProps) {
  const { userContext } = useBehaviorTracking();
  const { trackCTAClick } = useEventTracking();
  const recommendation = useCTARecommendation(context);
  const [ctaVariant, setCTAVariant] = useState<string | null>(null);

  const ctaType = forceCTAType || recommendation?.ctaType || 'newsletter';
  const position = context.position;
  const priority = context.priority || 'primary';

  // Determine if this should be an A/B test
  const shouldABTest = abTest && (
    (context.page === 'home' && position === 'hero') ||
    (context.page === 'services' && position === 'hero') ||
    (context.page === 'blog' && position === 'inline')
  );

  const getTestConfig = () => {
    if (context.page === 'home' && position === 'hero') {
      return CTA_TESTS.homepage_hero;
    }
    if (context.page === 'services') {
      return CTA_TESTS.services_page;
    }
    if (context.page === 'blog') {
      return CTA_TESTS.blog_newsletter;
    }
    return null;
  };

  const handleCTAClick = (type: string, variant?: string) => {
    trackCTAClick(type, position, {
      page: context.page,
      priority,
      lead_score: userContext.leadScore,
      variant: variant || 'default',
      recommendation_confidence: recommendation?.confidence
    });
  };

  if (shouldABTest) {
    const testConfig = getTestConfig();
    if (testConfig) {
      return (
        <div className={className}>
          <ABTestCTA
            testId={testConfig.testId}
            variants={testConfig.variants}
            className="w-full"
            buttonProps={{
              size: priority === 'primary' ? 'lg' : 'default',
              onClick: () => handleCTAClick(ctaType, ctaVariant || undefined)
            }}
            onVariantSelected={setCTAVariant}
          />
        </div>
      );
    }
  }

  // Render based on CTA type and context
  if (ctaType === 'quickwin') {
    return (
      <div className={className}>
        <QuickWinCTA
          size={priority === 'primary' ? 'lg' : 'default'}
          showPrice={position === 'hero' || position === 'sidebar'}
          context={{
            page: context.page,
            source: position,
            leadScore: userContext.leadScore,
            userRole: userContext.role,
            companySize: userContext.companySize,
            timeOnSite: userContext.timeOnSite
          }}
          onClick={() => handleCTAClick('quickwin')}
        />
        
        {showAlternatives && (
          <div className="mt-3 flex gap-2">
            <DemoCTA
              size="sm"
              variant="outline"
              context={{ page: context.page, source: `${position}_alt` }}
            />
          </div>
        )}
      </div>
    );
  }

  if (ctaType === 'demo') {
    return (
      <div className={className}>
        <DemoCTA
          size={priority === 'primary' ? 'lg' : 'default'}
          showDuration={position === 'sidebar'}
          context={{
            page: context.page,
            source: position,
            leadScore: userContext.leadScore
          }}
          onClick={() => handleCTAClick('demo')}
        />
        
        {showAlternatives && userContext.leadScore > 40 && (
          <div className="mt-3">
            <QuickWinCTA
              size="sm"
              variant="outline"
              text="Or get £10k QuickWin"
              context={{ page: context.page, source: `${position}_alt` }}
            />
          </div>
        )}
      </div>
    );
  }

  if (ctaType === 'newsletter') {
    return (
      <div className={className}>
        <EmailCapture
          variant={position === 'hero' ? 'newsletter' : 'inline'}
          source={`${context.page}_${position}`}
          onSuccess={() => handleCTAClick('newsletter')}
        />
      </div>
    );
  }

  if (ctaType === 'strategy') {
    return (
      <div className={className}>
        <SmartBookingCTA
          context={{
            page: context.page,
            source: position,
            leadScore: userContext.leadScore,
            userRole: userContext.role,
            companySize: userContext.companySize,
            timeOnSite: userContext.timeOnSite
          }}
          showAlternatives={showAlternatives}
        />
      </div>
    );
  }

  // Fallback to strategy CTA
  return (
    <div className={className}>
      <BookingCTA
        bookingType="strategy"
        size={priority === 'primary' ? 'lg' : 'default'}
        context={{ page: context.page, source: position }}
        onClick={() => handleCTAClick('strategy')}
      />
    </div>
  );
}

// Context-specific CTA components
export function HeroCTA({ 
  page, 
  className = "",
  showAlternatives = true 
}: { 
  page: string; 
  className?: string; 
  showAlternatives?: boolean;
}) {
  return (
    <SmartCTA
      context={{ page, position: 'hero', priority: 'primary' }}
      className={className}
      showAlternatives={showAlternatives}
      abTest={true}
    />
  );
}

export function SidebarCTA({ 
  page, 
  className = "" 
}: { 
  page: string; 
  className?: string;
}) {
  return (
    <SmartCTA
      context={{ page, position: 'sidebar', priority: 'secondary' }}
      className={className}
      abTest={false}
    />
  );
}

export function InlineCTA({ 
  page, 
  className = "",
  forceCTAType
}: { 
  page: string; 
  className?: string;
  forceCTAType?: SmartCTAProps['forceCTAType'];
}) {
  return (
    <SmartCTA
      context={{ page, position: 'inline', priority: 'tertiary' }}
      className={className}
      forceCTAType={forceCTAType}
      abTest={page === 'blog'}
    />
  );
}

export function FooterCTA({ 
  page, 
  className = "" 
}: { 
  page: string; 
  className?: string;
}) {
  return (
    <SmartCTA
      context={{ page, position: 'footer', priority: 'secondary' }}
      className={className}
      showAlternatives={true}
      abTest={false}
    />
  );
}

// Floating CTA that appears based on user behavior
export function FloatingSmartCTA({ page }: { page: string }) {
  const { userContext } = useBehaviorTracking();
  const [showCTA, setShowCTA] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show floating CTA based on behavior
    const shouldShow = 
      !hasShown && (
        (userContext.timeOnSite > 120000 && userContext.pageViews >= 3) || // 2+ minutes, 3+ pages
        (userContext.scrollDepth > 80 && userContext.timeOnSite > 60000) || // High engagement
        (userContext.leadScore > 50) // High lead score
      );

    if (shouldShow) {
      setShowCTA(true);
      setHasShown(true);
    }
  }, [userContext, hasShown]);

  if (!showCTA) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4">
      <Card className="p-4 shadow-xl max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
            <Zap className="h-5 w-5 text-teal" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">
              {userContext.leadScore > 60 
                ? "Ready for transformation intelligence?" 
                : "Interested in learning more?"
              }
            </p>
            <SmartCTA
              context={{ page, position: 'floating', priority: 'primary' }}
              className="w-full"
            />
          </div>
          <button
            onClick={() => setShowCTA(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>
      </Card>
    </div>
  );
}

// Exit-intent CTA
export function ExitIntentCTA({ page }: { page: string }) {
  const { userContext, trackEvent } = useBehaviorTracking();
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    if (userContext.leadScore < 30) return; // Only show for engaged users

    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered && userContext.timeOnSite > 30000) {
        hasTriggered = true;
        setShowExitIntent(true);
        trackEvent('exit_intent_triggered', { page, lead_score: userContext.leadScore });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [userContext, page, trackEvent]);

  if (!showExitIntent) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4">
          <Zap className="h-8 w-8 text-orange-500" />
        </div>
        
        <h3 className="text-xl font-bold mb-2">Wait! Before you go...</h3>
        <p className="text-muted-foreground mb-6">
          {userContext.leadScore > 60 
            ? "You seem seriously interested in transformation intelligence. Get your £10k QuickWin proposal in 24 hours."
            : "Get weekly transformation insights from the consultant who built Change Radar."
          }
        </p>
        
        <SmartCTA
          context={{ page, position: 'exit', priority: 'primary' }}
          className="mb-4"
          forceCTAType={userContext.leadScore > 60 ? 'quickwin' : 'newsletter'}
        />
        
        <button
          onClick={() => setShowExitIntent(false)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          No thanks, continue browsing
        </button>
      </Card>
    </div>
  );
}

// Progress-based CTA that appears as user progresses through content
export function ProgressCTA({ 
  page, 
  triggerPercentage = 50 
}: { 
  page: string; 
  triggerPercentage?: number;
}) {
  const { userContext } = useBehaviorTracking();
  const [showProgressCTA, setShowProgressCTA] = useState(false);

  useEffect(() => {
    if (userContext.scrollDepth >= triggerPercentage && !showProgressCTA) {
      setShowProgressCTA(true);
    }
  }, [userContext.scrollDepth, triggerPercentage, showProgressCTA]);

  if (!showProgressCTA) return null;

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-teal/5 to-blue/5 border border-teal/20 rounded-lg">
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-2">
          {userContext.leadScore > 40 
            ? "Ready to take action?"
            : "Finding this helpful?"
          }
        </h4>
        <p className="text-muted-foreground mb-4">
          {userContext.leadScore > 40 
            ? "Let's discuss how this applies to your transformation program."
            : "Get more insights like this delivered weekly."
          }
        </p>
        <SmartCTA
          context={{ page, position: 'inline', priority: 'secondary' }}
          forceCTAType={userContext.leadScore > 40 ? 'demo' : 'newsletter'}
        />
      </div>
    </div>
  );
}