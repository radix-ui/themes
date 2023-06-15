'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, ButtonRadius, Responsive } from '../helpers';

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'children'>,
    MarginProps {
  size?: Responsive<'1' | '2'>;
  variant?: 'solid' | 'solid-mono';
  color?: Color;
  radius?: ButtonRadius;
}
const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = '1',
    variant = 'solid',
    color,
    radius,
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
        data-color-scale={color}
        {...checkboxProps}
        ref={forwardedRef}
        className={classNames('reset-button rui-CheckboxButton', `variant-${variant}`)}
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
