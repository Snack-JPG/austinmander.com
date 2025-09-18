import { test, expect } from '@playwright/test';

test.describe('Security', () => {
  test('should have security headers', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers();
    
    if (headers) {
      // Check for essential security headers
      expect(headers['x-frame-options']).toBe('DENY');
      expect(headers['x-content-type-options']).toBe('nosniff');
      expect(headers['x-xss-protection']).toBe('1; mode=block');
      expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
      expect(headers['permissions-policy']).toContain('camera=()');
      
      // Check for CSP header
      expect(headers['content-security-policy']).toBeTruthy();
      
      // Check for HSTS in production
      if (process.env.NODE_ENV === 'production') {
        expect(headers['strict-transport-security']).toContain('max-age=');
      }
    }
  });

  test('should have proper CSP directives', async ({ page }) => {
    const response = await page.goto('/');
    const csp = response?.headers()['content-security-policy'];
    
    if (csp) {
      // Check for important CSP directives
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("script-src");
      expect(csp).toContain("style-src");
      expect(csp).toContain("img-src");
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("base-uri 'self'");
      expect(csp).toContain("form-action 'self'");
    }
  });

  test('should not expose sensitive information', async ({ page }) => {
    await page.goto('/');
    
    // Check that no sensitive env variables are exposed in HTML
    const content = await page.content();
    expect(content).not.toContain('SUPABASE_SERVICE_ROLE_KEY');
    expect(content).not.toContain('RESEND_API_KEY');
    expect(content).not.toContain('ADMIN_PASSWORD');
    expect(content).not.toContain('DATABASE_URL');
    expect(content).not.toContain('SESSION_SECRET');
  });

  test('should handle CORS properly for API routes', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: {
        name: 'Test',
        email: 'test@example.com',
        message: 'Test message',
      },
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://malicious-site.com',
      },
    });
    
    // Should either reject or handle CORS properly
    const headers = await response.headers();
    const corsHeader = headers['access-control-allow-origin'];
    
    if (corsHeader) {
      // Should not allow all origins
      expect(corsHeader).not.toBe('*');
      // Should only allow the configured site URL
      expect(corsHeader).toMatch(/localhost:3000|austinmander\.com/);
    }
  });

  test('should validate content type on API routes', async ({ page }) => {
    const response = await page.request.post('/api/contact', {
      data: 'plain text data',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    
    // Should reject non-JSON content type
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('Content-Type');
  });

  test('should handle XSS attempts', async ({ page }) => {
    const xssPayloads = [
      '<script>alert("XSS")</script>',
      'javascript:alert("XSS")',
      '<img src=x onerror=alert("XSS")>',
      '<svg onload=alert("XSS")>',
    ];
    
    for (const payload of xssPayloads) {
      const response = await page.request.post('/api/contact', {
        data: {
          name: payload,
          email: 'test@example.com',
          message: 'Test message with XSS attempt',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // API should accept the data but sanitize it
      // Check that response doesn't reflect the script
      const body = await response.text();
      expect(body).not.toContain('<script>');
      expect(body).not.toContain('javascript:');
      expect(body).not.toContain('onerror=');
      expect(body).not.toContain('onload=');
    }
  });

  test('should enforce rate limiting', async ({ page }) => {
    const requests = [];
    
    // Send multiple rapid requests
    for (let i = 0; i < 10; i++) {
      requests.push(
        page.request.post('/api/contact', {
          data: {
            name: `Test ${i}`,
            email: `test${i}@example.com`,
            message: `Test message ${i}`,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    }
    
    const responses = await Promise.all(requests);
    const statuses = responses.map(r => r.status());
    
    // Some requests should be rate limited
    expect(statuses).toContain(429);
  });
});