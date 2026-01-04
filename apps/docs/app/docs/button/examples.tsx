'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, Button, Text, Separator, Card, Heading } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, Download01Icon, Add01Icon, Delete01Icon, Copy01Icon, Share01Icon, Tick01Icon, FilterIcon, SortingAZ01Icon, Settings01Icon, PlayIcon } from '@hugeicons/core-free-icons';

export function ButtonExamples() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedCount, setSelectedCount] = React.useState(0);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const toggleSelection = () => {
    setSelectedCount((prev) => (prev === 0 ? 3 : 0));
  };

  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Form Submission */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Form Submission</SectionHeader.Title>
            <SectionHeader.Description>
              The classic variant commands attention for primary actions. Click to see the loading state - the button shows a spinner and disables interaction automatically.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <Flex gap="2" align="center">
            <Button variant="soft" size="2" color="gray" highContrast disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="classic" size="2" highContrast loading={isSubmitting} onClick={handleSubmit}>
              <HugeiconsIcon icon={Tick01Icon} strokeWidth={1.75} />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex gap="2" align="center">
  <Button
    variant="soft"
    size="2"
    color="gray"
    highContrast
    disabled={isSubmitting}
  >
    Cancel
  </Button>
  <Button
    variant="classic"
    size="2"
    highContrast
    loading={isSubmitting}
    onClick={handleSubmit}
  >
    <HugeiconsIcon icon={Tick01Icon} strokeWidth={1.75} />
    {isSubmitting ? 'Saving...' : 'Save Changes'}
  </Button>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Destructive Confirmation */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Destructive Confirmation</SectionHeader.Title>
            <SectionHeader.Description>
              Red signals danger for irreversible actions. The outline variant on the safe option stays visible but secondary, letting users escape easily.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <Flex gap="2" align="center">
            <Button variant="outline" size="2" color="gray">
              Cancel
            </Button>
            <Button variant="solid" size="2" color="red">
              <HugeiconsIcon icon={Delete01Icon} strokeWidth={1.75} />
              Delete Project
            </Button>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex gap="2" align="center">
  <Button variant="outline" size="2" color="gray">
    Cancel
  </Button>
  <Button variant="solid" size="2" color="red">
    <HugeiconsIcon icon={Delete01Icon} strokeWidth={1.75} />
    Delete Project
  </Button>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Card CTA */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Card Call-to-Action</SectionHeader.Title>
            <SectionHeader.Description>
              Inside a classic card, use solid for the primary action to maintain clear hierarchy. The ghost secondary action stays minimal within the elevated surface.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="16rem">
          <Card variant="classic" size="2" style={{ maxWidth: 320 }}>
            <Flex direction="column" gap="6" p="2">
              <Flex direction="column" gap="1">
                <Heading size="4" weight="medium">
                  Pro Plan
                </Heading>
                <Text size="2" color="gray">
                  Unlimited projects and collaborators
                </Text>
              </Flex>
              <Flex direction="column" gap="1">
                <Button variant="solid" size="2">
                  Upgrade Now
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} />
                </Button>
                <Button variant="ghost" size="2" color="gray">
                  Compare Plans
                </Button>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card
  variant="classic"
  size="2"
  style={{ maxWidth: 320 }}
>
  <Flex direction="column" gap="6" p="2">
    <Flex direction="column" gap="1">
      <Heading size="4" weight="medium">
        Pro Plan
      </Heading>
      <Text size="2" color="gray">
        Unlimited projects and collaborators
      </Text>
    </Flex>
    <Flex direction="column" gap="1">
      <Button variant="solid" size="2">
        Upgrade Now
        <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} />
      </Button>
      <Button variant="ghost" size="2" color="gray">
        Compare Plans
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

      {/* Example 4: Toolbar with Selection */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Toolbar Actions</SectionHeader.Title>
            <SectionHeader.Description>
              Disabled buttons include tooltips explaining why they're unavailable. Click "Select items" to toggle the selection state and enable the export action.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <Flex gap="2" align="center">
            <Button variant="soft" size="2" color="gray" highContrast onClick={toggleSelection}>
              {selectedCount > 0 ? `${selectedCount} selected` : 'Select items'}
            </Button>
            <Button variant="soft" size="2" color="gray" highContrast disabled={selectedCount === 0} tooltip={selectedCount === 0 ? 'Select items first' : undefined}>
              <HugeiconsIcon icon={Download01Icon} strokeWidth={1.75} />
              Export
            </Button>
            <Button variant="soft" size="2" color="gray" highContrast tooltip="Copy link">
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={1.75} />
              Copy
            </Button>
            <Button variant="soft" size="2" color="gray" highContrast tooltip="Share with team">
              <HugeiconsIcon icon={Share01Icon} strokeWidth={1.75} />
              Share
            </Button>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex gap="2" align="center">
  <Button
    variant="soft"
    size="2"
    color="gray"
    highContrast
    onClick={toggleSelection}
  >
    {selectedCount > 0 ? \`\${selectedCount} selected\` : 'Select items'}
  </Button>
  <Button
    variant="soft"
    size="2"
    color="gray"
    highContrast
    disabled={selectedCount === 0}
    tooltip={selectedCount === 0 ? 'Select items first' : undefined}
  >
    <HugeiconsIcon icon={Download01Icon} strokeWidth={1.75} />
    Export
  </Button>
  <Button
    variant="soft"
    size="2"
    color="gray"
    highContrast
    tooltip="Copy link"
  >
    <HugeiconsIcon icon={Copy01Icon} strokeWidth={1.75} />
    Copy
  </Button>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 5: Empty State CTA */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Empty State</SectionHeader.Title>
            <SectionHeader.Description>
              The surface variant provides gentle elevation for empty state CTAs. Keep the default size for consistency with the rest of the interface.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="12rem">
          <Flex direction="column" align="center" justify="center" gap="4" py="5" style={{ textAlign: 'center' }}>
            <Flex direction="column" gap="1">
              <Heading size="4" weight="medium">
                No projects yet
              </Heading>
              <Text size="2" color="gray">
                Create your first project to get started
              </Text>
            </Flex>
            <Button variant="surface" size="2" highContrast>
              <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} />
              Create Project
            </Button>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex
  direction="column"
  align="center"
  justify="center"
  gap="4"
  py="5"
  style={{ textAlign: 'center' }}
>
  <Flex direction="column" gap="1">
    <Heading size="4" weight="medium">
      No projects yet
    </Heading>
    <Text size="2" color="gray">
      Create your first project to get started
    </Text>
  </Flex>
  <Button variant="surface" size="2" highContrast>
    <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} />
    Create Project
  </Button>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 6: Compact Toolbar */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Compact Toolbar</SectionHeader.Title>
            <SectionHeader.Description>
              Size 1 buttons fit tight interfaces like data tables and dense toolbars. The smaller footprint maintains functionality without overwhelming the content.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <Flex gap="1" align="center">
            <Button variant="soft" size="1" color="gray" highContrast>
              <HugeiconsIcon icon={FilterIcon} strokeWidth={1.75} />
              Filter
            </Button>
            <Button variant="soft" size="1" color="gray" highContrast>
              <HugeiconsIcon icon={SortingAZ01Icon} strokeWidth={1.75} />
              Sort
            </Button>
            <Button variant="ghost" size="1" color="gray">
              <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
              Settings
            </Button>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex gap="1" align="center">
  <Button variant="soft" size="1" color="gray" highContrast>
    <HugeiconsIcon icon={FilterIcon} strokeWidth={1.75} />
    Filter
  </Button>
  <Button variant="soft" size="1" color="gray" highContrast>
    <HugeiconsIcon icon={SortingAZ01Icon} strokeWidth={1.75} />
    Sort
  </Button>
  <Button variant="ghost" size="1" color="gray">
    <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
    Settings
  </Button>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 7: Translucent Material */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Translucent Material</SectionHeader.Title>
            <SectionHeader.Description>
              The translucent material creates depth over images and dynamic backgrounds. Use soft variant with highContrast for readability on complex surfaces.
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
              'url(https://images.unsplash.com/photo-1677246791329-ed88ad9d49d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Flex gap="2" align="center">
            <Button variant="soft" size="2" highContrast material="translucent">
              <HugeiconsIcon icon={PlayIcon} strokeWidth={1.75} />
              Watch Demo
            </Button>
            <Button variant="soft" size="2" color="gray" highContrast material="translucent">
              Learn More
            </Button>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Theme appearance="dark" material="translucent">
  <Flex gap="2" align="center">
    <Button variant="soft" size="2" highContrast>
      <HugeiconsIcon icon={PlayIcon} strokeWidth={1.75} />
      Watch Demo
    </Button>
    <Button variant="soft" size="2" color="gray" highContrast>
      Learn More
    </Button>
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
