import * as React from 'react';
import classNames from 'classnames';
import { Switch as SwitchPrimitive } from 'radix-ui';

import { extractProps } from '../helpers/extract-props';
import { marginPropDefs } from '../props/margin.props';
import { switchPropDefs } from './switch.props';

import type { MarginProps } from '../props/margin.props';
import type { GetPropDefTypes } from '../props/prop-def';
import type { ComponentPropsWithout } from '../helpers/component-props';

type SwitchElement = React.ElementRef<typeof SwitchPrimitive.Root>;
type SwitchOwnProps = GetPropDefTypes<typeof switchPropDefs>;
interface SwitchProps
  extends ComponentPropsWithout<
      typeof SwitchPrimitive.Root,
      'asChild' | 'color' | 'defaultValue' | 'children'
    >,
    MarginProps,
    SwitchOwnProps {}
const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, forwardedRef) => {
  const { className, color, radius, ...switchProps } = extractProps(
    props,
    switchPropDefs,
    marginPropDefs
  );
  return (
    <SwitchPrimitive.Root
      data-accent-color={color}
      data-radius={radius}
      {...switchProps}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-SwitchRoot', className)}
    >
      <SwitchPrimitive.Thumb
        className={classNames('rt-SwitchThumb', { 'rt-high-contrast': props.highContrast })}
      />
    </SwitchPrimitive.Root>
  );
});
Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };
