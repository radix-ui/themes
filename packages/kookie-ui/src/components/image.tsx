'use client';

import * as React from 'react';
import classNames from 'classnames';

import { imagePropDefs } from './image.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';
import { widthPropDefs } from '../props/width.props.js';
import { heightPropDefs } from '../props/height.props.js';
import { Skeleton } from './skeleton.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { WidthProps } from '../props/width.props.js';
import type { HeightProps } from '../props/height.props.js';
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
   * Callback fired when the image successfully loads.
   */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /**
   * Callback fired when the image fails to load.
   */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};

interface ImageProps
  extends ComponentPropsWithout<'img', RemovedProps | 'color' | 'width' | 'height' | 'alt'>,
    MarginProps,
    WidthProps,
    HeightProps,
    ImageOwnProps {
  /**
   * The alt attribute provides alternative information for an image if a user for some reason cannot view it.
   * Required for accessibility when not using asChild. Use empty string for decorative images.
   */
  alt: string;
}

const Image = React.forwardRef<ImageElement, ImageProps>((props, forwardedRef) => {
  const { variant = 'surface', children } = props;
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
    onLoad: userOnLoad,
    onError: userOnError,
    children: _children, // Extract children to exclude from imgProps
    ...imgProps
  } = extractProps(props, imagePropDefs, marginPropDefs, widthPropDefs, heightPropDefs);

  // Loading state management
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [showPlaceholder, setShowPlaceholder] = React.useState(!!placeholder);

  // Handle image load - moved to top to avoid conditional hook call
  const handleLoad = React.useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
    setImageError(false);
    setShowPlaceholder(false);
    userOnLoad?.(event);
  }, [userOnLoad]);

  // Handle image error - moved to top to avoid conditional hook call
  const handleError = React.useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(false);
    setImageError(true);
    setShowPlaceholder(false);
    userOnError?.(event);
  }, [userOnError]);

  // Validate required props
  if (!src) {
    console.warn('Image component: src prop is required');
    return null;
  }

  if (!asChild && alt === undefined) {
    console.warn('Image component: alt prop is required for accessibility when not using asChild');
  }

  // Create skeleton placeholder
  const skeletonElement = showSkeleton && !imageLoaded && !imageError ? (
    <Skeleton
      style={{
        ...style,
        width: '100%',
        height: '100px', // Default height, can be overridden by style
        borderRadius: radius ? `var(--radius-${radius})` : undefined,
      }}
      className={className}
    />
  ) : null;

  // Create placeholder image element
  const placeholderElement = placeholder && showPlaceholder ? (
    <img
      data-radius={radius}
      style={{
        ...style,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        filter: 'blur(4px)',
        opacity: 0.7,
        transition: 'opacity 0.3s ease-out',
      }}
      className={classNames(
        'rt-reset',
        'rt-Image',
        'rt-Image--placeholder',
        className,
      )}
      alt=""
      src={placeholder}
    />
  ) : null;

  // Create the standard img element
  const imgElement = (
    <img
      data-radius={radius}
      loading={loading}
      style={{
        ...style,
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
      className={classNames(
        'rt-reset',
        'rt-Image',
        variant === 'blur' && 'rt-Image--blur',
        className,
      )}
      alt={alt}
      src={src}
      onLoad={handleLoad}
      onError={handleError}
      {...imgProps}
      ref={forwardedRef}
    />
  );

  // Wrapper for images with placeholders
  const imageWithPlaceholder = (placeholder || showSkeleton) ? (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {skeletonElement}
      {placeholderElement}
      {imgElement}
    </div>
  ) : imgElement;

  // Handle asChild - inject img into the child element
  if (asChild && children) {
    const child = React.Children.only(children) as React.ReactElement<any>;

    if (variant === 'blur') {
      // For blur variant with asChild
      return React.cloneElement(child, {
        className: classNames(child.props?.className, 'rt-variant-blur'),
        style: {
          position: 'relative',
          display: 'inline-block',
          textDecoration: 'none', // Reset link underlines
          color: 'inherit', // Reset link colors
          border: 'none', // Reset button borders
          background: 'none', // Reset button backgrounds
          padding: 0, // Reset button padding
          font: 'inherit', // Reset button fonts
          cursor: 'pointer', // Ensure interactive cursor
          ...child.props?.style,
        },
        children: (
          <>
            {/* Background blurred image */}
            <img
              data-radius={radius}
              loading={loading}
              style={{
                ...style,
                position: 'absolute',
                top: '8px',
                left: '0',
              }}
              className={classNames(
                'rt-reset',
                'rt-Image',
                'rt-Image--blur',
                'rt-Image--blur-bg',
                className,
              )}
              alt=""
              src={src}
              {...imgProps}
            />
            {/* Foreground image */}
            <img
              data-radius={radius}
              loading={loading}
              style={{ 
                ...style, 
                position: 'relative', 
                zIndex: 1,
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
              }}
              className={classNames('rt-reset', 'rt-Image', 'rt-Image--blur', className)}
              alt={alt}
              src={src}
              onLoad={handleLoad}
              onError={handleError}
              {...imgProps}
              ref={forwardedRef}
            />
          </>
        ),
      });
    } else {
      // For surface variant with asChild
      return React.cloneElement(child, {
        className: classNames(child.props?.className, 'rt-Image'),
        style: {
          textDecoration: 'none', // Reset link underlines
          color: 'inherit', // Reset link colors
          border: 'none', // Reset button borders
          background: 'none', // Reset button backgrounds
          padding: 0, // Reset button padding
          font: 'inherit', // Reset button fonts
          cursor: 'pointer', // Ensure interactive cursor
          ...child.props?.style, // Allow user overrides
        },
        children: imageWithPlaceholder,
      });
    }
  }

  // Regular rendering without asChild
  if (variant === 'blur') {
    return (
      <div className="rt-variant-blur" style={{ position: 'relative', display: 'inline-block' }}>
        {/* Background blurred image */}
        <img
          data-radius={radius}
          loading={loading}
          style={{
            ...style,
            position: 'absolute',
            top: '8px',
            left: '0',
          }}
          className={classNames(
            'rt-reset',
            'rt-Image',
            'rt-Image--blur',
            'rt-Image--blur-bg',
            className,
          )}
          alt=""
          src={src}
          {...imgProps}
        />
        {/* Foreground image */}
        <img
          data-radius={radius}
          loading={loading}
          style={{ 
            ...style, 
            position: 'relative', 
            zIndex: 1,
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
          className={classNames('rt-reset', 'rt-Image', 'rt-Image--blur', className)}
          alt={alt}
          src={src}
          onLoad={handleLoad}
          onError={handleError}
          {...imgProps}
          ref={forwardedRef}
        />
      </div>
    );
  }

  return imageWithPlaceholder;
});

Image.displayName = 'Image';

export { Image };
export type { ImageProps };
