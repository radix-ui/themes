'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { checkboxPropDefs } from './checkbox.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import { ThickCheckIcon } from '../icons';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
type CheckboxOwnProps = GetPropDefTypes<typeof checkboxPropDefs>;
interface CheckboxProps
  extends Omit<PropsWithoutRefOrColor<typeof CheckboxPrimitive.Root>, 'children'>,
    MarginProps,
    CheckboxOwnProps {}
const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = checkboxPropDefs.size.default,
    variant = checkboxPropDefs.variant.default,
    color = checkboxPropDefs.color.default,
    highContrast = checkboxPropDefs.highContrast.default,
    ...checkboxProps
  } = marginRest;
  return (
    <span
      className={classNames(
        'rt-CheckboxRoot',
        className,
        withBreakpoints(size, 'rt-r-size'),
        withMarginProps(marginProps)
      )}
      style={style}
    >
      <CheckboxPrimitive.Root
        data-accent-color={color}
        {...checkboxProps}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-CheckboxButton', `rt-variant-${variant}`, {
          'rt-high-contrast': highContrast,
        })}
      >
        <CheckboxPrimitive.Indicator className="rt-CheckboxIndicator">
          <ThickCheckIcon className="rt-CheckboxIndicatorIcon" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </span>
  );
});
Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };
