'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Flex } from './flex.js';
import { Slot } from './slot.js';

import type { FlexProps } from './flex.js';

import { navbarRootPropDefs } from './navbar.props.js';
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
    const size = props.size ?? '2';

    return (
      <header
        {...rootProps}
        ref={forwardedRef}
        className={classNames('rt-NavbarRoot', className)}
        data-position={position}
        data-size={size}
      >
        <div className="rt-NavbarContainer">{children}</div>
      </header>
    );
  },
);
NavbarRoot.displayName = 'Navbar.Root';

// Logo Slot - extends FlexProps
type NavbarLogoProps = FlexProps & {
  asChild?: boolean;
};

const NavbarLogo = React.forwardRef<HTMLDivElement, NavbarLogoProps>(
  ({ asChild, gap = '2', align = 'center', justify = 'start', className, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={classNames('rt-NavbarLogo', className)}
          {...props}
        />
      );
    }

    return (
      <Flex
        ref={ref}
        gap={gap}
        align={align}
        justify={justify}
        className={classNames('rt-NavbarLogo', className)}
        {...props}
      />
    );
  }
);
NavbarLogo.displayName = 'Navbar.Logo';

// Navigation Slot - extends FlexProps
type NavbarNavigationProps = FlexProps & {
  asChild?: boolean;
};

const NavbarNavigation = React.forwardRef<HTMLDivElement, NavbarNavigationProps>(
  ({ asChild, gap = '4', align = 'center', justify = 'center', className, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={classNames('rt-NavbarNavigation', className)}
          role="navigation"
          {...props}
        />
      );
    }

    return (
      <Flex
        ref={ref}
        gap={gap}
        align={align}
        justify={justify}
        className={classNames('rt-NavbarNavigation', className)}
        role="navigation"
        {...props}
      />
    );
  }
);
NavbarNavigation.displayName = 'Navbar.Navigation';

// Actions Slot - extends FlexProps
type NavbarActionsProps = FlexProps & {
  asChild?: boolean;
};

const NavbarActions = React.forwardRef<HTMLDivElement, NavbarActionsProps>(
  ({ asChild, gap = '4', align = 'center', justify = 'end', className, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={classNames('rt-NavbarActions', className)}
          {...props}
        />
      );
    }

    return (
      <Flex
        ref={ref}
        gap={gap}
        align={align}
        justify={justify}
        className={classNames('rt-NavbarActions', className)}
        {...props}
      />
    );
  }
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
