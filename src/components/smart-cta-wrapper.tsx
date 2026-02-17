"use client";

import { usePathname } from 'next/navigation';
import { FloatingSmartCTA, ExitIntentCTA } from './smart-cta';

export function SmartCTAWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Extract page name from pathname
  const getPageName = (path: string): string => {
    if (path === '/') return 'home';
    if (path.startsWith('/blog/')) return 'blog_post';
    if (path.startsWith('/case-studies/')) return 'case_study';
    if (path.startsWith('/resources/')) return 'resource';
    
    // Remove leading slash and use the first segment
    const segments = path.substring(1).split('/');
    return segments[0] || 'unknown';
  };

  const pageName = getPageName(pathname);

  // Don't show floating CTAs on certain pages
  const excludeFloatingCTA = [
    'book', 
    'demo', 
    'contact',
    'thank-you',
    'unsubscribe'
  ].includes(pageName);

  // Don't show exit intent on certain pages
  const excludeExitIntent = [
    'book',
    'thank-you',
    'unsubscribe'
  ].includes(pageName);

  return (
    <>
      {children}
      
      {/* Floating CTA - appears based on user behavior */}
      {!excludeFloatingCTA && (
        <FloatingSmartCTA page={pageName} />
      )}
      
      {/* Exit Intent CTA - appears when user tries to leave */}
      {!excludeExitIntent && (
        <ExitIntentCTA page={pageName} />
      )}
    </>
  );
}