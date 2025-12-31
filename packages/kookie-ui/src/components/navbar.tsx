'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot.js';

import { navbarRootPropDefs, navbarSlotPropDefs } from './navbar.props.js';
import { extractProps } from '../helpers/extract-props.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

/**
 * Navbar Component
 *
 * A horizontal navigation bar component with semantic slots for organizing
 * content. Follows the Shell and Sidebar compound component patterns.
 *
 * @example
 * <Navbar.Root>
 *   <Navbar.Logo>Brand/logo content</Navbar.Logo>
 *   <Navbar.Navigation>Navigation links</Navbar.Navigation>
 *   <Navbar.Actions>CTAs, user menu, etc</Navbar.Actions>
 * </Navbar.Root>
 */

// Root Component
type NavbarRootElement = React.ElementRef<'header'>;
type NavbarRootOwnProps = GetPropDefTypes<typeof navbarRootPropDefs>;
interface NavbarRootProps
  extends ComponentPropsWithout<'header', RemovedProps>,
    NavbarRootOwnProps {}

const NavbarRoot = React.forwardRef<NavbarRootElement, NavbarRootProps>(
  (props, forwardedRef) => {
    const { children, className, ...rootProps } = extractProps(
      props,
      navbarRootPropDefs,
    );

    const position = props.position ?? 'fixed';
    const height = props.height ?? '64';

    return (
      <header
        {...rootProps}
        ref={forwardedRef}
        className={classNames('rt-NavbarRoot', className)}
        data-position={position}
        style={{
          ...rootProps.style,
          ['--navbar-height' as any]: `${height}px`,
        }}
      >
        <div className="rt-NavbarContainer">{children}</div>
      </header>
    );
  },
);
NavbarRoot.displayName = 'Navbar.Root';

// Logo Slot
type NavbarLogoElement = React.ElementRef<'div'>;
type NavbarLogoOwnProps = GetPropDefTypes<typeof navbarSlotPropDefs>;
interface NavbarLogoProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    NavbarLogoOwnProps {}

const NavbarLogo = React.forwardRef<NavbarLogoElement, NavbarLogoProps>(
  ({ asChild, className, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        {...props}
        ref={forwardedRef}
        className={classNames('rt-NavbarLogo', className)}
      />
    );
  },
);
NavbarLogo.displayName = 'Navbar.Logo';

// Navigation Slot
type NavbarNavigationElement = React.ElementRef<'nav'>;
type NavbarNavigationOwnProps = GetPropDefTypes<typeof navbarSlotPropDefs>;
interface NavbarNavigationProps
  extends ComponentPropsWithout<'nav', RemovedProps>,
    NavbarNavigationOwnProps {}

const NavbarNavigation = React.forwardRef<NavbarNavigationElement, NavbarNavigationProps>(
  ({ asChild, className, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'nav';

    return (
      <Comp
        {...props}
        ref={forwardedRef}
        className={classNames('rt-NavbarNavigation', className)}
        role={asChild ? undefined : 'navigation'}
      />
    );
  },
);
NavbarNavigation.displayName = 'Navbar.Navigation';

// Actions Slot
type NavbarActionsElement = React.ElementRef<'div'>;
type NavbarActionsOwnProps = GetPropDefTypes<typeof navbarSlotPropDefs>;
interface NavbarActionsProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    NavbarActionsOwnProps {}

const NavbarActions = React.forwardRef<NavbarActionsElement, NavbarActionsProps>(
  ({ asChild, className, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        {...props}
        ref={forwardedRef}
        className={classNames('rt-NavbarActions', className)}
      />
    );
  },
);
NavbarActions.displayName = 'Navbar.Actions';

export {
  NavbarRoot as Root,
  NavbarLogo as Logo,
  NavbarNavigation as Navigation,
  NavbarActions as Actions,
};

export type {
  NavbarRootProps as RootProps,
  NavbarLogoProps as LogoProps,
  NavbarNavigationProps as NavigationProps,
  NavbarActionsProps as ActionsProps,
};
