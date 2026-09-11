import { test, expect, type Locator } from '@playwright/test';

async function computedColor(locator: Locator) {
  return locator.evaluate((node) => getComputedStyle(node).color);
}

async function computedCursor(locator: Locator) {
  return locator.evaluate((node) => getComputedStyle(node).cursor);
}

async function computedRootBackgroundImage(locator: Locator) {
  return locator.evaluate((node) => getComputedStyle(node.parentElement!).backgroundImage);
}

test.describe('readOnly vs disabled appearance', () => {
  test('TextField readOnly keeps normal appearance and a text cursor', async ({ page }) => {
    await page.goto('/test/textfield-readonly');
    await page.waitForLoadState('networkidle');

    const defaultFilled = page.getByLabel('textfield default filled');
    const readonlyFilled = page.getByLabel('textfield readonly filled');
    const disabledFilled = page.getByLabel('textfield disabled filled');
    const readonlyEmpty = page.getByLabel('textfield readonly empty');
    const disabledEmpty = page.getByLabel('textfield disabled empty');

    const defaultColor = await computedColor(defaultFilled);
    const readonlyColor = await computedColor(readonlyFilled);
    const disabledColor = await computedColor(disabledFilled);

    expect(readonlyColor).toBe(defaultColor);
    expect(readonlyColor).not.toBe(disabledColor);

    const defaultBackground = await computedRootBackgroundImage(defaultFilled);
    const readonlyBackground = await computedRootBackgroundImage(readonlyFilled);
    const disabledBackground = await computedRootBackgroundImage(disabledFilled);

    expect(readonlyBackground).toBe(defaultBackground);
    expect(readonlyBackground).not.toBe(disabledBackground);

    expect(await computedCursor(readonlyFilled)).toBe('text');
    expect(await computedCursor(readonlyEmpty)).toBe('text');
    expect(await computedCursor(disabledEmpty)).toBe('not-allowed');
  });

  test('TextArea readOnly keeps normal appearance', async ({ page }) => {
    await page.goto('/test/textfield-readonly');
    await page.waitForLoadState('networkidle');

    const defaultFilled = page.getByLabel('textarea default filled');
    const readonlyFilled = page.getByLabel('textarea readonly filled');
    const disabledFilled = page.getByLabel('textarea disabled filled');

    const defaultColor = await computedColor(defaultFilled);
    const readonlyColor = await computedColor(readonlyFilled);
    const disabledColor = await computedColor(disabledFilled);

    expect(readonlyColor).toBe(defaultColor);
    expect(readonlyColor).not.toBe(disabledColor);
  });
});
