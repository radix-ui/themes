'use client'

import { Card, Flex, Tabs, Text, Code } from '@kushagradhawan/kookie-ui'

interface CodePreviewProps {
  children: React.ReactNode
  code: string
  title?: string
}

// Simple syntax highlighter using only Kookie UI
function HighlightedCode({ code }: { code: string }) {
  // Auto-format and indent JSX code
const formatCode = (rawCode: string) => {
  const lines = rawCode.trim().split('\n')
  const formatted: string[] = []
  let indentLevel = 0
  
  lines.forEach((line, index) => {
    const trimmed = line.trim()
    if (!trimmed) {
      formatted.push('')
      return
    }
    
    // Handle closing elements - decrease indent before formatting
    if (trimmed.startsWith('</') || trimmed.startsWith('}>') || trimmed === '}' || trimmed === ')') {
      indentLevel = Math.max(0, indentLevel - 1)
    }
    
    // Handle closing multiline JSX props
    if ((trimmed.endsWith('/>') || trimmed.endsWith('>')) && !trimmed.includes('<') && indentLevel > 0) {
      indentLevel = Math.max(0, indentLevel - 1)
    }
    
    // Apply indentation
    const indentedLine = '  '.repeat(indentLevel) + trimmed
    formatted.push(indentedLine)
    
    // Handle opening elements - increase indent after formatting
    const hasOpeningTag = trimmed.includes('<') && !trimmed.includes('</')
    const isSelfClosing = trimmed.endsWith('/>')
    const hasClosingTag = trimmed.includes('</')
    const endsWithOpenBrace = trimmed.endsWith('{') || trimmed.endsWith('(')
    
    // Increase indent for:
    // 1. Opening tags that don't self-close
    // 2. Lines ending with { or (
    // 3. Opening tags with props that don't close on same line
    if (endsWithOpenBrace) {
      indentLevel++
    } else if (hasOpeningTag && !isSelfClosing && !hasClosingTag) {
      if (trimmed.endsWith('>')) {
        // Single line opening tag
        indentLevel++
      } else {
        // Multi-line props starting
        indentLevel++
      }
    }
  })
  
  return formatted
}
  
  const lines = formatCode(code)
  
  const highlightLine = (line: string, lineNumber: number) => {
    // Handle empty lines
    if (line.trim() === '') {
      return (
        <Flex key={lineNumber} gap="4" align="start" style={{ minHeight: '1.5rem' }}>
          <Text 
            size="2" 
            color="gray" 
            style={{ 
              minWidth: '2rem', 
              textAlign: 'right',
              userSelect: 'none',
              fontFamily: 'var(--font-mono)',
              opacity: 0.5
            }}
          >
            {lineNumber}
          </Text>
          <Code 
            size="2" 
            style={{ 
              lineHeight: 1.5,
              whiteSpace: 'pre',
              background: 'transparent',
              flex: 1
            }}
          >
            {line}
          </Code>
        </Flex>
      )
    }

    // Preserve leading whitespace
    const leadingWhitespace = line.match(/^(\s*)/)?.[1] || ''
    const contentAfterWhitespace = line.slice(leadingWhitespace.length)
    
    // Enhanced token patterns for JSX/React
    const patterns = [
      // JSX components (must come before general words)
      { regex: /(<\/?[A-Z][a-zA-Z]*)/g, color: 'blue' },
      // HTML/JSX tags
      { regex: /(<\/?[a-z][a-zA-Z]*)/g, color: 'red' },
      // Closing brackets for tags
      { regex: /(>|\/?>)/g, color: 'gray' },
      // React/JS keywords
      { regex: /\b(import|export|function|return|const|let|var|from|default|true|false|null|undefined)\b/g, color: 'purple' },
      // Strings (including JSX attribute values)
      { regex: /(".*?"|'.*?'|`.*?`)/g, color: 'green' },
      // JSX attribute names
      { regex: /(\w+)=/g, color: 'orange' },
      // Numbers
      { regex: /\b(\d+\.?\d*)\b/g, color: 'cyan' },
      // Brackets and braces
      { regex: /(\{|\}|\(|\)|\[|\])/g, color: 'gray' },
      // Comments
      { regex: /(\/\/.*$|\/\*.*?\*\/)/g, color: 'gray' },
    ]
    
    let tokens: Array<{ text: string; color?: string }> = [{ text: contentAfterWhitespace }]
    
    patterns.forEach(({ regex, color }) => {
      tokens = tokens.flatMap(token => {
        if (token.color) return [token] // Already highlighted
        
        const parts = token.text.split(regex)
        const result: Array<{ text: string; color?: string }> = []
        
        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            // Non-matching text
            if (parts[i] !== '') result.push({ text: parts[i] })
          } else {
            // Matching text
            if (parts[i] !== '') result.push({ text: parts[i], color })
          }
        }
        
        return result.length > 0 ? result : [token]
      })
    })

    return (
      <Flex key={lineNumber} gap="4" align="start">
        {/* Line number */}
        <Text 
          size="2" 
          color="gray" 
          style={{ 
            minWidth: '2rem', 
            textAlign: 'right',
            userSelect: 'none',
            fontFamily: 'var(--font-mono)',
            opacity: 0.5
          }}
        >
          {lineNumber}
        </Text>
        
        {/* Code content */}
        <Code 
          size="2" 
          style={{ 
            lineHeight: 1.5,
            whiteSpace: 'pre',
            background: 'transparent',
            flex: 1
          }}
        >
          {leadingWhitespace}
          {tokens.map((token, idx) => (
            <span 
              key={idx}
              style={{ 
                color: token.color ? `var(--${token.color}-11)` : 'inherit'
              }}
            >
              {token.text}
            </span>
          ))}
        </Code>
      </Flex>
    )
  }
  
  return (
    <Flex direction="column" gap="1" p="4" py="8">
      {lines.map((line, index) => highlightLine(line, index + 1))}
    </Flex>
  )
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
          <HighlightedCode code={code} />
        </Tabs.Content>
      </Tabs.Root>
    </Card>
  )
} 