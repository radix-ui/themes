import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import {
  textSizeDefault,
  textWeightDefault,
  textAlignDefault,
  textTrimDefault,
  textColorDefault,
  textHighContrastDefault,
} from './text.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { TextSize, TextWeight, TextAlign, TextTrim } from './text.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale } from '../theme-options';

type TextElement = React.ElementRef<'span'>;
type CommonTextProps = MarginProps & {
  size?: Responsive<TextSize>;
  weight?: Responsive<TextWeight>;
  align?: Responsive<TextAlign>;
  trim?: Responsive<TextTrim>;
  color?: ThemeAccentScale | 'color';
  highContrast?: boolean;
};
type TextAsChildProps = { asChild?: boolean; as?: never } & PropsWithoutRefOrColor<'span'>;
type TextSpanProps = { as?: 'span'; asChild?: never } & PropsWithoutRefOrColor<'span'>;
type TextDivProps = { as?: 'div'; asChild?: never } & PropsWithoutRefOrColor<'div'>;
type TextPProps = { as?: 'p'; asChild?: never } & PropsWithoutRefOrColor<'p'>;
type TextProps = CommonTextProps & (TextAsChildProps | TextSpanProps | TextDivProps | TextPProps);
const Text = React.forwardRef<TextElement, TextProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    children,
    className,
    asChild = false,
    as: Tag = 'span',
    size = textSizeDefault,
    weight = textWeightDefault,
    align = textAlignDefault,
    trim = textTrimDefault,
    color = textColorDefault,
    highContrast = textHighContrastDefault,
    ...textProps
  } = marginRest;
  return (
    <Slot
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
        { 'high-contrast': highContrast },
        className
      )}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});
Text.displayName = 'Text';

export { Text };
