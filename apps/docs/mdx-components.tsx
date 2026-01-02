import type { MDXComponents } from 'mdx/types';
import React from 'react';
import { Code } from '@kushagradhawan/kookie-ui';
import { CodeBlock, useCodeBlockContext, createMarkdownComponents } from '@kushagradhawan/kookie-blocks';
import { SpecsBlock } from './components/specs-block';

// Component that can use hooks to check if already inside CodeBlock
const PreWrapper = ({ children, className, ...props }: React.ComponentProps<'pre'>) => {
  const isInsideCodeBlock = useCodeBlockContext();
  if (isInsideCodeBlock) {
    return (
      <pre className={className} {...props}>
        {children}
      </pre>
    );
  }
  return (
    <CodeBlock>
      <pre className={className} {...props}>
        {children}
      </pre>
    </CodeBlock>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const baseComponents = createMarkdownComponents({
    inlineCodeHighContrast: true,
    // Don't wrap code blocks in CodeBlock - PreWrapper will do it
    codeBlockCollapsible: false,
    spacing: 'spacious', // Use "spacious" for docs (default), or "compact" for tighter spacing
  });

  return {
    ...baseComponents,

    // Override code: inline only, blocks handled by PreWrapper
    code: ({ children, className, inline, ...props }: any) => {
      // For rehype-pretty-code syntax highlighting, just pass through
      if (className?.includes('language-')) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      // Only inline code here
      return (
        <Code size="3" color="gray" variant="soft" highContrast>
          {children}
        </Code>
      );
    },

    // Override pre: let PreWrapper handle CodeBlock wrapping
    pre: (props) => <PreWrapper {...props} />,

    // Custom components
    CodeBlock,
    SpecsBlock,
    // TableOfContents comes from baseComponents

    ...components,
  };
}
