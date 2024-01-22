'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { tabNavPropDefs } from './tab-nav.props';
import { extractProps, marginPropDefs } from '../helpers';

import type { MarginProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type TabNavRootElement = React.ElementRef<typeof NavigationMenu.Root>;
type TabNavOwnProps = GetPropDefTypes<typeof tabNavPropDefs>;
interface TabNavRootProps
  extends PropsWithoutRefOrColor<typeof NavigationMenu.Root>,
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

type TabNavItemElement = React.ElementRef<typeof NavigationMenu.Link>;
interface TabNavItemProps extends React.ComponentPropsWithoutRef<typeof NavigationMenu.Link> {}
const TabNavItem = React.forwardRef<TabNavItemElement, TabNavItemProps>((props, forwardedRef) => {
  const { asChild = false, className, children, ...itemProps } = props;
  return (
    <NavigationMenu.Item className="rt-TabNavItem">
      <NavigationMenu.Link
        {...itemProps}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-BaseTabListTrigger', 'rt-TabNavLink', className)}
        asChild
      >
        {asChild ? (
          getChild(children)
        ) : (
          <a>
            <TabNavItemInner>{children}</TabNavItemInner>
          </a>
        )}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
});
TabNavItem.displayName = 'TabNavItem';

function getChild(children: React.ReactNode) {
  const firstChild = React.Children.only(children) as React.ReactElement;
  return React.cloneElement(firstChild, {
    children: <TabNavItemInner>{firstChild.props.children}</TabNavItemInner>,
  });
}

function TabNavItemInner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="rt-BaseTabListTriggerInner rt-TabNavLinkInner">{children}</span>
      <span className="rt-BaseTabListTriggerInnerHidden rt-TabNavLinkInnerHidden">{children}</span>
    </>
  );
}

const TabNav = Object.assign(
  {},
  {
    Root: TabNavRoot,
    Item: TabNavItem,
  }
);

export { TabNav, TabNavRoot, TabNavItem };
export type { TabNavRootProps, TabNavItemProps };
