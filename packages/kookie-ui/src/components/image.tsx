'use client';

import * as React from 'react';
import classNames from 'classnames';

import { imagePropDefs } from './image.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';
import { widthPropDefs } from '../props/width.props.js';
import { heightPropDefs } from '../props/height.props.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { WidthProps } from '../props/width.props.js';
import type { HeightProps } from '../props/height.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type ImageElement = React.ElementRef<'img'>;
type ImageOwnProps = GetPropDefTypes<typeof imagePropDefs> & {
  loading?: 'eager' | 'lazy';
};

interface ImageProps
  extends ComponentPropsWithout<'img', RemovedProps | 'color' | 'width' | 'height' | 'alt'>,
    MarginProps,
    WidthProps,
    HeightProps,
    ImageOwnProps {
  /**
   * The alt attribute provides alternative information for an image if a user for some reason cannot view it.
   * Required for accessibility when not using asChild.
   */
  alt?: string;
}

const Image = React.forwardRef<ImageElement, ImageProps>((props, forwardedRef) => {
  const { variant = 'surface', fit: _fit = 'cover', children } = props;
  const {
    asChild,
    className,
    radius,
    style,
    loading = 'lazy',
    alt,
    src,
    children: _children, // Extract children to exclude from imgProps
    ...imgProps
  } = extractProps(props, imagePropDefs, marginPropDefs, widthPropDefs, heightPropDefs);

  // Create the standard img element
  const imgElement = (
    <img
      data-radius={radius}
      loading={loading}
      style={style}
      className={classNames(
        'rt-reset',
        'rt-Image',
        variant === 'blur' && 'rt-Image--blur',
        className,
      )}
      alt={alt}
      src={src}
      {...imgProps}
      ref={forwardedRef}
    />
  );

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
              style={{ ...style, position: 'relative', zIndex: 1 }}
              className={classNames('rt-reset', 'rt-Image', 'rt-Image--blur', className)}
              alt={alt}
              src={src}
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
        children: imgElement,
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
          style={{ ...style, position: 'relative', zIndex: 1 }}
          className={classNames('rt-reset', 'rt-Image', 'rt-Image--blur', className)}
          alt={alt}
          src={src}
          {...imgProps}
          ref={forwardedRef}
        />
      </div>
    );
  }

  return imgElement;
});

Image.displayName = 'Image';

export { Image };
export type { ImageProps };
