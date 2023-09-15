'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { radioGroupPropDefs } from './radio-group.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type RadioGroupElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
type RadioGroupOwnProps = GetPropDefTypes<typeof radioGroupPropDefs>;
interface RadioGroupRootProps
  extends PropsWithoutRefOrColor<typeof RadioGroupPrimitive.Root>,
    MarginProps,
    RadioGroupOwnProps {}
const RadioGroupRoot = React.forwardRef<RadioGroupElement, RadioGroupRootProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const {
      className,
      size = radioGroupPropDefs.size.default,
      variant = radioGroupPropDefs.variant.default,
      color = radioGroupPropDefs.color.default,
      highContrast = radioGroupPropDefs.highContrast.default,
      ...rootProps
    } = marginRest;
    return (
      <RadioGroupPrimitive.Root
        data-accent-color={color}
        {...rootProps}
        ref={forwardedRef}
        className={classNames(
          'rt-RadioGroupRoot',
          className,
          withBreakpoints(size, 'rt-r-size'),
          `rt-variant-${variant}`,
          { 'rt-high-contrast': highContrast },
          withMarginProps(marginProps)
        )}
      />
    );
  }
);
RadioGroupRoot.displayName = 'RadioGroupRoot';

type RadioGroupItemElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;
interface RadioGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'children'>,
    MarginProps {}
const RadioGroupItem = React.forwardRef<RadioGroupItemElement, RadioGroupItemProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const { className, style, ...itemProps } = marginRest;
    return (
      <span
        className={classNames('rt-RadioGroupItem', className, withMarginProps(marginProps))}
        style={style}
      >
        <RadioGroupPrimitive.Item
          {...itemProps}
          ref={forwardedRef}
          className={classNames('rt-reset', 'rt-RadioGroupButton')}
        >
          <RadioGroupPrimitive.Indicator className="rt-RadioGroupIndicator" />
        </RadioGroupPrimitive.Item>
      </span>
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
