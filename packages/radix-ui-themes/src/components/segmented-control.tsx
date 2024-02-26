'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { segmentedControlRootPropDefs } from './segmented-control.props.js';

import { extractProps, type ComponentPropsWithoutColor } from '../helpers/index.js';
import { marginPropDefs, type GetPropDefTypes, type MarginProps } from '../props/index.js';

type SegmentedControlRootOwnProps = GetPropDefTypes<typeof segmentedControlRootPropDefs>;

interface SegmentedControlRootProps
  extends Omit<ComponentPropsWithoutColor<'div'>, 'defaultValue' | 'dir'>,
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
    } = extractProps(props, segmentedControlRootPropDefs, marginPropDefs);

    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChangeProp,
      defaultProp: defaultValueProp,
    });

    return (
      <ToggleGroupPrimitive.Root
        data-radius={radius}
        ref={forwardedRef}
        className={classNames('rt-SegmentedControlRoot', className)}
        onValueChange={(value) => {
          if (value) {
            setValue(value);
          }
        }}
        {...props}
        type="single"
        value={value}
        asChild={false}
        disabled={false}
      >
        {children}
        <div className="rt-SegmentedControlIndicator" />
      </ToggleGroupPrimitive.Root>
    );
  }
);

SegmentedControlRoot.displayName = 'SegmentedControlRoot';

interface SegmentedControlItemOwnProps {
  value: string;
}

interface SegmentedControlItemProps
  extends Omit<
      ComponentPropsWithoutColor<typeof ToggleGroupPrimitive.Item>,
      'disabled' | 'type' | 'value'
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
        <span className="rt-SegmentedControlItemLabelInactive">{children}</span>
      </span>
    </ToggleGroupPrimitive.Item>
  )
);

SegmentedControlItem.displayName = 'SegmentedControlItem';

export { SegmentedControlRoot, SegmentedControlItem };
