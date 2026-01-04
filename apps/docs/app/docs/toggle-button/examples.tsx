'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, ToggleButton, Separator } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserAdd01Icon, UserCheck01Icon, Bookmark01Icon, BookmarkCheck01Icon, Notification01Icon, NotificationOff01Icon } from '@hugeicons/core-free-icons';

export function ToggleButtonExamples() {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [notificationsOn, setNotificationsOn] = React.useState(true);

  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Follow Button */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Follow Button</SectionHeader.Title>
            <SectionHeader.Description>
              Social media style follow button that changes variant and icon based on state. Click to toggle between Follow and Following.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <ToggleButton
            variant={isFollowing ? 'soft' : 'solid'}
            size="2"
            color="blue"
            pressed={isFollowing}
            onPressedChange={setIsFollowing}
          >
            <HugeiconsIcon icon={isFollowing ? UserCheck01Icon : UserAdd01Icon} strokeWidth={1.75} />
            {isFollowing ? 'Following' : 'Follow'}
          </ToggleButton>
        </PreviewBlock>
        <CodeBlock
          code={`const [isFollowing, setIsFollowing] = React.useState(false);

<ToggleButton
  variant={isFollowing ? 'soft' : 'solid'}
  size="2"
  color="blue"
  pressed={isFollowing}
  onPressedChange={setIsFollowing}
>
  <HugeiconsIcon
    icon={isFollowing ? UserCheck01Icon : UserAdd01Icon}
    strokeWidth={1.75}
  />
  {isFollowing ? 'Following' : 'Follow'}
</ToggleButton>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Bookmark Action */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Bookmark Action</SectionHeader.Title>
            <SectionHeader.Description>
              Soft variant with amber color for save/bookmark actions. The icon changes to indicate the saved state.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <ToggleButton
            variant="soft"
            size="2"
            color="amber"
            pressed={isBookmarked}
            onPressedChange={setIsBookmarked}
          >
            <HugeiconsIcon icon={isBookmarked ? BookmarkCheck01Icon : Bookmark01Icon} strokeWidth={1.75} />
            {isBookmarked ? 'Saved' : 'Save'}
          </ToggleButton>
        </PreviewBlock>
        <CodeBlock
          code={`const [isBookmarked, setIsBookmarked] = React.useState(false);

<ToggleButton
  variant="soft"
  size="2"
  color="amber"
  pressed={isBookmarked}
  onPressedChange={setIsBookmarked}
>
  <HugeiconsIcon
    icon={isBookmarked ? BookmarkCheck01Icon : Bookmark01Icon}
    strokeWidth={1.75}
  />
  {isBookmarked ? 'Saved' : 'Save'}
</ToggleButton>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Notification Toggle */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Notification Toggle</SectionHeader.Title>
            <SectionHeader.Description>
              Ghost variant for settings-style toggles. Shows the current state with clear on/off indication.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <ToggleButton
            variant="ghost"
            size="2"
            color="gray"
            highContrast
            pressed={notificationsOn}
            onPressedChange={setNotificationsOn}
          >
            <HugeiconsIcon icon={notificationsOn ? Notification01Icon : NotificationOff01Icon} strokeWidth={1.75} />
            {notificationsOn ? 'Notifications On' : 'Notifications Off'}
          </ToggleButton>
        </PreviewBlock>
        <CodeBlock
          code={`const [notificationsOn, setNotificationsOn] = React.useState(true);

<ToggleButton
  variant="ghost"
  size="2"
  color="gray"
  highContrast
  pressed={notificationsOn}
  onPressedChange={setNotificationsOn}
>
  <HugeiconsIcon
    icon={notificationsOn ? Notification01Icon : NotificationOff01Icon}
    strokeWidth={1.75}
  />
  {notificationsOn ? 'Notifications On' : 'Notifications Off'}
</ToggleButton>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
