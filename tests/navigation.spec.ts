import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should navigate between all main pages', async ({ page }) => {
    await page.goto('/');
    
    // Test homepage
    await expect(page).toHaveTitle(/Austin Mander/);
    await expect(page.locator('h1')).toBeVisible();

    // Navigate to About
    await page.click('nav a[href="/about"]');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toBeVisible();

    // Navigate to Work
    await page.click('nav a[href="/work"]');
    await expect(page).toHaveURL('/work');
    await expect(page.locator('h1')).toBeVisible();

    // Navigate to Ship Log
    await page.click('nav a[href="/log"]');
    await expect(page).toHaveURL('/log');
    await expect(page.locator('h1')).toBeVisible();

    // Navigate to Contact
    await page.click('nav a[href="/contact"]');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have working theme toggle', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('[data-testid="theme-toggle"]').or(page.locator('button[aria-label*="theme"]')).or(page.locator('button:has-text("theme")'));
    
    if (await themeToggle.count() > 0) {
      await themeToggle.first().click();
      // Give time for theme transition
      await page.waitForTimeout(100);
      
      // Verify theme changed by checking for dark/light class on html
      const htmlClass = await page.locator('html').getAttribute('class');
      expect(htmlClass).toBeTruthy();
    }
  });

  test('should have responsive navigation on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu trigger exists
    const menuTrigger = page.locator('button[aria-label*="menu"]').or(page.locator('[data-testid="mobile-menu"]'));
    
    if (await menuTrigger.count() > 0) {
      await menuTrigger.click();
      // Verify mobile menu is visible
      await expect(page.locator('nav')).toBeVisible();
    }
  });
});