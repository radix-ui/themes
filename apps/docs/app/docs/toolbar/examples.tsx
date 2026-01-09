'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader, EmptyState } from '@kushagradhawan/kookie-blocks';
import { Flex, Card, Text, Heading, Separator, IconButton, Button, Toolbar, ScrollArea } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, ArrowLeft01Icon, Cancel01Icon, Search01Icon, Settings01Icon, Home01Icon, Add01Icon, File02Icon, Folder02Icon } from '@hugeicons/core-free-icons';

const IMAGE_URL = 'https://images.unsplash.com/photo-1766182601602-55af0dc5e53b?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export function ToolbarExamples() {
  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Dialog Header */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Dialog Header</SectionHeader.Title>
            <SectionHeader.Description>
              A common pattern for dialog or panel headers. The toolbar stays fixed while content scrolls beneath it. The soft variant provides subtle separation from content.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="24rem">
          <Card variant="classic" size="3" inset style={{ width: '100%', maxWidth: '400px', height: '22rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Toolbar variant="ghost" size="1">
              <Toolbar.Left>
                <IconButton radius="full" variant="soft" size="2" color="gray" highContrast aria-label="Go back">
                  <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={1.75} />
                </IconButton>
              </Toolbar.Left>
              <Toolbar.Center>
                <Toolbar.Title>Settings</Toolbar.Title>
              </Toolbar.Center>
              <Toolbar.Right gap="1">
                <IconButton radius="full" size="2" aria-label="Close">
                  <HugeiconsIcon icon={PlusSignIcon} strokeWidth={1.75} />
                </IconButton>
                <IconButton radius="full" variant="soft" size="2" color="gray" highContrast aria-label="Close">
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={1.75} />
                </IconButton>
              </Toolbar.Right>
            </Toolbar>
            <ScrollArea scrollbars="vertical" style={{ flexGrow: 1, marginTop: 'var(--rt-toolbar-height)' }}>
              <Flex direction="column" gap="4" p="4">
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">
                    Notifications
                  </Text>
                  <Text size="2" color="gray">
                    Manage how you receive alerts and updates.
                  </Text>
                </Flex>
                <Separator size="4" />
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">
                    Privacy
                  </Text>
                  <Text size="2" color="gray">
                    Control who can see your activity.
                  </Text>
                </Flex>
                <Separator size="4" />
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">
                    Appearance
                  </Text>
                  <Text size="2" color="gray">
                    Customize theme and display options.
                  </Text>
                </Flex>
                <Separator size="4" />
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">
                    Language
                  </Text>
                  <Text size="2" color="gray">
                    Choose your preferred language.
                  </Text>
                </Flex>
                <Separator size="4" />
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">
                    Accessibility
                  </Text>
                  <Text size="2" color="gray">
                    Configure assistive features.
                  </Text>
                </Flex>
                <Separator size="4" />
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">
                    Storage
                  </Text>
                  <Text size="2" color="gray">
                    Manage your data and cache.
                  </Text>
                </Flex>
              </Flex>
            </ScrollArea>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card
  variant="classic"
  size="3"
  inset
  style={{
    height: '22rem',
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <Toolbar variant="ghost" size="1">
    <Toolbar.Left>
      <IconButton
        radius="full"
        variant="soft"
        size="2"
        color="gray"
        highContrast
        aria-label="Go back"
      >
        <ArrowLeftIcon />
      </IconButton>
    </Toolbar.Left>
    <Toolbar.Center>
      <Toolbar.Title>Settings</Toolbar.Title>
    </Toolbar.Center>
    <Toolbar.Right gap="1">
      <IconButton radius="full" size="2" aria-label="Add">
        <PlusIcon />
      </IconButton>
      <IconButton
        radius="full"
        variant="soft"
        size="2"
        color="gray"
        highContrast
        aria-label="Close"
      >
        <CloseIcon />
      </IconButton>
    </Toolbar.Right>
  </Toolbar>
  <ScrollArea
    scrollbars="vertical"
    style={{ flexGrow: 1, marginTop: 'var(--rt-toolbar-height)' }}
  >
    <Flex direction="column" gap="4" p="4">
      {/* Settings content */}
    </Flex>
  </ScrollArea>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Translucent Overlay */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Translucent Overlay</SectionHeader.Title>
            <SectionHeader.Description>
              Use floating mode with translucent material for toolbars over images or dynamic backgrounds. The backdrop blur creates depth while maintaining readability.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock
          height="40rem"
          showThemeToggle={false}
          appearance="dark"
          variant="ghost"
          background={{
            backgroundImage: `url(${IMAGE_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Card variant="classic" material="translucent" size="3" inset style={{ width: '100%', maxWidth: '400px', height: '24rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Toolbar floating variant="surface" material="translucent" size="1">
              <Toolbar.Left>
                <IconButton variant="ghost" size="2" color="gray" highContrast aria-label="Home">
                  <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
                </IconButton>
              </Toolbar.Left>
              <Toolbar.Center>
                <Toolbar.Title>Explore</Toolbar.Title>
              </Toolbar.Center>
              <Toolbar.Right>
                <IconButton variant="ghost" size="2" color="gray" highContrast aria-label="Search">
                  <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
                </IconButton>
              </Toolbar.Right>
            </Toolbar>
            <EmptyState pt="var(--rt-toolbar-height)" height="100%" justify="center">
              <EmptyState.Icon>
                <HugeiconsIcon icon={Search01Icon} size={32} strokeWidth={1.5} />
              </EmptyState.Icon>
              <EmptyState.Content>
                <EmptyState.Title>No results</EmptyState.Title>
                <EmptyState.Description>Try adjusting your search</EmptyState.Description>
              </EmptyState.Content>
            </EmptyState>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card
  variant="classic"
  material="translucent"
  size="3"
  inset
  style={{
    height: '24rem',
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <Toolbar
    floating
    variant="surface"
    material="translucent"
    size="1"
  >
    <Toolbar.Left>
      <IconButton
        variant="ghost"
        size="2"
        color="gray"
        highContrast
        aria-label="Home"
      >
        <HomeIcon />
      </IconButton>
    </Toolbar.Left>
    <Toolbar.Center>
      <Toolbar.Title>Explore</Toolbar.Title>
    </Toolbar.Center>
    <Toolbar.Right>
      <IconButton
        variant="ghost"
        size="2"
        color="gray"
        highContrast
        aria-label="Search"
      >
        <SearchIcon />
      </IconButton>
    </Toolbar.Right>
  </Toolbar>
  <EmptyState pt="var(--rt-toolbar-height)" height="100%" justify="center">
    <EmptyState.Icon>
      <SearchIcon size={32} strokeWidth={1.5} />
    </EmptyState.Icon>
    <EmptyState.Content>
      <EmptyState.Title>No results</EmptyState.Title>
      <EmptyState.Description>Try adjusting your search</EmptyState.Description>
    </EmptyState.Content>
  </EmptyState>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Form Actions */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Form Actions</SectionHeader.Title>
            <SectionHeader.Description>
              Bottom-anchored toolbars work well for form actions. The soft variant provides visual separation, with ghost for cancel and solid for the primary action.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="20rem">
          <Card
            variant="classic"
            size="1"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '18rem',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Flex direction="column" gap="4" p="4" flexGrow="1" pb="var(--rt-toolbar-height)">
              <Flex direction="column" gap="1">
                <Heading size="4" weight="medium">
                  Edit Profile
                </Heading>
                <Text size="2" color="gray">
                  Update your account information.
                </Text>
              </Flex>
              <Separator size="4" />
              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">
                  Display Name
                </Text>
                <Text size="2" color="gray">
                  John Doe
                </Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">
                  Email
                </Text>
                <Text size="2" color="gray">
                  john@example.com
                </Text>
              </Flex>
            </Flex>
            <Toolbar anchor="bottom" variant="soft" size="2">
              <Toolbar.Left>
                <Button variant="ghost" size="2" color="gray" highContrast>
                  Cancel
                </Button>
              </Toolbar.Left>
              <Toolbar.Right>
                <Button variant="solid" size="2" highContrast>
                  Save Changes
                </Button>
              </Toolbar.Right>
            </Toolbar>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" size="2" style={{ display: 'flex', flexDirection: 'column' }}>
  <Flex direction="column" gap="4" p="4" flexGrow="1" pb="var(--rt-toolbar-height)">
    <Heading size="4" weight="medium">Edit Profile</Heading>
    <Text size="2" color="gray">Update your account information.</Text>
    {/* Form fields */}
  </Flex>
  <Toolbar anchor="bottom" variant="soft" size="2">
    <Toolbar.Left>
      <Button
        variant="ghost"
        size="2"
        color="gray"
        highContrast
      >
        Cancel
      </Button>
    </Toolbar.Left>
    <Toolbar.Right>
      <Button variant="solid" size="2" highContrast>
        Save Changes
      </Button>
    </Toolbar.Right>
  </Toolbar>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 4: Document Browser */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Document Browser</SectionHeader.Title>
            <SectionHeader.Description>
              Toolbars with multiple actions in the right section. The surface variant provides subtle background, with soft icon buttons and a solid primary action.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="22rem">
          <Card variant="classic" size="2" style={{ width: '100%', maxWidth: '500px', overflow: 'hidden' }}>
            <Toolbar variant="surface" size="2">
              <Toolbar.Left>
                <Toolbar.Title>Documents</Toolbar.Title>
              </Toolbar.Left>
              <Toolbar.Right gap="1">
                <IconButton variant="soft" size="2" color="gray" highContrast aria-label="Search">
                  <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
                </IconButton>
                <IconButton variant="soft" size="2" color="gray" highContrast aria-label="Settings">
                  <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                </IconButton>
                <Button variant="solid" size="2" highContrast>
                  <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} />
                  New
                </Button>
              </Toolbar.Right>
            </Toolbar>
            <Flex direction="column" gap="1" pt="var(--rt-toolbar-height)">
              <Flex align="center" gap="3" py="1">
                <HugeiconsIcon icon={Folder02Icon} size={20} strokeWidth={1.75} style={{ color: 'var(--gray-10)' }} />
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">
                    Projects
                  </Text>
                  <Text size="1" color="gray">
                    12 items
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center" gap="3" py="1">
                <HugeiconsIcon icon={File02Icon} size={20} strokeWidth={1.75} style={{ color: 'var(--gray-10)' }} />
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">
                    Report Q4.pdf
                  </Text>
                  <Text size="1" color="gray">
                    2.4 MB
                  </Text>
                </Flex>
              </Flex>
              <Flex align="center" gap="3" py="1">
                <HugeiconsIcon icon={File02Icon} size={20} strokeWidth={1.75} style={{ color: 'var(--gray-10)' }} />
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">
                    Meeting Notes.md
                  </Text>
                  <Text size="1" color="gray">
                    12 KB
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" size="2">
  <Toolbar variant="surface" size="2">
    <Toolbar.Left>
      <Toolbar.Title>Documents</Toolbar.Title>
    </Toolbar.Left>
    <Toolbar.Right gap="1">
      <IconButton
        variant="soft"
        size="2"
        color="gray"
        highContrast
        aria-label="Search"
      >
        <SearchIcon />
      </IconButton>
      <IconButton
        variant="soft"
        size="2"
        color="gray"
        highContrast
        aria-label="Settings"
      >
        <SettingsIcon />
      </IconButton>
      <Button variant="solid" size="2" highContrast>
        <AddIcon />
        New
      </Button>
    </Toolbar.Right>
  </Toolbar>
  <Flex direction="column" p="3" gap="1" pt="var(--rt-toolbar-height)">
    {/* File list */}
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
