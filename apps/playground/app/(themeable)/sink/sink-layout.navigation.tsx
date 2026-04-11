'use client';
import * as React from 'react';
import NextLink from 'next/link';
import { Collapsible } from 'radix-ui';
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Link,
  Reset,
  Separator,
  Tooltip,
  VisuallyHidden,
} from '@radix-ui/themes';
import type { BoxProps, IconButtonProps } from '@radix-ui/themes';
import { RadixLogo } from './radix-logo';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

// prettier-ignore
const NAV_ITEMS = [
  { label: 'Alert Dialog', href: 'alert-dialog' },
  { label: 'Aspect Ratio', href: 'aspect-ratio' },
  { label: 'Avatar', href: 'avatar' },
  { label: 'Badge', href: 'badge' },
  { label: 'Blockquote', href: 'blockquote' },
  { label: 'Button', href: 'button' },
  { label: 'Callout', href: 'callout' },
  { label: 'Card', href: 'card' },
  { label: 'Checkbox', href: 'checkbox' },
  { label: 'Checkbox Cards', href: 'checkbox-cards' },
  { label: 'Checkbox Group', href: 'checkbox-group' },
  { label: 'Code', href: 'code' },
  { label: 'Container', href: 'container' },
  { label: 'Context Menu', href: 'context-menu' },
  { label: 'Cursors', href: 'cursors' },
  { label: 'Data List', href: 'data-list' },
  { label: 'Dialog', href: 'dialog' },
  { label: 'Dropdown Menu', href: 'dropdown-menu' },
  { label: 'Grid', href: 'grid' },
  { label: 'Heading', href: 'heading' },
  { label: 'Hover Card', href: 'hover-card' },
  { label: 'Icon Button', href: 'icon-button' },
  { label: 'Kbd', href: 'kbd' },
  { label: 'Link', href: 'link' },
  { label: 'Mixed Nested Themes Test', href: 'mixed-nested-themes-test' },
  { label: 'Nested Appearances Test', href: 'nested-appearances-test' },
  { label: 'Nested Colors Test', href: 'nested-colors-test' },
  { label: 'Playground', href: 'playground' },
  { label: 'Popover', href: 'popover' },
  { label: 'Progress', href: 'progress' },
  { label: 'Radio', href: 'radio' },
  { label: 'Radio Cards', href: 'radio-cards' },
  { label: 'Radio Group', href: 'radio-group' },
  { label: 'Scroll Area', href: 'scroll-area' },
  { label: 'Segmented Control', href: 'segmented-control' },
  { label: 'Select', href: 'select' },
  { label: 'Separator', href: 'separator' },
  { label: 'Shadow Tokens', href: 'shadow-tokens' },
  { label: 'Skeleton', href: 'skeleton' },
  { label: 'Slider', href: 'slider' },
  { label: 'Spinner', href: 'spinner' },
  { label: 'Switch', href: 'switch' },
  { label: 'Tab Nav', href: 'tab-nav' },
  { label: 'Table', href: 'table' },
  { label: 'Tabs', href: 'tabs' },
  { label: 'Text', href: 'text' },
  { label: 'Text Area', href: 'text-area' },
  { label: 'Text Field', href: 'text-field' },
  { label: 'Tooltip', href: 'tooltip' },
  { label: 'Typography', href: 'typography' },
] satisfies { label: string; href: string }[];

export function SinkLayoutNavigation() {
  const isHydrated = useIsHydrated();
  const trigger = isHydrated ? (
    <Tooltip content="Toggle navigation">
      <Collapsible.Trigger asChild>
        <NavigationTriggerButton />
      </Collapsible.Trigger>
    </Tooltip>
  ) : (
    <NavigationTriggerButton />
  );

  const content = isHydrated ? (
    <Collapsible.Content asChild>
      <NavigationContent />
    </Collapsible.Content>
  ) : (
    <NavigationContent display="none" />
  );

  const layout = (
    <Grid
      asChild
      flexGrow={{ initial: '0', md: '1' }}
      flexShrink={{ initial: '0', md: '1' }}
      flexBasis={{ initial: '0', md: '1' }}
      align={{ initial: 'center', md: 'start' }}
      justify="center"
      gridArea="header"
      position={{ initial: undefined, md: 'sticky' }}
      top={{ initial: undefined, md: '0' }}
      alignSelf={{ initial: undefined, md: 'start' }}
      maxHeight={{ initial: undefined, md: '100svh' }}
      overflow={{ initial: undefined, md: 'auto' }}
      rows="auto 1fr"
    >
      <header>
        <Box
          width="100%"
          alignSelf="center"
          style={{ backgroundColor: 'var(--color-background)' }}
          position={{ initial: undefined, md: 'sticky' }}
          top={{ initial: undefined, md: '0' }}
          pt={{ initial: '4', md: '9' }}
          pb="4"
        >
          <Flex height="100%" width="100%" align="center">
            <Container mx="4" size="4">
              <Flex gap="4" align="center">
                <Flex align="center" gap="1" flexGrow="1">
                  <RadixLogo />
                  <Heading size="5">Radix Themes</Heading>
                </Flex>
                {trigger}
              </Flex>
            </Container>
          </Flex>
        </Box>
        {content}
      </header>
    </Grid>
  );

  return isHydrated ? <Collapsible.Root asChild>{layout}</Collapsible.Root> : layout;
}

function NavigationTriggerButton(props: IconButtonProps) {
  return (
    <IconButton variant="ghost" color="gray" {...props}>
      <HamburgerMenuIcon aria-hidden />
      <VisuallyHidden>Toggle navigation</VisuallyHidden>
    </IconButton>
  );
}

function NavigationContent(props: BoxProps) {
  return (
    <Box asChild height="100%" py="4" pb={{ initial: undefined, md: '9' }} {...props}>
      <nav aria-label="Main">
        <Container mx="4" size="4">
          <NavigationMenu />
        </Container>
      </nav>
    </Box>
  );
}

function NavigationMenu() {
  return (
    <Flex direction="column" gap="2">
      <Link asChild highContrast>
        <NextLink href="/sink">Kitchen sink</NextLink>
      </Link>
      <Separator size="4" />
      <Flex direction="column" gap="1" asChild>
        <Reset>
          <ul>
            {NAV_ITEMS.map((item) => (
              <Box display="contents" asChild key={item.label}>
                <li>
                  <Link asChild highContrast>
                    <NextLink href={`/sink${item.href ? '/' + item.href : ''}`}>
                      {item.label}
                    </NextLink>
                  </Link>
                </li>
              </Box>
            ))}
          </ul>
        </Reset>
      </Flex>
    </Flex>
  );
}

const sub = () => () => void 0;

function useIsHydrated() {
  return React.useSyncExternalStore(
    sub,
    () => true,
    () => false,
  );
}
