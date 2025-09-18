import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.locator('button[type="submit"]').click();
    
    // Check for validation messages
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('required', '');
    
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('required', '');
    
    const messageInput = page.locator('textarea[name="message"]');
    await expect(messageInput).toHaveAttribute('required', '');
  });

  test('should validate email format', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('textarea[name="message"]', 'Test message');
    
    const emailInput = page.locator('input[name="email"]');
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);
  });

  test('should submit form successfully', async ({ page }) => {
    // Intercept the API call
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: true, 
          message: 'Thank you for contacting us!' 
        }),
      });
    });

    // Fill the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message with sufficient length');
    
    // Submit the form
    await page.locator('button[type="submit"]').click();
    
    // Check for success message
    await expect(page.locator('text=/Thank you|Success|sent/i')).toBeVisible({ timeout: 10000 });
  });

  test('should handle server errors gracefully', async ({ page }) => {
    // Intercept the API call to simulate error
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    // Fill and submit the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message');
    await page.locator('button[type="submit"]').click();
    
    // Check for error message
    await expect(page.locator('text=/error|failed|try again/i')).toBeVisible({ timeout: 10000 });
  });

  test('should handle rate limiting', async ({ page }) => {
    // Intercept the API call to simulate rate limiting
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(Date.now() + 60000).toISOString(),
        },
        body: JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          retryAfter: 60 
        }),
      });
    });

    // Fill and submit the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message');
    await page.locator('button[type="submit"]').click();
    
    // Check for rate limit message
    await expect(page.locator('text=/too many|rate limit|try again later/i')).toBeVisible({ timeout: 10000 });
  });
});