'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { radioGroupPropDefs } from './radio-group.props';
import { extractProps, marginPropDefs } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type RadioGroupRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
type RadioGroupRootOwnProps = GetPropDefTypes<typeof radioGroupPropDefs>;
interface RadioGroupRootProps
  extends PropsWithoutRefOrColor<typeof RadioGroupPrimitive.Root>,
    MarginProps,
    RadioGroupRootOwnProps {}
const RadioGroupRoot = React.forwardRef<RadioGroupRootElement, RadioGroupRootProps>(
  (props, forwardedRef) => {
    const { className, color, ...rootProps } = extractProps(
      props,
      radioGroupPropDefs,
      marginPropDefs
    );
    return (
      <RadioGroupPrimitive.Root
        data-accent-color={color}
        {...rootProps}
        ref={forwardedRef}
        className={classNames('rt-RadioGroupRoot', className)}
      />
    );
  }
);
RadioGroupRoot.displayName = 'RadioGroupRoot';

type RadioGroupItemElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;
interface RadioGroupItemProps
  extends Omit<PropsWithoutRefOrColor<typeof RadioGroupPrimitive.Item>, 'asChild' | 'children'>,
    MarginProps {}
const RadioGroupItem = React.forwardRef<RadioGroupItemElement, RadioGroupItemProps>(
  (props, forwardedRef) => {
    const { className, ...itemProps } = extractProps(props, marginPropDefs);
    return (
      <RadioGroupPrimitive.Item
        {...itemProps}
        asChild={false}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-RadioGroupItem', className)}
      >
        <RadioGroupPrimitive.Indicator className="rt-RadioGroupIndicator" />
      </RadioGroupPrimitive.Item>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

const RadioGroup = Object.assign(
  {},
  {
    Root: RadioGroupRoot,
    Item: RadioGroupItem,
  }
);

export { RadioGroup, RadioGroupRoot, RadioGroupItem };
export type { RadioGroupRootProps, RadioGroupItemProps };
