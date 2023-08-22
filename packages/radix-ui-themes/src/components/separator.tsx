'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { separatorPropDefs } from './separator.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type SeparatorElement = React.ElementRef<typeof SeparatorPrimitive.Root>;
type SeparatorOwnProps = GetPropDefTypes<typeof separatorPropDefs>;
interface SeparatorProps
  extends PropsWithoutRefOrColor<typeof SeparatorPrimitive.Root>,
    MarginProps,
    SeparatorOwnProps {}
const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = separatorPropDefs.size.default,
    color = separatorPropDefs.color.default,
    ...separatorProps
  } = marginRest;
  return (
    <SeparatorPrimitive.Root
      data-accent-color={color}
      {...separatorProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Separator',
        className,
        withBreakpoints(size, 'rt-r-size'),
        withMarginProps(marginProps)
      )}
    />
  );
});
Separator.displayName = 'Separator';

export { Separator };
export type { SeparatorProps };
