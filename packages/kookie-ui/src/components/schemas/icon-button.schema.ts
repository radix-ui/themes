import { z } from 'zod';
import { BaseButtonSchema } from './base-button.schema.js';

/**
 * IconButton Zod schema - Single source of truth for IconButton component props
 *
 * IconButton is a specialized button component designed for icon-only interactions.
 * It requires proper accessibility attributes to meet WCAG guidelines and provides
 * comprehensive tooltip support for better user experience.
 *
 * Key features:
 * - Required accessibility attributes (aria-label, aria-labelledby, or children)
 * - Tooltip support for better UX
 * - Inherits all BaseButton functionality
 * - Optimized for icon-only interactions
 *
 * @example
 * ```tsx
 * // Basic icon button with aria-label
 * const props = IconButtonSchema.parse({
 *   'aria-label': 'Close dialog',
 *   variant: 'ghost'
 * });
 *
 * // Icon button with tooltip
 * const tooltipProps = IconButtonSchema.parse({
 *   'aria-label': 'Settings',
 *   tooltip: 'Open settings menu',
 *   tooltipSide: 'right'
 * });
 *
 * // Icon button with children (fallback accessibility)
 * const childrenProps = IconButtonSchema.parse({
 *   children: <SettingsIcon />,
 *   variant: 'soft'
 * });
 * ```
 */
export const IconButtonSchema = BaseButtonSchema.extend({
  /**
   * Content to display in the tooltip on hover/focus
   */
  tooltip: z.string().optional().describe('Content to display in the tooltip on hover/focus'),

  /**
   * Side of the button where the tooltip should appear
   * @default 'top'
   */
  tooltipSide: z
    .enum(['top', 'right', 'bottom', 'left'])
    .optional()
    .default('top')
    .describe('Side of the button where the tooltip should appear'),

  /**
   * Alignment of the tooltip relative to the button
   * @default 'center'
   */
  tooltipAlign: z
    .enum(['start', 'center', 'end'])
    .optional()
    .default('center')
    .describe('Alignment of the tooltip relative to the button'),

  /**
   * Delay before showing the tooltip (in milliseconds)
   */
  tooltipDelayDuration: z
    .number()
    .optional()
    .describe('Delay before showing the tooltip (in milliseconds)'),

  /**
   * Whether to disable hoverable content behavior
   * @default false
   */
  tooltipDisableHoverableContent: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether to disable hoverable content behavior'),

  /**
   * ARIA label for accessibility (required if no aria-labelledby or children)
   * Icon buttons must have an accessible name to meet WCAG guidelines
   */
  'aria-label': z.string().optional().describe('ARIA label for accessibility'),

  /**
   * ARIA labelled by reference (required if no aria-label or children)
   * Icon buttons must have an accessible name to meet WCAG guidelines
   */
  'aria-labelledby': z.string().optional().describe('ARIA labelled by reference'),

  /**
   * Children elements (required if no aria-label or aria-labelledby)
   * Icon buttons must have an accessible name to meet WCAG guidelines
   */
  children: z
    .any()
    .optional()
    .describe('Children elements (required for accessibility if no aria-label)'),
}).refine((data) => data['aria-label'] || data['aria-labelledby'] || data.children, {
  message:
    "IconButton must have either 'aria-label', 'aria-labelledby', or 'children' for accessibility",
  path: ['aria-label', 'aria-labelledby', 'children'],
});

/**
 * Type derived from IconButton Zod schema
 * This ensures type safety and consistency with the schema
 */
export type IconButtonProps = z.infer<typeof IconButtonSchema>;

/**
 * Development-only helper to validate and normalize IconButton props
 * This function should only be used in development mode
 *
 * @param props - Props to validate and normalize
 * @returns Validated and normalized props
 *
 * @example
 * ```tsx
 * // In development, this will validate props and show helpful errors
 * const validatedProps = parseIconButtonProps({
 *   variant: 'ghost'
 *   // Missing accessibility - will throw error
 * });
 * // Throws: "IconButton must have either 'aria-label', 'aria-labelledby', or 'children' for accessibility"
 *
 * const validProps = parseIconButtonProps({
 *   'aria-label': 'Close',
 *   variant: 'ghost'
 * });
 * ```
 */
export function parseIconButtonProps(props: unknown): IconButtonProps {
  if (process.env.NODE_ENV === 'development') {
    return IconButtonSchema.parse(props);
  }
  return props as IconButtonProps;
}
