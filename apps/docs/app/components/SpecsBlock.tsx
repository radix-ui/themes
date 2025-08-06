'use client';

import React, { memo } from 'react';
import {
  Box,
  Card,
  Flex,
  Table,
  Text,
  IconButton,
  Code,
  Tooltip,
  Tabs,
} from '@kushagradhawan/kookie-ui';
import { Info } from 'lucide-react';

/**
 * Types for the specs data structure
 *
 * These interfaces define the data structure for component specifications
 * that are displayed in the SpecsBlock component.
 */

/**
 * Individual specification row data
 *
 * Represents a single row in the specifications table, containing
 * property information and values for different variants/sizes.
 */
interface SpecRow {
  /** The property name (e.g., "Padding", "Border Radius") */
  property: string;
  /** Optional description of the property */
  description?: string;
  /** Dynamic columns for different variants/sizes (e.g., size1, size2, etc.) */
  [key: string]: React.ReactNode;
}

/**
 * SpecsBlock component props interface
 *
 * This component displays component specifications in a structured table format
 * with optional preview content. It's designed for design system documentation
 * to show design tokens, spacing, and other component properties.
 */
interface SpecsBlockProps {
  /**
   * Preview content to display above the specifications table
   * @example <Button size="1">Small Button</Button>
   */
  preview: React.ReactNode;

  /**
   * Array of specification rows to display in the table
   * @example [{ property: "Padding", size1: "8px", size2: "12px" }]
   */
  specs: SpecRow[];

  /**
   * Optional title for the specifications block
   * @example "Button Specifications"
   */
  title?: string;

  /**
   * Optional description for the specifications block
   * @example "Design tokens and spacing for Button component"
   */
  description?: string;

  /**
   * Custom column definitions for the specifications table
   * If not provided, columns are auto-detected from the first spec row
   * @example [{ key: "size1", label: "Small", description: "8px spacing" }]
   */
  columns?: {
    /** Unique key for the column */
    key: string;
    /** Display label for the column */
    label: string;
    /** Optional description for the column */
    description?: string;
  }[];

  /**
   * Tooltip content for table cells
   * Format: tooltips[property][column] = tooltip text
   * @example { "Padding": { "size1": "var(--space-2)" } }
   */
  tooltips?: Record<string, Record<string, string>>;

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
 * three background types: none, dots pattern, or custom image. This component
 * is shared between CodeBlock and SpecsBlock for consistency.
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
  const {
    dotSize = 24,
    color = 'var(--gray-10)',
    backgroundColor = 'var(--gray-2)',
    height = '300px',
    width = '100%',
    radius = '3',
  } = backgroundProps;

  // Render with no background (default card styling)
  if (background === 'none') {
    return (
      <Card size="4" variant="soft">
        <Flex justify="center" align="center" py="4">
          {preview}
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
      <Card size="4" variant="soft">
        <Flex justify="center" align="center" py="4" style={dotsStyle}>
          {preview}
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
    <Card size="4" variant="soft">
      <Flex justify="center" align="center" py="4" style={imageStyle}>
        {preview}
      </Flex>
    </Card>
  );
};

/**
 * Specs Section Component
 *
 * Renders the specifications table with all the property data. This component
 * handles the table structure, column detection, and tooltip functionality.
 *
 * @param specs - Array of specification rows to display
 * @param columns - Optional custom column definitions
 * @param tooltips - Optional tooltip content for table cells
 *
 * @example
 * ```tsx
 * <SpecsSection
 *   specs={[
 *     { property: "Padding", size1: "8px", size2: "12px" },
 *     { property: "Border Radius", size1: "4px", size2: "6px" }
 *   ]}
 *   columns={[
 *     { key: "size1", label: "Small", description: "8px spacing" },
 *     { key: "size2", label: "Medium", description: "12px spacing" }
 *   ]}
 * />
 * ```
 */
const SpecsSection = memo(function SpecsSection({
  specs,
  columns,
  tooltips,
}: {
  specs: SpecRow[];
  columns?: {
    key: string;
    label: string;
    description?: string;
  }[];
  tooltips?: Record<string, Record<string, string>>;
}) {
  // Auto-detect columns from the first spec row if not provided
  // This allows for flexible data structures without requiring explicit column definitions
  const detectedColumns = React.useMemo(() => {
    if (columns) return columns;

    if (specs.length === 0) return [];

    const firstRow = specs[0];
    // Filter out non-column keys (property and description)
    const keys = Object.keys(firstRow).filter((key) => key !== 'property' && key !== 'description');

    // Transform keys into column definitions with readable labels
    return keys.map((key) => ({
      key,
      // Convert size1, size2, etc. to 1, 2, etc. for cleaner labels
      label: key.replace(/^size(\d+)$/i, '$1').replace(/^(\d+)$/, '$1'),
      description: undefined,
    }));
  }, [specs, columns]);

  return (
    <Box
      className="specs-content"
      style={{
        backgroundColor: 'var(--gray-a2)',
        padding: 'var(--space-6) var(--space-8)',
      }}
    >
      <Flex direction="column" gap="4">
        {/* Specifications Table */}
        <Table.Root size="3" variant="ghost">
          <Table.Header>
            <Table.Row>
              {/* Property column header */}
              <Table.ColumnHeaderCell>
                <Text size="3" weight="medium">
                  Property
                </Text>
              </Table.ColumnHeaderCell>

              {/* Dynamic column headers based on detected or provided columns */}
              {detectedColumns.map((column) => (
                <Table.ColumnHeaderCell key={column.key}>
                  <Flex direction="column" gap="1">
                    <Text size="3" weight="medium">
                      {column.label}
                    </Text>
                    {column.description && (
                      <Text size="1" color="gray">
                        {column.description}
                      </Text>
                    )}
                  </Flex>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* Render each specification row */}
            {specs.map((row, index) => (
              <Table.Row
                key={index}
                style={index === specs.length - 1 ? { borderBottom: 'none' } : undefined}
              >
                {/* Property name cell */}
                <Table.RowHeaderCell>
                  <Text size="3" weight="medium">
                    {row.property}
                  </Text>
                </Table.RowHeaderCell>

                {/* Dynamic value cells for each column */}
                {detectedColumns.map((column) => {
                  const displayValue = row[column.key]?.toString() || '';
                  // Use tooltip value if available, otherwise fall back to display value
                  const tooltipValue = tooltips?.[row.property]?.[column.key] || displayValue;

                  return (
                    <Table.Cell key={column.key}>
                      <Tooltip content={tooltipValue}>
                        <Text size="3" color="gray">
                          {displayValue}
                        </Text>
                      </Tooltip>
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </Box>
  );
});

/**
 * SpecsBlock Component
 *
 * A comprehensive component specifications display that combines preview content
 * with a structured specifications table. Features include:
 *
 * - Tabbed interface for preview and specifications
 * - Auto-detection of table columns from data
 * - Customizable backgrounds (none, dots, images)
 * - Tooltip support for design tokens
 * - Responsive table design
 *
 * This component is designed for design system documentation to showcase
 * component properties, design tokens, and specifications in an organized format.
 *
 * @example
 * ```tsx
 * // Basic usage with auto-detected columns
 * <SpecsBlock
 *   preview={<Button size="1">Small Button</Button>}
 *   specs={[
 *     { property: "Padding", size1: "8px", size2: "12px" },
 *     { property: "Border Radius", size1: "4px", size2: "6px" }
 *   ]}
 * />
 *
 * // With custom columns and tooltips
 * <SpecsBlock
 *   preview={<Button size="2">Medium Button</Button>}
 *   specs={[
 *     { property: "Padding", small: "8px", medium: "12px" }
 *   ]}
 *   columns={[
 *     { key: "small", label: "Small", description: "8px spacing" },
 *     { key: "medium", label: "Medium", description: "12px spacing" }
 *   ]}
 *   tooltips={{
 *     "Padding": {
 *       small: "var(--space-2)",
 *       medium: "var(--space-3)"
 *     }
 *   }}
 * />
 *
 * // With dots background
 * <SpecsBlock
 *   preview={<Image src="/logo.png" alt="Logo" />}
 *   specs={specsData}
 *   background="dots"
 *   backgroundProps={{ dotSize: 16, color: 'var(--blue-10)' }}
 * />
 * ```
 */
export const SpecsBlock = memo(function SpecsBlock({
  preview,
  specs,
  columns,
  tooltips,
  background = 'none',
  backgroundProps = {},
}: SpecsBlockProps) {
  // Always show tabs for consistency with CodeBlock component
  // This provides a unified experience across documentation components
  const showTabs = true;

  // Fallback rendering without tabs (for backward compatibility)
  if (!showTabs) {
    return (
      <Box my="8">
        <Flex direction="column" gap="2">
          <PreviewSection
            preview={preview}
            background={background}
            backgroundProps={backgroundProps}
          />
          <SpecsSection specs={specs} columns={columns} tooltips={tooltips} />
        </Flex>
      </Box>
    );
  }

  // Primary rendering with tabs for better organization
  return (
    <Box py="8">
      <Tabs.Root defaultValue="preview">
        <Tabs.List>
          <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
          <Tabs.Trigger value="specs">Specs</Tabs.Trigger>
        </Tabs.List>

        <Box pt="6">
          {/* Preview tab content */}
          <Tabs.Content value="preview" asChild>
            <PreviewSection
              preview={preview}
              background={background}
              backgroundProps={backgroundProps}
            />
          </Tabs.Content>

          {/* Specifications tab content */}
          <Tabs.Content value="specs" asChild>
            <SpecsSection specs={specs} columns={columns} tooltips={tooltips} />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
});
