'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import {
  Flex,
  Avatar,
  Text,
  Card,
  Badge,
  Separator,
  Heading,
  IconButton,
  Button,
} from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  MoreHorizontalIcon,
  Mail01Icon,
  Clock01Icon,
  Add01Icon,
} from '@hugeicons/core-free-icons';

export function AvatarExamples() {
  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Team Members */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Team Members</SectionHeader.Title>
            <SectionHeader.Description>
              Solid variant avatars create consistent visual identity in team lists. Pair with role badges and action buttons for complete member cards.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="auto">
          <Card variant="classic" size="2" style={{ minWidth: 320, maxWidth: 400 }}>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center">
                <Flex gap="3" align="center">
                  <Avatar size="4" fallback="SK" color="violet" variant="solid" />
                  <Flex direction="column" gap="0">
                    <Text size="2" weight="medium">Sarah Kim</Text>
                    <Text size="1" color="gray">Product Lead</Text>
                  </Flex>
                </Flex>
                <Badge size="1" color="violet" variant="soft">Admin</Badge>
              </Flex>
              <Separator size="4" />
              <Flex justify="between" align="center">
                <Flex gap="3" align="center">
                  <Avatar size="4" fallback="JD" color="blue" variant="solid" />
                  <Flex direction="column" gap="0">
                    <Text size="2" weight="medium">John Doe</Text>
                    <Text size="1" color="gray">Engineer</Text>
                  </Flex>
                </Flex>
                <Badge size="1" color="blue" variant="soft">Member</Badge>
              </Flex>
              <Separator size="4" />
              <Flex justify="between" align="center">
                <Flex gap="3" align="center">
                  <Avatar size="4" fallback="AL" color="green" variant="solid" />
                  <Flex direction="column" gap="0">
                    <Text size="2" weight="medium">Alex Lee</Text>
                    <Text size="1" color="gray">Designer</Text>
                  </Flex>
                </Flex>
                <Badge size="1" color="green" variant="soft">Member</Badge>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" size="2" style={{ minWidth: 320 }}>
  <Flex direction="column" gap="3">
    <Flex justify="between" align="center">
      <Flex gap="3" align="center">
        <Avatar size="4" fallback="SK" color="violet" variant="solid" />
        <Flex direction="column" gap="0">
          <Text size="2" weight="medium">Sarah Kim</Text>
          <Text size="1" color="gray">Product Lead</Text>
        </Flex>
      </Flex>
      <Badge size="1" color="violet" variant="soft">Admin</Badge>
    </Flex>
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Messages */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Messages</SectionHeader.Title>
            <SectionHeader.Description>
              Smaller avatars (size 3) work well in dense interfaces like message lists. The soft variant provides subtle distinction without overwhelming the content.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="auto">
          <Card variant="classic" size="2" style={{ maxWidth: 440 }}>
            <Flex direction="column" gap="4">
              <Flex gap="3" align="start">
                <Avatar size="3" fallback="MJ" color="blue" variant="soft" />
                <Flex direction="column" gap="0" style={{ flex: 1 }}>
                  <Flex justify="between" align="center">
                    <Flex gap="2" align="center">
                      <Text size="2" weight="medium">Mike Johnson</Text>
                      <Text size="1" color="gray">2 hours ago</Text>
                    </Flex>
                    <IconButton variant="ghost" size="1" color="gray" aria-label="More options">
                      <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={1.75} />
                    </IconButton>
                  </Flex>
                  <Text size="2">This looks great! Love the new design direction.</Text>
                </Flex>
              </Flex>
              <Separator size="4" />
              <Flex gap="3" align="start">
                <Avatar size="3" fallback="EW" color="pink" variant="soft" />
                <Flex direction="column" gap="0" style={{ flex: 1 }}>
                  <Flex justify="between" align="center">
                    <Flex gap="2" align="center">
                      <Text size="2" weight="medium">Emma Wilson</Text>
                      <Text size="1" color="gray">1 hour ago</Text>
                    </Flex>
                    <IconButton variant="ghost" size="1" color="gray" aria-label="More options">
                      <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={1.75} />
                    </IconButton>
                  </Flex>
                  <Text size="2">Thanks! We're excited about the direction too.</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex gap="3" align="start">
  <Avatar size="3" fallback="MJ" color="blue" variant="soft" />
  <Flex direction="column" gap="0" style={{ flex: 1 }}>
    <Flex justify="between" align="center">
      <Flex gap="2" align="center">
        <Text size="2" weight="medium">Mike Johnson</Text>
        <Text size="1" color="gray">2 hours ago</Text>
      </Flex>
      <IconButton variant="ghost" size="1" color="gray">
        <HugeiconsIcon icon={MoreHorizontalIcon} />
      </IconButton>
    </Flex>
    <Text size="2">This looks great!</Text>
  </Flex>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Profile Header */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Profile Header</SectionHeader.Title>
            <SectionHeader.Description>
              Large avatars (size 6-7) anchor profile headers. Use solid variant for visual weight and pair with clear typography hierarchy.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="auto">
          <Card variant="classic" size="3" style={{ maxWidth: 360 }}>
            <Flex direction="column" gap="5" align="center" p="1" style={{ textAlign: 'center' }}>
              <Avatar size="6" fallback="SK" color="violet" variant="solid" />
              <Flex direction="column" gap="1">
                <Flex align="center" justify="center" gap="2">
                  <Heading size="4">Sarah Kim</Heading>
                  <Badge size="1" color="violet">Pro</Badge>
                </Flex>
                <Text size="2" color="gray">Senior Product Designer</Text>
                <Flex gap="1" align="center" justify="center">
                  <HugeiconsIcon icon={Clock01Icon} strokeWidth={1.75} size={14} />
                  <Text size="1" color="gray">Joined March 2023</Text>
                </Flex>
              </Flex>
              <Flex gap="2">
                <Button variant="solid" size="2">
                  <HugeiconsIcon icon={Mail01Icon} strokeWidth={1.75} />
                  Message
                </Button>
                <Button variant="soft" size="2" color="gray" highContrast>
                  Follow
                </Button>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" size="3">
  <Flex direction="column" gap="5" align="center" p="1">
    <Avatar size="6" fallback="SK" color="violet" variant="solid" />
    <Flex direction="column" gap="1">
      <Flex align="center" justify="center" gap="2">
        <Heading size="4">Sarah Kim</Heading>
        <Badge size="1" color="violet">Pro</Badge>
      </Flex>
      <Text size="2" color="gray">Senior Product Designer</Text>
    </Flex>
    <Flex gap="2">
      <Button variant="solid" size="2">
        <HugeiconsIcon icon={Mail01Icon} />
        Message
      </Button>
      <Button variant="soft" size="2" color="gray" highContrast>
        Follow
      </Button>
    </Flex>
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 4: Status Indicators */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Status Indicators</SectionHeader.Title>
            <SectionHeader.Description>
              Use the native status prop to show presence with a colored dot. The indicator scales automatically with avatar size.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="auto">
          <Card variant="classic" size="2" style={{ maxWidth: 340 }}>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center">
                <Flex gap="3" align="center">
                  <Avatar size="4" fallback="JD" variant="soft" status="green" />
                  <Flex direction="column" gap="0">
                    <Text size="2" weight="medium">John Doe</Text>
                    <Text size="1" color="green">Online</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Separator size="4" />
              <Flex justify="between" align="center">
                <Flex gap="3" align="center">
                  <Avatar size="4" fallback="AB" variant="soft" status="amber" />
                  <Flex direction="column" gap="0">
                    <Text size="2" weight="medium">Alice Brown</Text>
                    <Text size="1" color="amber">Away</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Separator size="4" />
              <Flex justify="between" align="center">
                <Flex gap="3" align="center">
                  <Avatar size="4" fallback="CD" variant="soft" status="gray" />
                  <Flex direction="column" gap="0">
                    <Text size="2" weight="medium">Chris Davis</Text>
                    <Text size="1" color="gray">Offline</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Avatar size="4" fallback="JD" variant="soft" status="green" />
<Avatar size="4" fallback="AB" variant="soft" status="amber" />
<Avatar size="4" fallback="CD" variant="soft" status="gray" />`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 5: Custom Badge */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Custom Badge</SectionHeader.Title>
            <SectionHeader.Description>
              Use the badge prop for custom content like notification counts or verification icons.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <Avatar
            size="5"
            fallback="JD"
            variant="surface"
            badge={
              <Badge size="2" color="red" variant="solid" radius="full">
                3
              </Badge>
            }
          />
        </PreviewBlock>
        <CodeBlock
          code={`<Avatar
  size="5"
  fallback="JD"
  variant="surface"
  badge={
    <Badge size="2" color="red" variant="solid" radius="full">
      3
    </Badge>
  }
/>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 6: Invite Members */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Invite Members</SectionHeader.Title>
            <SectionHeader.Description>
              Use IconButton with outline variant as an "add member" action that blends with existing avatars.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <Flex gap="3" align="center">
            <Avatar size="4" fallback="JD" variant="soft" radius="full" />
            <Avatar size="4" fallback="SK" variant="soft" radius="full" />
            <Avatar size="4" fallback="AL" variant="soft" radius="full" />
            <IconButton
              size="4"
              variant="outline"
              color="gray"
              radius="full"
              aria-label="Add member"
            >
              <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} />
            </IconButton>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex gap="3" align="center">
  <Avatar size="4" fallback="JD" variant="soft" radius="full" />
  <Avatar size="4" fallback="SK" variant="soft" radius="full" />
  <Avatar size="4" fallback="AL" variant="soft" radius="full" />
  <IconButton
    size="4"
    variant="outline"
    color="gray"
    radius="full"
    aria-label="Add member"
  >
    <HugeiconsIcon icon={Add01Icon} />
  </IconButton>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
