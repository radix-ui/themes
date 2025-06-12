'use client'

import { Card, Flex, Text, Code, IconButton, Tooltip, Badge, Box } from '@kushagradhawan/kookie-ui'
import { Clipboard, Check, Eye, EyeOff } from 'lucide-react'
import { useState, useCallback, useMemo, memo } from 'react'
import * as SimpleIcons from 'simple-icons'

interface CodeBlockProps {
  children: string
  language?: string
  showLineNumbers?: boolean
  autoFormat?: boolean
  variant?: 'soft' | 'surface' | 'classic' | 'ghost'
  showCard?: boolean
  showHeader?: boolean
  title?: string
  highlightLines?: number[]
  maxHeight?: string
  theme?: 'auto' | 'light' | 'dark'
  allowWrap?: boolean
  showLanguage?: boolean
  collapsible?: boolean
}

// Language detection based on file extensions and common patterns
function detectLanguage(code: string): string {
  const trimmed = code.trim()
  
  // Common patterns for different languages
  const patterns = [
    { regex: /^import.*from ['"]react/m, lang: 'tsx' },
    { regex: /^import.*{.*}.*from/m, lang: 'typescript' },
    { regex: /interface\s+\w+\s*{/m, lang: 'typescript' },
    { regex: /function\s+\w+\s*\(/m, lang: 'javascript' },
    { regex: /const\s+\w+\s*=.*=>/m, lang: 'javascript' },
    { regex: /<[A-Z]\w+/m, lang: 'jsx' },
    { regex: /export\s+default/m, lang: 'typescript' },
    { regex: /^\s*{/m, lang: 'json' },
    { regex: /^\s*[\w-]+:\s*/m, lang: 'yaml' },
    { regex: /^\s*#/m, lang: 'bash' },
    { regex: /npm\s+install/m, lang: 'bash' },
    { regex: /pnpm\s+/m, lang: 'bash' },
    { regex: /yarn\s+/m, lang: 'bash' },
    { regex: /\.[\w-]+\s*{/m, lang: 'css' },
    { regex: /@media\s*\(/m, lang: 'css' },
    { regex: /<!DOCTYPE\s+html/i, lang: 'html' },
    { regex: /<html/i, lang: 'html' },
  ]
  
  for (const { regex, lang } of patterns) {
    if (regex.test(trimmed)) {
      return lang
    }
  }
  
  return 'text'
}

// Language icon mapping using simple-icons
function getLanguageIcon(language: string): { icon: string; color: string } | null {
  const iconMap: Record<string, { name: string }> = {
    'typescript': { name: 'typescript' },
    'javascript': { name: 'javascript' },
    'tsx': { name: 'react' },
    'jsx': { name: 'react' },
    'react': { name: 'react' },
    'html': { name: 'html5' },
    'css': { name: 'css3' },
    'json': { name: 'json' },
    'bash': { name: 'gnubash' },
    'shell': { name: 'gnubash' },
    'yaml': { name: 'yaml' },
    'yml': { name: 'yaml' },
    'python': { name: 'python' },
    'java': { name: 'java' },
    'php': { name: 'php' },
    'ruby': { name: 'ruby' },
    'go': { name: 'go' },
    'rust': { name: 'rust' },
    'swift': { name: 'swift' },
    'kotlin': { name: 'kotlin' },
    'dart': { name: 'dart' },
    'vue': { name: 'vuedotjs' },
    'svelte': { name: 'svelte' },
    'angular': { name: 'angular' },
    'node': { name: 'nodedotjs' },
    'npm': { name: 'npm' },
    'docker': { name: 'docker' },
    'sql': { name: 'mysql' },
    'mongodb': { name: 'mongodb' },
    'graphql': { name: 'graphql' },
  }
  
  const mapping = iconMap[language.toLowerCase()]
  if (!mapping) return null
  
  try {
    const iconData = (SimpleIcons as any)[`si${mapping.name.charAt(0).toUpperCase() + mapping.name.slice(1)}`]
    if (iconData) {
      return {
        icon: iconData.svg,
        color: 'var(--gray-12)' // Use consistent gray color instead of brand colors
      }
    }
  } catch (error) {
    console.warn(`Icon not found for language: ${language}`)
  }
  
  return null
}

// Enhanced color schemes that work well in light and dark modes
const colorSchemes = {
  // Modern theme with vibrant but readable colors
  modern: {
    keyword: 'var(--violet-11)',      // Purple for keywords
    string: 'var(--green-11)',        // Green for strings
    comment: 'var(--gray-9)',         // Muted gray for comments
    number: 'var(--blue-11)',         // Blue for numbers
    boolean: 'var(--orange-11)',      // Orange for booleans
    function: 'var(--indigo-11)',     // Indigo for functions
    component: 'var(--pink-11)',      // Pink for React components
    tag: 'var(--red-11)',             // Red for HTML/JSX tags
    attribute: 'var(--amber-11)',     // Amber for attributes
    operator: 'var(--gray-11)',       // Gray for operators
    punctuation: 'var(--gray-10)',    // Light gray for punctuation
    variable: 'var(--cyan-11)',       // Cyan for variables
    property: 'var(--teal-11)',       // Teal for object properties
    type: 'var(--purple-11)',         // Purple for types
    constant: 'var(--orange-10)',     // Orange for constants
  }
}

// Auto-format and indent code with improved algorithm
function formatCode(rawCode: string, language: string): string[] {
  const lines = rawCode.trim().split('\n')
  
  // For JSON, use built-in JSON.stringify for proper formatting
  if (language === 'json') {
    try {
      const parsed = JSON.parse(rawCode)
      return JSON.stringify(parsed, null, 2).split('\n')
    } catch {
      // Fall back to basic formatting if JSON is invalid
    }
  }
  
  const formatted: string[] = []
  let indentLevel = 0
  const indentSize = language === 'python' ? 4 : 2
  const indentChar = ' '.repeat(indentSize)
  
  lines.forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed) {
      formatted.push('')
      return
    }
    
    // Language-specific formatting rules
    let shouldDecreaseBefore = false
    let shouldIncreaseAfter = false
    
    switch (language) {
      case 'javascript':
      case 'typescript':
      case 'jsx':
      case 'tsx':
        shouldDecreaseBefore = /^[}\])]/.test(trimmed) || 
                              trimmed.startsWith('</') ||
                              trimmed === '/>)'
        shouldIncreaseAfter = /[{[(]$/.test(trimmed) || 
                             (trimmed.includes('<') && 
                              !trimmed.includes('</') && 
                              !trimmed.endsWith('/>') &&
                              trimmed.endsWith('>'))
        break
      case 'css':
        shouldDecreaseBefore = trimmed === '}'
        shouldIncreaseAfter = trimmed.endsWith('{')
        break
      case 'html':
        shouldDecreaseBefore = trimmed.startsWith('</')
        shouldIncreaseAfter = trimmed.includes('<') && 
                             !trimmed.includes('</') && 
                             !trimmed.endsWith('/>')
        break
    }
    
    if (shouldDecreaseBefore) {
      indentLevel = Math.max(0, indentLevel - 1)
    }
    
    formatted.push(indentChar.repeat(indentLevel) + trimmed)
    
    if (shouldIncreaseAfter) {
      indentLevel++
    }
  })
  
  return formatted
}

// Enhanced syntax highlighting with robust token detection
function createHighlightedTokens(code: string, language: string) {
  const colors = colorSchemes.modern
  
  // Language-specific token patterns
  const getPatterns = (lang: string) => {
    const basePatterns = [
      // Comments (should be first to avoid conflicts)
      { regex: /(\/\/.*$|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|#.*$)/gm, color: colors.comment, priority: 10 },
      // Strings (high priority)
      { regex: /("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)/g, color: colors.string, priority: 9 },
    ]
    
    switch (lang) {
      case 'javascript':
      case 'typescript':
      case 'jsx':
      case 'tsx':
        return [
          ...basePatterns,
          // TypeScript types and interfaces
          { regex: /\b(interface|type|enum|namespace|declare|abstract|readonly)\b/g, color: colors.type, priority: 8 },
          // React/JS keywords
          { regex: /\b(import|export|from|default|as|function|const|let|var|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|class|extends|implements|public|private|protected|static|async|await|yield|typeof|instanceof|in|of|delete|void)\b/g, color: colors.keyword, priority: 8 },
          // React components and JSX
          { regex: /(<\/?[A-Z][a-zA-Z0-9]*(?:\.[A-Z][a-zA-Z0-9]*)*)/g, color: colors.component, priority: 7 },
          // HTML/JSX tags
          { regex: /(<\/?[a-z][a-zA-Z0-9-]*)/g, color: colors.tag, priority: 7 },
          // JSX attribute names
          { regex: /(\w+)(?=\s*=)/g, color: colors.attribute, priority: 6 },
          // Functions and methods
          { regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, color: colors.function, priority: 6 },
          // Object properties
          { regex: /(\w+)(?=\s*:)/g, color: colors.property, priority: 5 },
          // Numbers
          { regex: /\b(\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g, color: colors.number, priority: 5 },
          // Booleans and null/undefined
          { regex: /\b(true|false|null|undefined)\b/g, color: colors.boolean, priority: 5 },
          // Constants (UPPER_CASE)
          { regex: /\b([A-Z][A-Z0-9_]*)\b/g, color: colors.constant, priority: 4 },
          // Variables and identifiers
          { regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, color: colors.variable, priority: 2 },
          // Operators and punctuation
          { regex: /([+\-*/%=<>!&|^~?:;,.]|===|!==|==|!=|<=|>=|&&|\|\||<<|>>|\+\+|--|\+=|-=|\*=|\/=|%=)/g, color: colors.operator, priority: 3 },
          // Brackets and braces
          { regex: /([{}()\[\]])/g, color: colors.punctuation, priority: 3 },
        ]
      
      case 'css':
        return [
          ...basePatterns,
          // CSS properties
          { regex: /(\w+)(?=\s*:)/g, color: colors.property, priority: 6 },
          // CSS selectors
          { regex: /([\w-]+)(?=\s*{)/g, color: colors.tag, priority: 6 },
          // CSS values
          { regex: /:\s*([^;{}]+)/g, color: colors.string, priority: 5 },
          // Units and numbers
          { regex: /\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|fr|ch|ex|in|cm|mm|pt|pc|deg|rad|turn|s|ms))\b/g, color: colors.number, priority: 5 },
        ]
      
      case 'json':
        return [
          ...basePatterns,
          // JSON keys
          { regex: /"([^"]+)"\s*:/g, color: colors.property, priority: 6 },
          // JSON values
          { regex: /:\s*("([^"\\]|\\.)*")/g, color: colors.string, priority: 5 },
          // Numbers in JSON
          { regex: /:\s*(-?\d+\.?\d*(?:[eE][+-]?\d+)?)/g, color: colors.number, priority: 5 },
          // Booleans and null in JSON
          { regex: /:\s*(true|false|null)/g, color: colors.boolean, priority: 5 },
        ]
      
      case 'bash':
      case 'shell':
        return [
          ...basePatterns,
          // Commands
          { regex: /\b(npm|pnpm|yarn|git|cd|ls|mkdir|rm|cp|mv|chmod|sudo|curl|wget|grep|find|sed|awk)\b/g, color: colors.keyword, priority: 6 },
          // Flags and options
          { regex: /(--?\w+)/g, color: colors.attribute, priority: 5 },
          // Environment variables
          { regex: /(\$\w+|\${\w+})/g, color: colors.variable, priority: 5 },
        ]
      
      default:
        return basePatterns
    }
  }
  
  const patterns = getPatterns(language).sort((a, b) => b.priority - a.priority)
  
  return (line: string) => {
    let tokens: Array<{ text: string; color?: string; matched?: boolean }> = [{ text: line }]
    
    patterns.forEach(({ regex, color }) => {
      tokens = tokens.flatMap(token => {
        if (token.matched) return [token] // Skip already processed tokens
        
        const text = token.text
        const result: Array<{ text: string; color?: string; matched?: boolean }> = []
        let lastIndex = 0
        
        // Reset regex to ensure we start from the beginning
        regex.lastIndex = 0
        
        let match
        while ((match = regex.exec(text)) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            const beforeText = text.slice(lastIndex, match.index)
            if (beforeText) {
              result.push({ text: beforeText })
            }
          }
          
          // Add the matched text with color
          result.push({ text: match[0], color, matched: true })
          
          lastIndex = regex.lastIndex
          
          // Prevent infinite loop for zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++
          }
        }
        
        // Add remaining text after the last match
        if (lastIndex < text.length) {
          const afterText = text.slice(lastIndex)
          if (afterText) {
            result.push({ text: afterText })
          }
        }
        
        return result.length > 0 ? result : [token]
      })
    })
    
    return tokens.filter(token => token.text !== '')
  }
}

// Memoized line component for better performance
const CodeLine = memo<{
  line: string
  lineNumber: number
  showLineNumbers: boolean
  isHighlighted: boolean
  tokenizer: (line: string) => Array<{ text: string; color?: string }>
}>(({ line, lineNumber, showLineNumbers, isHighlighted, tokenizer }) => {
  // Handle empty lines
  if (line.trim() === '') {
    return (
      <Flex 
        key={lineNumber} 
        gap="3" 
        align="start" 
        style={{ 
          minHeight: '1.5rem',
          backgroundColor: isHighlighted ? 'var(--yellow-3)' : 'transparent',
          borderRadius: 'var(--radius-2)',
          paddingLeft: isHighlighted ? 'var(--space-2)' : '0',
          paddingRight: isHighlighted ? 'var(--space-2)' : '0',
        }}
      >
        {showLineNumbers && (
          <Text 
            size="1" 
            color="gray" 
            style={{ 
              minWidth: '2.5rem', 
              textAlign: 'right',
              userSelect: 'none',
              fontFamily: 'var(--font-mono)',
              opacity: 0.6,
              fontSize: '0.75rem',
              lineHeight: 1.5,
            }}
          >
            {lineNumber + 1}
          </Text>
        )}
        <Code 
          size="2" 
          style={{ 
            lineHeight: 1.5,
            whiteSpace: 'pre',
            background: 'transparent',
            flex: 1,
            padding: 0,
          }}
        >
          {' '}
        </Code>
      </Flex>
    )
  }

  const tokens = tokenizer(line)
  
  return (
    <Flex 
      key={lineNumber} 
      gap="3" 
      align="start"
      style={{ 
        minHeight: '1.5rem',
        backgroundColor: isHighlighted ? 'var(--yellow-3)' : 'transparent',
        borderRadius: 'var(--radius-2)',
        paddingLeft: isHighlighted ? 'var(--space-2)' : '0',
        paddingRight: isHighlighted ? 'var(--space-2)' : '0',
      }}
    >
      {showLineNumbers && (
        <Text 
          size="1" 
          color="gray" 
          style={{ 
            minWidth: '2.5rem', 
            textAlign: 'right',
            userSelect: 'none',
            fontFamily: 'var(--font-mono)',
            opacity: 0.6,
            fontSize: '0.75rem',
            lineHeight: 1.5,
          }}
        >
          {lineNumber + 1}
        </Text>
      )}
      
      <Code 
        size="2" 
        style={{ 
          lineHeight: 1.5,
          whiteSpace: 'pre',
          background: 'transparent',
          flex: 1,
          padding: 0,
        }}
      >
        {tokens.map((token, idx) => (
          <span 
            key={idx}
            style={{ 
              color: token.color || 'inherit',
              fontWeight: token.color === colorSchemes.modern.keyword ? '500' : 'inherit'
            }}
          >
            {token.text}
          </span>
        ))}
      </Code>
    </Flex>
  )
})

CodeLine.displayName = 'CodeLine'

export const CodeBlock = memo<CodeBlockProps>(({ 
  children, 
  language: providedLanguage,
  showLineNumbers = false, 
  autoFormat = false,
  variant = 'soft',
  showCard = true,
  showHeader = false,
  title,
  highlightLines = [],
  maxHeight,
  theme = 'auto',
  allowWrap = false,
  showLanguage = true,
  collapsible = false
}) => {
  const [copied, setCopied] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // Detect language if not provided
  const detectedLanguage = useMemo(() => 
    providedLanguage || detectLanguage(children), 
    [children, providedLanguage]
  )
  
  // Memoize formatted lines
  const lines = useMemo(() => {
    return autoFormat ? formatCode(children, detectedLanguage) : children.split('\n')
  }, [children, autoFormat, detectedLanguage])
  
  // Memoize tokenizer
  const tokenizer = useMemo(() => 
    createHighlightedTokens(children, detectedLanguage), 
    [children, detectedLanguage]
  )
  
  // Copy functionality with better error handling
  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(children)
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea')
        textArea.value = children
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('Clipboard')
        textArea.remove()
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to Clipboard text:', err)
      // Could add toast notification here
    }
  }, [children])
  
  // Get language icon
  const languageIcon = useMemo(() => 
    showLanguage ? getLanguageIcon(detectedLanguage) : null, 
    [detectedLanguage, showLanguage]
  )
  
  const header = (showHeader || title) && (
    <Flex 
      justify="between" 
      align="center" 
      p="3" 
      style={{ 
        backgroundColor: 'var(--gray-2)',
      }}
    >
      <Flex align="center" gap="2">
        {title && <Text size="2" weight="medium">{title}</Text>}
      </Flex>
      <Flex align="center" gap="1">
        {collapsible && (
          <Tooltip content={isCollapsed ? "Expand" : "Collapse"}>
            <IconButton
              size="1"
              variant="ghost"
              color="gray"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <Eye  /> : <EyeOff  />}
            </IconButton>
          </Tooltip>
        )}
      </Flex>
    </Flex>
  )
  
  const codeContent = (
    <Box position="relative">
      {/* Copy button - absolutely positioned top right */}
      <Box position="absolute" top="3" right="3" style={{ zIndex: 2 }}>
        <Tooltip content={copied ? "Copied!" : "Copy"}>
          <IconButton
            size="1"
            variant="ghost"
            color="gray"
            onClick={copyToClipboard}
          >
            {copied ? <Check  /> : <Clipboard  />}
          </IconButton>
        </Tooltip>
      </Box>
      
      <Flex 
        direction="column" 
        gap="0" 
        p="4"
        style={{ 
          maxHeight: maxHeight || (collapsible && isCollapsed ? '200px' : undefined),
          overflow: maxHeight || (collapsible && isCollapsed) ? 'auto' : 'visible',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {lines.map((line, lineNumber) => (
          <CodeLine
            key={lineNumber}
            line={line}
            lineNumber={lineNumber}
            showLineNumbers={showLineNumbers}
            isHighlighted={highlightLines.includes(lineNumber + 1)}
            tokenizer={tokenizer}
          />
        ))}
      </Flex>
    </Box>
  )
  
  const content = (
    <div>
      {header}
      {(!collapsible || !isCollapsed) && codeContent}
    </div>
  )
  
  if (!showCard) {
    return content
  }
  
  return (
    <Card variant={variant} style={{ overflow: 'hidden' }}>
      {content}
    </Card>
  )
})

CodeBlock.displayName = 'CodeBlock' 