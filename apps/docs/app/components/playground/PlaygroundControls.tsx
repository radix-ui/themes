import React from 'react';
import { Text, Flex, Box, Card, Select, Switch, Separator } from '@kushagradhawan/kookie-ui';

const accentColors = [
  'gray',
  'gold',
  'bronze',
  'brown',
  'yellow',
  'amber',
  'orange',
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'lime',
  'mint',
  'sky',
] as const;

const variants = ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'] as const;
const radiusOptions = ['none', 'small', 'medium', 'large', 'full'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;

interface PlaygroundControlsProps {
  title: string;
  variant: string;
  onVariantChange: (value: string) => void;
  size: string;
  sizes: readonly string[];
  onSizeChange: (value: string) => void;
  color: string;
  onColorChange: (value: string) => void;
  radius: string;
  onRadiusChange: (value: string) => void;
  highContrast: boolean;
  onHighContrastChange: (checked: boolean) => void;
  panelBackground: string;
  onPanelBackgroundChange: (value: string) => void;
  // Optional Button-specific controls
  loading?: boolean;
  onLoadingChange?: (checked: boolean) => void;
  fullWidth?: boolean;
  onFullWidthChange?: (checked: boolean) => void;
}

export default function PlaygroundControls({
  title,
  variant,
  onVariantChange,
  size,
  sizes,
  onSizeChange,
  color,
  onColorChange,
  radius,
  onRadiusChange,
  highContrast,
  onHighContrastChange,
  panelBackground,
  onPanelBackgroundChange,
  loading,
  onLoadingChange,
  fullWidth,
  onFullWidthChange,
}: PlaygroundControlsProps) {
  return (
    <Card variant="surface" asChild>
      <Flex direction="column" width="280px" gap="4">
        {/* Header */}
        <Box>
          <Text size="3" weight="bold">
            {title}
          </Text>
        </Box>

        <Separator size="1" />

        {/* Appearance Controls */}
        <Box>
          <Flex direction="column" gap="4">
            <Text size="2" weight="medium" color="gray">
              Appearance
            </Text>

            <Flex direction="column" gap="3">
              {/* Variant */}
              <Flex direction="column" gap="2">
                <Text size="1" weight="medium" color="gray">
                  Variant
                </Text>
                <Select.Root size="1" value={variant} onValueChange={onVariantChange}>
                  <Select.Trigger variant="soft" placeholder="Select variant">
                    <Text style={{ textTransform: 'capitalize' }}>{variant}</Text>
                  </Select.Trigger>
                  <Select.Content>
                    {variants.map((variantOption) => (
                      <Select.Item key={variantOption} value={variantOption}>
                        <Text style={{ textTransform: 'capitalize' }}>{variantOption}</Text>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>

              {/* Size */}
              <Flex direction="column" gap="2">
                <Text size="1" weight="medium" color="gray">
                  Size
                </Text>
                <Select.Root size="1" value={size} onValueChange={onSizeChange}>
                  <Select.Trigger variant="soft" placeholder="Select size">
                    {size}
                  </Select.Trigger>
                  <Select.Content>
                    {sizes.map((sizeOption) => (
                      <Select.Item key={sizeOption} value={sizeOption}>
                        {sizeOption}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>

              {/* Color */}
              <Flex direction="column" gap="2">
                <Text size="1" weight="medium" color="gray">
                  Color
                </Text>
                <Select.Root size="1" value={color} onValueChange={onColorChange}>
                  <Select.Trigger variant="soft" placeholder="Select color">
                    <Text style={{ textTransform: 'capitalize' }}>
                      {color === 'accent' ? 'Accent' : color}
                    </Text>
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="accent">Accent</Select.Item>
                    <Select.Separator />
                    {accentColors.map((colorOption) => (
                      <Select.Item key={colorOption} value={colorOption}>
                        <Text style={{ textTransform: 'capitalize' }}>{colorOption}</Text>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>

              {/* Radius */}
              <Flex direction="column" gap="2">
                <Text size="1" weight="medium" color="gray">
                  Border Radius
                </Text>
                <Select.Root size="1" value={radius} onValueChange={onRadiusChange}>
                  <Select.Trigger variant="soft" placeholder="Select radius">
                    <Text style={{ textTransform: 'capitalize' }}>
                      {radius === 'default' ? 'Default' : radius === 'none' ? 'No radius' : radius}
                    </Text>
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="default">Default</Select.Item>
                    <Select.Separator />
                    {radiusOptions.map((radiusOption) => (
                      <Select.Item key={radiusOption} value={radiusOption}>
                        <Text style={{ textTransform: 'capitalize' }}>
                          {radiusOption === 'none' ? 'No radius' : radiusOption}
                        </Text>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Separator size="1" />

        {/* Styling Controls */}
        <Box>
          <Flex direction="column" gap="4">
            <Text size="2" weight="medium" color="gray">
              Styling
            </Text>

            <Flex direction="column" gap="3">
              {/* Panel Background */}
              <Flex direction="column" gap="2">
                <Text size="1" weight="medium" color="gray">
                  Panel Background
                </Text>
                <Select.Root
                  size="1"
                  value={panelBackground}
                  onValueChange={onPanelBackgroundChange}
                >
                  <Select.Trigger variant="soft" placeholder="Select background">
                    <Text style={{ textTransform: 'capitalize' }}>{panelBackground}</Text>
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="inherit">Inherit</Select.Item>
                    <Select.Separator />
                    {panelBackgrounds.map((bg) => (
                      <Select.Item key={bg} value={bg}>
                        <Text style={{ textTransform: 'capitalize' }}>{bg}</Text>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>

              {/* High Contrast */}
              <Flex align="center" justify="between">
                <Text size="1" weight="medium" color="gray">
                  High Contrast
                </Text>
                <Switch size="1" checked={highContrast} onCheckedChange={onHighContrastChange} />
              </Flex>
            </Flex>
          </Flex>
        </Box>

        {/* Behavior Controls (Button only) */}
        {(loading !== undefined || fullWidth !== undefined) && (
          <>
            <Separator size="1" />
            <Box>
              <Flex direction="column" gap="4">
                <Text size="2" weight="medium" color="gray">
                  Behavior
                </Text>

                <Flex direction="column" gap="3">
                  {/* Loading Switch */}
                  {loading !== undefined && onLoadingChange && (
                    <Flex align="center" justify="between">
                      <Text size="1" weight="medium" color="gray">
                        Loading State
                      </Text>
                      <Switch size="1" checked={loading} onCheckedChange={onLoadingChange} />
                    </Flex>
                  )}

                  {/* Full Width Switch */}
                  {fullWidth !== undefined && onFullWidthChange && (
                    <Flex align="center" justify="between">
                      <Text size="1" weight="medium" color="gray">
                        Full Width
                      </Text>
                      <Switch size="1" checked={fullWidth} onCheckedChange={onFullWidthChange} />
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Box>
          </>
        )}
      </Flex>
    </Card>
  );
}
