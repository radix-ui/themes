'use client';

import * as React from 'react';
import classNames from 'classnames';
import { useDirection } from '@radix-ui/react-direction';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { checkboxCardGroupPropDefs } from './checkbox-card-group.props';
import { extractProps, marginPropDefs } from '../helpers';
import { Grid } from './grid';
import { BaseCheckbox } from './base-checkbox';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes, Responsive } from '../helpers';

type CheckboxCardGroupContextValue = {
  size?: Responsive<(typeof checkboxCardGroupPropDefs.size.values)[number]>;
  name?: string;
  disabled: boolean;
  required: boolean;
  value?: string[];
  onItemCheck(value: string): void;
  onItemUncheck(value: string): void;
};
const CheckboxCardGroupContext = React.createContext<CheckboxCardGroupContextValue>({
  disabled: false,
  required: false,
  onItemCheck() {},
  onItemUncheck() {},
});

type RovingFocusGroupProps = React.ComponentPropsWithoutRef<typeof RovingFocusGroup.Root>;
type CheckboxCardGroupRootElement = React.ElementRef<'div'>;
type CheckboxCardGroupRootOwnProps = GetPropDefTypes<typeof checkboxCardGroupPropDefs>;
interface CheckboxCardGroupRootProps
  extends PropsWithoutRefOrColor<'div'>,
    MarginProps,
    CheckboxCardGroupRootOwnProps {
  name?: CheckboxCardGroupContextValue['name'];
  disabled?: React.ComponentPropsWithoutRef<typeof BaseCheckbox>['disabled'];
  required?: React.ComponentPropsWithoutRef<typeof BaseCheckbox>['required'];
  defaultValue?: string[];
  value?: CheckboxCardGroupContextValue['value'];
  onValueChange?(value: string[]): void;
  dir?: RovingFocusGroupProps['dir'];
  orientation?: RovingFocusGroupProps['orientation'];
  loop?: RovingFocusGroupProps['loop'];
}
const CheckboxCardGroupRoot = React.forwardRef<
  CheckboxCardGroupRootElement,
  CheckboxCardGroupRootProps
>((props, forwardedRef) => {
  const {
    children,
    className,
    name,
    disabled = false,
    required = false,
    defaultValue,
    value: valueProp,
    onValueChange,
    color,
    orientation,
    dir,
    loop = true,
    ...rootProps
  } = extractProps(props, checkboxCardGroupPropDefs, marginPropDefs);

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

  const contextValue = React.useMemo(
    () => ({
      name,
      size: props.size,
      disabled,
      required,
      value,
      onItemCheck: handleItemCheck,
      onItemUncheck: handleItemUncheck,
    }),
    [name, props.size, disabled, required, value, handleItemCheck, handleItemUncheck]
  );

  return (
    <RovingFocusGroup.Root asChild orientation={orientation} dir={direction} loop={loop}>
      <Grid
        role="group"
        data-accent-color={color}
        {...rootProps}
        ref={forwardedRef}
        className={classNames('rt-CheckboxCardGroupRoot', className)}
      >
        <CheckboxCardGroupContext.Provider value={contextValue}>
          {children}
        </CheckboxCardGroupContext.Provider>
      </Grid>
    </RovingFocusGroup.Root>
  );
});
CheckboxCardGroupRoot.displayName = 'CheckboxCardGroupRoot';

type CheckboxCardGroupItemElement = React.ElementRef<typeof BaseCheckbox>;
interface CheckboxCardGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof BaseCheckbox>,
    MarginProps {
  children?: React.ReactNode;
  value: string;
}
const CheckboxCardGroupItem = React.forwardRef<
  CheckboxCardGroupItemElement,
  CheckboxCardGroupItemProps
>(({ children, className, disabled, ...props }, forwardedRef) => {
  const context = React.useContext(CheckboxCardGroupContext);
  const isDisabled = context.disabled || disabled;
  const checked = context.value?.includes(props.value);
  return (
    <label className={classNames('rt-reset', 'rt-CheckboxCardGroupItem', className)}>
      {children}
      <RovingFocusGroup.Item asChild focusable={!isDisabled}>
        <BaseCheckbox
          name={context.name}
          checked={checked}
          required={context.required}
          disabled={isDisabled}
          size={context.size}
          variant="surface"
          {...props}
          ref={forwardedRef}
          className="rt-CheckboxCardGroupItemCheckbox"
          onCheckedChange={(checked) => {
            if (checked) {
              context.onItemCheck(props.value);
            } else {
              context.onItemUncheck(props.value);
            }
          }}
        />
      </RovingFocusGroup.Item>
    </label>
  );
});
CheckboxCardGroupItem.displayName = 'CheckboxCardGroupItem';

const CheckboxCardGroup = Object.assign(
  {},
  {
    Root: CheckboxCardGroupRoot,
    Item: CheckboxCardGroupItem,
  }
);

export { CheckboxCardGroup, CheckboxCardGroupRoot, CheckboxCardGroupItem };
export type { CheckboxCardGroupRootProps, CheckboxCardGroupItemProps };
