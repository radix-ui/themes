'use client'

import { Card, Flex, Tabs, Text } from '@kushagradhawan/kookie-ui'
import { CodeBlock } from './code-block'

interface CodePreviewProps {
  children: React.ReactNode
  code: string
  title?: string
}

export function CodePreview({ children, code, title }: CodePreviewProps) {
  return (
    <Card variant="soft">
      <Tabs.Root defaultValue="preview">
        <Tabs.List color="gray">
          <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
          <Tabs.Trigger value="code">Code</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="preview">
          <Flex direction="column" gap="4" p="4" py="8">
            {title && <Text size="2" color="gray">{title}</Text>}
            <div key="preview-content">{children}</div>
          </Flex>
        </Tabs.Content>
        
        <Tabs.Content value="code">
          <CodeBlock 
            showLineNumbers={true} 
            autoFormat={true} 
            showCard={false}
          >
            {code}
          </CodeBlock>
        </Tabs.Content>
      </Tabs.Root>
    </Card>
  )
} 