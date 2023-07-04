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
import type { ThemeAccentScale } from '../theme-options';

type HeadingElement = React.ElementRef<'h1'>;
type HeadingProps = PropsWithoutRefOrColor<'h1'> &
  MarginProps & {
    size?: Responsive<HeadingSize>;
    align?: Responsive<HeadingAlign>;
    trim?: Responsive<HeadingTrim>;
    color?: ThemeAccentScale | 'color';
    highContrast?: boolean;
  } & (
    | { asChild?: boolean; as?: never }
    | { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; asChild?: never }
  );
const Heading = React.forwardRef<HeadingElement, HeadingProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    children,
    className,
    asChild = false,
    as: Tag = 'h1',
    size = headingSizeDefault,
    align = headingAlignDefault,
    trim = headingTrimDefault,
    color = headingColorDefault,
    highContrast = headingHighContrastDefault,
    ...headingProps
  } = marginRest;
  return (
    <Slot
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
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});
Heading.displayName = 'Heading';

export { Heading };
