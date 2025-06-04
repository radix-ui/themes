'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Context } from 'radix-ui/internal';

import * as CheckboxGroupPrimitive from './checkbox-group.primitive.js';
import { createCheckboxGroupScope } from './checkbox-group.primitive.js';
import { checkboxCardsRootPropDefs } from './checkbox-cards.props.js';
import { baseCheckboxPropDefs } from './_internal/base-checkbox.props.js';
import { Grid } from './grid.js';
import { ThickCheckIcon } from './icons.js';
import { extractProps } from '../helpers/extract-props.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { Responsive, GetPropDefTypes } from '../props/prop-def.js';

const CHECKBOX_CARD_GROUP_NAME = 'CheckboxCards';

type ScopedProps<P> = P & { __scopeCheckboxCards?: Context.Scope };
const [createCheckboxCardsContext] = Context.createContextScope(CHECKBOX_CARD_GROUP_NAME, [
  createCheckboxGroupScope,
]);
const useCheckboxGroupScope = createCheckboxGroupScope();

type CheckboxCardsContextValue = {
  size?: Responsive<(typeof checkboxCardsRootPropDefs.size.values)[number]>;
  highContrast?: boolean;
};

const [CheckboxCardsProvider, useCheckboxCardsContext] =
  createCheckboxCardsContext<CheckboxCardsContextValue>(CHECKBOX_CARD_GROUP_NAME);

type CheckboxCardsRootElement = React.ElementRef<typeof CheckboxGroupPrimitive.Root>;
type CheckboxCardsRootOwnProps = GetPropDefTypes<typeof checkboxCardsRootPropDefs>;
interface CheckboxCardsRootProps
  extends ComponentPropsWithout<
      typeof CheckboxGroupPrimitive.Root,
      'asChild' | 'color' | 'defaultChecked'
    >,
    MarginProps,
    CheckboxCardsRootOwnProps {}
const CheckboxCardsRoot = React.forwardRef<CheckboxCardsRootElement, CheckboxCardsRootProps>(
  (props: ScopedProps<CheckboxCardsRootProps>, forwardedRef) => {
    const { __scopeCheckboxCards, className, color, ...rootProps } = extractProps(
      props,
      checkboxCardsRootPropDefs,
      marginPropDefs
    );
    const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxCards);
    return (
      <CheckboxCardsProvider
        scope={__scopeCheckboxCards}
        size={props.size}
        highContrast={props.highContrast}
      >
        <Grid asChild>
          <CheckboxGroupPrimitive.Root
            {...checkboxGroupScope}
            data-accent-color={color}
            {...rootProps}
            ref={forwardedRef}
            className={classNames('rt-CheckboxCardsRoot', className)}
          />
        </Grid>
      </CheckboxCardsProvider>
    );
  }
);
CheckboxCardsRoot.displayName = 'CheckboxCards.Root';

type CheckboxCardsItemElement = React.ElementRef<typeof CheckboxGroupPrimitive.Item>;
interface CheckboxCardsItemProps
  extends ComponentPropsWithout<typeof CheckboxGroupPrimitive.Item, RemovedProps>,
    MarginProps {}
const CheckboxCardsItem = React.forwardRef<
  CheckboxCardsItemElement,
  ScopedProps<CheckboxCardsItemProps>
>(({ __scopeCheckboxCards, children, className, style, ...props }, forwardedRef) => {
  const context = useCheckboxCardsContext('CheckboxCardsItem', __scopeCheckboxCards);
  const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxCards);
  const { className: checkboxClassName } = extractProps(
    // Pass size / highContrast values from the context and static variant to generate styles
    { size: context?.size, variant: 'surface', highContrast: context?.highContrast },
    // Pass size & variant prop defs to allow it to be extracted
    baseCheckboxPropDefs
  );
  return (
    <label className={classNames('rt-BaseCard', 'rt-CheckboxCardsItem', className)} style={style}>
      {children}
      <CheckboxGroupPrimitive.Item
        {...checkboxGroupScope}
        {...props}
        ref={forwardedRef}
        className={classNames(
          'rt-reset',
          'rt-BaseCheckboxRoot',
          'rt-CheckboxCardCheckbox',
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
CheckboxCardsItem.displayName = 'CheckboxCards.Item';

export { CheckboxCardsRoot as Root, CheckboxCardsItem as Item };
export type { CheckboxCardsRootProps as RootProps, CheckboxCardsItemProps as ItemProps };
