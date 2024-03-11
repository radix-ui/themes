'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { tabNavLinkPropDefs, tabNavRootPropDefs } from './tab-nav.props.js';
import { extractProps, getSubtree } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

type TabNavRootElement = React.ElementRef<typeof NavigationMenu.Root>;
type TabNavRootElementProps = React.HTMLAttributes<React.ElementRef<typeof NavigationMenu.Root>>;
type TabNavOwnProps = GetPropDefTypes<typeof tabNavRootPropDefs>;
interface TabNavRootProps
  extends Omit<TabNavRootElementProps, 'defaultValue' | 'dir' | 'color'>,
    MarginProps,
    TabNavOwnProps {}
const TabNavRoot = React.forwardRef<TabNavRootElement, TabNavRootProps>((props, forwardedRef) => {
  const { children, className, color, ...rootProps } = extractProps(
    props,
    tabNavRootPropDefs,
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
  extends Omit<ComponentPropsWithoutColor<typeof NavigationMenu.Link>, 'onSelect'>,
    TabNavLinkOwnProps {}
const TabNavLink = React.forwardRef<TabNavLinkElement, TabNavLinkProps>((props, forwardedRef) => {
  const { asChild, children, className, ...linkProps } = props;

  return (
    <NavigationMenu.Item className="rt-TabNavItem">
      <NavigationMenu.Link
        {...linkProps}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-BaseTabListTrigger', 'rt-TabNavLink', className)}
        onSelect={() => {}}
        asChild={asChild}
      >
        {getSubtree({ asChild, children }, (children) => (
          <>
            <span className="rt-BaseTabListTriggerInner rt-TabNavLinkInner">{children}</span>
            <span className="rt-BaseTabListTriggerInnerHidden rt-TabNavLinkInnerHidden">
              {children}
            </span>
          </>
        ))}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
});
TabNavLink.displayName = 'TabNavLink';

export { TabNavRoot, TabNavLink };
export type { TabNavRootProps, TabNavLinkProps };
