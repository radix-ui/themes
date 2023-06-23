'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';
import {
  defaultSwitchSize,
  defaultSwitchVariant,
  defaultSwitchColor,
  defaultSwitchRadius,
} from './switch.props';

import type { MarginProps, Color, ButtonRadius, Responsive } from '../helpers';
import type { SwitchSize, SwitchVariant } from './switch.props';

type SwitchElement = React.ElementRef<typeof SwitchPrimitive.Root>;
interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'children'>,
    MarginProps {
  size?: Responsive<SwitchSize>;
  variant?: SwitchVariant;
  color?: Color;
  radius?: ButtonRadius;
}
const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = defaultSwitchSize,
    variant = defaultSwitchVariant,
    color = defaultSwitchColor,
    radius = defaultSwitchRadius,
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
        data-accent-scale={color}
        data-button-radius={radius}
        {...switchProps}
        ref={forwardedRef}
        className={classNames('rui-reset-button rui-SwitchButton')}
      >
        <SwitchPrimitive.Thumb className="rui-SwitchThumb" />
      </SwitchPrimitive.Root>
    </span>
  );
});
Switch.displayName = 'Switch';

export { Switch };
