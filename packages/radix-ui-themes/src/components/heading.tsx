import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { headingPropDefs } from './heading.props';
import { extractProps, marginPropDefs } from '../helpers';

import type {
  PropsWithoutRefOrColor,
  MarginProps,
  GetPropDefTypes,
  NiceIntersection,
} from '../helpers';

type HeadingElement = React.ElementRef<'h1'>;
type HeadingOwnProps = GetPropDefTypes<typeof headingPropDefs>;
type CommonHeadingProps = NiceIntersection<MarginProps, HeadingOwnProps>;
type HeadingAsChildProps = { asChild: true; as?: never } & PropsWithoutRefOrColor<'h1'>;
type HeadingAsProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  asChild?: false;
} & PropsWithoutRefOrColor<'h1'>;
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
