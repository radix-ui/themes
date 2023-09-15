'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { tabsListPropDefs } from './tabs.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { MarginProps, GetPropDefTypes } from '../helpers';

type TabsRootElement = React.ElementRef<typeof TabsPrimitive.Root>;
interface TabsRootProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    MarginProps {}
const TabsRoot = React.forwardRef<TabsRootElement, TabsRootProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, ...rootProps } = marginRest;
  return (
    <TabsPrimitive.Root
      {...rootProps}
      ref={forwardedRef}
      className={classNames('rt-TabsRoot', className, withMarginProps(marginProps))}
    />
  );
});
TabsRoot.displayName = 'TabsRoot';

type TabsListElement = React.ElementRef<typeof TabsPrimitive.List>;
type TabsListOwnProps = GetPropDefTypes<typeof tabsListPropDefs>;
interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    TabsListOwnProps {}
const TabsList = React.forwardRef<TabsListElement, TabsListProps>((props, forwardedRef) => {
  const { className, size = tabsListPropDefs.size.default, ...listProps } = props;
  return (
    <TabsPrimitive.List
      {...listProps}
      ref={forwardedRef}
      className={classNames('rt-TabsList', className, withBreakpoints(size, 'rt-r-size'))}
    />
  );
});
TabsList.displayName = 'TabsList';

type TabsTriggerElement = React.ElementRef<typeof TabsPrimitive.Trigger>;
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}
const TabsTrigger = React.forwardRef<TabsTriggerElement, TabsTriggerProps>(
  (props, forwardedRef) => {
    const { className, children, ...triggerProps } = props;
    return (
      <TabsPrimitive.Trigger
        {...triggerProps}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-TabsTrigger', className)}
      >
        <span className="rt-TabsTriggerInner">{children}</span>
        <span className="rt-TabsTriggerInnerHidden">{children}</span>
      </TabsPrimitive.Trigger>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

type TabsContentElement = React.ElementRef<typeof TabsPrimitive.Content>;
interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}
const TabsContent = React.forwardRef<TabsContentElement, TabsContentProps>(
  (props, forwardedRef) => (
    <TabsPrimitive.Content
      {...props}
      ref={forwardedRef}
      className={classNames('rt-TabsContent', props.className)}
    />
  )
);
TabsContent.displayName = 'TabsContent';

const Tabs = Object.assign(
  {},
  {
    Root: TabsRoot,
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
  }
);

export { Tabs, TabsRoot, TabsList, TabsTrigger, TabsContent };
export type { TabsRootProps, TabsListProps, TabsTriggerProps, TabsContentProps };
