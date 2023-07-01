'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import { defaultSeparatorSize, defaultSeparatorColor } from './separator.props';

import type { PropsWithoutRefOrColor, MarginProps, Color, Responsive } from '../helpers';
import type { SeparatorSize } from './separator.props';

type SeparatorElement = React.ElementRef<typeof SeparatorPrimitive.Root>;
interface SeparatorProps
  extends PropsWithoutRefOrColor<typeof SeparatorPrimitive.Root>,
    MarginProps {
  size?: Responsive<SeparatorSize>;
  color?: Color | 'color';
}
const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultSeparatorSize,
    color = defaultSeparatorColor,
    ...separatorProps
  } = marginRest;
  return (
    <SeparatorPrimitive.Root
      data-accent-scale={color}
      {...separatorProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Separator',
        withBreakpoints(size, 'size'),
        withMarginProps(marginProps),
        className
      )}
    />
  );
});
Separator.displayName = 'Separator';

export { Separator };
