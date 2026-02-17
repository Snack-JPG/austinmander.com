'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { initGA, pageview, GA_MEASUREMENT_ID } from '@/lib/analytics';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    
    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  // Don't load analytics in development
  if (process.env.NODE_ENV === 'development' || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      
      {/* Initialize GA */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              // Enhanced measurement
              allow_enhanced_conversions: true,
              allow_google_signals: true,
              // Conversion tracking
              send_page_view: false // We handle this manually
            });
          `,
        }}
      />

      {/* Conversion Tracking Setup */}
      <Script
        id="conversion-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Configure conversion events
            gtag('config', '${GA_MEASUREMENT_ID}', {
              // QuickWin inquiry conversion
              'custom_map.quickwin_inquiry': 'quickwin_conversion',
              // Contact form conversion  
              'custom_map.contact_submission': 'contact_conversion',
              // Resource download conversion
              'custom_map.resource_download': 'lead_conversion',
              // Email signup conversion
              'custom_map.email_signup': 'email_conversion'
            });
          `,
        }}
      />
    </>
  );
}

// Hook for tracking scroll depth
export function useScrollTracking() {
  useEffect(() => {
    let ticking = false;
    let maxScroll = 0;

    const trackScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestone percentages
        if (scrollPercent >= 25 && maxScroll < 25) {
          import('@/lib/analytics').then(({ trackEngagement }) => {
            trackEngagement.scrollDepth(25);
          });
        } else if (scrollPercent >= 50 && maxScroll < 50) {
          import('@/lib/analytics').then(({ trackEngagement }) => {
            trackEngagement.scrollDepth(50);
          });
        } else if (scrollPercent >= 75 && maxScroll < 75) {
          import('@/lib/analytics').then(({ trackEngagement }) => {
            trackEngagement.scrollDepth(75);
          });
        } else if (scrollPercent >= 90 && maxScroll < 90) {
          import('@/lib/analytics').then(({ trackEngagement }) => {
            trackEngagement.scrollDepth(90);
          });
        }
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(trackScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    return () => window.removeEventListener('scroll', requestTick);
  }, []);
}

// Hook for tracking time on page
export function useTimeTracking() {
  useEffect(() => {
    const startTime = Date.now();
    const intervals: NodeJS.Timeout[] = [];

    // Track time milestones
    intervals.push(
      setTimeout(() => {
        import('@/lib/analytics').then(({ trackEngagement }) => {
          trackEngagement.timeOnPage(30);
        });
      }, 30000)
    );

    intervals.push(
      setTimeout(() => {
        import('@/lib/analytics').then(({ trackEngagement }) => {
          trackEngagement.timeOnPage(60);
        });
      }, 60000)
    );

    intervals.push(
      setTimeout(() => {
        import('@/lib/analytics').then(({ trackEngagement }) => {
          trackEngagement.timeOnPage(120);
        });
      }, 120000)
    );

    intervals.push(
      setTimeout(() => {
        import('@/lib/analytics').then(({ trackEngagement }) => {
          trackEngagement.timeOnPage(300);
        });
      }, 300000)
    );

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, []);
}