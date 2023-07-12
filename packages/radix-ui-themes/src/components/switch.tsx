'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { switchPropDefs } from './switch.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type SwitchElement = React.ElementRef<typeof SwitchPrimitive.Root>;
type SwitchOwnProps = GetPropDefTypes<typeof switchPropDefs>;
interface SwitchProps
  extends Omit<PropsWithoutRefOrColor<typeof SwitchPrimitive.Root>, 'children'>,
    MarginProps,
    SwitchOwnProps {}
const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = switchPropDefs.size.default,
    variant = switchPropDefs.variant.default,
    color = switchPropDefs.color.default,
    highContrast = switchPropDefs.highContrast.default,
    radius = switchPropDefs.radius.default,
    ...switchProps
  } = marginRest;
  return (
    <span
      className={classNames(
        'rt-SwitchRoot',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        { 'high-contrast': highContrast },
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
        className={classNames('rt-reset-button rt-SwitchButton')}
      >
        <SwitchPrimitive.Thumb className="rt-SwitchThumb" />
      </SwitchPrimitive.Root>
    </span>
  );
});
Switch.displayName = 'Switch';

export { Switch };
