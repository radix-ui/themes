import * as React from 'react';
import classNames from 'classnames';
import { NavigationMenu } from 'radix-ui';

import { tabNavRootPropDefs } from './tab-nav.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { getSubtree } from '../helpers/get-subtree.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { tabNavLinkPropDefs } from './tab-nav.props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type TabNavRootElement = React.ElementRef<typeof NavigationMenu.Root>;
type TabNavRootElementProps = ComponentPropsWithout<'nav', RemovedProps>;
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
TabNavRoot.displayName = 'TabNav.Root';

type TabNavLinkElement = React.ElementRef<typeof NavigationMenu.Link>;
type TabNavLinkOwnProps = GetPropDefTypes<typeof tabNavLinkPropDefs>;
interface TabNavLinkProps
  extends ComponentPropsWithout<typeof NavigationMenu.Link, RemovedProps | 'onSelect'>,
    TabNavLinkOwnProps {}
const TabNavLink = React.forwardRef<TabNavLinkElement, TabNavLinkProps>((props, forwardedRef) => {
  const { asChild, children, className, ...linkProps } = props;

  return (
    <NavigationMenu.Item className="rt-TabNavItem">
      <NavigationMenu.Link
        {...linkProps}
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-BaseTabListTrigger', 'rt-TabNavLink', className)}
        onSelect={undefined}
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
TabNavLink.displayName = 'TabNav.Link';

export { TabNavRoot as Root, TabNavLink as Link };
export type { TabNavRootProps as RootProps, TabNavLinkProps as LinkProps };
