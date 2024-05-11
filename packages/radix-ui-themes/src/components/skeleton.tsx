import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';

import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';
import { skeletonPropDefs } from './skeleton.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';

type SkeletonElement = React.ElementRef<'span'>;
type SkeletonOwnProps = GetPropDefTypes<typeof skeletonPropDefs>;
interface SkeletonProps
  extends ComponentPropsWithout<'span', RemovedProps>,
    MarginProps,
    SkeletonOwnProps {}
const Skeleton = React.forwardRef<SkeletonElement, SkeletonProps>((props, forwardedRef) => {
  const { children, className, loading, ...skeletonProps } = extractProps(
    props,
    skeletonPropDefs,
    marginPropDefs
  );

  if (!loading) return children;

  const Tag = React.isValidElement(children) ? Slot : 'span';

  return (
    <Tag
      ref={forwardedRef}
      aria-hidden
      className={classNames('rt-Skeleton', className)}
      data-inline-skeleton={React.isValidElement(children) ? undefined : true}
      tabIndex={-1}
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
