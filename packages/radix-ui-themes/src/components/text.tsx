import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, Responsive } from '../helpers';

const textSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type TextSize = (typeof textSizes)[number];

const textWeights = ['normal', 'bold'] as const;
type TextWeight = (typeof textWeights)[number];

const textAlignValues = ['left', 'center', 'right'] as const;
type TextAlign = (typeof textAlignValues)[number];

const textTrimValues = ['normal', 'start', 'end', 'both'] as const;
type TextTrim = (typeof textTrimValues)[number];

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
    size = '3',
    weight = 'normal',
    align,
    trim,
    color,
    ...textProps
  } = marginRest;
  const Comp = asChild ? Slot : 'p';

  return (
    <Comp
      data-color-scale={color}
      {...textProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Text',
        withBreakpoints(size, 'size'),
        withBreakpoints(weight, 'weight'),
        withMargin(marginProps),
        withBreakpoints(align, 'rui-ta'),
        withBreakpoints(trim, 'rui-lt'),
        className
      )}
    />
  );
});
Text.displayName = 'Text';

export { textSizes, textWeights, textAlignValues, textTrimValues, Text };
export type { TextSize, TextWeight, TextAlign, TextTrim };
