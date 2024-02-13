'use client';

import * as React from 'react';
import classNames from 'classnames';
import { createContextScope } from '@radix-ui/react-context';
import * as CheckboxGroupPrimitive from './checkbox-group.primitive.js';
import { createCheckboxGroupScope } from './checkbox-group.primitive.js';
import { checkboxGroupRootPropDefs } from './checkbox-group.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';
import { ThickCheckIcon } from './icons.js';
import { Text } from './text.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';
import type { Scope } from '@radix-ui/react-context';

const CHECKBOX_GROUP_NAME = 'CheckboxGroup';

type ScopedProps<P> = P & { __scopeCheckboxGroup?: Scope };
const [createCheckboxGroupContext] = createContextScope(CHECKBOX_GROUP_NAME, [
  createCheckboxGroupScope,
]);
const useCheckboxGroupScope = createCheckboxGroupScope();

type CheckboxGroupContextValue = GetPropDefTypes<typeof checkboxGroupRootPropDefs>;

const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createCheckboxGroupContext<CheckboxGroupContextValue>(CHECKBOX_GROUP_NAME);

type CheckboxGroupRootElement = React.ElementRef<typeof CheckboxGroupPrimitive.Root>;
type CheckboxGroupRootOwnProps = GetPropDefTypes<typeof checkboxGroupRootPropDefs>;
interface CheckboxGroupRootProps
  extends ComponentPropsWithoutColor<typeof CheckboxGroupPrimitive.Root>,
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
CheckboxGroupRoot.displayName = 'CheckboxGroupRoot';

type CheckboxGroupItemElement = React.ElementRef<typeof CheckboxGroupPrimitive.Item>;
interface CheckboxGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Item>, 'asChild'>,
    MarginProps {}
const CheckboxGroupItem = React.forwardRef<
  CheckboxGroupItemElement,
  ScopedProps<CheckboxGroupItemProps>
>(({ __scopeCheckboxGroup, children, className, style, ...props }, forwardedRef) => {
  const { size } = useCheckboxGroupContext('item', __scopeCheckboxGroup);

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
        <CheckboxGroupItemCheckbox ref={forwardedRef} {...props} />
        {children && <span>{children}</span>}
      </Text>
    );
  }

  return (
    <CheckboxGroupItemCheckbox ref={forwardedRef} className={className} style={style} {...props} />
  );
});
CheckboxGroupItem.displayName = 'CheckboxGroupItem';

type CheckboxGroupItemCheckboxElement = React.ElementRef<typeof CheckboxGroupPrimitive.Item>;
interface CheckboxGroupItemCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Item> {}
const CheckboxGroupItemCheckbox = React.forwardRef<
  CheckboxGroupItemCheckboxElement,
  ScopedProps<CheckboxGroupItemCheckboxProps>
>(({ __scopeCheckboxGroup, ...props }, forwardedRef) => {
  const context = useCheckboxGroupContext('item', __scopeCheckboxGroup);
  const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxGroup);
  const { color, className } = extractProps(
    { ...props, ...context },
    checkboxGroupRootPropDefs,
    marginPropDefs
  );
  return (
    <CheckboxGroupPrimitive.Item
      data-accent-color={color}
      {...checkboxGroupScope}
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
CheckboxGroupItemCheckbox.displayName = 'CheckboxGroupItemCheckbox';

export { CheckboxGroupRoot, CheckboxGroupItem };
export type { CheckboxGroupRootProps, CheckboxGroupItemProps };
