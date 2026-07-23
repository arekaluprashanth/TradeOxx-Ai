import { test, expect } from '@playwright/test';

test.describe('Authentication Journey', () => {
  test('User can navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    // Expect the title to contain TradeOXX
    await expect(page).toHaveTitle(/TradeOXX/i);

    // Look for login link
    const loginLink = page.getByRole('link', { name: /login/i });
    if (await loginLink.isVisible()) {
      await loginLink.click();
      await expect(page).toHaveURL(/.*login/);
    }
  });

  test('User can navigate to register page', async ({ page }) => {
    await page.goto('/');
    
    // Look for get started / register link
    const registerLink = page.getByRole('link', { name: /get started|register/i }).first();
    if (await registerLink.isVisible()) {
      await registerLink.click();
      await expect(page).toHaveURL(/.*register/);
    }
  });
});
