import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { headingSizeDefault, headingTrimDefault, headingColorDefault } from './heading.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { HeadingSize, HeadingTrim } from './heading.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale } from '../theme';

type HeadingElement = React.ElementRef<'h1'>;
interface HeadingProps extends PropsWithoutRefOrColor<'h1'>, MarginProps {
  asChild?: boolean;
  size?: Responsive<HeadingSize>;
  trim?: Responsive<HeadingTrim>;
  color?: ThemeAccentScale | 'color';
}
const Heading = React.forwardRef<HeadingElement, HeadingProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    asChild = false,
    size = headingSizeDefault,
    trim = headingTrimDefault,
    color = headingColorDefault,
    ...headingProps
  } = marginRest;
  const Comp = asChild ? Slot : 'h1';
  return (
    <Comp
      data-accent-scale={color}
      {...headingProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Heading',
        withBreakpoints(size, 'size'),
        withMarginProps(marginProps),
        withBreakpoints(trim, 'rui-lt'),
        className
      )}
    />
  );
});
Heading.displayName = 'Heading';

export { Heading };
