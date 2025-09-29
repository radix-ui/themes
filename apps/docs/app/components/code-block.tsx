'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Box, Card, Flex, ToggleIconButton, IconButton, Tabs, Theme } from '@kushagradhawan/kookie-ui';
import { ChevronsUpDown, Clipboard, Code, Eye } from 'lucide-react';

/**
 * Constants for CodeBlock configuration
 *
 * These values control the default behavior of the CodeBlock component,
 * particularly the collapsed state height and other visual properties.
 */
const COLLAPSED_HEIGHT = 250; // Height in pixels when collapsed

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
const CodeSection = memo(function CodeSection({ children, buttonsPosition }: { children: React.ReactNode; buttonsPosition: 'top' | 'center' }) {
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

  return (
    <Box position="relative">
      <Card size="2" variant="soft">
        {/* Action Buttons - positioned absolutely for overlay effect */}
        <Flex
          gap="1"
          position="absolute"
          top={buttonsPosition === 'top' ? '3' : '50%'}
          right="3"
          style={{
            zIndex: 1,
            ...(buttonsPosition === 'center' && { transform: 'translateY(-50%)' }),
          }}
        >
          {/* Expand/Collapse button - only show if content is expandable */}
          {shouldShowToggle && (
            <ToggleIconButton
              size="2"
              variant="classic"
              color="gray"
              flush
              highContrast
              pressed={isExpanded}
              onPressedChange={handleToggle}
              tooltip={isExpanded ? 'Collapse' : 'Expand'}
              aria-label={isExpanded ? 'Collapse code' : 'Expand code'}
              className="code-toggle-button"
            >
              <ChevronsUpDown style={chevronStyle} className="code-chevron" />
            </ToggleIconButton>
          )}

          {/* Copy button */}
          <IconButton size="2" flush variant="classic" color="gray" highContrast onClick={handleCopy} tooltip={copied ? 'Copied!' : 'Copy'} aria-label={copied ? 'Copied!' : 'Copy code'}>
            <Clipboard />
          </IconButton>
        </Flex>

        {/* Code Content - with dynamic height based on expand state */}
        <Box ref={contentRef} style={contentStyle} className="code-content">
          {children}
        </Box>

        {/* Scroll Shadow - only show when collapsed and content is expandable */}
        {shouldShowToggle && !isExpanded && <Box className="code-scroll-shadow visible" />}
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
export const CodeBlock = memo(function CodeBlock({ preview, children, buttonsPosition = 'top', background = 'none', backgroundProps = {} }: CodeBlockProps) {
  // Check if we have code content to show
  const hasCode = children && React.Children.count(children) > 0;

  // Determine which tabs to show based on available content
  const showPreview = !!preview;
  const showCode = hasCode;
  const showTabs = showPreview && showCode;

  // If we don't have both preview and code, show them normally (no tabs)
  if (!showTabs) {
    return (
      <Box my="6">
        <Flex direction="column" gap="2">
          {preview && <PreviewSection preview={preview} background={background} backgroundProps={backgroundProps} />}
          {hasCode && <CodeSection children={children} buttonsPosition={buttonsPosition} />}
        </Flex>
      </Box>
    );
  }

  // If we have both preview and code, show them in tabs for better organization
  return (
    <Box my="6">
      <Tabs.Root defaultValue="preview">
        <Tabs.List>
          <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
          <Tabs.Trigger value="code">Code</Tabs.Trigger>
        </Tabs.List>

        <Box pt="6">
          <Tabs.Content value="preview" asChild>
            <PreviewSection preview={preview} background={background} backgroundProps={backgroundProps} />
          </Tabs.Content>

          <Tabs.Content value="code" asChild>
            <CodeSection children={children} buttonsPosition={buttonsPosition} />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
});
