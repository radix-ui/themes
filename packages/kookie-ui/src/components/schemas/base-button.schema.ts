import { z } from 'zod';

/**
 * BaseButton Zod schema - Single source of truth for all button component props
 *
 * This schema defines the core button functionality used by Button, IconButton,
 * ToggleButton, and ToggleIconButton components. It ensures consistency across
 * the design system and provides machine-readable validation.
 *
 * @example
 * ```tsx
 * // Basic validation
 * const props = BaseButtonSchema.parse({ size: '2', variant: 'solid' });
 *
 * // With responsive props
 * const responsiveProps = BaseButtonSchema.parse({
 *   size: { initial: '1', sm: '2', md: '3' },
 *   variant: 'solid'
 * });
 * ```
 */
export const BaseButtonSchema = z
  .object({
    /**
     * Polymorphic rendering - render as different HTML elements
     * @default 'button'
     */
    as: z.string().optional().describe('HTML element type to render as'),

    /**
     * Use asChild to merge props with child element
     * @default false
     */
    asChild: z
      .boolean()
      .optional()
      .describe('Merge props with child element instead of rendering wrapper'),

    /**
     * Button size for responsive design and interface density
     * Supports responsive objects: { initial: '1', sm: '2', md: '3', lg: '4' }
     * @default '2'
     */
    size: z
      .union([
        z.enum(['1', '2', '3', '4']),
        z.object({
          initial: z.enum(['1', '2', '3', '4']).optional(),
          sm: z.enum(['1', '2', '3', '4']).optional(),
          md: z.enum(['1', '2', '3', '4']).optional(),
          lg: z.enum(['1', '2', '3', '4']).optional(),
          xl: z.enum(['1', '2', '3', '4']).optional(),
        }),
      ])
      .default('2')
      .describe('Button size for responsive design and interface density'),

    /**
     * Visual variant that determines the button's appearance and context
     * @default 'solid'
     */
    variant: z
      .enum(['classic', 'solid', 'soft', 'surface', 'outline', 'ghost', 'override'])
      .default('solid')
      .describe("Visual variant that determines the button's appearance and context"),

    /**
     * Accent color for the button
     */
    color: z
      .enum([
        'tomato',
        'red',
        'ruby',
        'crimson',
        'pink',
        'plum',
        'purple',
        'violet',
        'iris',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'jade',
        'green',
        'grass',
        'brown',
        'orange',
        'sky',
        'mint',
        'lime',
        'yellow',
        'amber',
        'gold',
        'bronze',
        'gray',
      ])
      .optional()
      .describe('Accent color for the button'),

    /**
     * High contrast mode for better accessibility
     * @default false
     */
    highContrast: z
      .boolean()
      .optional()
      .default(false)
      .describe('High contrast mode for better accessibility'),

    /**
     * Border radius for the button
     */
    radius: z
      .enum(['none', 'small', 'medium', 'large', 'full'])
      .optional()
      .describe('Border radius for the button'),

    /**
     * Loading state that shows a spinner and disables interaction
     * Automatically sets disabled=true and provides accessibility announcements
     * @default false
     */
    loading: z
      .boolean()
      .optional()
      .default(false)
      .describe('Loading state that shows a spinner and disables interaction'),

    /**
     * Full width mode that expands the button to fill its container
     * Useful for mobile layouts and form submissions
     * @default false
     */
    fullWidth: z
      .boolean()
      .optional()
      .default(false)
      .describe('Full width mode that expands the button to fill its container'),

    /**
     * Material type for visual rendering and depth effects
     * Controls how the button renders its visual elements
     */
    material: z
      .enum(['solid', 'translucent'])
      .optional()
      .describe('Material type for visual rendering and depth effects'),

    /**
     * Panel background type (deprecated)
     * @deprecated Use `material` prop instead. This prop will be removed in a future version.
     */
    panelBackground: z
      .enum(['solid', 'translucent'])
      .optional()
      .describe('Panel background type (deprecated - use material instead)'),

    /**
     * Flush mode that removes visual padding for seamless text integration
     * Only effective with ghost variant
     * @default false
     */
    flush: z
      .boolean()
      .optional()
      .default(false)
      .describe('Flush mode that removes visual padding for seamless text integration'),

    /**
     * Disabled state
     * @default false
     */
    disabled: z.boolean().optional().default(false).describe('Disabled state'),

    /**
     * Type attribute for form buttons
     * @default 'button'
     */
    type: z
      .enum(['button', 'submit', 'reset'])
      .optional()
      .describe('Type attribute for form buttons'),

    /**
     * Additional CSS class name
     */
    className: z.string().optional().describe('Additional CSS class name'),

    /**
     * Inline styles
     */
    style: z
      .record(z.string(), z.union([z.string(), z.number()]))
      .optional()
      .describe('Inline styles'),

    /**
     * Click handler
     */
    onClick: z.function().optional().describe('Click handler'),

    /**
     * Focus handler
     */
    onFocus: z.function().optional().describe('Focus handler'),

    /**
     * Blur handler
     */
    onBlur: z.function().optional().describe('Blur handler'),

    /**
     * Mouse enter handler
     */
    onMouseEnter: z.function().optional().describe('Mouse enter handler'),

    /**
     * Mouse leave handler
     */
    onMouseLeave: z.function().optional().describe('Mouse leave handler'),

    /**
     * Key down handler
     */
    onKeyDown: z.function().optional().describe('Key down handler'),

    /**
     * Key up handler
     */
    onKeyUp: z.function().optional().describe('Key up handler'),

    /**
     * Form submission handler
     */
    onSubmit: z.function().optional().describe('Form submission handler'),

    /**
     * Tab index for keyboard navigation
     */
    tabIndex: z.number().optional().describe('Tab index for keyboard navigation'),

    /**
     * ARIA label for accessibility
     */
    'aria-label': z.string().optional().describe('ARIA label for accessibility'),

    /**
     * ARIA labelled by reference
     */
    'aria-labelledby': z.string().optional().describe('ARIA labelled by reference'),

    /**
     * ARIA described by reference
     */
    'aria-describedby': z.string().optional().describe('ARIA described by reference'),

    /**
     * ARIA expanded state
     */
    'aria-expanded': z.boolean().optional().describe('ARIA expanded state'),

    /**
     * ARIA pressed state
     */
    'aria-pressed': z.boolean().optional().describe('ARIA pressed state'),

    /**
     * ARIA current state
     */
    'aria-current': z
      .union([z.boolean(), z.enum(['page', 'step', 'location', 'date', 'time'])])
      .optional()
      .describe('ARIA current state'),

    /**
     * ARIA controls reference
     */
    'aria-controls': z.string().optional().describe('ARIA controls reference'),

    /**
     * ARIA owns reference
     */
    'aria-owns': z.string().optional().describe('ARIA owns reference'),

    /**
     * Data attributes
     */
    'data-*': z.record(z.string(), z.string()).optional().describe('Data attributes'),

    /**
     * ID attribute
     */
    id: z.string().optional().describe('ID attribute'),

    /**
     * Title attribute for tooltip
     */
    title: z.string().optional().describe('Title attribute for tooltip'),

    /**
     * Role attribute
     */
    role: z.string().optional().describe('Role attribute'),

    /**
     * Children elements
     */
    children: z.any().optional().describe('Children elements'),
  })
  .strict();

/**
 * Type derived from BaseButton Zod schema
 * This ensures type safety and consistency with the schema
 */
export type BaseButtonProps = z.infer<typeof BaseButtonSchema>;

/**
 * Development-only helper to validate and normalize props
 * This function should only be used in development mode
 *
 * @param props - Props to validate and normalize
 * @returns Validated and normalized props
 *
 * @example
 * ```tsx
 * // In development, this will validate props and show helpful errors
 * const validatedProps = parseBaseButtonProps({ size: 'invalid', variant: 'solid' });
 * // Throws: "Invalid enum value. Expected '1' | '2' | '3' | '4', received 'invalid'"
 * ```
 */
export function parseBaseButtonProps(props: unknown): BaseButtonProps {
  if (process.env.NODE_ENV === 'development') {
    return BaseButtonSchema.parse(props);
  }
  return props as BaseButtonProps;
}
