'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { baseCheckboxPropDefs } from './base-checkbox.props';
import { extractProps, marginPropDefs } from '../helpers';
import { ThickCheckIcon } from '../icons';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type BaseCheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
type BaseCheckboxOwnProps = GetPropDefTypes<typeof baseCheckboxPropDefs>;
interface BaseCheckboxProps
  extends Omit<PropsWithoutRefOrColor<typeof CheckboxPrimitive.Root>, 'asChild' | 'children'>,
    MarginProps,
    BaseCheckboxOwnProps {}
const BaseCheckbox = React.forwardRef<BaseCheckboxElement, BaseCheckboxProps>(
  (props, forwardedRef) => {
    const { className, color, ...baseCheckboxProps } = extractProps(
      props,
      baseCheckboxPropDefs,
      marginPropDefs
    );
    return (
      <CheckboxPrimitive.Root
        data-accent-color={color}
        {...baseCheckboxProps}
        asChild={false}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-BaseCheckboxRoot', className)}
      >
        <CheckboxPrimitive.Indicator asChild className="rt-BaseCheckboxIndicator">
          <ThickCheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
BaseCheckbox.displayName = 'BaseCheckbox';

export { BaseCheckbox };
export type { BaseCheckboxProps };
