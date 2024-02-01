'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { checkboxPropDefs } from './checkbox.props';
import { extractProps, marginPropDefs } from '../helpers';
import { ThickCheckIcon } from '../icons';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
type CheckboxOwnProps = GetPropDefTypes<typeof checkboxPropDefs>;
interface CheckboxProps
  extends Omit<PropsWithoutRefOrColor<typeof CheckboxPrimitive.Root>, 'asChild' | 'children'>,
    MarginProps,
    CheckboxOwnProps {}
const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>((props, forwardedRef) => {
  const { className, color, ...checkboxProps } = extractProps(
    props,
    checkboxPropDefs,
    marginPropDefs
  );
  return (
    <CheckboxPrimitive.Root
      data-accent-color={color}
      {...checkboxProps}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-CheckboxRoot', className)}
    >
      <CheckboxPrimitive.Indicator asChild className="rt-CheckboxIndicator">
        <ThickCheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };
