import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import {
  defaultTextSize,
  defaultTextWeight,
  defaultTextAlign,
  defaultTextTrim,
  defaultTextColor,
} from './text.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { TextSize, TextWeight, TextAlign, TextTrim } from './text.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale } from '../theme';

type TextElement = React.ElementRef<'p'>;
interface TextProps extends PropsWithoutRefOrColor<'p'>, MarginProps {
  asChild?: boolean;
  size?: Responsive<TextSize>;
  weight?: Responsive<TextWeight>;
  align?: Responsive<TextAlign>;
  trim?: Responsive<TextTrim>;
  color?: ThemeAccentScale | 'color';
}
const Text = React.forwardRef<TextElement, TextProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    asChild = false,
    size = defaultTextSize,
    weight = defaultTextWeight,
    align = defaultTextAlign,
    trim = defaultTextTrim,
    color = defaultTextColor,
    ...textProps
  } = marginRest;
  const Comp = asChild ? Slot : 'p';
  return (
    <Comp
      data-accent-scale={color}
      {...textProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Text',
        withBreakpoints(size, 'size'),
        withBreakpoints(weight, 'weight'),
        withMarginProps(marginProps),
        withBreakpoints(align, 'rui-ta'),
        withBreakpoints(trim, 'rui-lt'),
        className
      )}
    />
  );
});
Text.displayName = 'Text';

export { Text };
