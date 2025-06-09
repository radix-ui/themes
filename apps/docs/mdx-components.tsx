import type { MDXComponents } from 'mdx/types'
import { Heading, Text, Card, Flex, Code } from '@kushagradhawan/kookie-ui'
import { CodePreview } from './components/code-preview'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: any) => <Heading size="8" {...props} />,
    h2: (props: any) => <Heading size="6" {...props} />, 
    h3: (props: any) => <Heading size="5" {...props} />,
    h4: (props: any) => <Heading size="4" {...props} />,
    p: (props: any) => <Text size="2" {...props} />,
    code: (props: any) => <Code {...props} />,
    pre: (props: any) => (
      <Card variant="soft">
        <pre 
          style={{
            padding: "var(--space-4)",
            backgroundColor: "transparent",
            borderRadius: "var(--radius-3)",
            overflow: "auto",
            margin: 0
          }} 
          {...props} 
        />
      </Card>
    ),
    table: (props: any) => (
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
    thead: (props: any) => <thead {...props} />,
    tbody: (props: any) => <tbody {...props} />,
    tr: (props: any) => (
      <tr 
        style={{
          borderBottom: "1px solid var(--gray-6)",
        }}
        {...props} 
      />
    ),
    th: (props: any) => (
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
    td: (props: any) => (
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