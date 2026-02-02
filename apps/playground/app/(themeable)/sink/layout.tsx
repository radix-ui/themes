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
} from '@radix-ui/themes';
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

export default function SinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container size="4" maxWidth="1680px">
      <Grid
        areas={{ initial: '"header" "separator" "main"', md: '"main separator header"' }}
        columns={{ initial: '1', md: '1fr 1px 360px', xl: '1fr 1px 480px' }}
        rows={{ initial: 'auto 1px 1fr', md: '1' }}
        height="100%"
        minHeight="100svh"
      >
        <Collapsible.Root asChild>
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
                      <Tooltip content="Toggle navigation">
                        <Collapsible.Trigger asChild>
                          <IconButton aria-label="Toggle navigation" variant="ghost" color="gray">
                            <HamburgerMenuIcon />
                          </IconButton>
                        </Collapsible.Trigger>
                      </Tooltip>
                    </Flex>
                  </Container>
                </Flex>
              </Box>
              <Collapsible.Content asChild>
                <Box asChild height="100%" py="4" pb={{ initial: undefined, md: '9' }}>
                  <nav aria-label="Main">
                    <Container mx="4" size="4">
                      <NavigationMenu />
                    </Container>
                  </nav>
                </Box>
              </Collapsible.Content>
            </header>
          </Grid>
        </Collapsible.Root>
        <Box asChild gridArea="separator">
          <Separator size="4" aria-hidden orientation={{ initial: 'horizontal', md: 'vertical' }} />
        </Box>
        <Box
          asChild
          flexGrow="1"
          flexShrink="1"
          flexBasis="0"
          gridArea="main"
          py={{ initial: '6', md: '9' }}
        >
          <main>
            <Container mx="4" size="4" position="relative" width="100%" height="100%">
              {children}
            </Container>
          </main>
        </Box>
      </Grid>
    </Container>
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
