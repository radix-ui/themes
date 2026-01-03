import { asChildPropDef } from '../props/as-child.prop.js';
import { radiusPropDef } from '../props/radius.prop.js';

import type { PropDef } from '../props/prop-def.js';

/**
 * Available object-fit values for controlling image scaling behavior
 * 
 * - cover: Scales image to cover entire container, may crop edges
 * - contain: Scales image to fit entirely within container, may have empty space
 * - fill: Stretches image to fill container exactly, may distort aspect ratio
 * - scale-down: Acts like 'contain' but never scales up beyond original size
 * - none: Image keeps original size, may overflow or leave empty space
 */
const objectFitValues = ['cover', 'contain', 'fill', 'scale-down', 'none'] as const;

/**
 * Image component prop definitions that define the component's API
 * 
 * These props control the visual appearance, behavior, and accessibility
 * features of the Image component. The component supports responsive
 * design, accessibility compliance, and flexible layout options.
 * 
 * Key features:
 * - Object-fit control for responsive image scaling
 * - Radius control for rounded corners
 * - Caption support for additional context
 * - Accessibility labels for loading and error states
 * - AsChild pattern for flexible composition
 * 
 * @example
 * ```tsx
 * // Basic image with cover fit
 * <Image src="/photo.jpg" alt="Team photo" fit="cover" />
 * 
 * // Image with caption and custom radius
 * <Image 
 *   src="/chart.png" 
 *   alt="Sales data"
 *   caption="Q3 2024 Performance"
 *   radius="medium"
 * />
 * 
 * // Responsive object-fit
 * <Image 
 *   src="/banner.jpg" 
 *   alt="Hero banner"
 *   fit={{ initial: 'cover', md: 'contain' }}
 * />
 * ```
 */
const imagePropDefs = {
  ...asChildPropDef,
  ...radiusPropDef,
  /**
   * Controls how the image should be resized to fit its container
   * 
   * Sets the CSS object-fit property with responsive support.
   * Choose the right fit based on your design needs:
   * 
   * - 'cover': Best for hero images, thumbnails, and cards where you want to fill the space
   * - 'contain': Best for product images, logos, and content where the entire image must be visible
   * - 'fill': Use carefully, only when you want to stretch the image to exact dimensions
   * - 'scale-down': Good for user-uploaded content where you don't want to enlarge small images
   * - 'none': Useful for pixel-perfect images or when you want original sizing
   * 
   * @example
   * ```tsx
   * // Fill the container, may crop edges
   * <Image src="/hero.jpg" fit="cover" alt="Hero image" />
   * 
   * // Show entire image, may have empty space
   * <Image src="/logo.png" fit="contain" alt="Company logo" />
   * 
   * // Responsive fit
   * <Image 
   *   src="/banner.jpg" 
   *   fit={{ initial: 'cover', lg: 'contain' }}
   *   alt="Responsive banner"
   * />
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
   */
  fit: {
    type: 'enum',
    className: 'rt-r-fit',
    values: objectFitValues,
    default: 'cover',
    responsive: true,
  },
  /**
   * ARIA label announced by screen readers during image loading
   * 
   * Provides accessibility feedback for users with visual impairments.
   * Customize this message to match your application's language and tone.
   * 
   * @example
   * ```tsx
   * <Image 
   *   src="/chart.jpg" 
   *   loadingAriaLabel="Loading sales chart..."
   *   alt="Sales performance chart"
   * />
   * ```
   */
  loadingAriaLabel: {
    type: 'string',
    default: 'Loading image...',
  },
  /**
   * ARIA label announced by screen readers when image loading fails
   * 
   * Provides accessibility feedback for error states.
   * Should clearly indicate that the image failed to load and may suggest alternatives.
   * 
   * @example
   * ```tsx
   * <Image 
   *   src="/photo.jpg" 
   *   errorAriaLabel="Photo failed to load. Please refresh the page."
   *   alt="Team photo"
   * />
   * ```
   */
  errorAriaLabel: {
    type: 'string',
    default: 'Failed to load image',
  },
  /**
   * Optional caption text displayed below the image
   * 
   * Provides additional context, description, or attribution for the image.
   * The caption is styled consistently and positioned below the image content.
   * 
   * Use captions for:
   * - Photo credits and attributions
   * - Additional context or explanation
   * - Data source information for charts
   * - Descriptive text that supplements the alt attribute
   * 
   * @example
   * ```tsx
   * <Image 
   *   src="/chart.png" 
   *   alt="Q3 sales performance showing 25% growth"
   *   caption="Data source: Internal sales tracking system"
   * />
   * ```
   */
  caption: {
    type: 'string',
    default: undefined,
  },
} satisfies {
  fit: PropDef<(typeof objectFitValues)[number]>;
  loadingAriaLabel: PropDef<string>;
  errorAriaLabel: PropDef<string>;
  radius: PropDef<'none' | 'small' | 'medium' | 'large' | 'full'>;
  caption: PropDef<string | undefined>;
};

export { imagePropDefs };
