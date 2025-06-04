import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { headingPropDefs } from './heading.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type HeadingElement = React.ElementRef<'h1'>;
type HeadingOwnProps = GetPropDefTypes<typeof headingPropDefs>;
interface HeadingProps
  extends ComponentPropsWithout<'h1', RemovedProps>,
    MarginProps,
    HeadingOwnProps {}

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
    <Slot.Root
      data-accent-color={color}
      {...headingProps}
      ref={forwardedRef}
      className={classNames('rt-Heading', className)}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
});
Heading.displayName = 'Heading';

export { Heading };
export type { HeadingProps };
