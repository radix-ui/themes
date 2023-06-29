import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import {
  defaultLinkSize,
  defaultLinkWeight,
  defaultLinkColor,
  defaultLinkHighContrast,
} from './link.props';

import type { MarginProps, Color, Responsive } from '../helpers';
import type { LinkSize, LinkWeight } from './link.props';

type LinkElement = React.ElementRef<'a'>;
interface LinkProps extends Omit<React.ComponentPropsWithoutRef<'a'>, 'color'>, MarginProps {
  asChild?: boolean;
  size?: Responsive<LinkSize>;
  weight?: Responsive<LinkWeight>;
  color?: Color;
  highContrast?: boolean;
}
const Link = React.forwardRef<LinkElement, LinkProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    asChild = false,
    size = defaultLinkSize,
    weight = defaultLinkWeight,
    color = defaultLinkColor,
    highContrast = defaultLinkHighContrast,
    ...linkProps
  } = marginRest;
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      data-accent-scale={color}
      {...linkProps}
      ref={forwardedRef}
      className={classNames(
        className,
        'rui-reset-a',
        'rui-Text',
        'rui-Link',
        withBreakpoints(size, 'size'),
        withBreakpoints(weight, 'weight'),
        { highContrast },
        withMarginProps(marginProps)
      )}
    />
  );
});
Link.displayName = 'Link';

export { Link };
