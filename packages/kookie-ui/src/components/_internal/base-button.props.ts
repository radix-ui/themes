import { asChildPropDef } from '../../props/as-child.prop.js';
import { accentColorPropDef } from '../../props/color.prop.js';
import { highContrastPropDef } from '../../props/high-contrast.prop.js';
import { radiusPropDef } from '../../props/radius.prop.js';

import type { PropDef } from '../../props/prop-def.js';

/**
 * Available button sizes for responsive design
 * Size 1: 24px - Compact for toolbars and dense interfaces
 * Size 2: 32px - Standard for most interface contexts
 * Size 3: 40px - Large for important actions and mobile touch targets
 * Size 4: 48px - Extra large for hero sections and maximum impact
 */
const sizes = ['1', '2', '3', '4'] as const;

/**
 * Available button variants for different visual contexts
 * - classic: Premium, sophisticated appearance
 * - solid: Primary actions that should be noticed first
 * - soft: Content-heavy interfaces, natural integration
 * - surface: Elevated appearance with subtle depth
 * - outline: Secondary actions that support primary actions
 * - ghost: Utility functions that don't compete for attention
 */
const variants = ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost', 'override'] as const;

/**
 * Available panel background options (deprecated)
 * @deprecated Use `materials` instead
 */
const panelBackgrounds = ['solid', 'translucent'] as const;

/**
 * Available material options for visual rendering
 * - solid: Opaque backgrounds and borders
 * - translucent: Elevated effects with depth and visual separation
 */
const materials = ['solid', 'translucent'] as const;

/**
 * Base button prop definitions that define the component's API
 * 
 * These props are used by all button variants (Button, IconButton, etc.)
 * to ensure consistent behavior and styling across the design system.
 * 
 * Key features:
 * - Responsive sizing with mobile-first approach
 * - Six visual variants for different interface contexts
 * - Comprehensive color system with semantic meanings
 * - Loading states with automatic accessibility
 * - Material system for visual depth and elevation
 * - Polymorphic rendering support via asChild
 * 
 * @example
 * ```tsx
 * // Basic button with default props
 * <BaseButton>Click me</BaseButton>
 * 
 * // Button with custom size and variant
 * <BaseButton size="3" variant="solid">Primary Action</BaseButton>
 * 
 * // Button with loading state
 * <BaseButton loading>Processing...</BaseButton>
 * 
 * // Button with material and high contrast
 * <BaseButton material="translucent" highContrast>Elevated Button</BaseButton>
 * ```
 */
const baseButtonPropDefs = {
  ...asChildPropDef,
  /**
   * Button size for responsive design and interface density
   * Supports responsive objects: { initial: '1', sm: '2', md: '3', lg: '4' }
   */
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  /**
   * Visual variant that determines the button's appearance and context
   */
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'solid' },
  ...accentColorPropDef,
  ...highContrastPropDef,
  ...radiusPropDef,
  /**
   * Loading state that shows a spinner and disables interaction
   * Automatically sets disabled=true and provides accessibility announcements
   */
  loading: { type: 'boolean', className: 'rt-loading', default: false },
  /**
   * Full width mode that expands the button to fill its container
   * Useful for mobile layouts and form submissions
   */
  fullWidth: { type: 'boolean', className: 'rt-full-width', default: false },
  /**
   * Material type for visual rendering and depth effects
   * Controls how the button renders its visual elements
   */
  material: { type: 'enum', values: materials, default: undefined },
  /**
   * Panel background type (deprecated)
   * @deprecated Use `material` prop instead. This prop will be removed in a future version.
   */
  panelBackground: { type: 'enum', values: panelBackgrounds, default: undefined },
  /**
   * Flush mode that removes visual padding for seamless text integration
   * Only effective with ghost variant
   */
  flush: { type: 'boolean', default: false },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  loading: PropDef<boolean>;
  fullWidth: PropDef<boolean>;
  material: PropDef<(typeof materials)[number] | undefined>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number] | undefined>;
  flush: PropDef<boolean>;
};

export { baseButtonPropDefs };
