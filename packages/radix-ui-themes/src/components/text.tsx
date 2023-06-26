import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import {
  defaultTextSize,
  defaultTextWeight,
  defaultTextAlign,
  defaultTextTrim,
  defaultTextColor,
} from './text.props';

import type { MarginProps, Color, Responsive } from '../helpers';
import type { TextSize, TextWeight, TextAlign, TextTrim } from './text.props';

type TextElement = React.ElementRef<'p'>;
interface TextProps extends Omit<React.ComponentPropsWithoutRef<'p'>, 'color'>, MarginProps {
  asChild?: boolean;
  size?: Responsive<TextSize>;
  weight?: Responsive<TextWeight>;
  align?: Responsive<TextAlign>;
  trim?: Responsive<TextTrim>;
  color?: Color | 'color';
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
