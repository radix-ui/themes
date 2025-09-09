import { z } from 'zod';
import { BaseButtonSchema } from './base-button.schema.js';

/**
 * ToggleIconButton Zod schema - Single source of truth for ToggleIconButton component props
 *
 * ToggleIconButton extends IconButton with toggle functionality using Radix UI's Toggle primitive.
 * It provides proper accessibility announcements, controlled/uncontrolled state management,
 * and seamless integration with the existing IconButton component.
 *
 * Key features:
 * - Required accessibility attributes (aria-label, aria-labelledby, or children)
 * - Controlled and uncontrolled state management
 * - Live accessibility announcements for screen readers
 * - Tooltip support for better UX
 * - Proper ARIA attributes for toggle functionality
 *
 * @example
 * ```tsx
 * // Uncontrolled toggle icon button
 * const props = ToggleIconButtonSchema.parse({
 *   'aria-label': 'Toggle sidebar',
 *   defaultPressed: false,
 *   variant: 'ghost'
 * });
 *
 * // Controlled toggle icon button
 * const controlledProps = ToggleIconButtonSchema.parse({
 *   'aria-label': 'Toggle dark mode',
 *   pressed: true,
 *   onPressedChange: (pressed) => setDarkMode(pressed),
 *   variant: 'soft'
 * });
 *
 * // Toggle icon button with tooltip
 * const tooltipProps = ToggleIconButtonSchema.parse({
 *   'aria-label': 'Toggle notifications',
 *   defaultPressed: false,
 *   tooltip: 'Toggle notification settings',
 *   tooltipSide: 'right'
 * });
 * ```
 */
export const ToggleIconButtonSchema = BaseButtonSchema.extend({
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

  /**
   * Controlled pressed state
   * When provided, the component is controlled and the pressed state is managed externally
   */
  pressed: z.boolean().optional().describe('Controlled pressed state'),

  /**
   * Callback when pressed state changes
   * Called with the new pressed state when the toggle is activated
   */
  onPressedChange: z.function().optional().describe('Callback when pressed state changes'),

  /**
   * Default pressed state for uncontrolled usage
   * Used as the initial pressed state when the component is uncontrolled
   */
  defaultPressed: z.boolean().optional().describe('Default pressed state for uncontrolled usage'),
})
  .refine((data: any) => data['aria-label'] || data['aria-labelledby'] || data.children, {
    message:
      "ToggleIconButton must have either 'aria-label', 'aria-labelledby', or 'children' for accessibility",
    path: ['aria-label', 'aria-labelledby', 'children'],
  })
  .refine(
    (data: any) => {
      // If pressed is provided, onPressedChange should also be provided for controlled usage
      if (data.pressed !== undefined && data.onPressedChange === undefined) {
        return false;
      }
      return true;
    },
    {
      message: 'When using controlled mode (pressed prop), onPressedChange must also be provided',
      path: ['onPressedChange'],
    },
  )
  .refine(
    (data: any) => {
      // Cannot have both controlled and uncontrolled props
      if (data.pressed !== undefined && data.defaultPressed !== undefined) {
        return false;
      }
      return true;
    },
    {
      message:
        'Cannot use both controlled (pressed) and uncontrolled (defaultPressed) props together',
      path: ['pressed', 'defaultPressed'],
    },
  );

/**
 * Type derived from ToggleIconButton Zod schema
 * This ensures type safety and consistency with the schema
 */
export type ToggleIconButtonProps = z.infer<typeof ToggleIconButtonSchema>;

/**
 * Development-only helper to validate and normalize ToggleIconButton props
 * This function should only be used in development mode
 *
 * @param props - Props to validate and normalize
 * @returns Validated and normalized props
 *
 * @example
 * ```tsx
 * // In development, this will validate props and show helpful errors
 * const invalidProps = parseToggleIconButtonProps({
 *   pressed: true,
 *   defaultPressed: false
 *   // Missing onPressedChange, conflicting controlled/uncontrolled, and missing accessibility
 * });
 * // Throws multiple validation errors
 *
 * const validProps = parseToggleIconButtonProps({
 *   'aria-label': 'Toggle menu',
 *   pressed: true,
 *   onPressedChange: (pressed) => setMenuOpen(pressed)
 * });
 * ```
 */
export function parseToggleIconButtonProps(props: unknown): ToggleIconButtonProps {
  if (process.env.NODE_ENV === 'development') {
    return ToggleIconButtonSchema.parse(props);
  }
  return props as ToggleIconButtonProps;
}
