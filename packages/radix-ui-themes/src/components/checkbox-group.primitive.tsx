'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { createCheckboxScope } from '@radix-ui/react-checkbox';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { createContextScope } from '@radix-ui/react-context';
import { Primitive } from '@radix-ui/react-primitive';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { createRovingFocusGroupScope } from '@radix-ui/react-roving-focus';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useDirection } from '@radix-ui/react-direction';

import type { Scope } from '@radix-ui/react-context';

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroup
 * -----------------------------------------------------------------------------------------------*/
const CHECKBOX_GROUP_NAME = 'CheckboxGroup';

type ScopedProps<P> = P & { __scopeCheckboxGroup?: Scope };
const [createCheckboxGroupContext, createCheckboxGroupScope] = createContextScope(
  CHECKBOX_GROUP_NAME,
  [createRovingFocusGroupScope, createCheckboxScope]
);
const useRovingFocusGroupScope = createRovingFocusGroupScope();
const useCheckboxScope = createCheckboxScope();

type CheckboxGroupContextValue = {
  name?: string;
  required: boolean;
  disabled: boolean;
  value?: string[];
  onItemCheck(value: string): void;
  onItemUncheck(value: string): void;
};

const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createCheckboxGroupContext<CheckboxGroupContextValue>(CHECKBOX_GROUP_NAME);

type CheckboxGroupElement = React.ElementRef<typeof Primitive.div>;
type RovingFocusGroupProps = React.ComponentPropsWithoutRef<typeof RovingFocusGroup.Root>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface CheckboxGroupProps extends PrimitiveDivProps {
  name?: CheckboxGroupContextValue['name'];
  required?: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>['required'];
  disabled?: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>['disabled'];
  dir?: RovingFocusGroupProps['dir'];
  orientation?: RovingFocusGroupProps['orientation'];
  loop?: RovingFocusGroupProps['loop'];
  defaultValue?: string[];
  value?: CheckboxGroupContextValue['value'];
  onValueChange?: (value: string[]) => void;
}

const CheckboxGroup = React.forwardRef<CheckboxGroupElement, CheckboxGroupProps>(
  (props: ScopedProps<CheckboxGroupProps>, forwardedRef) => {
    const {
      __scopeCheckboxGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeCheckboxGroup);
    const direction = useDirection(dir);
    const [value = [], setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    const handleItemCheck = React.useCallback(
      (itemValue: string) => setValue((prevValue = []) => [...prevValue, itemValue]),
      [setValue]
    );

    const handleItemUncheck = React.useCallback(
      (itemValue: string) =>
        setValue((prevValue = []) => prevValue.filter((value) => value !== itemValue)),
      [setValue]
    );

    return (
      <CheckboxGroupProvider
        scope={__scopeCheckboxGroup}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onItemCheck={handleItemCheck}
        onItemUncheck={handleItemUncheck}
      >
        <RovingFocusGroup.Root
          asChild
          {...rovingFocusGroupScope}
          orientation={orientation}
          dir={direction}
          loop={loop}
        >
          <Primitive.div
            role="group"
            data-disabled={disabled ? '' : undefined}
            dir={direction}
            {...groupProps}
            ref={forwardedRef}
          />
        </RovingFocusGroup.Root>
      </CheckboxGroupProvider>
    );
  }
);

CheckboxGroup.displayName = CHECKBOX_GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroupItem
 * -----------------------------------------------------------------------------------------------*/

const ITEM_NAME = 'CheckboxGroupItem';

type CheckboxGroupItemElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;
interface CheckboxGroupItemProps
  extends Omit<CheckboxProps, 'checked' | 'defaultChecked' | 'onCheckedChange' | 'name'> {
  value: string;
}

const CheckboxGroupItem = React.forwardRef<CheckboxGroupItemElement, CheckboxGroupItemProps>(
  (props: ScopedProps<CheckboxGroupItemProps>, forwardedRef) => {
    const { __scopeCheckboxGroup, disabled, ...itemProps } = props;
    const context = useCheckboxGroupContext(ITEM_NAME, __scopeCheckboxGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeCheckboxGroup);
    const checkboxScope = useCheckboxScope(__scopeCheckboxGroup);
    const ref = React.useRef<React.ElementRef<typeof CheckboxPrimitive.Root>>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const checked = context.value?.includes(itemProps.value);

    return (
      <RovingFocusGroup.Item
        asChild
        {...rovingFocusGroupScope}
        focusable={!isDisabled}
        active={checked}
      >
        <CheckboxPrimitive.Root
          name={context.name}
          disabled={isDisabled}
          required={context.required}
          checked={checked}
          {...checkboxScope}
          {...itemProps}
          ref={composedRefs}
          onCheckedChange={(checked) => {
            if (checked) {
              context.onItemCheck(props.value);
            } else {
              context.onItemUncheck(props.value);
            }
          }}
        />
      </RovingFocusGroup.Item>
    );
  }
);

CheckboxGroupItem.displayName = ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroupIndicator
 * -----------------------------------------------------------------------------------------------*/

const INDICATOR_NAME = 'CheckboxGroupIndicator';

type CheckboxGroupIndicatorElement = React.ElementRef<typeof CheckboxPrimitive.Indicator>;
type CheckboxIndicatorProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>;
interface CheckboxGroupIndicatorProps extends CheckboxIndicatorProps {}

const CheckboxGroupIndicator = React.forwardRef<
  CheckboxGroupIndicatorElement,
  CheckboxGroupIndicatorProps
>((props: ScopedProps<CheckboxGroupIndicatorProps>, forwardedRef) => {
  const { __scopeCheckboxGroup, ...indicatorProps } = props;
  const checkboxScope = useCheckboxScope(__scopeCheckboxGroup);
  return <CheckboxPrimitive.Indicator {...checkboxScope} {...indicatorProps} ref={forwardedRef} />;
});

CheckboxGroupIndicator.displayName = INDICATOR_NAME;

/* ---------------------------------------------------------------------------------------------- */

const Root = CheckboxGroup;
const Item = CheckboxGroupItem;
const Indicator = CheckboxGroupIndicator;

export {
  createCheckboxGroupScope,
  //
  CheckboxGroup,
  CheckboxGroupItem,
  CheckboxGroupIndicator,
  //
  Root,
  Item,
  Indicator,
};
export type { CheckboxGroupProps, CheckboxGroupItemProps, CheckboxGroupIndicatorProps };
