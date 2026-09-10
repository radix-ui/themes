import { test, expect } from '@playwright/test';

test.describe('checkbox', () => {
  test('does not submit a form when given type="checkbox"', async ({ page }) => {
    await page.goto('/test/checkbox-type');
    await page.waitForLoadState('networkidle');

    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).toHaveJSProperty('type', 'button');

    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await expect(page.getByTestId('submit-count')).toHaveText('0');

    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByTestId('submit-count')).toHaveText('1');
  });
});
