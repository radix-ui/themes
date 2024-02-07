'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { tabsContentPropDefs, tabsListPropDefs, tabsRootPropDefs } from './tabs.props.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

type TabsRootElement = React.ElementRef<typeof TabsPrimitive.Root>;
type TabsRootOwnProps = GetPropDefTypes<typeof tabsRootPropDefs>;
interface TabsRootProps
  extends ComponentPropsWithoutColor<typeof TabsPrimitive.Root>,
    MarginProps,
    TabsRootOwnProps {}
const TabsRoot = React.forwardRef<TabsRootElement, TabsRootProps>((props, forwardedRef) => {
  const { className, ...rootProps } = extractProps(props, marginPropDefs);
  return (
    <TabsPrimitive.Root
      {...rootProps}
      ref={forwardedRef}
      className={classNames('rt-TabsRoot', className)}
    />
  );
});
TabsRoot.displayName = 'TabsRoot';

type TabsListElement = React.ElementRef<typeof TabsPrimitive.List>;
type TabsListOwnProps = GetPropDefTypes<typeof tabsListPropDefs>;
interface TabsListProps
  extends Omit<ComponentPropsWithoutColor<typeof TabsPrimitive.List>, 'asChild'>,
    TabsListOwnProps {}
const TabsList = React.forwardRef<TabsListElement, TabsListProps>((props, forwardedRef) => {
  const { className, color, ...listProps } = extractProps(props, tabsListPropDefs);
  return (
    <TabsPrimitive.List
      data-accent-color={color}
      {...listProps}
      asChild={false}
      ref={forwardedRef}
      className={classNames('rt-BaseTabList', 'rt-TabsList', className)}
    />
  );
});
TabsList.displayName = 'TabsList';

type TabsTriggerElement = React.ElementRef<typeof TabsPrimitive.Trigger>;
interface TabsTriggerProps
  extends Omit<ComponentPropsWithoutColor<typeof TabsPrimitive.Trigger>, 'asChild'> {}
const TabsTrigger = React.forwardRef<TabsTriggerElement, TabsTriggerProps>(
  (props, forwardedRef) => {
    const { className, children, ...triggerProps } = props;
    return (
      <TabsPrimitive.Trigger
        {...triggerProps}
        asChild={false}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-BaseTabListTrigger', 'rt-TabsTrigger', className)}
      >
        <span className="rt-BaseTabListTriggerInner rt-TabsTriggerInner">{children}</span>
        <span className="rt-BaseTabListTriggerInnerHidden rt-TabsTriggerInnerHidden">
          {children}
        </span>
      </TabsPrimitive.Trigger>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

type TabsContentElement = React.ElementRef<typeof TabsPrimitive.Content>;
type TabsContentOwnProps = GetPropDefTypes<typeof tabsContentPropDefs>;
interface TabsContentProps
  extends ComponentPropsWithoutColor<typeof TabsPrimitive.Content>,
    TabsContentOwnProps {}
const TabsContent = React.forwardRef<TabsContentElement, TabsContentProps>(
  ({ className, ...props }, forwardedRef) => (
    <TabsPrimitive.Content
      {...props}
      ref={forwardedRef}
      className={classNames('rt-TabsContent', className)}
    />
  )
);
TabsContent.displayName = 'TabsContent';

export { TabsRoot, TabsList, TabsTrigger, TabsContent };
export type { TabsRootProps, TabsListProps, TabsTriggerProps, TabsContentProps };
