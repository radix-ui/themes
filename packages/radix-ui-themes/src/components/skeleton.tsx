import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { skeletonPropDefs } from './skeleton.props';
import {
  extractHeightProps,
  extractMarginProps,
  extractWidthProps,
  getHeightStyles,
  getWidthStyles,
  mergeStyles,
  withMarginProps,
} from '../helpers';

import type { MarginProps, GetPropDefTypes } from '../helpers';

type SkeletonElement = React.ElementRef<'span'>;
type SkeletonOwnProps = GetPropDefTypes<typeof skeletonPropDefs>;
interface SkeletonProps
  extends React.ComponentPropsWithoutRef<'span'>,
    MarginProps,
    SkeletonOwnProps {}
const Skeleton = React.forwardRef<SkeletonElement, SkeletonProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: widthRest, ...widthProps } = extractWidthProps(marginRest);
  const { rest: heightRest, ...heightProps } = extractHeightProps(widthRest);
  const {
    className,
    children,
    style,
    loading = skeletonPropDefs.loading.default,
    ...skeletonProps
  } = heightRest;

  const [widthClassNames, widthCustomProperties] = getWidthStyles(widthProps);
  const [heightClassNames, heightCustomProperties] = getHeightStyles(heightProps);

  if (!loading) return <>{children}</>;

  const Tag = React.isValidElement(children) ? Slot : 'span';

  return (
    <Tag
      ref={forwardedRef}
      aria-hidden
      className={classNames(
        'rt-Skeleton',
        className,
        widthClassNames,
        heightClassNames,
        withMarginProps(marginProps)
      )}
      data-inline-skeleton={React.isValidElement(children) ? undefined : true}
      tabIndex={-1}
      style={mergeStyles(widthCustomProperties, heightCustomProperties, style)}
      // Workaround to use `inert` until https://github.com/facebook/react/pull/24730 is merged.
      {...{ inert: true ? '' : undefined }}
      {...skeletonProps}
    >
      {children}
    </Tag>
  );
});
Skeleton.displayName = 'Skeleton';

export { Skeleton };
export type { SkeletonProps };
