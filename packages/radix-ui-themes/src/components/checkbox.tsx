'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { checkboxPropDefs } from './checkbox.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';
import { ThickCheckIcon } from '../icons.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
type CheckboxOwnProps = GetPropDefTypes<typeof checkboxPropDefs>;
interface CheckboxProps
  extends Omit<ComponentPropsWithoutColor<typeof CheckboxPrimitive.Root>, 'asChild' | 'children'>,
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
      className={classNames('rt-reset', 'rt-BaseCheckboxRoot', 'rt-CheckboxRoot', className)}
    >
      <CheckboxPrimitive.Indicator
        asChild
        className="rt-BaseCheckboxIndicator rt-CheckboxIndicator"
      >
        <ThickCheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };
