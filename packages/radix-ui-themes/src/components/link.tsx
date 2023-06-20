import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';
import {
  defaultLinkSize,
  defaultLinkVariant,
  defaultLinkWeight,
  defaultLinkGap,
  defaultLinkColor,
} from './link.props';

import type { MarginProps, ColorOrGray, Responsive } from '../helpers';
import type { LinkSize, LinkVariant, LinkWeight, LinkGap } from './link.props';

type LinkElement = React.ElementRef<'a'>;
interface LinkProps extends Omit<React.ComponentPropsWithoutRef<'a'>, 'color'>, MarginProps {
  asChild?: boolean;
  size?: Responsive<LinkSize>;
  variant?: LinkVariant;
  weight?: Responsive<LinkWeight>;
  gap?: Responsive<LinkGap>;
  color?: ColorOrGray;
}
const Link = React.forwardRef<LinkElement, LinkProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    asChild = false,
    size = defaultLinkSize,
    variant = defaultLinkVariant,
    weight = defaultLinkWeight,
    gap = defaultLinkGap,
    color = defaultLinkColor,
    ...linkProps
  } = marginRest;
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      data-color-scale={color}
      {...linkProps}
      ref={forwardedRef}
      className={classNames(
        className,
        'rui-reset-a',
        'rui-Text',
        'rui-Link',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withBreakpoints(weight, 'weight'),
        withMargin(marginProps),
        withBreakpoints(gap, 'rui-gap')
      )}
    />
  );
});
Link.displayName = 'Link';

export { Link };
