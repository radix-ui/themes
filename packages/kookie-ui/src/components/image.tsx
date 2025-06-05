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
  extends ComponentPropsWithout<'img', RemovedProps | 'color' | 'width' | 'height'>,
    MarginProps,
    WidthProps,
    HeightProps,
    ImageOwnProps {}

const Image = React.forwardRef<ImageElement, ImageProps>((props, forwardedRef) => {
  const {
    className,
    radius,
    style,
    loading = 'lazy',
    ...imgProps
  } = extractProps(props, imagePropDefs, marginPropDefs, widthPropDefs, heightPropDefs);

  return (
    <img
      data-radius={radius}
      loading={loading}
      style={style}
      className={classNames('rt-Image', className)}
      {...imgProps}
      ref={forwardedRef}
    />
  );
});

Image.displayName = 'Image';

export { Image };
export type { ImageProps };
