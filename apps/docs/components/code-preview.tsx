'use client'

import { Card, Flex, Tabs } from '@kushagradhawan/kookie-ui'

interface CodePreviewProps {
  children: React.ReactNode
  code: string
  title?: string
}

export function CodePreview({ children, code, title }: CodePreviewProps) {
  return (
    <Card variant="soft">
      <Tabs.Root defaultValue="preview">
        <Flex direction="column" gap="0">
          {/* Tab Navigation */}
          <Tabs.List>
            <Tabs.Trigger value="preview">
              Preview
            </Tabs.Trigger>
            <Tabs.Trigger value="code">
              Code
            </Tabs.Trigger>
          </Tabs.List>

          {/* Content */}
          <div style={{ padding: '24px' }}>
            <Tabs.Content value="preview">
              <Flex direction="column" gap="4">
                {title && (
                  <div className="text-sm text-gray-600 mb-2">{title}</div>
                )}
                <div>{children}</div>
              </Flex>
            </Tabs.Content>
            
            <Tabs.Content value="code">
              <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto">
                <code>{code}</code>
              </pre>
            </Tabs.Content>
          </div>
        </Flex>
      </Tabs.Root>
    </Card>
  )
} 