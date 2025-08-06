import { Flex } from '@kushagradhawan/kookie-ui';
import { forwardRef, CSSProperties } from 'react';

/**
 * Dots component props interface
 *
 * This component creates a dotted background pattern using CSS radial gradients.
 * It's commonly used in design documentation to provide visual context for
 * transparent or semi-transparent elements.
 */
export interface DotsProps {
  /**
   * Size of each dot in pixels
   * @default 24
   * @example 16, 24, 32
   */
  dotSize?: number;

  /**
   * Color of the dots
   * @default 'var(--gray-10)'
   * @example 'var(--blue-10)', '#000000', 'rgba(0,0,0,0.1)'
   */
  color?: string;

  /**
   * Background color behind the dots
   * @default 'var(--gray-2)'
   * @example 'var(--blue-2)', '#ffffff', 'transparent'
   */
  backgroundColor?: string;

  /**
   * Additional CSS styles to apply to the container
   * @example { borderRadius: '8px', padding: '16px' }
   */
  style?: CSSProperties;

  /**
   * Additional CSS class names
   * @example 'my-dots-container custom-pattern'
   */
  className?: string;

  /**
   * Children to render inside the dots pattern
   * @example <Image src="/logo.png" alt="Logo" />
   */
  children?: React.ReactNode;

  /**
   * All other Flex props (gap, justify, align, etc.)
   * @example { gap: '4', justify: 'center', align: 'center' }
   */
  [key: string]: any;
}

/**
 * Dots Component
 *
 * Creates a dotted background pattern using CSS radial gradients. This component
 * is particularly useful for:
 *
 * - Providing visual context for transparent images or icons
 * - Creating design documentation backgrounds
 * - Highlighting UI elements that need background contrast
 *
 * The dots are created using CSS `radial-gradient` with small circles that
 * repeat across the background. The pattern is fully customizable with
 * different dot sizes, colors, and background colors.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Dots>
 *   <Image src="/transparent-logo.png" alt="Logo" />
 * </Dots>
 *
 * // Custom styling
 * <Dots
 *   dotSize={16}
 *   color="var(--blue-10)"
 *   backgroundColor="var(--blue-2)"
 *   style={{ borderRadius: '8px' }}
 * >
 *   <Icon name="star" />
 * </Dots>
 * ```
 */
export const Dots = forwardRef<HTMLDivElement, DotsProps>(
  (
    {
      dotSize = 24,
      color = 'var(--gray-10)',
      backgroundColor = 'var(--gray-2)',
      style,
      children,
      ...props
    },
    ref,
  ) => {
    // Create the dots pattern using CSS radial gradient
    // Each dot is a 1px circle that repeats based on dotSize
    const dotsStyle: CSSProperties = {
      backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
      borderRadius: 'var(--radius-5)',
      backgroundSize: `${dotSize}px ${dotSize}px`,
      backgroundPosition: 'center',
      backgroundColor,
      ...style,
    };

    return (
      <Flex ref={ref} style={dotsStyle} {...props}>
        {children}
      </Flex>
    );
  },
);

Dots.displayName = 'Dots';
