import type { MDXComponents } from 'mdx/types';
import { Heading, Text, Code, Blockquote, Link, Flex, Separator, Box, Strong, Em, Kbd, Callout } from '@kushagradhawan/kookie-ui';
import { CodeBlock } from './app/components/code-block';
import { SpecsBlock } from './app/components/specs-block';
import { TableOfContents } from './app/components/table-of-contents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with strong visual hierarchy
    h1: ({ children }) => (
      <Flex direction="column" gap="8" mb="6" mt="2">
        <Heading as="h1" size="8" weight="semibold">
          {children}
        </Heading>
        {/* <Separator size="4"></Separator> */}
      </Flex>
    ),
    h2: ({ children }) => (
      <Flex direction="column" gap="3" mb="4" mt="4">
        <Heading as="h2" size="5" weight="medium">
          {children}
        </Heading>
        {/* <Separator size="4"></Separator> */}
      </Flex>
    ),
    h3: ({ children }) => (
      <Flex direction="column" gap="2" mt="8">
        <Heading as="h3" size="4" weight="medium">
          {children}
        </Heading>
        {/* <Separator size="4"></Separator> */}
      </Flex>
    ),
    h4: ({ children }) => (
      <Heading as="h4" size="3" mb="3" weight="medium">
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading as="h5" size="2" mb="2" weight="medium">
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading as="h6" size="2" mb="2" weight="medium">
        {children}
      </Heading>
    ),

    // Text elements using KookieUI defaults
    p: ({ children }) => (
      <Text as="p" size="3" my="3">
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
        <Text size="3" my="2" color="gray">
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
        <Code size="2" color="gray" variant="soft" highContrast>
          {children}
        </Code>
      );
    },

    // Code blocks - let rehype-pretty-code handle multi-line code
    pre: ({ children, className, ...props }) => {
      return (
        <Box className="code-block-wrapper">
          <pre className={className} {...props}>
            {children}
          </pre>
        </Box>
      );
    },

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
      <Text weight="semibold" highContrast>
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
