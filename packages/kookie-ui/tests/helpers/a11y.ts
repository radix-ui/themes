import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

/**
 * A11y test utilities for Shell components
 */

/**
 * Get a resizer handle by role and optional label
 */
export function getResizerHandle(label?: string) {
  return screen.getByRole('separator', label ? { name: new RegExp(label, 'i') } : undefined);
}

/**
 * Get a dialog/overlay by role
 */
export function getOverlay() {
  return screen.getByRole('dialog');
}

/**
 * Get complementary panes (Sidebar, Panel, Inspector, Bottom)
 */
export function getComplementaryPane(label?: string) {
  return screen.getByRole('complementary', label ? { name: new RegExp(label, 'i') } : undefined);
}

/**
 * Get main content area
 */
export function getMainContent() {
  return screen.getByRole('main');
}

/**
 * Focus and press a key on an element
 */
export async function pressKey(element: HTMLElement, key: string) {
  await userEvent.click(element);
  await userEvent.keyboard(key);
}

/**
 * Check if element has focus
 */
export function hasFocus(element: HTMLElement): boolean {
  return document.activeElement === element;
}

/**
 * Get the currently focused element
 */
export function getFocusedElement(): HTMLElement | null {
  return document.activeElement as HTMLElement | null;
}

/**
 * Assert ARIA attributes on an element
 */
export function expectAriaAttributes(element: HTMLElement, attributes: Record<string, string | number>) {
  Object.entries(attributes).forEach(([attr, value]) => {
    expect(element).toHaveAttribute(attr, String(value));
  });
}

/**
 * Assert element is hidden from screen readers
 */
export function expectVisuallyHidden(element: HTMLElement) {
  const computedStyle = window.getComputedStyle(element);
  expect(computedStyle.position).toBe('absolute');
  expect(computedStyle.width).toBe('1px');
  expect(computedStyle.height).toBe('1px');
  expect(computedStyle.padding).toBe('0px');
  expect(computedStyle.border).toBe('0px');
  expect(computedStyle.margin).toBe('-1px');
  expect(computedStyle.overflow).toBe('hidden');
  expect(computedStyle.clip).toBe('rect(0px, 0px, 0px, 0px)');
  expect(computedStyle.whiteSpace).toBe('nowrap');
}
