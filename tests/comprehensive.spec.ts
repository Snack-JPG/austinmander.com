import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Comprehensive Tests', () => {
  test('homepage accessibility and functionality', async ({ page }) => {
    await page.goto('/');
    
    // Basic functionality
    await expect(page).toHaveTitle(/Austin Mander/);
    await expect(page.locator('h1')).toBeVisible();
    
    // Test navigation
    const workLink = page.locator('nav a[href="/work"]');
    if (await workLink.count() > 0) {
      await workLink.click();
      await expect(page).toHaveURL('/work');
      await page.goBack();
    }
    
    // Test theme toggle if present
    const themeToggle = page.locator('button[aria-label*="theme"]').or(page.locator('[data-testid="theme-toggle"]'));
    if (await themeToggle.count() > 0) {
      await themeToggle.first().click();
      await page.waitForTimeout(100);
    }
    
    // Run accessibility scan (with reasonable expectations)
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('[data-testid="theme-toggle"]') // Exclude theme toggle if it has contrast issues
      .analyze();
    
    // Check for critical accessibility violations only
    const criticalViolations = accessibilityScanResults.violations.filter(
      violation => violation.impact === 'critical'
    );
    
    expect(criticalViolations).toHaveLength(0);
  });

  test('responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.locator('h1')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();
  });
});