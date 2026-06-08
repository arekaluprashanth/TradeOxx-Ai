import { test, expect } from '@playwright/test';

test('homepage loads and is responsive', async ({ page }) => {
  await page.goto('http://localhost:5174');
  await expect(page).toHaveTitle(/TradeSpace/);

  // mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator('#root')).toBeVisible();
});
