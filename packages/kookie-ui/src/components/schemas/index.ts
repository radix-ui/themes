/**
 * Button component schemas - Single source of truth for all button-related components
 *
 * This module exports Zod schemas for all button components, providing:
 * - Type-safe prop validation
 * - Machine-readable JSON schema generation
 * - Development-time prop validation
 * - Consistent API across all button variants
 *
 * @example
 * ```tsx
 * import { ButtonSchema, parseButtonProps } from './schemas';
 *
 * // Type-safe prop validation
 * const props = ButtonSchema.parse({ variant: 'solid', size: '2' });
 *
 * // Development-time validation
 * const validatedProps = parseButtonProps(userProps);
 * ```
 */

// Base schemas
export { BaseButtonSchema, parseBaseButtonProps } from './base-button.schema.js';
export type { BaseButtonProps } from './base-button.schema.js';

// Button schemas
export { ButtonSchema, parseButtonProps } from './button.schema.js';
export type { ButtonProps } from './button.schema.js';

// IconButton schemas
export { IconButtonSchema, parseIconButtonProps } from './icon-button.schema.js';
export type { IconButtonProps } from './icon-button.schema.js';

// ToggleButton schemas
export { ToggleButtonSchema, parseToggleButtonProps } from './toggle-button.schema.js';
export type { ToggleButtonProps } from './toggle-button.schema.js';

// ToggleIconButton schemas
export { ToggleIconButtonSchema, parseToggleIconButtonProps } from './toggle-icon-button.schema.js';
export type { ToggleIconButtonProps } from './toggle-icon-button.schema.js';

/**
 * Generic parseProps helper for development-time validation
 *
 * This function provides a type-safe way to validate props in development mode.
 * It should only be used in development as it adds runtime overhead.
 *
 * @param schema - Zod schema to validate against
 * @param props - Props to validate
 * @returns Validated and normalized props
 *
 * @example
 * ```tsx
 * import { parseProps } from './schemas';
 * import { ButtonSchema } from './schemas';
 *
 * // In development, this will validate props and show helpful errors
 * const validatedProps = parseProps(ButtonSchema, userProps);
 * ```
 */
export function parseProps<T>(schema: z.ZodSchema<T>, props: unknown): T {
  if (process.env.NODE_ENV === 'development') {
    return schema.parse(props);
  }
  return props as T;
}

import { z } from 'zod';
