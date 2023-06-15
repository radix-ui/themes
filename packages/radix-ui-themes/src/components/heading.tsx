import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, Responsive } from '../helpers';

type HeadingElement = React.ElementRef<'h1'>;
interface HeadingProps extends Omit<React.ComponentPropsWithoutRef<'h1'>, 'color'>, MarginProps {
  asChild?: boolean;
  size?: Responsive<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  trim?: Responsive<'normal' | 'start' | 'end' | 'both'>;
  color?: Color | 'color';
}
const Heading = React.forwardRef<HeadingElement, HeadingProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, asChild = false, size = '6', trim, color, ...headingProps } = marginRest;
  const Comp = asChild ? Slot : 'h1';

  return (
    <Comp
      data-color-scale={color}
      {...headingProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Heading',
        withBreakpoints(size, 'size'),
        withMargin(marginProps),
        withBreakpoints(trim, 'rui-lt'),
        className
      )}
    />
  );
});
Heading.displayName = 'Heading';

export { Heading };
