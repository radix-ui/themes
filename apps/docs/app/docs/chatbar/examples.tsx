'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader, Hero } from '@kushagradhawan/kookie-blocks';
import { Flex, Chatbar, IconButton, Separator, Text, Card, Avatar, Skeleton } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Attachment01Icon, SmileIcon, Mic01Icon, SparklesIcon, AiBrain01Icon } from '@hugeicons/core-free-icons';

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
        <PreviewBlock background="none" height="30rem">
          <Card variant="classic" size="2" style={{ width: '100%', maxWidth: 500 }}>
            <Flex direction="column" gap="3" p="1">
              <Flex gap="2" align="start">
                <Avatar size="2" fallback="AI" color="blue" />
                <Flex direction="column" gap="1" style={{ flex: 1 }}>
                  <Skeleton width="200px" height="12px" />
                  <Skeleton width="140px" height="12px" />
                </Flex>
              </Flex>
              <Chatbar.Root maxLines={16} minLines={3} variant="soft" size="2" color="gray" sendMode="always" value={messageValue} onValueChange={setMessageValue} onSubmit={handleSubmit}>
                <Chatbar.Textarea aria-label="Message" placeholder="Type a message..." submitOnEnter />
                <Chatbar.InlineEnd>
                  <Chatbar.Send size="2" loading={isSubmitting} highContrast />
                </Chatbar.InlineEnd>
                <Chatbar.Row>
                  <Chatbar.RowStart />
                  <Chatbar.RowEnd>
                    <Chatbar.Send size="2" loading={isSubmitting} highContrast />
                  </Chatbar.RowEnd>
                </Chatbar.Row>
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
      sendMode="always"
      minLines={3}
      maxLines={16}
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
      <Chatbar.Row>
        <Chatbar.RowStart />
        <Chatbar.RowEnd>
          <Chatbar.Send loading={isSubmitting} highContrast />
        </Chatbar.RowEnd>
      </Chatbar.Row>
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
        <PreviewBlock background="none" height="30rem">
          <Chatbar.Root
            variant="classic"
            size="2"
            sendMode="always"
            minLines={3}
            maxLines={16}
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
                  <HugeiconsIcon icon={SmileIcon} strokeWidth={1.75} />
                </IconButton>
                <IconButton variant="ghost" size="2" color="gray" highContrast aria-label="Voice message" tooltip="Voice message">
                  <HugeiconsIcon icon={Mic01Icon} strokeWidth={1.75} />
                </IconButton>
              </Chatbar.RowStart>
              <Chatbar.RowEnd>
                <Text size="1" color="gray">
                  Shift+Enter for new line
                </Text>
                <Chatbar.Send />
              </Chatbar.RowEnd>
            </Chatbar.Row>
          </Chatbar.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Chatbar.Root
  variant="classic"
  size="2"
  sendMode="always"
  minLines={3}
  maxLines={16}
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
        <HugeiconsIcon icon={SmileIcon} strokeWidth={1.75} />
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
        <PreviewBlock background="none" height="30rem">
          <Hero.Root style={{ width: '100%', maxWidth: 600 }}>
            <Hero.Meta>
              <HugeiconsIcon icon={SparklesIcon} strokeWidth={1.75} />
            </Hero.Meta>
            <Flex direction="column" gap="2">
              <Hero.Title size="8">What are you working on today?</Hero.Title>
              <Hero.Description color="gray">Ask me anything about your projects, code, or ideas.</Hero.Description>
            </Flex>
            <Chatbar.Root open variant="soft" size="2" sendMode="always" minLines={3} maxLines={16} style={{ width: '100%' }} onSubmit={({ value }) => console.log('Ask:', value)}>
              <Chatbar.Textarea aria-label="Ask anything" placeholder="Ask me anything..." submitOnEnter />
              <Chatbar.Row>
                <Chatbar.RowStart>
                  <Chatbar.AttachTrigger asChild>
                    <IconButton variant="ghost" size="2" highContrast aria-label="Attach file" tooltip="Attach file">
                      <HugeiconsIcon icon={Attachment01Icon} strokeWidth={1.75} />
                    </IconButton>
                  </Chatbar.AttachTrigger>
                  <IconButton variant="ghost" size="2" highContrast aria-label="Select model" tooltip="Select model">
                    <HugeiconsIcon icon={AiBrain01Icon} strokeWidth={1.75} />
                  </IconButton>
                </Chatbar.RowStart>
                <Chatbar.RowEnd>
                  <Chatbar.Send highContrast />
                </Chatbar.RowEnd>
              </Chatbar.Row>
            </Chatbar.Root>
          </Hero.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Hero.Root>
  <Hero.Meta>
    <HugeiconsIcon icon={SparklesIcon} strokeWidth={1.75} />
  </Hero.Meta>
  <Flex direction="column" gap="4">
    <Hero.Title>How can I help you today?</Hero.Title>
    <Hero.Description color="gray">
      Ask me anything about your projects, code, or ideas.
    </Hero.Description>
  </Flex>
  <Chatbar.Root
    open
    variant="soft"
    size="2"
    color="blue"
    sendMode="always"
    minLines={3}
    maxLines={16}
    style={{ width: '100%' }}
    onSubmit={handleSubmit}
  >
    <Chatbar.Textarea
      aria-label="Ask anything"
      placeholder="Ask me anything..."
      submitOnEnter
    />
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
          aria-label="Select model"
          tooltip="Select model"
        >
          <HugeiconsIcon icon={AiBrain01Icon} strokeWidth={1.75} />
        </IconButton>
      </Chatbar.RowStart>
      <Chatbar.RowEnd>
        <Chatbar.Send highContrast />
      </Chatbar.RowEnd>
    </Chatbar.Row>
  </Chatbar.Root>
</Hero.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 4: Translucent Hero Chat */}
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
          showThemeToggle={false}
          appearance="dark"
          variant="ghost"
          height="30rem"
          p="0"
          background={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1765684145185-387b6c69bef1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Chatbar.Root
            open
            variant="classic"
            size="2"
            color="gray"
            material="translucent"
            sendMode="always"
            minLines={3}
            maxLines={16}
            style={{ width: '100%', maxWidth: 600 }}
            onSubmit={({ value }) => console.log('Ask:', value)}
          >
            <Chatbar.Textarea aria-label="Ask anything" placeholder="Ask me anything..." submitOnEnter />
            <Chatbar.Row>
              <Chatbar.RowStart>
                <Chatbar.AttachTrigger asChild>
                  <IconButton variant="ghost" size="2" highContrast aria-label="Attach file" tooltip="Attach file">
                    <HugeiconsIcon icon={Attachment01Icon} strokeWidth={1.75} />
                  </IconButton>
                </Chatbar.AttachTrigger>
                <IconButton variant="ghost" size="2" highContrast aria-label="Select model" tooltip="Select model">
                  <HugeiconsIcon icon={AiBrain01Icon} strokeWidth={1.75} />
                </IconButton>
              </Chatbar.RowStart>
              <Chatbar.RowEnd>
                <Chatbar.Send highContrast />
              </Chatbar.RowEnd>
            </Chatbar.Row>
          </Chatbar.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Theme appearance="dark">
  <Chatbar.Root
    open
    variant="classic"
    size="2"
    material="translucent"
    sendMode="always"
    minLines={3}
    maxLines={16}
    onSubmit={handleSubmit}
  >
    <Chatbar.Textarea
      aria-label="Ask anything"
      placeholder="Ask me anything..."
      submitOnEnter
    />
    <Chatbar.Row>
      <Chatbar.RowStart>
        <Chatbar.AttachTrigger asChild>
          <IconButton
            variant="ghost"
            size="2"
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
          highContrast
          aria-label="Select model"
          tooltip="Select model"
        >
          <HugeiconsIcon icon={AiBrain01Icon} strokeWidth={1.75} />
        </IconButton>
      </Chatbar.RowStart>
      <Chatbar.RowEnd>
        <Chatbar.Send highContrast />
      </Chatbar.RowEnd>
    </Chatbar.Row>
  </Chatbar.Root>
</Theme>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
