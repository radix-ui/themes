'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, Badge, Text, Card, Avatar, Separator, Heading, IconButton } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CheckmarkCircle02Icon,
  Clock01Icon,
  Cancel01Icon,
  MoreHorizontalIcon,
} from '@hugeicons/core-free-icons';

export function BadgeExamples() {
  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Deployment Status */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Deployment Status</SectionHeader.Title>
            <SectionHeader.Description>
              Use semantic colors to communicate status at a glance. Green for success, amber for pending, red for failures—users understand immediately without reading.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="auto">
          <Card variant="classic" size="2" style={{ minWidth: 360 }}>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center">
                <Flex gap="2" align="center">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={1.75} style={{ width: 16, height: 16 }} />
                  <Text size="2">Production</Text>
                </Flex>
                <Badge color="green">Live</Badge>
              </Flex>
              <Separator size="4" />
              <Flex justify="between" align="center">
                <Flex gap="2" align="center">
                  <HugeiconsIcon icon={Clock01Icon} strokeWidth={1.75} style={{ width: 16, height: 16 }} />
                  <Text size="2">Staging</Text>
                </Flex>
                <Badge color="amber">Deploying</Badge>
              </Flex>
              <Separator size="4" />
              <Flex justify="between" align="center">
                <Flex gap="2" align="center">
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={1.75} style={{ width: 16, height: 16 }} />
                  <Text size="2">Preview</Text>
                </Flex>
                <Badge color="red">Failed</Badge>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" size="2">
  <Flex direction="column" gap="3">
    <Flex justify="between" align="center">
      <Flex gap="2" align="center">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={1.75} />
        <Text size="2">Production</Text>
      </Flex>
      <Badge color="green">Live</Badge>
    </Flex>
    <Separator size="4" />
    <Flex justify="between" align="center">
      <Flex gap="2" align="center">
        <HugeiconsIcon icon={Clock01Icon} strokeWidth={1.75} />
        <Text size="2">Staging</Text>
      </Flex>
      <Badge color="amber">Deploying</Badge>
    </Flex>
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: User Profile */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>User Profile</SectionHeader.Title>
            <SectionHeader.Description>
              Use soft variant badges for role indicators and outline badges for skills. This creates visual hierarchy while keeping the profile clean.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="auto">
          <Card variant="classic" size="3" style={{ maxWidth: 360 }}>
            <Flex direction="column" gap="5" align="center" p="1" style={{ textAlign: 'center' }}>
              <Avatar size="6" fallback="AL" color="violet" variant="solid" />
              <Flex direction="column" gap="1">
                <Flex align="center" justify="center" gap="2">
                  <Heading size="4">Alex Lee</Heading>
                  <Badge size="1" color="violet">Pro</Badge>
                </Flex>
                <Text size="2" color="gray">Senior Engineer</Text>
              </Flex>
              <Flex gap="2" wrap="wrap" justify="center">
                <Badge color="blue" variant="outline">React</Badge>
                <Badge color="green" variant="outline">Node.js</Badge>
                <Badge color="amber" variant="outline">TypeScript</Badge>
                <Badge color="pink" variant="outline">GraphQL</Badge>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" size="3">
  <Flex direction="column" gap="5" align="center" p="1">
    <Avatar size="6" fallback="AL" color="violet" variant="solid" />
    <Flex direction="column" gap="1">
      <Flex align="center" justify="center" gap="2">
        <Heading size="4">Alex Lee</Heading>
        <Badge size="1" color="violet">Pro</Badge>
      </Flex>
      <Text size="2" color="gray">Senior Engineer</Text>
    </Flex>
    <Flex gap="2" wrap="wrap" justify="center">
      <Badge color="blue" variant="outline">React</Badge>
      <Badge color="green" variant="outline">Node.js</Badge>
      <Badge color="amber" variant="outline">TypeScript</Badge>
    </Flex>
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Feature Badges */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Feature Announcements</SectionHeader.Title>
            <SectionHeader.Description>
              Tooltips add context without cluttering the UI. Hover over badges to reveal additional information about each feature status.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="10rem">
          <Card variant="classic" size="2" style={{ minWidth: 320, maxWidth: 400 }}>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center">
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">AI Assistant</Text>
                  <Text size="2" color="gray">Intelligent code suggestions</Text>
                </Flex>
                <Badge
                  color="violet"
                  tooltip="Released within the last 7 days"
                  tooltipSide="left"
                >
                  New
                </Badge>
              </Flex>
              <Separator size="4" />
              <Flex justify="between" align="center">
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">Real-time Sync</Text>
                  <Text size="2" color="gray">Collaborate in real-time</Text>
                </Flex>
                <Badge
                  color="cyan"
                  tooltip="This feature is in testing and may change"
                  tooltipSide="left"
                >
                  Beta
                </Badge>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex justify="between" align="center">
  <Flex direction="column" gap="1">
    <Text size="2" weight="medium">AI Assistant</Text>
    <Text size="2" color="gray">Intelligent code suggestions</Text>
  </Flex>
  <Badge
    color="violet"
    tooltip="Released within the last 7 days"
    tooltipSide="left"
  >
    New
  </Badge>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 4: Notifications */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Notifications</SectionHeader.Title>
            <SectionHeader.Description>
              Size 1 badges work well for compact notification items. The solid variant creates stronger visual indicators for unread items.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="auto">
          <Card variant="classic" size="2" style={{ minWidth: 320, maxWidth: 400 }}>
            <Flex direction="column" gap="4">
              <Flex gap="3" align="start">
                <Avatar size="3" fallback="JD" color="blue" variant="soft" />
                <Flex direction="column" gap="0" style={{ flex: 1 }}>
                  <Flex justify="between" align="center">
                    <Flex gap="2" align="center">
                      <Text size="2" weight="medium">John Doe</Text>
                      <Text size="1" color="gray">2 min ago</Text>
                    </Flex>
                    <Badge size="1" color="blue" variant="solid">New</Badge>
                  </Flex>
                  <Text size="2">Commented on your pull request</Text>
                </Flex>
              </Flex>
              <Separator size="4" />
              <Flex gap="3" align="start">
                <Avatar size="3" fallback="SK" color="green" variant="soft" />
                <Flex direction="column" gap="0" style={{ flex: 1 }}>
                  <Flex justify="between" align="center">
                    <Flex gap="2" align="center">
                      <Text size="2" weight="medium">Sarah Kim</Text>
                      <Text size="1" color="gray">1 hour ago</Text>
                    </Flex>
                    <IconButton variant="ghost" size="1" color="gray" aria-label="More options">
                      <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={1.75} />
                    </IconButton>
                  </Flex>
                  <Text size="2">Approved your changes</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex gap="3" align="start">
  <Avatar size="3" fallback="JD" color="blue" variant="soft" />
  <Flex direction="column" gap="0" style={{ flex: 1 }}>
    <Flex justify="between" align="center">
      <Flex gap="2" align="center">
        <Text size="2" weight="medium">John Doe</Text>
        <Text size="1" color="gray">2 min ago</Text>
      </Flex>
      <Badge size="1" color="blue" variant="solid">New</Badge>
    </Flex>
    <Text size="2">Commented on your pull request</Text>
  </Flex>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
