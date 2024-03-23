'use client';
import * as React from 'react';
import {
  Theme,
  Container,
  Section,
  Card,
  Text,
  Box,
  Button,
  Flex,
  ThemePanel,
  RadioCards,
  CheckboxCards,
  DropdownMenu,
  Link,
  CheckboxGroup,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';
import { TrashIcon } from '@radix-ui/react-icons';

export default function Test() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <ThemePanel defaultOpen={false} />

              <Container size="1" px="5">
                <Section>
                  <Flex align="start" direction="column" gap="5">
                    <Button variant="classic">Click me</Button>
                    <Button variant="solid">Click me</Button>
                    <Button variant="outline">Click me</Button>
                    <Button variant="surface">Click me</Button>
                    <Button variant="soft">Click me</Button>
                    <Button variant="ghost">Click me</Button>

                    <Card asChild>
                      <button>
                        <Text as="p" size="2" weight="bold" trim="start">
                          Button
                        </Text>
                        <Text as="p" color="gray" size="2" trim="end">
                          That looks like card
                        </Text>
                      </button>
                    </Card>

                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button>
                          Dropdown Menu <DropdownMenu.TriggerIcon />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenuContentDemo />
                    </DropdownMenu.Root>

                    <Link href="#" onClick={(event) => event.preventDefault()}>
                      Link
                    </Link>

                    <CheckboxGroup.Root defaultValue={['1']}>
                      <CheckboxGroup.Item value="1">Checkbox 1</CheckboxGroup.Item>
                      <CheckboxGroup.Item value="2">Checkbox 2</CheckboxGroup.Item>
                      <CheckboxGroup.Item value="3">Checkbox 3</CheckboxGroup.Item>
                    </CheckboxGroup.Root>

                    <Box width="100%">
                      <CheckboxCards.Root defaultValue={['0']} size="2" gap="2" columns="1">
                        <CheckboxCards.Item value="0">Node.js</CheckboxCards.Item>
                        <CheckboxCards.Item value="1">Ruby</CheckboxCards.Item>
                        <CheckboxCards.Item value="2">Go</CheckboxCards.Item>
                      </CheckboxCards.Root>
                    </Box>

                    <Box width="100%">
                      <RadioCards.Root defaultValue="0" size="2" gap="2" columns="1">
                        <RadioCards.Item value="0">Node.js</RadioCards.Item>
                        <RadioCards.Item value="1">Ruby</RadioCards.Item>
                        <RadioCards.Item value="2">Go</RadioCards.Item>
                      </RadioCards.Root>
                    </Box>
                  </Flex>
                </Section>
              </Container>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}

function DropdownMenuContentDemo(props: React.ComponentProps<typeof DropdownMenu.Content>) {
  return (
    <DropdownMenu.Content {...props}>
      <DropdownMenu.Item shortcut="⌘+T">New Tab</DropdownMenu.Item>
      <DropdownMenu.Item shortcut="⌘+N">New Window</DropdownMenu.Item>
      <DropdownMenu.Item shortcut="⇧+⌘+N" disabled>
        New Private Window
      </DropdownMenu.Item>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>More Tools</DropdownMenu.SubTrigger>

        <DropdownMenu.SubContent>
          <DropdownMenu.Item shortcut="⌘+S">Save Page As…</DropdownMenu.Item>
          <DropdownMenu.Item>Create Shortcut…</DropdownMenu.Item>
          <DropdownMenu.Item>Name Window…</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Developer Tools</DropdownMenu.Item>
          <DropdownMenu.Item color="red">
            <Box asChild mx="-3px">
              <TrashIcon />
            </Box>
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>

      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Label>Other</DropdownMenu.Label>
        <DropdownMenu.Item shortcut="⌘+P">Print</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘+Q" asChild>
          <a href="#logout">Logout</a>
        </DropdownMenu.Item>
      </DropdownMenu.Group>

      {props.variant === 'solid' && (
        <>
          <DropdownMenu.Separator />

          <DropdownMenu.CheckboxItem shortcut="⌘+B" checked>
            Show Bookmarks
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem>Show Full URLs</DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator />

          <DropdownMenu.Label>People</DropdownMenu.Label>
          <DropdownMenu.RadioGroup value="pedro">
            <DropdownMenu.RadioItem value="pedro">Pedro Duarte</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="colm">Colm Tuite</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />

          <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
        </>
      )}
    </DropdownMenu.Content>
  );
}
