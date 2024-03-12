'use client';

import * as React from 'react';
import classNames from 'classnames';
import { createContextScope } from '@radix-ui/react-context';
import * as CheckboxGroupPrimitive from './checkbox-group.primitive.js';
import { createCheckboxGroupScope } from './checkbox-group.primitive.js';
import { checkboxCardGroupRootPropDefs } from './checkbox-card-group.props.js';
import { baseCheckboxPropDefs } from './base-checkbox.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';
import { Grid } from './grid.js';
import { ThickCheckIcon } from './icons.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps, Responsive } from '../props/index.js';
import type { Scope } from '@radix-ui/react-context';

const CHECKBOX_CARD_GROUP_NAME = 'CheckboxCardGroup';

type ScopedProps<P> = P & { __scopeCheckboxCardGroup?: Scope };
const [createCheckboxCardGroupContext] = createContextScope(CHECKBOX_CARD_GROUP_NAME, [
  createCheckboxGroupScope,
]);
const useCheckboxGroupScope = createCheckboxGroupScope();

type CheckboxCardGroupContextValue = {
  size?: Responsive<(typeof checkboxCardGroupRootPropDefs.size.values)[number]>;
  highContrast?: boolean;
};

const [CheckboxCardGroupProvider, useCheckboxCardGroupContext] =
  createCheckboxCardGroupContext<CheckboxCardGroupContextValue>(CHECKBOX_CARD_GROUP_NAME);

type CheckboxCardGroupRootElement = React.ElementRef<typeof CheckboxGroupPrimitive.Root>;
type CheckboxCardGroupRootOwnProps = GetPropDefTypes<typeof checkboxCardGroupRootPropDefs>;
interface CheckboxCardGroupRootProps
  extends ComponentPropsWithout<
      'asChild' | 'color' | 'defaultChecked',
      typeof CheckboxGroupPrimitive.Root
    >,
    MarginProps,
    CheckboxCardGroupRootOwnProps {}
const CheckboxCardGroupRoot = React.forwardRef<
  CheckboxCardGroupRootElement,
  CheckboxCardGroupRootProps
>((props: ScopedProps<CheckboxCardGroupRootProps>, forwardedRef) => {
  const { __scopeCheckboxCardGroup, className, color, ...rootProps } = extractProps(
    props,
    checkboxCardGroupRootPropDefs,
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
  extends ComponentPropsWithout<RemovedProps, typeof CheckboxGroupPrimitive.Item>,
    MarginProps {}
const CheckboxCardGroupItem = React.forwardRef<
  CheckboxCardGroupItemElement,
  ScopedProps<CheckboxCardGroupItemProps>
>(({ __scopeCheckboxCardGroup, children, className, style, ...props }, forwardedRef) => {
  const context = useCheckboxCardGroupContext('CheckboxCardGroupItem', __scopeCheckboxCardGroup);
  const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxCardGroup);
  const { className: checkboxClassName } = extractProps(
    // Pass size / highContrast values from the context and static variant to generate styles
    { size: context?.size, variant: 'surface', highContrast: context?.highContrast },
    // Pass size & variant prop defs to allow it to be extracted
    baseCheckboxPropDefs
  );
  return (
    <label
      className={classNames('rt-BaseCard', 'rt-CheckboxCardGroupItem', className)}
      style={style}
    >
      {children}
      <CheckboxGroupPrimitive.Item
        {...checkboxGroupScope}
        {...props}
        ref={forwardedRef}
        className={classNames(
          'rt-reset',
          'rt-BaseCheckboxRoot',
          'rt-CheckboxCardGroupItemCheckbox',
          checkboxClassName
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

export { CheckboxCardGroupRoot, CheckboxCardGroupItem };
export type { CheckboxCardGroupRootProps, CheckboxCardGroupItemProps };
