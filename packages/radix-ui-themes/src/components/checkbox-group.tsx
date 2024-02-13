'use client';

import * as React from 'react';
import classNames from 'classnames';
import { createContextScope } from '@radix-ui/react-context';
import * as CheckboxGroupPrimitive from './checkbox-group.primitive.js';
import { createCheckboxGroupScope as createCheckboxGroupPrimitiveScope } from './checkbox-group.primitive.js';
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
const [createCheckboxGroupContext, createCheckboxGroupScope] = createContextScope(
  CHECKBOX_GROUP_NAME,
  [createCheckboxGroupPrimitiveScope]
);
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
  const context = useCheckboxGroupContext('item', __scopeCheckboxGroup);
  const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxGroup);
  const { className: checkboxClassName } = extractProps(
    context,
    checkboxGroupRootPropDefs,
    marginPropDefs
  );
  // Render `<Text as="label" size={context.size}>` if children are provided, otherwise
  // render a simple `<label>` to avoid setting a height / line height on the element.
  // This is so that you can easily use this component in own layout.
  const Label = children ? Text : 'label';
  const labelProps = children ? { as: 'label' as const, size: context.size } : {};
  return (
    <Label {...labelProps} className={classNames('rt-CheckboxGroupItem', className)} style={style}>
      <CheckboxGroupPrimitive.Item
        data-accent-color={context.color}
        {...checkboxGroupScope}
        {...props}
        ref={forwardedRef}
        className={classNames(
          'rt-reset',
          'rt-BaseCheckboxRoot',
          'rt-CheckboxRoot',
          checkboxClassName,
          'rt-CheckboxGroupItemCheckbox'
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
      {children && <span>{children}</span>}
    </Label>
  );
});
CheckboxGroupItem.displayName = 'CheckboxGroupItem';

const CheckboxGroup = Object.assign(
  {},
  {
    Root: CheckboxGroupRoot,
    Item: CheckboxGroupItem,
  }
);

export { createCheckboxGroupScope, CheckboxGroup, CheckboxGroupRoot, CheckboxGroupItem };
export type { CheckboxGroupRootProps, CheckboxGroupItemProps };
