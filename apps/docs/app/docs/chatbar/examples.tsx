'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, Chatbar, IconButton, Separator, Text, Card, Heading, Avatar, Skeleton } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Attachment01Icon, SmilePlusIcon, Mic01Icon, SparklesIcon } from '@hugeicons/core-free-icons';

export function ChatbarExamples() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [messageValue, setMessageValue] = React.useState('');

  const handleSubmit = () => {
    if (!messageValue.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setMessageValue('');
    }, 1500);
  };

  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Message Composition */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Message Composition</SectionHeader.Title>
            <SectionHeader.Description>
              The classic variant commands attention for primary messaging interfaces. Type a message and click send to see the submission flow with loading state.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="10rem">
          <Card variant="classic" size="2" style={{ width: '100%', maxWidth: 500 }}>
            <Flex direction="column" gap="3" p="1">
              <Flex gap="2" align="start">
                <Avatar size="2" fallback="AI" color="blue" />
                <Flex direction="column" gap="1" style={{ flex: 1 }}>
                  <Skeleton width="200px" height="12px" />
                  <Skeleton width="140px" height="12px" />
                </Flex>
              </Flex>
              <Chatbar.Root
                variant="soft"
                size="2"
                color="gray"
                value={messageValue}
                onValueChange={setMessageValue}
                onSubmit={handleSubmit}
              >
                <Chatbar.Textarea aria-label="Message" placeholder="Type a message..." submitOnEnter />
                <Chatbar.InlineEnd>
                  <Chatbar.Send loading={isSubmitting} highContrast />
                </Chatbar.InlineEnd>
              </Chatbar.Root>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" size="2">
  <Flex direction="column" gap="3" p="1">
    <Flex gap="2" align="start">
      <Avatar size="2" fallback="AI" color="blue" />
      <Flex direction="column" gap="1" style={{ flex: 1 }}>
        <Text size="2">Previous message content...</Text>
      </Flex>
    </Flex>
    <Chatbar.Root
      variant="soft"
      size="2"
      color="gray"
      value={messageValue}
      onValueChange={setMessageValue}
      onSubmit={handleSubmit}
    >
      <Chatbar.Textarea
        aria-label="Message"
        placeholder="Type a message..."
        submitOnEnter
      />
      <Chatbar.InlineEnd>
        <Chatbar.Send loading={isSubmitting} highContrast />
      </Chatbar.InlineEnd>
    </Chatbar.Root>
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: File Upload Flow */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>File Upload Flow</SectionHeader.Title>
            <SectionHeader.Description>
              Drag files onto the chatbar or click the attach button to add files. The expanded row reveals additional actions like emoji picker when the input is focused.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="12rem">
          <Chatbar.Root
            variant="classic"
            size="2"
            accept="image/*,.pdf,.doc,.docx"
            maxAttachments={5}
            maxFileSize={10 * 1024 * 1024}
            style={{ width: '100%', maxWidth: 500 }}
            onSubmit={({ value, attachments }) => console.log('Sent:', value, attachments)}
          >
            <Chatbar.AttachmentsRow />
            <Chatbar.Textarea aria-label="Message" placeholder="Type a message or drop files..." submitOnEnter />
            <Chatbar.InlineEnd>
              <Chatbar.Send />
            </Chatbar.InlineEnd>
            <Chatbar.Row>
              <Chatbar.RowStart>
                <Chatbar.AttachTrigger asChild>
                  <IconButton variant="ghost" size="2" color="gray" highContrast aria-label="Attach file" tooltip="Attach file">
                    <HugeiconsIcon icon={Attachment01Icon} strokeWidth={1.75} />
                  </IconButton>
                </Chatbar.AttachTrigger>
                <IconButton variant="ghost" size="2" color="gray" highContrast aria-label="Add emoji" tooltip="Add emoji">
                  <HugeiconsIcon icon={SmilePlusIcon} strokeWidth={1.75} />
                </IconButton>
                <IconButton variant="ghost" size="2" color="gray" highContrast aria-label="Voice message" tooltip="Voice message">
                  <HugeiconsIcon icon={Mic01Icon} strokeWidth={1.75} />
                </IconButton>
              </Chatbar.RowStart>
              <Chatbar.RowEnd>
                <Text size="1" color="gray">Shift+Enter for new line</Text>
                <Chatbar.Send />
              </Chatbar.RowEnd>
            </Chatbar.Row>
          </Chatbar.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Chatbar.Root
  variant="classic"
  size="2"
  accept="image/*,.pdf,.doc,.docx"
  maxAttachments={5}
  maxFileSize={10 * 1024 * 1024}
  onSubmit={({ value, attachments }) => sendMessage({ text: value, files: attachments })}
>
  <Chatbar.AttachmentsRow />
  <Chatbar.Textarea
    aria-label="Message"
    placeholder="Type a message or drop files..."
    submitOnEnter
  />
  <Chatbar.InlineEnd>
    <Chatbar.Send />
  </Chatbar.InlineEnd>
  <Chatbar.Row>
    <Chatbar.RowStart>
      <Chatbar.AttachTrigger asChild>
        <IconButton
          variant="ghost"
          size="2"
          color="gray"
          highContrast
          aria-label="Attach file"
          tooltip="Attach file"
        >
          <HugeiconsIcon icon={Attachment01Icon} strokeWidth={1.75} />
        </IconButton>
      </Chatbar.AttachTrigger>
      <IconButton
        variant="ghost"
        size="2"
        color="gray"
        highContrast
        aria-label="Add emoji"
        tooltip="Add emoji"
      >
        <HugeiconsIcon icon={SmilePlusIcon} strokeWidth={1.75} />
      </IconButton>
    </Chatbar.RowStart>
    <Chatbar.RowEnd>
      <Text size="1" color="gray">Shift+Enter for new line</Text>
      <Chatbar.Send />
    </Chatbar.RowEnd>
  </Chatbar.Row>
</Chatbar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: AI Assistant Interface */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>AI Assistant Interface</SectionHeader.Title>
            <SectionHeader.Description>
              Size 3 with accent color creates a prominent input for AI chat experiences. The surface variant provides subtle definition without competing with the conversation above.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="14rem">
          <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: 600 }}>
            <Flex direction="column" align="center" gap="2" py="4">
              <Flex align="center" gap="2">
                <HugeiconsIcon icon={SparklesIcon} strokeWidth={1.75} style={{ color: 'var(--blue-9)' }} />
                <Heading size="4" weight="medium">How can I help you today?</Heading>
              </Flex>
              <Text size="2" color="gray">Ask me anything about your projects, code, or ideas.</Text>
            </Flex>
            <Chatbar.Root
              variant="surface"
              size="3"
              color="blue"
              onSubmit={({ value }) => console.log('Ask:', value)}
            >
              <Chatbar.Textarea aria-label="Ask anything" placeholder="Ask me anything..." submitOnEnter />
              <Chatbar.InlineEnd>
                <Chatbar.Send highContrast />
              </Chatbar.InlineEnd>
            </Chatbar.Root>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex direction="column" gap="4">
  <Flex direction="column" align="center" gap="2" py="4">
    <Flex align="center" gap="2">
      <HugeiconsIcon icon={SparklesIcon} strokeWidth={1.75} />
      <Heading size="4" weight="medium">How can I help you today?</Heading>
    </Flex>
    <Text size="2" color="gray">
      Ask me anything about your projects, code, or ideas.
    </Text>
  </Flex>
  <Chatbar.Root
    variant="surface"
    size="3"
    color="blue"
    onSubmit={({ value }) => streamResponse(value)}
  >
    <Chatbar.Textarea
      aria-label="Ask anything"
      placeholder="Ask me anything..."
      submitOnEnter
    />
    <Chatbar.InlineEnd>
      <Chatbar.Send highContrast />
    </Chatbar.InlineEnd>
  </Chatbar.Root>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 4: Comment Reply */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Comment Reply</SectionHeader.Title>
            <SectionHeader.Description>
              Size 1 with soft variant fits compact reply interfaces. The expandOn="focus" behavior keeps the UI minimal until the user starts typing.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="12rem">
          <Card variant="classic" size="1" style={{ width: '100%', maxWidth: 400 }}>
            <Flex direction="column" gap="3" p="2">
              <Flex gap="2" align="start">
                <Avatar size="1" fallback="JD" />
                <Flex direction="column" gap="1" style={{ flex: 1 }}>
                  <Flex gap="2" align="center">
                    <Text size="1" weight="medium">Jane Doe</Text>
                    <Text size="1" color="gray">2 hours ago</Text>
                  </Flex>
                  <Text size="2">This looks great! Can we add more details about the implementation?</Text>
                </Flex>
              </Flex>
              <Chatbar.Root
                variant="soft"
                size="1"
                color="gray"
                expandOn="focus"
                onSubmit={({ value }) => console.log('Reply:', value)}
              >
                <Chatbar.Textarea aria-label="Reply" placeholder="Write a reply..." submitOnEnter />
                <Chatbar.InlineEnd>
                  <Chatbar.Send />
                </Chatbar.InlineEnd>
              </Chatbar.Root>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" size="1">
  <Flex direction="column" gap="3" p="2">
    <Flex gap="2" align="start">
      <Avatar size="1" fallback="JD" />
      <Flex direction="column" gap="1" style={{ flex: 1 }}>
        <Flex gap="2" align="center">
          <Text size="1" weight="medium">Jane Doe</Text>
          <Text size="1" color="gray">2 hours ago</Text>
        </Flex>
        <Text size="2">
          This looks great! Can we add more details about the implementation?
        </Text>
      </Flex>
    </Flex>
    <Chatbar.Root
      variant="soft"
      size="1"
      color="gray"
      expandOn="focus"
      onSubmit={({ value }) => postReply(value)}
    >
      <Chatbar.Textarea
        aria-label="Reply"
        placeholder="Write a reply..."
        submitOnEnter
      />
      <Chatbar.InlineEnd>
        <Chatbar.Send />
      </Chatbar.InlineEnd>
    </Chatbar.Root>
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 5: Translucent Hero Chat */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Translucent Hero</SectionHeader.Title>
            <SectionHeader.Description>
              The translucent material creates depth over dynamic backgrounds. Use classic variant with highContrast for maximum readability on complex surfaces.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock
          height="16rem"
          showThemeToggle={false}
          appearance="dark"
          variant="ghost"
          background={{
            backgroundColor: 'hsl(220, 20%, 10%)',
            backgroundImage:
              'radial-gradient(circle at 30% 20%, hsl(280, 60%, 25%) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(200, 60%, 20%) 0%, transparent 50%)',
            borderRadius: 'var(--radius-3)',
          }}
        >
          <Flex direction="column" gap="4" align="center" style={{ width: '100%', maxWidth: 500 }}>
            <Heading size="5" weight="medium" align="center" style={{ color: 'white' }}>
              What would you like to create?
            </Heading>
            <Chatbar.Root
              variant="classic"
              size="2"
              material="translucent"
              style={{ width: '100%' }}
              onSubmit={({ value }) => console.log('Create:', value)}
            >
              <Chatbar.Textarea aria-label="Describe what you want to create" placeholder="Describe what you want to create..." submitOnEnter />
              <Chatbar.InlineEnd>
                <Chatbar.Send highContrast />
              </Chatbar.InlineEnd>
            </Chatbar.Root>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Theme appearance="dark" material="translucent">
  <Flex direction="column" gap="4" align="center">
    <Heading size="5" weight="medium" align="center">
      What would you like to create?
    </Heading>
    <Chatbar.Root
      variant="classic"
      size="2"
      onSubmit={({ value }) => generateContent(value)}
    >
      <Chatbar.Textarea
        aria-label="Describe what you want to create"
        placeholder="Describe what you want to create..."
        submitOnEnter
      />
      <Chatbar.InlineEnd>
        <Chatbar.Send highContrast />
      </Chatbar.InlineEnd>
    </Chatbar.Root>
  </Flex>
</Theme>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
