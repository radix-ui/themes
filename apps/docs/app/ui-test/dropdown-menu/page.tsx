'use client';

import * as React from 'react';
import { DropdownMenu, Button, Flex, Box, Text, Heading, Slider } from '@kushagradhawan/kookie-ui';

export default function DropdownMenuTest() {
  const [collisionPadding, setCollisionPadding] = React.useState(10);
  const [sideOffset, setSideOffset] = React.useState(1);
  const [alignOffset, setAlignOffset] = React.useState(0);

  return (
    <Box p="6" style={{ minHeight: '100vh' }}>
      <Heading size="6" mb="4">Dropdown Menu - Nested SubMenus Test</Heading>

      <Text as="p" size="2" color="gray" mb="6">
        Test collision behavior with deeply nested submenus. Resize window to mobile width to see the drill-down behavior.
      </Text>

      {/* Native Drill-Down Pattern */}
      <Box mb="6" p="4" style={{ background: 'var(--green-3)', borderRadius: 'var(--radius-3)', border: '2px solid var(--green-6)' }}>
        <Heading size="4" mb="2" color="green">✅ Native Drill-Down Mode</Heading>
        <Text as="p" size="2" color="gray" mb="4">
          Using <code>submenuBehavior="drill-down"</code> - submenus replace content inline with a back button.
        </Text>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft" color="green">Drill-Down Menu</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior="drill-down" style={{ minWidth: 220 }}>
            <DropdownMenu.Item>Home</DropdownMenu.Item>
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
            <DropdownMenu.Separator />

            <DropdownMenu.Sub label="Settings">
              <DropdownMenu.SubTrigger>Settings</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>General</DropdownMenu.Item>
                <DropdownMenu.Item>Notifications</DropdownMenu.Item>
                <DropdownMenu.Separator />

                <DropdownMenu.Sub label="Privacy">
                  <DropdownMenu.SubTrigger>Privacy</DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent>
                    <DropdownMenu.Item>Profile visibility</DropdownMenu.Item>
                    <DropdownMenu.Item>Blocked users</DropdownMenu.Item>
                    <DropdownMenu.Separator />

                    <DropdownMenu.Sub label="Data & Storage">
                      <DropdownMenu.SubTrigger>Data & Storage</DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>Download my data</DropdownMenu.Item>
                        <DropdownMenu.Item>Clear cache</DropdownMenu.Item>
                        <DropdownMenu.Item color="red">Delete account</DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">Logout</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>

      {/* Responsive Pattern */}
      <Box mb="6" p="4" style={{ background: 'var(--blue-3)', borderRadius: 'var(--radius-3)', border: '2px solid var(--blue-6)' }}>
        <Heading size="4" mb="2" color="blue">📱 Responsive Mode</Heading>
        <Text as="p" size="2" color="gray" mb="4">
          Using <code>{'submenuBehavior={{ initial: "drill-down", md: "cascade" }}'}</code> - drill-down on mobile, cascade on desktop.
        </Text>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft" color="blue">Responsive Menu</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            submenuBehavior={{ initial: 'drill-down', md: 'cascade' }}
            style={{ minWidth: 220 }}
          >
            <DropdownMenu.Item>Dashboard</DropdownMenu.Item>
            <DropdownMenu.Item>Projects</DropdownMenu.Item>
            <DropdownMenu.Separator />

            <DropdownMenu.Sub label="Account">
              <DropdownMenu.SubTrigger>Account</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Profile</DropdownMenu.Item>
                <DropdownMenu.Item>Billing</DropdownMenu.Item>
                <DropdownMenu.Separator />

                <DropdownMenu.Sub label="Security">
                  <DropdownMenu.SubTrigger>Security</DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent>
                    <DropdownMenu.Item>Change password</DropdownMenu.Item>
                    <DropdownMenu.Item>Two-factor auth</DropdownMenu.Item>
                    <DropdownMenu.Item>Sessions</DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <DropdownMenu.Sub label="Team">
              <DropdownMenu.SubTrigger>Team</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Members</DropdownMenu.Item>
                <DropdownMenu.Item>Invite</DropdownMenu.Item>
                <DropdownMenu.Item>Permissions</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Sign out</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Text as="p" size="1" color="gray" mt="2">
          Resize browser below 1024px to see drill-down behavior.
        </Text>
      </Box>

      {/* Cascade Mode (Default) */}
      <Box mb="6" p="4" style={{ background: 'var(--orange-3)', borderRadius: 'var(--radius-3)', border: '2px solid var(--orange-6)' }}>
        <Heading size="4" mb="2" color="orange">⚡ Cascade Mode (Default)</Heading>
        <Text as="p" size="2" color="gray" mb="4">
          Default behavior with <code>submenuBehavior="cascade"</code> - submenus open as floating portals.
        </Text>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft" color="orange">Cascade Menu</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content submenuBehavior="cascade">
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
            <DropdownMenu.Separator />

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>Level 1</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>L1 Item 1</DropdownMenu.Item>
                <DropdownMenu.Item>L1 Item 2</DropdownMenu.Item>
                <DropdownMenu.Separator />

                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger>Level 2</DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent>
                    <DropdownMenu.Item>L2 Item 1</DropdownMenu.Item>
                    <DropdownMenu.Item>L2 Item 2</DropdownMenu.Item>
                    <DropdownMenu.Separator />

                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>Level 3</DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>L3 Item 1</DropdownMenu.Item>
                        <DropdownMenu.Item>L3 Item 2</DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Text as="p" size="1" color="gray" mt="2">
          On mobile widths, this may overflow the viewport horizontally.
        </Text>
      </Box>

      {/* Controls for cascade testing */}
      <Box mb="6" p="4" style={{ background: 'var(--gray-2)', borderRadius: 'var(--radius-3)' }}>
        <Heading size="3" mb="4">SubContent Props (for cascade mode)</Heading>

        <Flex direction="column" gap="4">
          <Box>
            <Text size="2" mb="2" as="div">collisionPadding: {collisionPadding}px</Text>
            <Slider
              value={[collisionPadding]}
              onValueChange={(v) => setCollisionPadding(v[0])}
              min={0}
              max={50}
              step={5}
            />
          </Box>

          <Box>
            <Text size="2" mb="2" as="div">sideOffset: {sideOffset}px</Text>
            <Slider
              value={[sideOffset]}
              onValueChange={(v) => setSideOffset(v[0])}
              min={0}
              max={20}
              step={1}
            />
          </Box>

          <Box>
            <Text size="2" mb="2" as="div">alignOffset: {alignOffset}px</Text>
            <Slider
              value={[alignOffset]}
              onValueChange={(v) => setAlignOffset(v[0])}
              min={-20}
              max={20}
              step={1}
            />
          </Box>
        </Flex>
      </Box>

      {/* Position testing with cascade */}
      <Flex gap="4" wrap="wrap" mb="6">
        {/* Left-positioned menu */}
        <Box p="4" style={{ background: 'var(--gray-2)', borderRadius: 'var(--radius-3)', flex: 1, minWidth: 200 }}>
          <Text size="2" weight="bold" mb="3" as="div">Left Edge (cascade)</Text>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">Open Menu</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Item 1</DropdownMenu.Item>
              <DropdownMenu.Separator />

              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>Submenu</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent
                  collisionPadding={collisionPadding}
                  sideOffset={sideOffset}
                  alignOffset={alignOffset}
                >
                  <DropdownMenu.Item>Sub Item 1</DropdownMenu.Item>
                  <DropdownMenu.Item>Sub Item 2</DropdownMenu.Item>

                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>Nested</DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent
                      collisionPadding={collisionPadding}
                      sideOffset={sideOffset}
                      alignOffset={alignOffset}
                    >
                      <DropdownMenu.Item>Nested 1</DropdownMenu.Item>
                      <DropdownMenu.Item>Nested 2</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>

        {/* Right-positioned menu */}
        <Box p="4" style={{ background: 'var(--gray-2)', borderRadius: 'var(--radius-3)', flex: 1, minWidth: 200 }}>
          <Text size="2" weight="bold" mb="3" as="div">Right Edge (cascade)</Text>
          <Flex justify="end">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft">Open Menu</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <DropdownMenu.Item>Item 1</DropdownMenu.Item>
                <DropdownMenu.Separator />

                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger>Submenu</DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent
                    collisionPadding={collisionPadding}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                  >
                    <DropdownMenu.Item>Sub Item 1</DropdownMenu.Item>
                    <DropdownMenu.Item>Sub Item 2</DropdownMenu.Item>

                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>Nested</DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent
                        collisionPadding={collisionPadding}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                      >
                        <DropdownMenu.Item>Nested 1</DropdownMenu.Item>
                        <DropdownMenu.Item>Nested 2</DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Box>
      </Flex>

      {/* Info Box */}
      <Box p="4" style={{ background: 'var(--gray-3)', borderRadius: 'var(--radius-3)' }}>
        <Heading size="3" mb="2">API Reference</Heading>
        <Text as="div" size="2" mb="2">
          <strong>submenuBehavior</strong> prop on <code>DropdownMenu.Content</code>:
        </Text>
        <Box pl="4" mb="3">
          <Text as="div" size="2" mb="1">
            • <code>"cascade"</code> (default) - Submenus open as floating portals to the side
          </Text>
          <Text as="div" size="2" mb="1">
            • <code>"drill-down"</code> - Submenus replace content inline with back navigation
          </Text>
          <Text as="div" size="2">
            • <code>{'{ initial: "drill-down", md: "cascade" }'}</code> - Responsive behavior
          </Text>
        </Box>
        <Text as="div" size="2" mb="2">
          <strong>label</strong> prop on <code>DropdownMenu.Sub</code>:
        </Text>
        <Box pl="4">
          <Text as="div" size="2">
            • Sets the text shown in the back button (defaults to "Back")
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
