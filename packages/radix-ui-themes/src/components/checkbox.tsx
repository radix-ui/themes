'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';
import {
  defaultCheckboxSize,
  defaultCheckboxVariant,
  defaultCheckboxColor,
  defaultCheckboxRadius,
} from './checkbox.props';

import type { MarginProps, Color, ButtonRadius, Responsive } from '../helpers';
import type { CheckboxSize, CheckboxVariant } from './checkbox.props';

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'children'>,
    MarginProps {
  size?: Responsive<CheckboxSize>;
  variant?: CheckboxVariant;
  color?: Color;
  radius?: ButtonRadius;
}
const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = defaultCheckboxSize,
    variant = defaultCheckboxVariant,
    color = defaultCheckboxColor,
    radius = defaultCheckboxRadius,
    ...checkboxProps
  } = marginRest;
  return (
    <span
      data-button-radius={radius}
      className={classNames(
        'rui-CheckboxRoot',
        withBreakpoints(size, 'size'),
        withMargin(marginProps),
        className
      )}
      style={style}
    >
      <CheckboxPrimitive.Root
        data-accent-scale={color}
        {...checkboxProps}
        ref={forwardedRef}
        className={classNames('rui-reset-button rui-CheckboxButton', `variant-${variant}`)}
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
