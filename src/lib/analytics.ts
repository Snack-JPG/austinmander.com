// Google Analytics 4 configuration for conversion tracking

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Generic event tracking
export const trackEvent = (action: string, parameters?: Record<string, any>) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;
  
  window.gtag('event', action, {
    event_category: 'engagement',
    ...parameters,
  });
};

// Conversion Events - Key business actions
export const trackConversion = {
  // QuickWin inquiries - Primary conversion goal
  quickWinInquiry: (source?: string) => {
    trackEvent('quickwin_inquiry', {
      event_category: 'conversion',
      event_label: 'quickwin_lead',
      value: 10000, // £10k value
      currency: 'GBP',
      source: source || 'unknown',
    });
  },

  // Contact form submissions
  contactSubmission: (formType?: string) => {
    trackEvent('contact_form_submit', {
      event_category: 'conversion',
      event_label: 'contact_lead',
      value: 1000, // Estimated lead value
      currency: 'GBP',
      form_type: formType || 'general',
    });
  },

  // Resource downloads - Lead generation
  resourceDownload: (resourceName: string, resourceType?: string) => {
    trackEvent('resource_download', {
      event_category: 'lead_generation',
      event_label: resourceName,
      resource_type: resourceType || 'unknown',
      value: 100, // Estimated lead value
      currency: 'GBP',
    });
  },

  // Email newsletter signups
  emailSignup: (source?: string) => {
    trackEvent('email_signup', {
      event_category: 'lead_generation',
      event_label: 'newsletter_subscribe',
      source: source || 'unknown',
    });
  },

  // Services page interactions
  servicesInquiry: (serviceType: string) => {
    trackEvent('services_inquiry', {
      event_category: 'conversion',
      event_label: serviceType,
      value: serviceType === 'quickwin' ? 10000 : 
             serviceType === 'implementation' ? 80000 : 
             serviceType === 'retainer' ? 15000 : 1000,
      currency: 'GBP',
    });
  },

  // Case study views - Engagement
  caseStudyView: (caseStudyTitle: string) => {
    trackEvent('case_study_view', {
      event_category: 'engagement',
      event_label: caseStudyTitle,
    });
  },

  // Blog article reads - Content engagement
  articleRead: (articleTitle: string, readTime?: number) => {
    trackEvent('article_read', {
      event_category: 'content_engagement',
      event_label: articleTitle,
      read_time: readTime,
    });
  },

  // Calculator usage - High-intent behavior
  calculatorUsage: (calculatorType: string, roiResult?: number) => {
    trackEvent('calculator_used', {
      event_category: 'high_intent',
      event_label: calculatorType,
      roi_result: roiResult,
      value: 500, // High-intent lead value
      currency: 'GBP',
    });
  },

  // Demo requests - High conversion intent
  demoRequest: () => {
    trackEvent('demo_request', {
      event_category: 'conversion',
      event_label: 'change_radar_demo',
      value: 5000, // High-intent lead value
      currency: 'GBP',
    });
  },
};

// Engagement tracking
export const trackEngagement = {
  // Time on page milestones
  timeOnPage: (seconds: number) => {
    if (seconds === 30 || seconds === 60 || seconds === 120 || seconds === 300) {
      trackEvent('time_on_page', {
        event_category: 'engagement',
        time_threshold: seconds,
      });
    }
  },

  // Scroll depth tracking
  scrollDepth: (percentage: number) => {
    if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 90) {
      trackEvent('scroll_depth', {
        event_category: 'engagement',
        scroll_percentage: percentage,
      });
    }
  },

  // External link clicks
  externalLinkClick: (url: string, linkText?: string) => {
    trackEvent('external_link_click', {
      event_category: 'navigation',
      link_url: url,
      link_text: linkText || url,
    });
  },

  // Video interactions (if added later)
  videoInteraction: (videoTitle: string, action: 'play' | 'pause' | 'complete') => {
    trackEvent('video_interaction', {
      event_category: 'media_engagement',
      video_title: videoTitle,
      video_action: action,
    });
  },
};

// Ecommerce tracking for service bookings (future use)
export const trackEcommerce = {
  // Service booking started
  beginCheckout: (serviceType: string, value: number) => {
    trackEvent('begin_checkout', {
      event_category: 'ecommerce',
      currency: 'GBP',
      value: value,
      items: [{
        item_id: serviceType,
        item_name: serviceType,
        category: 'consulting_service',
        quantity: 1,
        price: value,
      }],
    });
  },

  // Service booking completed
  purchase: (serviceType: string, value: number, transactionId?: string) => {
    trackEvent('purchase', {
      event_category: 'ecommerce',
      transaction_id: transactionId || Date.now().toString(),
      currency: 'GBP',
      value: value,
      items: [{
        item_id: serviceType,
        item_name: serviceType,
        category: 'consulting_service',
        quantity: 1,
        price: value,
      }],
    });
  },
};

// User identification (when email is captured)
export const identifyUser = (properties: {
  email?: string;
  userType?: string;
  industry?: string;
  companySize?: string;
}) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  // Set user properties for better segmentation
  window.gtag('config', GA_MEASUREMENT_ID, {
    user_properties: {
      user_type: properties.userType || 'prospect',
      industry: properties.industry,
      company_size: properties.companySize,
    },
  });

  // Track user identification event
  trackEvent('user_identified', {
    event_category: 'user_data',
    user_type: properties.userType || 'prospect',
  });
};

// Error tracking
export const trackError = (error: string, errorInfo?: any) => {
  trackEvent('error_occurred', {
    event_category: 'error',
    description: error,
    fatal: false,
  });
};

// A/B test tracking (for future use)
export const trackABTest = (testName: string, variant: string) => {
  trackEvent('ab_test_view', {
    event_category: 'ab_testing',
    test_name: testName,
    variant: variant,
  });
};

// Custom dimensions for business insights
export const setCustomDimensions = (dimensions: {
  visitSource?: string;
  contentType?: string;
  userJourney?: string;
}) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  Object.entries(dimensions).forEach(([key, value]) => {
    if (value) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        custom_map: { [key]: value }
      });
    }
  });
};