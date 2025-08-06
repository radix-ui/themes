/**
 * Button prop definitions exported for external use
 *
 * This file re-exports the base button prop definitions to provide
 * a clean API for the Button component. The base button props are
 * defined in the _internal directory and used by all button variants
 * to ensure consistency across the design system.
 *
 * @example
 * ```tsx
 * import { buttonPropDefs } from '@kushagradhawan/kookie-ui';
 *
 * // Access button prop definitions for type checking or validation
 * type ButtonSize = typeof buttonPropDefs.size.values[number];
 * type ButtonVariant = typeof buttonPropDefs.variant.values[number];
 * ```
 */
export { baseButtonPropDefs as buttonPropDefs } from './_internal/base-button.props.js';
