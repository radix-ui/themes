import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, Responsive } from '../helpers';

type LinkElement = React.ElementRef<'a'>;
interface LinkProps extends Omit<React.ComponentPropsWithoutRef<'a'>, 'color'>, MarginProps {
  asChild?: boolean;
  size?: Responsive<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  gap?: Responsive<'0' | '1' | '2'>;
  weight?: Responsive<'normal' | 'bold'>;
  variant?: 'high-contrast';
  color?: Color;
}
export const Link = React.forwardRef<LinkElement, LinkProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    asChild = false,
    size,
    gap,
    weight = 'normal',
    variant,
    color,
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
        'reset-a',
        'rui-Text',
        'rui-Link',
        withBreakpoints(size, 'size'),
        withBreakpoints(weight, 'weight'),
        `variant-${variant}`,
        withMargin(marginProps),
        withBreakpoints(gap, 'rui-gap')
      )}
    />
  );
});
Link.displayName = 'Link';
