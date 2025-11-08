import { test, expect } from '@playwright/test';

test('hero renders and contact form exists', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  // Look for contact link or button - more flexible selector for the actual contact element
  await expect(page.getByText(/contact|talk to us/i)).toBeVisible();
});

test('copy: disclaimers present for accuracy', async ({ page }) => {
  await page.goto('/');
  const body = await page.textContent('body');
  // Ensure we have proper disclaimers and don't make false claims
  expect(body?.toLowerCase()).toContain('cvc');
  expect(body?.toLowerCase()).toContain('consent');
});

