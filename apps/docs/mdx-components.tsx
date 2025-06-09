import type { MDXComponents } from 'mdx/types'
import { Heading, Text, Card, Flex, Code } from '@kushagradhawan/kookie-ui'
import { CodePreview } from './components/code-preview'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <Heading size="8" {...props} />,
    h2: (props) => <Heading size="6" {...props} />, 
    h3: (props) => <Heading size="5" {...props} />,
    h4: (props) => <Heading size="4" {...props} />,
    p: (props) => <Text size="3" {...props} />,
    code: (props) => <Code {...props} />,
    pre: (props) => (
      <Card>
        <pre 
          style={{
            padding: "var(--space-3)",
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-3)",
            overflow: "auto"
          }} 
          {...props} 
        />
      </Card>
    ),
    table: (props) => (
      <div style={{ overflowX: "auto", marginBottom: "var(--space-4)" }}>
        <table 
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "var(--font-size-2)",
          }}
          {...props} 
        />
      </div>
    ),
    thead: (props) => <thead {...props} />,
    tbody: (props) => <tbody {...props} />,
    tr: (props) => (
      <tr 
        style={{
          borderBottom: "1px solid var(--gray-6)",
        }}
        {...props} 
      />
    ),
    th: (props) => (
      <th 
        style={{
          textAlign: "left",
          padding: "var(--space-3) var(--space-2)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--gray-12)",
          borderBottom: "2px solid var(--gray-8)",
        }}
        {...props} 
      />
    ),
    td: (props) => (
      <td 
        style={{
          padding: "var(--space-3) var(--space-2)",
          color: "var(--gray-11)",
          verticalAlign: "top",
        }}
        {...props} 
      />
    ),
    CodePreview,
    ...components,
  }
} 