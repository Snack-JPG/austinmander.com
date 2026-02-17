"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  getCTAVariant, 
  trackCTAInteraction, 
  type CTAVariant 
} from '@/lib/cta-optimization';
import { useBehaviorTracking } from './behavior-tracking';

interface ABTestProps {
  testId: string;
  children: (variant: CTAVariant | null, trackClick: () => void, trackConversion: () => void) => React.ReactNode;
  fallback?: React.ReactNode;
}

export function ABTest({ testId, children, fallback }: ABTestProps) {
  const { sessionId, userContext } = useBehaviorTracking();
  const [variant, setVariant] = useState<CTAVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    const selectedVariant = getCTAVariant(testId, sessionId, userContext);
    setVariant(selectedVariant);
    setIsLoading(false);
  }, [testId, sessionId, userContext]);

  const trackClick = useCallback(() => {
    if (variant) {
      trackCTAInteraction({
        sessionId,
        testId,
        variantId: variant.id,
        action: 'click',
        timestamp: new Date(),
        context: userContext
      });
    }
  }, [sessionId, testId, variant, userContext]);

  const trackConversion = useCallback(() => {
    if (variant) {
      trackCTAInteraction({
        sessionId,
        testId,
        variantId: variant.id,
        action: 'conversion',
        timestamp: new Date(),
        context: userContext
      });
    }
  }, [sessionId, testId, variant, userContext]);

  if (isLoading) {
    return fallback || null;
  }

  if (!variant) {
    return fallback || null;
  }

  return <>{children(variant, trackClick, trackConversion)}</>;
}

// Simplified A/B test component for CTA text testing
export function ABTestCTA({ 
  testId, 
  variants, 
  buttonProps = {},
  className = "",
  onVariantSelected,
  onConversion
}: {
  testId: string;
  variants: Array<{
    id: string;
    text: string;
    style?: string;
    color?: string;
    icon?: React.ReactNode;
  }>;
  buttonProps?: Record<string, any>;
  className?: string;
  onVariantSelected?: (variantId: string) => void;
  onConversion?: () => void;
}) {
  const { sessionId } = useBehaviorTracking();
  const [selectedVariant, setSelectedVariant] = useState<typeof variants[0] | null>(null);

  useEffect(() => {
    if (variants.length === 0 || !sessionId) return;

    // Simple variant selection based on session ID hash
    const hash = hashString(sessionId + testId);
    const variantIndex = hash % variants.length;
    const variant = variants[variantIndex];
    
    setSelectedVariant(variant);
    onVariantSelected?.(variant.id);

    // Track impression
    trackCTAInteraction({
      sessionId,
      testId,
      variantId: variant.id,
      action: 'impression',
      timestamp: new Date(),
      context: { test_id: testId }
    });
  }, [testId, sessionId, variants, onVariantSelected]);

  const handleClick = () => {
    if (selectedVariant) {
      trackCTAInteraction({
        sessionId,
        testId,
        variantId: selectedVariant.id,
        action: 'click',
        timestamp: new Date(),
        context: { test_id: testId }
      });
    }
    
    buttonProps.onClick?.();
  };

  const handleConversion = () => {
    if (selectedVariant) {
      trackCTAInteraction({
        sessionId,
        testId,
        variantId: selectedVariant.id,
        action: 'conversion',
        timestamp: new Date(),
        context: { test_id: testId }
      });
    }
    
    onConversion?.();
  };

  if (!selectedVariant) return null;

  return (
    <button
      {...buttonProps}
      className={`${className} ${selectedVariant.style || ''} ${selectedVariant.color || ''}`}
      onClick={handleClick}
      data-testid={`ab-test-${testId}`}
      data-variant={selectedVariant.id}
    >
      {selectedVariant.icon}
      {selectedVariant.text}
    </button>
  );
}

// Hook for programmatic A/B testing
export function useABTest(testId: string, variants: string[]) {
  const { sessionId } = useBehaviorTracking();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  useEffect(() => {
    if (variants.length === 0 || !sessionId) return;

    const hash = hashString(sessionId + testId);
    const variantIndex = hash % variants.length;
    const variant = variants[variantIndex];
    
    setSelectedVariant(variant);

    // Track impression
    trackCTAInteraction({
      sessionId,
      testId,
      variantId: variant,
      action: 'impression',
      timestamp: new Date(),
      context: { test_id: testId }
    });
  }, [testId, sessionId, variants]);

  const trackEvent = useCallback((action: 'click' | 'conversion') => {
    if (selectedVariant) {
      trackCTAInteraction({
        sessionId,
        testId,
        variantId: selectedVariant,
        action,
        timestamp: new Date(),
        context: { test_id: testId }
      });
    }
  }, [sessionId, testId, selectedVariant]);

  return {
    variant: selectedVariant,
    trackClick: () => trackEvent('click'),
    trackConversion: () => trackEvent('conversion')
  };
}

// Multi-variant testing component
export function MultiVariantTest({
  testId,
  variants,
  children
}: {
  testId: string;
  variants: Record<string, any>;
  children: (variant: { id: string; props: any }, trackClick: () => void, trackConversion: () => void) => React.ReactNode;
}) {
  const variantIds = Object.keys(variants);
  const { variant, trackClick, trackConversion } = useABTest(testId, variantIds);

  if (!variant || !variants[variant]) {
    return null;
  }

  return (
    <>
      {children(
        { id: variant, props: variants[variant] },
        trackClick,
        trackConversion
      )}
    </>
  );
}

// Component for testing entire page sections
export function PageSectionTest({
  testId,
  sections,
  fallback
}: {
  testId: string;
  sections: Record<string, React.ReactNode>;
  fallback?: React.ReactNode;
}) {
  const sectionIds = Object.keys(sections);
  const { variant } = useABTest(testId, sectionIds);

  if (!variant || !sections[variant]) {
    return fallback || null;
  }

  return <>{sections[variant]}</>;
}

// Testing configuration for common CTA tests
export const CTA_TESTS = {
  homepage_hero: {
    testId: 'homepage_hero_cta',
    variants: [
      { id: 'direct', text: 'Get £10k QuickWin', style: 'btn-primary', color: 'orange' },
      { id: 'action', text: 'Start Your QuickWin', style: 'btn-primary', color: 'orange' },
      { id: 'outcome', text: 'Surface Hidden Risks', style: 'btn-primary', color: 'teal' }
    ]
  },
  
  services_page: {
    testId: 'services_page_cta',
    variants: [
      { id: 'price_focused', text: 'Get £10k QuickWin', style: 'btn-primary' },
      { id: 'time_focused', text: 'Get Results in 2 Weeks', style: 'btn-primary' },
      { id: 'benefit_focused', text: 'Stop Guessing, Start Steering', style: 'btn-primary' }
    ]
  },

  blog_newsletter: {
    testId: 'blog_newsletter_cta',
    variants: [
      { id: 'community', text: 'Join 5,000+ Leaders', style: 'btn-outline' },
      { id: 'value', text: 'Get Weekly Insights', style: 'btn-outline' },
      { id: 'urgency', text: 'Don\'t Miss Next Week\'s Insight', style: 'btn-outline' }
    ]
  },

  demo_secondary: {
    testId: 'demo_secondary_cta',
    variants: [
      { id: 'product', text: 'See Change Radar Demo', style: 'btn-secondary' },
      { id: 'benefit', text: 'See Transformation Intelligence', style: 'btn-secondary' },
      { id: 'social_proof', text: 'See What HSBC Uses', style: 'btn-secondary' }
    ]
  }
};

// Utility function for consistent hashing
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Admin component for viewing test results (development only)
export function ABTestResults({ testId }: { testId: string }) {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    // In development, you might fetch test results from an API
    // For now, this is a placeholder
    setResults({
      testId,
      status: 'running',
      variants: [],
      message: 'Test results would be displayed here in a real implementation'
    });
  }, [testId]);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg p-4 shadow-lg max-w-sm">
      <h4 className="font-semibold text-sm mb-2">A/B Test: {testId}</h4>
      <p className="text-xs text-gray-600">{results?.message}</p>
    </div>
  );
}