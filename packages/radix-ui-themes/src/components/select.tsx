'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { selectRootPropDefs, selectTriggerPropDefs, selectContentPropDefs } from './select.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';
import { Theme, useThemeContext } from '../theme';
import { ThickCheckIcon, ChevronDownIcon } from '../icons';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type SelectRootOwnProps = GetPropDefTypes<typeof selectRootPropDefs>;

type SelectContextValue = SelectRootOwnProps;
const SelectContext = React.createContext<SelectContextValue>({});

interface SelectRootProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    SelectContextValue {}
const SelectRoot: React.FC<SelectRootProps> = (props) => {
  const { children, size = selectRootPropDefs.size.default, ...rootProps } = props;
  return (
    <SelectPrimitive.Root {...rootProps}>
      <SelectContext.Provider value={React.useMemo(() => ({ size }), [size])}>
        {children}
      </SelectContext.Provider>
    </SelectPrimitive.Root>
  );
};
SelectRoot.displayName = 'SelectRoot';

type SelectTriggerElement = React.ElementRef<typeof SelectPrimitive.Trigger>;
type SelectTriggerOwnProps = GetPropDefTypes<typeof selectTriggerPropDefs>;
interface SelectTriggerProps
  extends Omit<PropsWithoutRefOrColor<typeof SelectPrimitive.Trigger>, 'asChild'>,
    MarginProps,
    SelectTriggerOwnProps {}
const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const {
      className,
      variant = selectTriggerPropDefs.variant.default,
      color = selectTriggerPropDefs.color.default,
      radius = selectTriggerPropDefs.radius.default,
      placeholder,
      ...triggerProps
    } = marginRest;
    const { size } = React.useContext(SelectContext);
    return (
      <SelectPrimitive.Trigger asChild>
        <button
          data-accent-color={color}
          data-radius={radius}
          {...triggerProps}
          ref={forwardedRef}
          className={classNames(
            'rt-reset',
            'rt-SelectTrigger',
            className,
            withBreakpoints(size, 'rt-r-size'),
            `rt-variant-${variant}`,
            withMarginProps(marginProps)
          )}
        >
          <span className="rt-SelectTriggerInner">
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className="rt-SelectIcon" />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

type SelectContentElement = React.ElementRef<typeof SelectPrimitive.Content>;
type SelectContentOwnProps = GetPropDefTypes<typeof selectContentPropDefs>;
interface SelectContentProps
  extends PropsWithoutRefOrColor<typeof SelectPrimitive.Content>,
    SelectContentOwnProps {
  container?: React.ComponentProps<typeof SelectPrimitive.Portal>['container'];
}
const SelectContent = React.forwardRef<SelectContentElement, SelectContentProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      variant = selectContentPropDefs.variant.default,
      highContrast = selectContentPropDefs.highContrast.default,
      color = selectContentPropDefs.color.default,
      container,
      ...contentProps
    } = props;
    const { size } = React.useContext(SelectContext);
    const themeContext = useThemeContext();
    const resolvedColor = color ?? themeContext.accentColor;
    return (
      <SelectPrimitive.Portal container={container}>
        <Theme asChild>
          <SelectPrimitive.Content
            data-accent-color={resolvedColor}
            sideOffset={4}
            {...contentProps}
            ref={forwardedRef}
            className={classNames(
              { 'rt-PopperContent': contentProps.position === 'popper' },
              'rt-SelectContent',
              className,
              withBreakpoints(size, 'rt-r-size'),
              `rt-variant-${variant}`,
              { 'rt-high-contrast': highContrast }
            )}
          >
            <ScrollAreaPrimitive.Root type="auto" className="rt-ScrollAreaRoot">
              <SelectPrimitive.Viewport asChild className="rt-SelectViewport">
                <ScrollAreaPrimitive.Viewport
                  className="rt-ScrollAreaViewport"
                  style={{ overflowY: undefined }}
                >
                  {children}
                </ScrollAreaPrimitive.Viewport>
              </SelectPrimitive.Viewport>
              <ScrollAreaPrimitive.Scrollbar
                className="rt-ScrollAreaScrollbar rt-r-size-1"
                orientation="vertical"
              >
                <ScrollAreaPrimitive.Thumb className="rt-ScrollAreaThumb" />
              </ScrollAreaPrimitive.Scrollbar>
            </ScrollAreaPrimitive.Root>
          </SelectPrimitive.Content>
        </Theme>
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
      className={classNames('rt-SelectItem', className)}
    >
      <SelectPrimitive.ItemIndicator className="rt-SelectItemIndicator">
        <ThickCheckIcon className="rt-SelectItemIndicatorIcon" />
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
      className={classNames('rt-SelectGroup', props.className)}
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
      className={classNames('rt-SelectLabel', props.className)}
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
      className={classNames('rt-SelectSeparator', props.className)}
    />
  )
);
SelectSeparator.displayName = 'SelectSeparator';

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

export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
};
