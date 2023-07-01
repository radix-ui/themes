'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import {
  defaultSwitchSize,
  defaultSwitchVariant,
  defaultSwitchColor,
  defaultSwitchHighContrast,
  defaultSwitchRadius,
} from './switch.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { SwitchSize, SwitchVariant } from './switch.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale, ThemeRadius } from '../theme';

type SwitchElement = React.ElementRef<typeof SwitchPrimitive.Root>;
interface SwitchProps
  extends Omit<PropsWithoutRefOrColor<typeof SwitchPrimitive.Root>, 'children'>,
    MarginProps {
  size?: Responsive<SwitchSize>;
  variant?: SwitchVariant;
  color?: ThemeAccentScale;
  highContrast?: boolean;
  radius?: ThemeRadius;
}
const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = defaultSwitchSize,
    variant = defaultSwitchVariant,
    color = defaultSwitchColor,
    highContrast = defaultSwitchHighContrast,
    radius = defaultSwitchRadius,
    ...switchProps
  } = marginRest;
  return (
    <span
      className={classNames(
        'rui-SwitchRoot',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        { highContrast },
        withMarginProps(marginProps),
        className
      )}
      style={style}
    >
      <SwitchPrimitive.Root
        data-accent-scale={color}
        data-radius={radius}
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
