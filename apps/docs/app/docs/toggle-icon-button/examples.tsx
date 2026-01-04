'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, ToggleIconButton, Separator, Card, Skeleton } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { FavouriteIcon, StarIcon, TextBoldIcon, TextItalicIcon, TextUnderlineIcon, PinIcon } from '@hugeicons/core-free-icons';

export function ToggleIconButtonExamples() {
  const [liked, setLiked] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);
  const [pinned, setPinned] = React.useState(false);
  const [bold, setBold] = React.useState(false);
  const [italic, setItalic] = React.useState(false);
  const [underline, setUnderline] = React.useState(false);

  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Like Button */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Like Button</SectionHeader.Title>
            <SectionHeader.Description>
              Ghost variant with crimson color for like/heart actions. Click to toggle the liked state.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <ToggleIconButton
            variant="ghost"
            size="2"
            color="crimson"
            pressed={liked}
            onPressedChange={setLiked}
            aria-label={liked ? 'Unlike' : 'Like'}
            tooltip={liked ? 'Unlike' : 'Like'}
          >
            <HugeiconsIcon icon={FavouriteIcon} strokeWidth={1.75} />
          </ToggleIconButton>
        </PreviewBlock>
        <CodeBlock
          code={`const [liked, setLiked] = React.useState(false);

<ToggleIconButton
  variant="ghost"
  size="2"
  color="crimson"
  pressed={liked}
  onPressedChange={setLiked}
  aria-label={liked ? 'Unlike' : 'Like'}
  tooltip={liked ? 'Unlike' : 'Like'}
>
  <HugeiconsIcon icon={FavouriteIcon} strokeWidth={1.75} />
</ToggleIconButton>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Card Actions */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Card Actions</SectionHeader.Title>
            <SectionHeader.Description>
              Toggle icon buttons for card-level actions like favorite and pin. Ghost variant keeps focus on the content.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="12rem">
          <Card variant="classic" size="2" style={{ maxWidth: 320 }}>
            <Flex direction="column" gap="3" p="1">
              <Flex direction="column" gap="1">
                <Skeleton width="140px" height="12px" />
                <Skeleton width="200px" height="10px" />
              </Flex>
              <Flex justify="end" gap="0">
                <ToggleIconButton
                  variant="ghost"
                  size="2"
                  color="amber"
                  pressed={favorited}
                  onPressedChange={setFavorited}
                  aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                  tooltip={favorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <HugeiconsIcon icon={StarIcon} strokeWidth={1.75} />
                </ToggleIconButton>
                <ToggleIconButton
                  variant="ghost"
                  size="2"
                  color="gray"
                  highContrast
                  pressed={pinned}
                  onPressedChange={setPinned}
                  aria-label={pinned ? 'Unpin' : 'Pin to top'}
                  tooltip={pinned ? 'Unpin' : 'Pin to top'}
                >
                  <HugeiconsIcon icon={PinIcon} strokeWidth={1.75} />
                </ToggleIconButton>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`const [favorited, setFavorited] = React.useState(false);
const [pinned, setPinned] = React.useState(false);

<Card variant="classic" size="2">
  <Flex direction="column" gap="3" p="1">
    <Flex direction="column" gap="1">
      <Skeleton width="140px" height="12px" />
      <Skeleton width="200px" height="10px" />
    </Flex>
    <Flex justify="end" gap="0">
      <ToggleIconButton
        variant="ghost"
        size="2"
        color="amber"
        pressed={favorited}
        onPressedChange={setFavorited}
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        tooltip={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HugeiconsIcon icon={StarIcon} strokeWidth={1.75} />
      </ToggleIconButton>
      <ToggleIconButton
        variant="ghost"
        size="2"
        color="gray"
        highContrast
        pressed={pinned}
        onPressedChange={setPinned}
        aria-label={pinned ? 'Unpin' : 'Pin to top'}
        tooltip={pinned ? 'Unpin' : 'Pin to top'}
      >
        <HugeiconsIcon icon={PinIcon} strokeWidth={1.75} />
      </ToggleIconButton>
    </Flex>
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Formatting Toolbar */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Formatting Toolbar</SectionHeader.Title>
            <SectionHeader.Description>
              Toggle icon buttons for text formatting controls. Multiple toggles can be active simultaneously.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="12rem">
          <Card variant="classic" size="2" style={{ width: '100%', maxWidth: 320 }}>
            <Flex direction="column" gap="3" p="1">
              <Flex gap="1" align="center">
                <ToggleIconButton
                  variant="ghost"
                  size="2"
                  pressed={bold}
                  onPressedChange={setBold}
                  aria-label={bold ? 'Remove bold' : 'Bold'}
                >
                  <HugeiconsIcon icon={TextBoldIcon} strokeWidth={1.75} />
                </ToggleIconButton>
                <ToggleIconButton
                  variant="ghost"
                  size="2"
                  pressed={italic}
                  onPressedChange={setItalic}
                  aria-label={italic ? 'Remove italic' : 'Italic'}
                >
                  <HugeiconsIcon icon={TextItalicIcon} strokeWidth={1.75} />
                </ToggleIconButton>
                <ToggleIconButton
                  variant="ghost"
                  size="2"
                  pressed={underline}
                  onPressedChange={setUnderline}
                  aria-label={underline ? 'Remove underline' : 'Underline'}
                >
                  <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={1.75} />
                </ToggleIconButton>
              </Flex>
              <Flex direction="column" gap="1">
                <Skeleton width="100%" height="12px" />
                <Skeleton width="80%" height="12px" />
                <Skeleton width="60%" height="12px" />
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`const [bold, setBold] = React.useState(false);
const [italic, setItalic] = React.useState(false);
const [underline, setUnderline] = React.useState(false);

<Card variant="classic" size="2">
  <Flex direction="column" gap="3" p="1">
    <Flex gap="1" align="center">
      <ToggleIconButton
        variant="ghost"
        size="2"
        pressed={bold}
        onPressedChange={setBold}
        aria-label={bold ? 'Remove bold' : 'Bold'}
      >
        <HugeiconsIcon icon={TextBoldIcon} strokeWidth={1.75} />
      </ToggleIconButton>
      <ToggleIconButton
        variant="ghost"
        size="2"
        pressed={italic}
        onPressedChange={setItalic}
        aria-label={italic ? 'Remove italic' : 'Italic'}
      >
        <HugeiconsIcon icon={TextItalicIcon} strokeWidth={1.75} />
      </ToggleIconButton>
      <ToggleIconButton
        variant="ghost"
        size="2"
        pressed={underline}
        onPressedChange={setUnderline}
        aria-label={underline ? 'Remove underline' : 'Underline'}
      >
        <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={1.75} />
      </ToggleIconButton>
    </Flex>
    <Flex direction="column" gap="1">
      <Skeleton width="100%" height="12px" />
      <Skeleton width="80%" height="12px" />
      <Skeleton width="60%" height="12px" />
    </Flex>
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
