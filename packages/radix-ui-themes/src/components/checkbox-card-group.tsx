'use client';

import * as React from 'react';
import classNames from 'classnames';
import { createContextScope } from '@radix-ui/react-context';
import * as CheckboxGroupPrimitive from './checkbox-group.primitive.js';
import { createCheckboxGroupScope } from './checkbox-group.primitive.js';
import { checkboxCardGroupPropDefs } from './checkbox-card-group.props.js';
import { baseCheckboxPropDefs } from './base-checkbox.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';
import { Grid } from './grid.js';
import { ThickCheckIcon } from './icons.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes, Responsive } from '../props/index.js';
import type { Scope } from '@radix-ui/react-context';

const CHECKBOX_CARD_GROUP_NAME = 'CheckboxCardGroup';

type ScopedProps<P> = P & { __scopeCheckboxCardGroup?: Scope };
const [createCheckboxCardGroupContext, createCheckboxCardGroupScope] = createContextScope(
  CHECKBOX_CARD_GROUP_NAME,
  [createCheckboxGroupScope]
);
const useCheckboxGroupScope = createCheckboxGroupScope();

type CheckboxCardGroupContextValue = {
  size?: Responsive<(typeof checkboxCardGroupPropDefs.size.values)[number]>;
  highContrast?: boolean;
};

const [CheckboxCardGroupProvider, useCheckboxCardGroupContext] =
  createCheckboxCardGroupContext<CheckboxCardGroupContextValue>(CHECKBOX_CARD_GROUP_NAME);

type CheckboxCardGroupRootElement = React.ElementRef<typeof CheckboxGroupPrimitive.Root>;
type CheckboxCardGroupRootOwnProps = GetPropDefTypes<typeof checkboxCardGroupPropDefs>;
interface CheckboxCardGroupRootProps
  extends ComponentPropsWithoutColor<typeof CheckboxGroupPrimitive.Root>,
    MarginProps,
    CheckboxCardGroupRootOwnProps {}
const CheckboxCardGroupRoot = React.forwardRef<
  CheckboxCardGroupRootElement,
  CheckboxCardGroupRootProps
>((props: ScopedProps<CheckboxCardGroupRootProps>, forwardedRef) => {
  const { __scopeCheckboxCardGroup, className, color, ...rootProps } = extractProps(
    props,
    checkboxCardGroupPropDefs,
    marginPropDefs
  );
  const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxCardGroup);
  return (
    <CheckboxCardGroupProvider
      scope={__scopeCheckboxCardGroup}
      size={props.size}
      highContrast={props.highContrast}
    >
      <Grid asChild>
        <CheckboxGroupPrimitive.Root
          {...checkboxGroupScope}
          data-accent-color={color}
          {...rootProps}
          ref={forwardedRef}
          className={classNames('rt-CheckboxCardGroupRoot', className)}
        />
      </Grid>
    </CheckboxCardGroupProvider>
  );
});
CheckboxCardGroupRoot.displayName = 'CheckboxCardGroupRoot';

type CheckboxCardGroupItemElement = React.ElementRef<typeof CheckboxGroupPrimitive.Item>;
interface CheckboxCardGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Item>, 'asChild'>,
    MarginProps {}
const CheckboxCardGroupItem = React.forwardRef<
  CheckboxCardGroupItemElement,
  ScopedProps<CheckboxCardGroupItemProps>
>(({ __scopeCheckboxCardGroup, children, className, ...props }, forwardedRef) => {
  const context = useCheckboxCardGroupContext('item', __scopeCheckboxCardGroup);
  const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxCardGroup);
  const { className: checkboxClassName } = extractProps(
    // Pass size / highContrast values from the context and static variant to generate styles
    { size: context?.size, variant: 'surface', highContrast: context?.highContrast, className: '' },
    // Pass size & variant prop defs to allow it to be extracted
    baseCheckboxPropDefs
  );
  return (
    <label className={classNames('rt-reset', 'rt-CheckboxCardGroupItem', className)}>
      {children}
      <CheckboxGroupPrimitive.Item
        {...checkboxGroupScope}
        {...props}
        ref={forwardedRef}
        className={classNames(
          'rt-reset',
          'rt-BaseCheckboxRoot',
          checkboxClassName,
          'rt-CheckboxCardGroupItemCheckbox'
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

export {
  createCheckboxCardGroupScope,
  CheckboxCardGroup,
  CheckboxCardGroupRoot,
  CheckboxCardGroupItem,
};
export type { CheckboxCardGroupRootProps, CheckboxCardGroupItemProps };
