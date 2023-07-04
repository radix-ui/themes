'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import {
  checkboxSizeDefault,
  checkboxVariantDefault,
  checkboxColorDefault,
  checkboxHighContrastDefault,
  checkboxRadiusDefault,
} from './checkbox.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { CheckboxSize, CheckboxVariant } from './checkbox.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale, ThemeRadius } from '../theme-options';

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
interface CheckboxProps
  extends Omit<PropsWithoutRefOrColor<typeof CheckboxPrimitive.Root>, 'children'>,
    MarginProps {
  size?: Responsive<CheckboxSize>;
  variant?: CheckboxVariant;
  color?: ThemeAccentScale;
  highContrast?: boolean;
  radius?: ThemeRadius;
}
const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = checkboxSizeDefault,
    variant = checkboxVariantDefault,
    color = checkboxColorDefault,
    highContrast = checkboxHighContrastDefault,
    radius = checkboxRadiusDefault,
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
          'high-contrast': highContrast,
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
