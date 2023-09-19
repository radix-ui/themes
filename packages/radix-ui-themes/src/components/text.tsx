import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { textPropDefs } from './text.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type {
  PropsWithoutRefOrColor,
  MarginProps,
  GetPropDefTypes,
  NiceIntersection,
} from '../helpers';

type TextElement = React.ElementRef<'span'>;
type TextOwnProps = GetPropDefTypes<typeof textPropDefs>;
type CommonTextProps = NiceIntersection<MarginProps, TextOwnProps>;
type TextAsChildProps = { asChild?: boolean; as?: never } & PropsWithoutRefOrColor<'span'>;
type TextSpanProps = { as?: 'span'; asChild?: never } & PropsWithoutRefOrColor<'span'>;
type TextDivProps = { as: 'div'; asChild?: never } & PropsWithoutRefOrColor<'div'>;
type TextLabelProps = { as: 'label'; asChild?: never } & PropsWithoutRefOrColor<'label'>;
type TextPProps = { as: 'p'; asChild?: never } & PropsWithoutRefOrColor<'p'>;
type TextProps = CommonTextProps &
  (TextAsChildProps | TextSpanProps | TextDivProps | TextLabelProps | TextPProps);

const Text = React.forwardRef<TextElement, TextProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    children,
    className,
    asChild = false,
    as: Tag = 'span',
    size = textPropDefs.size.default,
    weight = textPropDefs.weight.default,
    align = textPropDefs.align.default,
    trim = textPropDefs.trim.default,
    color = textPropDefs.color.default,
    highContrast = textPropDefs.highContrast.default,
    ...textProps
  } = marginRest;
  return (
    <Slot
      data-accent-color={color}
      {...textProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Text',
        className,
        withBreakpoints(size, 'rt-r-size'),
        withBreakpoints(weight, 'rt-r-weight'),
        withBreakpoints(align, 'rt-r-ta'),
        withBreakpoints(trim, 'rt-r-lt'),
        { 'rt-high-contrast': highContrast },
        withMarginProps(marginProps)
      )}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});
Text.displayName = 'Text';

export { Text };
export type { TextProps };
