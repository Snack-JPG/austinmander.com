import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/Austin Mander/);
    
    // Check for main content
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Test About link
    const aboutLink = page.locator('a[href="/about"]').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL('/about');
    }
    
    // Go back to homepage
    await page.goto('/');
    
    // Test Contact link
    const contactLink = page.locator('a[href="/contact"]').first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page).toHaveURL('/contact');
    }
  });

  test('should have proper meta tags', async ({ page }) => {
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toBeTruthy();
    
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toBeTruthy();
    
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    expect(ogDescription).toBeTruthy();
  });

  test('should be responsive', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });
});