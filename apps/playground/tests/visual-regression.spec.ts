import { test, expect } from '@playwright/test';

test.describe('visual regression', () => {
  test('/test/appearance', async ({ page }) => {
    await page.goto('/test/appearance');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('appearance.png', {
      fullPage: true,
    });
  });

  test('/test/as-child', async ({ page }) => {
    await page.goto('/test/as-child');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('as-child.png', {
      fullPage: true,
    });
  });

  test('/test/avatar', async ({ page }) => {
    await page.goto('/test/avatar');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('avatar.png', {
      fullPage: true,
    });
  });

  test('/test/checkbox-card', async ({ page }) => {
    await page.goto('/test/checkbox-card');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('checkbox-card.png', {
      fullPage: true,
    });
  });

  test('/test/classic-button', async ({ page }) => {
    await page.goto('/test/classic-button');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('classic-button.png', {
      fullPage: true,
    });
  });

  test('/test/data-list', async ({ page }) => {
    await page.goto('/test/data-list');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('data-list.png', {
      fullPage: true,
    });
  });

  test('/test/dialog', async ({ page }) => {
    await page.goto('/test/dialog');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dialog.png', {
      fullPage: true,
    });
  });

  test('/test/grid-align-content', async ({ page }) => {
    await page.goto('/test/grid-align-content');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('grid-align-content.png', {
      fullPage: true,
    });
  });

  test('/test/grid-align-self', async ({ page }) => {
    await page.goto('/test/grid-align-self');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('grid-align-self.png', {
      fullPage: true,
    });
  });

  test('/test/grid-area', async ({ page }) => {
    await page.goto('/test/grid-area');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('grid-area.png', {
      fullPage: true,
    });
  });

  test('/test/grid-justify-items', async ({ page }) => {
    await page.goto('/test/grid-justify-items');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('grid-justify-items.png', {
      fullPage: true,
    });
  });

  test('/test/grid-justify-self', async ({ page }) => {
    await page.goto('/test/grid-justify-self');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('grid-justify-self.png', {
      fullPage: true,
    });
  });

  test('/test/high-contrast', async ({ page }) => {
    await page.goto('/test/high-contrast');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('high-contrast.png', {
      fullPage: true,
    });
  });

  test('/test/inset', async ({ page }) => {
    await page.goto('/test/inset');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('inset.png', {
      fullPage: true,
    });
  });

  test('/test/radio-card', async ({ page }) => {
    await page.goto('/test/radio-card');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('radio-card.png', {
      fullPage: true,
    });
  });

  test('/test/reset', async ({ page }) => {
    await page.goto('/test/reset');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('reset.png', {
      fullPage: true,
    });
  });

  test('/test/responsive', async ({ page }) => {
    await page.goto('/test/responsive');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('responsive.png', {
      fullPage: true,
    });
  });

  test('/test/skeleton', async ({ page }) => {
    await page.goto('/test/skeleton');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('skeleton.png', {
      fullPage: true,
    });
  });

  test('/test/tabnav', async ({ page }) => {
    await page.goto('/test/tabnav');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('tabnav-accounts.png', {
      fullPage: true,
    });
  });

  test('/test/tabnav/documents', async ({ page }) => {
    await page.goto('/test/tabnav/documents');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('tabnav-documents.png', {
      fullPage: true,
    });
  });

  test('/test/tabnav/settings', async ({ page }) => {
    await page.goto('/test/tabnav/settings');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('tabnav-settings.png', {
      fullPage: true,
    });
  });

  test('/test/text-wrap', async ({ page }) => {
    await page.goto('/test/text-wrap');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('text-wrap.png', {
      fullPage: true,
    });
  });

  test('/test/textfield', async ({ page }) => {
    await page.goto('/test/textfield');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('textfield.png', {
      fullPage: true,
    });
  });

  test('/test/webkit-tap-highlight-color', async ({ page }) => {
    await page.goto('/test/webkit-tap-highlight-color');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('webkit-tap-highlight-color.png', {
      fullPage: true,
    });
  });
});
