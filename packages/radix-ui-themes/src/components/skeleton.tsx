import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { extractMarginProps, withMarginProps } from '../helpers';

import type { MarginProps } from '../helpers';

type SkeletonElement = React.ElementRef<'span'>;
interface SkeletonProps extends React.ComponentPropsWithoutRef<'span'>, MarginProps {}
const Skeleton = React.forwardRef<SkeletonElement, SkeletonProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, children, ...skeletonProps } = marginRest;
  const Tag = React.isValidElement(children) ? Slot : 'span';
  return (
    <Tag
      ref={forwardedRef}
      aria-hidden
      className={classNames('rt-Skeleton', className, withMarginProps(marginProps))}
      data-inline-skeleton={React.isValidElement(children) ? undefined : true}
      tabIndex={-1}
      {...skeletonProps}
    >
      {children}
    </Tag>
  );
});
Skeleton.displayName = 'Skeleton';

export { Skeleton };
export type { SkeletonProps };
