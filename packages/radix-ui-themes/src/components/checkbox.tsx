'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import {
  defaultCheckboxSize,
  defaultCheckboxVariant,
  defaultCheckboxColor,
  defaultCheckboxHighContrast,
  defaultCheckboxRadius,
} from './checkbox.props';

import type { MarginProps, Color, Radius, Responsive } from '../helpers';
import type { CheckboxSize, CheckboxVariant } from './checkbox.props';

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'children'>,
    MarginProps {
  size?: Responsive<CheckboxSize>;
  variant?: CheckboxVariant;
  color?: Color;
  highContrast?: boolean;
  radius?: Radius;
}
const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = defaultCheckboxSize,
    variant = defaultCheckboxVariant,
    color = defaultCheckboxColor,
    highContrast = defaultCheckboxHighContrast,
    radius = defaultCheckboxRadius,
    ...checkboxProps
  } = marginRest;
  return (
    <span
      data-radius={radius}
      className={classNames(
        'rui-CheckboxRoot',
        withBreakpoints(size, 'size'),
        withMarginProps(marginProps),
        className
      )}
      style={style}
    >
      <CheckboxPrimitive.Root
        data-accent-scale={color}
        {...checkboxProps}
        ref={forwardedRef}
        className={classNames('rui-reset-button rui-CheckboxButton', `variant-${variant}`, {
          highContrast,
        })}
      >
        <CheckboxPrimitive.Indicator className="rui-CheckboxIndicator">
          <CheckIcon width={undefined} height={undefined} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </span>
  );
});
Checkbox.displayName = 'Checkbox';

export { Checkbox };
