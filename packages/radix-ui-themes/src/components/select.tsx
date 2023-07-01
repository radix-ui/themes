'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import classNames from 'classnames';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import { ThemeConfig, ThemeConfigContext } from '../theme-config';
import {
  defaultSelectSize,
  defaultSelectTriggerVariant,
  defaultSelectTriggerColor,
  defaultSelectTriggerHighContrast,
  defaultSelectContentVariant,
  defaultSelectContentColor,
  defaultSelectContentHighContrast,
  defaultSelectRadius,
} from './select.props';

import type { MarginProps, Color, Radius, Responsive } from '../helpers';
import type { SelectSize, SelectTriggerVariant, SelectContentVariant } from './select.props';

type SelectContextValue = { size?: Responsive<SelectSize>; radius?: Radius };
const SelectContext = React.createContext<SelectContextValue>({});

interface SelectRootProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    SelectContextValue {}
const SelectRoot: React.FC<SelectRootProps> = (props) => {
  const { children, size = defaultSelectSize, radius = defaultSelectRadius, ...rootProps } = props;
  return (
    <SelectPrimitive.Root {...rootProps}>
      <SelectContext.Provider value={React.useMemo(() => ({ size, radius }), [size, radius])}>
        {children}
      </SelectContext.Provider>
    </SelectPrimitive.Root>
  );
};
SelectRoot.displayName = 'SelectRoot';

type SelectTriggerElement = React.ElementRef<typeof SelectPrimitive.Trigger>;
interface SelectTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, 'asChild' | 'color'>,
    MarginProps {
  variant?: SelectTriggerVariant;
  color?: Color;
  highContrast?: boolean;
}
const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const {
      className,
      variant = defaultSelectTriggerVariant,
      highContrast = defaultSelectTriggerHighContrast,
      color = defaultSelectTriggerColor,
      placeholder,
      ...triggerProps
    } = marginRest;
    const { size, radius } = React.useContext(SelectContext);
    return (
      <SelectPrimitive.Trigger asChild>
        <button
          data-accent-scale={color}
          data-radius={radius}
          {...triggerProps}
          ref={forwardedRef}
          className={classNames(
            'rui-reset-button',
            'rui-BaseButton',
            'rui-Button',
            'rui-SelectTrigger',
            withBreakpoints(size, 'size'),
            `variant-${variant}`,
            { highContrast },
            withMarginProps(marginProps),
            className
          )}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className="rui-SelectIcon" />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

type SelectContentElement = React.ElementRef<typeof SelectPrimitive.Content>;
interface SelectContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>, 'color'> {
  size?: Responsive<SelectSize>;
  variant?: SelectContentVariant;
  color?: Color;
  highContrast?: boolean;
  container?: React.ComponentProps<typeof SelectPrimitive.Portal>['container'];
}
const SelectContent = React.forwardRef<SelectContentElement, SelectContentProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      variant = defaultSelectContentVariant,
      highContrast = defaultSelectContentHighContrast,
      color = defaultSelectContentColor,
      container,
      ...contentProps
    } = props;
    const { size, radius } = React.useContext(SelectContext);
    const themeConfigContext = React.useContext(ThemeConfigContext);
    const resolvedColor = color ?? themeConfigContext?.accentScale;
    const resolvedRadius = radius ?? themeConfigContext?.radius;
    return (
      <SelectPrimitive.Portal container={container}>
        <ThemeConfig asChild>
          <SelectPrimitive.Content
            data-accent-scale={resolvedColor}
            data-radius={resolvedRadius}
            sideOffset={4}
            align="center"
            {...contentProps}
            ref={forwardedRef}
            className={classNames(
              { 'rui-PopperContent': contentProps.position === 'popper' },
              'rui-SelectContent',
              withBreakpoints(size, 'size'),
              `variant-${variant}`,
              { highContrast }
            )}
          >
            <SelectPrimitive.Viewport className="rui-SelectViewport">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </ThemeConfig>
      </SelectPrimitive.Portal>
    );
  }
);
SelectContent.displayName = 'SelectContent';

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

const Select = Object.assign(
  {},
  {
    Root: SelectRoot,
    Trigger: SelectTrigger,
    Content: SelectContent,
    Item: SelectItem,
    Group: SelectGroup,
    Label: SelectLabel,
    Separator: SelectSeparator,
  }
);

export {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
};
