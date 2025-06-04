'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Context } from 'radix-ui/internal';

import * as CheckboxGroupPrimitive from './checkbox-group.primitive.js';
import { createCheckboxGroupScope } from './checkbox-group.primitive.js';
import { checkboxGroupRootPropDefs } from './checkbox-group.props.js';
import { ThickCheckIcon } from './icons.js';
import { Text } from './text.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

const CHECKBOX_GROUP_NAME = 'CheckboxGroup';

type ScopedProps<P> = P & { __scopeCheckboxGroup?: Context.Scope };
const [createCheckboxGroupContext] = Context.createContextScope(CHECKBOX_GROUP_NAME, [
  createCheckboxGroupScope,
]);
const useCheckboxGroupScope = createCheckboxGroupScope();

type CheckboxGroupRootOwnProps = GetPropDefTypes<typeof checkboxGroupRootPropDefs>;
type CheckboxGroupContextValue = CheckboxGroupRootOwnProps;

const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createCheckboxGroupContext<CheckboxGroupContextValue>(CHECKBOX_GROUP_NAME);

type CheckboxGroupRootElement = React.ElementRef<typeof CheckboxGroupPrimitive.Root>;
interface CheckboxGroupRootProps
  extends ComponentPropsWithout<
      typeof CheckboxGroupPrimitive.Root,
      'asChild' | 'color' | 'defaultChecked'
    >,
    MarginProps,
    CheckboxGroupRootOwnProps {}
const CheckboxGroupRoot = React.forwardRef<CheckboxGroupRootElement, CheckboxGroupRootProps>(
  (
    {
      color = checkboxGroupRootPropDefs.color.default,
      highContrast = checkboxGroupRootPropDefs.highContrast.default,
      size = checkboxGroupRootPropDefs.size.default,
      variant = checkboxGroupRootPropDefs.variant.default,
      ...props
    }: ScopedProps<CheckboxGroupRootProps>,
    forwardedRef
  ) => {
    const { __scopeCheckboxGroup, className, ...rootProps } = extractProps(props, marginPropDefs);
    const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxGroup);
    return (
      <CheckboxGroupProvider
        scope={__scopeCheckboxGroup}
        color={color}
        size={size}
        highContrast={highContrast}
        variant={variant}
      >
        <CheckboxGroupPrimitive.Root
          {...checkboxGroupScope}
          {...rootProps}
          ref={forwardedRef}
          className={classNames('rt-CheckboxGroupRoot', className)}
        />
      </CheckboxGroupProvider>
    );
  }
);
CheckboxGroupRoot.displayName = 'CheckboxGroup.Root';

type CheckboxGroupItemElement = React.ElementRef<typeof CheckboxGroupPrimitive.Item>;
interface CheckboxGroupItemProps
  extends ComponentPropsWithout<typeof CheckboxGroupPrimitive.Item, RemovedProps>,
    MarginProps {}
const CheckboxGroupItem = React.forwardRef<CheckboxGroupItemElement, CheckboxGroupItemProps>(
  (_props: ScopedProps<CheckboxGroupItemProps>, forwardedRef) => {
    const { __scopeCheckboxGroup, children, className, style, ...props } = _props;
    const { size } = useCheckboxGroupContext('CheckboxGroupItem', __scopeCheckboxGroup);

    // Render `<Text as="label">` if children are provided, otherwise render
    // the solo checkbox to allow building out your custom layouts with it.
    if (children) {
      return (
        <Text
          as="label"
          size={size}
          className={classNames('rt-CheckboxGroupItem', className)}
          style={style}
        >
          <CheckboxGroupItemCheckbox
            __scopeCheckboxGroup={__scopeCheckboxGroup}
            {...props}
            ref={forwardedRef}
          />
          {children && <span className="rt-CheckboxGroupItemInner">{children}</span>}
        </Text>
      );
    }

    return (
      <CheckboxGroupItemCheckbox
        __scopeCheckboxGroup={__scopeCheckboxGroup}
        {...props}
        ref={forwardedRef}
        className={className}
        style={style}
      />
    );
  }
);
CheckboxGroupItem.displayName = 'CheckboxGroup.Item';

type CheckboxGroupItemCheckboxElement = React.ElementRef<typeof CheckboxGroupPrimitive.Item>;
interface CheckboxGroupItemCheckboxProps
  extends ComponentPropsWithout<typeof CheckboxGroupPrimitive.Item, RemovedProps> {}
const CheckboxGroupItemCheckbox = React.forwardRef<
  CheckboxGroupItemCheckboxElement,
  ScopedProps<CheckboxGroupItemCheckboxProps>
>(({ __scopeCheckboxGroup, ...props }, forwardedRef) => {
  const context = useCheckboxGroupContext('CheckboxGroupItemCheckbox', __scopeCheckboxGroup);
  const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxGroup);
  const { color, className } = extractProps(
    { ...props, ...context },
    checkboxGroupRootPropDefs,
    marginPropDefs
  );
  return (
    <CheckboxGroupPrimitive.Item
      {...checkboxGroupScope}
      data-accent-color={color}
      {...props}
      ref={forwardedRef}
      className={classNames(
        'rt-reset',
        'rt-BaseCheckboxRoot',
        'rt-CheckboxGroupItemCheckbox',
        className
      )}
    >
      <CheckboxGroupPrimitive.Indicator
        {...checkboxGroupScope}
        asChild
        className="rt-BaseCheckboxIndicator"
      >
        <ThickCheckIcon />
      </CheckboxGroupPrimitive.Indicator>
    </CheckboxGroupPrimitive.Item>
  );
});
CheckboxGroupItemCheckbox.displayName = 'CheckboxGroup.ItemCheckbox';

export { CheckboxGroupRoot as Root, CheckboxGroupItem as Item };
export type { CheckboxGroupRootProps as RootProps, CheckboxGroupItemProps as ItemProps };
