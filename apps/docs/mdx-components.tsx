import type { MDXComponents } from 'mdx/types';
import React from 'react';
import { Code } from '@kushagradhawan/kookie-ui';
import { CodeBlock, useCodeBlockContext, createMarkdownComponents } from '@kushagradhawan/kookie-blocks';
import { SpecsBlock } from './app/components/specs-block';
import { TableOfContents } from './app/components/table-of-contents';

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
  });

  return {
    ...baseComponents,

    // Override code handling for rehype-pretty-code integration
    code: ({ children, className, ...props }) => {
      if (className?.includes('language-')) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      return (
        <Code size="3" color="gray" variant="soft" highContrast>
          {children}
        </Code>
      );
    },

    // Override pre to use CodeBlock wrapper
    pre: (props) => <PreWrapper {...props} />,

    // Custom components specific to kookie-ui docs
    CodeBlock,
    SpecsBlock,
    TableOfContents,

    ...components,
  };
}
