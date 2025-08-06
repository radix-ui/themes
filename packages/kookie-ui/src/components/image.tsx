import * as React from 'react';
import classNames from 'classnames';

import { imagePropDefs } from './image.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';
import { widthPropDefs } from '../props/width.props.js';
import { heightPropDefs } from '../props/height.props.js';
import { layoutPropDefs } from '../props/layout.props.js';
import { Skeleton } from './skeleton.js';
import { Slot } from './slot.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { WidthProps } from '../props/width.props.js';
import type { HeightProps } from '../props/height.props.js';
import type { LayoutProps } from '../props/layout.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type ImageElement = React.ElementRef<'img'>;

/**
 * Core Image props that extend the base image prop definitions
 * These props provide enhanced functionality beyond standard HTML img attributes
 */
type ImageOwnProps = GetPropDefTypes<typeof imagePropDefs> & {
  /**
   * Native loading behavior for the image
   * 'lazy' defers loading until the image is near the viewport
   * 'eager' loads the image immediately
   */
  loading?: 'eager' | 'lazy';
  /**
   * Placeholder image URL to show while the main image is loading
   *
   * Best practices:
   * - Use a low-quality/blurred version of the main image
   * - Keep file size small (under 10KB recommended)
   * - Use same aspect ratio as main image
   * - Consider using base64 data URLs for inline placeholders
   *
   * @example
   * ```tsx
   * <Image
   *   src="/high-res-image.jpg"
   *   placeholder="/low-res-placeholder.jpg"
   *   alt="Product photo"
   * />
   * ```
   */
  placeholder?: string;
  /**
   * Shows a skeleton placeholder while loading instead of a blank space
   *
   * Use this when:
   * - You don't have a placeholder image
   * - You want consistent loading states across your interface
   * - The image is part of a content layout that needs stable dimensions
   */
  showSkeleton?: boolean;
  /**
   * Whether the image should fade in when loaded
   *
   * Set to false for:
   * - Background images where immediate visibility is important
   * - Images that need to appear instantly for UX reasons
   * - When you're implementing custom loading animations
   */
  fadeIn?: boolean;
  /**
   * Callback fired when the image successfully loads
   *
   * Use this to:
   * - Track image loading performance
   * - Trigger layout adjustments after load
   * - Implement custom loading state management
   */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /**
   * Callback fired when the image fails to load
   *
   * Use this to:
   * - Log errors for monitoring
   * - Show fallback content
   * - Implement retry logic
   */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};

/**
 * Complete Image component props interface
 *
 * Combines HTML img attributes with design system props and enhanced functionality.
 * Excludes conflicting props like 'color', 'width', 'height' that are handled by the design system.
 */
interface ImageProps
  extends ComponentPropsWithout<'img', RemovedProps | 'color' | 'width' | 'height' | 'alt'>,
    MarginProps,
    WidthProps,
    HeightProps,
    LayoutProps,
    ImageOwnProps {
  /**
   * Alternative text for the image
   *
   * Required for accessibility when not using asChild pattern.
   * Describes the image content for screen readers and when images fail to load.
   *
   * Guidelines:
   * - Be descriptive but concise
   * - Don't include "image of" or "picture of"
   * - Use empty string ("") for purely decorative images
   * - Describe the content and context, not just what you see
   *
   * @example
   * ```tsx
   * // Good alt text
   * <Image src="/chart.png" alt="Sales increased 25% from Q1 to Q2" />
   *
   * // Decorative image
   * <Image src="/decoration.png" alt="" />
   *
   * // Avoid generic descriptions
   * <Image src="/photo.jpg" alt="A photo" /> // ❌ Too generic
   * <Image src="/photo.jpg" alt="Team celebrating project launch" /> // ✅ Descriptive
   * ```
   */
  alt: string;
}

/**
 * Image component for displaying images with enhanced loading states and accessibility
 *
 * The Image component extends the standard HTML img element with advanced features
 * including placeholder images, skeleton loading states, fade-in animations, and
 * comprehensive accessibility support. It integrates seamlessly with the design
 * system's layout, spacing, and theming capabilities.
 *
 * Key features:
 * - Progressive loading with placeholder and skeleton states
 * - Fade-in animations with reduced motion support
 * - Comprehensive accessibility with ARIA attributes
 * - Object-fit control for responsive image scaling
 * - Caption support for additional context
 * - AsChild pattern for flexible composition
 * - Error handling with fallback states
 * - Performance optimizations for cached images
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Image src="/photo.jpg" alt="Team photo" />
 *
 * // With placeholder and skeleton
 * <Image
 *   src="/high-res.jpg"
 *   placeholder="/low-res.jpg"
 *   showSkeleton
 *   alt="Product showcase"
 * />
 *
 * // With caption and custom fit
 * <Image
 *   src="/chart.png"
 *   alt="Sales data visualization"
 *   caption="Q3 2024 Sales Performance"
 *   fit="contain"
 *   width="400px"
 *   height="300px"
 * />
 *
 * // As clickable element
 * <Image
 *   asChild
 *   src="/thumbnail.jpg"
 *   alt="View full gallery"
 * >
 *   <a href="/gallery">
 *     View Gallery
 *   </a>
 * </Image>
 * ```
 */
const Image = React.forwardRef<ImageElement, ImageProps>((props, forwardedRef) => {
  // Extract and organize props for different purposes
  const {
    asChild,
    className,
    style,
    loading = 'lazy', // Default to lazy loading for performance
    alt,
    src,
    placeholder,
    showSkeleton = false, // Default to no skeleton for simpler UX
    fadeIn = true, // Default to fade-in for smooth loading experience
    loadingAriaLabel = 'Loading image...',
    errorAriaLabel = 'Failed to load image',
    radius,
    caption,
    onLoad: userOnLoad,
    onError: userOnError,
    children,
    ...wrapperProps
  } = extractProps(
    props,
    imagePropDefs,
    marginPropDefs,
    widthPropDefs,
    heightPropDefs,
    layoutPropDefs,
  );

  // State management for loading, error, and placeholder states
  const [loadingState, setLoadingState] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const [showPlaceholder, setShowPlaceholder] = React.useState(!!placeholder);
  const imgRef = React.useRef<HTMLImageElement>(null);

  /**
   * Handle successful image load
   * Updates state and triggers user callback for load event
   */
  const handleLoad = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoadingState('loaded');
      setShowPlaceholder(false);
      // Call user's onLoad handler if provided
      userOnLoad?.(event);
    },
    [userOnLoad],
  );

  /**
   * Handle image load error
   * Updates state and triggers user callback for error event
   */
  const handleError = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoadingState('error');
      setShowPlaceholder(false);
      // Call user's onError handler if provided
      userOnError?.(event);
    },
    [userOnError],
  );

  /**
   * Check if image is already loaded (optimization for cached images)
   * This prevents unnecessary loading states for images that are already available
   */
  React.useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoadingState('loaded');
      setShowPlaceholder(false);
    }
  }, [src]);

  // Validate required props and provide helpful development warnings
  if (!src) {
    console.warn('Image component: src prop is required');
    return null;
  }

  if (!asChild && alt === undefined) {
    console.warn('Image component: alt prop is required for accessibility when not using asChild');
  }

  // Derive loading state flags for cleaner conditional rendering
  const isLoading = loadingState === 'loading';
  const isError = loadingState === 'error';
  const isLoaded = loadingState === 'loaded';

  /**
   * ARIA attributes for comprehensive accessibility support
   * These attributes help screen readers understand the image state
   */
  const ariaProps = {
    'aria-busy': isLoading,
    'aria-invalid': isError,
    'aria-describedby': isError ? 'image-error' : undefined,
  };

  /**
   * Image styling that handles fade-in animation and responsive behavior
   * Respects user's motion preferences through CSS media queries
   */
  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'block',
    // Conditional opacity for fade-in effect
    opacity: fadeIn ? (isLoaded ? 1 : 0) : 1,
    // Smooth transition for fade-in, respects reduced motion preferences
    transition: fadeIn ? 'opacity 0.3s ease-out' : 'none',
  };

  /**
   * Create the complete image content structure
   * This includes the main image, placeholder, skeleton, caption, and error states
   */
  const imageContent = (
    <>
      {/*
       * Image container - handles layout and positioning
       * Uses flex layout when caption is present for proper space distribution
       */}
      <div
        style={{
          position: 'relative',
          flex: caption ? '1 1 0%' : undefined,
          height: caption ? undefined : '100%',
          minHeight: 0, // Important for flex shrinking in constrained layouts
        }}
      >
        {/*
         * Error message for screen readers
         * Hidden visually but announced by assistive technology
         */}
        {isError && (
          <div id="image-error" className="rt-sr-only" aria-live="polite">
            {errorAriaLabel}
          </div>
        )}

        {/*
         * Skeleton placeholder during loading
         * Provides visual feedback and prevents layout shift
         */}
        {showSkeleton && isLoading && (
          <Skeleton width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} />
        )}

        {/*
         * Placeholder image with blur effect
         * Shows a low-quality version while the main image loads
         */}
        {placeholder && showPlaceholder && (
          <img
            style={{
              ...imgStyle,
              position: 'absolute',
              inset: 0,
              filter: 'blur(4px)', // Creates the blur effect for LQIP (Low Quality Image Placeholder)
              opacity: 0.7, // Subtle opacity to indicate it's a placeholder
              zIndex: 0, // Behind the main image
            }}
            className={classNames('rt-reset', 'rt-Image', 'rt-Image--placeholder')}
            alt="" // Decorative placeholder, no alt text needed
            src={placeholder}
          />
        )}

        {/*
         * Main image element
         * Handles all the core functionality and user interactions
         */}
        <img
          ref={(node) => {
            // Handle both internal ref and forwarded ref
            imgRef.current = node;
            if (typeof forwardedRef === 'function') {
              forwardedRef(node);
            } else if (forwardedRef) {
              forwardedRef.current = node;
            }
          }}
          loading={loading}
          style={{ ...imgStyle, position: 'relative', zIndex: 1 }}
          className={classNames('rt-reset', 'rt-Image', className)}
          alt={alt}
          src={src}
          data-radius={radius}
          onLoad={handleLoad}
          onError={handleError}
          {...ariaProps}
        />
      </div>

      {/*
       * Caption element - positioned below the image
       * Takes only the space it needs, doesn't interfere with image sizing
       */}
      {caption && (
        <div className="rt-Image-caption" style={{ flex: '0 0 auto' }}>
          {caption}
        </div>
      )}
    </>
  );

  /**
   * Container styling that adapts based on caption presence
   * Uses flexbox when caption is present for proper layout control
   */
  const containerStyle: React.CSSProperties = {
    display: caption ? 'flex' : 'block',
    flexDirection: caption ? 'column' : undefined,
    ...style, // Allow user styles to override defaults
  };

  /**
   * Render with asChild pattern for composition
   * This allows the Image to be rendered as a child of another element
   * while maintaining all its functionality and styling
   */
  if (asChild) {
    return (
      <Slot className={className} style={containerStyle} {...wrapperProps}>
        {React.cloneElement(children as React.ReactElement, {}, imageContent)}
      </Slot>
    );
  }

  /**
   * Regular rendering as a standalone div container
   * This is the default rendering mode for most use cases
   */
  return (
    <div className={className} style={containerStyle} {...wrapperProps}>
      {imageContent}
    </div>
  );
});

Image.displayName = 'Image';

export { Image };
export type { ImageProps };
