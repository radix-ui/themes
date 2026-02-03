import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test.describe('visual regression', () => {
  test('/test/appearance', async ({ page }) => {
    await page.goto('/test/appearance');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('appearance.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/as-child', async ({ page }) => {
    await page.goto('/test/as-child');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('as-child.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/avatar', async ({ page }) => {
    await page.goto('/test/avatar');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('avatar.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/checkbox-card', async ({ page }) => {
    await page.goto('/test/checkbox-card');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('checkbox-card.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/classic-button', async ({ page }) => {
    await page.goto('/test/classic-button');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('classic-button.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/data-list', async ({ page }) => {
    await page.goto('/test/data-list');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('data-list.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/dialog', async ({ page }) => {
    await page.goto('/test/dialog');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dialog.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/grid-align-content', async ({ page }) => {
    await page.goto('/test/grid-align-content');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('grid-align-content.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/grid-align-self', async ({ page }) => {
    await page.goto('/test/grid-align-self');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('grid-align-self.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/grid-area', async ({ page }) => {
    await page.goto('/test/grid-area');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('grid-area.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/grid-justify-items', async ({ page }) => {
    await page.goto('/test/grid-justify-items');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('grid-justify-items.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/grid-justify-self', async ({ page }) => {
    await page.goto('/test/grid-justify-self');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('grid-justify-self.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/high-contrast', async ({ page }) => {
    await page.goto('/test/high-contrast');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('high-contrast.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/inset', async ({ page }) => {
    await page.goto('/test/inset');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('inset.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/radio-card', async ({ page }) => {
    await page.goto('/test/radio-card');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('radio-card.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/reset', async ({ page }) => {
    await page.goto('/test/reset');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('reset.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/responsive', async ({ page }) => {
    await page.goto('/test/responsive');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('responsive.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/skeleton', async ({ page }) => {
    await page.goto('/test/skeleton');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('skeleton.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/tabnav', async ({ page }) => {
    await page.goto('/test/tabnav');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('tabnav-accounts.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/tabnav/documents', async ({ page }) => {
    await page.goto('/test/tabnav/documents');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('tabnav-documents.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/tabnav/settings', async ({ page }) => {
    await page.goto('/test/tabnav/settings');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('tabnav-settings.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/text-wrap', async ({ page }) => {
    await page.goto('/test/text-wrap');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('text-wrap.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/textfield', async ({ page }) => {
    await page.goto('/test/textfield');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('textfield.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/test/webkit-tap-highlight-color', async ({ page }) => {
    await page.goto('/test/webkit-tap-highlight-color');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('webkit-tap-highlight-color.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/alert-dialog', async ({ page }) => {
    await page.goto('/sink/alert-dialog');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-alert-dialog.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/aspect-ratio', async ({ page }) => {
    await page.goto('/sink/aspect-ratio');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-aspect-ratio.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/avatar', async ({ page }) => {
    await page.goto('/sink/avatar');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-avatar.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/badge', async ({ page }) => {
    await page.goto('/sink/badge');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-badge.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/blockquote', async ({ page }) => {
    await page.goto('/sink/blockquote');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-blockquote.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/button', async ({ page }) => {
    await page.goto('/sink/button');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-button.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/callout', async ({ page }) => {
    await page.goto('/sink/callout');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-callout.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/card', async ({ page }) => {
    await page.goto('/sink/card');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-card.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/checkbox', async ({ page }) => {
    await page.goto('/sink/checkbox');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-checkbox.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/checkbox-cards', async ({ page }) => {
    await page.goto('/sink/checkbox-cards');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-checkbox-cards.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/checkbox-group', async ({ page }) => {
    await page.goto('/sink/checkbox-group');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-checkbox-group.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/code', async ({ page }) => {
    await page.goto('/sink/code');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-code.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/container', async ({ page }) => {
    await page.goto('/sink/container');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-container.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/context-menu', async ({ page }) => {
    await page.goto('/sink/context-menu');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-context-menu.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/cursors', async ({ page }) => {
    await page.goto('/sink/cursors');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-cursors.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/data-list', async ({ page }) => {
    await page.goto('/sink/data-list');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-data-list.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/dialog', async ({ page }) => {
    await page.goto('/sink/dialog');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-dialog.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/dropdown-menu', async ({ page }) => {
    await page.goto('/sink/dropdown-menu');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-dropdown-menu.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/grid', async ({ page }) => {
    await page.goto('/sink/grid');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-grid.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/heading', async ({ page }) => {
    await page.goto('/sink/heading');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-heading.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/hover-card', async ({ page }) => {
    await page.goto('/sink/hover-card');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-hover-card.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/icon-button', async ({ page }) => {
    await page.goto('/sink/icon-button');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-icon-button.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/kbd', async ({ page }) => {
    await page.goto('/sink/kbd');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-kbd.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/link', async ({ page }) => {
    await page.goto('/sink/link');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-link.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/mixed-nested-themes-test', async ({ page }) => {
    await page.goto('/sink/mixed-nested-themes-test');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-mixed-nested-themes-test.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/nested-appearances-test', async ({ page }) => {
    await page.goto('/sink/nested-appearances-test');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-nested-appearances-test.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/nested-colors-test', async ({ page }) => {
    await page.goto('/sink/nested-colors-test');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-nested-colors-test.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/popover', async ({ page }) => {
    await page.goto('/sink/popover');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-popover.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/progress', async ({ page }) => {
    await page.goto('/sink/progress');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-progress.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/radio', async ({ page }) => {
    await page.goto('/sink/radio');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-radio.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/radio-cards', async ({ page }) => {
    await page.goto('/sink/radio-cards');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-radio-cards.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/radio-group', async ({ page }) => {
    await page.goto('/sink/radio-group');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-radio-group.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/scroll-area', async ({ page }) => {
    await page.goto('/sink/scroll-area');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-scroll-area.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/segmented-control', async ({ page }) => {
    await page.goto('/sink/segmented-control');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-segmented-control.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  // test('/sink/select', async ({ page }) => {
  //   await page.goto('/sink/select');
  //   await page.waitForLoadState('networkidle');
  //   await expect(page).toHaveScreenshot('sink-select.png', {
  //     fullPage: true,
  //     animations: 'disabled',
  //   });
  // });

  test('/sink/separator', async ({ page }) => {
    await page.goto('/sink/separator');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-separator.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/shadow-tokens', async ({ page }) => {
    await page.goto('/sink/shadow-tokens');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-shadow-tokens.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/skeleton', async ({ page }) => {
    await page.goto('/sink/skeleton');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-skeleton.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/slider', async ({ page }) => {
    await page.goto('/sink/slider');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-slider.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/spinner', async ({ page }) => {
    await page.goto('/sink/spinner');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-spinner.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/switch', async ({ page }) => {
    await page.goto('/sink/switch');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-switch.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/tab-nav', async ({ page }) => {
    await page.goto('/sink/tab-nav');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-tab-nav.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/table', async ({ page }) => {
    await page.goto('/sink/table');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-table.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/tabs', async ({ page }) => {
    await page.goto('/sink/tabs');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-tabs.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/text', async ({ page }) => {
    await page.goto('/sink/text');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-text.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/text-area', async ({ page }) => {
    await page.goto('/sink/text-area');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-text-area.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/text-field', async ({ page }) => {
    await page.goto('/sink/text-field');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-text-field.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/tooltip', async ({ page }) => {
    await page.goto('/sink/tooltip');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-tooltip.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('/sink/typography', async ({ page }) => {
    await page.goto('/sink/typography');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('sink-typography.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
