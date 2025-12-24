import type { MDXComponents } from 'mdx/types';
import React from 'react';
import { Heading, Text, Code, Blockquote, Link, Flex, Separator, Box, Strong, Em, Kbd, Callout } from '@kushagradhawan/kookie-ui';
import { CodeBlock, useCodeBlockContext } from '@kushagradhawan/kookie-blocks';
import { SpecsBlock } from './app/components/specs-block';
import { TableOfContents } from './app/components/table-of-contents';

// Component that can use hooks to check if already inside CodeBlock
const PreWrapper = ({ children, className, ...props }: React.ComponentProps<'pre'>) => {
  const isInsideCodeBlock = useCodeBlockContext();
  if (isInsideCodeBlock) {
    // Already inside CodeBlock, just render the pre
    return (
      <pre className={className} {...props}>
        {children}
      </pre>
    );
  }
  // Not inside CodeBlock, wrap it
  return (
    <CodeBlock>
      <pre className={className} {...props}>
        {children}
      </pre>
    </CodeBlock>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with strong visual hierarchy
    h1: ({ children }) => (
      <Flex direction="column" gap="4" my="6">
        <Heading as="h1" size="9" weight="medium">
          {children}
        </Heading>
        {/* <Separator size="4"></Separator> */}
      </Flex>
    ),
    h2: ({ children }) => (
      <Flex direction="column" gap="3" mb="6">
        <Heading as="h2" size="5" weight="medium">
          {children}
        </Heading>
        <Separator size="4"></Separator>
      </Flex>
    ),
    h3: ({ children }) => (
      <Flex direction="column" gap="2" mb="2" mt="6">
        <Heading as="h3" size="4" weight="medium">
          {children}
        </Heading>
        {/* <Separator size="4"></Separator> */}
      </Flex>
    ),
    h4: ({ children }) => (
      <Heading as="h4" size="3" mb="2" weight="medium">
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading as="h5" size="2" mb="2" weight="medium">
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading as="h6" size="2" mb="1" weight="medium">
        {children}
      </Heading>
    ),

    // Text elements using KookieUI defaults
    p: ({ children }) => (
      <Text as="p" size="3" mb="4">
        {children}
      </Text>
    ),

    // Lists with better spacing
    ul: ({ children }) => (
      <ul
        style={{
          marginBottom: 'var(--space-4)',
          marginTop: 'var(--space-2)',
          paddingLeft: 'var(--space-5)',
          listStyle: 'disc',
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        style={{
          marginBottom: 'var(--space-4)',
          marginTop: 'var(--space-2)',
          paddingLeft: 'var(--space-5)',
          listStyle: 'decimal',
        }}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li>
        <Text size="3" mb="4">
          {children}
        </Text>
      </li>
    ),

    // Code elements - use KookieUI for inline, rehype for blocks
    code: ({ children, className, ...props }) => {
      // If it has a language class, it's a code block (from rehype-pretty-code)
      if (className?.includes('language-')) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      // Regular inline code - use KookieUI styling
      return (
        <Code size="3" color="gray" variant="soft" highContrast>
          {children}
        </Code>
      );
    },

    // Code blocks - auto-wrap in CodeBlock for consistent UI
    // Only wrap if not already inside a CodeBlock (to avoid double wrapping)
    pre: (props) => <PreWrapper {...props} />,

    // Enhanced typography components
    kbd: ({ children }) => <Kbd size="2">{children}</Kbd>,

    // Links using KookieUI defaults
    a: ({ href, children }) => (
      <Link href={href} target={href?.startsWith('http') ? '_blank' : undefined}>
        {children}
      </Link>
    ),

    // Blockquotes and quotes
    blockquote: ({ children }) => <Blockquote size="3">{children}</Blockquote>,

    // Horizontal rule with separator
    hr: () => <Separator size="4" />,

    // Typography using dedicated KookieUI components
    strong: ({ children }) => (
      <Text weight="medium" highContrast>
        {children}
      </Text>
    ),

    em: ({ children }) => <Em>{children}</Em>,

    // Tables using nested structure
    table: ({ children }) => <Box style={{ overflow: 'auto' }}>{children}</Box>,

    // Custom callout for important information
    aside: ({ children }) => (
      <Callout.Root>
        <Callout.Text>{children}</Callout.Text>
      </Callout.Root>
    ),

    // Custom code block component
    CodeBlock,

    // Custom specs block component
    SpecsBlock,

    // Table of Contents
    TableOfContents,

    ...components,
  };
}
