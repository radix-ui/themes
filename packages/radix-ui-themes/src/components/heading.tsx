import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import {
  headingSizeDefault,
  headingAlignDefault,
  headingTrimDefault,
  headingColorDefault,
  headingHighContrastDefault,
} from './heading.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { HeadingSize, HeadingAlign, HeadingTrim } from './heading.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale } from '../theme';

type HeadingElement = React.ElementRef<'h1'>;
interface HeadingProps extends PropsWithoutRefOrColor<'h1'>, MarginProps {
  asChild?: boolean;
  size?: Responsive<HeadingSize>;
  align?: Responsive<HeadingAlign>;
  trim?: Responsive<HeadingTrim>;
  color?: ThemeAccentScale | 'color';
  highContrast?: boolean;
}
const Heading = React.forwardRef<HeadingElement, HeadingProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    asChild = false,
    size = headingSizeDefault,
    align = headingAlignDefault,
    trim = headingTrimDefault,
    color = headingColorDefault,
    highContrast = headingHighContrastDefault,
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
        withBreakpoints(align, 'rui-ta'),
        withBreakpoints(trim, 'rui-lt'),
        { 'high-contrast': highContrast },
        className
      )}
    />
  );
});
Heading.displayName = 'Heading';

export { Heading };
