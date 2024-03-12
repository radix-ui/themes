import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { headingPropDefs } from './heading.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithout, NiceIntersection, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type HeadingElement = React.ElementRef<'h1'>;
type HeadingElementProps = ComponentPropsWithout<'h1', RemovedProps>;
type HeadingOwnProps = GetPropDefTypes<typeof headingPropDefs>;
type CommonHeadingProps = NiceIntersection<MarginProps, HeadingOwnProps>;
type HeadingAsChildProps = { asChild: true; as?: never } & HeadingElementProps;
type HeadingAsProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  asChild?: false;
} & HeadingElementProps;
type HeadingProps = CommonHeadingProps & (HeadingAsChildProps | HeadingAsProps);
const Heading = React.forwardRef<HeadingElement, HeadingProps>((props, forwardedRef) => {
  const {
    children,
    className,
    asChild,
    as: Tag = 'h1',
    color,
    ...headingProps
  } = extractProps(props, headingPropDefs, marginPropDefs);
  return (
    <Slot
      data-accent-color={color || undefined}
      {...headingProps}
      ref={forwardedRef}
      className={classNames('rt-Heading', className)}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});
Heading.displayName = 'Heading';

export { Heading };
export type { HeadingProps };
