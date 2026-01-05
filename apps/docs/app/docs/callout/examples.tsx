'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, Callout, Text, Card, Separator, Code, Link, Button } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { InformationCircleIcon, CheckmarkCircle02Icon, Alert02Icon, Cancel01Icon, Idea01Icon, Rocket01Icon, SecurityCheckIcon, Clock01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

export function CalloutExamples() {
  return (
    <Flex direction="column" gap="9">
      {/* Example 1: API Documentation Note */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>API Documentation Note</SectionHeader.Title>
            <SectionHeader.Description>
              Blue callouts provide helpful context in documentation. Use them to highlight important details, prerequisites, or tips that help developers succeed.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="30rem">
          <Card variant="classic" size="3" style={{ maxWidth: 520 }}>
            <Flex direction="column" gap="4">
              <Text size="3" weight="medium">
                Authentication
              </Text>
              <Text size="2" color="gray">
                All API requests require authentication using a bearer token in the Authorization header.
              </Text>
              <Callout.Root color="blue">
                <Callout.Icon>
                  <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={1.75} />
                </Callout.Icon>
                <Callout.Text>
                  You can generate API keys from your <Link href="#">dashboard settings</Link>. Keep your keys secure and never commit them to version control.
                </Callout.Text>
              </Callout.Root>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Callout.Root color="blue">
  <Callout.Icon>
    <HugeiconsIcon icon={InformationCircleIcon} />
  </Callout.Icon>
  <Callout.Text>
    You can generate API keys from your{' '}
    <Link href="#">dashboard settings</Link>.
  </Callout.Text>
</Callout.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Form Validation Feedback */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Form Validation Feedback</SectionHeader.Title>
            <SectionHeader.Description>
              Use green for success and red for errors in form contexts. These semantic colors provide instant visual feedback without requiring users to read the text.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="30rem">
          <Flex direction="column" gap="4" style={{ maxWidth: 440 }}>
            <Callout.Root color="green">
              <Callout.Icon>
                <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={1.75} />
              </Callout.Icon>
              <Callout.Text>Your changes have been saved successfully. The new settings will take effect immediately.</Callout.Text>
            </Callout.Root>
            <Callout.Root color="red">
              <Callout.Icon>
                <HugeiconsIcon icon={Cancel01Icon} strokeWidth={1.75} />
              </Callout.Icon>
              <Callout.Text>Unable to save changes. Please check your network connection and try again.</Callout.Text>
            </Callout.Root>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`// Success feedback
<Callout.Root color="green">
  <Callout.Icon>
    <HugeiconsIcon icon={CheckmarkCircle02Icon} />
  </Callout.Icon>
  <Callout.Text>
    Your changes have been saved successfully.
  </Callout.Text>
</Callout.Root>

// Error feedback
<Callout.Root color="red">
  <Callout.Icon>
    <HugeiconsIcon icon={Cancel01Icon} />
  </Callout.Icon>
  <Callout.Text>
    Unable to save changes. Please try again.
  </Callout.Text>
</Callout.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Feature Announcement */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Feature Announcement</SectionHeader.Title>
            <SectionHeader.Description>
              Violet and cyan callouts work well for announcements and tips. Pair with icons that reinforce the message type—rockets for new features, lightbulbs for tips.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="30rem">
          <Flex direction="column" gap="4" style={{ maxWidth: 480 }}>
            <Callout.Root color="violet">
              <Callout.Icon>
                <HugeiconsIcon icon={Rocket01Icon} strokeWidth={1.75} />
              </Callout.Icon>
              <Callout.Text>
                <Text weight="medium">New Feature:</Text> AI-powered code suggestions are now available. Enable them in your editor preferences to get contextual completions.
              </Callout.Text>
            </Callout.Root>
            <Callout.Root color="cyan">
              <Callout.Icon>
                <HugeiconsIcon icon={Idea01Icon} strokeWidth={1.75} />
              </Callout.Icon>
              <Callout.Text>
                <Text weight="medium">Pro Tip:</Text> Use <Code>Cmd+K</Code> to open the command palette and quickly navigate between files.
              </Callout.Text>
            </Callout.Root>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Callout.Root color="violet">
  <Callout.Icon>
    <HugeiconsIcon icon={Rocket01Icon} />
  </Callout.Icon>
  <Callout.Text>
    <Text weight="medium">New Feature:</Text> AI-powered code
    suggestions are now available.
  </Callout.Text>
</Callout.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 4: Security Warning */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Security Warning</SectionHeader.Title>
            <SectionHeader.Description>Amber callouts signal caution without the severity of red. Use highContrast for critical warnings that require immediate attention.</SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="30rem">
          <Card variant="classic" size="3" style={{ maxWidth: 480 }}>
            <Flex direction="column" gap="4">
              <Text size="3" weight="medium">
                Account Security
              </Text>
              <Callout.Root color="amber" highContrast>
                <Callout.Icon>
                  <HugeiconsIcon icon={SecurityCheckIcon} strokeWidth={1.75} />
                </Callout.Icon>
                <Callout.Text>
                  <Text weight="medium">Security Notice:</Text> Two-factor authentication is not enabled for your account. We strongly recommend enabling 2FA to protect your data.
                </Callout.Text>
              </Callout.Root>
              <Button variant="solid" size="2" style={{ alignSelf: 'flex-start' }}>
                Enable 2FA
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} />
              </Button>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Callout.Root color="amber" highContrast>
  <Callout.Icon>
    <HugeiconsIcon icon={SecurityCheckIcon} />
  </Callout.Icon>
  <Callout.Text>
    <Text weight="medium">Security Notice:</Text> Two-factor
    authentication is not enabled for your account.
  </Callout.Text>
</Callout.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 5: Deprecation Notice */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Deprecation Notice</SectionHeader.Title>
            <SectionHeader.Description>
              Amber with size 2 provides adequate prominence for deprecation warnings. Include migration paths and deadlines to help developers plan their updates.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="30rem">
          <Card variant="classic" size="3" style={{ maxWidth: 520 }}>
            <Flex direction="column" gap="4" align="start">
              <Code size="3" highContrast>
                useOldHook()
              </Code>
              <Text size="2" color="gray">
                See the <Link href="#">migration guide</Link> for step-by-step instructions.
              </Text>
              <Callout.Root color="orange" size="2" highContrast>
                <Callout.Icon>
                  <HugeiconsIcon icon={Alert02Icon} strokeWidth={1.75} />
                </Callout.Icon>
                <Callout.Text>
                  <Text weight="medium">Deprecated:</Text> This hook will be removed in v3.0. Migrate to <Code>useNewHook()</Code> before January 2026.
                </Callout.Text>
              </Callout.Root>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Callout.Root color="orange" size="2" highContrast>
  <Callout.Icon>
    <HugeiconsIcon icon={Alert02Icon} />
  </Callout.Icon>
  <Callout.Text>
    <Text weight="medium">Deprecated:</Text> This hook will be
    removed in v3.0. Migrate to <Code>useNewHook()</Code>.
  </Callout.Text>
</Callout.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 6: Maintenance Banner */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Maintenance Banner</SectionHeader.Title>
            <SectionHeader.Description>Size 1 callouts work as subtle inline banners. The gray color keeps informational messages unobtrusive while still visible.</SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="30rem">
          <Flex direction="column" gap="4" style={{ maxWidth: 500 }}>
            <Callout.Root color="gray" size="1">
              <Callout.Icon>
                <HugeiconsIcon icon={Clock01Icon} strokeWidth={1.75} />
              </Callout.Icon>
              <Callout.Text>Scheduled maintenance on Sunday, Jan 5th from 2:00 AM - 4:00 AM UTC.</Callout.Text>
            </Callout.Root>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Callout.Root color="gray" size="1">
  <Callout.Icon>
    <HugeiconsIcon icon={Clock01Icon} />
  </Callout.Icon>
  <Callout.Text>
    Scheduled maintenance on Sunday, Jan 5th.
  </Callout.Text>
</Callout.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 7: Inline Hint */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Inline Hint</SectionHeader.Title>
            <SectionHeader.Description>
              Callouts without icons work well for simple text hints. Use the outline variant for subtle guidance that doesn't need strong visual emphasis.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="30rem">
          <Card variant="classic" size="3" style={{ maxWidth: 400 }}>
            <Flex direction="column" gap="3">
              <Text size="2" weight="medium">
                Export Format
              </Text>
              <Callout.Root color="gray" variant="outline" size="2" highContrast>
                <Callout.Text>CSV exports are limited to 10,000 rows. For larger datasets, use the API.</Callout.Text>
              </Callout.Root>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Callout.Root color="gray" variant="outline" size="2" highContrast>
  <Callout.Text>
    CSV exports are limited to 10,000 rows.
  </Callout.Text>
</Callout.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 8: Translucent Callout */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Translucent Callout</SectionHeader.Title>
            <SectionHeader.Description>The translucent material creates depth over dynamic backgrounds. Use highContrast for maximum readability on complex surfaces.</SectionHeader.Description>
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
              'url(https://images.unsplash.com/photo-1765572446249-a583906255f0?q=80&w=1341&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Callout.Root color="blue" material="translucent" highContrast style={{ maxWidth: 440 }}>
            <Callout.Icon>
              <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={1.75} />
            </Callout.Icon>
            <Callout.Text>Translucent callouts blend seamlessly with dynamic backgrounds while maintaining readability.</Callout.Text>
          </Callout.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Theme appearance="dark">
  <Callout.Root color="blue" material="translucent" highContrast>
    <Callout.Icon>
      <HugeiconsIcon icon={InformationCircleIcon} />
    </Callout.Icon>
    <Callout.Text>
      Translucent callouts blend seamlessly with dynamic
      backgrounds while maintaining readability.
    </Callout.Text>
  </Callout.Root>
</Theme>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
