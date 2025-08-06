import type { MDXComponents } from 'mdx/types';
import {
  Heading,
  Text,
  Code,
  Blockquote,
  Link,
  Separator,
  Box,
  Strong,
  Em,
  Kbd,
  Quote,
  Callout,
} from '@kushagradhawan/kookie-ui';
import { CodeBlock } from './app/components/CodeBlock';
import { SpecsBlock } from './app/components/SpecsBlock';
import { TableOfContents } from './app/components/TableOfContents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with strong visual hierarchy
    h1: ({ children }) => (
      <Heading as="h1" size="9" mb="9" mt="9" weight="bold">
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Box mb="6" mt="9">
        <Heading as="h2" size="8" mb="4" weight="bold">
          {children}
        </Heading>
        <Separator size="4" mb="7" />
      </Box>
    ),
    h3: ({ children }) => (
      <Heading as="h3" size="7" mb="6" mt="9" weight="bold">
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading as="h4" size="4" mb="3" mt="7" weight="bold">
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading as="h5" size="3" mb="2" mt="6" weight="bold">
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading as="h6" size="4" mb="2" mt="5" weight="bold">
        {children}
      </Heading>
    ),

    // Text elements using KookieUI defaults
    p: ({ children }) => (
      <Text as="p" size="3" mb="4" style={{ lineHeight: '1.7' }}>
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
      <li style={{ marginBottom: 'var(--space-1)', lineHeight: '1.6' }}>
        <Text size="3">{children}</Text>
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
        <Code size="3" color="gray" variant="ghost" highContrast>
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
    blockquote: ({ children }) => (
      <Blockquote size="3" mb="3">
        {children}
      </Blockquote>
    ),

    // Horizontal rule with separator
    hr: () => <Separator size="4" my="5" />,

    // Typography using dedicated KookieUI components
    strong: ({ children }) => <Strong>{children}</Strong>,

    em: ({ children }) => <Em>{children}</Em>,

    // Tables using nested structure
    table: ({ children }) => (
      <Box mb="5" style={{ overflow: 'auto' }}>
        {children}
      </Box>
    ),

    // Custom callout for important information
    aside: ({ children }) => (
      <Callout.Root mb="3">
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
