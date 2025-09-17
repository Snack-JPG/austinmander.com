import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test('homepage loads without image errors', async ({ page }) => {
    const imageErrors: string[] = [];
    
    // Listen for image loading errors
    page.on('response', response => {
      if (response.url().includes('image') && !response.ok()) {
        imageErrors.push(`Image failed to load: ${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/');
    
    // Wait for all images to load
    await page.waitForLoadState('networkidle');
    
    // Check that we have no image loading errors
    expect(imageErrors).toHaveLength(0);
    
    // Verify images are visible
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check that at least some images are visible
      const visibleImages = await images.filter({ hasText: '', hasNotText: 'placeholder' }).count();
      expect(visibleImages).toBeGreaterThan(0);
    }
  });

  test('project cards display properly', async ({ page }) => {
    await page.goto('/work');
    
    // Wait for content to load
    await page.waitForSelector('[data-slot="card"]', { timeout: 10000 });
    
    // Check that project cards exist
    const projectCards = page.locator('[data-slot="card"]');
    await expect(projectCards.first()).toBeVisible();
    
    // Check for images in project cards
    const cardImages = page.locator('[data-slot="card"] img');
    const cardImageCount = await cardImages.count();
    
    if (cardImageCount > 0) {
      await expect(cardImages.first()).toBeVisible();
    }
  });
});