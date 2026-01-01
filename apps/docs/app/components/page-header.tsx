'use client';

import React, { useCallback } from 'react';
import { Flex, Text, Heading, Link, Button } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon } from '@hugeicons/core-free-icons';
import type { DocMetadata } from '@/lib/frontmatter';

interface PageHeaderProps {
  metadata: DocMetadata;
  actions?: React.ReactNode;
}

export function PageHeader({ metadata, actions }: PageHeaderProps) {
  const handleCopyUrl = useCallback(() => {
    // Get the main content area
    const contentArea = document.querySelector('[data-content-area="true"]');
    if (!contentArea) return;

    // Get all text content and convert to markdown-like format
    let markdown = `# ${metadata.title}\n\n`;

    if (metadata.description) {
      markdown += `${metadata.description}\n\n`;
    }

    if (metadata.source) {
      markdown += `[View source](${metadata.source})\n\n`;
    }

    markdown += `---\n\n`;

    // Get the text content from the page
    const textContent = contentArea.textContent || '';
    markdown += textContent.trim();

    navigator.clipboard.writeText(markdown);
  }, [metadata.title, metadata.description, metadata.source]);

  return (
    <Flex direction="column" gap="4">
      {/* Category Label */}
      <Text size="2" weight="medium">
        {metadata.category}
      </Text>

      {/* Title Row with Actions */}
      <Flex align="center" justify="between" gap="4">
        <Heading size="9" weight="medium" as="h1">
          {metadata.title}
        </Heading>

        <Flex align="center" gap="4">
          {actions}
          <Button size="2" variant="ghost" color="gray" highContrast onClick={handleCopyUrl} aria-label="Copy page URL">
            <HugeiconsIcon icon={Copy01Icon} />
            Copy page
          </Button>
        </Flex>
      </Flex>

      {/* Description */}
      {metadata.description && (
        <Text size="3" color="gray">
          {metadata.description}
        </Text>
      )}

      {/* View source */}
      {metadata.source && (
        <Link size="3" href={metadata.source} target="_blank" color="gray" highContrast rel="noreferrer">
          View source →
        </Link>
      )}
    </Flex>
  );
}
