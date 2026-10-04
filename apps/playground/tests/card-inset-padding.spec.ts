import { test, expect } from '@playwright/test';

test('Card content aligns with an Inset using equivalent padding', async ({ page }) => {
  await page.goto('/test/card-inset-padding');

  for (const variant of ['surface', 'classic', 'ghost']) {
    for (const size of ['1', '2', '3', '4', '5']) {
      const body = await page.getByTestId(`${variant}-${size}-body`).boundingBox();
      const panel = await page.getByTestId(`${variant}-${size}-panel`).boundingBox();
      expect(body).not.toBeNull();
      expect(panel).not.toBeNull();
      expect(panel!.x, `${variant} size ${size}: left alignment`).toBeCloseTo(body!.x, 1);
      expect(panel!.width, `${variant} size ${size}: right alignment`).toBeCloseTo(body!.width, 1);
    }
  }
});
