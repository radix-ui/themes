'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, ButtonRadius, Responsive } from '../helpers';

type SwitchElement = React.ElementRef<typeof SwitchPrimitive.Root>;
interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'children'>,
    MarginProps {
  size?: Responsive<'1' | '2' | '3'>;
  variant?: 'solid' | 'solid-mono';
  color?: Color;
  radius?: ButtonRadius;
}
const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = '2',
    variant = 'solid',
    color,
    radius,
    ...switchProps
  } = marginRest;

  return (
    <span
      className={classNames(
        'rui-SwitchRoot',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMargin(marginProps),
        className
      )}
      style={style}
    >
      <SwitchPrimitive.Root
        data-color-scale={color}
        data-button-radius={radius}
        {...switchProps}
        ref={forwardedRef}
        className={classNames('reset-button rui-SwitchButton')}
      >
        <SwitchPrimitive.Thumb className="rui-SwitchThumb" />
      </SwitchPrimitive.Root>
    </span>
  );
});
Switch.displayName = 'Switch';

export { Switch };
