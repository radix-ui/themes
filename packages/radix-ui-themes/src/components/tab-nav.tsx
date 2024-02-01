'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { tabNavLinkPropDefs, tabNavPropDefs } from './tab-nav.props';
import { extractProps, getRoot, marginPropDefs } from '../helpers';

import type { MarginProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type TabNavRootElement = React.ElementRef<typeof NavigationMenu.Root>;
type TabNavOwnProps = GetPropDefTypes<typeof tabNavPropDefs>;
interface TabNavRootProps
  extends Omit<PropsWithoutRefOrColor<typeof NavigationMenu.Root>, 'asChild'>,
    MarginProps,
    TabNavOwnProps {}
const TabNavRoot = React.forwardRef<TabNavRootElement, TabNavRootProps>((props, forwardedRef) => {
  const { children, className, color, ...rootProps } = extractProps(
    props,
    tabNavPropDefs,
    marginPropDefs
  );
  return (
    <NavigationMenu.Root
      className="rt-TabNavRoot"
      data-accent-color={color}
      {...rootProps}
      asChild={false}
      ref={forwardedRef}
    >
      <NavigationMenu.List
        className={classNames('rt-reset', 'rt-BaseTabList', 'rt-TabNavList', className)}
      >
        {children}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
});
TabNavRoot.displayName = 'TabNavRoot';

type TabNavLinkElement = React.ElementRef<typeof NavigationMenu.Link>;
type TabNavLinkOwnProps = GetPropDefTypes<typeof tabNavLinkPropDefs>;
interface TabNavLinkProps
  extends Omit<PropsWithoutRefOrColor<typeof NavigationMenu.Link>, 'onSelect'>,
    TabNavLinkOwnProps {}
const TabNavLink = React.forwardRef<TabNavLinkElement, TabNavLinkProps>((props, forwardedRef) => {
  const { asChild, className, children: childrenProp, ...linkProps } = props;

  const { Root: TabNavLinkRoot, children } = getRoot({
    asChild,
    children: childrenProp,
    parent: NavigationMenu.Link,
  });

  return (
    <NavigationMenu.Item className="rt-TabNavItem">
      <TabNavLinkRoot
        {...linkProps}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-BaseTabListTrigger', 'rt-TabNavLink', className)}
        onSelect={() => {}}
      >
        <span className="rt-BaseTabListTriggerInner rt-TabNavLinkInner">{children}</span>
        <span className="rt-BaseTabListTriggerInnerHidden rt-TabNavLinkInnerHidden">
          {children}
        </span>
      </TabNavLinkRoot>
    </NavigationMenu.Item>
  );
});
TabNavLink.displayName = 'TabNavLink';

const TabNav = Object.assign(
  {},
  {
    Root: TabNavRoot,
    Link: TabNavLink,
  }
);

export { TabNav, TabNavRoot, TabNavLink };
export type { TabNavRootProps, TabNavLinkProps };
