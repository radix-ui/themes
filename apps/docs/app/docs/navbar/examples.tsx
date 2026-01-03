'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, Button, Avatar, Text, Separator, IconButton, DropdownMenu, Navbar } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home01Icon, Settings01Icon, Notification01Icon, UserIcon, Menu01Icon } from '@hugeicons/core-free-icons';

export function NavbarExamples() {
  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Basic Navbar */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Basic</SectionHeader.Title>
            <SectionHeader.Description>Simple navbar with logo and navigation links</SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="10rem">
          <Navbar.Root position="static">
            <Navbar.Logo>
              <Avatar src="/kookie-ui-logo.png" fallback="K" size="2" />
            </Navbar.Logo>
            <Navbar.Navigation>
              <Button variant="ghost" size="2">
                Products
              </Button>
              <Button variant="ghost" size="2">
                Solutions
              </Button>
              <Button variant="ghost" size="2">
                Pricing
              </Button>
            </Navbar.Navigation>
          </Navbar.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Navbar.Root>
  <Navbar.Logo>
    <Avatar src="/logo.png" fallback="B" size="2" />
  </Navbar.Logo>
  <Navbar.Navigation>
    <Button variant="ghost" size="2">Products</Button>
    <Button variant="ghost" size="2">Solutions</Button>
    <Button variant="ghost" size="2">Pricing</Button>
  </Navbar.Navigation>
</Navbar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Marketing Navbar */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Marketing</SectionHeader.Title>
            <SectionHeader.Description>Full marketing navbar with all slots populated</SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="10rem">
          <Navbar.Root position="static">
            <Navbar.Logo>
              <Avatar src="/kookie-ui-logo.png" fallback="K" size="2" />
            </Navbar.Logo>

            <Navbar.Navigation>
              <Button variant="ghost" size="2">
                Features
              </Button>
              <Button variant="ghost" size="2">
                Pricing
              </Button>
              <Button variant="ghost" size="2">
                Blog
              </Button>
            </Navbar.Navigation>

            <Navbar.Actions gap="2">
              <Button variant="ghost" size="2">
                Sign In
              </Button>
              <Button variant="solid" size="2" highContrast>
                Get Started
              </Button>
            </Navbar.Actions>
          </Navbar.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Navbar.Root>
  <Navbar.Logo>
    <Avatar src="/logo.png" fallback="B" size="2" />
  </Navbar.Logo>

  <Navbar.Navigation>
    <Button variant="ghost" size="2">Features</Button>
    <Button variant="ghost" size="2">Pricing</Button>
    <Button variant="ghost" size="2">Blog</Button>
  </Navbar.Navigation>

  <Navbar.Actions gap="2">
    <Button variant="ghost" size="2">Sign In</Button>
    <Button variant="solid" size="2" highContrast>Get Started</Button>
  </Navbar.Actions>
</Navbar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Slot Architecture */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Slot Architecture</SectionHeader.Title>
            <SectionHeader.Description>Visualize the three semantic slots: Logo (left), Navigation (center, expands), Actions (right)</SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="10rem">
          <Navbar.Root position="static">
            <Navbar.Logo>
              <Flex
                p="3"
                align="center"
                justify="center"
                style={{
                  border: '1px dashed var(--crimson-8)',
                  background: 'repeating-linear-gradient(135deg, transparent, transparent 4px, var(--crimson-3) 4px, var(--crimson-3) 5px)',
                }}
              >
                <Text size="2" color="gray">
                  Logo Slot
                </Text>
              </Flex>
            </Navbar.Logo>

            <Navbar.Navigation style={{ flex: 1 }}>
              <Flex
                py="3"
                px="6"
                align="center"
                justify="center"
                width="100%"
                style={{
                  border: '1px dashed var(--crimson-8)',
                  background: 'repeating-linear-gradient(135deg, transparent, transparent 4px, var(--crimson-3) 4px, var(--crimson-3) 5px)',
                }}
              >
                <Text size="2" color="gray">
                  Navigation Slot (expands)
                </Text>
              </Flex>
            </Navbar.Navigation>

            <Navbar.Actions>
              <Flex
                p="3"
                align="center"
                justify="center"
                style={{
                  border: '1px dashed var(--crimson-8)',
                  background: 'repeating-linear-gradient(135deg, transparent, transparent 4px, var(--crimson-3) 4px, var(--crimson-3) 5px)',
                }}
              >
                <Text size="2" color="gray">
                  Actions Slot
                </Text>
              </Flex>
            </Navbar.Actions>
          </Navbar.Root>
        </PreviewBlock>
        <CodeBlock
          code={`const slotStyle = {
  border: '1px dashed var(--crimson-8)',
  background: 'repeating-linear-gradient(135deg, transparent, transparent 4px, var(--crimson-3) 4px, var(--crimson-3) 5px)',
};

<Navbar.Root position="static">
  <Navbar.Logo>
    <Flex p="3" align="center" justify="center" style={slotStyle}>
      <Text size="2" color="gray">Logo Slot</Text>
    </Flex>
  </Navbar.Logo>

  <Navbar.Navigation style={{ flex: 1 }}>
    <Flex py="3" px="6" align="center" justify="center" width="100%" style={slotStyle}>
      <Text size="2" color="gray">Navigation Slot (expands)</Text>
    </Flex>
  </Navbar.Navigation>

  <Navbar.Actions>
    <Flex p="3" align="center" justify="center" style={slotStyle}>
      <Text size="2" color="gray">Actions Slot</Text>
    </Flex>
  </Navbar.Actions>
</Navbar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 4: With Icons */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>With Icons</SectionHeader.Title>
            <SectionHeader.Description>Add icons to navigation items for visual clarity</SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="10rem">
          <Navbar.Root position="static">
            <Navbar.Logo>
              <Avatar src="/kookie-ui-logo.png" fallback="K" size="2" />
            </Navbar.Logo>
            <Navbar.Navigation>
              <Button variant="ghost" size="2">
                <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
                Home
              </Button>
              <Button variant="ghost" size="2">
                <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                Settings
              </Button>
            </Navbar.Navigation>
            <Navbar.Actions gap="1">
              <IconButton variant="ghost" size="2" aria-label="Notifications">
                <HugeiconsIcon icon={Notification01Icon} strokeWidth={1.75} />
              </IconButton>
              <IconButton variant="ghost" size="2" aria-label="Profile">
                <HugeiconsIcon icon={UserIcon} strokeWidth={1.75} />
              </IconButton>
            </Navbar.Actions>
          </Navbar.Root>
        </PreviewBlock>
        <CodeBlock
          code={`import { HugeiconsIcon } from '@hugeicons/react';
import { Home01Icon, Settings01Icon, Notification01Icon, UserIcon } from '@hugeicons/core-free-icons';

<Navbar.Root>
  <Navbar.Logo>
    <Avatar src="/logo.png" fallback="B" size="2" />
  </Navbar.Logo>
  <Navbar.Navigation>
    <Button variant="ghost" size="2">
      <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
      Home
    </Button>
    <Button variant="ghost" size="2">
      <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
      Settings
    </Button>
  </Navbar.Navigation>
  <Navbar.Actions gap="1">
    <IconButton variant="ghost" size="2" aria-label="Notifications">
      <HugeiconsIcon icon={Notification01Icon} strokeWidth={1.75} />
    </IconButton>
    <IconButton variant="ghost" size="2" aria-label="Profile">
      <HugeiconsIcon icon={UserIcon} strokeWidth={1.75} />
    </IconButton>
  </Navbar.Actions>
</Navbar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 5: Dashboard with User Menu */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Dashboard</SectionHeader.Title>
            <SectionHeader.Description>Dashboard navbar with dropdown user menu</SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="10rem">
          <Navbar.Root position="static">
            <Navbar.Logo>
              <Avatar src="/kookie-ui-logo.png" fallback="K" size="2" />
            </Navbar.Logo>
            <Navbar.Navigation>
              <Button variant="ghost" size="2">
                Overview
              </Button>
              <Button variant="ghost" size="2">
                Analytics
              </Button>
              <Button variant="ghost" size="2">
                Reports
              </Button>
            </Navbar.Navigation>
            <Navbar.Actions>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost" size="2">
                    <Avatar size="2" fallback="JD" highContrast />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="soft">
                  <DropdownMenu.Item>Profile</DropdownMenu.Item>
                  <DropdownMenu.Item>Settings</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color="red">Sign Out</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Navbar.Actions>
          </Navbar.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Navbar.Root>
  <Navbar.Logo>
    <Avatar src="/logo.png" fallback="B" size="2" />
  </Navbar.Logo>
  <Navbar.Navigation>
    <Button variant="ghost" size="2">Overview</Button>
    <Button variant="ghost" size="2">Analytics</Button>
    <Button variant="ghost" size="2">Reports</Button>
  </Navbar.Navigation>
  <Navbar.Actions>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" size="2">
          <Avatar size="2" fallback="JD" highContrast />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        <DropdownMenu.Item>Profile</DropdownMenu.Item>
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red">Sign Out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Navbar.Actions>
</Navbar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 6: Minimal */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Minimal</SectionHeader.Title>
            <SectionHeader.Description>When you only need branding without navigation</SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="10rem">
          <Navbar.Root position="static">
            <Navbar.Logo>
              <Avatar src="/kookie-ui-logo.png" fallback="K" size="2" />
            </Navbar.Logo>
            <Navbar.Actions>
              <Button variant="soft" size="2" color="gray" highContrast>
                Contact
              </Button>
            </Navbar.Actions>
          </Navbar.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Navbar.Root>
  <Navbar.Logo>
    <Avatar src="/logo.png" fallback="B" size="2" />
  </Navbar.Logo>
  <Navbar.Actions>
    <Button variant="soft" size="2" color="gray" highContrast>Contact</Button>
  </Navbar.Actions>
</Navbar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 7: Size Variations */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Size Variations</SectionHeader.Title>
            <SectionHeader.Description>Compare the three size options: 1 (compact), 2 (default), 3 (spacious)</SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="24rem">
          <Flex direction="column" gap="4" width="100%">
            <Navbar.Root position="static" size="1">
              <Navbar.Logo>
                <Avatar src="/kookie-ui-logo.png" fallback="K" size="1" />
                <Text size="1" color="gray">
                  size=&quot;1&quot;
                </Text>
              </Navbar.Logo>
              <Navbar.Actions>
                <Button variant="ghost" size="1">
                  Action
                </Button>
              </Navbar.Actions>
            </Navbar.Root>
            <Navbar.Root position="static" size="2">
              <Navbar.Logo>
                <Avatar src="/kookie-ui-logo.png" fallback="K" size="2" />
                <Text size="2" color="gray">
                  size=&quot;2&quot; (default)
                </Text>
              </Navbar.Logo>
              <Navbar.Actions>
                <Button variant="ghost" size="2">
                  Action
                </Button>
              </Navbar.Actions>
            </Navbar.Root>
            <Navbar.Root position="static" size="3">
              <Navbar.Logo>
                <Avatar src="/kookie-ui-logo.png" fallback="K" size="3" />
                <Text size="3" color="gray">
                  size=&quot;3&quot;
                </Text>
              </Navbar.Logo>
              <Navbar.Actions>
                <Button variant="ghost" size="2">
                  Action
                </Button>
              </Navbar.Actions>
            </Navbar.Root>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`{/* Compact */}
<Navbar.Root size="1">
  <Navbar.Logo>
    <Avatar src="/logo.png" fallback="B" size="1" />
  </Navbar.Logo>
</Navbar.Root>

{/* Default */}
<Navbar.Root size="2">
  <Navbar.Logo>
    <Avatar src="/logo.png" fallback="B" size="2" />
  </Navbar.Logo>
</Navbar.Root>

{/* Spacious */}
<Navbar.Root size="3">
  <Navbar.Logo>
    <Avatar src="/logo.png" fallback="B" size="3" />
  </Navbar.Logo>
</Navbar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 8: Logo Only (Centered) */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Logo Only</SectionHeader.Title>
            <SectionHeader.Description>Navbar with just the logo for simple landing pages</SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="10rem">
          <Navbar.Root position="static">
            <Navbar.Logo>
              <Avatar src="/kookie-ui-logo.png" fallback="K" size="2" />
            </Navbar.Logo>
          </Navbar.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Navbar.Root>
  <Navbar.Logo>
    <Avatar src="/logo.png" fallback="B" size="2" />
  </Navbar.Logo>
</Navbar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
