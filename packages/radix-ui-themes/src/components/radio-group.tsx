'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import {
  defaultRadioGroupSize,
  defaultRadioGroupVariant,
  defaultRadioGroupColor,
  defaultRadioGroupHighContrast,
} from './radio-group.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { RadioGroupSize, RadioGroupVariant } from './radio-group.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale } from '../theme';

type RadioGroupElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
interface RadioGroupRootProps
  extends PropsWithoutRefOrColor<typeof RadioGroupPrimitive.Root>,
    MarginProps {
  size?: Responsive<RadioGroupSize>;
  variant?: RadioGroupVariant;
  color?: ThemeAccentScale;
  highContrast?: boolean;
}
const RadioGroupRoot = React.forwardRef<RadioGroupElement, RadioGroupRootProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const {
      className,
      size = defaultRadioGroupSize,
      variant = defaultRadioGroupVariant,
      color = defaultRadioGroupColor,
      highContrast = defaultRadioGroupHighContrast,
      ...rootProps
    } = marginRest;
    return (
      <RadioGroupPrimitive.Root
        data-accent-scale={color}
        {...rootProps}
        ref={forwardedRef}
        className={classNames(
          'rui-RadioGroupRoot',
          withBreakpoints(size, 'size'),
          `variant-${variant}`,
          { highContrast },
          withMarginProps(marginProps),
          className
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
        className={classNames('rui-RadioGroupItem', withMarginProps(marginProps), className)}
        style={style}
      >
        <RadioGroupPrimitive.Item
          {...itemProps}
          ref={forwardedRef}
          className={classNames('rui-reset-button', 'rui-RadioGroupButton')}
        >
          <RadioGroupPrimitive.Indicator className="rui-RadioGroupIndicator" />
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
