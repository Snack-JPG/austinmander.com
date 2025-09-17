import { test, expect } from '@playwright/test';

test.describe('Simple Tests', () => {
  test('basic playwright setup works', async ({ page }) => {
    // Test that Playwright can navigate and interact with the page
    await page.goto('/');
    
    // Basic checks that the page loads
    await expect(page).toHaveTitle(/Austin Mander/);
    await expect(page.locator('body')).toBeVisible();
  });
  
  test('homepage has main content elements', async ({ page }) => {
    await page.goto('/');
    
    // Check for basic page structure
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main').or(page.locator('[role="main"]'))).toBeVisible();
  });
});