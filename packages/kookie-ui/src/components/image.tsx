'use client';

import * as React from 'react';
import classNames from 'classnames';

import { imagePropDefs } from './image.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';
import { widthPropDefs } from '../props/width.props.js';
import { heightPropDefs } from '../props/height.props.js';
import { layoutPropDefs } from '../props/layout.props.js';
import { Skeleton } from './skeleton.js';
import { Box } from './box.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { WidthProps } from '../props/width.props.js';
import type { HeightProps } from '../props/height.props.js';
import type { LayoutProps } from '../props/layout.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type ImageElement = React.ElementRef<'img'>;
type ImageOwnProps = GetPropDefTypes<typeof imagePropDefs> & {
  loading?: 'eager' | 'lazy';
  /**
   * Placeholder image URL to show while the main image is loading.
   * Can be a low-quality/blurred version of the main image.
   */
  placeholder?: string;
  /**
   * Shows a skeleton placeholder while loading instead of a blank space.
   */
  showSkeleton?: boolean;
  /**
   * Whether the image should fade in when loaded. Set to false for background images or when you want immediate visibility.
   */
  fadeIn?: boolean;
  /**
   * Callback fired when the image successfully loads.
   */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /**
   * Callback fired when the image fails to load.
   */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /**
   * Style object to apply to the wrapper container. Useful for overriding display, width, height, etc.
   */
  wrapperStyle?: React.CSSProperties;
};

interface ImageProps
  extends ComponentPropsWithout<'img', RemovedProps | 'color' | 'width' | 'height' | 'alt'>,
    MarginProps,
    WidthProps,
    HeightProps,
    LayoutProps,
    ImageOwnProps {
  /**
   * The alt attribute provides alternative information for an image if a user for some reason cannot view it.
   * Required for accessibility when not using asChild. Use empty string for decorative images.
   */
  alt: string;
}

const Image = React.forwardRef<ImageElement, ImageProps>((props, forwardedRef) => {
  const { variant = 'surface', wrapperStyle, ...restProps } = props;
  const {
    asChild,
    className,
    radius,
    style,
    loading = 'lazy',
    alt,
    src,
    placeholder,
    showSkeleton = false,
    fadeIn = true,
    onLoad: userOnLoad,
    onError: userOnError,
    children,
    ...wrapperProps
  } = extractProps(
    restProps,
    imagePropDefs,
    marginPropDefs,
    widthPropDefs,
    heightPropDefs,
    layoutPropDefs,
  );

  // Loading state management
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [showPlaceholder, setShowPlaceholder] = React.useState(!!placeholder);

  // Ref to check if image is already loaded (for cached images)
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Handle image load
  const handleLoad = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageLoaded(true);
      setImageError(false);
      setShowPlaceholder(false);
      userOnLoad?.(event);
    },
    [userOnLoad],
  );

  // Handle image error
  const handleError = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageLoaded(false);
      setImageError(true);
      setShowPlaceholder(false);
      userOnError?.(event);
    },
    [userOnError],
  );

  // Check if image is already loaded (for cached images)
  React.useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
      setImageError(false);
      setShowPlaceholder(false);
    }
  }, [src]);

  // Validate required props
  if (!src) {
    console.warn('Image component: src prop is required');
    return null;
  }

  if (!asChild && alt === undefined) {
    console.warn('Image component: alt prop is required for accessibility when not using asChild');
  }

  // Common image styles that apply to the actual img element
  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'block',
    opacity: fadeIn ? (imageLoaded ? 1 : 0) : 1,
    transition: fadeIn ? 'opacity 0.3s ease-out' : 'none',
    ...style, // Allow style overrides for the image
  };

  // Wrapper styles that get all the sizing and positioning
  const wrapperStyleFinal: React.CSSProperties = {
    position: 'relative',
    display: 'block', // Use block instead of inline-block to work better with AspectRatio
    ...wrapperStyle,
  };

  // Create skeleton placeholder
  const skeletonElement =
    showSkeleton && !imageLoaded && !imageError ? (
      <Skeleton
        width="100%"
        height="100px" // Default height, can be overridden by wrapper
        style={{
          borderRadius: radius ? `var(--radius-${radius})` : undefined,
        }}
        className={className}
      />
    ) : null;

  // Create placeholder image element
  const placeholderElement =
    placeholder && showPlaceholder ? (
      <img
        data-radius={radius}
        style={{
          ...imgStyle,
          filter: 'blur(4px)',
          opacity: 0.7,
          transition: 'opacity 0.3s ease-out',
        }}
        className={classNames('rt-reset', 'rt-Image', 'rt-Image--placeholder', className)}
        alt=""
        src={placeholder}
      />
    ) : null;

  // Handle asChild - inject content into the child element
  if (asChild && children) {
    const child = React.Children.only(children) as React.ReactElement<any>;

    if (variant === 'blur') {
      // For blur variant with asChild
      return React.cloneElement(child, {
        className: classNames(child.props?.className, 'rt-variant-blur'),
        style: {
          textDecoration: 'none',
          color: 'inherit',
          border: 'none',
          background: 'none',
          padding: 0,
          font: 'inherit',
          cursor: 'pointer',
          ...wrapperStyleFinal,
          ...style, // Apply sizing to the child element
          ...child.props?.style,
        },
        children: (
          <>
            {/* Background blurred image */}
            <img
              data-radius={radius}
              loading={loading}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '105%',
                height: '105%',
                transform: 'translate(-2.5%, -2.5%)',
                filter: 'blur(16px) saturate(1.5)',
                opacity: 0.5,
                zIndex: -1,
              }}
              className={classNames('rt-reset', 'rt-Image', 'rt-Image--blur-bg', className)}
              alt=""
              src={src}
            />
            {/* Foreground image */}
            <img
              data-radius={radius}
              loading={loading}
              style={imgStyle}
              className={classNames('rt-reset', 'rt-Image', 'rt-Image--blur', className)}
              alt={alt}
              src={src}
              onLoad={handleLoad}
              onError={handleError}
              ref={(node) => {
                imgRef.current = node;
                if (typeof forwardedRef === 'function') {
                  forwardedRef(node);
                } else if (forwardedRef) {
                  forwardedRef.current = node;
                }
              }}
            />
          </>
        ),
      });
    } else {
      // For surface variant with asChild
      return React.cloneElement(child, {
        className: classNames(child.props?.className),
        style: {
          textDecoration: 'none',
          color: 'inherit',
          border: 'none',
          background: 'none',
          padding: 0,
          font: 'inherit',
          cursor: 'pointer',
          ...wrapperStyleFinal,
          ...child.props?.style,
        },
        children: (
          <>
            {skeletonElement}
            {placeholderElement}
            <img
              data-radius={radius}
              loading={loading}
              style={imgStyle}
              className={classNames('rt-reset', 'rt-Image', className)}
              alt={alt}
              src={src}
              onLoad={handleLoad}
              onError={handleError}
              ref={(node) => {
                imgRef.current = node;
                if (typeof forwardedRef === 'function') {
                  forwardedRef(node);
                } else if (forwardedRef) {
                  forwardedRef.current = node;
                }
              }}
            />
          </>
        ),
      });
    }
  }

  // Regular rendering without asChild - both variants use Box wrapper
  if (variant === 'blur') {
    return (
      <Box
        className={classNames('rt-variant-blur', className)}
        style={{
          ...style, // Include the width/height styles from extractProps
          ...wrapperStyleFinal,
        }}
        {...wrapperProps} // Apply other props to wrapper
      >
        {/* Background blurred image */}
        <img
          data-radius={radius}
          loading={loading}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '105%',
            height: '105%',
            transform: 'translate(-2.5%, -2.5%)',
            filter: 'blur(16px) saturate(1.5)',
            opacity: 0.5,
            zIndex: -1,
          }}
          className={classNames('rt-reset', 'rt-Image', 'rt-Image--blur-bg', className)}
          alt=""
          src={src}
        />
        {/* Foreground image */}
        <img
          data-radius={radius}
          loading={loading}
          style={imgStyle}
          className={classNames('rt-reset', 'rt-Image', 'rt-Image--blur', className)}
          alt={alt}
          src={src}
          onLoad={handleLoad}
          onError={handleError}
          ref={(node) => {
            imgRef.current = node;
            if (typeof forwardedRef === 'function') {
              forwardedRef(node);
            } else if (forwardedRef) {
              forwardedRef.current = node;
            }
          }}
        />
      </Box>
    );
  }

  // Surface variant - also use Box wrapper for consistency
  return (
    <Box
      className={className}
      style={{
        ...style, // Include the width/height styles from extractProps
        ...wrapperStyleFinal,
      }}
      {...wrapperProps} // Apply other props to wrapper
    >
      {skeletonElement}
      {placeholderElement}
      <img
        data-radius={radius}
        loading={loading}
        style={imgStyle}
        className={classNames('rt-reset', 'rt-Image', className)}
        alt={alt}
        src={src}
        onLoad={handleLoad}
        onError={handleError}
        ref={(node) => {
          imgRef.current = node;
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
      />
    </Box>
  );
});

Image.displayName = 'Image';

export { Image };
export type { ImageProps };
