'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import classNames from 'classnames';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, ButtonRadius, Responsive } from '../helpers';

const selectSizes = ['1', '2'] as const;
type SelectSize = (typeof selectSizes)[number];
const defaultSelectSize: SelectSize = '2';

const selectTriggerVariants = [
  'surface',
  'surface-mono',
  'solid',
  'solid-mono',
  'subtle',
  'subtle-mono',
  'outline',
  'outline-mono',
  'ghost',
  'ghost-mono',
] as const;
type SelectTriggerVariant = (typeof selectTriggerVariants)[number];
const defaultSelectTriggerVariant: SelectTriggerVariant = 'surface';

const selectMenuVariants = ['solid', 'solid-mono', 'subtle', 'subtle-mono'] as const;
type SelectMenuVariant = (typeof selectMenuVariants)[number];
const defaultSelectMenuVariant: SelectMenuVariant = 'solid';

const defaultSelectColor: Color | undefined = undefined;
const defaultSelectRadius: ButtonRadius | undefined = undefined;

type SelectRootElement = React.ElementRef<typeof SelectPrimitive.Trigger>;
interface SelectRootProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> &
        React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
      'asChild'
    >,
    MarginProps {
  placeholder?: string;
  size?: Responsive<SelectSize>;
  triggerVariant?: SelectTriggerVariant;
  menuVariant?: SelectMenuVariant;
  color?: Color;
  radius?: ButtonRadius;
}
const SelectRoot = React.forwardRef<SelectRootElement, SelectRootProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: rootRest, ...rootProps } = extractRootProps(marginRest);
  const {
    className,
    style,
    children,
    placeholder,
    size = defaultSelectSize,
    triggerVariant = defaultSelectTriggerVariant,
    menuVariant = defaultSelectMenuVariant,
    color = defaultSelectColor,
    radius = defaultSelectRadius,
    ...contentProps
  } = rootRest;
  return (
    <SelectPrimitive.Root {...rootProps}>
      <SelectPrimitive.Trigger asChild>
        <button
          data-color-scale={color}
          data-button-radius={radius}
          ref={forwardedRef}
          className={classNames(
            'rui-reset-button',
            'rui-SelectTrigger',
            withBreakpoints(size, 'size'),
            `variant-${triggerVariant}`,
            withMargin(marginProps),
            className
          )}
          style={style}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className="rui-SelectIcon" />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          data-color-scale={color}
          data-button-radius={radius}
          sideOffset={4}
          align="center"
          {...contentProps}
          className={classNames(
            { 'rui-PopperContent': contentProps.position === 'popper' },
            'rui-SelectContent',
            withBreakpoints(size, 'size'),
            `variant-${menuVariant}`
          )}
        >
          <SelectPrimitive.Viewport className="rui-SelectViewport">
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});
SelectRoot.displayName = 'SelectRoot';

type SelectItemElement = React.ElementRef<typeof SelectPrimitive.Item>;
interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}
const SelectItem = React.forwardRef<SelectItemElement, SelectItemProps>((props, forwardedRef) => {
  const { className, children, ...itemProps } = props;
  return (
    <SelectPrimitive.Item
      {...itemProps}
      ref={forwardedRef}
      className={classNames('rui-SelectItem', className)}
    >
      <SelectPrimitive.ItemIndicator className="rui-SelectItemIndicator">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = 'SelectItem';

type SelectGroupElement = React.ElementRef<typeof SelectPrimitive.Group>;
interface SelectGroupProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> {}
const SelectGroup = React.forwardRef<SelectGroupElement, SelectGroupProps>(
  (props, forwardedRef) => (
    <SelectPrimitive.Group
      {...props}
      ref={forwardedRef}
      className={classNames('rui-SelectGroup', props.className)}
    />
  )
);
SelectGroup.displayName = 'SelectGroup';

type SelectLabelElement = React.ElementRef<typeof SelectPrimitive.Label>;
interface SelectLabelProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}
const SelectLabel = React.forwardRef<SelectLabelElement, SelectLabelProps>(
  (props, forwardedRef) => (
    <SelectPrimitive.Label
      {...props}
      ref={forwardedRef}
      className={classNames('rui-SelectLabel', props.className)}
    />
  )
);
SelectLabel.displayName = 'SelectLabel';

type SelectSeparatorElement = React.ElementRef<typeof SelectPrimitive.Separator>;
interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}
const SelectSeparator = React.forwardRef<SelectSeparatorElement, SelectSeparatorProps>(
  (props, forwardedRef) => (
    <SelectPrimitive.Separator
      {...props}
      ref={forwardedRef}
      className={classNames('rui-SelectSeparator', props.className)}
    />
  )
);
SelectSeparator.displayName = 'SelectSeparator';

function extractRootProps<T extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>>(
  props: T
) {
  const {
    defaultValue,
    value,
    onValueChange,
    defaultOpen,
    open,
    onOpenChange,
    dir,
    name,
    disabled,
    required,
    ...rest
  } = props;
  return {
    defaultValue,
    value,
    onValueChange,
    defaultOpen,
    open,
    onOpenChange,
    dir,
    name,
    disabled,
    required,
    rest,
  };
}

export const Select = {
  Root: SelectRoot,
  Item: SelectItem,
  Group: SelectGroup,
  Label: SelectLabel,
  Separator: SelectSeparator,
};
export {
  selectSizes,
  defaultSelectSize,
  selectTriggerVariants,
  defaultSelectTriggerVariant,
  selectMenuVariants,
  defaultSelectMenuVariant,
  defaultSelectColor,
  defaultSelectRadius,
};
export type { SelectSize, SelectTriggerVariant, SelectMenuVariant };
