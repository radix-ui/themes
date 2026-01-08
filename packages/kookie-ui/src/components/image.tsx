import * as React from 'react';
import classNames from 'classnames';

import { imagePropDefs } from './image.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';
import { widthPropDefs } from '../props/width.props.js';
import { heightPropDefs } from '../props/height.props.js';
import { layoutPropDefs } from '../props/layout.props.js';
import { Skeleton } from './skeleton.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { WidthProps } from '../props/width.props.js';
import type { HeightProps } from '../props/height.props.js';
import type { LayoutProps } from '../props/layout.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type ImageElement = React.ElementRef<'img'>;

type ImageOwnProps = GetPropDefTypes<typeof imagePropDefs> & {
  /**
   * Native loading behavior for the image
   * @default 'lazy'
   */
  loading?: 'eager' | 'lazy';
  /**
   * Placeholder image URL to show while the main image is loading (LQIP pattern)
   */
  placeholder?: string;
  /**
   * Shows a skeleton placeholder while loading
   */
  showSkeleton?: boolean;
  /**
   * Whether the image should fade in when loaded
   * @default true
   */
  fadeIn?: boolean;
  /**
   * Callback fired when the image successfully loads
   */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /**
   * Callback fired when the image fails to load
   */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /**
   * Alternative text for the image (required for accessibility)
   */
  alt: string;
  /**
   * Image source URL
   */
  src: string;
};

interface CommonImageProps
  extends MarginProps,
    WidthProps,
    HeightProps,
    LayoutProps,
    ImageOwnProps {}

type ImageImgProps = { as?: 'img' } & ComponentPropsWithout<'img', RemovedProps | 'color' | 'width' | 'height' | 'alt'>;
type ImageComponentProps = { as: React.ComponentType<any> } & Record<string, any>;
type ImageProps = CommonImageProps & (ImageImgProps | ImageComponentProps);

/**
 * Image component for displaying images with enhanced loading states and accessibility.
 *
 * Supports polymorphic rendering via the `as` prop for Next.js Image compatibility.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Image src="/photo.jpg" alt="Team photo" />
 *
 * // With Next.js Image
 * import NextImage from 'next/image';
 * <Image as={NextImage} src="/photo.jpg" alt="..." width={400} height={300} />
 *
 * // With placeholder and skeleton
 * <Image
 *   src="/high-res.jpg"
 *   placeholder="/low-res.jpg"
 *   showSkeleton
 *   alt="Product showcase"
 * />
 *
 * // With caption
 * <Image
 *   src="/chart.png"
 *   alt="Sales data visualization"
 *   caption="Q3 2024 Sales Performance"
 * />
 * ```
 */
const Image = React.forwardRef<ImageElement, ImageProps>((props, forwardedRef) => {
  // Extract native width/height before extractProps consumes them (for Next.js Image compatibility)
  const nativeWidth = typeof props.width === 'number' ? props.width : undefined;
  const nativeHeight = typeof props.height === 'number' ? props.height : undefined;
  // Check if fill prop is used (for Next.js Image compatibility)
  const hasFill = 'fill' in props && props.fill === true;

  const {
    as: Component = 'img',
    asChild: _asChild, // Extract to prevent passing to DOM element
    className,
    style,
    loading = 'lazy',
    alt,
    src,
    placeholder,
    showSkeleton = false,
    fadeIn = true,
    loadingAriaLabel = 'Loading image...',
    errorAriaLabel = 'Failed to load image',
    radius,
    caption,
    onLoad: userOnLoad,
    onError: userOnError,
    ...restProps
  } = extractProps(
    props,
    imagePropDefs,
    marginPropDefs,
    widthPropDefs,
    heightPropDefs,
    layoutPropDefs,
  );

  // When using a custom component (like Next.js Image), pass native width/height
  const isCustomComponent = Component !== 'img';
  const componentDimensionProps = isCustomComponent ? { width: nativeWidth, height: nativeHeight } : {};

  const [loadingState, setLoadingState] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const [showPlaceholder, setShowPlaceholder] = React.useState(!!placeholder);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const handleLoad = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoadingState('loaded');
      setShowPlaceholder(false);
      userOnLoad?.(event);
    },
    [userOnLoad],
  );

  const handleError = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoadingState('error');
      setShowPlaceholder(false);
      userOnError?.(event);
    },
    [userOnError],
  );

  // Check if image is already cached
  React.useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoadingState('loaded');
      setShowPlaceholder(false);
    }
  }, [src]);

  if (!src) {
    console.warn('Image component: src prop is required');
    return null;
  }

  const isLoading = loadingState === 'loading';
  const isError = loadingState === 'error';
  const isLoaded = loadingState === 'loaded';

  // When using fill (Next.js Image), don't add dimension/position styles as Next.js handles them
  const imgStyle: React.CSSProperties = hasFill
    ? {
        display: 'block',
        opacity: fadeIn ? (isLoaded ? 1 : 0) : 1,
        transition: fadeIn ? 'opacity 0.3s ease-out' : 'none',
      }
    : {
        width: '100%',
        height: '100%',
        display: 'block',
        opacity: fadeIn ? (isLoaded ? 1 : 0) : 1,
        transition: fadeIn ? 'opacity 0.3s ease-out' : 'none',
      };

  const mergeRefs = (node: HTMLImageElement | null) => {
    (imgRef as React.RefObject<HTMLImageElement | null>).current = node;
    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  const imageElement = (
    <Component
      ref={mergeRefs}
      loading={loading}
      style={hasFill ? imgStyle : { ...imgStyle, position: 'relative', zIndex: 1 }}
      className={classNames('rt-reset', 'rt-Image')}
      alt={alt}
      src={src}
      data-radius={radius}
      onLoad={handleLoad}
      onError={handleError}
      aria-busy={isLoading}
      aria-invalid={isError}
      aria-describedby={isError ? 'image-error' : undefined}
      {...componentDimensionProps}
      {...restProps}
    />
  );

  const loadingAnnouncement = isLoading && (
    <div className="rt-sr-only" aria-live="polite" role="status">
      {loadingAriaLabel}
    </div>
  );

  const errorAnnouncement = isError && (
    <div id="image-error" className="rt-sr-only" aria-live="polite" role="alert">
      {errorAriaLabel}
    </div>
  );

  const skeletonElement = showSkeleton && isLoading && (
    <Skeleton width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} />
  );

  const placeholderElement = placeholder && showPlaceholder && (
    <img
      style={{
        ...imgStyle,
        position: 'absolute',
        inset: 0,
        filter: 'blur(4px)',
        opacity: 0.7,
        zIndex: 0,
      }}
      className={classNames('rt-reset', 'rt-Image', 'rt-Image--placeholder')}
      alt=""
      src={placeholder}
    />
  );

  // Simple flat structure when no caption
  if (!caption) {
    return (
      <div className={className} style={{ position: 'relative', ...style }}>
        {loadingAnnouncement}
        {errorAnnouncement}
        {skeletonElement}
        {placeholderElement}
        {imageElement}
      </div>
    );
  }

  // Flexbox structure when caption is present
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          flex: '1 1 0%',
          minHeight: 0,
        }}
      >
        {loadingAnnouncement}
        {errorAnnouncement}
        {skeletonElement}
        {placeholderElement}
        {imageElement}
      </div>

      <div className="rt-Image-caption" style={{ flex: '0 0 auto' }}>
        {caption}
      </div>
    </div>
  );
});

Image.displayName = 'Image';

export { Image };
export type { ImageProps };
