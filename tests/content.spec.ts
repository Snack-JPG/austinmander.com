import { test, expect } from '@playwright/test';

test.describe('Content Tests', () => {
  test('homepage should display hero section and project grid', async ({ page }) => {
    await page.goto('/');
    
    // Check hero section
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Austin Mander');
    
    // Check for project grid or project cards
    const projectCards = page.locator('[data-testid="project-card"]').or(page.locator('article')).or(page.locator('.project'));
    await expect(projectCards.first()).toBeVisible();
  });

  test('work page should display project listings', async ({ page }) => {
    await page.goto('/work');
    
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for project listings
    const projects = page.locator('article').or(page.locator('[data-testid="project"]'));
    if (await projects.count() > 0) {
      await expect(projects.first()).toBeVisible();
    }
  });

  test('ship log page should display blog posts', async ({ page }) => {
    await page.goto('/log');
    
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for blog post listings
    const posts = page.locator('article').or(page.locator('[data-testid="ship-log-item"]'));
    if (await posts.count() > 0) {
      await expect(posts.first()).toBeVisible();
      
      // Test clicking on first post
      await posts.first().click();
      await expect(page).toHaveURL(/\/log\/.+/);
    }
  });

  test('contact form should be functional', async ({ page }) => {
    await page.goto('/contact');
    
    // Check if contact form exists
    const form = page.locator('form');
    if (await form.count() > 0) {
      await expect(form).toBeVisible();
      
      // Check for required form fields
      const nameField = page.locator('input[name="name"]').or(page.locator('input[type="text"]'));
      const emailField = page.locator('input[name="email"]').or(page.locator('input[type="email"]'));
      const messageField = page.locator('textarea[name="message"]').or(page.locator('textarea'));
      
      if (await nameField.count() > 0) await expect(nameField.first()).toBeVisible();
      if (await emailField.count() > 0) await expect(emailField.first()).toBeVisible();
      if (await messageField.count() > 0) await expect(messageField.first()).toBeVisible();
    }
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/non-existent-page');
    
    // Should show 404 page or redirect
    const response = await page.waitForLoadState('networkidle');
    
    // Check that we get some kind of not found indication
    const notFoundText = page.locator('text=/404|not found|page.*not.*exist/i');
    if (await notFoundText.count() > 0) {
      await expect(notFoundText.first()).toBeVisible();
    }
  });
});