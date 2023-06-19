import * as React from 'react';
import classNames from 'classnames';
import {
  extractMarginProps,
  withMargin,
  extractPaddingProps,
  withPadding,
  extractLayoutProps,
  withLayout,
  withBreakpoints,
} from '../helpers';

import type { MarginProps, PaddingProps, LayoutProps, Responsive } from '../helpers';

const flexDisplayValues = ['none', 'inline-flex', 'flex'] as const;
type FlexDisplay = (typeof flexDisplayValues)[number];

const flexDirectionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
type FlexDirection = (typeof flexDirectionValues)[number];

const flexAlignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
type FlexAlign = (typeof flexAlignValues)[number];

const flexJustifyValues = ['start', 'center', 'end', 'between'] as const;
type FlexJustify = (typeof flexJustifyValues)[number];

const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;
type FlexWrap = (typeof flexWrapValues)[number];

const flexGapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type FlexGap = (typeof flexGapValues)[number];

type FlexElement = React.ElementRef<'div'>;
interface FlexProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    PaddingProps,
    LayoutProps {
  display?: Responsive<FlexDisplay>;
  direction?: Responsive<FlexDirection>;
  align?: Responsive<FlexAlign>;
  justify?: Responsive<FlexJustify>;
  wrap?: Responsive<FlexWrap>;
  gap?: Responsive<FlexGap>;
}
const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(marginRest);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(paddingRest);
  const {
    className,
    display = 'flex',
    direction,
    align,
    justify = 'start',
    wrap,
    gap,
    ...flexProps
  } = layoutRest;
  return (
    <div
      {...flexProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Flex',
        withLayout(layoutProps),
        withMargin(marginProps),
        withPadding(paddingProps),
        withBreakpoints(display, 'rui-display'),
        withBreakpoints(direction, 'rui-fd'),
        withBreakpoints(align, 'rui-ai'),
        withBreakpoints(justify, 'rui-jc', { between: 'space-between' }),
        withBreakpoints(wrap, 'rui-fw'),
        withBreakpoints(gap, 'rui-gap'),
        className
      )}
    />
  );
});
Flex.displayName = 'Flex';

export {
  flexDisplayValues,
  flexDirectionValues,
  flexAlignValues,
  flexJustifyValues,
  flexWrapValues,
  flexGapValues,
  Flex,
};
export type { FlexDisplay, FlexDirection, FlexAlign, FlexJustify, FlexWrap, FlexGap };
