'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Box, Card, Flex, ToggleButton, IconButton, Theme, Inset, Separator, Code as CodeComp, Button } from '@kushagradhawan/kookie-ui';
import { ChevronsUpDown, Copy, Code, Eye } from 'lucide-react';
import * as simpleIcons from 'simple-icons';

/**
 * Constants for CodeBlock configuration
 *
 * These values control the default behavior of the CodeBlock component,
 * particularly the collapsed state height and other visual properties.
 */
const COLLAPSED_HEIGHT = 360; // Height in pixels when collapsed

/**
 * CodeBlock component props interface
 *
 * This component provides a comprehensive code display solution with preview,
 * syntax highlighting, copy functionality, and expandable content. It's designed
 * for documentation sites and code examples.
 */
interface CodeBlockProps {
  /**
   * Preview content to display above or alongside the code
   * @example <Button>Click me</Button>
   */
  preview?: React.ReactNode;

  /**
   * Code content (processed from MDX)
   * @example <pre><code>const hello = "world";</code></pre>
   */
  children?: React.ReactNode;

  /**
   * Controls the position of copy/expand buttons
   * @default 'top'
   * @example 'top' | 'center'
   */
  buttonsPosition?: 'top' | 'center';

  /**
   * Optional file label to display alongside the code language
   * @example 'app/layout.tsx'
   */
  file?: string;

  /**
   * Background type for the preview section
   * @default 'none'
   * @example 'none' | 'dots' | '/path/to/image.jpg'
   */
  background?: 'none' | 'dots' | string;

  /**
   * Configuration for the background styling
   * @example { dotSize: 16, color: 'var(--blue-10)', height: '200px' }
   */
  backgroundProps?: {
    /** Size of dots in pixels (for dots background) */
    dotSize?: number;
    /** Color of dots (for dots background) */
    color?: string;
    /** Background color behind dots */
    backgroundColor?: string;
    /** Height of the preview area */
    height?: string;
    /** Width of the preview area */
    width?: string;
    /** Border radius of the preview area */
    radius?: string;
  };
}

/**
 * Preview Section Component
 *
 * Renders the preview content with optional background styling. Supports
 * three background types: none, dots pattern, or custom image.
 *
 * @param preview - The content to display in the preview area
 * @param background - Type of background to apply
 * @param backgroundProps - Configuration for background styling
 *
 * @example
 * ```tsx
 * <PreviewSection
 *   preview={<Button>Click me</Button>}
 *   background="dots"
 *   backgroundProps={{ dotSize: 16, color: 'var(--gray-10)' }}
 * />
 * ```
 */
const PreviewSection = ({
  preview,
  background = 'none',
  backgroundProps = {},
}: {
  preview: React.ReactNode;
  background?: 'none' | 'dots' | string;
  backgroundProps?: {
    dotSize?: number;
    color?: string;
    backgroundColor?: string;
    height?: string;
    width?: string;
    radius?: string;
  };
}) => {
  // Extract background properties with sensible defaults
  const { dotSize = 24, color = 'var(--gray-10)', backgroundColor = 'var(--gray-2)', height = '300px', width = '100%', radius = '3' } = backgroundProps;

  // Render with no background (default card styling)
  if (background === 'none') {
    return (
      <Card size="2" variant="soft">
        <Flex justify="center" align="center" py="4">
          <Theme fontFamily="sans">{preview}</Theme>
        </Flex>
      </Card>
    );
  }

  // Render with dots pattern background
  if (background === 'dots') {
    const dotsStyle: React.CSSProperties = {
      backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
      borderRadius: `var(--radius-${radius})`,
      backgroundSize: `${dotSize}px ${dotSize}px`,
      backgroundPosition: 'center',
      backgroundColor,
      height,
      width,
    };

    return (
      <Card size="2" variant="soft">
        <Flex justify="center" align="center" py="4" style={dotsStyle}>
          <Theme fontFamily="sans">{preview}</Theme>
        </Flex>
      </Card>
    );
  }

  // Render with custom image background
  const imageStyle: React.CSSProperties = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: `var(--radius-${radius})`,
    height,
    width,
  };

  return (
    <Card size="2" variant="soft">
      <Flex justify="center" align="center" py="4" style={imageStyle}>
        <Theme fontFamily="sans">{preview}</Theme>
      </Flex>
    </Card>
  );
};

/**
 * Code Section Component
 *
 * Renders the code content with copy and expand functionality. This component
 * handles the interactive features of the code block including:
 *
 * - Copy to clipboard functionality
 * - Expandable/collapsible content
 * - Visual feedback for user actions
 * - Responsive height management
 *
 * @param children - The code content to display
 * @param buttonsPosition - Where to position the action buttons
 *
 * @example
 * ```tsx
 * <CodeSection buttonsPosition="top">
 *   <pre><code>const example = "code";</code></pre>
 * </CodeSection>
 * ```
 */
const CodeSection = memo(function CodeSection({ children, buttonsPosition, file }: { children: React.ReactNode; buttonsPosition: 'top' | 'center'; file?: string }) {
  // Extract language from nested code/pre nodes generated by MDX/rehype
  const extractLanguageFromNode = (node: React.ReactNode): string | null => {
    let detected: string | null = null;

    const visit = (child: React.ReactNode) => {
      if (!child || detected) return;
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<any>;
        const props: any = element.props ?? {};
        // Check className for `language-xxxx`
        const className: unknown = props.className;
        if (typeof className === 'string') {
          const match = className.match(/language-([\w+-]+)/i);
          if (match && match[1]) {
            detected = match[1].toLowerCase();
            return;
          }
        }
        // Some transformers add data-language
        const dataLanguage: unknown = typeof props['data-language'] === 'string' ? props['data-language'] : typeof props.dataLang === 'string' ? props.dataLang : undefined;
        if (typeof dataLanguage === 'string' && dataLanguage) {
          detected = dataLanguage.toLowerCase();
          return;
        }
        // Recurse into children
        const grandchildren = props.children;
        if (grandchildren) {
          if (Array.isArray(grandchildren)) {
            grandchildren.forEach(visit);
          } else {
            visit(grandchildren);
          }
        }
      } else if (Array.isArray(child)) {
        child.forEach(visit);
      }
    };

    visit(node);
    return detected;
  };

  const formatLanguageLabel = (lang: string | null): string | null => {
    if (!lang) return null;
    const aliasMap: Record<string, string> = {
      tsx: 'TSX',
      ts: 'TS',
      jsx: 'JSX',
      js: 'JS',
      javascript: 'JS',
      typescript: 'TS',
      css: 'CSS',
      scss: 'SCSS',
      sass: 'SASS',
      less: 'LESS',
      html: 'HTML',
      mdx: 'MDX',
      md: 'MD',
      json: 'JSON',
      yml: 'YAML',
      yaml: 'YAML',
      toml: 'TOML',
      bash: 'SH',
      sh: 'SH',
      shell: 'SH',
      zsh: 'SH',
      cjs: 'CJS',
      mjs: 'MJS',
    };
    return aliasMap[lang] || lang.toUpperCase();
  };

  const getLanguageIcon = (lang: string | null): { path: string; hex: string } | null => {
    if (!lang) return null;

    const iconMap: Record<string, keyof typeof simpleIcons> = {
      tsx: 'siTypescript',
      ts: 'siTypescript',
      typescript: 'siTypescript',
      jsx: 'siReact',
      js: 'siJavascript',
      javascript: 'siJavascript',
      css: 'siCss',
      scss: 'siSass',
      sass: 'siSass',
      less: 'siLess',
      html: 'siHtml5',
      json: 'siJson',
      yml: 'siYaml',
      yaml: 'siYaml',
      bash: 'siGnubash',
      sh: 'siGnubash',
      shell: 'siGnubash',
      zsh: 'siGnubash',
      python: 'siPython',
      py: 'siPython',
      go: 'siGo',
      rust: 'siRust',
      rs: 'siRust',
      java: 'siOpenjdk',
      kotlin: 'siKotlin',
      swift: 'siSwift',
      ruby: 'siRuby',
      rb: 'siRuby',
      php: 'siPhp',
      csharp: 'siSharp',
      cs: 'siSharp',
      cpp: 'siCplusplus',
      c: 'siC',
      sql: 'siMysql',
      graphql: 'siGraphql',
      docker: 'siDocker',
      dockerfile: 'siDocker',
      markdown: 'siMarkdown',
      md: 'siMarkdown',
      mdx: 'siMdx',
    };

    const iconKey = iconMap[lang.toLowerCase()];
    if (iconKey && iconKey in simpleIcons) {
      const icon = simpleIcons[iconKey] as { path: string; hex: string };
      return icon;
    }

    return null;
  };

  // State management for expand/collapse functionality
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(COLLAPSED_HEIGHT);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Determine if toggle button should be shown (content is taller than collapsed height)
  const shouldShowToggle = contentHeight > COLLAPSED_HEIGHT;

  // Memoize the height calculation to avoid unnecessary re-renders
  const updateContentHeight = useCallback(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  // Update content height when children change
  useEffect(() => {
    updateContentHeight();
  }, [children, updateContentHeight]);

  // Handle expand/collapse toggle
  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // Handle copy to clipboard functionality
  const handleCopy = useCallback(async () => {
    if (contentRef.current) {
      const codeText = contentRef.current.textContent || '';
      try {
        await navigator.clipboard.writeText(codeText);
        setCopied(true);
        // Reset copied state after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  }, []);

  // Dynamic styles for content height and chevron rotation
  const contentStyle: React.CSSProperties = {
    maxHeight: isExpanded ? `${contentHeight}px` : `${COLLAPSED_HEIGHT}px`,
  };

  const chevronStyle: React.CSSProperties = {
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  const detectedLang = extractLanguageFromNode(children);
  const language = formatLanguageLabel(detectedLang);
  const languageIcon = getLanguageIcon(detectedLang);

  return (
    <Box position="relative">
      <Card size="2" variant="soft">
        <Flex direction="column" gap="3">
          {/* Action Buttons - positioned absolutely for overlay effect */}
          <Flex gap="2" justify="between" align="center">
            {/* Language badge - only when detectable */}
            {(language || file) && (
              <Flex align="center" gap="2">
                {languageIcon && (
                  <svg role="img" viewBox="0 0 24 24" width="16" height="16" fill="var(--gray-11)" style={{ flexShrink: 0 }}>
                    <path d={languageIcon.path} />
                  </svg>
                )}
                <Flex align="center" gap="2">
                  {language && (
                    <CodeComp size="2" color="gray" highContrast>
                      {language?.toLowerCase()}
                    </CodeComp>
                  )}
                  {file && (
                    <CodeComp size="2" color="gray" highContrast>
                      {file}
                    </CodeComp>
                  )}
                </Flex>
              </Flex>
            )}
            <Flex align="center" gap="2">
              {/* Expand/Collapse button - only show if content is expandable */}
              {shouldShowToggle && (
                <ToggleButton
                  size="1"
                  variant="soft"
                  color="gray"
                  highContrast
                  pressed={isExpanded}
                  onPressedChange={handleToggle}
                  tooltip={isExpanded ? 'Collapse' : 'Expand'}
                  aria-label={isExpanded ? 'Collapse code' : 'Expand code'}
                  className="code-toggle-button"
                >
                  <ChevronsUpDown style={chevronStyle} className="code-chevron" />
                  Expand
                </ToggleButton>
              )}

              {/* Copy button */}
              <Button size="1" variant="soft" color="gray" highContrast onClick={handleCopy} tooltip={copied ? 'Copied!' : 'Copy'} aria-label={copied ? 'Copied!' : 'Copy code'}>
                <Copy /> Copy
              </Button>
            </Flex>
          </Flex>

          <Inset clip="padding-box" side="x">
            <Separator size="4" light />
          </Inset>

          {/* Code Content - with dynamic height based on expand state */}
          <Box ref={contentRef} style={contentStyle} className="code-content">
            {children}
          </Box>

          {/* Scroll Shadow - only show when collapsed and content is expandable */}
          {shouldShowToggle && !isExpanded && <Box className="code-scroll-shadow visible" />}
        </Flex>
      </Card>
    </Box>
  );
});

/**
 * CodeBlock Component
 *
 * A comprehensive code display component that combines preview content with
 * syntax-highlighted code. Features include:
 *
 * - Tabbed interface for preview and code
 * - Copy to clipboard functionality
 * - Expandable code sections
 * - Customizable backgrounds (none, dots, images)
 * - Responsive design
 *
 * This component is designed for documentation sites and provides a rich
 * experience for displaying code examples with live previews.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CodeBlock preview={<Button>Click me</Button>}>
 *   <pre><code>const button = <Button>Click me</Button>;</code></pre>
 * </CodeBlock>
 *
 * // With dots background
 * <CodeBlock
 *   preview={<Image src="/logo.png" alt="Logo" />}
 *   background="dots"
 *   backgroundProps={{ dotSize: 16, color: 'var(--blue-10)' }}
 * >
 *   <pre><code>const image = <Image src="/logo.png" />;</code></pre>
 * </CodeBlock>
 *
 * // With custom image background
 * <CodeBlock
 *   preview={<Icon name="star" />}
 *   background="/path/to/background.jpg"
 *   backgroundProps={{ height: '200px' }}
 * >
 *   <pre><code>const icon = <Icon name="star" />;</code></pre>
 * </CodeBlock>
 * ```
 */
export const CodeBlock = memo(function CodeBlock({ preview, children, buttonsPosition = 'top', background = 'none', backgroundProps = {}, file }: CodeBlockProps) {
  // Check if we have code content to show
  const hasCode = children && React.Children.count(children) > 0;

  // Always show preview and code vertically stacked when both exist
  return (
    <Box className="docs-code-block" mt="6" mb="8">
      <Flex direction="column" gap="2">
        {preview && <PreviewSection preview={preview} background={background} backgroundProps={backgroundProps} />}
        {hasCode && <CodeSection children={children} buttonsPosition={buttonsPosition} file={file} />}
      </Flex>
    </Box>
  );
});
