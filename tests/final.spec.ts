import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Production Ready Tests', () => {
  test('homepage loads and has correct structure', async ({ page }) => {
    await page.goto('/');
    
    // Core functionality tests
    await expect(page).toHaveTitle(/Austin Mander/);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main').or(page.locator('[role="main"]'))).toBeVisible();
  });

  test('all main pages are accessible', async ({ page }) => {
    const pages = ['/', '/about', '/work', '/contact', '/log'];
    
    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      
      // Basic accessibility check (non-critical violations only)
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a'])
        .exclude('[data-zone]') // Exclude any external widgets
        .analyze();
      
      const criticalViolations = accessibilityScanResults.violations.filter(
        violation => violation.impact === 'critical'
      );
      
      expect(criticalViolations, `Critical accessibility violations on ${path}`).toHaveLength(0);
    }
  });

  test('responsive design works on different viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('SEO meta tags are present', async ({ page }) => {
    await page.goto('/');
    
    // Check for essential SEO elements
    await expect(page.locator('title')).not.toBeEmpty();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});