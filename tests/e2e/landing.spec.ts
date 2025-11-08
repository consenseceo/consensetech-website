import { test, expect } from '@playwright/test';

test('hero renders and contact form exists', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: /contact/i })).toBeVisible();
});

test('copy: no "no central authority needed"', async ({ page }) => {
  await page.goto('/');
  const body = await page.textContent('body');
  expect(body?.toLowerCase()).not.toContain('no central authority needed');
});

