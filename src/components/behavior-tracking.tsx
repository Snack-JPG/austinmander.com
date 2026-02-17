"use client";

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  initializeSession, 
  trackPageView, 
  trackScrollDepth, 
  trackEvent, 
  trackTimeOnSite,
  trackExitIntent,
  getUserContext,
  updateUserProfile,
  type UserContext 
} from '@/lib/user-behavior';
import { 
  getCTARecommendation,
  type CTARecommendation 
} from '@/lib/cta-optimization';

interface BehaviorContextType {
  sessionId: string;
  userContext: UserContext;
  trackEvent: (event: string, properties?: Record<string, any>) => void;
  updateProfile: (profile: any) => void;
  getCTARecommendation: (pageContext: { page: string; position: string }) => CTARecommendation;
  isLoading: boolean;
}

const BehaviorContext = createContext<BehaviorContextType | null>(null);

export function BehaviorTrackingProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = useState(() => generateSessionId());
  const [userContext, setUserContext] = useState<UserContext>({
    sessionId: '',
    pageViews: 0,
    timeOnSite: 0,
    scrollDepth: 0,
    previousPages: [],
    leadScore: 0,
    interactions: [],
    emailSubscriber: false,
    hasDownloadedResource: false,
    hasUsedCalculator: false,
    device: 'desktop'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize session on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    
    // Only add UTM params if they exist
    const utm_source = urlParams.get('utm_source');
    const utm_medium = urlParams.get('utm_medium');
    const utm_campaign = urlParams.get('utm_campaign');
    const utm_content = urlParams.get('utm_content');
    const utm_term = urlParams.get('utm_term');
    
    if (utm_source) utmParams.utm_source = utm_source;
    if (utm_medium) utmParams.utm_medium = utm_medium;
    if (utm_campaign) utmParams.utm_campaign = utm_campaign;
    if (utm_content) utmParams.utm_content = utm_content;
    if (utm_term) utmParams.utm_term = utm_term;

    initializeSession(sessionId, {
      source: urlParams.get('ref') || urlParams.get('utm_source') || document.referrer || 'direct',
      utmParams: Object.keys(utmParams).length > 0 ? utmParams : undefined,
      device: getDeviceType(),
      location: getUserLocation()
    });

    setIsLoading(false);
  }, [sessionId]);

  // Track page views
  useEffect(() => {
    if (isLoading) return;

    const page = getPageName(pathname);
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    trackPageView(sessionId, page, url);
    updateUserContextState();
  }, [pathname, searchParams, sessionId, isLoading]);

  // Track scroll depth
  useEffect(() => {
    if (isLoading) return;

    let maxScrollDepth = 0;
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = documentHeight > 0 ? Math.round((scrollTop / documentHeight) * 100) : 0;

      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Debounce scroll tracking
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          trackScrollDepth(sessionId, maxScrollDepth);
          updateUserContextState();
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [sessionId, isLoading]);

  // Track time on site milestones
  useEffect(() => {
    if (isLoading) return;

    const intervals = [60000, 180000, 300000, 600000]; // 1min, 3min, 5min, 10min
    const timers: NodeJS.Timeout[] = [];

    intervals.forEach(interval => {
      const timer = setTimeout(() => {
        trackTimeOnSite(sessionId);
        updateUserContextState();
      }, interval);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [sessionId, isLoading]);

  // Track exit intent
  useEffect(() => {
    if (isLoading) return;

    let hasTriggeredExitIntent = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggeredExitIntent) {
        hasTriggeredExitIntent = true;
        trackExitIntent(sessionId);
        updateUserContextState();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [sessionId, isLoading]);

  const updateUserContextState = useCallback(() => {
    const context = getUserContext(sessionId);
    setUserContext(context);
  }, [sessionId]);

  const handleTrackEvent = useCallback((event: string, properties: Record<string, any> = {}) => {
    trackEvent(sessionId, event, properties);
    updateUserContextState();
  }, [sessionId, updateUserContextState]);

  const handleUpdateProfile = useCallback((profile: any) => {
    updateUserProfile(sessionId, profile);
    updateUserContextState();
  }, [sessionId, updateUserContextState]);

  const handleGetCTARecommendation = useCallback((pageContext: { page: string; position: string }) => {
    return getCTARecommendation(userContext, pageContext);
  }, [userContext]);

  const contextValue: BehaviorContextType = {
    sessionId,
    userContext,
    trackEvent: handleTrackEvent,
    updateProfile: handleUpdateProfile,
    getCTARecommendation: handleGetCTARecommendation,
    isLoading
  };

  return (
    <BehaviorContext.Provider value={contextValue}>
      {children}
    </BehaviorContext.Provider>
  );
}

export function useBehaviorTracking() {
  const context = useContext(BehaviorContext);
  if (!context) {
    throw new Error('useBehaviorTracking must be used within a BehaviorTrackingProvider');
  }
  return context;
}

// Hook for tracking specific events with convenience
export function useEventTracking() {
  const { trackEvent } = useBehaviorTracking();

  return {
    trackCTAClick: (ctaType: string, position: string, additionalProps: Record<string, any> = {}) => {
      trackEvent('cta_click', { cta_type: ctaType, position, ...additionalProps });
    },
    
    trackResourceDownload: (resourceName: string, resourceType: string) => {
      trackEvent('resource_download', { resource_name: resourceName, resource_type: resourceType });
    },
    
    trackCalculatorUsage: (calculatorType: string, result?: number) => {
      trackEvent('calculator_used', { calculator_type: calculatorType, result });
    },
    
    trackEmailSignup: (source: string, leadMagnet?: string) => {
      trackEvent('email_signup', { source, lead_magnet: leadMagnet });
    },
    
    trackDemoRequest: (source: string) => {
      trackEvent('demo_request', { source });
    },
    
    trackQuickWinInquiry: (source: string, formData?: Record<string, any>) => {
      trackEvent('quickwin_inquiry', { source, ...formData });
    },
    
    trackContentEngagement: (contentType: string, contentTitle: string, engagementType: string) => {
      trackEvent('content_engagement', { 
        content_type: contentType, 
        content_title: contentTitle, 
        engagement_type: engagementType 
      });
    },
    
    trackSearchUsage: (query: string, resultsCount: number) => {
      trackEvent('search_used', { query, results_count: resultsCount });
    }
  };
}

// Hook for getting smart CTA recommendations
export function useCTARecommendation(pageContext: { page: string; position: string }) {
  const { getCTARecommendation, userContext } = useBehaviorTracking();
  const [recommendation, setRecommendation] = useState<CTARecommendation | null>(null);

  useEffect(() => {
    const rec = getCTARecommendation(pageContext);
    setRecommendation(rec);
  }, [userContext, pageContext.page, pageContext.position, getCTARecommendation]);

  return recommendation;
}

// Hook for user context and lead scoring
export function useUserContext() {
  const { userContext } = useBehaviorTracking();
  return userContext;
}

// Component for tracking form submissions
export function FormTracker({ 
  formType, 
  children, 
  onSubmit 
}: { 
  formType: string; 
  children: React.ReactNode;
  onSubmit?: (data: any) => void;
}) {
  const { trackEvent } = useBehaviorTracking();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    trackEvent('form_submission', { 
      form_type: formType, 
      ...data 
    });
    
    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

// Component for tracking link clicks
export function TrackedLink({ 
  href, 
  linkType, 
  children, 
  className,
  ...props 
}: { 
  href: string; 
  linkType: string; 
  children: React.ReactNode; 
  className?: string;
  [key: string]: any;
}) {
  const { trackEvent } = useBehaviorTracking();

  const handleClick = () => {
    trackEvent('link_click', { 
      link_type: linkType, 
      destination: href 
    });
  };

  return (
    <a 
      href={href} 
      className={className} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}

// Utility functions
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getUserLocation(): string | undefined {
  // In production, you might use a geolocation service
  // For now, return undefined
  return undefined;
}

function getPageName(pathname: string): string {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/blog/')) return 'blog_post';
  if (pathname.startsWith('/case-studies/')) return 'case_study';
  if (pathname.startsWith('/resources/')) return 'resource';
  
  // Remove leading slash and use the first segment
  const segments = pathname.substring(1).split('/');
  return segments[0] || 'unknown';
}