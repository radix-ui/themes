'use client';

import * as React from 'react';
import classNames from 'classnames';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { useControllableState } from 'radix-ui/internal';

import { segmentedControlRootPropDefs } from './segmented-control.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type SegmentedControlRootOwnProps = GetPropDefTypes<typeof segmentedControlRootPropDefs>;

interface SegmentedControlRootProps
  extends ComponentPropsWithout<'div', RemovedProps | 'dir'>,
    SegmentedControlRootOwnProps,
    MarginProps {
  value?: string;
  defaultValue?: string;
  onValueChange?(value: string): void;
}

const SegmentedControlRoot = React.forwardRef<HTMLDivElement, SegmentedControlRootProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      radius,
      value: valueProp,
      defaultValue: defaultValueProp,
      onValueChange: onValueChangeProp,
      ...rootProps
    } = extractProps(props, segmentedControlRootPropDefs, marginPropDefs);

    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChangeProp,
      defaultProp: defaultValueProp,
    });

    return (
      <ToggleGroupPrimitive.Root
        data-disabled={props.disabled || undefined}
        data-radius={radius}
        ref={forwardedRef}
        className={classNames('rt-SegmentedControlRoot', className)}
        onValueChange={(value) => {
          if (value) {
            setValue(value);
          }
        }}
        {...rootProps}
        type="single"
        value={value}
        asChild={false}
        disabled={!!props.disabled}
      >
        {children}
        <div className="rt-SegmentedControlIndicator" />
      </ToggleGroupPrimitive.Root>
    );
  }
);

SegmentedControlRoot.displayName = 'SegmentedControl.Root';

interface SegmentedControlItemOwnProps {
  value: string;
}

interface SegmentedControlItemProps
  extends ComponentPropsWithout<
      typeof ToggleGroupPrimitive.Item,
      RemovedProps | 'disabled' | 'type' | 'value'
    >,
    SegmentedControlItemOwnProps {}

const SegmentedControlItem = React.forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <ToggleGroupPrimitive.Item
      ref={forwardedRef}
      className={classNames('rt-reset', 'rt-SegmentedControlItem', className)}
      {...props}
      disabled={false}
      asChild={false}
    >
      <span className="rt-SegmentedControlItemSeparator" />
      <span className="rt-SegmentedControlItemLabel">
        <span className="rt-SegmentedControlItemLabelActive">{children}</span>
        <span className="rt-SegmentedControlItemLabelInactive" aria-hidden>
          {children}
        </span>
      </span>
    </ToggleGroupPrimitive.Item>
  )
);

SegmentedControlItem.displayName = 'SegmentedControl.Item';

export { SegmentedControlRoot as Root, SegmentedControlItem as Item };
export type { SegmentedControlRootProps as RootProps, SegmentedControlItemProps as ItemProps };
