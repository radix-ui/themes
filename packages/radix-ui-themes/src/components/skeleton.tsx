import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import * as React from 'react';

import { extractProps } from '../helpers/extract-props.js';
import { inert } from '../helpers/inert.js';
import { marginPropDefs } from '../props/margin.props.js';
import { skeletonPropDefs } from './skeleton.props.js';

import { useComposedRefs } from '@radix-ui/react-compose-refs';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type SkeletonElement = React.ElementRef<'span'>;
type SkeletonOwnProps = GetPropDefTypes<typeof skeletonPropDefs>;
interface SkeletonProps
  extends ComponentPropsWithout<'span', RemovedProps>,
    MarginProps,
    SkeletonOwnProps {
  onIntersection?: IntersectionObserverCallback;
  intersectionOptions?: IntersectionObserverInit;
}
const Skeleton = React.forwardRef<SkeletonElement, SkeletonProps>((props, forwardedRef) => {
  const { children, className, loading, onIntersection, intersectionOptions, ...skeletonProps } =
    extractProps(props, skeletonPropDefs, marginPropDefs);
  const ref = React.useRef<HTMLSpanElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);

  React.useEffect(() => {
    if (!onIntersection) return;

    const observer = new IntersectionObserver(onIntersection, intersectionOptions);
    observer.observe(ref.current!);

    return () => observer.disconnect();
  }, []);

  React.useImperativeHandle(forwardedRef, () => ref.current!);

  if (!loading) return children;

  const Tag = React.isValidElement(children) ? Slot : 'span';

  return (
    <Tag
      ref={composedRefs}
      aria-hidden
      className={classNames('rt-Skeleton', className)}
      data-inline-skeleton={React.isValidElement(children) ? undefined : true}
      tabIndex={-1}
      // @ts-ignore
      inert={inert}
      {...skeletonProps}
    >
      {children}
    </Tag>
  );
});
Skeleton.displayName = 'Skeleton';

export { Skeleton };
export type { SkeletonProps };
