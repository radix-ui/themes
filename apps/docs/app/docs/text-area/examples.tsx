'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, TextArea, Text, Separator, Card, Heading, Button } from '@kushagradhawan/kookie-ui';

export function TextAreaExamples() {
  // Comment form state
  const [comment, setComment] = React.useState('');
  const [commentError, setCommentError] = React.useState('');

  // Feedback form state
  const [feedback, setFeedback] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Character counter state
  const [tweet, setTweet] = React.useState('');
  const maxLength = 280;

  // Note taking state
  const [note, setNote] = React.useState('');

  const handleCommentSubmit = () => {
    if (comment.length < 10) {
      setCommentError('Comment must be at least 10 characters');
    } else {
      setCommentError('');
      // Submit comment
      console.log('Comment submitted:', comment);
    }
  };

  const handleFeedbackSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFeedback('');
    alert('Feedback submitted successfully!');
  };

  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Comment Form */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Comment Form</SectionHeader.Title>
            <SectionHeader.Description>
              The surface variant works well for comment sections. Use error validation to ensure users provide meaningful input. Try submitting with less than 10 characters to see the error state.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="24rem">
          <Flex direction="column" gap="3" style={{ width: 480 }}>
            <TextArea size="2" variant="surface" placeholder="Share your thoughts..." value={comment} onChange={(e) => setComment(e.target.value)} error={!!commentError} errorMessage={commentError} rows={4} />
            <Flex gap="2" justify="end">
              <Button variant="soft" size="2" onClick={() => setComment('')}>
                Cancel
              </Button>
              <Button variant="classic" size="2" onClick={handleCommentSubmit}>
                Post Comment
              </Button>
            </Flex>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`const [comment, setComment] = React.useState('');
const [error, setError] = React.useState('');

const handleSubmit = () => {
  if (comment.length < 10) {
    setError('Comment must be at least 10 characters');
  } else {
    setError('');
    // Submit comment
  }
};

<TextArea
  size="2"
  variant="surface"
  placeholder="Share your thoughts..."
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  error={!!error}
  errorMessage={error}
  rows={4}
/>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Feedback Form */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Feedback Form</SectionHeader.Title>
            <SectionHeader.Description>
              The outline variant provides clear boundaries for structured forms. This example demonstrates a complete feedback collection flow with submission state.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="dots" height="32rem">
          <Card variant="classic" size="2" style={{ maxWidth: 560 }}>
            <Flex direction="column" gap="6">
              <Flex direction="column" gap="2">
                <Heading size="5" weight="medium">
                  Send us your feedback
                </Heading>
                <Text size="2" color="gray">
                  We'd love to hear your thoughts about our product.
                </Text>
              </Flex>

              <TextArea size="2" variant="outline" placeholder="Tell us about your experience..." value={feedback} onChange={(e) => setFeedback(e.target.value)} disabled={isSubmitting} rows={6} />

              <Flex gap="2" justify="end">
                <Button variant="soft" size="2" color="gray" disabled={isSubmitting} onClick={() => setFeedback('')}>
                  Clear
                </Button>
                <Button variant="classic" size="2" highContrast loading={isSubmitting} onClick={handleFeedbackSubmit} disabled={!feedback.trim()}>
                  Submit Feedback
                </Button>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`const [feedback, setFeedback] = React.useState('');
const [isSubmitting, setIsSubmitting] = React.useState(false);

const handleSubmit = async () => {
  setIsSubmitting(true);
  await submitFeedback(feedback);
  setIsSubmitting(false);
};

<TextArea
  size="2"
  variant="outline"
  placeholder="Tell us about your experience..."
  value={feedback}
  onChange={(e) => setFeedback(e.target.value)}
  disabled={isSubmitting}
  rows={6}
/>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Character Counter */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Character Counter</SectionHeader.Title>
            <SectionHeader.Description>
              Combine TextArea with character counting for social media posts, tweets, or any content with length limits. The soft variant provides subtle visual feedback.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="20rem">
          <Flex direction="column" gap="2" style={{ width: 480 }}>
            <TextArea size="2" variant="soft" placeholder="What's happening?" value={tweet} onChange={(e) => setTweet(e.target.value)} maxLength={maxLength} rows={3} />
            <Flex justify="between" align="center">
              <Text size="1" color="gray">
                {tweet.length} / {maxLength}
              </Text>
              <Button variant="classic" size="1" disabled={tweet.length === 0 || tweet.length > maxLength}>
                Post
              </Button>
            </Flex>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`const [tweet, setTweet] = React.useState('');
const maxLength = 280;

<TextArea
  size="2"
  variant="soft"
  placeholder="What's happening?"
  value={tweet}
  onChange={(e) => setTweet(e.target.value)}
  maxLength={maxLength}
  rows={3}
/>
<Text size="1" color="gray">
  {tweet.length} / {maxLength}
</Text>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 4: Note Taking */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Note Taking</SectionHeader.Title>
            <SectionHeader.Description>
              The ghost variant creates a seamless inline editing experience. Perfect for note-taking apps, documentation editors, and content management systems where the textarea should blend with surrounding text.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="24rem">
          <Flex direction="column" gap="3" style={{ width: 600 }}>
            <Flex direction="column" gap="2">
              <Heading size="4" weight="medium">
                Daily Notes
              </Heading>
              <Text size="2" color="gray">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </Flex>
            <TextArea size="2" variant="ghost" resize="vertical" placeholder="Start typing your notes..." value={note} onChange={(e) => setNote(e.target.value)} style={{ minHeight: 200 }} />
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`const [note, setNote] = React.useState('');

<TextArea
  size="2"
  variant="ghost"
  resize="vertical"
  placeholder="Start typing your notes..."
  value={note}
  onChange={(e) => setNote(e.target.value)}
  style={{ minHeight: 200 }}
/>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 5: Product Description */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Product Description Editor</SectionHeader.Title>
            <SectionHeader.Description>
              Use the classic variant for prominent content editing areas. This example shows a product description editor with a clear, elevated appearance that draws focus to the content creation task.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="dots" height="36rem">
          <Card variant="classic" size="2" style={{ maxWidth: 640 }}>
            <Flex direction="column" gap="6">
              <Flex direction="column" gap="2">
                <Heading size="5" weight="medium">
                  Product Information
                </Heading>
                <Text size="2" color="gray">
                  Provide a detailed description of your product.
                </Text>
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">
                  Description
                </Text>
                <TextArea size="3" variant="classic" placeholder="Describe your product features, benefits, and specifications..." resize="none" rows={8} />
              </Flex>

              <Flex gap="2" justify="end">
                <Button variant="soft" size="2" color="gray">
                  Cancel
                </Button>
                <Button variant="classic" size="2" highContrast>
                  Save Product
                </Button>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<TextArea
  size="3"
  variant="classic"
  placeholder="Describe your product features, benefits, and specifications..."
  resize="none"
  rows={8}
/>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
