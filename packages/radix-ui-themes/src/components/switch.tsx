'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, ButtonRadius, Responsive } from '../helpers';

const switchSizes = ['1', '2', '3'] as const;
type SwitchSize = (typeof switchSizes)[number];

const switchVariants = ['solid', 'solid-mono'] as const;
type SwitchVariant = (typeof switchVariants)[number];

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
        className={classNames('rui-reset-button rui-SwitchButton')}
      >
        <SwitchPrimitive.Thumb className="rui-SwitchThumb" />
      </SwitchPrimitive.Root>
    </span>
  );
});
Switch.displayName = 'Switch';

export { switchSizes, switchVariants, Switch };
export type { SwitchSize, SwitchVariant };
