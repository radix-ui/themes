import { z } from 'zod';
import { ButtonSchema } from './button.schema.js';

/**
 * ToggleButton Zod schema - Single source of truth for ToggleButton component props
 *
 * ToggleButton extends Button with toggle functionality using Radix UI's Toggle primitive.
 * It provides proper accessibility announcements, controlled/uncontrolled state management,
 * and seamless integration with the existing Button component.
 *
 * Key features:
 * - Controlled and uncontrolled state management
 * - Live accessibility announcements for screen readers
 * - Automatic state validation and warnings
 * - Seamless integration with Button props and styling
 * - Proper ARIA attributes for toggle functionality
 *
 * @example
 * ```tsx
 * // Uncontrolled toggle button
 * const props = ToggleButtonSchema.parse({
 *   defaultPressed: false,
 *   variant: 'outline'
 * });
 *
 * // Controlled toggle button
 * const controlledProps = ToggleButtonSchema.parse({
 *   pressed: true,
 *   onPressedChange: (pressed) => console.log(pressed),
 *   variant: 'soft'
 * });
 *
 * // Toggle button with tooltip
 * const tooltipProps = ToggleButtonSchema.parse({
 *   defaultPressed: false,
 *   tooltip: 'Toggle dark mode',
 *   children: 'Dark Mode'
 * });
 * ```
 */
export const ToggleButtonSchema = ButtonSchema.extend({
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
  .refine(
    (data) => {
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
    (data) => {
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
 * Type derived from ToggleButton Zod schema
 * This ensures type safety and consistency with the schema
 */
export type ToggleButtonProps = z.infer<typeof ToggleButtonSchema>;

/**
 * Development-only helper to validate and normalize ToggleButton props
 * This function should only be used in development mode
 *
 * @param props - Props to validate and normalize
 * @returns Validated and normalized props
 *
 * @example
 * ```tsx
 * // In development, this will validate props and show helpful errors
 * const invalidProps = parseToggleButtonProps({
 *   pressed: true,
 *   defaultPressed: false
 *   // Missing onPressedChange and conflicting controlled/uncontrolled
 * });
 * // Throws: "Cannot use both controlled (pressed) and uncontrolled (defaultPressed) props together"
 *
 * const validProps = parseToggleButtonProps({
 *   pressed: true,
 *   onPressedChange: (pressed) => setPressed(pressed)
 * });
 * ```
 */
export function parseToggleButtonProps(props: unknown): ToggleButtonProps {
  if (process.env.NODE_ENV === 'development') {
    return ToggleButtonSchema.parse(props);
  }
  return props as ToggleButtonProps;
}
